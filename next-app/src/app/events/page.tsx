"use client";

import Link from "next/link";
import DNAParticles from "../../components/DNAParticles";
import DNABackground from "../../components/DNABackground";
import Footer from "../../components/Footer";
import BurgerMenu from "../../components/BurgerMenu";

export default function EventsPage() {
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
                <Link href="/knowledgebase" className="text-gray-400 hover:text-white transition-colors">Knowledgebase</Link>
                <Link href="/catalog" className="text-gray-400 hover:text-white transition-colors">Catalog of Services</Link>
                <Link href="/events" className="text-white hover:text-fuchsia-300 transition-colors">Events</Link>
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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-white">
            Events
          </h1>
          
          <p className="text-lg text-white/80 mb-12 leading-relaxed">
            Join our expert-led sessions, workshops, and community events designed to deepen your 
            understanding of longevity science and connect with like-minded individuals.
          </p>
          
          {/* Featured Event */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Event Image/Visual */}
              <div className="lg:w-1/3 bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 p-8 flex items-center justify-center">
                <Link href="/events/chatgpt-health-plan" className="block">
                  <img 
                    src="/event-chatgpt-health.svg" 
                    alt="ChatGPT Health Plan Event - October 30, 2025" 
                    className="w-full h-auto rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
                  />
                </Link>
              </div>
              
              {/* Event Details */}
              <div className="lg:w-2/3 p-8">
                <Link href="/events/chatgpt-health-plan">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 hover:text-fuchsia-300 transition-colors cursor-pointer">
                    Would You Let ChatGPT Run Your Health Plan?
                  </h2>
                </Link>
                
                {/* Event Labels */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-white text-sm font-medium">October 30, 2025</span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-white text-sm font-medium">6:00 PM - 8:00 PM CET</span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-white text-sm font-medium">Online Event</span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-green-500/20 text-green-300 rounded-full px-4 py-2">
                    <span className="text-green-300 text-sm font-medium">Free</span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-blue-500/20 text-blue-300 rounded-full px-4 py-2">
                    <span className="text-blue-300 text-sm font-medium">General Audience</span>
                  </div>
                </div>
                
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  AI promises to revolutionize how we understand our bodies, analyzing blood tests in seconds, 
                  predicting risks before doctors do, and even crafting "personalized" longevity blueprints. 
                  But how much of that is science… and how much is illusion?
                </p>
                
                {/* Event Activities */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-white font-medium text-sm">AI Discussion</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-white font-medium text-sm">Health Tech</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-white font-medium text-sm">Expert Panel</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-white font-medium text-sm">Q&A Sessions</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-white font-medium text-sm">Networking</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-white font-medium text-sm">Innovation</div>
                  </div>
                </div>
              </div>
              
              {/* Call to Action */}
              <div className="lg:w-1/6 bg-black/50 flex items-center justify-center p-8">
                <Link 
                  href="/events/chatgpt-health-plan"
                  className="transform -rotate-90 text-white font-bold text-lg tracking-wider hover:text-fuchsia-300 transition-colors"
                >
                  GET A TICKET
                </Link>
              </div>
            </div>
          </div>
          

          {/* Coming Soon Section */}
          <div className="mt-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-white mb-4">Next events are in progress</h3>
              <p className="text-white/80 text-lg mb-6">
                Stay tuned and follow our updates in socials
              </p>
              <div className="flex justify-center space-x-6">
                <a 
                  href="https://www.instagram.com/thearc_me?igsh=MTc2NXc4dDdoemJxYg%3D%3D&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
                  aria-label="Instagram"
                >
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="5" strokeWidth="2"/>
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                  </svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@thearc_me?_t=ZN-8xyNGVEFHqo&_r=1" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
                  aria-label="TikTok"
                >
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M16.5 3v8.25a4.75 4.75 0 11-4.75-4.75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.5 3c.5 2 2.5 3.5 4 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
