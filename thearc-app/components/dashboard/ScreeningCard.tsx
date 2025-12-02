"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { motion } from "framer-motion";

const screeningItems = [
  {
    title: "Full blood panel",
    subtitle: "Detect early biological shifts",
    month: "Month 1",
  },
  {
    title: "Sleep & recovery markers",
    subtitle: "Stabilise circadian rhythm",
    month: "Month 2",
  },
  {
    title: "GI + immune markers",
    subtitle: "Strengthen travel resilience",
    month: "Month 3",
  },
];

export default function ScreeningCard() {
  return (
    <GlowCard delay={0.15}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="dashboard-h2">Precision Screening Plan</h3>
          <p className="dashboard-description text-sm">
            Your essential screenings, mapped to why they matter and when you should take them.
          </p>
        </div>

        <div className="space-y-5">
          {screeningItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="flex items-start justify-between gap-4 pb-4 border-b border-white/5 last:border-0"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div className="flex-1">
                <p className="text-base font-semibold text-white mb-1">{item.title}</p>
                <p className="dashboard-description text-sm">{item.subtitle}</p>
              </div>
              <span className="dashboard-label text-xs whitespace-nowrap">{item.month}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}
