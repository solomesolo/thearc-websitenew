"use client";

import Link from "next/link";
import Section from "../../components/Section";
import SectionTitle from "../../components/SectionTitle";
import { HowItWorksSection } from "../../components/HowItWorksSection";

const rebuilderIssues = [
  "Persistent fatigue",
  "Brain fog and low focus",
  "Weight changes",
  "Stress or mood dips",
  "Digestive issues",
  "Sleep irregularities",
  "Doing everything “right” but not improving",
];

const rebuilderRootCauses = [
  "Nutrient deficiencies",
  "Hormonal shifts",
  "Inflammation",
  "Stress dysregulation",
  "Lifestyle mismatch",
  "Early metabolic changes",
];

const rebuilderSolutions = [
  {
    title: "Reveal overlooked areas",
    text: "Your screening highlights missing tests and blind spots often responsible for persistent symptoms.",
  },
  {
    title: "Build your personal clarity map",
    text: "Connect symptoms to underlying biological drivers, not guesswork.",
  },
  {
    title: "Follow a structured 6-month rebuilding plan",
    text: "Gradual, manageable steps covering nutrition, recovery, sleep, stress, and key screenings.",
  },
  {
    title: "Track improvement and prevent future issues",
    text: "Measure how your body changes and rebuilds over 6 months.",
  },
];

const rebuilderSteps = [
  { number: "01", title: "Free check", text: "See missing screenings." },
  { number: "02", title: "Full assessment", text: "Understand your patterns." },
  { number: "03", title: "Your 6-month plan", text: "Stability, month by month." },
  { number: "04", title: "Insights update", text: "See what changed." },
];

const whyItWorksForRebuilders = [
  "Root-cause clarity",
  "Structured guidance",
  "No overwhelm — just progress",
  "Early detection and long-term prevention",
  "Access to trusted at-home medical support",
];

export default function RebuilderPage() {
  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="w-full bg-black py-36">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Seeker Persona</p>
            <h1 className="text-5xl lg:text-6xl font-semibold leading-tight">
              When something feels off, you need more than trial-and-error.
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Lingering symptoms, low energy, mood shifts, sleep issues, or unexplained changes often point to underlying biological patterns — not random noise.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              The Arc helps you understand what’s really going on inside your body. You’ll uncover predispositions, identify hidden imbalances, and follow a structured monthly plan to rebuild your health with confidence.
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
          <div className="w-full h-[420px] rounded-3xl border border-white/10 bg-gradient-to-br from-[#181818] via-[#050505] to-black p-10 flex flex-col gap-5">
            <p className="text-white/70 uppercase text-xs tracking-[0.4em]">
              Start free screening
            </p>
            <p className="text-gray-300 leading-relaxed">
              The Arc helps you understand what’s really going on inside your body and rebuild with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Persona Snapshot */}
      <Section>
        <div className="space-y-12">
          <SectionTitle className="text-left">
            Persona Snapshot — Health Rebuilders
          </SectionTitle>
          <div className="space-y-6 text-gray-300 leading-relaxed max-w-4xl">
            <p>
              You’ve been feeling “not yourself” — often for months or years. Your body is signaling something. We help you understand what and why.
            </p>
            <div>
              <p className="text-white text-base font-semibold mb-3">We often see:</p>
              <ul className="space-y-2">
                {rebuilderIssues.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white text-base font-semibold mb-3">Why this happens</p>
              <p className="text-gray-300 mb-3">
                Small biological imbalances compound over time. Common root causes include:
              </p>
              <ul className="space-y-2">
                {rebuilderRootCauses.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <p className="text-gray-400 mt-3">
                Without data, these remain invisible — but still affect your daily life.
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
            We guide you step-by-step back to stability.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rebuilderSolutions.map((solution) => (
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
        description="A calm, clinical process that replaces trial-and-error with structured monthly clarity."
        steps={rebuilderSteps}
      />

      {/* Why It Works */}
      <Section>
        <div className="space-y-8 max-w-4xl">
          <SectionTitle className="text-left">
            Why It Works for Health Rebuilders
          </SectionTitle>
          <ul className="space-y-3 text-gray-300 text-lg">
            {whyItWorksForRebuilders.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <SectionTitle>
            Start rebuilding your health
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

