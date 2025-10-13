import { supabase, TABLES } from './supabase';
import { Provider, Product, ProviderWithProducts, ProductFilters, ProviderFilters } from './types';

export class SupabaseService {
	// Provider operations
	static async getProviders(filters?: ProviderFilters) {
		let query = supabase
			.from(TABLES.PROVIDERS)
			.select('*');

		if (filters?.locations && filters.locations.length > 0) {
			query = query.in('Company Location', filters.locations);
		}

		const { data, error } = await query;
		
		if (error) {
			console.error('Error fetching providers:', error);
			throw error;
		}

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
				
				return filters.tags!.some(filterTag => providerTags.includes(filterTag));
			});
		}

		// Apply hasProducts filter
		if (filters?.hasProducts) {
			const providersWithProducts = await this.getProvidersWithProducts();
			const providerIdsWithProducts = new Set(providersWithProducts.map((p: Provider) => p.id));
			filteredData = filteredData.filter(provider => providerIdsWithProducts.has(provider.id));
		}

		return filteredData;
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
		let query = supabase
			.from(TABLES.PRODUCTS)
			.select('*');

		if (filters?.available !== undefined) {
			query = query.eq('available', filters.available);
		}

		const { data, error } = await query;
		
		if (error) {
			console.error('Error fetching products:', error);
			throw error;
		}

		let filteredData = data as Product[];

		// Apply tag filtering
		if (filters?.tags && filters.tags.length > 0) {
			filteredData = filteredData.filter(product => {
				if (!product.tags) return false;
				
				const productTags = this.extractProductTags(product.tags);
				return filters.tags!.some(filterTag => productTags.includes(filterTag));
			});
		}

		// Apply biomarker filtering
		if (filters?.biomarkers && filters.biomarkers.length > 0) {
			filteredData = filteredData.filter(product => {
				if (!product.biomarkers) return false;
				
				const productBiomarkers = this.extractProductBiomarkers(product.biomarkers);
				return filters.biomarkers!.some(filterBiomarker => 
					productBiomarkers.some(bio => 
						bio.name.toLowerCase().includes(filterBiomarker.toLowerCase()) ||
						bio.code.toLowerCase().includes(filterBiomarker.toLowerCase())
					)
				);
			});
		}

		return filteredData;
	}

	static async getProductById(id: number) {
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

	static async getProductsByProvider(providerId: number) {
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

	static async getSimilarProvidersByBiomarkerNames(biomarkerNames: string[], limit: number = 4) {
		const { data, error } = await supabase
			.from(TABLES.PRODUCTS)
			.select('*');

		if (error) {
			console.error('Error fetching products for biomarker search:', error);
			return [];
		}

		// Find products that contain any of the specified biomarkers
		const matchingProducts = (data as Product[]).filter(product => {
			if (!product.biomarkers) return false;
			
			const productBiomarkers = this.extractProductBiomarkers(product.biomarkers);
			return biomarkerNames.some(biomarkerName => 
				productBiomarkers.some(bio => 
					bio.name.toLowerCase().includes(biomarkerName.toLowerCase())
				)
			);
		});

		// Get unique provider IDs from matching products
		const providerIds = Array.from(new Set(matchingProducts.map(p => p.provider_id)));

		// Fetch providers
		const { data: providers, error: providerError } = await supabase
			.from(TABLES.PROVIDERS)
			.select('*')
			.in('id', providerIds);

		if (providerError) {
			console.error('Error fetching providers for biomarker search:', providerError);
			return [];
		}

		return (providers as Provider[]).slice(0, limit);
	}

	static async getSimilarProducts(productId: number, limit: number = 4) {
		const product = await this.getProductById(productId);
		if (!product.tags) {
			return [];
		}

		const productTags = this.extractProductTags(product.tags);

		if (productTags.length === 0) {
			return [];
		}

		const { data, error } = await supabase
			.from(TABLES.PRODUCTS)
			.select('*')
			.neq('id', productId);

		if (error) {
			console.error('Error fetching similar products:', error);
			return [];
		}

		// Filter products with similar tags
		const similarProducts = (data as Product[]).filter(p => {
			if (!p.tags) return false;
			
			const pTags = this.extractProductTags(p.tags);
			return productTags.some(tag => pTags.includes(tag));
		}).slice(0, limit);

		return similarProducts;
	}

	// Biomarker operations
	static async getBiomarkersByCodes(codes: string[]) {
		// This would need to be implemented based on your biomarker data structure
		// For now, we'll extract from products
		const { data, error } = await supabase
			.from(TABLES.PRODUCTS)
			.select('biomarkers');

		if (error) {
			console.error('Error fetching biomarkers:', error);
			return [];
		}

		const allBiomarkers = new Set();
		data.forEach((product: any) => {
			if (product.biomarkers) {
				const biomarkers = this.extractProductBiomarkers(product.biomarkers);
				biomarkers.forEach(bio => {
					if (codes.includes(bio.code)) {
						allBiomarkers.add(bio);
					}
				});
			}
		});

		return Array.from(allBiomarkers);
	}

	static async getBiomarkersByNames(names: string[]) {
		// This would need to be implemented based on your biomarker data structure
		// For now, we'll extract from products
		const { data, error } = await supabase
			.from(TABLES.PRODUCTS)
			.select('biomarkers');

		if (error) {
			console.error('Error fetching biomarkers:', error);
			return [];
		}

		const allBiomarkers = new Set();
		data.forEach((product: any) => {
			if (product.biomarkers) {
				const biomarkers = this.extractProductBiomarkers(product.biomarkers);
				biomarkers.forEach(bio => {
					if (names.some(name => bio.name.toLowerCase().includes(name.toLowerCase()))) {
						allBiomarkers.add(bio);
					}
				});
			}
		});

		return Array.from(allBiomarkers);
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
}
