"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const challengesDetailed = [
  "Feeling tired without a clear cause",
  "Focus that fluctuates unpredictably",
  "Training phases that overwork or under-stimulate",
  "Supplements that help briefly — then stop",
  "Sleep that looks \"fine\" but feels unrefreshing",
  "Too many variables changing at once",
];

const whyThisHappens = [
  {
    number: "1",
    title: "Generic advice ignores biological variance",
    body: "People differ in circadian rhythm, stress reactivity, metabolism, and recovery capacity. Protocols that help one person can impair another.",
    label: "BIOLOGICAL VARIANCE",
  },
  {
    number: "2",
    title: "Signals are mixed with noise",
    body: "Sleep, diet, training, caffeine, stress, and environment change simultaneously. Without isolating variables, cause and effect blur together.",
    label: "SIGNAL-TO-NOISE PROBLEM",
  },
  {
    number: "3",
    title: "Healthcare wasn't designed for iteration",
    body: "Clinical systems focus on diagnosis — not continuous learning. Daily biological feedback rarely gets tested or integrated.",
    label: "SYSTEMIC GAP",
  },
];

const supportPillars = [
  {
    title: "Run one clean experiment at a time",
    text: "Change a single variable while holding others constant, so outcomes remain interpretable.",
  },
  {
    title: "Separate baseline from intervention",
    text: "Your normal state becomes the reference point — not population averages.",
  },
  {
    title: "Measure what matters",
    text: "Only signals that reflect real physiological adaptation are tracked.",
  },
  {
    title: "Translate data into decisions",
    text: "Results are explained in plain language, with uncertainty clearly stated.",
  },
];

const whyItWorksItems = [
  "Causal insight, not correlations",
  "Lower cognitive load",
  "Reduced trial-and-error risk",
  "Fewer unnecessary interventions",
  "Clear stopping rules",
  "Trustworthy conclusions",
];

const toolCapabilities = [
  {
    title: "Scientific Structure",
    items: [
      "Hypothesis definition",
      "Baseline phase",
      "Intervention phase",
      "Washout when needed",
      "Formal conclusion",
    ],
  },
  {
    title: "Personal Signal Modeling",
    items: [
      "Individual baselines",
      "Time-aware analysis",
      "Confounder detection",
      "Subjective + objective fusion",
    ],
  },
  {
    title: "Safety & Guardrails",
    items: [
      "Overtraining detection",
      "Sleep debt warnings",
      "Supplement risk flags",
      "Limits on protocol stacking",
    ],
  },
];

const blueprintCards = [
  {
    title: "What It Learns",
    items: [
      "Optimal sleep window",
      "Training tolerance",
      "Caffeine sensitivity",
      "Recovery needs",
    ],
  },
  {
    title: "How It Evolves",
    items: [
      "Retests when signals drift",
      "Updates confidence levels",
      "Retires ineffective protocols",
    ],
  },
  {
    title: "What You Gain",
    items: [
      "Fewer decisions",
      "More stability",
      "Clear cause-and-effect understanding",
    ],
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.65, ease: "easeOut" },
  }),
};

export default function SelfExperimentationPage() {
  return (
    <main className="persona-traveler min-h-screen text-slate-50">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-black">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("/experiemnt.hero.png")`,
            backgroundSize: "cover",
            backgroundPosition: "75% center",
            filter: "saturate(0.9) brightness(0.85)",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/15 backdrop-blur-[0.5px]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(0,0,0,0.35), transparent 60%), radial-gradient(circle at 85% 20%, rgba(0,0,0,0.25), transparent 55%)",
          }}
        />
        <div className="absolute inset-0 persona-portrait-halo -z-10" style={{ background: "radial-gradient(circle at 20% 30%, var(--persona-accent-soft) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{ background: "radial-gradient(circle at 50% 50%, var(--persona-accent-soft) 0%, transparent 70%)" }} />

        <div className="relative max-w-[1320px] mx-auto px-6 lg:px-10 pt-32 md:pt-40 pb-28 min-h-[90vh] flex items-end justify-end">
          <div className="max-w-[650px] space-y-8 ml-auto mr-0 md:mr-8 lg:mr-16 mb-16 md:mb-24 lg:mb-32">
            <motion.p
              className="text-[12px] tracking-[0.35em] uppercase persona-accent-text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              custom={0}
              variants={textVariants}
            >
              SELF-EXPERIMENTATION
            </motion.p>

            <motion.h1
              className="text-[40px] md:text-[52px] lg:text-[60px] leading-tight tracking-tight font-semibold text-white"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              custom={0.05}
              variants={textVariants}
            >
              Generic health advice wasn't built for you.
            </motion.h1>

            <motion.div
              className="space-y-5 text-white/80 text-lg leading-relaxed max-w-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              custom={0.15}
              variants={textVariants}
            >
              <p>
                Most health guidance assumes an "average human", one that doesn't exist.
                The result isn't failure. It's mismatch.
              </p>
              <p>
                Your body responds uniquely to sleep, nutrition, training, stress, and recovery.
                Without a way to test that response, you're guessing.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              custom={0.35}
              variants={textVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/dashboard/experiments"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold bg-black border border-white/10 text-[#40e0c2] hover:bg-black/80 hover:border-[#40e0c2]/30 transition-all"
              >
                See how self-experiment works
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sub-Hero Strip */}
      <section className="persona-section-fade py-16 md:py-20 bg-black/40">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Your body already gives signals.
            Most people can't interpret them.
          </h2>
          <div className="space-y-3 text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            <p>
              Fatigue. Focus. Recovery. Sleep quality. Training response.
              Without structure, these signals stay noisy and misleading.
            </p>
            <p>
              A self-experimentation system turns lived experience into interpretable patterns.
            </p>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="persona-section-fade py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-white/40 tracking-[0.3em] uppercase text-xs md:text-sm mb-12 text-center">
            COMMON EXPERIENCE
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative w-full h-[400px] md:h-[520px] lg:h-[600px] overflow-hidden rounded-2xl">
              <img
                src="/inconsistent%20process.png"
                alt="Why progress feels inconsistent"
                className="w-full h-full object-cover object-[75%_center] rounded-2xl persona-shadow"
              />
            </div>

            <div className="flex flex-col items-start space-y-8 max-w-xl">
              <div className="space-y-3">
                <h2 className="text-4xl md:text-5xl font-semibold leading-[1.1]">
                  Why progress feels inconsistent
                </h2>
                <p className="italic text-white/80 text-lg md:text-xl">
                  These aren't discipline problems. They're information problems.
                </p>
              </div>

              <ul className="space-y-4 text-white/75 leading-relaxed">
                {challengesDetailed.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 block w-1.5 h-1.5 rounded-full persona-accent-bg opacity-60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-white font-medium text-lg md:text-xl">
                You're not failing. You're <span className="underline decoration-white/20">missing feedback</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Happens */}
      <section className="persona-section-fade py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">Why This Happens</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyThisHappens.map((item, index) => (
              <div key={index} className="persona-card p-8">
                <div className="text-5xl font-bold mb-4 persona-accent">{item.number}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  {item.body}
                </p>
                <div className="text-xs uppercase tracking-wider text-white/50">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Self-Experimentation Fixes This */}
      <section className="persona-section-fade relative py-20 md:py-24">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes arc-orbit-rotate-selfexp {
            0% {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
          .arc-orbit-ring-selfexp {
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            animation: arc-orbit-rotate-selfexp 15s linear infinite !important;
            will-change: transform !important;
          }
        `}} />
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs tracking-[0.25em] text-white/35 uppercase mb-3">
            How It Works
          </p>
          <h2 className="text-3xl md:text-[2.2rem] font-semibold tracking-tight text-white">
            How Self-Experimentation Fixes This
          </h2>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(64,224,194,0.35),rgba(15,23,42,0))]" />
          </div>

          <div 
            className="arc-orbit-ring-selfexp pointer-events-none absolute z-0 h-72 w-72 rounded-full border"
            style={{ borderColor: 'rgba(64, 224, 194, 0.12)' }}
          >
            <div className="absolute inset-6 rounded-full border border-dashed" style={{ borderColor: 'rgba(64, 224, 194, 0.08)' }} />
          </div>

          <div className="relative grid gap-y-16 md:grid-cols-2 md:gap-x-20 md:gap-y-20">
            {supportPillars.map((pillar, index) => (
              <div key={index} className="flex items-start gap-6">
                <span className="relative top-1 h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#40e0c2', boxShadow: '0 0 16px rgba(64, 224, 194, 0.9)' }} />
                <div>
                  <h3 className="text-xl font-semibold text-white leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/65 max-w-md leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              </div>
            ))}

            <div className="hidden md:block pointer-events-none md:col-span-2 mx-auto h-px w-1/2" style={{ backgroundColor: 'rgba(64, 224, 194, 0.1)' }} />
          </div>
        </div>
      </section>

      {/* Why It Works */}
      <section className="persona-section-fade py-24 md:py-28">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-white/55">
              Why It Works
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold">
              Why It Works
            </h2>
            <p className="text-base md:text-lg text-white/70">
              Causal insight, not correlations. Lower cognitive load. Trustworthy conclusions.
            </p>
          </div>

          <div className="mt-12 md:mt-14 grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
            <div className="grid gap-4 md:gap-5 md:grid-cols-2">
              {whyItWorksItems.map((item, index) => (
                <div 
                  key={index}
                  className="rounded-2xl bg-white/5 border border-white/6 px-5 py-4 md:px-6 md:py-5"
                >
                  <p className="text-sm md:text-base font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex md:justify-end">
              <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl rounded-3xl overflow-hidden border border-white/10 bg-white/5 bg-gradient-to-b from-white/10 via-white/3 to-transparent shadow-[0_30px_80px_rgba(0,0,0,0.75)] backdrop-blur-xl">
                <img
                  src="/why%20it%20works_about%20the%20arc.png"
                  alt="Self-experimentation in practice"
                  className="w-full h-auto object-contain"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/70" />
                <div className="pointer-events-none absolute inset-x-5 bottom-5">
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/70">
                    SELF-EXPERIMENTATION IN PRACTICE
                  </p>
                  <p className="mt-1 text-sm text-white/85 leading-snug">
                    One variable. One outcome. Clear interpretation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What A Proper Tool Must Do */}
      <section className="persona-section-fade py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">What A Proper Tool Must Do</h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Three capability tiers that separate structured experimentation from guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {toolCapabilities.map((capability, index) => (
              <motion.div
                key={index}
                className="persona-card p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-4 persona-accent">{capability.title}</h3>
                <ul className="space-y-3">
                  {capability.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-white/75">
                      <span className="text-[#40e0c2] mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Living Personal Blueprint */}
      <section className="persona-section-fade relative w-full py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-white">Your Living Personal Blueprint</h2>
            <p className="text-lg text-gray-300">
              A system that learns your biology and evolves with your signals.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {blueprintCards.map((card, index) => (
              <div
                key={index}
                className="rounded-[24px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] p-8 shadow-[0_35px_90px_rgba(64,224,194,0.05)] space-y-6"
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
                </div>
                <div className="space-y-3">
                  {card.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                      <div className="h-2 w-2 rounded-full bg-[#40e0c2] mt-1" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Filter */}
      <section className="persona-section-fade py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center gap-12"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
                Your health doesn't pause while you decide.
              </h2>
              <p className="text-lg md:text-xl text-white/70">
                The earlier you start observing patterns, the sooner they become useful.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-6 text-white/90">What Starting Now Gives You</h3>
                <ul className="space-y-3 text-white/70">
                  <li>A personal baseline instead of assumptions</li>
                  <li>Clear insight into what actually affects your sleep, energy, and focus</li>
                  <li>Fewer unnecessary changes — more intentional ones</li>
                  <li>Evidence you can build on, not start over</li>
                </ul>
              </div>

              <div className="text-left">
                <h3 className="text-xl font-semibold mb-6 text-white/90">What Waiting Usually Means</h3>
                <ul className="space-y-3 text-white/70">
                  <li>Repeating the same trial-and-error cycles</li>
                  <li>Changing multiple things without knowing what helped</li>
                  <li>Losing context when symptoms fluctuate</li>
                  <li>Needing more time later to reach the same clarity</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/40 italic">
              Biological patterns reveal themselves over time, not instantly.
            </p>

            <div className="flex flex-col items-center gap-3">
              <p className="text-xs text-white/30">
                No commitment beyond the first experiment.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

