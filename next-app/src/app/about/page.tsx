"use client";

import Link from "next/link";
import DNAParticles from "../../components/DNAParticles";
import DNABackground from "../../components/DNABackground";
import Footer from "../../components/Footer";
import BurgerMenu from "../../components/BurgerMenu";

export default function AboutPage() {
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
              <Link href="/about" className="text-white hover:text-fuchsia-300 transition-colors">About TheArc</Link>
              <Link href="/knowledgebase" className="text-gray-400 hover:text-white transition-colors">Knowledgebase</Link>
              <Link href="/catalog" className="text-gray-400 hover:text-white transition-colors">Catalog of Services</Link>
              <Link href="/events" className="text-gray-400 hover:text-white transition-colors">Events</Link>
            </nav>
          </div>
          
          {/* Center - Desktop Action buttons */}
          <div className="hidden md:flex items-center justify-center space-x-4 text-base font-light">
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
            About TheArc
          </h1>
          
          <div className="space-y-8 text-lg text-white/80 leading-relaxed">
            <p>
              TheArc is a private longevity circle guided by science, precision, and deep personalization. 
              We believe longevity isn't a product—it's a process that requires structure, clarity, and belonging.
            </p>
            
            <p>
              Our mission is to help you make smarter health decisions with evidence-based screening recommendations 
              and personalized protocols that evolve with your biology and lifestyle.
            </p>
            
            <p>
              Each cohort is limited to 100 people, ensuring focused, expert-led sessions and meaningful connections 
              within our community of health-conscious individuals.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}