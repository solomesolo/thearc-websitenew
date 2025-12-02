"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NextStepsCard() {
  return (
    <GlowCard delay={0.25}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="dashboard-h2">Next Steps</h3>
          <p className="dashboard-description text-sm">
            Continue your health journey with precision-guided actions.
          </p>
        </div>

        <div className="space-y-4">
          <motion.div
            className="p-4 rounded-xl bg-[#0f0f0f]/60 border border-white/5 hover:border-white/10 transition-colors"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-base font-semibold text-white mb-2">
              Complete Your First Screening
            </h4>
            <p className="dashboard-description text-sm mb-3">
              Schedule your recommended tests to establish your baseline and unlock personalized insights.
            </p>
            <Link
              href="/catalog"
              className="inline-block px-6 py-2.5 rounded-full bg-black border border-gray-600 text-[#6FFFC3] text-sm font-medium hover:border-[#6FFFC3] transition-colors"
            >
              Browse Screening Options →
            </Link>
          </motion.div>

          <motion.div
            className="p-4 rounded-xl bg-[#0f0f0f]/60 border border-white/5 hover:border-white/10 transition-colors"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <h4 className="text-base font-semibold text-white mb-2">
              Review Your Blueprint
            </h4>
            <p className="dashboard-description text-sm mb-3">
              Explore your complete health blueprint with detailed insights and recommendations.
            </p>
            <Link
              href="/blueprint"
              className="inline-block px-6 py-2.5 rounded-full bg-black border border-gray-600 text-[#6FFFC3] text-sm font-medium hover:border-[#6FFFC3] transition-colors"
            >
              View Full Blueprint →
            </Link>
          </motion.div>
        </div>
      </div>
    </GlowCard>
  );
}
