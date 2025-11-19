"use client";

import Link from "next/link";
import Section from "../../components/Section";
import SectionTitle from "../../components/SectionTitle";
import { HowItWorksSection } from "../../components/HowItWorksSection";

const travelerIssues = [
  "Jet lag and disrupted sleep",
  "Weakening immunity from frequent transitions",
  "Irregular meals and digestive changes",
  "Difficulty maintaining habits",
  "Fatigue during travel weeks",
];

const travelerWhyList = [
  "Circadian rhythms",
  "Hormonal cycles",
  "Digestion",
  "Immune readiness",
  "Recovery capacity",
];

const travelerSolutions = [
  {
    title: "Reveal how travel impacts your body",
    text: "Identify early risks and hidden stress points in immunity, sleep, digestion, and metabolism.",
  },
  {
    title: "Build your global health map",
    text: "Understand how changing environments influence your long-term health.",
  },
  {
    title: "Follow flexible, travel-proof routines",
    text: "Your plan includes circadian resets, immune strategies, minimal nutrition protocols, and simple habits for travel days.",
  },
  {
    title: "Learn what keeps you balanced anywhere",
    text: "Measure improvement over 6 months and discover the habits that keep your body stable — no matter where you go.",
  },
];

const travelerSteps = [
  { number: "01", title: "Free check", text: "Identify missing screenings." },
  { number: "02", title: "Full assessment", text: "Map your travel patterns." },
  { number: "03", title: "Your 6-month plan", text: "Portable, simple, effective." },
  { number: "04", title: "Insights update", text: "See what stabilises you." },
];

const travelerWhyItWorks = [
  "Portable routines",
  "Circadian strategies that work",
  "Stronger immunity",
  "Consistency without rigid schedules",
  "At-home medical services available worldwide",
];

export default function TravelerPage() {
  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-black">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("/hero-background-traveler.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "calc(100% + 80px) center",
          }}
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent" />

        <div className="relative max-w-[1320px] mx-auto px-6 lg:px-10 py-[140px] min-h-[90vh] grid lg:grid-cols-[55%_45%] gap-10 lg:gap-[70px] items-center">
          <div className="flex flex-col gap-5 lg:col-span-1">
            <p className="text-[13px] tracking-[0.35em] uppercase text-white/55" data-hero-fade="label">
              Explorer Persona
            </p>
            <h1
              className="text-[32px] md:text-[40px] lg:text-[50px] leading-[1.1] font-semibold text-white max-w-[560px]"
              data-hero-fade="headline"
            >
              Your lifestyle moves. Your health should stay steady. Anywhere.
            </h1>
            <p
              className="text-[13.5px] md:text-[16px] lg:text-[18px] leading-[1.45] text-white/70"
              data-hero-fade="body"
            >
              Frequent travel, changing time zones, irregular routines, and unpredictable environments make it challenging to maintain consistent energy and wellbeing.
              <br />
              <br />
              The Arc gives you a personalised health blueprint that travels with you. Understand how movement affects your biology and follow simple, portable routines that keep you balanced across cities, climates, and schedules.
            </p>
            <div className="mt-5 sm:mt-6 lg:mt-8" data-hero-fade="cta">
              <Link
                href="/free-screening"
                className="inline-flex items-center justify-center px-9 py-4 rounded-[32px] bg-[#2EF0C2] text-black font-semibold tracking-wide transition-all duration-200 border border-transparent hover:bg-transparent hover:text-[#2EF0C2] hover:border-[#2EF0C2]"
              >
                Start free screening
              </Link>
            </div>
          </div>
          <div className="hidden lg:block" />
        </div>
      </section>

      {/* Persona Snapshot */}
      <Section>
        <div className="space-y-12">
          <SectionTitle className="text-left">
            Persona Snapshot — Travellers & Nomads
          </SectionTitle>
          <div className="space-y-6 text-gray-300 leading-relaxed max-w-4xl">
            <p>
              Movement is your lifestyle — but it creates biological friction. You’re adaptable, but your biology still needs stability.
            </p>
            <div>
              <p className="text-white text-base font-semibold mb-3">We commonly see:</p>
              <ul className="space-y-2">
                {travelerIssues.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white text-base font-semibold mb-3">Why this happens</p>
              <p className="text-gray-300 mb-3">
                Travel stresses the systems responsible for consistency. It disrupts:
              </p>
              <ul className="space-y-2">
                {travelerWhyList.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <p className="text-gray-400 mt-3">
                Without personalised strategies, your body never fully resets.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* How The Arc Helps */}
      <Section>
        <div className="flex flex-col gap-12">
          <SectionTitle className="text-left">
            How The Arc Supports You
          </SectionTitle>
          <p className="text-gray-300 leading-relaxed max-w-3xl">
            We help you build stability that works on the move.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {travelerSolutions.map((solution) => (
              <div key={solution.title} className="p-8 border border-white/10 rounded-2xl bg-transparent">
                <h3 className="text-2xl font-semibold mb-4">
                  {solution.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {solution.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <HowItWorksSection
        description="A structured process that shows exactly how travel influences your biology and builds routines you can take anywhere."
        steps={travelerSteps}
      />

      {/* Why It Works */}
      <Section>
        <div className="space-y-8 max-w-4xl">
          <SectionTitle className="text-left">
            Why It Works for Travellers
          </SectionTitle>
          <ul className="space-y-3 text-gray-300 text-lg">
            {travelerWhyItWorks.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <SectionTitle>
            Start building stability
          </SectionTitle>
          <p className="text-gray-300 leading-relaxed">
            Start free screening
          </p>
          <Link
            href="/free-screening"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-white text-black font-semibold tracking-wide hover:bg-gray-200 transition"
          >
            Start free screening
          </Link>
        </div>
      </Section>
    </main>
  );
}

