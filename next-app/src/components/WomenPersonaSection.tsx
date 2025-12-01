"use client";

import { motion } from "framer-motion";

export default function WomenPersonaSection() {
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
            Women in Menopause
          </p>
          <h2 className="text-4xl md:text-6xl font-semibold leading-tight text-white mb-6">
            Your Biology in Transition
          </h2>
          <p className="text-xl md:text-2xl text-white/80 italic leading-relaxed mb-10">
            Your life experience grows. Your energy shouldn't fade with it.
          </p>
          <div className="space-y-5 text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
            <p>
              Menopause affects hormones, sleep, cognition, inflammation, metabolism, cardiovascular risk, and emotional stability.
              Most women navigate it alone — without personalised data or clinical continuity.
            </p>
            <p className="text-white font-medium">
              You're not aging.
              You're undergoing the most significant hormonal recalibration since puberty.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

