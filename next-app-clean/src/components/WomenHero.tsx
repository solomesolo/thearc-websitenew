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

export default function WomenHero({ onCTAClick }: { onCTAClick?: () => void }) {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("/Menopause%20Header.webp")`,
          backgroundSize: "cover",
          backgroundPosition: "75% center",
          filter: "saturate(1.0) brightness(1.0)",
        }}
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/5 backdrop-blur-[0.5px]" />
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
            Women in Menopause
          </motion.p>

          <motion.h1
            className="text-[40px] md:text-[52px] lg:text-[60px] leading-tight tracking-tight font-semibold text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            custom={0.05}
            variants={textVariants}
          >
            Your body is changing. Your guidance shouldn't disappear.
          </motion.h1>

          <motion.p
            className="text-white/80 italic text-xl leading-relaxed max-w-[540px] mb-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            custom={0.15}
            variants={textVariants}
          >
            Perimenopause and menopause shift every system in your body — hormones, sleep, weight, mood, metabolism.
            Yet most women are told to "wait it out," "manage symptoms," or "come back when it gets worse."
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
              Your biology deserves clarity, not dismissal.
            </p>
            <p>
              We give you a personalised health blueprint that adapts as your hormones evolve — a system that explains what's changing, why it's changing, and what you can do about it.
            </p>
            <p>
              Because menopause shouldn't shrink your quality of life — it should start a stronger chapter.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            custom={0.35}
            variants={textVariants}
          >
            <ArcButton href={onCTAClick ? undefined : "/free-screening?persona=women"} onClick={onCTAClick}>
              Start free screening
            </ArcButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

