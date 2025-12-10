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
import Footer from "../../components/Footer";

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
    <main className="persona-traveler min-h-screen text-slate-50">
      <TravelerHero />

      <TravelerPersonaSection />

      <section className="persona-section-fade py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-white/40 tracking-[0.3em] uppercase text-xs md:text-sm mb-12">
            Challenges We Commonly See
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative w-full h-[400px] md:h-[520px] lg:h-[600px]">
              <img
                src="/header-explorer.png"
                alt="Global travelers with luggage"
                className="w-full h-full object-cover rounded-2xl persona-shadow"
              />
            </div>

            <div className="flex flex-col items-start space-y-8 max-w-xl">
              <div className="space-y-3">
                <p className="uppercase tracking-[0.25em] persona-accent text-xs md:text-sm">
                  Global Movers
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
                    <span className="mt-2 block w-1.5 h-1.5 rounded-full persona-accent-bg opacity-60" />
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

      <section className="persona-section-fade py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">Why This Happens</h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto text-center">
              The world changes around you faster than your biology can adapt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="persona-card p-8">
              <div className="text-5xl font-bold mb-4 persona-accent">1</div>
              <h3 className="text-xl font-semibold mb-3">Your core systems destabilise</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Travel disrupts the rhythms your biology depends on. Circadian timing loses its anchor, hormones shift with
                sleep disruption, digestion resets every few weeks, and immunity dips during each transition.
              </p>
              <div className="text-xs uppercase tracking-wider text-white/50">Travel Biology Impact</div>
            </div>

            <div className="persona-card p-8">
              <div className="text-5xl font-bold mb-4 persona-accent">2</div>
              <h3 className="text-xl font-semibold mb-3">Care resets every time you cross borders</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Each country brings a new system, new rules, and new paperwork. No central medical file follows you.
                Preventative schedules collapse without continuity, and relationships with doctors never form long enough to manage risks.
              </p>
              <div className="text-xs uppercase tracking-wider text-white/50">Continuity Breakdown</div>
            </div>

            <div className="persona-card p-8">
              <div className="text-5xl font-bold mb-4 persona-accent">3</div>
              <h3 className="text-xl font-semibold mb-3">Healthcare wasn't built for movers</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Modern mobility exposes a system designed for one-location living. Symptoms get treated, not underlying
                patterns. Your data disappears every time you leave. It's not your discipline — it's outdated infrastructure.
              </p>
              <div className="text-xs uppercase tracking-wider text-white/50">Systemic Limitations</div>
            </div>
          </div>
        </div>
      </section>

      {/* How The Arc Supports You */}
      <section className="persona-section-fade relative py-20 md:py-24">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes arc-orbit-rotate-traveler {
            0% {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
          .arc-orbit-ring-traveler {
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            animation: arc-orbit-rotate-traveler 15s linear infinite !important;
            will-change: transform !important;
          }
        `}} />
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs tracking-[0.25em] text-white/35 uppercase mb-3">
            How It Works
          </p>
          <h2 className="text-3xl md:text-[2.2rem] font-semibold tracking-tight text-white">
            How The Arc Supports You
          </h2>
          <p className="mt-3 text-sm md:text-base text-white/60">
            We become your consistent health system — wherever you go.
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          {/* Central glow + rotating halo */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2">
            {/* Soft inner glow */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(64,224,194,0.35),rgba(15,23,42,0))]" />
          </div>

          {/* Rotating halo - positioned separately */}
          <div 
            className="arc-orbit-ring-traveler pointer-events-none absolute z-0 h-72 w-72 rounded-full border"
            style={{ borderColor: 'rgba(64, 224, 194, 0.12)' }}
          >
            {/* Broken ring effect */}
            <div className="absolute inset-6 rounded-full border border-dashed" style={{ borderColor: 'rgba(64, 224, 194, 0.08)' }} />
          </div>

          {/* Benefit grid */}
          <div className="relative grid gap-y-16 md:grid-cols-2 md:gap-x-20 md:gap-y-20">
            
            {/* 1 */}
            <div className="flex items-start gap-6">
              <span className="relative top-1 h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#40e0c2', boxShadow: '0 0 16px rgba(64, 224, 194, 0.9)' }} />
              <div>
                <h3 className="text-xl font-semibold text-white leading-snug">
                  {travelerSupportPillars[0].title}
                </h3>
                <p className="mt-3 text-sm text-white/65 max-w-md leading-relaxed">
                  {travelerSupportPillars[0].text}
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="flex items-start gap-6">
              <span className="relative top-1 h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#40e0c2', boxShadow: '0 0 16px rgba(64, 224, 194, 0.9)' }} />
              <div>
                <h3 className="text-xl font-semibold text-white leading-snug">
                  {travelerSupportPillars[1].title}
                </h3>
                <p className="mt-3 text-sm text-white/65 max-w-md leading-relaxed">
                  {travelerSupportPillars[1].text}
                </p>
              </div>
            </div>

            {/* Divider hint (desktop only) */}
            <div className="hidden md:block pointer-events-none md:col-span-2 mx-auto h-px w-1/2" style={{ backgroundColor: 'rgba(64, 224, 194, 0.1)' }} />

            {/* 3 */}
            <div className="flex items-start gap-6">
              <span className="relative top-1 h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#40e0c2', boxShadow: '0 0 16px rgba(64, 224, 194, 0.9)' }} />
              <div>
                <h3 className="text-xl font-semibold text-white leading-snug">
                  {travelerSupportPillars[2].title}
                </h3>
                <p className="mt-3 text-sm text-white/65 max-w-md leading-relaxed">
                  {travelerSupportPillars[2].text}
                </p>
              </div>
            </div>

            {/* 4 */}
            <div className="flex items-start gap-6">
              <span className="relative top-1 h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#40e0c2', boxShadow: '0 0 16px rgba(64, 224, 194, 0.9)' }} />
              <div>
                <h3 className="text-xl font-semibold text-white leading-snug">
                  {travelerSupportPillars[3].title}
                </h3>
                <p className="mt-3 text-sm text-white/65 max-w-md leading-relaxed">
                  {travelerSupportPillars[3].text}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <div className="persona-section-fade">
        <HowItWorksSection
          description="A structured, global-first process designed for people who live everywhere."
          steps={travelerSteps}
        />
      </div>

      {/* Why It Works */}
      <div className="persona-section-fade">
        <WhyItWorks 
          title="Why It Works for Travellers"
          subtitle="One medical partner. One continuity plan. Wherever you live next."
          items={travelerWhyItWorks}
          backgroundImage="/why it works for travellers.jpg"
        />
      </div>

      {/* Traveller Pricing */}
      <div className="persona-section-fade">
        <TravelerPricingSection />
      </div>
      <div className="persona-section-fade">
        <PersonalBlueprint />
      </div>
      <div className="persona-section-fade">
        <TravelerFAQ />
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
            <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
              Your lifestyle is global. Your health can be too.
            </p>
            <button 
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-slate-950 bg-[var(--persona-accent)] hover:bg-[var(--persona-accent)]/90 shadow-lg shadow-[var(--persona-accent)]/40 transition-all"
            >
              Start free screening
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer accentColor="#40e0c2" />
    </main>
  );
}

