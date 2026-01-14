"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import DNAParticles from '../../../../components/DNAParticles';
import DNABackground from '../../../../components/DNABackground';
import BurgerMenu from '../../../../components/BurgerMenu';
import { trackMarketplaceView } from '../../../../utils/mixpanel';
import { Product, Provider, Biomarker } from '../../../../lib/types';
import { SupabaseService } from '../../../../lib/supabaseService';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [biomarkers, setBiomarkers] = useState<Biomarker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoized values
  const productTags = useMemo(() => {
    if (!product) return [];
    return SupabaseService.extractProductTags(product.tags);
  }, [product]);


  const productName = useMemo(() => product?.name || 'Unknown Product', [product]);
  const productDescription = useMemo(() => product?.description || 'No description available', [product]);
  const productPrice = useMemo(() => {
    const price = product?.price;
    return price && parseFloat(price) > 0 ? price : 'Price Unknown';
  }, [product]);
  const aboutTest = useMemo(() => product?.['about this test'] || '', [product]);
  const whatCanItHelp = useMemo(() => product?.['What can it help check or prevent?'] || '', [product]);
  const whoIsItFor = useMemo(() => product?.['Who is this most important for?'] || '', [product]);

  // Fetch product and related data
  useEffect(() => {
    const fetchData = async () => {
      if (!productId) return;

      try {
        setLoading(true);
        setError(null);

        // Track product view
        trackMarketplaceView('product_detail', {
          product_id: productId,
          product_name: 'Loading...'
        });

        // Fetch product data
        const productData = await SupabaseService.getProductById(parseInt(productId));
        setProduct(productData);

        // Update tracking with actual product name
        trackMarketplaceView('product_detail', {
          product_id: productId,
          product_name: productData.name || 'Unknown'
        });

        // Fetch provider data
        if (productData.provider_id) {
          const providerData = await SupabaseService.getProviderById(productData.provider_id);
          setProvider(providerData);
        }

        // Fetch similar products
        const similarData = await SupabaseService.getSimilarProducts(parseInt(productId));
        setSimilarProducts(similarData);

        // Fetch biomarker details from the Biomarkers table
        const biomarkerDetails = await SupabaseService.getProductBiomarkersWithDetails(productData);
        setBiomarkers(biomarkerDetails);

      } catch (err) {
        console.error('Error fetching product data:', err);
        setError('Failed to load product information');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  // Handle opening provider in new window
  const handleProviderClick = useCallback(() => {
    if (provider) {
      window.open(`/marketplace/provider/${provider.id}`, '_blank', 'noopener,noreferrer');
    }
  }, [provider]);

  // Handle opening similar product in new window
  const handleSimilarProductClick = useCallback((similarProductId: number) => {
    window.open(`/marketplace/product/${similarProductId}`, '_blank', 'noopener,noreferrer');
  }, []);

  // Handle biomarker click
  const handleBiomarkerClick = useCallback((biomarkerName: string) => {
    // Could implement biomarker detail view or search
    console.log('Biomarker clicked:', biomarkerName);
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
            <p className="text-white/80">Loading product information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
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
            <h2 className="text-2xl font-bold text-red-400 mb-4">Product Not Found</h2>
            <p className="text-white/80 mb-8">{error || 'The requested product could not be found.'}</p>
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
              <span className="text-white">{productName}</span>
            </div>
          </nav>

          {/* Product Header */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                  {productName}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-2xl font-bold text-fuchsia-400">
                    {productPrice === 'Price Unknown' ? 'Price Unknown' : `${productPrice} EUR`}
                  </span>
                  {provider && (
                    <button
                      onClick={handleProviderClick}
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      by {provider['Company Name'] || 'Unknown Provider'} →
                    </button>
                  )}
                </div>
                <p className="text-white/70 leading-relaxed text-lg">
                  {productDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Product Tags */}
          {productTags.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Product Categories</h2>
              <div className="flex flex-wrap gap-3">
                {productTags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-800/30 text-blue-300 text-sm px-4 py-2 rounded-full border border-blue-600/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* About This Test */}
            {aboutTest && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">About This Test</h3>
                <p className="text-white/80 leading-relaxed">{aboutTest}</p>
              </div>
            )}

            {/* What Can It Help Check or Prevent */}
            {whatCanItHelp && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">What Can It Help Check or Prevent?</h3>
                <p className="text-white/80 leading-relaxed">{whatCanItHelp}</p>
              </div>
            )}

            {/* Who Is This Most Important For */}
            {whoIsItFor && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Who Is This Most Important For?</h3>
                <p className="text-white/80 leading-relaxed">{whoIsItFor}</p>
              </div>
            )}
          </div>

          {/* Biomarkers */}
          {biomarkers.length > 0 && (
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">Biomarkers Tested</h2>
              <div className="space-y-8">
                {biomarkers.map((biomarker, index) => (
                  <div 
                    key={biomarker.id || index} 
                    className="border-b border-white/10 pb-6 last:border-b-0"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <h4 className="text-2xl font-bold text-white">
                        {biomarker['biomarker name']}
                      </h4>
                      {biomarker['biomarker code'] && (
                        <span className="bg-fuchsia-800/30 text-fuchsia-300 text-sm px-3 py-1 rounded-full border border-fuchsia-600/30">
                          {biomarker['biomarker code']}
                        </span>
                      )}
                    </div>
                    
                    {biomarker['biomarker info'] && (
                      <div className="text-white/80 leading-relaxed space-y-3">
                        {biomarker['biomarker info'].split('.').map((sentence, sentenceIndex) => {
                          const trimmedSentence = sentence.trim();
                          if (!trimmedSentence) return null;
                          
                          // Check if this sentence starts with specific keywords
                          const isWhatItMeasures = trimmedSentence.toLowerCase().startsWith('what it measures');
                          const isWhyItMatters = trimmedSentence.toLowerCase().startsWith('why it matters');
                          const isWhoMightConsider = trimmedSentence.toLowerCase().startsWith('who might consider');
                          const isWhoShouldNot = trimmedSentence.toLowerCase().startsWith('who should not');
                          
                          if (isWhatItMeasures || isWhyItMatters || isWhoMightConsider || isWhoShouldNot) {
                            return (
                              <div key={sentenceIndex} className="flex flex-col">
                                <span className="font-semibold text-white mb-1">
                                  {trimmedSentence.split(':')[0]}:
                                </span>
                                <span className="ml-4">
                                  {trimmedSentence.split(':').slice(1).join(':').trim()}
                                </span>
                              </div>
                            );
                          }
                          
                          // Regular sentence
                          return (
                            <p key={sentenceIndex}>
                              {trimmedSentence}.
                            </p>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Similar Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarProducts.map((similarProduct) => (
                  <div 
                    key={similarProduct.id} 
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-fuchsia-400/50 transition-all cursor-pointer"
                    onClick={() => handleSimilarProductClick(similarProduct.id)}
                  >
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-fuchsia-300 transition-colors">
                      {similarProduct.name}
                    </h3>
                    <p className="text-white/80 mb-4 text-sm line-clamp-3">
                      {similarProduct.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-fuchsia-400 font-semibold">
                        {similarProduct.price && parseFloat(similarProduct.price) > 0 ? `${similarProduct.price} EUR` : 'Price Unknown'}
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
        </div>
      </div>
    </div>
  );
}
