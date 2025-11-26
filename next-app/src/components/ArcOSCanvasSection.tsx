"use client";

import { motion } from "framer-motion";
import React from "react";

const layers = [
  {
    title: "Intake Layer — ARC Learns You",
    headline: "ARC interprets your biology from the first interaction.",
    bullets: [
      "3-minute screening",
      "Predisposition mapping",
      "Early pattern recognition",
      "No jargon, no friction",
      "The first version of your ‘health fingerprint’",
    ],
    subheading: "This is your biological entry point.",
  },
  {
    title: "Intelligence Layer — ARC Builds Your Health Graph",
    headline: "ARC constructs a dynamic model of your biology using:",
    bullets: [
      "your inputs",
      "optional lab work",
      "wearables",
      "health history",
      "environmental signals",
      "health graph + risk radar",
      "biological drivers",
      "long-term predisposition map",
      "precision screening plan",
    ],
    subheading: "This is the intelligence core of your HealthOS.",
  },
  {
    title: "Strategy Engine — ARC Generates Your Adaptive Plan",
    headline: "ARC transforms your biological model into clear monthly guidance:",
    bullets: [
      "what’s drifting",
      "what’s improving",
      "what to test",
      "what to change",
      "what to monitor",
      "what matters, what doesn’t",
    ],
    subheading: "This is your adaptive preventive engine.",
  },
  {
    title: "Ecosystem Layer — ARC Connects You to Real Solutions",
    headline: "Your OS connects directly to the world around you:",
    bullets: [
      "at-home tests & diagnostics",
      "local screenings",
      "specialists",
      "labs",
      "vetted partner services",
      "ongoing community + live Q&A",
      "offline events",
      "(soon) anonymized global dataset insights",
    ],
    subheading: "This is health infrastructure — unified for the first time.",
  },
];

const layerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const listVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.06, duration: 0.35, ease: "easeOut" },
  }),
};

const MintPulse = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#57E7C3" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
    <circle cx="12" cy="12" r="9" strokeOpacity="0.6" />
    <path d="M8 12h2l1.5-3 2 6 1.5-3H16" />
  </svg>
);

export function ArcOSCanvasSection() {
  return (
    <section className="relative bg-[#010203] text-white py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,120,100,0.25),rgba(0,0,0,0.95))]" />
      <div className="absolute left-1/2 top-16 bottom-16 w-px bg-gradient-to-b from-transparent via-[#2ce0b3]/40 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-20">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm uppercase tracking-[0.35em] text-white/60">ARC HealthOS Layers</p>
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight max-w-4xl mx-auto">
            ARC doesn’t give you another dashboard. It gives you a four-tier biological intelligence system.
          </h2>
        </motion.div>

        <div className="space-y-14">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.title}
              className="relative rounded-[28px] border border-white/10 bg-gradient-to-br from-white/5 via-white/3 to-transparent backdrop-blur-xl px-8 md:px-12 py-10 shadow-[0_50px_120px_rgba(0,0,0,0.35)]"
              style={{ transform: `translateY(${(layers.length - index - 1) * 6}px)` }}
              variants={layerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <div className="absolute inset-y-6 left-0 w-[3px] rounded-full bg-gradient-to-b from-[#62F4C8] to-[#2AD79B] shadow-[0_0_25px_rgba(47,240,190,0.6)]" />
              <div className="flex flex-col gap-4 md:gap-5">
                <p className="text-sm uppercase tracking-[0.25em] text-[#66F4CA]/80">{layer.title}</p>
                <h3 className="text-2xl md:text-3xl font-semibold leading-snug">{layer.headline}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white/80">
                  {layer.bullets.map((bullet, bulletIndex) => (
                    <motion.div
                      key={bullet}
                      className="flex items-start gap-3"
                      custom={bulletIndex}
                      variants={listVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.4 }}
                    >
                      <MintPulse />
                      <p className="leading-relaxed text-sm md:text-base">{bullet}</p>
                    </motion.div>
                  ))}
                </div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">{layer.subheading}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-xl md:text-2xl font-semibold text-white/90 pt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block">You get what no doctor, app, or clinic can give you:</span>
          <span className="block text-[#63F3C9] mt-2">One brain for your entire health.</span>
        </motion.p>
      </div>
    </section>
  );
}

export default ArcOSCanvasSection;
