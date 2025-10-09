"use client";

import Link from "next/link";
import { useEffect } from "react";
import DNAParticles from "../../components/DNAParticles";
import DNABackground from "../../components/DNABackground";
import Footer from "../../components/Footer";
import BurgerMenu from "../../components/BurgerMenu";
import { trackMarketplaceView } from "../../utils/mixpanel";

export default function CatalogPage() {
  useEffect(() => {
    // Track marketplace view
    trackMarketplaceView('catalog_main', {
      page_type: 'catalog',
      services_available: true
    });
  }, []);
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-white">
            Catalog of Services
          </h1>
          
          <p className="text-lg text-white/80 mb-12 leading-relaxed">
            Comprehensive health and longevity services designed to optimize your well-being 
            through evidence-based approaches and personalized care.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Health Screening */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-4 text-white">Health Screening</h3>
              <p className="text-white/80 mb-6">
                Personalized screening recommendations based on your health profile, age, and risk factors.
              </p>
              <Link href="/screening" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium">
                Start Screening →
              </Link>
            </div>
            
            {/* Membership Programs */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-4 text-white">Membership Programs</h3>
              <p className="text-white/80 mb-6">
                Join our private longevity circle with expert-led sessions and personalized protocols.
              </p>
              <Link href="/contact" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium">
                Apply to Join →
              </Link>
            </div>
            
            {/* Lab Testing */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
              <div className="text-3xl mb-4">🧪</div>
              <h3 className="text-xl font-bold mb-4 text-white">Lab Testing</h3>
              <p className="text-white/80 mb-6">
                Comprehensive biomarker testing across cardiovascular, metabolic, and longevity domains.
              </p>
              <Link href="#" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium">
                View Tests →
              </Link>
            </div>
            
            {/* Health Coaching */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
              <div className="text-3xl mb-4">💪</div>
              <h3 className="text-xl font-bold mb-4 text-white">Health Coaching</h3>
              <p className="text-white/80 mb-6">
                One-on-one guidance to implement your personalized health optimization plan.
              </p>
              <Link href="#" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium">
                Learn More →
              </Link>
            </div>
            
            {/* Genetic Testing */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
              <div className="text-3xl mb-4">🧬</div>
              <h3 className="text-xl font-bold mb-4 text-white">Genetic Testing</h3>
              <p className="text-white/80 mb-6">
                Personalized genetic insights for disease prevention and health optimization.
              </p>
              <Link href="#" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium">
                Explore Options →
              </Link>
            </div>
            
            {/* Microbiome Analysis */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
              <div className="text-3xl mb-4">🦠</div>
              <h3 className="text-xl font-bold mb-4 text-white">Microbiome Analysis</h3>
              <p className="text-white/80 mb-6">
                Comprehensive gut health assessment and personalized nutrition recommendations.
              </p>
              <Link href="#" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium">
                Get Started →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/30 shadow-2xl max-w-md mx-4 text-center">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Coming Soon
          </h2>
          <p className="text-2xl text-white font-bold mb-6 drop-shadow-md">
            in 2025
          </p>
          <p className="text-white/90 text-base font-medium mb-8">
            We're building something amazing for you. Stay tuned!
          </p>
          
          {/* Back to Home Button */}
          <Link 
            href="/" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-semibold bg-gradient-to-r from-fuchsia-800 via-fuchsia-600 to-fuchsia-400 text-white shadow-lg border-2 border-fuchsia-700 hover:scale-105 transition-all"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
