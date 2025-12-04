"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { motion } from "framer-motion";
import { useState } from "react";

const travelProtocol = {
  preTravel: {
    title: "Pre-Travel Stabilisation",
    items: [
      "Gradually adjust sleep schedule 2-3 days before departure",
      "Optimize hydration (increase water intake)",
      "Support immune system (vitamin C, zinc, probiotics)",
      "Pack travel essentials (sleep mask, earplugs, supplements)",
    ],
  },
  duringTravel: {
    title: "During-Travel Plan",
    items: [
      "Hydration: Drink 250ml water every hour during flight",
      "Light exposure: Get natural light at destination time zone",
      "Movement: Walk every 1-2 hours, stretch in seat",
      "Sleep: Use sleep mask and earplugs, avoid alcohol",
      "Nutrition: Avoid heavy meals, prioritize protein and vegetables",
    ],
  },
  postTravel: {
    title: "Post-Travel Recovery",
    items: [
      "Immediate light exposure at destination wake time",
      "Avoid napping if arriving during day",
      "Melatonin (0.5-3mg) 30 min before desired sleep time (first 2-3 nights)",
      "Maintain destination schedule immediately",
      "Gentle movement and hydration priority",
    ],
  },
};

export function TravelProtocol() {
  const [activePhase, setActivePhase] = useState<keyof typeof travelProtocol>("preTravel");

  return (
    <GlowCard delay={0.45}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="dashboard-h2">Travel Protocol</h3>
          <p className="dashboard-description text-sm">
            A comprehensive plan to maintain biological stability during travel and minimize jet lag impact.
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          {Object.keys(travelProtocol).map((phase) => (
            <button
              key={phase}
              onClick={() => setActivePhase(phase as keyof typeof travelProtocol)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activePhase === phase
                  ? "bg-[#6FFFC3]/10 text-[#6FFFC3] border border-[#6FFFC3]/30"
                  : "bg-[#0f0f0f]/60 text-[#A3B3AA] border border-white/5 hover:border-white/10"
              }`}
            >
              {travelProtocol[phase as keyof typeof travelProtocol].title}
            </button>
          ))}
        </div>

        <motion.div
          key={activePhase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5"
        >
          <h4 className="text-base font-semibold text-white mb-4">
            {travelProtocol[activePhase].title}
          </h4>
          <ul className="space-y-3">
            {travelProtocol[activePhase].items.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                <span className="text-[#6FFFC3]">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </GlowCard>
  );
}

