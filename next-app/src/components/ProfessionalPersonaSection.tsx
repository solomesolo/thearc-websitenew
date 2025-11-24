"use client";

import { motion } from "framer-motion";

export default function ProfessionalPersonaSection() {
  return (
    <section className="relative w-full py-32 md:py-40 bg-gradient-to-b from-transparent via-white/5 to-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_55%)] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="uppercase text-white/60 tracking-[0.25em] text-sm mb-6">
            Busy Professionals
          </p>
          <h2 className="text-4xl md:text-6xl font-semibold leading-tight text-white mb-6">
            Performance Under Pressure
          </h2>
          <p className="text-xl md:text-2xl text-white/80 italic leading-relaxed mb-10">
            High performance demands biological stability.
          </p>
          <div className="space-y-5 text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
            <p>
              Sustained cognitive and emotional pressure elevates baseline stress physiology. Patterns indicate reduced recovery capacity across the workweek.
            </p>
            <p>
              Irregular routines impact sleep depth and circadian rhythm stability. Signs of mild fatigue accumulation affect clarity and focus.
            </p>
            <p className="text-white font-medium">
              Early markers of systemic inflammation may emerge under chronic workload.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

