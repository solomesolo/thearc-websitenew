"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { motion } from "framer-motion";

export function ConceptCard() {
  return (
    <GlowCard delay={0}>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="dashboard-h1 text-3xl mb-4">
            Modern health is noisy. ARC cuts through it.
          </h2>
          <p className="dashboard-description text-base leading-relaxed max-w-3xl">
            You're bombarded with conflicting advice, generic programs, and fragmented data. 
            ARC unifies everything into one intelligent system that detects risks early, adapts 
            to your life, and guides you with medical precision. Not an app. Not a program. 
            Your personal HealthOS.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="p-4 rounded-xl bg-[#0f0f0f]/60 border border-white/5">
            <h3 className="text-sm font-semibold text-white mb-2">Early Detection</h3>
            <p className="dashboard-description text-xs">
              Spot biological drift before symptoms appear
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#0f0f0f]/60 border border-white/5">
            <h3 className="text-sm font-semibold text-white mb-2">Adaptive Guidance</h3>
            <p className="dashboard-description text-xs">
              Your plan evolves with your biology and lifestyle
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#0f0f0f]/60 border border-white/5">
            <h3 className="text-sm font-semibold text-white mb-2">Medical Precision</h3>
            <p className="dashboard-description text-xs">
              Clinical logic, not generic templates
            </p>
          </div>
        </motion.div>
      </div>
    </GlowCard>
  );
}

