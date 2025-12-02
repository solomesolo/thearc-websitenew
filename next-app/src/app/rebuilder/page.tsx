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
import { RebuilderPricingSection } from "../../components/sections/RebuilderPricingSection";

const rebuilderChallengesDetailed = [
  "Persistent fatigue even after rest",
  "Brain fog or reduced concentration",
  "Mood instability or chronic stress",
  "Weight shifts despite no major lifestyle changes",
  "Irregular digestion or gut sensitivity",
  "Sleep that doesn't restore you",
  "Being told \"everything looks normal\"",
  "Doing everything right but feeling no improvement",
  "Frustration with conflicting advice or random supplements",
];

const rebuilderSupportPillars = [
  {
    title: "Reveal the hidden drivers behind your symptoms",
    text: "Deep screening across hormones, nutrients, inflammation, metabolic rhythm, sleep, stress patterns, and longevity markers.",
  },
  {
    title: "Build your personal stability baseline",
    text: "A map showing what's strong, what's drifting, and what needs immediate focus.",
  },
  {
    title: "Get targeted routines that repair core systems",
    text: "Energy restoration, metabolic support, sleep rebuilding, inflammation control, digestive stability, cognitive balance.",
  },
  {
    title: "Stay guided with monthly recalibration",
    text: "Your plan evolves as your biomarkers improve and symptoms shift.",
  },
];

const rebuilderSteps = [
  {
    number: "01",
    title: "Free check",
    text: "A quick scan revealing missing tests and potential blind spots.",
  },
  {
    number: "02",
    title: "Full assessment",
    text: "Reviews symptoms, stress patterns, sleep, digestion, hormones, metabolism, and long-term risks.",
  },
  {
    number: "03",
    title: "Your 6-month plan",
    text: "A structured rebuild roadmap focused on stability, energy, and resilience.",
  },
  {
    number: "04",
    title: "Insights update",
    text: "Monthly adjustments based on biomarkers — not guesswork.",
  },
];

const rebuilderWhyItWorks = [
  "Identifies the root causes, not just symptoms",
  "Early detection of hormonal, metabolic, inflammatory imbalance",
  "Clear routines that rebuild energy & cognitive clarity",
  "Monitoring that adapts to your progress",
  "Science-based screening sequence",
  "At-home testing and clinical integrations",
  "A long-term stability path — not a temporary fix",
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
                You're not broken — you're missing a clear map of what your biology needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-this-happens">
        <div className="header">
          <h2>Why This Happens</h2>
          <p className="subtitle">
            You're working hard — but without the data or plan that explains what your body is actually trying to correct.
          </p>
        </div>

        <div className="grid-container">
          <div className="col card">
            <div className="number">1</div>
            <h3>Hidden imbalances compound over time</h3>
            <p>
              Nutrients, hormones, inflammation, sleep cycles, and metabolic signals drift subtly — creating symptoms long before they show up as disease.
            </p>
            <div className="label">Biological Drift</div>
          </div>

          <div className="col card">
            <div className="number">2</div>
            <h3>Standard checkups miss early-stage dysfunction</h3>
            <p>
              Biological instability often hides underneath "normal range" lab results.
            </p>
            <div className="label">Detection Gap</div>
          </div>

          <div className="col card">
            <div className="number">3</div>
            <h3>Care is reactive, not preventive</h3>
            <p>
              Most systems wait for problems to escalate before taking action.
            </p>
            <div className="label">Systemic Limitations</div>
          </div>
        </div>

        <p className="summary">
          You're working hard — but without the data or plan that explains what your body is actually trying to correct.
        </p>
      </section>

      {/* How The Arc Supports You */}
      <section className="how-arc-supports">
        <h2 className="section-title">How The Arc Supports You</h2>
        <p className="section-subtitle">
          ARC becomes your clarity system and your long-term rebuilding plan.
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
            <div className="supports-circle fade-up" />
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
        description="A structured process designed to rebuild stability, energy, and confidence."
        steps={rebuilderSteps}
      />

      {/* Why It Works */}
      <WhyItWorks 
        title="Why It Works for Health Rebuilders"
        subtitle="A clear, structured path to rebuild stability, energy, and confidence."
        items={rebuilderWhyItWorks}
        backgroundImage="/why it works for travellers.jpg"
      />

      {/* Rebuilder Pricing */}
      <RebuilderPricingSection />
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
            Your symptoms are real. Your path to clarity shouldn't be.
          </p>
          <ArcButton href="/free-screening" className="cta-button">
            Start free screening
          </ArcButton>
        </motion.div>
      </section>
    </main>
  );
}
