"use client";

import { motion } from "framer-motion";

const phases = [
  {
    month: "Month 1",
    title: "Reset & Re-Baseline",
    bullets: [
      "Full travel-specific blood panel",
      "Circadian + sleep reset routines",
      "Digestive stabilisation",
      "Emergency resilience protocol",
    ],
  },
  {
    month: "Month 2",
    title: "Strengthen Immunity",
    bullets: [
      "Immune-supportive micronutrients",
      "Anti-inflammatory routines",
      "Infection-risk filtration habits",
    ],
  },
  {
    month: "Month 3",
    title: "Optimise Sleep & Rhythm",
    bullets: [
      "Consistent wake–sleep anchors",
      "Pre-flight rhythm conditioning",
      "Melatonin-safety micro-protocol",
    ],
  },
  {
    month: "Month 4",
    title: "Restore Metabolic Balance",
    bullets: [
      "Nutrient replenishment",
      "Meal-timing stabilisation",
      "Travel-safe metabolic habits",
    ],
  },
  {
    month: "Month 5",
    title: "Reduce Stress Load",
    bullets: [
      "Environmental stress recovery",
      "Nervous system down-regulation techniques",
      "Focus + energy protection practices",
    ],
  },
  {
    month: "Month 6",
    title: "Reassess & Realign",
    bullets: [
      "Comprehensive biological reassessment",
      "Adjust plan based on measurable change",
      "Long-term travel-proof wellbeing strategy",
    ],
  },
];

export function SixMonthTimeline() {
  return (
    <section className="space-y-6">
      <div className="space-y-2 text-center md:text-left">
        <h3 className="text-[28px] font-semibold tracking-wide text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          Your 6-Month Stabilisation Path
        </h3>
        <p className="text-sm text-gray-400 max-w-2xl leading-[1.55]">
          A clinically guided, month-by-month sequence designed to stabilise your biology while you
          travel.
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



