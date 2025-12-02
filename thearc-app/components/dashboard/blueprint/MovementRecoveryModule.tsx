"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { motion } from "framer-motion";
import { useState } from "react";

interface Protocol {
  name: string;
  category: "breathing" | "recovery" | "movement";
  description: string;
  steps: string[];
  duration: string;
  frequency: string;
}

const protocols: Protocol[] = [
  {
    name: "Box Breathing",
    category: "breathing",
    description: "A simple technique to activate the parasympathetic nervous system and reduce stress.",
    steps: [
      "Inhale through your nose for 4 counts",
      "Hold your breath for 4 counts",
      "Exhale through your mouth for 4 counts",
      "Hold at the bottom for 4 counts",
      "Repeat for 4-8 cycles",
    ],
    duration: "5-10 minutes",
    frequency: "2-3x daily, especially during stress",
  },
  {
    name: "4-7-8 Breathing",
    category: "breathing",
    description: "Promotes relaxation and can help with sleep onset.",
    steps: [
      "Inhale through your nose for 4 counts",
      "Hold your breath for 7 counts",
      "Exhale through your mouth for 8 counts",
      "Repeat 4-8 times",
    ],
    duration: "5 minutes",
    frequency: "Before bed, during stress",
  },
  {
    name: "Cold Exposure Protocol",
    category: "recovery",
    description: "Gradual cold exposure to improve recovery and resilience.",
    steps: [
      "Start with 30 seconds of cold water at end of shower",
      "Gradually increase to 2-3 minutes",
      "Focus on controlled breathing throughout",
      "Warm up naturally after",
    ],
    duration: "2-3 minutes",
    frequency: "Daily or every other day",
  },
  {
    name: "Active Recovery Movement",
    category: "movement",
    description: "Low-intensity movement to support recovery and mobility.",
    steps: [
      "10 minutes of gentle walking or stretching",
      "Focus on full range of motion",
      "Include hip circles, shoulder rolls, spinal twists",
      "End with 2-3 minutes of deep breathing",
    ],
    duration: "10-15 minutes",
    frequency: "Daily, especially on rest days",
  },
  {
    name: "Vagus Nerve Stimulation",
    category: "recovery",
    description: "Techniques to activate the vagus nerve for better recovery.",
    steps: [
      "Humming or singing (5 minutes)",
      "Gargling with water",
      "Cold water on face",
      "Meditation or mindfulness",
    ],
    duration: "10-15 minutes",
    frequency: "Daily, morning or evening",
  },
];

export function MovementRecoveryModule() {
  const [expandedProtocol, setExpandedProtocol] = useState<string | null>(null);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "breathing":
        return "bg-[#6FFFC3]/10 text-[#6FFFC3] border-[#6FFFC3]/20";
      case "recovery":
        return "bg-[#4AF7A3]/10 text-[#4AF7A3] border-[#4AF7A3]/20";
      case "movement":
        return "bg-[#8A938E]/10 text-[#8A938E] border-[#8A938E]/20";
      default:
        return "bg-white/5 text-white border-white/10";
    }
  };

  return (
    <GlowCard delay={0.2}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="dashboard-h2">Movement & Recovery Protocols</h3>
          <p className="dashboard-description text-sm">
            Evidence-based breathing, recovery, and movement techniques to optimize performance and resilience.
          </p>
        </div>

        <div className="space-y-4">
          {protocols.map((protocol, index) => (
            <motion.div
              key={protocol.name}
              className="rounded-xl border border-white/5 bg-[#0f0f0f]/60 overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            >
              <button
                onClick={() => setExpandedProtocol(expandedProtocol === protocol.name ? null : protocol.name)}
                className="w-full p-4 text-left flex items-start justify-between gap-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-base font-semibold text-white">{protocol.name}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(protocol.category)}`}>
                      {protocol.category}
                    </span>
                  </div>
                  <p className="dashboard-description text-sm">{protocol.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-[#8A938E]">
                    <span>⏱ {protocol.duration}</span>
                    <span>🔄 {protocol.frequency}</span>
                  </div>
                </div>
                <span className="text-[#6FFFC3] text-xl">
                  {expandedProtocol === protocol.name ? "−" : "+"}
                </span>
              </button>

              {expandedProtocol === protocol.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-4 border-t border-white/5"
                >
                  <div className="pt-4 space-y-3">
                    <h5 className="text-sm font-semibold text-white">How to do it:</h5>
                    <ol className="space-y-2">
                      {protocol.steps.map((step, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                          <span className="text-[#6FFFC3] font-semibold">{idx + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}

