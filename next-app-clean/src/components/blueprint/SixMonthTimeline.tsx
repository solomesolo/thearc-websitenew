"use client";

import { motion } from "framer-motion";

const phases = [
  {
    month: "Month 1",
    title: "Reset & Establish Clarity",
    bullets: [
      "Full executive health baseline",
      "Stress-load and recovery pattern assessment",
      "Metabolic and sleep architecture profiling",
      "Immediate stabilisation routines for energy and focus",
    ],
  },
  {
    month: "Month 2",
    title: "Strengthen Core Systems",
    bullets: [
      "Essential micronutrient optimisation",
      "Anti-inflammatory lifestyle adjustments",
      "Foundational routines to stabilise energy and cognitive output",
    ],
  },
];

export function SixMonthTimeline() {
  return (
    <section className="space-y-6 w-full flex flex-col items-center">
      <div className="space-y-2 w-full flex flex-col items-center">
        <h3 className="text-[28px] font-semibold tracking-wide text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.05)] text-center">
          Your 6-Month Performance Path
        </h3>
        <p className="text-sm text-gray-400 max-w-2xl text-center leading-[1.55]">
          A clinically guided, month-by-month program designed to strengthen your focus, stamina, and resilience while you perform at a high level.
        </p>
      </div>

      <div className="relative pl-8 md:pl-12">
        <div className="absolute left-4 md:left-6 top-5 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-emerald-500/35 to-transparent" />

        <div className="space-y-6">
          {phases.map((phase, idx) => (
            <motion.div
              key={phase.month}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="relative rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.03)] px-8 py-7 shadow-[0_20px_60px_rgba(0,0,0,0.45)] ml-4"
            >
              <div className="absolute -left-[42px] top-10 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(20,241,149,0.6)]" />
              </div>

              <div className="space-y-1.5">
                <p className="text-xs uppercase tracking-[0.35em] text-gray-500">{phase.month}</p>
                <p className="text-lg font-semibold text-white">{phase.title}</p>
              </div>

              <div className="mt-4 space-y-2.5">
                {phase.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 mt-1" />
                    <p>{bullet}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



