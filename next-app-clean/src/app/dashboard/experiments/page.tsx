"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { SupplementProtocol } from "@/components/dashboard/blueprint/SupplementProtocol";
import { MicroPlans } from "@/components/dashboard/blueprint/MicroPlans";
import { RedFlags } from "@/components/dashboard/blueprint/RedFlags";
import { ChevronDown } from "lucide-react";

// Blueprint data - will swap based on selection
const blueprints = {
  "caffeine-timing": {
    name: "Caffeine Timing Blueprint",
    phase: "Intervention",
    day: 6,
    totalDays: 14,
    dataCompleteness: 86,
    evidenceConfidence: "Moderate",
    confidenceTrend: "↑",
    clinicalIntent: "Reduce circadian disruption and sympathetic overactivation.",
    duration: "14 days (locked)",
    intervention: [
      "First caffeine ≥90 min after waking",
      "Last caffeine ≥9 h before sleep"
    ],
    expectedAdaptation: "5–10 days",
    signals: [
      {
        name: "Sleep Onset Latency (minutes)",
        why: "Time to fall asleep reflects nervous system arousal and caffeine clearance."
      },
      {
        name: "Nocturnal Fragmentation Index",
        why: "Frequent awakenings indicate disrupted sleep architecture."
      },
      {
        name: "Daytime Alertness Score",
        why: "Measures whether sleep changes improve real-world energy."
      },
      {
        name: "Autonomic Balance (HRV)",
        why: "Higher HRV suggests better stress recovery and parasympathetic tone."
      }
    ],
    dataSources: [
      "Wearable sleep tracking (duration + awakenings)",
      "Morning subjective check-in (1–10)",
      "Caffeine timing log (yes/no compliance)"
    ],
    compliance: 92,
    missedCutoff: 1,
    flaggedNotes: 2,
    trends: [
      { metric: "Sleep latency", change: "↓ 18%", color: "green" },
      { metric: "Night awakenings", change: "↓ 1.2/night", color: "green" },
      { metric: "HRV (7-day avg)", change: "↑ 9%", color: "green" },
      { metric: "Afternoon crash severity", change: "↓", color: "green" }
    ],
    investigatorNote: "Sleep improved by day 4. Mild morning grogginess initially. No increase in anxiety."
  }
};

const blueprintGroups = [
  {
    category: "Sleep & Circadian",
    items: [
      { id: "sleep-toolkit", name: "Sleep Toolkit" },
      { id: "caffeine-timing", name: "Caffeine Timing Blueprint" },
      { id: "sleep-temperature", name: "Sleep Temperature Protocol" },
      { id: "light-protocol", name: "Morning & Evening Light Protocol" }
    ]
  },
  {
    category: "Fitness & Cardiovascular",
    items: [
      { id: "foundational-fitness", name: "Foundational Fitness Protocol" },
      { id: "zone2-endurance", name: "Zone 2 Endurance Protocol" },
      { id: "hiit-protocol", name: "HIIT Heart-Rate Protocol" },
      { id: "resistance-periodization", name: "Resistance Periodization Blueprint" }
    ]
  },
  {
    category: "Stress & Focus",
    items: [
      { id: "nsdr", name: "NSDR / Yoga Nidra" },
      { id: "stress-control", name: "Stress Control & Physiological Sigh" },
      { id: "focus-toolkit", name: "Focus Toolkit" },
      { id: "meditation", name: "Short Meditation for Refocusing" }
    ]
  },
  {
    category: "Metabolic & Nutrition",
    items: [
      { id: "tre", name: "Time-Restricted Eating" },
      { id: "soleus", name: "Soleus Push-Up Protocol" },
      { id: "nutrition", name: "Foundational Nutrition Blueprint" }
    ]
  }
];

export default function ExperimentsDashboardPage() {
  const [selectedBlueprint, setSelectedBlueprint] = useState("caffeine-timing");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentBlueprint = blueprints[selectedBlueprint as keyof typeof blueprints] || blueprints["caffeine-timing"];

  // Find current blueprint display name
  const getBlueprintName = (id: string) => {
    for (const group of blueprintGroups) {
      const item = group.items.find(item => item.id === id);
      if (item) return item.name;
    }
    return "Active Blueprint";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="dashboard-container relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section - Active Self-Experiment Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <h1 className="dashboard-h1 mb-0">Active Self-Experiment</h1>
                {/* Blueprint Selector Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-[#0f0f0f]/60 text-sm text-white hover:border-[#6FFFC3]/20 transition-all"
                  >
                    {getBlueprintName(selectedBlueprint)} <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-80 rounded-lg border border-white/10 bg-[#0f0f0f] shadow-xl z-50 max-h-96 overflow-y-auto">
                      {blueprintGroups.map((group, groupIdx) => (
                        <div key={groupIdx} className="border-b border-white/5 last:border-b-0">
                          <div className="px-4 py-2 text-xs font-semibold text-[#A3B3AA] uppercase tracking-wider bg-[#0a0a0a]">
                            {group.category}
                          </div>
                          {group.items.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => {
                                setSelectedBlueprint(item.id);
                                setIsDropdownOpen(false);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/5 transition-colors"
                            >
                              {item.name}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <p className="dashboard-description text-base max-w-2xl">
                Personalized protocol testing with real-world physiological signals.
              </p>
            </div>
            
            {/* Right-side meta */}
            <div className="flex flex-col gap-2 text-sm">
              <div className="text-[#A3B3AA]">
                <span className="text-[#8A938E]">Blueprint:</span> {currentBlueprint.name}
              </div>
              <div className="text-[#A3B3AA]">
                <span className="text-[#8A938E]">Phase:</span> {currentBlueprint.phase} (Day {currentBlueprint.day} of {currentBlueprint.totalDays})
              </div>
              <div className="text-[#A3B3AA]">
                <span className="text-[#8A938E]">Data Completeness:</span> {currentBlueprint.dataCompleteness}%
              </div>
              <div className="text-[#A3B3AA]">
                <span className="text-[#8A938E]">Evidence Confidence:</span> {currentBlueprint.evidenceConfidence} {currentBlueprint.confidenceTrend}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Active Blueprint - 6 Card Grid */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <GlowCard delay={0}>
            <div className="space-y-6">
              <div>
                <h2 className="dashboard-h2 mb-2">Active Blueprint</h2>
                <p className="dashboard-description text-sm">
                  Structured protocol testing with real-world physiological signals.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Card 1 - Blueprint Overview */}
                <motion.div
                  className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                    Blueprint Overview
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-white font-medium mb-1">{currentBlueprint.name}</div>
                    </div>
                    <div>
                      <div className="text-[#A3B3AA] mb-1"><span className="text-[#8A938E]">Clinical intent:</span></div>
                      <div className="text-[#A3B3AA]">{currentBlueprint.clinicalIntent}</div>
                    </div>
                    <div>
                      <div className="text-[#A3B3AA] mb-1"><span className="text-[#8A938E]">Duration:</span></div>
                      <div className="text-[#A3B3AA]">{currentBlueprint.duration}</div>
                    </div>
                    <div>
                      <div className="text-[#A3B3AA] mb-1"><span className="text-[#8A938E]">Intervention:</span></div>
                      <ul className="space-y-1 mt-1">
                        {currentBlueprint.intervention.map((item, idx) => (
                          <li key={idx} className="text-[#A3B3AA] flex items-start gap-2">
                            <span className="text-[#6FFFC3]">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[#A3B3AA] mb-1"><span className="text-[#8A938E]">Expected adaptation window:</span></div>
                      <div className="text-[#A3B3AA]">{currentBlueprint.expectedAdaptation}</div>
                    </div>
                  </div>
                </motion.div>

                {/* Card 2 - Signals Being Measured */}
                <motion.div
                  className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                    Signals Being Measured
                  </h3>
                  <div className="space-y-4">
                    {currentBlueprint.signals.map((signal, idx) => (
                      <div key={idx} className="border-b border-white/5 last:border-b-0 pb-3 last:pb-0">
                        <div className="text-sm font-medium text-white mb-1">{signal.name}</div>
                        <div className="text-xs text-[#8A938E]">
                          <span className="text-[#A3B3AA]">Why it matters:</span> {signal.why}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Card 3 - Data Sources */}
                <motion.div
                  className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                >
                  <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                    Data Sources
                  </h3>
                  <div className="space-y-2">
                    {currentBlueprint.dataSources.map((source, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">•</span>
                        <span>{source}</span>
                      </div>
                    ))}
                    <div className="mt-3 pt-3 border-t border-white/5">
                      <div className="text-xs text-[#6FFFC3] flex items-center gap-2">
                        <span>Status: Connected</span>
                        <span className="text-green-400">✓</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Card 4 - Compliance & Adherence */}
                <motion.div
                  className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                    Compliance & Adherence
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-[#A3B3AA] mb-1">
                        <span className="text-[#8A938E]">Protocol adherence:</span> {currentBlueprint.compliance}%
                      </div>
                    </div>
                    <div>
                      <div className="text-[#A3B3AA] mb-1">
                        <span className="text-[#8A938E]">Missed caffeine cutoff:</span> {currentBlueprint.missedCutoff} day
                      </div>
                    </div>
                    <div>
                      <div className="text-[#A3B3AA]">
                        <span className="text-[#8A938E]">Notes flagged:</span> {currentBlueprint.flaggedNotes}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Card 5 - Early Signal Trends */}
                <motion.div
                  className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 }}
                >
                  <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                    Early Signal Trends
                  </h3>
                  <div className="space-y-3 text-sm">
                    {currentBlueprint.trends.map((trend, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-[#A3B3AA]">{trend.metric}:</span>
                        <span className={`font-medium ${trend.color === 'green' ? 'text-green-400' : 'text-red-400'}`}>
                          {trend.change}
                        </span>
                      </div>
                    ))}
                    <div className="mt-3 pt-3 border-t border-white/5">
                      <div className="text-xs text-[#8A938E] italic">
                        Signals emerging — not yet conclusive
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Card 6 - Investigator Notes (Editable) */}
                <motion.div
                  className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                    Investigator Notes
                  </h3>
                  <textarea
                    defaultValue={currentBlueprint.investigatorNote}
                    className="w-full h-32 px-3 py-2 rounded-lg bg-[#0a0a0a] border border-white/10 text-sm text-white placeholder-[#8A938E] focus:outline-none focus:border-[#6FFFC3]/30 resize-none"
                    placeholder="Add your observations here..."
                  />
                </motion.div>
              </div>
            </div>
          </GlowCard>
        </motion.section>

        {/* Adjunct Protocols Section - Reuse SupplementProtocol with modified data */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlowCard delay={0.25}>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="dashboard-h2">Adjunct Protocols (Held Constant During Experiment)</h3>
                <p className="dashboard-description text-sm">
                  These variables are held constant to isolate causal effects.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 dashboard-label text-xs">Supplement</th>
                      <th className="text-left py-3 px-4 dashboard-label text-xs">Dose</th>
                      <th className="text-left py-3 px-4 dashboard-label text-xs">Timing</th>
                      <th className="text-left py-3 px-4 dashboard-label text-xs">Purpose</th>
                      <th className="text-left py-3 px-4 dashboard-label text-xs">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <motion.tr
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                          <span className="text-sm font-semibold text-white">Magnesium glycinate</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-[#A3B3AA]">400 mg</td>
                      <td className="py-4 px-4 text-sm text-[#A3B3AA]">Evening</td>
                      <td className="py-4 px-4 text-sm text-[#A3B3AA]">Sleep support</td>
                      <td className="py-4 px-4 text-sm text-green-400">Stable</td>
                    </motion.tr>
                    <motion.tr
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.35 }}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                          <span className="text-sm font-semibold text-white">Omega-3</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-[#A3B3AA]">2 g</td>
                      <td className="py-4 px-4 text-sm text-[#A3B3AA]">With meals</td>
                      <td className="py-4 px-4 text-sm text-[#A3B3AA]">Inflammation control</td>
                      <td className="py-4 px-4 text-sm text-green-400">Stable</td>
                    </motion.tr>
                  </tbody>
                </table>
              </div>
            </div>
          </GlowCard>
        </motion.section>

        {/* Risk-Focused Micro-Plans - Reuse with modified data */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GlowCard delay={0.35}>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="dashboard-h2">Risk-Focused Micro-Plans</h3>
                <p className="dashboard-description text-sm">
                  Adaptive intelligence that activates when specific risk thresholds are met.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-[#6FFFC3]/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                    <h4 className="text-base font-semibold text-white">Sleep Disruption Risk</h4>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h5 className="text-xs font-semibold text-[#A3B3AA] mb-2 uppercase tracking-wider">
                        Trigger
                      </h5>
                      <p className="text-sm text-[#A3B3AA]">Sleep efficiency &lt;85% for 3 consecutive nights</p>
                    </div>

                    <div className="pt-3 border-t border-white/5">
                      <h5 className="text-xs font-semibold text-[#A3B3AA] mb-2 uppercase tracking-wider">
                        Auto-Activated Actions
                      </h5>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                          <span className="text-[#6FFFC3]">•</span>
                          <span>Advance caffeine cutoff by 60 min</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                          <span className="text-[#6FFFC3]">•</span>
                          <span>Add 10 min NSDR post-lunch</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                          <span className="text-[#6FFFC3]">•</span>
                          <span>Evening light dimming protocol</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-white/5">
                      <h5 className="text-xs font-semibold text-[#A3B3AA] mb-1 uppercase tracking-wider">
                        Expected Benefit
                      </h5>
                      <p className="text-sm text-[#A3B3AA]">Stabilize sleep architecture and reduce sleep debt accumulation.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </GlowCard>
        </motion.section>

        {/* Red Flags & Action Thresholds - Reuse with modified data */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlowCard delay={0.5}>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="dashboard-h2">Red Flags & Action Thresholds</h3>
                <p className="dashboard-description text-sm">
                  Clear guidelines for when to monitor, retest, or seek medical attention based on signal changes.
                </p>
              </div>

              <div className="space-y-6">
                <motion.div
                  className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                >
                  <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
                    Autonomic Stress Load
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="text-xs font-semibold text-[#A3B3AA] mb-2 uppercase tracking-wider">
                        When to Monitor
                      </h5>
                      <ul className="space-y-1.5">
                        <li className="text-xs text-[#8A938E]">• HRV ↓ &gt;20% from baseline for 5 days</li>
                        <li className="text-xs text-[#8A938E]">• Resting HR ↑ &gt;10 bpm from baseline</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-xs font-semibold text-[#A3B3AA] mb-2 uppercase tracking-wider">
                        When to Retest
                      </h5>
                      <p className="text-xs text-[#8A938E]">After 7–10 days of protocol adjustment</p>
                    </div>

                    <div>
                      <h5 className="text-xs font-semibold text-red-400/80 mb-2 uppercase tracking-wider">
                        When to Seek Review
                      </h5>
                      <p className="text-xs text-[#8A938E]">Persistent fatigue, palpitations, or sleep fragmentation</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </GlowCard>
        </motion.section>
      </div>
    </div>
  );
}

