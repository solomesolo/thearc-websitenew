"use client";

import Link from "next/link";
import DNAParticles from "../../components/DNAParticles";
import DNABackground from "../../components/DNABackground";
import Footer from "../../components/Footer";
import BurgerMenu from "../../components/BurgerMenu";

export default function KnowledgebasePage() {
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
        <div className="relative flex flex-row justify-between items-center w-full px-4 md:px-12 pt-4 md:pt-[5vh] pointer-events-auto">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl md:text-4xl font-bold tracking-tight text-white select-none hover:text-fuchsia-300 transition-colors">TheArc</Link>
            <nav className="hidden md:flex space-x-6 text-base font-medium ml-8">
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About TheArc</Link>
              <Link href="/knowledgebase" className="text-white hover:text-fuchsia-300 transition-colors">Knowledgebase</Link>
              <Link href="/catalog" className="text-gray-400 hover:text-white transition-colors">Catalog of Services</Link>
              <Link href="/events" className="text-gray-400 hover:text-white transition-colors">Events</Link>
            </nav>
          </div>
          
          {/* Center - Desktop Action buttons (absolutely positioned) */}
          <div className="hidden md:flex items-center space-x-4 text-base font-light absolute left-1/2 transform -translate-x-1/2">
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
          
          {/* Right side - Mobile Burger Menu / Desktop Spacer */}
          <div className="md:hidden">
            <BurgerMenu />
          </div>
          <div className="hidden md:block w-32"></div> {/* Spacer to balance the layout */}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-32 md:pt-40 pb-20 px-4 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-white">
            Knowledgebase
          </h1>
          
          <div className="space-y-8 text-lg text-white/80 leading-relaxed">
            <p>
              Access evidence-based health insights, research summaries, and practical guides 
              to help you make informed decisions about your longevity journey.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4 text-white">Preventive Health</h3>
                <p className="text-white/80 mb-4">
                  Learn about evidence-based screening recommendations and preventive care strategies.
                </p>
                <Link href="#" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium">
                  Explore Articles →
                </Link>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4 text-white">Biomarker Insights</h3>
                <p className="text-white/80 mb-4">
                  Understand what your test results mean and how to optimize your biomarkers.
                </p>
                <Link href="#" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium">
                  Learn More →
                </Link>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4 text-white">Longevity Research</h3>
                <p className="text-white/80 mb-4">
                  Stay updated with the latest research in longevity and aging science.
                </p>
                <Link href="#" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium">
                  Read Research →
                </Link>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4 text-white">Lifestyle Optimization</h3>
                <p className="text-white/80 mb-4">
                  Practical tips for nutrition, exercise, sleep, and stress management.
                </p>
                <Link href="#" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium">
                  Get Tips →
                </Link>
              </div>
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
          <p className="text-white/90 text-base font-medium">
            We're building something amazing for you. Stay tuned!
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
