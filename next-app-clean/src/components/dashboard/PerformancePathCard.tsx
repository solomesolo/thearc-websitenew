"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { motion } from "framer-motion";

const performancePath = [
  {
    month: "Month 1",
    focus: "Reset & Re-baseline",
    bullets: [
      "Full travel-specific blood panel",
      "Circadian + sleep pattern reset",
      "Digestive stabilisation plan",
      "Rebuild core biological baseline",
    ],
  },
  {
    month: "Month 2",
    focus: "Stabilise & Strengthen",
    bullets: [
      "Stress + cortisol balancing",
      "Nutrient optimisation for energy",
      "Cardiometabolic stabilisation",
    ],
  },
  {
    month: "Month 3",
    focus: "Rebuild & Sustain",
    bullets: [
      "Cognitive clarity routines",
      "Metabolic recovery support",
      "Long-term balance strategy",
    ],
  },
  {
    month: "Month 4",
    focus: "Energy Optimization",
    bullets: [
      "Advanced metabolic tuning",
      "Performance enhancement protocols",
    ],
  },
  {
    month: "Month 5",
    focus: "Mobility & Resilience",
    bullets: [
      "Physical resilience building",
      "Advanced recovery protocols",
    ],
  },
  {
    month: "Month 6",
    focus: "Longevity Habits",
    bullets: [
      "Sustainable lifestyle integration",
      "Long-term maintenance plan",
    ],
  },
];

export default function PerformancePathCard() {
  return (
    <GlowCard delay={0.2} className="relative">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="dashboard-h2">Your 6-Month Performance Path</h3>
          <p className="dashboard-description text-sm">
            A clinically guided, month-by-month program designed to strengthen your focus, stamina, and resilience.
          </p>
        </div>

        <div className="relative pl-8">
          {/* Vertical Timeline Line */}
          <div className="timeline-line" />

          <div className="space-y-10">
            {performancePath.map((phase, index) => (
              <motion.div
                key={phase.month}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                {/* Timeline Dot */}
                <div
                  className="timeline-dot"
                  style={{ top: "0.5rem" }}
                />

                {/* Content Card */}
                <div className="ml-6">
                  <div className="mb-3">
                    <span className="dashboard-label text-xs mb-2 block">
                      {phase.month}
                    </span>
                    <h4 className="text-lg font-semibold text-white mb-3">
                      {phase.focus}
                    </h4>
                  </div>

                  <ul className="space-y-2">
                    {phase.bullets.map((bullet, bulletIndex) => (
                      <motion.li
                        key={bulletIndex}
                        className="flex items-center gap-2 text-sm text-[#A3B3AA]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 + bulletIndex * 0.05 }}
                      >
                        <span className="text-[#6FFFC3]">•</span>
                        <span>{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </GlowCard>
  );
}
