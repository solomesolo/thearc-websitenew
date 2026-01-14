"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import EmailSignupModal from "../../components/EmailSignupModal";
import Section from "../../components/Section";
import SectionTitle from "../../components/SectionTitle";
import { HowItWorksSection } from "../../components/HowItWorksSection";
import ProfessionalPersonaSection from "../../components/ProfessionalPersonaSection";
import ProfessionalHero from "../../components/ProfessionalHero";
import { ArcButton } from "../../components/ui/ArcButton";
import WhyItWorks from "../../components/sections/WhyItWorks";
import { ProfessionalBlueprint } from "../../components/sections/ProfessionalBlueprint";
import { ProfessionalFAQ } from "../../components/sections/ProfessionalFAQ";
import { TravelerPricingSection } from "../../components/sections/TravelerPricingSection";

const professionalChallengesDetailed = [
  "High pressure masks early biological shifts",
  "Chronic stress changes hormones, recovery, micronutrients, inflammation, and nervous-system balance",
  "Without understanding your baseline, you rely on guesswork — not precision",
  "Irregular sleep impacts cognitive performance",
  "Fatigue accumulation affects clarity and focus",
  "Early markers of systemic inflammation from chronic workload",
  "Mild risk of metabolic dysregulation from inconsistent meal timing",
];

const professionalSystemDisruptions = [
  "Sustained cognitive and emotional pressure elevates baseline stress physiology",
  "Patterns indicate reduced recovery capacity across the workweek",
  "Irregular routines impact sleep depth and circadian rhythm stability",
  "Signs of mild fatigue accumulation affecting clarity and focus",
  "Early markers of systemic inflammation may emerge under chronic workload",
];

const professionalContinuityBreaks = [
  "Workload, stress hormones, and cognitive load can reduce sleep quality",
  "No structured approach to managing biological stress load",
  "Preventative health schedules collapse under work pressure",
  "Systems treat symptoms, not underlying patterns",
  "Your biological data remains invisible without proper assessment",
];

const professionalSupportPillars = [
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
  {
    number: "01",
    title: "Free check",
    text: "A fast, risk-spotting scan that shows what's missing in your screening history — and what needs attention now.",
  },
  {
    number: "02",
    title: "Full assessment",
    text: "A deep review of your stress patterns, recovery load, sleep, cognitive function, and long-term biological strengths & weak points.",
  },
  {
    number: "03",
    title: "Your personalised health plan",
    text: "A personalised, performance-focused roadmap that stabilises your biology and supports resilience — without slowing your pace.",
  },
  {
    number: "04",
    title: "Insights update",
    text: "Monthly adjustments guided by your biomarkers, ensuring your plan evolves as your workload changes.",
  },
];

const professionalWhyItWorks = [
  "Stay sharp. Stay balanced. Stay in control of your performance.",
  "You stop guessing and start leading with clarity powered by real data.",
  "Your habits finally match your ambition, fitting seamlessly into packed schedules.",
  "Stress becomes manageable, and your ability to recover improves week by week.",
  "You stay ahead of problems, catching early warning signs before they slow you down.",
  "You get frictionless access to trusted medical support, right when you need it.",
  "Your focus, stamina, and daily output rise, supported by small, strategic changes.",
  "You build long-term resilience, so your career grows without sacrificing your health.",
];

export default function ProfessionalPage() {
  const [showEmailModal, setShowEmailModal] = useState(false);

  return (
    <main className="bg-black text-white">
      <ProfessionalHero onCTAClick={() => setShowEmailModal(true)} />

      <ProfessionalPersonaSection />

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
                alt="Busy professionals"
                className="w-full h-full object-cover rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
              />
            </div>

            <div className="flex flex-col items-start space-y-8 max-w-xl order-2 md:order-2">
              <div className="space-y-3">
                <p className="uppercase tracking-[0.25em] text-white/60 text-xs md:text-sm">
                  Busy Professionals
                </p>
                <h2 className="text-4xl md:text-5xl font-semibold leading-[1.1]">
                  Challenges You May Recognise
                </h2>
                <p className="italic text-white/80 text-lg md:text-xl">
                  Does any of this feel uncomfortably familiar?
                </p>
              </div>

              <ul className="space-y-4 text-white/75 leading-relaxed">
                {professionalChallengesDetailed.map((item) => (
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
            High performance demands biological stability, but pressure strains the systems that keep you sharp.
          </p>
        </div>

        <div className="grid-container">
          <div className="col card">
            <div className="number">1</div>
            <h3>Your core systems destabilise</h3>
            <p>
              Sustained cognitive and emotional pressure elevates baseline stress physiology. Patterns indicate reduced recovery capacity across the workweek. Irregular routines impact sleep depth and circadian rhythm stability.
            </p>
            <div className="label">Stress Biology Impact</div>
          </div>

          <div className="col card">
            <div className="number">2</div>
            <h3>Care resets every time pressure increases</h3>
            <p>
              Workload, stress hormones, and cognitive load can reduce sleep quality without affecting duration. No structured approach to managing biological stress load. Preventative health schedules collapse under work pressure.
            </p>
            <div className="label">Continuity Breakdown</div>
          </div>

          <div className="col card">
            <div className="number">3</div>
            <h3>Healthcare wasn't built for high performers</h3>
            <p>
              Modern work demands expose a system designed for traditional schedules. Symptoms get treated, not underlying patterns. Your biological data remains invisible without proper assessment. It's not your discipline — it's outdated infrastructure.
            </p>
            <div className="label">Systemic Limitations</div>
          </div>
        </div>

        <p className="summary">
          You're living a high-performance lifestyle with a medical system built for people who never face sustained pressure.
        </p>
      </section>

      {/* How It Works */}
      <HowItWorksSection
        description="A data-led process that translates complex health signals into simple routines built for demanding careers."
        steps={professionalSteps}
        ctaOnClick={() => setShowEmailModal(true)}
      />

      {/* Why It Works */}
      <WhyItWorks 
        title="Why It Works for Busy Professionals like You"
        items={professionalWhyItWorks}
        backgroundImage="/why it works for travellers.jpg"
      />

      {/* Professional Pricing */}
      <TravelerPricingSection onPlanClick={() => setShowEmailModal(true)} />
      <ProfessionalBlueprint />
      <ProfessionalFAQ />

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
            Your ambition is high. Your energy should match it.
          </p>
          <ArcButton onClick={() => setShowEmailModal(true)} className="cta-button">
            Start free screening
          </ArcButton>
        </motion.div>
      </section>
      <EmailSignupModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} />
    </main>
  );
}
