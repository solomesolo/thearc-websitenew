"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import DNAParticles from "../../../components/DNAParticles";
import DNABackground from "../../../components/DNABackground";
import Footer from "../../../components/Footer";
import BurgerMenu from "../../../components/BurgerMenu";
import { trackMarketplaceView } from "../../../utils/mixpanel";

interface Service {
  id: number;
  name: string;
  description: string;
  bio: string;
  link: string;
  logo: string;
  tags: Array<{ id: number; name: string }>;
  categories: Array<{ id: number; name: string }>;
  countries: Array<{ id: number; name: string }>;
  ratings: Array<{ id: number; rating: number; source?: string }>;
  features: Array<{ id: number; name: string; description?: string }>;
}

interface PageStats {
  total_pages: number;
  count: number;
  page: number;
  per_page: number;
}

export default function ServicesPage() {
  const searchParams = useSearchParams();
  const country = searchParams.get('country');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageStats, setPageStats] = useState<PageStats | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (country) {
      trackMarketplaceView('catalog_services', {
        page_type: 'services_list',
        country: country,
        services_available: true
      });
      fetchServices();
    }
  }, [country, currentPage, selectedTags, selectedCategory]);

  const fetchServices = async () => {
    if (!country) return;
    
    setLoading(true);
    try {
      const params = new URLSearchParams({
        country: country,
        page: currentPage.toString(),
        per_page: '12'
      });
      
      if (selectedTags.length > 0) {
        params.append('tags', selectedTags.join(','));
      }
      
      if (selectedCategory) {
        params.append('category', selectedCategory);
      }

      const response = await fetch(`/api/catalog/services?${params}`);
      if (response.ok) {
        const data = await response.json();
        setServices(data.results || []);
        setPageStats(data);
      } else {
        // Fallback data if API is not available
        setServices(getFallbackServices(country));
        setPageStats({
          total_pages: 1,
          count: 6,
          page: 1,
          per_page: 12
        });
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices(getFallbackServices(country));
      setPageStats({
        total_pages: 1,
        count: 6,
        page: 1,
        per_page: 12
      });
    } finally {
      setLoading(false);
    }
  };

  const getFallbackServices = (countryName: string): Service[] => {
    return [
      {
        id: 1,
        name: "HealthSpan Diagnostics",
        description: "Comprehensive biomarker testing for longevity optimization",
        bio: "Leading provider of advanced health diagnostics with focus on preventive medicine and longevity biomarkers.",
        link: "https://example.com",
        logo: "/api/placeholder/120/80",
        tags: [{ id: 1, name: "Lab Testing" }, { id: 2, name: "Longevity" }],
        categories: [{ id: 1, name: "Health Screening" }],
        countries: [{ id: 1, name: countryName }],
        ratings: [{ id: 1, rating: 4.5, source: "Trustpilot" }],
        features: [{ id: 1, name: "Home Testing", description: "Convenient home sample collection" }]
      },
      {
        id: 2,
        name: "Vitality Labs",
        description: "Advanced metabolic and cardiovascular health testing",
        bio: "Specialized in metabolic health assessment and cardiovascular risk evaluation.",
        link: "https://example.com",
        logo: "/api/placeholder/120/80",
        tags: [{ id: 3, name: "Metabolic Health" }, { id: 4, name: "Cardiovascular" }],
        categories: [{ id: 2, name: "Lab Testing" }],
        countries: [{ id: 1, name: countryName }],
        ratings: [{ id: 2, rating: 4.2, source: "Google" }],
        features: [{ id: 2, name: "Fast Results", description: "Results within 48 hours" }]
      },
      {
        id: 3,
        name: "Longevity Institute",
        description: "Personalized longevity protocols and health optimization",
        bio: "Comprehensive longevity programs combining testing, coaching, and personalized protocols.",
        link: "https://example.com",
        logo: "/api/placeholder/120/80",
        tags: [{ id: 5, name: "Longevity" }, { id: 6, name: "Coaching" }],
        categories: [{ id: 3, name: "Health Coaching" }],
        countries: [{ id: 1, name: countryName }],
        ratings: [{ id: 3, rating: 4.8, source: "Trustpilot" }],
        features: [{ id: 3, name: "Personal Coach", description: "Dedicated health coach" }]
      },
      {
        id: 4,
        name: "Genetic Insights",
        description: "Comprehensive genetic testing and analysis",
        bio: "Advanced genetic testing for disease prevention and health optimization.",
        link: "https://example.com",
        logo: "/api/placeholder/120/80",
        tags: [{ id: 7, name: "Genetic Testing" }, { id: 8, name: "Prevention" }],
        categories: [{ id: 4, name: "Genetic Testing" }],
        countries: [{ id: 1, name: countryName }],
        ratings: [{ id: 4, rating: 4.3, source: "Google" }],
        features: [{ id: 4, name: "Comprehensive Report", description: "Detailed genetic analysis" }]
      },
      {
        id: 5,
        name: "Microbiome Health",
        description: "Gut health analysis and personalized nutrition",
        bio: "Advanced microbiome testing with personalized nutrition recommendations.",
        link: "https://example.com",
        logo: "/api/placeholder/120/80",
        tags: [{ id: 9, name: "Microbiome" }, { id: 10, name: "Nutrition" }],
        categories: [{ id: 5, name: "Gut Health" }],
        countries: [{ id: 1, name: countryName }],
        ratings: [{ id: 5, rating: 4.6, source: "Trustpilot" }],
        features: [{ id: 5, name: "Nutrition Plan", description: "Personalized meal plans" }]
      },
      {
        id: 6,
        name: "Precision Medicine",
        description: "Personalized medicine based on comprehensive health profiling",
        bio: "Cutting-edge precision medicine approach combining multiple health assessments.",
        link: "https://example.com",
        logo: "/api/placeholder/120/80",
        tags: [{ id: 11, name: "Precision Medicine" }, { id: 12, name: "Personalized" }],
        categories: [{ id: 6, name: "Precision Medicine" }],
        countries: [{ id: 1, name: countryName }],
        ratings: [{ id: 6, rating: 4.7, source: "Google" }],
        features: [{ id: 6, name: "AI Analysis", description: "AI-powered health insights" }]
      }
    ];
  };

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleTagChange = useCallback((tags: number[]) => {
    setSelectedTags(tags);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  if (!country) {
    return (
      <div className="w-full min-h-screen bg-black text-white font-montserrat flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">No Country Selected</h1>
          <p className="text-white/80 mb-8">Please select a country to view services.</p>
          <Link 
            href="/catalog/countries" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-semibold bg-gradient-to-r from-fuchsia-800 via-fuchsia-600 to-fuchsia-400 text-white shadow-lg border-2 border-fuchsia-700 hover:scale-105 transition-all"
          >
            ← Back to Countries
          </Link>
        </div>
      </div>
    );
  }

  // Redirect to marketplace with country parameter
  useEffect(() => {
    if (country) {
      window.location.href = `/marketplace?country=${encodeURIComponent(country)}`;
    }
  }, [country]);

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
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>→</span>
              <Link href="/catalog" className="hover:text-white transition-colors">Catalog</Link>
              <span>→</span>
              <Link href="/catalog/countries" className="hover:text-white transition-colors">Countries</Link>
              <span>→</span>
              <span className="text-white">{country}</span>
            </div>
          </nav>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-white">
                Services in {country}
              </h1>
              {pageStats && (
                <p className="text-lg text-white/80">
                  {pageStats.count} services available
                </p>
              )}
            </div>
            <Link 
              href="/catalog/countries" 
              className="hidden md:flex items-center px-4 py-2 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all"
            >
              ← Change Region
            </Link>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-white/60 text-sm">Filter by:</span>
              <select 
                value={selectedCategory || ''} 
                onChange={(e) => handleCategoryChange(e.target.value || null)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="">All Categories</option>
                <option value="1">Health Screening</option>
                <option value="2">Lab Testing</option>
                <option value="3">Health Coaching</option>
                <option value="4">Genetic Testing</option>
                <option value="5">Gut Health</option>
                <option value="6">Precision Medicine</option>
              </select>
            </div>
          </div>

          {/* Services Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-400"></div>
              <span className="ml-4 text-white/80">Loading services...</span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-fuchsia-400/50 transition-all duration-300 hover:bg-white/10"
                  >
                    {/* Service Logo */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🏥</span>
                      </div>
                      {service.ratings.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-white/80 text-sm">
                            {service.ratings[0].rating}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Service Info */}
                    <h3 className="text-xl font-bold text-white group-hover:text-fuchsia-300 transition-colors mb-2">
                      {service.name}
                    </h3>
                    
                    <p className="text-white/80 text-sm mb-4 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Categories */}
                    {service.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.categories.slice(0, 2).map((category) => (
                          <span
                            key={category.id}
                            className="px-2 py-1 bg-fuchsia-400/20 text-fuchsia-300 text-xs rounded-full"
                          >
                            {category.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Features */}
                    {service.features.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center space-x-1 text-white/60 text-xs">
                          <span>✨</span>
                          <span>{service.features[0].name}</span>
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <a
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-2 px-4 bg-gradient-to-r from-fuchsia-800 via-fuchsia-600 to-fuchsia-400 text-white rounded-lg font-medium hover:scale-105 transition-all"
                    >
                      Visit Service →
                    </a>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pageStats && pageStats.total_pages > 1 && (
                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-white/20 text-white/80 hover:text-white hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    ← Previous
                  </button>
                  
                  <span className="px-4 py-2 text-white/80">
                    Page {currentPage} of {pageStats.total_pages}
                  </span>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pageStats.total_pages}
                    className="px-4 py-2 rounded-lg border border-white/20 text-white/80 hover:text-white hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
