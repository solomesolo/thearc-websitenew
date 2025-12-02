"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { motion } from "framer-motion";

const environmentalTasks = [
  {
    category: "Circadian Reset",
    tasks: [
      "Morning light exposure: 10-15 min within 30 min of waking",
      "Evening light dimming: Reduce blue light 2 hours before bed",
      "Consistent sleep-wake schedule (±30 min)",
      "Blackout curtains or sleep mask",
    ],
  },
  {
    category: "Bedroom Optimization",
    tasks: [
      "Temperature: 65-68°F (18-20°C)",
      "Remove electronic devices from bedroom",
      "Use blue light blocking glasses in evening",
      "Optimize mattress and pillow for comfort",
    ],
  },
  {
    category: "Light Exposure Plan",
    tasks: [
      "Bright light (10,000+ lux) in morning",
      "Natural light breaks every 2-3 hours",
      "Avoid bright screens after sunset",
      "Use warm, dim lighting in evening",
    ],
  },
  {
    category: "Environmental Toxin Reduction",
    tasks: [
      "Air purifier in bedroom and office",
      "Filter drinking water (reverse osmosis or carbon filter)",
      "Reduce plastic use (especially food containers)",
      "Natural cleaning products",
      "Houseplants for air quality",
    ],
  },
];

export function EnvironmentalReset() {
  return (
    <GlowCard delay={0.4}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="dashboard-h2">Environmental Reset Module</h3>
          <p className="dashboard-description text-sm">
            Optimize your physical environment to support circadian health, sleep quality, and biological resilience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {environmentalTasks.map((section, index) => (
            <motion.div
              key={section.category}
              className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 + index * 0.1 }}
            >
              <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                {section.category}
              </h4>
              <ul className="space-y-3">
                {section.tasks.map((task, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                    <span className="text-[#6FFFC3]">✓</span>
                    <span>{task}</span>
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

