"use client";

import { motion } from "framer-motion";
import Section from "../../components/Section";
import SectionTitle from "../../components/SectionTitle";
import { HowItWorksSection } from "../../components/HowItWorksSection";
import TravelerPersonaSection from "../../components/TravelerPersonaSection";
import TravelerHero from "../../components/TravelerHero";
import { ArcButton } from "../../components/ui/ArcButton";
import WhyItWorks from "../../components/sections/WhyItWorks";
import { PersonalBlueprint } from "../../components/sections/PersonalBlueprint";
import { TravelerFAQ } from "../../components/sections/TravelerFAQ";
import { TravelerPricingSection } from "../../components/sections/TravelerPricingSection";

const travelerChallengesDetailed = [
  "Jet lag and sleep cycles that never fully reset",
  "Digestion that shifts with every new country",
  "Immune dips at border crossings",
  "No doctor who knows your long-term health picture",
  "Screenings missed for years because you never stay put",
  "Medical files scattered across countries",
  "Fatigue that hits mid-trip when you need clarity most",
];

const travelerSystemDisruptions = [
  "Circadian rhythms lose stability",
  "Hormonal cycles shift with sleep disruption",
  "Digestive rhythm resets every few weeks",
  "Immunity drops during transitions",
  "Recovery windows shrink as environments change",
];

const travelerContinuityBreaks = [
  "Each country resets the rules and the paperwork",
  "No central medical file follows you",
  "No long-term doctor-patient relationship",
  "Preventative schedules collapse without continuity",
  "Systems treat symptoms, not long-term risks",
  "Your data disappears every time you leave",
];

const travelerSupportPillars = [
  {
    title: "Reveal how travel impacts your biology",
    text: "Deep screening across immunity, sleep, digestion, stress, inflammation, longevity markers, and recovery patterns.",
  },
  {
    title: "Build your global health baseline",
    text: "Create one medical profile that stays with you — not the country you just left.",
  },
  {
    title: "Get personalised, travel-proof routines",
    text: "Circadian resets, immune support, digestive stability, portable nutrition, and micro-recovery habits for travel days.",
  },
  {
    title: "Stay guided every month",
    text: "We track your biomarkers over time and adjust your plan as your lifestyle evolves.",
  },
];

const travelerSteps = [
  {
    number: "01",
    title: "Free check",
    text: "A fast, risk-spotting scan that shows what's missing in your screening history — and what needs attention now.",
  },
  {
    number: "02",
    title: "Full assessment",
    text: "A deep review of your travel patterns, recovery load, sleep, immunity, and long-term biological strengths & weak points.",
  },
  {
    number: "03",
    title: "Your 6-month plan",
    text: "A personalised, travel-proof roadmap that stabilises your biology and supports longevity — wherever you live next.",
  },
  {
    number: "04",
    title: "Insights update",
    text: "Monthly adjustments guided by your biomarkers, ensuring your plan evolves as your lifestyle moves.",
  },
];

const travelerWhyItWorks = [
  "One medical system that follows you",
  "Portability across countries",
  "Routines that stabilise your biology",
  "Stronger immunity on the move",
  "Predictable screenings and health monitoring",
  "At-home medical services worldwide",
  "A lifespan strategy built for global living",
];

export default function TravelerPage() {

  return (
    <main className="bg-black text-white">
      <TravelerHero />

      <TravelerPersonaSection />

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
                alt="Global travelers with luggage"
                className="w-full h-full object-cover rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
              />
            </div>

            <div className="flex flex-col items-start space-y-8 max-w-xl order-2 md:order-2">
              <div className="space-y-3">
                <p className="uppercase tracking-[0.25em] text-white/60 text-xs md:text-sm">
                  Travellers & Nomads
                </p>
                <h2 className="text-4xl md:text-5xl font-semibold leading-[1.1]">
                  Challenges You May Recognise
                </h2>
                <p className="italic text-white/80 text-lg md:text-xl">
                  Does any of this feel uncomfortably familiar?
                </p>
              </div>

              <ul className="space-y-4 text-white/75 leading-relaxed">
                {travelerChallengesDetailed.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-white/40" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-white font-medium text-lg md:text-xl">
                You’re not “unhealthy.” You’re <span className="underline decoration-white/20">under-supported</span> for the life you live.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-this-happens">
        <div className="header">
          <h2>Why This Happens</h2>
          <p className="subtitle">
            The world changes around you faster than your biology can adapt.
          </p>
        </div>

        <div className="grid-container">
          <div className="col card">
            <div className="number">1</div>
            <h3>Your core systems destabilise</h3>
            <p>
              Travel disrupts the rhythms your biology depends on. Circadian timing loses its anchor, hormones shift with
              sleep disruption, digestion resets every few weeks, and immunity dips during each transition.
            </p>
            <div className="label">Travel Biology Impact</div>
          </div>

          <div className="col card">
            <div className="number">2</div>
            <h3>Care resets every time you cross borders</h3>
            <p>
              Each country brings a new system, new rules, and new paperwork. No central medical file follows you.
              Preventative schedules collapse without continuity, and relationships with doctors never form long enough to manage risks.
            </p>
            <div className="label">Continuity Breakdown</div>
          </div>

          <div className="col card">
            <div className="number">3</div>
            <h3>Healthcare wasn’t built for movers</h3>
            <p>
              Modern mobility exposes a system designed for one-location living. Symptoms get treated, not underlying
              patterns. Your data disappears every time you leave. It’s not your discipline — it’s outdated infrastructure.
            </p>
            <div className="label">Systemic Limitations</div>
          </div>
        </div>

        <p className="summary">
          You’re living a modern lifestyle with a medical system built for people who never move.
        </p>
      </section>

      {/* How The Arc Supports You */}
      <section className="how-arc-supports">
        <h2 className="section-title">How The Arc Supports You</h2>
        <p className="section-subtitle">
          We become your consistent health system — wherever you go.
        </p>

        <div className="supports-grid">
          {/* LEFT SIDE */}
          <div>
            <div className="supports-item fade-up">
              <h3>{travelerSupportPillars[0].title}</h3>
              <p>{travelerSupportPillars[0].text}</p>
            </div>

            <div className="supports-item fade-up">
              <h3>{travelerSupportPillars[1].title}</h3>
              <p>{travelerSupportPillars[1].text}</p>
            </div>
          </div>

          {/* CIRCLE CENTER */}
          <div>
            <div className="supports-circle fade-up" />
          </div>

          {/* RIGHT SIDE */}
          <div>
            <div className="supports-item fade-up">
              <h3>{travelerSupportPillars[2].title}</h3>
              <p>{travelerSupportPillars[2].text}</p>
            </div>

            <div className="supports-item fade-up">
              <h3>{travelerSupportPillars[3].title}</h3>
              <p>{travelerSupportPillars[3].text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorksSection
        description="A structured, global-first process designed for people who live everywhere."
        steps={travelerSteps}
      />

      {/* Why It Works */}
      <WhyItWorks 
        items={travelerWhyItWorks}
        backgroundImage="/why it works for travellers.jpg"
      />

      {/* Traveller Pricing */}
      <TravelerPricingSection />
      <PersonalBlueprint />
      <TravelerFAQ />

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
            Your lifestyle is global. Your health can be too.
          </p>
          <ArcButton href="/free-screening" className="cta-button">
            Start free screening
          </ArcButton>
        </motion.div>
      </section>
    </main>
  );
}

