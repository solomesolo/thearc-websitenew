"use client";

import Link from "next/link";
import DNAParticles from "../components/DNAParticles";
import DNABackground from "../components/DNABackground";
import Footer from "../components/Footer";
import BurgerMenu from "../components/BurgerMenu";
import React, { useRef, useState, useEffect } from "react";

export default function Home() {
  // Force Vercel to pick up latest changes - routing fix
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
          <div className="relative flex flex-row justify-between items-center w-full px-4 md:px-12 pt-4 md:pt-[5vh] pointer-events-auto">
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
        
        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center z-10 mt-0 md:mt-0 pt-16 md:pt-40 pb-20 md:pb-20 px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight max-w-4xl mx-auto" style={{textShadow: '0 2px 24px #000'}}>
            Longevity isn't a product.<br />
            It's a process.<br />
            Most people drift.<br />
            We create structure, clarity, and belonging.
            </h1>
          <p className="text-sm sm:text-base md:text-lg font-normal mb-8 max-w-2xl mx-auto text-white/90 leading-relaxed">
            A private longevity circle guided by science, precision, and deep personalization.<br />
            Built around you. Evolving with you.<br />
            Each cohort limited to 100 people.
          </p>
          
          {/* Action Buttons - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full max-w-md sm:max-w-none">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full text-sm sm:text-base font-semibold bg-gradient-to-r from-fuchsia-800 via-fuchsia-600 to-fuchsia-400 text-white shadow-lg border-2 border-fuchsia-700 hover:scale-105 transition-all"
            >
              Apply to Join
              <span className="ml-2 sm:ml-3 text-lg sm:text-xl">&rarr;</span>
            </Link>
            
            <Link 
              href="/screening" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 text-white shadow-lg border-2 border-blue-700 hover:scale-105 transition-all"
            >
              Free Health Screening
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

      {/* Section 6: How Membership Works - Roadmap Style */}
      <section className="mt-32 mb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-20 text-white">
            How The Arc fits into your life
          </h2>
          
          {/* Desktop Roadmap */}
          <div className="hidden lg:block">
            <div className="relative">
              
              {/* Step 1 */}
              <div className="flex items-start justify-start mb-24">
                <div className="flex items-center space-x-8">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-fuchsia-400 to-pink-400 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 border-3 border-white transform rotate-45"></div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-fuchsia-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                  </div>
                  <div className="max-w-md">
                    <h3 className="text-2xl font-bold mb-3 text-white">Apply</h3>
                    <p className="text-white/80 text-lg mb-4">Submit a short application. We keep cohorts focused and limited.</p>
                    <a href="/contact" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium text-lg">Apply Now →</a>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start justify-center mb-24">
                <div className="flex items-center space-x-8">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 border-3 border-white rounded-full"></div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                  </div>
                  <div className="max-w-md">
                    <h3 className="text-2xl font-bold mb-3 text-white">Onboarding & Baseline</h3>
                    <p className="text-white/80 text-lg mb-4">Complete your health assessment and (if needed) minimal tests.</p>
                    <a href="/screening" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium text-lg">See Example Assessment →</a>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start justify-end">
                <div className="flex items-center space-x-8">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 border-3 border-white transform rotate-12"></div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                  </div>
                  <div className="max-w-md">
                    <h3 className="text-2xl font-bold mb-3 text-white">12 Months of Adaptive Care</h3>
                    <p className="text-white/80 text-lg mb-4">Receive personalized monthly protocols and trend reviews that evolve with your body.</p>
                    <a href="/contact" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium text-lg">View Sample Plan →</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Roadmap */}
          <div className="lg:hidden space-y-16">
            {/* Step 1 */}
            <div className="flex items-start space-x-6">
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-400 to-pink-400 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border-3 border-white transform rotate-45"></div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-fuchsia-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">Apply</h3>
                <p className="text-white/80 text-base mb-4">Submit a short application. We keep cohorts focused and limited.</p>
                <a href="/contact" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium">Apply Now →</a>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start space-x-6">
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border-3 border-white rounded-full"></div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">Onboarding & Baseline</h3>
                <p className="text-white/80 text-base mb-4">Complete your health assessment and (if needed) minimal tests.</p>
                <a href="/screening" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium">See Example Assessment →</a>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start space-x-6">
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border-3 border-white transform rotate-12"></div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">12 Months of Adaptive Care</h3>
                <p className="text-white/80 text-base mb-4">Receive personalized monthly protocols and trend reviews that evolve with your body.</p>
                <a href="/contact" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium">View Sample Plan →</a>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Pricing */}
      <section className="flex flex-col items-center justify-center text-center mt-20 mb-16 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-white">
          Choose your path
        </h2>
        <div className="max-w-6xl w-full">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Tier 1 - Foundations */}
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all">
              <h3 className="text-2xl font-bold mb-3 text-white">Foundations</h3>
              <p className="text-white/60 mb-6 text-sm font-medium tracking-wide uppercase">6 months</p>
              <div className="text-4xl font-bold mb-3 text-white">€499</div>
              <p className="text-white/60 mb-8 text-lg">Short-term commitment — experience The Arc framework.</p>
              <ul className="text-white/80 space-y-3 mb-10 text-lg">
                <li className="flex items-center"><span className="w-2 h-2 bg-fuchsia-400 rounded-full mr-3"></span>Baseline assessment</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-fuchsia-400 rounded-full mr-3"></span>Monthly protocols</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-fuchsia-400 rounded-full mr-3"></span>Community access</li>
              </ul>
              <a href="/contact" className="w-full bg-gradient-to-r from-fuchsia-800 via-fuchsia-600 to-fuchsia-400 text-white py-4 px-6 rounded-full font-semibold hover:scale-105 transition-all inline-block text-center">
                Apply — Foundations
              </a>
    </div>

            {/* Tier 2 - Full Arc (Recommended) */}
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-fuchsia-400 relative hover:border-fuchsia-300 transition-all">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-fuchsia-400 to-pink-400 text-black px-6 py-2 rounded-full text-sm font-bold">
                Most Chosen
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Full Arc</h3>
              <p className="text-white/60 mb-6 text-sm font-medium tracking-wide uppercase">12 months</p>
              <div className="text-4xl font-bold mb-3 text-white">€999</div>
              <p className="text-white/60 mb-2 text-lg">Best value — full year of adaptive care.</p>
              <p className="text-fuchsia-400 text-sm mb-8 font-medium">Equivalent to €2.74/day</p>
              <ul className="text-white/80 space-y-3 mb-10 text-lg">
                <li className="flex items-center"><span className="w-2 h-2 bg-fuchsia-400 rounded-full mr-3"></span>Everything in Foundations</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-fuchsia-400 rounded-full mr-3"></span>Quarterly review</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-fuchsia-400 rounded-full mr-3"></span>Marketplace early access</li>
          </ul>
              <a href="/contact" className="w-full bg-gradient-to-r from-fuchsia-800 via-fuchsia-600 to-fuchsia-400 text-white py-4 px-6 rounded-full font-semibold hover:scale-105 transition-all inline-block text-center">
                Apply — Full Arc
              </a>
            </div>

            {/* Tier 3 - Founders Circle */}
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all">
              <h3 className="text-2xl font-bold mb-3 text-white">Founders Circle</h3>
              <p className="text-white/60 mb-6 text-sm font-medium tracking-wide uppercase">12 months, limited to 10 seats</p>
              <div className="text-4xl font-bold mb-3 text-white">€1,400</div>
              <p className="text-white/60 mb-8 text-lg">Limited founding seats with exclusive benefits.</p>
              <ul className="text-white/80 space-y-3 mb-8 text-lg">
                <li className="flex items-center"><span className="w-2 h-2 bg-fuchsia-400 rounded-full mr-3"></span>Everything in Full Arc</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-fuchsia-400 rounded-full mr-3"></span>2 private expert reviews</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-fuchsia-400 rounded-full mr-3"></span>Beta access to new tools</li>
          </ul>
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
                <p className="text-red-400 text-sm font-medium text-center">Only 3 seats left</p>
          </div>
              <a href="/contact" className="w-full bg-gradient-to-r from-fuchsia-800 via-fuchsia-600 to-fuchsia-400 text-white py-4 px-6 rounded-full font-semibold hover:scale-105 transition-all inline-block text-center">
                Apply — Founders Circle
              </a>
      </div>
          </div>
          
          <p className="text-white/60 text-sm mt-6">Payments processed via Stripe. VAT applied where required.</p>
      </div>
    </section>



      {/* Section 10: FAQs */}
      <section className="flex flex-col items-center justify-center text-center mt-20 mb-16 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-white">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl w-full space-y-4">
          {/* FAQ 1 */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all">
            <button 
              className="w-full text-left p-6 md:p-8 focus:outline-none"
              onClick={() => {
                const content = document.getElementById('faq1-content');
                const icon = document.getElementById('faq1-icon');
                if (content && icon) {
                  content.classList.toggle('hidden');
                  icon.classList.toggle('rotate-180');
                }
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-bold text-white">What is the free screening?</h3>
                <svg id="faq1-icon" className="w-6 h-6 text-white transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
          </div>
            </button>
            <div id="faq1-content" className="hidden px-6 md:px-8 pb-6 md:pb-8">
              <p className="text-white/80 text-base md:text-lg leading-relaxed">
                The free screening is an online self-assessment designed to help you identify which biomarkers and lifestyle areas may need the most attention.<br /><br />
                It takes around 3–5 minutes and uses evidence-based scoring logic to guide you toward the most relevant tests or program focus areas, without any obligation to buy.<br /><br />
                You'll receive a short report summarizing your potential longevity priorities, and optional next steps if you wish to explore them further through our marketplace or membership.
              </p>
        </div>
          </div>

          {/* FAQ 2 */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all">
            <button 
              className="w-full text-left p-6 md:p-8 focus:outline-none"
              onClick={() => {
                const content = document.getElementById('faq2-content');
                const icon = document.getElementById('faq2-icon');
                if (content && icon) {
                  content.classList.toggle('hidden');
                  icon.classList.toggle('rotate-180');
                }
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-bold text-white">Do I need to test before joining The Arc?</h3>
                <svg id="faq2-icon" className="w-6 h-6 text-white transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
        </div>
            </button>
            <div id="faq2-content" className="hidden px-6 md:px-8 pb-6 md:pb-8">
              <p className="text-white/80 text-base md:text-lg leading-relaxed">
                No. You can begin your Arc journey without any prior testing.<br /><br />
                The first step is your personalized health and longevity questionnaire, that gives us a baseline profile to start shaping your plan.<br /><br />
                If you already have lab data, you can upload it to enrich your assessment.<br /><br />
                Testing becomes relevant once we identify where deeper insights might be valuable, for example, metabolic markers, inflammation, or hormone balance.<br /><br />
                We recommend only the most essential and actionable tests, not an overload of expensive panels.
              </p>
      </div>
          </div>

          {/* FAQ 3 */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all">
            <button 
              className="w-full text-left p-6 md:p-8 focus:outline-none"
              onClick={() => {
                const content = document.getElementById('faq3-content');
                const icon = document.getElementById('faq3-icon');
                if (content && icon) {
                  content.classList.toggle('hidden');
                  icon.classList.toggle('rotate-180');
                }
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-bold text-white">How does the application process work?</h3>
                <svg id="faq3-icon" className="w-6 h-6 text-white transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
        </div>
            </button>
            <div id="faq3-content" className="hidden px-6 md:px-8 pb-6 md:pb-8">
              <p className="text-white/80 text-base md:text-lg leading-relaxed">
                Applications are designed to be simple and selective.<br /><br />
                You complete a short form describing your goals, lifestyle, and expectations - it takes about 2 minutes.<br /><br />
                We review each application manually to ensure every member benefits from the small-cohort structure (limited to 100 people per cycle).<br /><br />
                Once approved, you'll receive a welcome email with onboarding details and access to your private member area.<br /><br />
                Applications are processed within 72 hours, and spaces are confirmed on a first-come basis.
              </p>
        </div>
          </div>

          {/* FAQ 4 */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all">
            <button 
              className="w-full text-left p-6 md:p-8 focus:outline-none"
              onClick={() => {
                const content = document.getElementById('faq4-content');
                const icon = document.getElementById('faq4-icon');
                if (content && icon) {
                  content.classList.toggle('hidden');
                  icon.classList.toggle('rotate-180');
                }
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-bold text-white">How is my data handled and protected?</h3>
                <svg id="faq4-icon" className="w-6 h-6 text-white transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            <div id="faq4-content" className="hidden px-6 md:px-8 pb-6 md:pb-8">
              <p className="text-white/80 text-base md:text-lg leading-relaxed">
                Your privacy is treated as a core part of your care.<br /><br />
                All personal and health data are encrypted, stored securely on EU-based servers, and never shared with third parties without explicit consent.<br /><br />
                You can export or delete your data at any time directly from your dashboard.<br /><br />
                For testing services, results are transmitted securely from verified providers; only you control who can view or access them.<br /><br />
                Our system fully complies with GDPR and medical-data handling standards, ensuring complete confidentiality.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10 text-center hover:border-white/20 transition-all mt-8">
            <p className="text-white/80 text-base md:text-lg mb-4">
              Didn't find what you were looking for?
            </p>
            <a 
              href="mailto:thearc@thearcme.com" 
              className="text-fuchsia-400 hover:text-fuchsia-300 font-medium text-lg inline-flex items-center"
            >
              Ask your question privately →
            </a>
          </div>
        </div>
    </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}