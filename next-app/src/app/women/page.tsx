"use client";

import { motion } from "framer-motion";
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
    title: "Your 6-month plan",
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

  return (
    <main className="bg-black text-white">
      <WomenHero />

      <WomenPersonaSection />

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
                alt="Women in menopause"
                className="w-full h-full object-cover rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
              />
            </div>

            <div className="flex flex-col items-start space-y-8 max-w-xl order-2 md:order-2">
              <div className="space-y-3">
                <p className="uppercase tracking-[0.25em] text-white/60 text-xs md:text-sm">
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

      <section className="why-this-happens">
        <div className="header">
          <h2>Why This Happens</h2>
          <p className="subtitle">
            You're navigating a biological transition with outdated care designed for a younger version of you.
          </p>
        </div>

        <div className="grid-container">
          <div className="col card">
            <div className="number">1</div>
            <h3>Hormonal axis recalibrates</h3>
            <p>
              Estrogen, progesterone, stress hormones, and metabolic signals fluctuate unpredictably.
            </p>
            <div className="label">Hormonal Transition</div>
          </div>

          <div className="col card">
            <div className="number">2</div>
            <h3>Your long-term risk profile evolves</h3>
            <p>
              Metabolism, cardiovascular risk, inflammation, and bone density begin shifting faster than before.
            </p>
            <div className="label">Risk Evolution</div>
          </div>

          <div className="col card">
            <div className="number">3</div>
            <h3>Support systems aren't built for menopause</h3>
            <p>
              Care is fragmented, reactive, and rarely personalised.
            </p>
            <div className="label">Systemic Limitations</div>
          </div>
        </div>

        <p className="summary">
          You're navigating a biological transition with outdated care designed for a younger version of you.
        </p>
      </section>

      {/* How The Arc Supports You */}
      <section className="how-arc-supports">
        <h2 className="section-title">How The Arc Supports You</h2>
        <p className="section-subtitle">
          ARC becomes your long-term hormonal navigation system.
        </p>

        <div className="supports-grid">
          {/* LEFT SIDE */}
          <div>
            <div className="supports-item fade-up">
              <h3>{womenSupportPillars[0].title}</h3>
              <p>{womenSupportPillars[0].text}</p>
            </div>

            <div className="supports-item fade-up">
              <h3>{womenSupportPillars[1].title}</h3>
              <p>{womenSupportPillars[1].text}</p>
            </div>
          </div>

          {/* CIRCLE CENTER */}
          <div>
            <div className="supports-circle fade-up" />
          </div>

          {/* RIGHT SIDE */}
          <div>
            <div className="supports-item fade-up">
              <h3>{womenSupportPillars[2].title}</h3>
              <p>{womenSupportPillars[2].text}</p>
            </div>

            <div className="supports-item fade-up">
              <h3>{womenSupportPillars[3].title}</h3>
              <p>{womenSupportPillars[3].text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorksSection
        description="A structured process designed for women navigating hormonal transitions."
        steps={womenSteps}
      />

      {/* Why It Works */}
      <WhyItWorks 
        title="Why It Works for Women in Menopause"
        subtitle="Personalised menopause support grounded in biomarkers and clinical evidence."
        items={womenWhyItWorks}
        backgroundImage="/why it works for travellers.jpg"
      />

      {/* Women Pricing */}
      <WomenPricingSection />
      <WomenBlueprint />
      <WomenFAQ />

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
            Your biology is changing. Your support shouldn't disappear.
          </p>
          <ArcButton href="/free-screening?persona=women" className="cta-button">
            Start free screening
          </ArcButton>
        </motion.div>
      </section>
    </main>
  );
}

