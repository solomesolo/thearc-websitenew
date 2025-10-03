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

      {/* What is The Arc Section */}
      <section className="flex flex-col items-center justify-center text-center mt-16 mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-white">
          What if your health wasn't a burden, but a system?
        </h2>
        <div className="max-w-4xl text-lg text-white/80 space-y-4">
          <p>You don't need 20 biohacks.<br />
          You don't need to perform health like a routine.<br />
          You need TheArc, which evolves with you.<br />
          This is a 6- or 12-month longevity protocol built from scientific evidence, not trends.<br />
          Rooted in personalisation. Designed to last.</p>
        </div>
      </section>

      {/* Behind the Curtains Section */}
      <section className="flex flex-col items-center justify-center text-center mt-16 mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-white">
          Behind the curtains
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-2 text-white">Personal Operating System</h3>
            <p className="text-base text-white/80">Health begins when rhythm replaces routine.<br />Your path adapts to your health data, not to someone else's standard.</p>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-2 text-white">Quiet Circles, Deep Insight</h3>
            <p className="text-base text-white/80">Ideas land differently in the right space.<br />Expert-led sessions and communication rooms—each designed to refine direction, not add noise.</p>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-2 text-white">No Overwhelm. No Guessing. No Performance.</h3>
            <p className="text-base text-white/80">Most health advice creates friction. This removes it. What remains is the small percentage that quietly changes everything.</p>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-2 text-white">Evolving With You. Even after the program.</h3>
            <p className="text-base text-white/80">Step by step, your system becomes second nature: flexible, intuitive, and lasting well beyond the program.</p>
        </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="flex flex-col items-center justify-center text-center mt-16 mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-white">
          A Private Longevity Circle
        </h2>
        <div className="max-w-4xl text-lg text-white/80 space-y-4">
          <p>Each cohort is limited to 100 people.<br />
          Expert-led sessions and communication rooms—each designed to refine direction, not add noise.<br />
          Ideas land differently in the right space.</p>
        </div>
      </section>

      {/* Section 6: How Membership Works */}
      <section className="flex flex-col items-center justify-center text-center mt-16 mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-white">
          How The Arc fits into your life
        </h2>
        <div className="max-w-6xl w-full">
          {/* Desktop: Horizontal timeline */}
          <div className="hidden md:flex items-center justify-between relative">
            {/* Progress line */}
            <div className="absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-400"></div>
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-fuchsia-400 to-pink-400 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Apply</h3>
              <p className="text-white/80 mb-4">Submit a short application. We keep cohorts focused and limited.</p>
              <a href="/contact" className="text-fuchsia-400 hover:text-fuchsia-300 text-sm font-medium">Apply Now</a>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Onboarding & Baseline</h3>
              <p className="text-white/80 mb-4">Complete your health assessment and (if needed) minimal tests.</p>
              <a href="/screening" className="text-fuchsia-400 hover:text-fuchsia-300 text-sm font-medium">See Example Assessment</a>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">12 Months of Adaptive Care</h3>
              <p className="text-white/80 mb-4">Receive personalized monthly protocols and trend reviews that evolve with your body.</p>
              <a href="/contact" className="text-fuchsia-400 hover:text-fuchsia-300 text-sm font-medium">View Sample Plan</a>
            </div>
          </div>

          {/* Mobile: Stacked vertically */}
          <div className="md:hidden space-y-6">
            {/* Step 1 */}
            <div className="flex items-start space-x-4 bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-fuchsia-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📋</span>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-white">Apply</h3>
                <p className="text-white/80 mb-3">Submit a short application. We keep cohorts focused and limited.</p>
                <a href="/contact" className="text-fuchsia-400 hover:text-fuchsia-300 text-sm font-medium">Apply Now</a>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start space-x-4 bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">❤️</span>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-white">Onboarding & Baseline</h3>
                <p className="text-white/80 mb-3">Complete your health assessment and (if needed) minimal tests.</p>
                <a href="/screening" className="text-fuchsia-400 hover:text-fuchsia-300 text-sm font-medium">See Example Assessment</a>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start space-x-4 bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📈</span>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-white">12 Months of Adaptive Care</h3>
                <p className="text-white/80 mb-3">Receive personalized monthly protocols and trend reviews that evolve with your body.</p>
                <a href="/contact" className="text-fuchsia-400 hover:text-fuchsia-300 text-sm font-medium">View Sample Plan</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Pricing */}
      <section className="flex flex-col items-center justify-center text-center mt-16 mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-white">
          Choose your path
        </h2>
        <div className="max-w-6xl w-full">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Tier 1 - Foundations */}
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-2 text-white">Foundations</h3>
              <p className="text-white/60 mb-4">6 months</p>
              <div className="text-3xl font-bold mb-2 text-white">€499</div>
              <p className="text-white/60 mb-6">Short-term commitment — experience The Arc framework.</p>
              <ul className="text-white/80 space-y-2 mb-8">
                <li>• Baseline assessment</li>
                <li>• Monthly protocols</li>
                <li>• Community access</li>
              </ul>
              <a href="/contact" className="w-full bg-gradient-to-r from-fuchsia-800 via-fuchsia-600 to-fuchsia-400 text-white py-3 px-6 rounded-full font-semibold hover:scale-105 transition-all inline-block text-center">
                Apply — Foundations
              </a>
            </div>

            {/* Tier 2 - Full Arc (Recommended) */}
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-8 border-2 border-fuchsia-400 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-fuchsia-400 to-pink-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                Most Chosen
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Full Arc</h3>
              <p className="text-white/60 mb-4">12 months</p>
              <div className="text-3xl font-bold mb-2 text-white">€999</div>
              <p className="text-white/60 mb-2">Best value — full year of adaptive care.</p>
              <p className="text-fuchsia-400 text-sm mb-6">Equivalent to €2.74/day</p>
              <ul className="text-white/80 space-y-2 mb-8">
                <li>• Everything in Foundations</li>
                <li>• Quarterly review</li>
                <li>• Marketplace early access</li>
              </ul>
              <a href="/contact" className="w-full bg-gradient-to-r from-fuchsia-800 via-fuchsia-600 to-fuchsia-400 text-white py-3 px-6 rounded-full font-semibold hover:scale-105 transition-all inline-block text-center">
                Apply — Full Arc
              </a>
            </div>

            {/* Tier 3 - Founders Circle */}
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-2 text-white">Founders Circle</h3>
              <p className="text-white/60 mb-4">12 months, limited to 10 seats</p>
              <div className="text-3xl font-bold mb-2 text-white">€1,400</div>
              <p className="text-white/60 mb-6">Limited founding seats with exclusive benefits.</p>
              <ul className="text-white/80 space-y-2 mb-8">
                <li>• Everything in Full Arc</li>
                <li>• 2 private expert reviews</li>
                <li>• Beta access to new tools</li>
              </ul>
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4">
                <p className="text-red-400 text-sm font-medium">Only 3 seats left</p>
              </div>
              <a href="/contact" className="w-full bg-gradient-to-r from-fuchsia-800 via-fuchsia-600 to-fuchsia-400 text-white py-3 px-6 rounded-full font-semibold hover:scale-105 transition-all inline-block text-center">
                Apply — Founders Circle
              </a>
            </div>
          </div>
          
          <p className="text-white/60 text-sm mt-6">Payments processed via Stripe. VAT applied where required.</p>
        </div>
      </section>

      {/* Section 8: Marketplace & Tests */}
      <section className="flex flex-col items-center justify-center text-center mt-16 mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
          Curated testing, made simple
        </h2>
        <p className="text-white/60 mb-2">Available 2025</p>
        <p className="text-white/80 mb-8 max-w-2xl">
          Get the most relevant tests for your goals — vetted providers, transparent pricing, and a clear list of included biomarkers.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full mb-6">
          {/* Product Card 1 */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl">🧬</span>
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Comprehensive Panel</h3>
            <p className="text-white/60 text-sm mb-2">LabCorp</p>
            <div className="text-2xl font-bold text-white mb-2">€299</div>
            <p className="text-white/80 text-sm">25+ biomarkers including lipids, hormones, vitamins</p>
          </div>

          {/* Product Card 2 */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl">💊</span>
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Metabolic Panel</h3>
            <p className="text-white/60 text-sm mb-2">Quest Diagnostics</p>
            <div className="text-2xl font-bold text-white mb-2">€199</div>
            <p className="text-white/80 text-sm">15+ metabolic markers for diabetes risk</p>
          </div>

          {/* Product Card 3 */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-red-400 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl">❤️</span>
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Cardiovascular Panel</h3>
            <p className="text-white/60 text-sm mb-2">Private Lab</p>
            <div className="text-2xl font-bold text-white mb-2">€149</div>
            <p className="text-white/80 text-sm">12+ heart health markers and inflammation</p>
          </div>
        </div>

        <a href="/screening" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium mb-4">Explore the marketplace</a>
        <p className="text-white/60 text-sm">Start from your free screening results or browse providers directly.</p>
      </section>

      {/* Section 9: Cohort Scarcity Widget */}
      <section className="sticky bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-white/10 py-4 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-white font-semibold">Next cohort capacity: 100 seats — 23 left</div>
            <div className="w-32 bg-white/20 rounded-full h-2">
              <div className="bg-gradient-to-r from-fuchsia-400 to-pink-400 h-2 rounded-full" style={{width: '77%'}}></div>
            </div>
          </div>
          <a href="/contact" className="bg-gradient-to-r from-fuchsia-800 via-fuchsia-600 to-fuchsia-400 text-white py-2 px-6 rounded-full font-semibold hover:scale-105 transition-all">
            Apply now — 23 seats left
          </a>
        </div>
        <p className="text-white/60 text-xs text-center mt-2">Seats updated in real-time.</p>
      </section>

      {/* Section 10: FAQs */}
      <section className="flex flex-col items-center justify-center text-center mt-16 mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-white">
          Frequently asked questions
        </h2>
        <div className="max-w-4xl w-full space-y-4">
          {/* FAQ 1 */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-left">
            <h3 className="text-lg font-bold mb-2 text-white">What is the screening tool?</h3>
            <p className="text-white/80">A quick online tool that suggests which biomarkers matter most for you.</p>
          </div>

          {/* FAQ 2 */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-left">
            <h3 className="text-lg font-bold mb-2 text-white">Do I need to test before joining?</h3>
            <p className="text-white/80">No. We start with your questionnaire; testing is optional and recommended.</p>
          </div>

          {/* FAQ 3 */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-left">
            <h3 className="text-lg font-bold mb-2 text-white">How do applications work?</h3>
            <p className="text-white/80">Submit in 2 minutes. We review within 72 hours.</p>
          </div>

          {/* FAQ 4 */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-left">
            <h3 className="text-lg font-bold mb-2 text-white">How is my data handled?</h3>
            <p className="text-white/80">Your information is private, secure, and fully exportable.</p>
          </div>

          {/* FAQ 5 */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-left">
            <h3 className="text-lg font-bold mb-2 text-white">What about VAT and invoices?</h3>
            <p className="text-white/80">Prices are exclusive of VAT. A VAT-compliant invoice is generated automatically after payment.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}