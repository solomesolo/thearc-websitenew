"use client";

import Link from "next/link";
import Section from "../../components/Section";
import SectionTitle from "../../components/SectionTitle";
import { HowItWorksSection } from "../../components/HowItWorksSection";

const professionalPainPoints = [
  "High pressure masks early biological shifts.",
  "Chronic stress changes hormones, recovery, micronutrients, inflammation, and nervous-system balance.",
  "Without understanding your baseline, you rely on guesswork — not precision.",
];

const professionalSolutions = [
  {
    title: "Reveal your personal predispositions",
    text: "Get a clinical-level overview of hidden patterns, early risks, and core biomarkers that influence performance, energy, and stress resilience.",
  },
  {
    title: "Get your performance health map",
    text: "See exactly how stress affects your biology and where your strengths and weaknesses lie.",
  },
  {
    title: "Follow a personalised 6-month roadmap",
    text: "Each month gives you small, high-impact routines — nutrition, sleep, stress, recovery — designed to fit into busy weeks.",
  },
  {
    title: "Track meaningful, measurable progress",
    text: "At the end of 6 months, see what changed inside your body and which habits made the difference.",
  },
];

const professionalSteps = [
  { number: "01", title: "Free check", text: "See which tests you're missing." },
  { number: "02", title: "Full assessment", text: "Build your health map." },
  { number: "03", title: "Your 6-month plan", text: "Designed for your lifestyle." },
  { number: "04", title: "Insights update", text: "See what improved." },
];

const whyItWorksForProfessionals = [
  "Data replaces guesswork",
  "Habits fit into a busy schedule",
  "Stress and focus become manageable",
  "Prevention becomes achievable",
  "Access to trusted at-home medical services",
];

export default function ProfessionalPage() {
  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="w-full bg-black py-36">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Achiever Persona</p>
            <h1 className="text-5xl lg:text-6xl font-semibold leading-tight">
              High pressure masks early biological shifts.
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Chronic stress disrupts hormones, recovery, micronutrients, inflammation, and nervous system balance.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Without understanding your baseline, you rely on guesswork — not precision.
            </p>
            <div>
              <Link
                href="/free-screening"
                className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-white text-black font-semibold tracking-wide hover:bg-gray-200 transition"
              >
                Start free screening
              </Link>
            </div>
          </div>
          <div className="w-full h-[420px] rounded-3xl border border-white/10 bg-gradient-to-br from-[#161616] via-[#050505] to-black p-10 flex flex-col gap-6">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">
              Chronic stress disrupts
            </p>
            <ul className="space-y-3 text-gray-300 text-base">
              <li>• Hormones</li>
              <li>• Recovery</li>
              <li>• Micronutrients</li>
              <li>• Inflammation</li>
              <li>• Nervous system balance</li>
            </ul>
            <p className="text-gray-400 text-sm leading-relaxed">
              Without understanding your baseline, you rely on guesswork — not precision.
            </p>
          </div>
        </div>
      </section>

      {/* Persona Snapshot */}
      <Section>
        <div className="space-y-10">
          <SectionTitle className="text-left">
            Persona Snapshot — Professionals
          </SectionTitle>
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              <p className="text-gray-300 leading-relaxed">
                High pressure masks early biological shifts. Chronic stress disrupts the systems that keep performance steady.
              </p>
              <div className="border border-white/10 rounded-3xl p-8 space-y-4">
                <p className="text-white/70 uppercase text-xs tracking-[0.4em]">
                  Chronic stress disrupts
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li>• Hormones</li>
                  <li>• Recovery</li>
                  <li>• Micronutrients</li>
                  <li>• Inflammation</li>
                  <li>• Nervous system balance</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              {professionalPainPoints.map((point) => (
                <div key={point} className="border border-white/10 rounded-2xl px-6 py-4 text-gray-200">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* How The Arc Helps */}
      <Section>
        <div className="flex flex-col gap-12">
          <SectionTitle className="text-left">
            How The Arc Helps
          </SectionTitle>
          <p className="text-gray-300 leading-relaxed max-w-3xl">
            We help professionals build long-term health capacity in a realistic, achievable way.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {professionalSolutions.map((solution) => (
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
        description="A data-led process that translates complex health signals into simple routines built for demanding careers."
        steps={professionalSteps}
      />

      {/* Why It Works */}
      <Section>
        <div className="space-y-8 max-w-4xl">
          <SectionTitle className="text-left">
            Why It Works for Professionals
          </SectionTitle>
          <ul className="space-y-3 text-gray-300 text-lg">
            {whyItWorksForProfessionals.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <SectionTitle>
            Start with clarity
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

