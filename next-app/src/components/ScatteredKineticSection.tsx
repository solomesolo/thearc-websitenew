"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import React from "react";

const lines = [
  "Your health is scattered.",
  "Fragments of data live in clinics, countries, apps, wearables.",
  "Signals go unread. Risks stay silent. Decisions fall back to guessing.",
  "Systems react only after symptoms appear.",
  "You feel the gaps long before anyone else does.",
];

const finalLine = "ARC changes that.";

export const ScatteredKineticSection: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const lineVariants = {
    hidden: {
      opacity: 0,
      y: 24,
      filter: "blur(8px)",
      letterSpacing: "0.08em",
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      letterSpacing: "0.01em",
      transition: {
        duration: 0.9,
        delay: index * 0.18,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 opacity-80 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,rgba(32,120,100,0.25),rgba(0,0,0,0.92))]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-8 lg:px-10 py-20 md:py-28 lg:py-36 text-center">
        <div ref={ref} className="space-y-5 md:space-y-6 leading-relaxed text-[#EAEAEA]/90 text-lg md:text-xl">
          {lines.map((text, index) => (
            <motion.p
              key={`${text}-${index}`}
              custom={index}
              variants={lineVariants}
              initial="hidden"
              animate={controls}
              className="font-light"
            >
              {text}
            </motion.p>
          ))}

          <motion.div
            variants={lineVariants}
            custom={lines.length}
            initial="hidden"
            animate={controls}
            className="relative inline-flex font-semibold text-[#F5F5F5]"
          >
            <span>{finalLine}</span>
            <motion.span
              className="absolute -bottom-2 left-0 h-[3px] bg-[#42E2B8] rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{
                duration: 0.4,
                delay: lines.length * 0.18 + 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScatteredKineticSection;

