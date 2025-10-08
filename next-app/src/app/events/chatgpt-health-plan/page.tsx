"use client";

import Link from "next/link";
import DNAParticles from "../../../components/DNAParticles";
import DNABackground from "../../../components/DNABackground";
import Footer from "../../../components/Footer";

export default function ChatGPTHealthPlanEventPage() {
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
        <div className="flex flex-row justify-between items-start w-full px-4 md:px-12 pt-[5vh] pointer-events-auto">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-3xl md:text-4xl font-bold tracking-tight text-white select-none hover:text-fuchsia-300 transition-colors">TheArc</Link>
            <nav className="hidden md:flex space-x-6 text-base font-medium">
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About TheArc</Link>
              <Link href="/knowledgebase" className="text-gray-400 hover:text-white transition-colors">Knowledgebase</Link>
              <Link href="/catalog" className="text-gray-400 hover:text-white transition-colors">Catalog of Services</Link>
              <Link href="/events" className="text-white hover:text-fuchsia-300 transition-colors">Events</Link>
            </nav>
          </div>
          
          {/* Right side - Action buttons */}
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

      {/* Main Content */}
      <div className="relative z-10 pt-32 md:pt-40 pb-20 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Back to Events */}
          <Link href="/events" className="inline-flex items-center text-fuchsia-400 hover:text-fuchsia-300 mb-8 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Events
          </Link>

          {/* Event Hero Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden mb-12">
            <div className="p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Would You Let ChatGPT Run Your Health Plan?
              </h1>
              
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
                  <span className="text-white text-sm font-medium">6:00 PM CET</span>
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

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="bg-fuchsia-500/20 text-fuchsia-300 px-3 py-1 rounded-full text-sm font-medium">Longevity</span>
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">AI</span>
                <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">Innovation</span>
              </div>

              {/* CTA Button */}
              <a 
                href="https://www.eventbrite.co.uk/e/would-you-let-chatgpt-run-your-health-plan-tickets-1784104086349?aff=oddtdtcreator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-fuchsia-500 text-white rounded-full font-bold text-lg hover:from-fuchsia-700 hover:to-fuchsia-600 transition-all transform hover:scale-105"
              >
                Get a Ticket
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Event Description */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">About This Event</h2>
                
                <div className="space-y-6 text-white/80 leading-relaxed">
                  <p className="text-lg">
                    AI promises to revolutionize how we understand our bodies, analyzing blood tests in seconds, 
                    predicting risks before doctors do, and even crafting "personalized" longevity blueprints. 
                    But how much of that is science… and how much is illusion?
                  </p>
                  
                  <p>
                    In this session, we'll explore the growing temptation to hand our health decisions over to algorithms. 
                    Can ChatGPT really tell you how to live longer, or does it just sound convincing? What happens when 
                    AI-generated advice conflicts with medical expertise, or with your own intuition?
                  </p>
                  
                  <p>
                    Join us for a candid, non-technical conversation that cuts through the hype. Together, we'll look at 
                    where AI can genuinely enhance self-monitoring and where blind trust could lead to risk, misinformation, 
                    or dependency.
                  </p>
                  
                  <p className="text-fuchsia-300 font-medium">
                    Because when it comes to longevity, outsourcing your body's decisions might just shorten your life.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Speaker Info */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Speaker</h3>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">AS</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">Anna Solovyova</h4>
                  <p className="text-fuchsia-300 text-sm font-medium">AI Expert in Healthcare</p>
                </div>
              </div>

              {/* Event Details */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Event Details</h3>
                <div className="space-y-3 text-white/80">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>October 30, 2025</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>6:00 PM - 8:00 PM CET</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Online Event</span>
                  </div>
                </div>
              </div>

              {/* Register Button */}
              <a 
                href="https://www.eventbrite.co.uk/e/would-you-let-chatgpt-run-your-health-plan-tickets-1784104086349?aff=oddtdtcreator"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-fuchsia-600 to-fuchsia-500 text-white rounded-full font-bold hover:from-fuchsia-700 hover:to-fuchsia-600 transition-all transform hover:scale-105"
              >
                Get a Ticket
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
