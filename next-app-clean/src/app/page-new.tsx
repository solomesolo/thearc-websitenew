"use client";

import Link from "next/link";
import React from "react";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* 1️⃣ Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Tagline + CTAs */}
          <div className="z-10">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Find your own health formula.
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Understand what works for your body, not what's trending.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/free-screening"
                className="px-8 py-4 bg-[#00C9A7] text-black font-semibold rounded-lg hover:bg-[#00E5C4] transition-colors text-center"
              >
                Start free screening
              </a>
              <a
                href="#plans"
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-colors text-center"
              >
                See plans
              </a>
            </div>
          </div>
          
          {/* Right: Soft motion illustration (arc line completing a circle) */}
          <div className="relative h-[500px] flex items-center justify-center">
            <svg width="400" height="400" viewBox="0 0 400 400" className="absolute">
              <circle
                cx="200"
                cy="200"
                r="150"
                fill="none"
                stroke="#00C9A7"
                strokeWidth="2"
                strokeDasharray="942"
                strokeDashoffset="0"
                className="animate-pulse"
                opacity="0.3"
              />
              <path
                d="M 200 50 A 150 150 0 0 1 200 350"
                fill="none"
                stroke="#00C9A7"
                strokeWidth="3"
                className="animate-pulse"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* 2️⃣ How It Works (4 Steps) */}
      <section className="py-24 px-6 md:px-12">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                step: "1",
                title: "Free check",
                desc: "See which blood screenings you miss."
              },
              {
                step: "2",
                title: "Full assessment",
                desc: "Get your personal health map."
              },
              {
                step: "3",
                title: "Your plan",
                desc: "Follow a simple 6-month plan."
              },
              {
                step: "4",
                title: "Learn what works",
                desc: "See real results."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="border-2 border-white p-8 rounded-lg bg-black hover:border-[#00C9A7] transition-colors"
              >
                <div className="text-4xl font-bold text-[#00C9A7] mb-4">{item.step}</div>
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="/free-screening"
              className="inline-block px-8 py-4 bg-[#00C9A7] text-black font-semibold rounded-lg hover:bg-[#00E5C4] transition-colors"
            >
              Start free screening
            </a>
          </div>
        </div>
      </section>

      {/* 3️⃣ Philosophy / The Arc Difference */}
      <section className="py-24 px-6 md:px-12 bg-black">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image with circular glow */}
          <div className="relative">
            <div className="relative w-full h-[500px] bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
              {/* Placeholder for image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border-4 border-[#00C9A7] opacity-50 animate-pulse"></div>
              </div>
              <div className="text-gray-500 text-center z-10">
                <p className="text-sm">Image: Calm human silhouette + moving circular glow</p>
              </div>
            </div>
          </div>
          
          {/* Right: Text block */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">You discover. We guide.</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              We help you find your health formula through clinical precision, clear steps, and feedback that teaches you what really improves your wellbeing.
            </p>
            <a
              href="#how-it-works"
              className="inline-block px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              How it works
            </a>
          </div>
        </div>
      </section>

      {/* 4️⃣ Three Personas Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Find Your Path</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Busy Professionals",
                image: "modern workspace, warm tone",
                link: "/achiever"
              },
              {
                title: "Travellers & Nomads",
                image: "person working on laptop with sea or city in background",
                link: "/explorer"
              },
              {
                title: "Health Rebuilders",
                image: "person walking outside morning light",
                link: "/seeker"
              }
            ].map((persona, i) => (
              <Link
                key={i}
                href={persona.link}
                className="group relative h-[400px] rounded-lg overflow-hidden border-2 border-white hover:border-[#00C9A7] transition-all"
              >
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                  <p className="text-gray-500 text-sm text-center px-4">{persona.image}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-2xl font-bold mb-2">{persona.title}</h3>
                  <span className="text-[#00C9A7] font-semibold group-hover:underline">
                    Explore this path →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ Plans & Pricing */}
      <section id="plans" className="py-24 px-6 md:px-12 bg-black">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Plans & Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "99",
                period: "6 months",
                highlights: ["Free screening", "Health map", "6-month plan", "Basic support"]
              },
              {
                name: "Education",
                price: "199",
                period: "6 months",
                highlights: ["Everything in Starter", "Closed sessions", "Advanced insights", "Priority support"],
                featured: true
              },
              {
                name: "Care",
                price: "399",
                period: "6 months",
                highlights: ["Everything in Education", "Medical consultations", "Personalized care", "Dedicated support"],
                waitlist: true
              }
            ].map((plan, i) => (
              <div
                key={i}
                className={`border-2 rounded-lg p-8 bg-gray-900 ${
                  plan.featured ? 'border-[#00C9A7] scale-105' : 'border-gray-700'
                } ${plan.waitlist ? 'opacity-75' : ''}`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price} EUR</span>
                  <span className="text-gray-400 ml-2">/ {plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.highlights.map((highlight, j) => (
                    <li key={j} className="flex items-start">
                      <span className="text-[#00C9A7] mr-2">✓</span>
                      <span className="text-gray-300">{highlight}</span>
                    </li>
                  ))}
                </ul>
                {plan.waitlist ? (
                  <button className="w-full px-6 py-3 border-2 border-gray-600 text-gray-400 font-semibold rounded-lg cursor-not-allowed">
                    Join waitlist
                  </button>
                ) : (
                  <a
                    href="/checkout"
                    className="block w-full px-6 py-3 bg-[#00C9A7] text-black font-semibold rounded-lg hover:bg-[#00E5C4] transition-colors text-center"
                  >
                    Choose plan
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="/free-screening"
              className="inline-block px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Start with free screening
            </a>
          </div>
        </div>
      </section>

      {/* 6️⃣ Service Catalog Highlight */}
      <section className="py-24 px-6 md:px-12">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Service Catalog</h2>
          <div className="bg-gray-900 rounded-lg p-12 text-center">
            <p className="text-xl text-gray-300 mb-8">
              Browse our curated selection of health and wellness services from certified partners.
            </p>
            <a
              href="/catalog"
              className="inline-block px-8 py-4 bg-[#00C9A7] text-black font-semibold rounded-lg hover:bg-[#00E5C4] transition-colors"
            >
              Browse catalog
            </a>
          </div>
        </div>
      </section>

      {/* 7️⃣ Future Vision / Roadmap */}
      <section className="py-24 px-6 md:px-12 bg-black">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">What's next for The Arc</h2>
          <div className="relative mb-12">
            {/* Soft arcs animation placeholder */}
            <div className="flex items-center justify-center h-64 mb-12">
              <svg width="300" height="300" viewBox="0 0 300 300" className="opacity-50">
                <path
                  d="M 150 50 Q 200 100 250 150 T 150 250"
                  fill="none"
                  stroke="#00C9A7"
                  strokeWidth="2"
                  className="animate-pulse"
                />
                <path
                  d="M 150 50 Q 100 100 50 150 T 150 250"
                  fill="none"
                  stroke="#00C9A7"
                  strokeWidth="2"
                  className="animate-pulse"
                  style={{ animationDelay: '0.5s' }}
                />
              </svg>
            </div>
          </div>
          <ul className="space-y-6 mb-12">
            {[
              "Knowledge Base for learning",
              "Access to certified specialists",
              "New health data integrations"
            ].map((item, i) => (
              <li key={i} className="flex items-start text-xl">
                <span className="text-[#00C9A7] mr-4 text-2xl">•</span>
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
          <div className="text-center">
            <a
              href="/early-access"
              className="inline-block px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Join early access
            </a>
          </div>
        </div>
      </section>

      {/* 8️⃣ Final Call to Action */}
      <section className="py-24 px-6 md:px-12">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Begin your Arc today.</h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 leading-relaxed">
            Find your own formula. See what works for you. Keep what matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a
              href="/free-screening"
              className="px-8 py-4 bg-[#00C9A7] text-black font-semibold rounded-lg hover:bg-[#00E5C4] transition-colors"
            >
              Start free screening
            </a>
            <a
              href="#plans"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              See plans
            </a>
          </div>
        </div>
      </section>

      {/* 9️⃣ Footer */}
      <Footer />
    </div>
  );
}

