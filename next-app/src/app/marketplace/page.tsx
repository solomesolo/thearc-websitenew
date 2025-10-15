"use client";

import Link from "next/link";
import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DNAParticles from "../../components/DNAParticles";
import DNABackground from "../../components/DNABackground";
import Footer from "../../components/Footer";
import BurgerMenu from "../../components/BurgerMenu";
import { trackMarketplaceView } from "../../utils/mixpanel";
import { SupabaseService } from "../../lib/supabaseService";
import { Provider, Product, ProviderFilters, ProductFilters } from "../../lib/types";
import { safeBiomarkersIncludes } from "../../lib/biomarkerUtils";

function MarketplacePageContent() {
  const searchParams = useSearchParams();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [providerFilters, setProviderFilters] = useState<ProviderFilters>({
    locations: [],
    tags: [],
    hasProducts: false
  });
  const [productFilters, setProductFilters] = useState<ProductFilters>({
    tags: [],
    biomarkers: [],
    available: true
  });
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [availableBiomarkers, setAvailableBiomarkers] = useState<string[]>([]);
  const [filterData, setFilterData] = useState({
    serviceTypes: ['blood tests', 'urine tests', 'stool tests', 'saliva tests', 'genetic testing']
  });
  const [showProductModal, setShowProductModal] = useState(false);
  const [modalProducts, setModalProducts] = useState<Product[]>([]);
  const [modalSearchTerm, setModalSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Set mounted flag to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [providersData, productsData] = await Promise.all([
          SupabaseService.getProviders(),
          SupabaseService.getProducts({ available: true })
        ]);
        
        setProviders(providersData);
        setProducts(productsData);
        setFilteredProviders(providersData);
        
        // Extract biomarkers from products (simpler approach)
        const allBiomarkers = new Set<string>();
        productsData.forEach(product => {
          if (product.biomarkers) {
            const biomarkers = SupabaseService.extractProductBiomarkers(product.biomarkers);
            biomarkers.forEach(bio => {
              allBiomarkers.add(bio.name);
            });
          }
        });
        setAvailableBiomarkers(Array.from(allBiomarkers).sort());
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load marketplace data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle search parameters from URL (simplified)
  useEffect(() => {
    if (!mounted || products.length === 0 || providers.length === 0) return;
    
    const searchFromUrl = searchParams.get('search');
    const countryFromUrl = searchParams.get('country');
    
    console.log('🔍 Search parameter processing:', { searchFromUrl, countryFromUrl, productsCount: products.length, providersCount: providers.length });
    
    if (countryFromUrl) {
      setSelectedCountry(countryFromUrl);
    }
    
    if (searchFromUrl) {
      console.log('🔍 Processing search term:', searchFromUrl);
      // Find products that match the search term
      const matchingProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchFromUrl.toLowerCase()) ||
        product.description.toLowerCase().includes(searchFromUrl.toLowerCase()) ||
        safeBiomarkersIncludes(product.biomarkers, searchFromUrl)
      );
      
      console.log('🔍 Matching products found:', matchingProducts.length, matchingProducts.map(p => p.name));
      
      // Find providers that have these products (using provider_id from products)
      const matchingProviderIds = new Set(matchingProducts.map(product => product.provider_id));
      const matchingProviders = providers.filter(provider => 
        matchingProviderIds.has(provider.id)
      );
      
      console.log('🔍 Matching providers found:', matchingProviders.length);
      
      // Show modal with matching products instead of filtering providers
      setModalProducts(matchingProducts);
      setModalSearchTerm(searchFromUrl);
      setShowProductModal(true);
      
      // Auto-select relevant biomarkers
      const relevantBiomarkers = new Set<string>();
      matchingProducts.forEach(product => {
        if (product.biomarkers) {
          const biomarkers = SupabaseService.extractProductBiomarkers(product.biomarkers);
          biomarkers.forEach(bio => {
            if (bio.name.toLowerCase().includes(searchFromUrl.toLowerCase()) ||
                bio.code.toLowerCase().includes(searchFromUrl.toLowerCase())) {
              relevantBiomarkers.add(bio.name);
            }
          });
        }
      });
      
      console.log('🔍 Relevant biomarkers found:', Array.from(relevantBiomarkers));
      
      if (relevantBiomarkers.size > 0) {
        console.log('🔍 Setting product filters with biomarkers:', Array.from(relevantBiomarkers));
        setProductFilters(prev => ({
          ...prev,
          biomarkers: Array.from(relevantBiomarkers)
        }));
      } else {
        console.log('🔍 No relevant biomarkers found for search term:', searchFromUrl);
      }
    }
  }, [mounted, searchParams, products, providers]);

  // Apply filters
  useEffect(() => {
    const applyFilters = async () => {
      if (products.length === 0 || providers.length === 0) return;

      let filtered = [...providers];

    // Apply provider filters
    if (providerFilters.locations.length > 0) {
      filtered = filtered.filter(provider => 
        providerFilters.locations.some(location => 
          provider['Company Location']?.toLowerCase().includes(location.toLowerCase())
        )
      );
    }

    if (providerFilters.tags.length > 0) {
      filtered = filtered.filter(provider => {
        const providerTags = SupabaseService.extractProviderTags(provider.tags);
        return providerFilters.tags.some(tag => providerTags.includes(tag));
      });
    }

    if (providerFilters.hasProducts) {
      filtered = filtered.filter(provider => 
        provider.products && provider.products.length > 0
      );
    }

    // Apply product filters
    if (productFilters.tags.length > 0 || productFilters.biomarkers.length > 0) {
      const filteredProducts = await SupabaseService.getProducts({
        ...productFilters,
        available: true
      });
      
      const filteredProviderIds = new Set(filteredProducts.map(product => product.provider_id));
      filtered = filtered.filter(provider => 
        filteredProviderIds.has(provider.id)
      );
    }

      setFilteredProviders(filtered);
    };

    applyFilters();
  }, [providers, products, providerFilters, productFilters]);

  const handleProviderTagChange = useCallback((tag: string, checked: boolean) => {
    const normalizedTag = tag.replace(/\s+/g, '_');
    const newTags = checked
      ? [...providerFilters.tags, normalizedTag]
      : providerFilters.tags.filter(t => t !== normalizedTag);
    setProviderFilters(prev => ({ ...prev, tags: newTags }));
  }, [providerFilters.tags]);

  const handleProductTagChange = useCallback((tag: string, checked: boolean) => {
    const normalizedTag = tag.replace(/\s+/g, '_');
    const newTags = checked
      ? [...productFilters.tags, normalizedTag]
      : productFilters.tags.filter(t => t !== normalizedTag);
    setProductFilters(prev => ({ ...prev, tags: newTags }));
  }, [productFilters.tags]);

  const handleBiomarkerChange = useCallback((biomarker: string, checked: boolean) => {
    const currentBiomarkers = productFilters.biomarkers || [];
    const newBiomarkers = checked
      ? [...currentBiomarkers, biomarker]
      : currentBiomarkers.filter(b => b !== biomarker);
    setProductFilters(prev => ({ ...prev, biomarkers: newBiomarkers }));
  }, [productFilters.biomarkers]);

  const clearAllFilters = useCallback(() => {
    setProviderFilters({ 
      locations: [], 
      tags: [], 
      hasProducts: false 
    });
    setProductFilters({ 
      tags: [], 
      biomarkers: [], 
      available: true 
    });
  }, []);

  const handleProviderClick = useCallback((providerId: number) => {
    window.open(`/marketplace/provider/${providerId}`, '_blank', 'noopener,noreferrer');
  }, []);

  const handleSearch = useCallback((query: string) => {
    if (!query.trim()) {
      setFilteredProviders(providers);
      return;
    }

    const searchTerm = query.toLowerCase();
    
    // Find products that match the search term
    const matchingProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      safeBiomarkersIncludes(product.biomarkers, searchTerm)
    );
    
    // Find providers that match the search term or have matching products
    const matchingProviders = providers.filter(provider => {
      // Check if provider name or location matches
      const providerMatches = 
        provider['Company Name']?.toLowerCase().includes(searchTerm) ||
        provider['Company Location']?.toLowerCase().includes(searchTerm) ||
        provider['Company Description']?.toLowerCase().includes(searchTerm);
      
      // Check if provider has matching products
      const hasMatchingProducts = matchingProducts.some(product => 
        product.provider_id === provider.id
      );
      
      return providerMatches || hasMatchingProducts;
    });
    
    setFilteredProviders(matchingProviders);
  }, [products, providers]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 animate-pulse">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-white/20 rounded mb-2"></div>
                    <div className="h-3 bg-white/10 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-white/10 rounded"></div>
                  <div className="h-3 bg-white/10 rounded w-4/5"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Marketplace</h1>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <DNABackground />
      <DNAParticles />
      
      {/* Header */}
      <header className="relative z-10 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white">
              TheArc
            </Link>
            <BurgerMenu />
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="relative z-10 bg-black/60 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-2">
          <nav className="text-sm text-gray-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">→</span>
            <Link href="/catalog" className="hover:text-white">Catalog</Link>
            <span className="mx-2">→</span>
            <span className="text-white">Marketplace</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Filters Sidebar */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Filters</h3>
                  <button 
                    onClick={clearAllFilters}
                    className="text-purple-400 hover:text-purple-300 text-sm"
                  >
                    Clear All
                  </button>
                </div>

                {/* Service Type */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-white/80 mb-3">Service Type</h4>
                  <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
                    {filterData.serviceTypes.map(service => {
                      const normalizedService = service.replace(/\s+/g, '_');
                      return (
                        <label key={service} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={productFilters.tags.includes(normalizedService)}
                            onChange={() => handleProductTagChange(service, !productFilters.tags.includes(normalizedService))}
                            className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                          />
                          <span className="text-gray-300 text-sm">{service}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Biomarkers */}
                <div>
                  <h4 className="text-sm font-medium text-white/80 mb-3">Biomarkers</h4>
                  <div className="space-y-1 max-h-96 overflow-y-auto custom-scrollbar">
                    {availableBiomarkers.map(biomarker => (
                      <label key={biomarker} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={(productFilters.biomarkers || []).includes(biomarker)}
                          onChange={() => handleBiomarkerChange(biomarker, !(productFilters.biomarkers || []).includes(biomarker))}
                          className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                        />
                        <span className="text-gray-300 text-sm">{biomarker}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">Health & Longevity Marketplace</h1>
                <p className="text-gray-300 mb-4">
                  {filteredProviders.length} providers • {products.length} products available
                </p>
                
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search biomarkers, companies, or tests..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      handleSearch(e.target.value);
                    }}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          handleSearch('');
                        }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {filteredProviders.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-white mb-2">No providers found</h3>
                  <p className="text-gray-400 mb-4">
                    {searchQuery ? 
                      `No results found for "${searchQuery}". Try a different search term or clear the search.` :
                      'Try adjusting your filters or search terms'
                    }
                  </p>
                  <div className="flex gap-3 justify-center">
                    {searchQuery && (
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          handleSearch('');
                        }}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        Clear Search
                      </button>
                    )}
                    <button 
                      onClick={clearAllFilters}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProviders.map(provider => {
                    const providerProducts = products.filter(p => 
                      provider.products && provider.products.includes(p.id)
                    );
                    const providerTags = SupabaseService.extractProviderTags(provider.tags);
                    
                    return (
                      <div 
                        key={provider.id}
                        onClick={() => handleProviderClick(provider.id)}
                        className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {provider['Company Name']?.charAt(0) || 'P'}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                              {provider['Company Name'] || 'Unknown Provider'}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {provider['Company Location'] || 'Location not specified'}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                          {provider['Company Description'] || 'No description available'}
                        </p>

                        {providerTags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {providerTags.slice(0, 3).map(tag => (
                              <span key={tag} className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-full">
                                {tag}
                              </span>
                            ))}
                            {providerTags.length > 3 && (
                              <span className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded-full">
                                +{providerTags.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-fuchsia-400 text-sm font-medium group-hover:text-fuchsia-300 transition-colors">
                            View Provider →
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-4xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold text-white">Available Tests</h2>
                <p className="text-gray-400 mt-1">Search: "{modalSearchTerm}"</p>
              </div>
              <button
                onClick={() => setShowProductModal(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {modalProducts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No products found for this search term.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {modalProducts.map(product => {
                    const provider = providers.find(p => p.id === product.provider_id);
                    const productPrice = product.price && product.price !== '0' ? `${product.price} EUR` : 'Price Unknown';
                    
                    return (
                      <div
                        key={product.id}
                        onClick={() => window.open(`/marketplace/product/${product.id}`, '_blank')}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors mb-2">
                              {product.name}
                            </h3>
                            <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400">Provider:</span>
                                <span className="text-white font-medium">
                                  {provider?.['Company Name'] || 'Unknown Provider'}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400">Location:</span>
                                <span className="text-white">
                                  {provider?.['Company Location'] || 'Unknown'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-xl font-bold text-purple-400 mb-2">
                              {productPrice}
                            </div>
                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                              View Details →
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading marketplace...</p>
        </div>
      </div>
    }>
      <MarketplacePageContent />
    </Suspense>
  );
}