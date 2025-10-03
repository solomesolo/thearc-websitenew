"use client";

import Link from "next/link";
import DNAParticles from "../components/DNAParticles";
import DNABackground from "../components/DNABackground";
import Footer from "../components/Footer";
import React, { useRef, useState, useEffect } from "react";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-black text-white font-montserrat">
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center w-full min-h-screen h-screen overflow-visible px-4 md:px-8 py-0 md:py-0 font-montserrat break-words">
        {/* Show DNAParticles on desktop, DNABackground on mobile */}
        <div className="hidden md:block w-full h-full absolute top-0 left-0 z-0">
          <DNAParticles />
        </div>
        <div className="block md:hidden w-full h-full absolute top-0 left-0 z-0" style={{opacity: 0.25}}>
          <DNABackground />
        </div>
        
        {/* Top Bar */}
        <div className="sticky md:fixed top-0 left-0 z-30 w-full pointer-events-none bg-black/80 md:bg-transparent" style={{WebkitBackdropFilter: 'blur(2px)'}}>
          <div className="flex flex-row justify-between items-start w-full px-4 md:px-12 pt-[5vh] pointer-events-auto">
            <div className="text-3xl md:text-4xl font-bold tracking-tight text-white select-none mt-0 md:mt-0">TheArc</div>
            <nav className="flex space-x-4 text-base font-light">
              <Link 
                href="/screening" 
                className="border border-blue-400 text-blue-200 bg-transparent hover:bg-blue-900/10 hover:text-blue-300 hover:ring-2 hover:ring-blue-400/40 backdrop-blur-sm transition-all font-semibold text-base md:text-lg px-4 py-1.5 rounded-full tracking-wide"
              >
                Health Screening
              </Link>
              <Link href="/contact" className="border border-fuchsia-400 text-fuchsia-200 bg-transparent hover:bg-fuchsia-900/10 hover:text-fuchsia-300 hover:ring-2 hover:ring-fuchsia-400/40 backdrop-blur-sm transition-all font-semibold text-base md:text-lg px-4 py-1.5 rounded-full tracking-wide">Apply to Join</Link>
          </nav>
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center z-10 mt-0 md:mt-0 pt-4 md:pt-32 pb-32 md:pb-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight max-w-2xl mx-auto" style={{textShadow: '0 2px 24px #000'}}>
            Longevity isn't a product.<br />
            It's a process.<br />
            Most people drift.<br />
            We create structure, clarity, and belonging.
            </h1>
          <p className="text-base md:text-lg font-normal mb-8 max-w-lg mx-auto text-white/90">
            A private longevity circle guided by science, precision, and deep personalization.<br />
            Built around you. Evolving with you.<br />
            Each cohort limited to 100 people.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link href="/contact" className="inline-flex items-center px-6 py-3 rounded-full text-base font-semibold bg-gradient-to-r from-fuchsia-800 via-fuchsia-600 to-fuchsia-400 text-white shadow-lg border-2 border-fuchsia-700 hover:scale-105 transition-all">
              Apply to Join
              <span className="ml-3 text-xl">&rarr;</span>
            </Link>
            
            {/* Health Screening Button */}
            <Link 
              href="/screening" 
              className="inline-flex items-center px-6 py-3 rounded-full text-base font-semibold bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 text-white shadow-lg border-2 border-blue-700 hover:scale-105 transition-all"
            >
              Free Health Screening
              <span className="ml-3 text-xl">🔬</span>
            </Link>
          </div>
        </div>
      </section>

      {/* The Arc System Statement Section */}
      <section className="flex flex-col items-center justify-center text-center mt-16 mb-4 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 drop-shadow-lg" style={{letterSpacing: '-0.01em'}}>
          The Arc doesn't give you a plan. It gives you a system.
        </h2>
        <p className="text-lg md:text-xl max-w-2xl text-white/80 font-medium">
          One that understands your biology, adapts with your life, and helps you make smarter health decisions month after month.
        </p>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}