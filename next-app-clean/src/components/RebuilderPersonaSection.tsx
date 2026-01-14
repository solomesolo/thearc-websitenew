"use client";

import { motion } from "framer-motion";

export default function RebuilderPersonaSection() {
  return (
    <section className="persona-section-fade py-20 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="uppercase persona-accent-text tracking-[0.25em] text-sm mb-6">
            Health Rebuilders
          </p>
          <h2 className="text-4xl md:text-6xl font-semibold leading-tight text-white mb-6">
            Your Biology Needs Direction
          </h2>
          <p className="text-xl md:text-2xl text-white/80 italic leading-relaxed mb-10">
            Your symptoms are real. But they're rarely explained.
          </p>
          <div className="space-y-5 text-lg text-white/70 leading-relaxed max-w-2xl mx-auto text-center">
            <p>
              Most people spend years navigating scattered advice, inconsistent lab results, and lifestyle changes that don't work because the underlying patterns were never found.
            </p>
            <p className="text-white font-medium">
              You're not "lazy" or "overreacting."
              You're trying to heal with incomplete information.
            </p>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
