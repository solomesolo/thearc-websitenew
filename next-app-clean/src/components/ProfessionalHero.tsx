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

export default function ProfessionalHero({ onCTAClick }: { onCTAClick?: () => void }) {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("/header-explorer.png")`,
          backgroundSize: "cover",
          backgroundPosition: "75% center",
          filter: "saturate(0.9) brightness(0.85)",
        }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/15 backdrop-blur-[0.5px]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(0,0,0,0.35), transparent 60%), radial-gradient(circle at 85% 20%, rgba(0,0,0,0.25), transparent 55%)",
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-10 pt-32 md:pt-40 pb-28 min-h-[90vh] flex items-center">
        <div className="max-w-[650px] space-y-8">
          <motion.p
            className="text-[12px] tracking-[0.35em] uppercase text-white/55"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            custom={0}
            variants={textVariants}
          >
            Achiever Persona
          </motion.p>

          <motion.h1
            className="text-[40px] md:text-[52px] lg:text-[60px] leading-tight tracking-tight font-semibold text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            custom={0.05}
            variants={textVariants}
          >
            Your ambition is high. Your energy should match it.
          </motion.h1>

          <motion.p
            className="text-white/80 italic text-xl leading-relaxed max-w-[540px] mb-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            custom={0.15}
            variants={textVariants}
          >
            Long hours, cognitive load, and constant pressure strain the systems that keep you sharp.
          </motion.p>

          <motion.div
            className="space-y-5 text-white/80 text-lg leading-relaxed max-w-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            custom={0.25}
            variants={textVariants}
          >
            <p>
              The Arc reveals what your body needs to stay clear, focused, and resilient — without slowing your pace.
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

