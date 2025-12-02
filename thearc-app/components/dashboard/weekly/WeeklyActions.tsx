"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { WeeklyActionCard } from "./WeeklyActionCard";
import { motion } from "framer-motion";

const weeklyData = {
  nutrition: [
    "Follow anti-inflammatory pattern",
    "Reduce caffeine after 14:00",
    "Increase omega-3 sources",
  ],
  supplements: [
    "Vitamin D3 — morning",
    "Magnesium — evening",
    "Omega-3 — lunch",
  ],
  movement: [
    "10-min daily activation",
    "2 strength sessions",
    "Evening mobility routine",
  ],
  screenings: [
    "Complete cortisol re-check",
    "Upload last labwork",
    "Schedule blood panel",
  ],
  environment: [
    "Bedroom light reset",
    "Blue-light reduction evenings",
  ],
  redflags: [
    "Midday energy crashes",
    "Intermittent headaches",
  ],
};

const moduleTitles: Record<string, string> = {
  nutrition: "Nutrition",
  supplements: "Supplements",
  movement: "Movement & Recovery",
  screenings: "Screenings / Checks",
  environment: "Environment",
  redflags: "Red Flags",
};

export function WeeklyActions() {
  return (
    <GlowCard delay={0}>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="dashboard-h2 mb-2">This Week's Actions</h2>
          <p className="dashboard-description text-sm">
            Your personalized action plan for this week, organized by category.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(weeklyData).map(([module, items], index) => (
            <WeeklyActionCard
              key={module}
              title={moduleTitles[module] || module}
              preview={items.slice(0, 3)}
              module={module}
              delay={0.15 + index * 0.05}
            />
          ))}
        </div>
      </div>
    </GlowCard>
  );
}

