"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import DNAParticles from '../../../../components/DNAParticles';
import DNABackground from '../../../../components/DNABackground';
import Footer from '../../../../components/Footer';
import BurgerMenu from '../../../../components/BurgerMenu';
import { trackMarketplaceView } from '../../../../utils/mixpanel';
import { Provider, Product } from '../../../../lib/types';
import { SupabaseService } from '../../../../lib/supabaseService';

export default function ProviderDetailPage() {
  const params = useParams();
  const providerId = params?.id as string;
  
  const [provider, setProvider] = useState<Provider | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [similarProviders, setSimilarProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoized values to prevent unnecessary re-renders
  const providerTags = useMemo(() => {
    if (!provider) return [];
    return SupabaseService.extractProviderTags(provider.Tag);
  }, [provider]);

  const companyName = useMemo(() => provider?.['Company Name'] || 'Unknown Company', [provider]);
  const companyLocation = useMemo(() => provider?.['Company Location'] || 'Unknown Location', [provider]);
  const companyDescription = useMemo(() => provider?.['Company Description'] || 'No description available', [provider]);
  const websiteLink = useMemo(() => {
    const link = provider?.['Website Link'];
    if (!link || link === 'NULL' || link === 'EMPTY' || link.trim() === '') return null;
    // Ensure URL starts with http/https
    return link.startsWith('http') ? link : `https://${link}`;
  }, [provider]);
  
  const reviewsLink = useMemo(() => {
    const link = provider?.['Reviews'];
    if (!link || link === 'NULL' || link === 'EMPTY' || link.trim() === '') return null;
    // Ensure URL starts with http/https
    return link.startsWith('http') ? link : `https://${link}`;
  }, [provider]);
  
  const mentionsLink = useMemo(() => {
    const link = provider?.['Mentions'];
    if (!link || link === 'NULL' || link === 'EMPTY' || link.trim() === '') return null;
    // Ensure URL starts with http/https
    return link.startsWith('http') ? link : `https://${link}`;
  }, [provider]);
  
  // Handle Pros and Cons
  const pros = useMemo(() => {
    return provider?.Pros || '';
  }, [provider]);

  const cons = useMemo(() => {
    return provider?.Cons || '';
  }, [provider]);

  // Fetch provider and related data
  useEffect(() => {
    const fetchData = async () => {
      if (!providerId) return;

      try {
        setLoading(true);
        setError(null);

        // Track provider view
        trackMarketplaceView('provider_detail', {
          provider_id: providerId,
          provider_name: 'Loading...'
        });

        // Fetch provider data
        const providerData = await SupabaseService.getProviderById(parseInt(providerId));
        setProvider(providerData);

        // Update tracking with actual provider name
        trackMarketplaceView('provider_detail', {
          provider_id: providerId,
          provider_name: providerData['Company Name'] || 'Unknown'
        });

        // Fetch products for this provider
        const productsData = await SupabaseService.getProductsByProviderId(parseInt(providerId));
        setProducts(productsData);

        // Fetch similar providers
        const similarData = await SupabaseService.getSimilarProviders(parseInt(providerId));
        setSimilarProviders(similarData);

      } catch (err) {
        console.error('Error fetching provider data:', err);
        setError('Failed to load provider information');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [providerId]);

  // Handle opening website in new window
  const handleWebsiteClick = useCallback(() => {
    if (websiteLink && websiteLink !== 'NULL' && websiteLink !== 'EMPTY') {
      window.open(websiteLink, '_blank', 'noopener,noreferrer');
    }
  }, [websiteLink]);

  // Handle opening reviews in new window
  const handleReviewsClick = useCallback(() => {
    if (reviewsLink && reviewsLink !== 'NULL' && reviewsLink !== 'EMPTY') {
      window.open(reviewsLink, '_blank', 'noopener,noreferrer');
    }
  }, [reviewsLink]);

  // Handle opening mentions in new window
  const handleMentionsClick = useCallback(() => {
    if (mentionsLink && mentionsLink !== 'NULL' && mentionsLink !== 'EMPTY') {
      window.open(mentionsLink, '_blank', 'noopener,noreferrer');
    }
  }, [mentionsLink]);

  // Handle opening product in new window
  const handleProductClick = useCallback((productId: number) => {
    window.open(`/marketplace/product/${productId}`, '_blank', 'noopener,noreferrer');
  }, []);

  // Handle opening similar provider in new window
  const handleSimilarProviderClick = useCallback((similarProviderId: number) => {
    window.open(`/marketplace/provider/${similarProviderId}`, '_blank', 'noopener,noreferrer');
  }, []);

  if (loading) {
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
            <div className="flex items-center">
              <Link href="/" className="text-2xl md:text-4xl font-bold tracking-tight text-white select-none hover:text-fuchsia-300 transition-colors">TheArc</Link>
            </div>
            <div className="md:hidden">
              <BurgerMenu />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-400 mx-auto mb-4"></div>
            <p className="text-white/80">Loading provider information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !provider) {
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
            <div className="flex items-center">
              <Link href="/" className="text-2xl md:text-4xl font-bold tracking-tight text-white select-none hover:text-fuchsia-300 transition-colors">TheArc</Link>
            </div>
            <div className="md:hidden">
              <BurgerMenu />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-400 mb-4">Provider Not Found</h2>
            <p className="text-white/80 mb-8">{error || 'The requested provider could not be found.'}</p>
            <Link 
              href="/marketplace" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-semibold bg-gradient-to-r from-fuchsia-800 via-fuchsia-600 to-fuchsia-400 text-white shadow-lg border-2 border-fuchsia-700 hover:scale-105 transition-all"
            >
              ← Back to Marketplace
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
              <Link href="/catalog/countries" className="text-white hover:text-fuchsia-300 transition-colors">Catalog of Services</Link>
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
              <Link href="/catalog/countries" className="hover:text-white transition-colors">Catalog</Link>
              <span>→</span>
              <Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
              <span>→</span>
              <span className="text-white">{companyName}</span>
            </div>
          </nav>

          {/* Provider Header */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {provider.logo ? (
                <img 
                  src={provider.logo} 
                  alt={companyName} 
                  className="w-20 h-20 rounded-full object-cover border-2 border-white/20" 
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-fuchsia-600 flex items-center justify-center text-white text-2xl font-bold border-2 border-white/20">
                  {companyName.charAt(0).toUpperCase()}
                </div>
              )}
              
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                  {companyName}
                </h1>
                <p className="text-xl text-white/80 mb-4">
                  {companyLocation}
                </p>
                <p className="text-white/70 leading-relaxed">
                  {companyDescription}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              {websiteLink && (
                <button
                  onClick={handleWebsiteClick}
                  className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105"
                >
                  Visit Website
                </button>
              )}
              {reviewsLink && (
                <button
                  onClick={handleReviewsClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105"
                >
                  View Reviews
                </button>
              )}
              {mentionsLink && (
                <button
                  onClick={handleMentionsClick}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105"
                >
                  View Mentions
                </button>
              )}
            </div>
          </div>

          {/* Tags */}
          {providerTags.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Tags & Categories</h2>
              <div className="flex flex-wrap gap-3">
                {providerTags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="bg-fuchsia-800/30 text-fuchsia-300 text-sm px-4 py-2 rounded-full border border-fuchsia-600/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pros and Cons */}
          {(pros || cons) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {pros && (
                <div className="bg-green-900/20 border border-green-600/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-400 mb-4">✅ Pros</h3>
                  <p className="text-white/80 leading-relaxed">{pros}</p>
                </div>
              )}
              {cons && (
                <div className="bg-red-900/20 border border-red-600/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-red-400 mb-4">❌ Cons</h3>
                  <p className="text-white/80 leading-relaxed">{cons}</p>
                </div>
              )}
            </div>
          )}

          {/* Products */}
          {products.length > 0 && (
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">Available Products & Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-fuchsia-400/50 transition-all cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-fuchsia-300 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-white/80 mb-4 text-sm line-clamp-3">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-fuchsia-400 font-semibold">
                        {product.price} EUR
                      </span>
                      <span className="text-white/60 text-sm">
                        View Details →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Similar Providers */}
          {similarProviders.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Similar Providers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProviders.map((similarProvider) => (
                  <div 
                    key={similarProvider.id} 
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-fuchsia-400/50 transition-all cursor-pointer"
                    onClick={() => handleSimilarProviderClick(similarProvider.id)}
                  >
                    <div className="flex items-center mb-4">
                      {similarProvider.logo ? (
                        <img 
                          src={similarProvider.logo} 
                          alt={similarProvider['Company Name']} 
                          className="w-12 h-12 rounded-full mr-4 object-cover" 
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-fuchsia-600 flex items-center justify-center text-white text-lg font-bold mr-4">
                          {similarProvider['Company Name']?.charAt(0).toUpperCase() || 'P'}
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-fuchsia-300 transition-colors">
                          {similarProvider['Company Name'] || 'Unknown Provider'}
                        </h3>
                        <p className="text-white/60 text-sm">
                          {similarProvider['Company Location'] || 'Global'}
                        </p>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm line-clamp-2 mb-4">
                      {similarProvider['Company Description'] || 'Providing comprehensive health testing services.'}
                    </p>
                    <span className="text-fuchsia-400 text-sm font-medium">
                      View Provider →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
