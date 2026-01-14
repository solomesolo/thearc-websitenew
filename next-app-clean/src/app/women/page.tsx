"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import EmailSignupModal from "../../components/EmailSignupModal";
import Section from "../../components/Section";
import SectionTitle from "../../components/SectionTitle";
import { HowItWorksSection } from "../../components/HowItWorksSection";
import WomenPersonaSection from "../../components/WomenPersonaSection";
import WomenHero from "../../components/WomenHero";
import { ArcButton } from "../../components/ui/ArcButton";
import WhyItWorks from "../../components/sections/WhyItWorks";
import { WomenBlueprint } from "../../components/sections/WomenBlueprint";
import { WomenFAQ } from "../../components/sections/WomenFAQ";
import { WomenPricingSection } from "../../components/sections/WomenPricingSection";

const womenChallengesDetailed = [
  "Broken or unpredictable sleep",
  "Weight shifts despite no lifestyle change",
  "Hot flashes / temperature swings",
  "Mood or anxiety fluctuations",
  "Cognitive dips or fog",
  "Energy highs and lows",
  "Doctors offering generic or contradictory advice",
  "Hormonal tests without proper interpretation",
  "No long-term plan — only symptom management",
];

const womenSystemDisruptions = [
  "Estrogen, progesterone, stress hormones, and metabolic signals fluctuate unpredictably.",
];

const womenContinuityBreaks = [
  "Metabolism, cardiovascular risk, inflammation, and bone density begin shifting faster than before.",
];

const womenSupportPillars = [
  {
    title: "Reveal how menopause affects your biology",
    text: "Hormones, cardiovascular markers, inflammation, metabolism, sleep, cognition.",
  },
  {
    title: "Build your hormonal health baseline",
    text: "A personalised map of what's changing and what matters.",
  },
  {
    title: "Get targeted routines",
    text: "Sleep, inflammation control, metabolic support, temperature regulation, stress modulation, nutrition.",
  },
  {
    title: "Stay guided as your biology evolves",
    text: "Monthly recalibration as hormones shift.",
  },
];

const womenSteps = [
  {
    number: "01",
    title: "Free check",
    text: "Missing hormone, cardiovascular, inflammation, metabolic tests identified.",
  },
  {
    number: "02",
    title: "Full assessment",
    text: "Sleep, stress, metabolic shifts, cognition, hormones, long-term risks.",
  },
  {
    number: "03",
    title: "Your personalised health plan",
    text: "Stabilisation plan for hormones, energy, sleep, weight, longevity markers.",
  },
  {
    number: "04",
    title: "Insights update",
    text: "Monthly adjustments based on biomarkers.",
  },
];

const womenWhyItWorks = [
  "Personalised menopause plan grounded in biomarkers",
  "Early detection of cardiovascular, metabolic, hormonal shifts",
  "Routines to stabilise energy, sleep, mood, cognition",
  "Hormone-aware nutrition & recovery",
  "Predictable screenings",
  "Specialists and testing anywhere",
  "Longevity strategy designed for women",
  "Care that adapts with you, not against you",
];

export default function WomenPage() {
  const [showEmailModal, setShowEmailModal] = useState(false);

  return (
    <main className="persona-layout persona-menopause min-h-screen text-white">
      <WomenHero onCTAClick={() => setShowEmailModal(true)} />

      <WomenPersonaSection />

      <section className="persona-section-fade py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-white/40 tracking-[0.3em] uppercase text-xs md:text-sm mb-12 text-center">
            Challenges We Commonly See
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
            <div className="relative w-full h-[400px] md:h-[520px] lg:h-[600px] order-1 md:order-1">
              <img
                src="/Challenges.jpg"
                alt="Women in menopause"
                className="w-full h-full object-cover rounded-2xl persona-shadow"
              />
            </div>

            <div className="flex flex-col items-start space-y-8 max-w-xl order-2 md:order-2">
              <div className="space-y-3">
                <p className="uppercase tracking-[0.25em] persona-accent-text text-xs md:text-sm">
                  Women in Menopause
                </p>
                <h2 className="text-4xl md:text-5xl font-semibold leading-[1.1]">
                  Challenges You May Recognise
                </h2>
              </div>

              <ul className="space-y-4 text-white/75 leading-relaxed">
                {womenChallengesDetailed.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-white/40" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-white font-medium text-lg md:text-xl">
                You're not imagining it.
                Your biology is shifting — and it's measurable and manageable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="persona-section-fade py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">Why This Happens</h2>
            <div className="flex justify-center">
              <p className="text-lg md:text-xl text-white/70 max-w-3xl text-center">
                You're navigating a biological transition with outdated care designed for a younger version of you.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl bg-white/2 border border-white/5 backdrop-blur-sm shadow-[0_30px_80px_rgba(0,0,0,0.8)] p-8">
              <div className="text-5xl font-bold mb-4 persona-accent-text">1</div>
              <h3 className="text-xl font-semibold mb-3">Hormonal axis recalibrates</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Estrogen, progesterone, stress hormones, and metabolic signals fluctuate unpredictably.
              </p>
              <div className="text-xs uppercase tracking-wider text-white/50">Hormonal Transition</div>
            </div>

            <div className="rounded-3xl bg-white/2 border border-white/5 backdrop-blur-sm shadow-[0_30px_80px_rgba(0,0,0,0.8)] p-8">
              <div className="text-5xl font-bold mb-4 persona-accent-text">2</div>
              <h3 className="text-xl font-semibold mb-3">Your long-term risk profile evolves</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Metabolism, cardiovascular risk, inflammation, and bone density begin shifting faster than before.
              </p>
              <div className="text-xs uppercase tracking-wider text-white/50">Risk Evolution</div>
            </div>

            <div className="rounded-3xl bg-white/2 border border-white/5 backdrop-blur-sm shadow-[0_30px_80px_rgba(0,0,0,0.8)] p-8">
              <div className="text-5xl font-bold mb-4 persona-accent-text">3</div>
              <h3 className="text-xl font-semibold mb-3">Support systems aren't built for menopause</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Care is fragmented, reactive, and rarely personalised.
              </p>
              <div className="text-xs uppercase tracking-wider text-white/50">Systemic Limitations</div>
            </div>
          </div>
        </div>
      </section>

      {/* How The Arc Supports You */}
      <section className="persona-section-fade relative py-20 md:py-24">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes arc-orbit-rotate {
            0% {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
          .arc-orbit-ring {
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            animation: arc-orbit-rotate 15s linear infinite !important;
            will-change: transform !important;
          }
        `}} />
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center text-center">
            <p className="text-xs tracking-[0.25em] text-white/35 uppercase mb-3">
              How It Works
            </p>
            <h2 className="text-3xl md:text-[2.2rem] font-semibold tracking-tight text-white">
              How The Arc Supports You
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/60 max-w-2xl">
              ARC becomes your long-term hormonal navigation system.
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          {/* Central glow + rotating halo */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2">
            {/* Soft inner glow */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(244,114,182,0.35),rgba(15,23,42,0))]" />
          </div>

          {/* Rotating halo - positioned separately */}
          <div 
            className="arc-orbit-ring pointer-events-none absolute z-0 h-72 w-72 rounded-full border border-pink-400/12"
          >
            {/* Broken ring effect */}
            <div className="absolute inset-6 rounded-full border border-pink-400/8 border-dashed" />
          </div>

          {/* Benefit grid */}
          <div className="relative grid gap-y-16 md:grid-cols-2 md:gap-x-20 md:gap-y-20">
            
            {/* 1 */}
            <div className="flex items-start gap-6">
              <span className="relative top-1 h-3 w-3 rounded-full bg-pink-400 shadow-[0_0_16px_rgba(244,114,182,0.9)] flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-white leading-snug">
                  Reveal how menopause affects your biology
                </h3>
                <p className="mt-3 text-sm text-white/65 max-w-md leading-relaxed">
                  See what&apos;s changing in hormones, cardiovascular risk, inflammation,
                  metabolism, sleep, and cognition.
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="flex items-start gap-6">
              <span className="relative top-1 h-3 w-3 rounded-full bg-pink-400 shadow-[0_0_16px_rgba(244,114,182,0.9)] flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-white leading-snug">
                  Get targeted routines
                </h3>
                <p className="mt-3 text-sm text-white/65 max-w-md leading-relaxed">
                  Short, realistic habits for sleep, hot flashes, mood, and energy —
                  designed for midlife, not your 20s.
                </p>
              </div>
            </div>

            {/* Divider hint (desktop only) */}
            <div className="hidden md:block pointer-events-none md:col-span-2 mx-auto h-px w-1/2 bg-pink-400/10" />

            {/* 3 */}
            <div className="flex items-start gap-6">
              <span className="relative top-1 h-3 w-3 rounded-full bg-pink-400 shadow-[0_0_16px_rgba(244,114,182,0.9)] flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-white leading-snug">
                  Build your hormonal health baseline
                </h3>
                <p className="mt-3 text-sm text-white/65 max-w-md leading-relaxed">
                  One clear map of your biomarkers, symptoms, and risks — so you stop
                  guessing what&apos;s &quot;normal&quot; for you.
                </p>
              </div>
            </div>

            {/* 4 */}
            <div className="flex items-start gap-6">
              <span className="relative top-1 h-3 w-3 rounded-full bg-pink-400 shadow-[0_0_16px_rgba(244,114,182,0.9)] flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-white leading-snug">
                  Stay guided as your biology evolves
                </h3>
                <p className="mt-3 text-sm text-white/65 max-w-md leading-relaxed">
                  Monthly recalibration as hormones shift, so your plan stays relevant
                  instead of going stale.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <div className="persona-section-fade">
        <HowItWorksSection
          description="A structured process designed for women navigating hormonal transitions."
          steps={womenSteps}
          ctaOnClick={() => setShowEmailModal(true)}
        />
      </div>

      {/* Why It Works */}
      <div className="persona-section-fade">
        <WhyItWorks 
          title="Why It Works for Women in Menopause"
          subtitle="Personalised menopause support grounded in biomarkers and clinical evidence."
          items={womenWhyItWorks}
          backgroundImage="/why it works.jpg"
        />
      </div>

      {/* Women Pricing */}
      <div className="persona-section-fade">
        <WomenPricingSection onPlanClick={() => setShowEmailModal(true)} />
      </div>
      <div className="persona-section-fade">
        <WomenBlueprint />
      </div>
      <div className="persona-section-fade">
        <WomenFAQ />
      </div>

      {/* Final CTA */}
      <section className="persona-section-fade py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center gap-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-wide leading-tight">
              Start building stability
            </h2>
            <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto text-center">
              Your biology is changing. Your support shouldn't disappear.
            </p>
            <ArcButton onClick={() => setShowEmailModal(true)} className="cta-button">
              Start free screening
            </ArcButton>
          </motion.div>
        </div>
      </section>
      <EmailSignupModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} />
    </main>
  );
}

