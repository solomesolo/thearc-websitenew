"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
      
      {/* Main Content */}
      <div className="relative z-10 pt-20 pb-20 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
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
                    <div className="w-6 h-6 text-fuchsia-400">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
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
                  <div className="w-8 h-8 text-fuchsia-400 mx-auto mb-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
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
    </div>
  );
}
