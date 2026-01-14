"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { motion } from "framer-motion";

interface Supplement {
  name: string;
  dose: string;
  timing: string;
  why: string;
  safetyNote?: string;
}

const supplements: Supplement[] = [
  {
    name: "Omega-3 (EPA/DHA)",
    dose: "2-3g daily",
    timing: "With meals",
    why: "Supports cardiovascular health, reduces inflammation, and supports cognitive function.",
    safetyNote: "May interact with blood thinners. Consult healthcare provider if on anticoagulants.",
  },
  {
    name: "Vitamin D3 + K2",
    dose: "2000-4000 IU D3, 100-200mcg K2",
    timing: "Morning with fat-containing meal",
    why: "Essential for bone health, immune function, and calcium metabolism. K2 ensures proper calcium utilization.",
  },
  {
    name: "Magnesium",
    dose: "400-600mg elemental",
    timing: "Evening, 1-2 hours before bed",
    why: "Supports sleep quality, muscle recovery, and stress response. Many people are deficient.",
  },
  {
    name: "Probiotics",
    dose: "10-50 billion CFU",
    timing: "Morning on empty stomach or with first meal",
    why: "Supports gut health, immune function, and nutrient absorption.",
  },
  {
    name: "CoQ10",
    dose: "100-200mg",
    timing: "With meals",
    why: "Supports cellular energy production and cardiovascular health. Especially important with age.",
  },
  {
    name: "B-Complex",
    dose: "As per label (B-50 or B-100)",
    timing: "Morning with food",
    why: "Supports energy metabolism, cognitive function, and stress response.",
  },
];

export function SupplementProtocol() {
  return (
    <GlowCard delay={0.25}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="dashboard-h2">Supplement Protocol</h3>
          <p className="dashboard-description text-sm">
            Evidence-based supplementation to support longevity, performance, and biological optimization.
            Always consult with a healthcare provider before starting new supplements.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 dashboard-label text-xs">Supplement</th>
                <th className="text-left py-3 px-4 dashboard-label text-xs">Dose</th>
                <th className="text-left py-3 px-4 dashboard-label text-xs">Timing</th>
                <th className="text-left py-3 px-4 dashboard-label text-xs">Why</th>
                <th className="text-left py-3 px-4 dashboard-label text-xs">Safety Note</th>
              </tr>
            </thead>
            <tbody>
              {supplements.map((supplement, index) => (
                <motion.tr
                  key={supplement.name}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                      <span className="text-sm font-semibold text-white">{supplement.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-[#A3B3AA]">{supplement.dose}</td>
                  <td className="py-4 px-4 text-sm text-[#A3B3AA]">{supplement.timing}</td>
                  <td className="py-4 px-4 text-sm text-[#A3B3AA] max-w-xs">{supplement.why}</td>
                  <td className="py-4 px-4 text-sm text-[#8A938E] max-w-xs">
                    {supplement.safetyNote || "—"}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </GlowCard>
  );
}

