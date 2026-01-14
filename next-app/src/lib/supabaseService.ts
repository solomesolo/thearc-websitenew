import { supabase, TABLES } from './supabase';
import { Provider, Product, ProviderWithProducts, ProductFilters, ProviderFilters, Biomarker } from './types';
import { safeBiomarkersIncludes } from './biomarkerUtils';

export class SupabaseService {
	// Provider operations
	static async getProviders(filters?: ProviderFilters) {
		if (!supabase) {
			console.warn('Supabase client not initialized - returning empty array');
			console.warn('Check if NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local');
			return [];
		}
		
		try {
			console.log('Fetching providers from table:', TABLES.PROVIDERS);
			let query = supabase
				.from(TABLES.PROVIDERS)
				.select('*');

			if (filters?.locations && filters.locations.length > 0) {
				query = query.in('Company Location', filters.locations);
			}

			const { data, error } = await query;
			
			if (error) {
				console.error('Error fetching providers:', error);
				console.error('Error details:', {
					message: error.message,
					details: error.details,
					hint: error.hint,
					code: error.code
				});
				// Return empty array instead of throwing to prevent breaking the UI
				return [];
			}
			
			console.log(`Successfully fetched ${data?.length || 0} providers`);

			let filteredData = data as Provider[];

		// Apply tag filtering in memory since Supabase doesn't support complex JSONB queries easily
		if (filters?.tags && filters.tags.length > 0) {
			filteredData = filteredData.filter(provider => {
				if (!provider.Tag || !Array.isArray(provider.Tag)) return false;
				
				const providerTags = provider.Tag.map((tag: any) => {
					if (tag && typeof tag === 'object' && tag.tag) {
						return tag.tag;
					} else if (typeof tag === 'string') {
						return tag;
					}
					return null;
				}).filter(Boolean);
				
				return (filters.tags || []).some(filterTag => providerTags.includes(filterTag));
			});
		}

			// Apply hasProducts filter
			if (filters?.hasProducts) {
				try {
					const providersWithProducts = await this.getProvidersWithProducts();
					const providerIdsWithProducts = new Set(providersWithProducts.map((p: Provider) => p.id));
					filteredData = filteredData.filter(provider => providerIdsWithProducts.has(provider.id));
				} catch (err) {
					console.warn('Error filtering providers with products:', err);
					// Continue without this filter if it fails
				}
			}

			return filteredData;
		} catch (error) {
			console.error('Unexpected error in getProviders:', error);
			// Return empty array on any unexpected error
			return [];
		}
	}

	static async getProviderById(id: number) {
		const { data, error } = await supabase
			.from(TABLES.PROVIDERS)
			.select('*')
			.eq('id', id)
			.single();

		if (error) {
			console.error('Error fetching provider:', error);
			throw error;
		}

		return data as Provider;
	}

	static async getProvidersWithProducts() {
		const { data, error } = await supabase
			.from(TABLES.PROVIDERS)
			.select(`
				*,
				products:${TABLES.PRODUCTS}(*)
			`);

		if (error) {
			console.error('Error fetching providers with products:', error);
			throw error;
		}

		return data as ProviderWithProducts[];
	}

	// Product operations
	static async getProducts(filters?: ProductFilters) {
		if (!supabase) {
			console.warn('Supabase client not initialized - returning empty array');
			return [];
		}
		
		try {
			console.log('Fetching products from table:', TABLES.PRODUCTS);
			let query = supabase
				.from(TABLES.PRODUCTS)
				.select('*');

			if (filters?.available !== undefined) {
				query = query.eq('available', filters.available);
			}

			const { data, error } = await query;
			
			if (error) {
				console.error('Error fetching products:', error);
				console.error('Error details:', {
					message: error.message,
					details: error.details,
					hint: error.hint,
					code: error.code
				});
				// Return empty array instead of throwing to prevent breaking the UI
				return [];
			}
			
			console.log(`Successfully fetched ${data?.length || 0} products`);

			let filteredData = data as Product[];

			// Apply tag filtering
			if (filters?.tags && filters.tags.length > 0) {
				filteredData = filteredData.filter(product => {
					if (!product.tags) return false;
					
					const productTags = this.extractProductTags(product.tags);
					return (filters.tags || []).some(filterTag => productTags.includes(filterTag));
				});
			}

			// Apply biomarker filtering
			if (filters?.biomarkers && filters.biomarkers.length > 0) {
				filteredData = filteredData.filter(product => {
					if (!product.biomarkers) return false;
					
					const productBiomarkers = this.extractProductBiomarkers(product.biomarkers);
					return (filters.biomarkers || []).some(filterBiomarker => 
						safeBiomarkersIncludes(product.biomarkers, filterBiomarker)
					);
				});
			}

			return filteredData;
		} catch (error) {
			console.error('Unexpected error in getProducts:', error);
			// Return empty array on any unexpected error
			return [];
		}
	}

	static async getProductById(id: number) {
		if (!supabase) {
			console.warn('Supabase client not initialized - returning null');
			return null;
		}
		
		const { data, error } = await supabase
			.from(TABLES.PRODUCTS)
			.select('*')
			.eq('id', id)
			.single();

		if (error) {
			console.error('Error fetching product:', error);
			throw error;
		}

		return data as Product;
	}

	static async getProductsByProviderId(providerId: number) {
		const { data, error } = await supabase
			.from(TABLES.PRODUCTS)
			.select('*')
			.eq('provider_id', providerId);

		if (error) {
			console.error('Error fetching products by provider:', error);
			throw error;
		}

		return data as Product[];
	}

	// Similar providers/products
	static async getSimilarProviders(providerId: number, limit: number = 4) {
		const provider = await this.getProviderById(providerId);
		if (!provider.Tag || !Array.isArray(provider.Tag)) {
			return [];
		}

		const providerTags = provider.Tag.map((tag: any) => {
			if (tag && typeof tag === 'object' && tag.tag) {
				return tag.tag;
			}
			return null;
		}).filter(Boolean);

		if (providerTags.length === 0) {
			return [];
		}

		const { data, error } = await supabase
			.from(TABLES.PROVIDERS)
			.select('*')
			.neq('id', providerId);

		if (error) {
			console.error('Error fetching similar providers:', error);
			return [];
		}

		// Filter providers with similar tags
		const similarProviders = (data as Provider[]).filter(p => {
			if (!p.Tag || !Array.isArray(p.Tag)) return false;
			
			const pTags = p.Tag.map((tag: any) => {
				if (tag && typeof tag === 'object' && tag.tag) {
					return tag.tag;
				}
				return null;
			}).filter(Boolean);
			
			return providerTags.some(tag => pTags.includes(tag));
		}).slice(0, limit);

		return similarProviders;
	}

	static async getSimilarProducts(productId: number, limit: number = 4) {
		const product = await this.getProductById(productId);
		if (!product.biomarkers) {
			return [];
		}

		// Get biomarkers for the current product
		const currentProductBiomarkers = this.extractProductBiomarkers(product.biomarkers);
		const currentBiomarkerNames = currentProductBiomarkers.map(bio => bio.name.toLowerCase());

		if (currentBiomarkerNames.length === 0) {
			return [];
		}

		const { data, error } = await supabase
			.from(TABLES.PRODUCTS)
			.select('*')
			.neq('id', productId);

		if (error) {
			console.error('Error fetching similar products:', error);
			throw error;
		}

		// Calculate biomarker similarity for each product
		const productsWithSimilarity = (data as Product[]).map(p => {
			if (!p.biomarkers) {
				return { product: p, similarity: 0 };
			}

			const productBiomarkers = this.extractProductBiomarkers(p.biomarkers);
			const productBiomarkerNames = productBiomarkers.map(bio => bio.name.toLowerCase());

			// Calculate intersection of biomarkers
			const commonBiomarkers = currentBiomarkerNames.filter(bio => 
				productBiomarkerNames.includes(bio)
			);

			// Calculate similarity percentage (at least 50% overlap required)
			const similarity = commonBiomarkers.length / currentBiomarkerNames.length;
			
			return { product: p, similarity };
		}).filter(item => item.similarity >= 0.5) // Only products with 50%+ biomarker overlap
		.sort((a, b) => b.similarity - a.similarity) // Sort by similarity (highest first)
		.slice(0, limit)
		.map(item => item.product);

		return productsWithSimilarity;
	}

	// Get similar providers based on biomarker overlap from their products
	static async getSimilarProvidersByBiomarkers(providerId: number, limit: number = 4) {
		// Get all products from the current provider
		const currentProviderProducts = await this.getProductsByProviderId(providerId);
		
		if (currentProviderProducts.length === 0) {
			return [];
		}

		// Collect all biomarkers from current provider's products
		const currentProviderBiomarkers = new Set<string>();
		currentProviderProducts.forEach(product => {
			if (product.biomarkers) {
				const biomarkers = this.extractProductBiomarkers(product.biomarkers);
				biomarkers.forEach(bio => {
					currentProviderBiomarkers.add(bio.name.toLowerCase());
				});
			}
		});

		if (currentProviderBiomarkers.size === 0) {
			return [];
		}

		// Get all other providers
		const { data: allProviders, error } = await supabase
			.from(TABLES.PROVIDERS)
			.select('*')
			.neq('id', providerId);

		if (error) {
			console.error('Error fetching providers for biomarker similarity:', error);
			return [];
		}

		// Calculate biomarker similarity for each provider
		const providersWithSimilarity = await Promise.all(
			(allProviders as Provider[]).map(async (provider) => {
				const providerProducts = await this.getProductsByProviderId(provider.id);
				
				if (providerProducts.length === 0) {
					return { provider, similarity: 0 };
				}

				// Collect biomarkers from this provider's products
				const providerBiomarkers = new Set<string>();
				providerProducts.forEach(product => {
					if (product.biomarkers) {
						const biomarkers = this.extractProductBiomarkers(product.biomarkers);
						biomarkers.forEach(bio => {
							providerBiomarkers.add(bio.name.toLowerCase());
						});
					}
				});

				// Calculate intersection of biomarkers
				const commonBiomarkers = Array.from(currentProviderBiomarkers).filter(bio => 
					providerBiomarkers.has(bio)
				);

				// Calculate similarity percentage (at least 50% overlap required)
				const similarity = commonBiomarkers.length / currentProviderBiomarkers.size;
				
				return { provider, similarity };
			})
		);

		// Filter providers with 50%+ biomarker overlap and sort by similarity
		const similarProviders = providersWithSimilarity
			.filter(item => item.similarity >= 0.5)
			.sort((a, b) => b.similarity - a.similarity)
			.slice(0, limit)
			.map(item => item.provider);

		return similarProviders;
	}

	// Helper methods for extracting data from JSON fields
	static extractProductTags(tags: any): string[] {
		if (!tags) return [];
		
		const tagArray: string[] = [];
		
		// Handle different tag structures
		if (typeof tags === 'object') {
			// Extract from type array
			if (tags.type && Array.isArray(tags.type)) {
				tagArray.push(...tags.type);
			}
			// Extract from audience array
			if (tags.audience && Array.isArray(tags.audience)) {
				tagArray.push(...tags.audience);
			}
			// Extract from features array
			if (tags.features && Array.isArray(tags.features)) {
				tagArray.push(...tags.features);
			}
		} else if (Array.isArray(tags)) {
			tagArray.push(...tags);
		}
		
		return tagArray;
	}

	static extractProductBiomarkers(biomarkers: any): Array<{code: string, name: string, category?: string}> {
		if (!biomarkers) return [];
		
		if (typeof biomarkers === 'object' && biomarkers.biomarkers && Array.isArray(biomarkers.biomarkers)) {
			return biomarkers.biomarkers.map((bio: any) => ({
				code: bio.code || '',
				name: bio.name || '',
				category: bio.category || ''
			}));
		}
		
		return [];
	}

	static extractProviderTags(tags: any): string[] {
		if (!tags || !Array.isArray(tags)) return [];
		
		return tags.map((tag: any) => {
			if (tag && typeof tag === 'object' && tag.tag) {
				return tag.tag;
			} else if (typeof tag === 'string') {
				return tag;
			}
			return null;
		}).filter(Boolean);
	}

	// Biomarker operations
	static async getAllBiomarkers() {
		const { data, error } = await supabase
			.from(TABLES.BIOMARKERS)
			.select('*')
			.order('biomarker name');

		if (error) {
			console.error('Error fetching biomarkers:', error);
			throw error;
		}

		return data as Biomarker[];
	}

	static async getBiomarkersByCodes(codes: string[]) {
		const { data, error } = await supabase
			.from(TABLES.BIOMARKERS)
			.select('*')
			.in('biomarker code', codes);

		if (error) {
			console.error('Error fetching biomarkers by codes:', error);
			throw error;
		}

		return data as Biomarker[];
	}

	static async getBiomarkersByNames(names: string[]) {
		const { data, error } = await supabase
			.from(TABLES.BIOMARKERS)
			.select('*')
			.in('biomarker name', names);

		if (error) {
			console.error('Error fetching biomarkers by names:', error);
			throw error;
		}

		return data as Biomarker[];
	}

	static async getBiomarkerByCode(code: string) {
		const { data, error } = await supabase
			.from(TABLES.BIOMARKERS)
			.select('*')
			.eq('biomarker code', code)
			.single();

		if (error) {
			console.error('Error fetching biomarker by code:', error);
			return null;
		}

		return data as Biomarker;
	}

	static async getBiomarkerByName(name: string) {
		const { data, error } = await supabase
			.from(TABLES.BIOMARKERS)
			.select('*')
			.eq('biomarker name', name)
			.single();

		if (error) {
			console.error('Error fetching biomarker by name:', error);
			return null;
		}

		return data as Biomarker;
	}

	// Enhanced biomarker extraction with database lookup
	static async getProductBiomarkersWithDetails(product: Product): Promise<Biomarker[]> {
		if (!product.biomarkers) return [];

		const productBiomarkers = this.extractProductBiomarkers(product.biomarkers);
		const biomarkerCodes = productBiomarkers.map(bio => bio.code).filter(Boolean);
		const biomarkerNames = productBiomarkers.map(bio => bio.name).filter(Boolean);

		try {
			// Try to fetch by codes first, then by names
			let biomarkers = await this.getBiomarkersByCodes(biomarkerCodes);
			
			// If we didn't find all biomarkers by code, try by name
			if (biomarkers.length < biomarkerNames.length) {
				const foundCodes = new Set(biomarkers.map(b => b['biomarker code']));
				const missingNames = biomarkerNames.filter(name => 
					!biomarkers.some(b => b['biomarker name'] === name)
				);
				
				if (missingNames.length > 0) {
					const additionalBiomarkers = await this.getBiomarkersByNames(missingNames);
					biomarkers = [...biomarkers, ...additionalBiomarkers];
				}
			}

			return biomarkers;
		} catch (error) {
			console.error('Error fetching biomarker details:', error);
			// Fallback to basic biomarker data
			return productBiomarkers.map(bio => ({
				id: 0,
				created_at: '',
				'biomarker name': bio.name,
				'biomarker info': bio.category || 'No description available',
				'biomarker code': bio.code
			}));
		}
	}
}
