"use client";

import { motion } from "framer-motion";

const metrics = [
  {
    label: "Stress Load",
    value: 85,
    detail:
      "Sustained cognitive and emotional pressure elevates baseline stress physiology.",
  },
  {
    label: "Cortisol Regulation",
    value: 70,
    detail: "Patterns indicate reduced recovery capacity across the workweek.",
  },
  {
    label: "Sleep Quality",
    value: 55,
    detail: "Irregular routines impact sleep depth and circadian rhythm stability.",
  },
  {
    label: "Cognitive Recovery",
    value: 60,
    detail: "Signs of mild fatigue accumulation affecting clarity and focus.",
  },
  {
    label: "Inflammation",
    value: 50,
    detail: "Early markers of systemic inflammation may emerge under chronic workload.",
  },
];

export function PredispositionMap() {
  return (
    <section className="space-y-6">
      <div className="space-y-2 text-center">
        <h3 className="text-[28px] font-semibold tracking-wide text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          Predisposition Map
        </h3>
        <p className="text-sm text-gray-400 max-w-2xl mx-auto text-center leading-[1.55]">
          A snapshot of your genetic, biological, and lifestyle risk areas—summarised for fast understanding.
        </p>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-12 shadow-[0_40px_120px_rgba(20,255,155,0.05)] max-w-4xl mx-auto">
        <div className="space-y-5">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-2 group">
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-gray-200">
                <span className="font-medium uppercase tracking-[0.15em] text-gray-400">
                  {metric.label}
                </span>
                <span className="text-base font-semibold text-white">{metric.value}</span>
              </div>
              <div className="h-2.5 rounded-full bg-[#121212] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-200 shadow-[0_0_18px_rgba(20,241,149,0.35)]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${metric.value}%` }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-emerald-200/80 opacity-0 group-hover:opacity-100 transition duration-200">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



