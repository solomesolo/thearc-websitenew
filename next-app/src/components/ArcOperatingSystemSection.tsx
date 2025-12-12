"use client";

import { motion } from "framer-motion";
import { ArcButton } from "./ui/ArcButton";
import React from "react";

interface CapabilityItem {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const iconStroke = "#2EF0C2";

const bullets: CapabilityItem[] = [
  {
    title: "Unifies your health data",
    subtitle: "Across countries, clinics, labs, wearables, and diagnostic providers.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="1.5">
        <circle cx="8" cy="12" r="3" />
        <circle cx="16" cy="6" r="2.5" />
        <circle cx="18" cy="17" r="2" />
        <path d="M10.5 10.5l4-3" strokeLinecap="round" />
        <path d="M10.2 13.2l6 4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Interprets your biology",
    subtitle: "Using clinical logic, not generic advice or habit templates.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="1.5">
        <path d="M6 6h12" strokeLinecap="round" />
        <path d="M6 12h12" strokeLinecap="round" />
        <path d="M6 18h7" strokeLinecap="round" />
        <path d="M10 4v4" strokeLinecap="round" />
        <path d="M14 10v4" strokeLinecap="round" />
        <path d="M12 16v4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Detects early drift",
    subtitle: "Spotting subtle changes before symptoms begin.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="1.5">
        <path d="M4 14l4-5 3 4 4-6 5 8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 19h16" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Builds a personalised plan",
    subtitle: "That evolves every month based on your biomarkers, lifestyle, and risk profile.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="1.5">
        <rect x="4.5" y="4.5" width="15" height="15" rx="3" />
        <path d="M8 9h8" strokeLinecap="round" />
        <path d="M8 13h5" strokeLinecap="round" />
        <path d="M8 17h6.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Connects you to care",
    subtitle: "Through a growing global marketplace of vetted at-home and direct-to-consumer medical services.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="1.5">
        <path d="M12 4v16" strokeLinecap="round" />
        <path d="M4 12h16" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    title: "Learns continuously",
    subtitle: "From anonymised global patterns to improve precision for every user.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="1.5">
        <path d="M5 8c1.5-2 4-3 7-3s5.5 1 7 3" strokeLinecap="round" />
        <path d="M5 16c1.5 2 4 3 7 3s5.5-1 7-3" strokeLinecap="round" />
        <path d="M5 8v8" strokeLinecap="round" />
        <path d="M19 8v8" strokeLinecap="round" />
      </svg>
    ),
  },
];

const listVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: index * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function ArcOperatingSystemSection() {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(24,120,90,0.25),rgba(0,0,0,0.95))]" />
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-8 lg:px-10 py-24 md:py-32 lg:py-40 space-y-12">
        <div className="space-y-4 text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight" style={{ textAlign: 'center', width: '100%' }}>
            ARC is the operating system for your biology.
          </h2>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto" style={{ textAlign: 'center' }}>
            ARC gives you one intelligent layer that finally brings order, clarity, and continuity to your health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12 text-left">
          {bullets.map((item, index) => (
            <motion.div
              key={item.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={listVariants}
              className="flex items-start gap-4"
            >
              <div className="flex-shrink-0 mt-1">{item.icon}</div>
              <div className="space-y-2">
                <p className="text-xl font-semibold text-white leading-tight">{item.title}</p>
                <p className="text-base text-white/75 leading-relaxed">{item.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center text-center gap-7">
          <p className="text-lg md:text-xl text-gray-100 leading-relaxed max-w-3xl">
            This is the future of preventive medicine — delivered as software, not as a clinic.
          </p>

          <ArcButton href="#how-it-works">See How ARC Works →</ArcButton>
        </div>
      </div>
    </section>
  );
}

export default ArcOperatingSystemSection;

