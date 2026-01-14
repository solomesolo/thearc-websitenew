"use client";

import { motion } from "framer-motion";
import { ArcButton } from "./ui/ArcButton";

const textVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.65, ease: "easeOut" },
  }),
};

export default function RebuilderHero({ onCTAClick }: { onCTAClick?: () => void }) {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("/Health%20Rebuilders%20Hero.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "75% center",
          filter: "saturate(0.9) brightness(0.85)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.25),rgba(0,0,0,0.65))]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent backdrop-blur-[0.5px]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(0,0,0,0.35), transparent 60%), radial-gradient(circle at 85% 20%, rgba(0,0,0,0.25), transparent 55%)",
        }}
      />
      {/* Persona accent halo with consistent glow */}
      <div className="absolute inset-0 persona-portrait-halo -z-10" style={{ background: "radial-gradient(circle at 20% 30%, var(--persona-accent-soft) 0%, transparent 65%)" }} />
      {/* Additional persona glow layers for consistency */}
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{ background: "radial-gradient(circle at 50% 50%, var(--persona-accent-soft) 0%, transparent 70%)" }} />

      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-10 pt-32 md:pt-40 pb-28 min-h-[90vh] flex items-center">
        <div className="max-w-[650px] space-y-8">
          <motion.p
            className="text-[12px] tracking-[0.35em] uppercase persona-accent-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            custom={0}
            variants={textVariants}
          >
            Health Rebuilders
          </motion.p>

          <motion.h1
            className="text-[40px] md:text-[52px] lg:text-[60px] leading-tight tracking-tight font-semibold text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            custom={0.05}
            variants={textVariants}
          >
            Something feels off. You deserve clarity, not guesswork.
          </motion.h1>

          <motion.p
            className="text-white/80 italic text-xl leading-relaxed max-w-[540px] mb-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            custom={0.15}
            variants={textVariants}
          >
            Lingering symptoms, low energy, weight changes, stress cycles, or brain fog aren't random — they're biological signals.
            But most people are told their labs are "normal," their symptoms are "stress," and their concerns will "resolve on their own."
          </motion.p>

          <motion.div
            className="space-y-5 text-white/80 text-lg leading-relaxed max-w-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            custom={0.25}
            variants={textVariants}
          >
            <p className="text-white font-medium">
              You're not imagining it. Your body is trying to tell you something.
            </p>
            <p>
              We help you understand what's happening inside your biology — and give you a clear, structured path to rebuild stability, energy, and confidence.
            </p>
            <p>
              Because feeling like yourself again shouldn't be a mystery.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            custom={0.35}
            variants={textVariants}
          >
            <ArcButton href={onCTAClick ? undefined : "/free-screening"} onClick={onCTAClick}>
              Start free screening
            </ArcButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
