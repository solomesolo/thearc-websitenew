"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { motion } from "framer-motion";

const monthlyModules = [
  {
    month: "Month 1",
    focus: "Reset & Re-baseline",
    modules: ["Concept & Foundation", "Environmental Reset", "Basic Nutrition", "Sleep Optimization"],
  },
  {
    month: "Month 2",
    focus: "Stabilise Core Systems",
    modules: ["Advanced Nutrition", "Movement Protocols", "Stress Management", "Supplement Protocol"],
  },
  {
    month: "Month 3",
    focus: "Strengthen Resilience",
    modules: ["Recovery Protocols", "Micro-Plans Activation", "Metrics Tracking", "Travel Protocol"],
  },
  {
    month: "Month 4",
    focus: "Energy Optimization",
    modules: ["Performance Nutrition", "Advanced Movement", "Recovery Optimization", "Red Flags Monitoring"],
  },
  {
    month: "Month 5",
    focus: "Mobility & Physical Resilience",
    modules: ["Mobility Work", "Strength Maintenance", "Injury Prevention", "Long-term Sustainability"],
  },
  {
    month: "Month 6",
    focus: "Longevity Habits Integration",
    modules: ["Habit Stacking", "Lifestyle Integration", "Community Connection", "Continuous Adaptation"],
  },
];

export function ImplementationCalendar() {
  return (
    <GlowCard delay={0.55}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="dashboard-h2">Implementation Calendar</h3>
          <p className="dashboard-description text-sm">
            A rotating monthly plan that integrates all modules into a cohesive, progressive program.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {monthlyModules.map((month, index) => (
            <motion.div
              key={month.month}
              className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5 hover:border-[#6FFFC3]/20 transition-all"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                <span className="dashboard-label text-xs">{month.month}</span>
              </div>
              <h4 className="text-base font-semibold text-white mb-3">{month.focus}</h4>
              <ul className="space-y-2">
                {month.modules.map((module, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-[#A3B3AA]">
                    <span className="text-[#6FFFC3]">•</span>
                    <span>{module}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}

