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
import Footer from "../../components/Footer";

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
    <main className="persona-rebuilder min-h-screen text-slate-50">
      <RebuilderHero />

      <RebuilderPersonaSection />

      <section className="persona-section-fade py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-white/40 tracking-[0.3em] uppercase text-xs md:text-sm mb-12">
            Challenges We Commonly See
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative w-full h-[400px] md:h-[520px] lg:h-[600px]">
              <img
                src="/header-explorer.png"
                alt="Health rebuilders"
                className="w-full h-full object-cover rounded-2xl persona-shadow"
              />
            </div>

            <div className="flex flex-col items-start space-y-8 max-w-xl">
              <div className="space-y-3">
                <p className="uppercase tracking-[0.25em] persona-accent text-xs md:text-sm">
                  Health Rebuilders
                </p>
                <h2 className="text-4xl md:text-5xl font-semibold leading-[1.1]">
                  Challenges You May Recognise
                </h2>
              </div>

              <ul className="space-y-4 text-white/75 leading-relaxed">
                {rebuilderChallengesDetailed.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 block w-1.5 h-1.5 rounded-full persona-accent-bg opacity-60" />
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

      <section className="persona-section-fade py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">Why This Happens</h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto text-center">
              You're working hard — but without the data or plan that explains what your body is actually trying to correct.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="persona-card p-8">
              <div className="text-5xl font-bold mb-4 persona-accent">1</div>
              <h3 className="text-xl font-semibold mb-3">Hidden imbalances compound over time</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Nutrients, hormones, inflammation, sleep cycles, and metabolic signals drift subtly — creating symptoms long before they show up as disease.
              </p>
              <div className="text-xs uppercase tracking-wider text-white/50">Biological Drift</div>
            </div>

            <div className="persona-card p-8">
              <div className="text-5xl font-bold mb-4 persona-accent">2</div>
              <h3 className="text-xl font-semibold mb-3">Standard checkups miss early-stage dysfunction</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Biological instability often hides underneath "normal range" lab results.
              </p>
              <div className="text-xs uppercase tracking-wider text-white/50">Detection Gap</div>
            </div>

            <div className="persona-card p-8">
              <div className="text-5xl font-bold mb-4 persona-accent">3</div>
              <h3 className="text-xl font-semibold mb-3">Care is reactive, not preventive</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Most systems wait for problems to escalate before taking action.
              </p>
              <div className="text-xs uppercase tracking-wider text-white/50">Systemic Limitations</div>
            </div>
          </div>
        </div>
      </section>

      {/* How The Arc Supports You */}
      <section className="persona-section-fade relative py-20 md:py-24">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes arc-orbit-rotate-rebuilder {
            0% {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
          .arc-orbit-ring-rebuilder {
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            animation: arc-orbit-rotate-rebuilder 15s linear infinite !important;
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
            ARC becomes your clarity system and your long-term rebuilding plan.
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          {/* Central glow + rotating halo */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2">
            {/* Soft inner glow */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(74,222,128,0.35),rgba(15,23,42,0))]" />
          </div>

          {/* Rotating halo - positioned separately */}
          <div 
            className="arc-orbit-ring-rebuilder pointer-events-none absolute z-0 h-72 w-72 rounded-full border"
            style={{ borderColor: 'rgba(74, 222, 128, 0.12)' }}
          >
            {/* Broken ring effect */}
            <div className="absolute inset-6 rounded-full border border-dashed" style={{ borderColor: 'rgba(74, 222, 128, 0.08)' }} />
          </div>

          {/* Benefit grid */}
          <div className="relative grid gap-y-16 md:grid-cols-2 md:gap-x-20 md:gap-y-20">
            
            {/* 1 */}
            <div className="flex items-start gap-6">
              <span className="relative top-1 h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#4ade80', boxShadow: '0 0 16px rgba(74, 222, 128, 0.9)' }} />
              <div>
                <h3 className="text-xl font-semibold text-white leading-snug">
                  {rebuilderSupportPillars[0].title}
                </h3>
                <p className="mt-3 text-sm text-white/65 max-w-md leading-relaxed">
                  {rebuilderSupportPillars[0].text}
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="flex items-start gap-6">
              <span className="relative top-1 h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#4ade80', boxShadow: '0 0 16px rgba(74, 222, 128, 0.9)' }} />
              <div>
                <h3 className="text-xl font-semibold text-white leading-snug">
                  {rebuilderSupportPillars[1].title}
                </h3>
                <p className="mt-3 text-sm text-white/65 max-w-md leading-relaxed">
                  {rebuilderSupportPillars[1].text}
                </p>
              </div>
            </div>

            {/* Divider hint (desktop only) */}
            <div className="hidden md:block pointer-events-none md:col-span-2 mx-auto h-px w-1/2" style={{ backgroundColor: 'rgba(74, 222, 128, 0.1)' }} />

            {/* 3 */}
            <div className="flex items-start gap-6">
              <span className="relative top-1 h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#4ade80', boxShadow: '0 0 16px rgba(74, 222, 128, 0.9)' }} />
              <div>
                <h3 className="text-xl font-semibold text-white leading-snug">
                  {rebuilderSupportPillars[2].title}
                </h3>
                <p className="mt-3 text-sm text-white/65 max-w-md leading-relaxed">
                  {rebuilderSupportPillars[2].text}
                </p>
              </div>
            </div>

            {/* 4 */}
            <div className="flex items-start gap-6">
              <span className="relative top-1 h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#4ade80', boxShadow: '0 0 16px rgba(74, 222, 128, 0.9)' }} />
              <div>
                <h3 className="text-xl font-semibold text-white leading-snug">
                  {rebuilderSupportPillars[3].title}
                </h3>
                <p className="mt-3 text-sm text-white/65 max-w-md leading-relaxed">
                  {rebuilderSupportPillars[3].text}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <div className="persona-section-fade">
        <HowItWorksSection
          description="A structured process designed to rebuild stability, energy, and confidence."
          steps={rebuilderSteps}
        />
      </div>

      {/* Why It Works */}
      <div className="persona-section-fade">
        <WhyItWorks 
          title="Why It Works for Health Rebuilders"
          subtitle="A clear, structured path to rebuild stability, energy, and confidence."
          items={rebuilderWhyItWorks}
          backgroundImage="/why it works for travellers.jpg"
        />
      </div>

      {/* Rebuilder Pricing */}
      <div className="persona-section-fade">
        <RebuilderPricingSection />
      </div>
      <div className="persona-section-fade">
        <RebuilderBlueprint />
      </div>
      <div className="persona-section-fade">
        <RebuilderFAQ />
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
              Your symptoms are real. Your path to clarity shouldn't be.
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
      <Footer accentColor="#4ade80" />
    </main>
  );
}
