"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DNAParticles from "../../../components/DNAParticles";
import DNABackground from "../../../components/DNABackground";
import Footer from "../../../components/Footer";
import BurgerMenu from "../../../components/BurgerMenu";
import { trackMarketplaceView } from "../../../utils/mixpanel";

interface Country {
  id: number;
  name: string;
  service_count?: number;
}

export default function CountrySelectionPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Track marketplace view
    trackMarketplaceView('catalog_countries', {
      page_type: 'country_selection',
      countries_available: true
    });

    // Fetch countries from API
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('/api/catalog/countries');
      if (response.ok) {
        const data = await response.json();
        setCountries(data.countries || []);
      } else {
        console.error('Failed to fetch countries from API');
        setCountries([]);
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

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
              <span className="text-white">Select Region</span>
            </div>
          </nav>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Select Your Region
          </h1>
          
          <p className="text-lg text-white/80 mb-12 leading-relaxed">
            Choose your country or region to view available health and longevity services in your area.
          </p>
          
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-400"></div>
              <span className="ml-4 text-white/80">Loading regions...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countries.map((country) => (
                <Link
                  key={country.id}
                  href={`/marketplace?country=${encodeURIComponent(country.name)}`}
                  className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-fuchsia-400/50 transition-all duration-300 hover:bg-white/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-fuchsia-300 transition-colors">
                      {country.name}
                    </h3>
                    <div className="text-2xl">🌍</div>
                  </div>
                  
                  {country.service_count && (
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">
                        {country.service_count} services available
                      </span>
                      <div className="text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors">
                        View Services →
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-white/70 text-sm">
                      Explore health screening, lab testing, and longevity services available in {country.name}.
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Popular Regions */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-white">Popular Regions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {countries.slice(0, 4).map((country) => (
                <Link
                  key={`popular-${country.id}`}
                  href={`/marketplace?country=${encodeURIComponent(country.name)}`}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-fuchsia-400/50 transition-all text-center group"
                >
                  <div className="text-3xl mb-2">🌍</div>
                  <h4 className="font-semibold text-white group-hover:text-fuchsia-300 transition-colors">
                    {country.name}
                  </h4>
                  {country.service_count && (
                    <p className="text-white/60 text-xs mt-1">
                      {country.service_count} services
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
