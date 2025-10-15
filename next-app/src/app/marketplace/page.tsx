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
  const [isClient, setIsClient] = useState(false);
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

  // Set client flag to prevent hydration mismatches
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle country selection and search from URL params
  useEffect(() => {
    if (!isClient) return; // Only run on client side
    const countryFromUrl = searchParams.get('country');
    const searchFromUrl = searchParams.get('search');
    
    if (countryFromUrl && countryFromUrl !== selectedCountry) {
      setSelectedCountry(countryFromUrl);
    }
    
    if (searchFromUrl) {
      // Filter products based on search term
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchFromUrl.toLowerCase()) ||
        product.description.toLowerCase().includes(searchFromUrl.toLowerCase()) ||
        safeBiomarkersIncludes(product.biomarkers, searchFromUrl)
      );
      setFilteredProviders(providers.filter(provider => 
        provider.products && provider.products.some(productId => 
          filtered.some(product => product.id === productId)
        )
      ));

      // Also update the product filters to show relevant biomarkers
      const relevantBiomarkers = new Set<string>();
      filtered.forEach(product => {
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

      // Update product filters to include relevant biomarkers
      if (relevantBiomarkers.size > 0) {
        setProductFilters(prev => ({
          ...prev,
          biomarkers: Array.from(relevantBiomarkers)
        }));
      }
    }
  }, [isClient, searchParams, selectedCountry, products, providers]);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [providersData, productsData] = await Promise.all([
          SupabaseService.getProviders(),
          SupabaseService.getProducts({ 
            available: true,
            tags: [],
            biomarkers: []
          })
        ]);
        
        setProviders(providersData);
        setProducts(productsData);
        setFilteredProviders(providersData);
      } catch (error) {
        console.error('Error loading data:', error);
        setError(`Failed to load data from Supabase: ${error instanceof Error ? error.message : 'Unknown error'}`);
        // Set empty arrays to prevent further errors
        setProviders([]);
        setProducts([]);
        setFilteredProviders([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Apply filters when filters or country changes
  useEffect(() => {
    const applyFilters = async () => {
      if (providers.length === 0) return;
      
      try {
        // Create filters with country included
        const filtersWithCountry = {
          ...providerFilters,
          locations: selectedCountry ? [selectedCountry] : []
        };
        
        const filtered = await SupabaseService.getProviders(filtersWithCountry);
        setFilteredProviders(filtered);
      } catch (error) {
        console.error('Error applying filters:', error);
        // Don't show error for filter failures, just keep current data
      }
    };

    applyFilters();
  }, [providerFilters, selectedCountry, providers.length]);

  useEffect(() => {
    trackMarketplaceView('marketplace_main', {
      page_type: 'marketplace',
      providers_count: providers.length,
      products_count: products.length,
      country: selectedCountry
    });
  }, [providers.length, products.length, selectedCountry]);

  const handleProviderFiltersChange = useCallback((newFilters: Partial<ProviderFilters>) => {
    setProviderFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const handleProductFiltersChange = useCallback((newFilters: Partial<ProductFilters>) => {
    setProductFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Show error state
  if (error) {
    return (
      <div className="w-full min-h-screen bg-black text-white font-montserrat">
        <div className="container mx-auto px-4 py-20">
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-400">⚠️ Connection Issue</h2>
            <p className="text-white/80 mb-6">{error}</p>
            <div className="text-left bg-black/50 rounded-lg p-4 mb-6">
              <p className="text-white/80 mb-2"><strong>To fix this:</strong></p>
              <ul className="text-white/60 space-y-1">
                <li>• Check your Supabase credentials in the .env.local file</li>
                <li>• Ensure your Supabase database has the required tables</li>
                <li>• Verify your database has Row Level Security (RLS) policies set up</li>
              </ul>
            </div>
            <Link 
              href="/catalog/countries" 
              className="inline-flex items-center px-6 py-3 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 transition-colors"
            >
              ← Back to Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black text-white font-montserrat">
      {/* Background */}
      <div className="hidden md:block w-full h-full absolute top-0 left-0 z-0">
        <DNAParticles />
      </div>
      <div className="block md:hidden w-full h-full absolute top-0 left-0 z-0" style={{opacity: 0.25}}>
        <DNABackground />
      </div>
      
      {/* Header */}
      <div className="sticky md:fixed top-0 left-0 z-30 w-full pointer-events-none bg-black/80 md:bg-transparent" style={{WebkitBackdropFilter: 'blur(2px)'}}>
        <div className="flex flex-row justify-between items-center w-full px-4 md:px-12 pt-4 md:pt-[5vh] pointer-events-auto">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl md:text-4xl font-bold tracking-tight text-white select-none hover:text-fuchsia-300 transition-colors">TheArc</Link>
            <nav className="hidden md:flex space-x-6 text-base font-medium ml-8">
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About TheArc</Link>
              <Link href="/knowledgebase" className="text-gray-400 hover:text-white transition-colors">Knowledgebase</Link>
              <Link href="/catalog" className="text-white hover:text-fuchsia-300 transition-colors">Catalog of Services</Link>
              <Link href="/events" className="text-gray-400 hover:text-white transition-colors">Events</Link>
            </nav>
          </div>
          
          {/* Right side - Desktop Action buttons / Mobile Burger Menu */}
          <div className="hidden md:flex items-center space-x-4 text-base font-light">
            <Link 
              href="/screening" 
              className="border border-blue-400 text-blue-200 bg-transparent hover:bg-blue-900/10 hover:text-blue-300 hover:ring-2 hover:ring-blue-400/40 backdrop-blur-sm transition-all font-semibold text-base md:text-lg px-6 py-2 rounded-full tracking-wide"
            >
              Health Screening
            </Link>
            <Link 
              href="/contact" 
              className="border border-fuchsia-400 text-fuchsia-200 bg-transparent hover:bg-fuchsia-900/10 hover:text-fuchsia-300 hover:ring-2 hover:ring-fuchsia-400/40 backdrop-blur-sm transition-all font-semibold text-base md:text-lg px-6 py-2 rounded-full tracking-wide"
            >
              Apply to Join
            </Link>
          </div>
          <div className="md:hidden">
            <BurgerMenu />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-32 md:pt-40 pb-20 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>→</span>
              <Link href="/catalog" className="hover:text-white transition-colors">Catalog</Link>
              <span>→</span>
              <span className="text-white">Marketplace</span>
            </div>
          </nav>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-white">
                Health & Longevity Marketplace
              </h1>
              <p className="text-lg text-white/80">
                {filteredProviders.length} providers • {products.length} products available
                {selectedCountry && ` • ${selectedCountry}`}
              </p>
            </div>
            <Link 
              href="/catalog/countries" 
              className="hidden md:flex items-center px-4 py-2 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all"
            >
              ← Change Region
            </Link>
          </div>

          {/* Show loading state with content */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-400"></div>
              <span className="ml-4 text-white/80">Loading Marketplace...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <FiltersSidebar
                  providers={providers}
                  products={products}
                  providerFilters={providerFilters}
                  productFilters={productFilters}
                  onProviderFiltersChange={handleProviderFiltersChange}
                  onProductFiltersChange={handleProductFiltersChange}
                />
              </div>

              {/* Providers Grid */}
              <div className="lg:col-span-3">
                <ProvidersGrid
                  providers={filteredProviders}
                  loading={loading}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Filters Sidebar Component
function FiltersSidebar({
  providers,
  products,
  providerFilters,
  productFilters,
  onProviderFiltersChange,
  onProductFiltersChange
}: {
  providers: Provider[];
  products: Product[];
  providerFilters: ProviderFilters;
  productFilters: ProductFilters;
  onProviderFiltersChange: (filters: Partial<ProviderFilters>) => void;
  onProductFiltersChange: (filters: Partial<ProductFilters>) => void;
}) {
  const [availableBiomarkers, setAvailableBiomarkers] = useState<string[]>([]);

  // Beautiful predefined filter options
  const filterData = {
    testCollectionMethods: [
      'at-home kit', 'lab', 'visit required', 'mobile nurse', 
      'in-clinic', 'partnerlabs', 'pharmacy pickup'
    ],
    pricingTiers: [
      'low cost', 'mid range', 'premium', 
      'subscription model', 'pay per test'
    ],
    positioning: [
      'preventive care', 'longevity focused', 'holistic approach',
      'clinical precision', 'biohacker friendly', 'science first',
      'luxury health', 'budget friendly', 'ai driven'
    ],
    serviceTypes: [
      'blood tests', 'urine tests', 'stool tests', 'saliva tests',
      'genetic testing', 'epigenetic testing', 'hormonal testing',
      'microbiome analysis', 'cardiometabolic panels', 'longevity screening',
      'vitamin mineral panels', 'inflammation panels', 'cancer screening',
      'biological age test', 'fertility tests', 'mental health panels'
    ]
  };

  // Load biomarkers from products
  useEffect(() => {
    const loadBiomarkers = async () => {
      try {
        // Fetch all biomarkers from the Biomarkers table
        const allBiomarkers = await SupabaseService.getAllBiomarkers();
        const biomarkerNames = allBiomarkers.map(bio => bio['biomarker name']).sort();
        setAvailableBiomarkers(biomarkerNames);
      } catch (error) {
        console.error('Error loading biomarkers:', error);
        // Fallback to extracting from products
        const allBiomarkers = new Set<string>();
        products.forEach(product => {
          if (product.biomarkers) {
            const biomarkers = SupabaseService.extractProductBiomarkers(product.biomarkers);
            biomarkers.forEach(bio => {
              allBiomarkers.add(bio.name);
            });
          }
        });
        setAvailableBiomarkers(Array.from(allBiomarkers).sort());
      }
    };
    
    loadBiomarkers();
  }, [products]);

  const handleProviderTagChange = useCallback((tag: string, checked: boolean) => {
    const normalizedTag = tag.replace(/\s+/g, '_');
    const newTags = checked
      ? [...providerFilters.tags, normalizedTag]
      : providerFilters.tags.filter(t => t !== normalizedTag);
    onProviderFiltersChange({ tags: newTags });
  }, [providerFilters.tags, onProviderFiltersChange]);

  const handleProductTagChange = useCallback((tag: string, checked: boolean) => {
    const normalizedTag = tag.replace(/\s+/g, '_');
    const newTags = checked
      ? [...productFilters.tags, normalizedTag]
      : productFilters.tags.filter(t => t !== normalizedTag);
    onProductFiltersChange({ tags: newTags });
  }, [productFilters.tags, onProductFiltersChange]);

  const handleBiomarkerChange = useCallback((biomarker: string, checked: boolean) => {
    const currentBiomarkers = productFilters.biomarkers || [];
    const newBiomarkers = checked
      ? [...currentBiomarkers, biomarker]
      : currentBiomarkers.filter(b => b !== biomarker);
    onProductFiltersChange({ biomarkers: newBiomarkers });
  }, [productFilters.biomarkers, onProductFiltersChange]);

  const clearAllFilters = useCallback(() => {
    onProviderFiltersChange({ 
      locations: [], 
      tags: [], 
      hasProducts: false 
    });
    onProductFiltersChange({ 
      tags: [], 
      biomarkers: [], 
      available: true 
    });
  }, [onProviderFiltersChange, onProductFiltersChange]);

  const CheckboxOption = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
    <div className="flex items-center space-x-3 py-2 cursor-pointer" onClick={onChange}>
      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
        checked 
          ? 'bg-fuchsia-500 border-fuchsia-500' 
          : 'border-white/30 hover:border-white/50'
      }`}>
        {checked && <span className="text-white text-xs">✓</span>}
      </div>
      <span className="text-white/80 text-sm hover:text-white transition-colors">{label}</span>
    </div>
  );

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Filters</h2>
        <button 
          onClick={clearAllFilters}
          className="text-fuchsia-400 hover:text-fuchsia-300 text-sm font-medium transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Find Provider Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Find Provider</h3>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-white/80 mb-3">Test Collection Method</h4>
          <div className="space-y-1">
            {filterData.testCollectionMethods.map(method => {
              const normalizedMethod = method.replace(/\s+/g, '_');
              return (
                <CheckboxOption
                  key={method}
                  label={method}
                  checked={providerFilters.tags.includes(normalizedMethod)}
                  onChange={() => handleProviderTagChange(method, !providerFilters.tags.includes(normalizedMethod))}
                />
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-medium text-white/80 mb-3">Pricing Tier</h4>
          <div className="space-y-1">
            {filterData.pricingTiers.map(tier => {
              const normalizedTier = tier.replace(/\s+/g, '_');
              return (
                <CheckboxOption
                  key={tier}
                  label={tier}
                  checked={providerFilters.tags.includes(normalizedTier)}
                  onChange={() => handleProviderTagChange(tier, !providerFilters.tags.includes(normalizedTier))}
                />
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-medium text-white/80 mb-3">Positioning</h4>
          <div className="space-y-1">
            {filterData.positioning.map(pos => {
              const normalizedPos = pos.replace(/\s+/g, '_');
              return (
                <CheckboxOption
                  key={pos}
                  label={pos}
                  checked={providerFilters.tags.includes(normalizedPos)}
                  onChange={() => handleProviderTagChange(pos, !providerFilters.tags.includes(normalizedPos))}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Find Product Section */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Find Product</h3>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-white/80 mb-3">Service Type</h4>
          <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
            {filterData.serviceTypes.map(service => {
              const normalizedService = service.replace(/\s+/g, '_');
              return (
                <CheckboxOption
                  key={service}
                  label={service}
                  checked={productFilters.tags.includes(normalizedService)}
                  onChange={() => handleProductTagChange(service, !productFilters.tags.includes(normalizedService))}
                />
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-white/80 mb-3">Biomarkers</h4>
          <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
            {availableBiomarkers.slice(0, 20).map(biomarker => (
              <CheckboxOption
                key={biomarker}
                label={biomarker}
                checked={(productFilters.biomarkers || []).includes(biomarker)}
                onChange={() => handleBiomarkerChange(biomarker, !(productFilters.biomarkers || []).includes(biomarker))}
              />
            ))}
          </div>
          {availableBiomarkers.length > 20 && (
            <p className="text-white/60 text-xs mt-2">+ {availableBiomarkers.length - 20} more biomarkers available</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Providers Grid Component
function ProvidersGrid({
  providers,
  loading
}: {
  providers: Provider[];
  loading: boolean;
}) {
  const handleProviderClick = useCallback((providerId: number) => {
    window.open(`/marketplace/provider/${providerId}`, '_blank', 'noopener,noreferrer');
  }, []);

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient || loading) {
    return (
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
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-white/10 rounded"></div>
              <div className="h-3 bg-white/10 rounded w-4/5"></div>
            </div>
            <div className="flex space-x-2">
              <div className="h-6 bg-white/10 rounded-full w-16"></div>
              <div className="h-6 bg-white/10 rounded-full w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (providers.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-6">🔍</div>
        <h3 className="text-2xl font-bold text-white mb-4">No providers found</h3>
        <p className="text-white/80 mb-8">Try adjusting your filters or search criteria</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {providers.map((provider) => {
        const providerTags = SupabaseService.extractProviderTags(provider.Tag);
        
        return (
          <div 
            key={provider.id} 
            className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-fuchsia-400/50 transition-all duration-300 hover:bg-white/10 cursor-pointer"
            onClick={() => handleProviderClick(provider.id)}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-fuchsia-500/20 rounded-lg flex items-center justify-center">
                <span className="text-fuchsia-400 font-bold text-lg">
                  {provider["Company Name"] ? provider["Company Name"].charAt(0).toUpperCase() : 'P'}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white group-hover:text-fuchsia-300 transition-colors">
                  {provider["Company Name"] || 'Unknown Provider'}
                </h3>
                <p className="text-white/60 text-sm">
                  {provider["Company Location"] || 'Global'}
                </p>
              </div>
            </div>

            <p className="text-white/80 text-sm mb-4 line-clamp-3">
              {provider["Company Description"] || 'Providing comprehensive health testing services with state-of-the-art technology and professional expertise.'}
            </p>

            {providerTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {providerTags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-fuchsia-400/20 text-fuchsia-300 text-xs rounded-full">
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
  );
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen bg-black text-white font-montserrat flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-400 mx-auto mb-4"></div>
          <p className="text-white/80">Loading marketplace...</p>
        </div>
      </div>
    }>
      <MarketplacePageContent />
    </Suspense>
  );
}
