"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { motion } from "framer-motion";

interface RedFlag {
  category: string;
  whenToMonitor: string[];
  whenToRetest: string;
  whenToSeekMedical: string;
}

const redFlags: RedFlag[] = [
  {
    category: "Inflammation Markers",
    whenToMonitor: [
      "CRP > 3.0 mg/L",
      "Persistent elevated markers for 2+ weeks",
      "Rapid increase (>50%) in short period",
    ],
    whenToRetest: "If markers remain elevated after 4-6 weeks of intervention",
    whenToSeekMedical: "If CRP > 10 mg/L or persistent symptoms (fever, joint pain, fatigue)",
  },
  {
    category: "Stress & Cortisol",
    whenToMonitor: [
      "Cortisol awakening response < 2.5 nmol/L",
      "Evening cortisol not declining",
      "DHEA-S significantly low for age",
    ],
    whenToRetest: "After 6-8 weeks of stress management protocols",
    whenToSeekMedical: "If experiencing severe fatigue, weight changes, or mood disturbances",
  },
  {
    category: "Sleep Disruption",
    whenToMonitor: [
      "Sleep efficiency < 85% for 1+ week",
      "Frequent night awakenings (>3 per night)",
      "Daytime fatigue affecting daily function",
    ],
    whenToRetest: "After 4 weeks of sleep optimization protocols",
    whenToSeekMedical: "If sleep issues persist >6 weeks or include breathing problems, restless legs",
  },
  {
    category: "Metabolic Markers",
    whenToMonitor: [
      "Fasting glucose >100 mg/dL consistently",
      "HbA1c trending upward",
      "Triglycerides >150 mg/dL",
    ],
    whenToRetest: "After 8-12 weeks of dietary and lifestyle interventions",
    whenToSeekMedical: "If fasting glucose >126 mg/dL or HbA1c >6.5%",
  },
];

export function RedFlags() {
  return (
    <GlowCard delay={0.5}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="dashboard-h2">Red Flags & Action Thresholds</h3>
          <p className="dashboard-description text-sm">
            Clear guidelines for when to monitor, retest, or seek medical attention based on biomarker changes.
          </p>
        </div>

        <div className="space-y-6">
          {redFlags.map((flag, index) => (
            <motion.div
              key={flag.category}
              className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 + index * 0.1 }}
            >
              <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
                {flag.category}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h5 className="text-xs font-semibold text-[#A3B3AA] mb-2 uppercase tracking-wider">
                    When to Monitor
                  </h5>
                  <ul className="space-y-1.5">
                    {flag.whenToMonitor.map((item, idx) => (
                      <li key={idx} className="text-xs text-[#8A938E]">• {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-[#A3B3AA] mb-2 uppercase tracking-wider">
                    When to Retest
                  </h5>
                  <p className="text-xs text-[#8A938E]">{flag.whenToRetest}</p>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-red-400/80 mb-2 uppercase tracking-wider">
                    When to Seek Medical Review
                  </h5>
                  <p className="text-xs text-[#8A938E]">{flag.whenToSeekMedical}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}

