"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { motion } from "framer-motion";

interface MicroPlan {
  riskCategory: string;
  microActions: string[];
  weeklyTrigger: string;
  expectedBenefits: string;
}

const microPlans: MicroPlan[] = [
  {
    riskCategory: "Inflammation Risk",
    microActions: [
      "Increase omega-3 intake (2-3g daily)",
      "Reduce processed foods by 50%",
      "Add turmeric/ginger to meals",
      "Prioritize 7-8 hours sleep",
    ],
    weeklyTrigger: "If inflammation markers rise above baseline",
    expectedBenefits: "Reduced systemic inflammation, improved recovery, lower disease risk",
  },
  {
    riskCategory: "Stress Overload",
    microActions: [
      "Implement daily breathing exercises (10 min)",
      "Schedule 2-3 recovery breaks daily",
      "Reduce caffeine after 2pm",
      "Increase magnesium intake",
    ],
    weeklyTrigger: "If stress load exceeds 75 for 3+ consecutive days",
    expectedBenefits: "Better stress resilience, improved sleep, enhanced cognitive function",
  },
  {
    riskCategory: "Sleep Disruption",
    microActions: [
      "Strict sleep schedule (same bedtime/wake time)",
      "No screens 90 min before bed",
      "Evening light dimming protocol",
      "Cool bedroom temperature (65-68°F)",
    ],
    weeklyTrigger: "If sleep quality drops below 70% for 3+ nights",
    expectedBenefits: "Improved sleep quality, better recovery, enhanced daytime energy",
  },
  {
    riskCategory: "Metabolic Drift",
    microActions: [
      "Time-restricted eating (12-14 hour window)",
      "Reduce refined carbohydrates",
      "Increase protein to 1.6g/kg body weight",
      "Daily movement (minimum 10 min)",
    ],
    weeklyTrigger: "If glucose variability increases or weight trends upward",
    expectedBenefits: "Improved metabolic flexibility, stable energy, better body composition",
  },
];

export function MicroPlans() {
  return (
    <GlowCard delay={0.35}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="dashboard-h2">Risk-Focused Micro-Plans</h3>
          <p className="dashboard-description text-sm">
            Targeted intervention plans that activate automatically when specific risk markers are detected.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {microPlans.map((plan, index) => (
            <motion.div
              key={plan.riskCategory}
              className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5 hover:border-[#6FFFC3]/20 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                <h4 className="text-base font-semibold text-white">{plan.riskCategory}</h4>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="text-xs font-semibold text-[#A3B3AA] mb-2 uppercase tracking-wider">
                    Micro-Actions
                  </h5>
                  <ul className="space-y-2">
                    {plan.microActions.map((action, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <h5 className="text-xs font-semibold text-[#A3B3AA] mb-1 uppercase tracking-wider">
                    Weekly Trigger
                  </h5>
                  <p className="text-sm text-[#8A938E]">{plan.weeklyTrigger}</p>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <h5 className="text-xs font-semibold text-[#A3B3AA] mb-1 uppercase tracking-wider">
                    Expected Benefits
                  </h5>
                  <p className="text-sm text-[#A3B3AA]">{plan.expectedBenefits}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}

