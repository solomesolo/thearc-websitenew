"use client";

import { motion } from "framer-motion";

export default function TravelerPersonaSection() {
  return (
    <section className="w-full bg-black py-36">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-14">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-white/55">
            Travellers & Nomads
          </p>
          <h2 className="text-4xl md:text-[44px] font-semibold text-white leading-tight">
            Your Biology on the Move
          </h2>
          <p className="text-lg italic text-white/75 max-w-3xl leading-relaxed">
            You thrive in motion. But your biology depends on consistency.
          </p>
          <p className="text-white/75 text-base md:text-lg max-w-3xl leading-relaxed">
            You’re not just changing time zones. You’re changing healthcare systems, food quality, sleep environments,
            stressors, and public-health standards. The world moves with you — yet your care remains anchored to
            whichever country you left last. We understand that friction: <span className="font-semibold text-white">
              you’re globally free, but medically unanchored.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

