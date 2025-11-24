"use client";

import { motion } from "framer-motion";
import Section from "../../components/Section";
import SectionTitle from "../../components/SectionTitle";
import { HowItWorksSection } from "../../components/HowItWorksSection";
import RebuilderPersonaSection from "../../components/RebuilderPersonaSection";
import RebuilderHero from "../../components/RebuilderHero";
import { ArcButton } from "../../components/ui/ArcButton";
import WhyItWorks from "../../components/sections/WhyItWorks";
import { RebuilderBlueprint } from "../../components/sections/RebuilderBlueprint";
import { RebuilderFAQ } from "../../components/sections/RebuilderFAQ";
import { TravelerPricingSection } from "../../components/sections/TravelerPricingSection";

const rebuilderChallengesDetailed = [
  "Persistent fatigue that doesn't improve with rest",
  "Brain fog and low focus",
  "Weight changes without clear cause",
  "Stress or mood dips",
  "Digestive issues",
  "Sleep irregularities",
  "Doing everything 'right' but not improving",
];

const rebuilderSystemDisruptions = [
  "Small biological imbalances compound over time",
  "Nutrient deficiencies remain undetected",
  "Hormonal shifts go unnoticed",
  "Inflammation patterns develop silently",
  "Stress dysregulation accumulates",
];

const rebuilderContinuityBreaks = [
  "Symptoms are vague or inconsistent",
  "No clear understanding of underlying drivers",
  "Trial-and-error approaches fail",
  "Root causes remain invisible without data",
  "Your biological patterns remain hidden",
];

const rebuilderSupportPillars = [
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
  {
    number: "01",
    title: "Free check",
    text: "A fast, risk-spotting scan that shows what's missing in your screening history — and what needs attention now.",
  },
  {
    number: "02",
    title: "Full assessment",
    text: "A deep review of your symptoms, biological patterns, and long-term health drivers to understand what's really happening.",
  },
  {
    number: "03",
    title: "Your 6-month plan",
    text: "A personalised, clinician-informed roadmap that rebuilds your foundational systems of health step by step.",
  },
  {
    number: "04",
    title: "Insights update",
    text: "Monthly adjustments guided by your biomarkers, ensuring your plan evolves as your body rebuilds.",
  },
];

const rebuilderWhyItWorks = [
  "Root-cause clarity",
  "Structured guidance",
  "No overwhelm — just progress",
  "Early detection and long-term prevention",
  "Access to trusted at-home medical support",
  "Clinician-informed approach",
  "Measurable improvement tracking",
];

export default function RebuilderPage() {
  return (
    <main className="bg-black text-white">
      <RebuilderHero />

      <RebuilderPersonaSection />

      <section className="relative w-full py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-white/40 tracking-[0.3em] uppercase text-xs md:text-sm mb-12">
            Challenges We Commonly See
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
            <div className="relative w-full h-[400px] md:h-[520px] lg:h-[600px] order-1 md:order-1">
              <img
                src="/header-explorer.png"
                alt="Health rebuilders"
                className="w-full h-full object-cover rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
              />
            </div>

            <div className="flex flex-col items-start space-y-8 max-w-xl order-2 md:order-2">
              <div className="space-y-3">
                <p className="uppercase tracking-[0.25em] text-white/60 text-xs md:text-sm">
                  Health Rebuilders
                </p>
                <h2 className="text-4xl md:text-5xl font-semibold leading-[1.1]">
                  Challenges You May Recognise
                </h2>
                <p className="italic text-white/80 text-lg md:text-xl">
                  Does any of this feel uncomfortably familiar?
                </p>
              </div>

              <ul className="space-y-4 text-white/75 leading-relaxed">
                {rebuilderChallengesDetailed.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-white/40" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-white font-medium text-lg md:text-xl">
                You're not "unhealthy." You're <span className="underline decoration-white/20">under-supported</span> for the life you live.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-this-happens">
        <div className="header">
          <h2>Why This Happens</h2>
          <p className="subtitle">
            Lingering symptoms often reflect hidden biological patterns that compound over time.
          </p>
        </div>

        <div className="grid-container">
          <div className="col card">
            <div className="number">1</div>
            <h3>Your core systems destabilise</h3>
            <p>
              Small biological imbalances compound over time. Nutrient deficiencies, hormonal shifts, inflammation patterns, and stress dysregulation develop silently without data to reveal them.
            </p>
            <div className="label">Biological Impact</div>
          </div>

          <div className="col card">
            <div className="number">2</div>
            <h3>Care resets every time symptoms change</h3>
            <p>
              Symptoms are vague or inconsistent. No clear understanding of underlying drivers. Trial-and-error approaches fail. Root causes remain invisible without proper assessment.
            </p>
            <div className="label">Continuity Breakdown</div>
          </div>

          <div className="col card">
            <div className="number">3</div>
            <h3>Healthcare wasn't built for subtle patterns</h3>
            <p>
              Modern symptoms expose a system designed for clear diagnoses. Patterns get missed, not underlying causes. Your biological data remains invisible without proper assessment. It's not your fault — it's outdated infrastructure.
            </p>
            <div className="label">Systemic Limitations</div>
          </div>
        </div>

        <p className="summary">
          You're experiencing real symptoms with a medical system built for people who present with clear, acute conditions.
        </p>
      </section>

      {/* How The Arc Supports You */}
      <section className="how-arc-supports">
        <h2 className="section-title">How The Arc Supports You</h2>
        <p className="section-subtitle">
          We become your consistent health system — designed for rebuilding.
        </p>

        <div className="supports-grid">
          {/* LEFT SIDE */}
          <div>
            <div className="supports-item fade-up">
              <h3>{rebuilderSupportPillars[0].title}</h3>
              <p>{rebuilderSupportPillars[0].text}</p>
            </div>

            <div className="supports-item fade-up">
              <h3>{rebuilderSupportPillars[1].title}</h3>
              <p>{rebuilderSupportPillars[1].text}</p>
            </div>
          </div>

          {/* CIRCLE CENTER */}
          <div>
            <img src="/circle.png" alt="Arc Symbol" className="supports-circle fade-up" />
          </div>

          {/* RIGHT SIDE */}
          <div>
            <div className="supports-item fade-up">
              <h3>{rebuilderSupportPillars[2].title}</h3>
              <p>{rebuilderSupportPillars[2].text}</p>
            </div>

            <div className="supports-item fade-up">
              <h3>{rebuilderSupportPillars[3].title}</h3>
              <p>{rebuilderSupportPillars[3].text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorksSection
        description="A calm, clinical process that replaces trial-and-error with structured monthly clarity."
        steps={rebuilderSteps}
      />

      {/* Why It Works */}
      <WhyItWorks 
        items={rebuilderWhyItWorks}
        backgroundImage="/why it works for travellers.jpg"
      />

      {/* Rebuilder Pricing */}
      <TravelerPricingSection />
      <RebuilderBlueprint />
      <RebuilderFAQ />

      {/* Final CTA */}
      <section className="relative w-full min-h-[50vh] px-6 py-40 overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(46,240,194,0.08),rgba(0,0,0,1)60%)]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black via-black/60 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center text-center gap-6 max-w-[620px] mx-auto"
        >
          <h2 className="text-[56px] font-bold tracking-wide leading-tight">
            Start building stability
          </h2>
          <p className="text-[22px] text-white/75 leading-relaxed">
            When something feels off, you deserve clarity.
          </p>
          <ArcButton href="/free-screening" className="cta-button">
            Start free screening
          </ArcButton>
        </motion.div>
      </section>
    </main>
  );
}
