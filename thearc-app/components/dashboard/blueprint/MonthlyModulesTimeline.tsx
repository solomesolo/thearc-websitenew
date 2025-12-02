"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { motion } from "framer-motion";
import { useState } from "react";

interface MonthlyModule {
  month: string;
  goal: string;
  why: string;
  dailyActions: string[];
  weeklyReflection: string;
}

const modules: MonthlyModule[] = [
  {
    month: "Month 1",
    goal: "Reset & Re-baseline",
    why: "Establish your biological foundation and identify baseline patterns before optimization.",
    dailyActions: [
      "Morning light exposure (10-15 min within 30 min of waking)",
      "Hydration protocol: 30ml/kg body weight",
      "Evening wind-down routine (no screens 90 min before bed)",
      "Daily movement: 10 min minimum",
    ],
    weeklyReflection: "Track energy levels, sleep quality, and stress markers. Note any patterns.",
  },
  {
    month: "Month 2",
    goal: "Stabilise Core Systems",
    why: "Strengthen foundational biological systems for sustained performance.",
    dailyActions: [
      "Circadian rhythm optimization",
      "Stress management protocols",
      "Nutrient-dense meal timing",
      "Recovery breathing exercises",
    ],
    weeklyReflection: "Assess improvements in sleep, energy stability, and cognitive clarity.",
  },
  {
    month: "Month 3",
    goal: "Strengthen Resilience",
    why: "Build adaptive capacity to handle stress and maintain biological stability.",
    dailyActions: [
      "Advanced recovery protocols",
      "Metabolic flexibility training",
      "Cognitive performance routines",
      "Environmental optimization",
    ],
    weeklyReflection: "Evaluate resilience markers and long-term sustainability of routines.",
  },
  {
    month: "Month 4",
    goal: "Energy Optimization",
    why: "Fine-tune energy systems for peak performance and sustained output.",
    dailyActions: [
      "Metabolic tuning protocols",
      "Performance nutrition timing",
      "Advanced movement patterns",
      "Recovery optimization",
    ],
    weeklyReflection: "Monitor energy levels, performance metrics, and recovery capacity.",
  },
  {
    month: "Month 5",
    goal: "Mobility & Physical Resilience",
    why: "Enhance physical capacity and prevent age-related decline.",
    dailyActions: [
      "Mobility work daily",
      "Strength maintenance",
      "Flexibility protocols",
      "Injury prevention routines",
    ],
    weeklyReflection: "Track physical markers, movement quality, and pain/discomfort levels.",
  },
  {
    month: "Month 6",
    goal: "Longevity Habits Integration",
    why: "Embed sustainable practices for long-term health and vitality.",
    dailyActions: [
      "Habit stacking and automation",
      "Lifestyle integration",
      "Community connection",
      "Continuous learning and adaptation",
    ],
    weeklyReflection: "Review overall progress and identify habits to maintain long-term.",
  },
];

export function MonthlyModulesTimeline() {
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);

  return (
    <GlowCard delay={0.1} className="relative">
      <div className="space-y-6 mb-8">
        <div className="space-y-2">
          <h3 className="dashboard-h2">Six-Month Modular Path</h3>
          <p className="dashboard-description text-sm">
            A progressive, month-by-month approach to biological optimization and longevity.
          </p>
        </div>
      </div>

      <div className="relative pl-8">
        {/* Vertical Timeline Line */}
        <div className="timeline-line" />

        <div className="space-y-10">
          {modules.map((module, index) => (
            <motion.div
              key={module.month}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              {/* Timeline Dot */}
              <div
                className="timeline-dot"
                style={{ top: "0.5rem" }}
              />

              {/* Content Card */}
              <div className="ml-6">
                <button
                  onClick={() => setExpandedMonth(expandedMonth === module.month ? null : module.month)}
                  className="w-full text-left"
                >
                  <div className="mb-4">
                    <span className="dashboard-label text-xs mb-2 block">
                      {module.month}
                    </span>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {module.goal}
                    </h4>
                    <p className="dashboard-description text-sm">
                      {module.why}
                    </p>
                  </div>
                </button>

                {expandedMonth === module.month && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 pb-4"
                  >
                    <div>
                      <h5 className="text-sm font-semibold text-white mb-2">Daily Actions</h5>
                      <ul className="space-y-2">
                        {module.dailyActions.map((action, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                            <span className="text-[#6FFFC3]">•</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-sm font-semibold text-white mb-2">Weekly Reflection</h5>
                      <p className="dashboard-description text-sm">
                        {module.weeklyReflection}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}

