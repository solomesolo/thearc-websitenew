"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArcButton } from "./ui/ArcButton";

interface StepItem {
  number: string;
  title: string;
  text: string;
}

interface HowItWorksSectionProps {
  title?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  steps?: StepItem[];
}

const defaultSteps: StepItem[] = [
  {
    number: "01",
    title: "Start the free screening",
    text: "A three-minute clinical screening that begins interpreting your biological patterns immediately — no jargon required.",
  },
  {
    number: "02",
    title: "Build your Health Graph",
    text: "ARC constructs your predisposition map, risk radar, priority areas, and precision screening plan from your inputs and optional data.",
  },
  {
    number: "03",
    title: "See your biological drivers",
    text: "ARC reveals what’s drifting, what’s stable, and which systems need attention — with clear, simple explanations.",
  },
  {
    number: "04",
    title: "Receive your monthly strategy",
    text: "Your plan updates automatically based on new data, patterns, and lifestyle changes. Small actions, high precision.",
  },
  {
    number: "05",
    title: "Detect early drift",
    text: "ARC catches biological shifts long before symptoms appear — your personal early-warning system.",
  },
  {
    number: "06",
    title: "Get precision screening guidance",
    text: "ARC tells you exactly which tests matter, when they matter, and why — zero guesswork.",
  },
  {
    number: "07",
    title: "Use the global marketplace",
    text: "Access vetted labs, diagnostics, at-home tests, partners, and services curated for preventive health.",
  },
  {
    number: "08",
    title: "Build real resilience",
    text: "ARC teaches stress patterns, inflammation mapping, metabolic stability, and data interpretation.",
  },
  {
    number: "09",
    title: "Join the community",
    text: "Live Q&A, expert sessions, offline events, and soon access to the world’s largest preventive health dataset.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HowItWorksSection({
  title = "How ARC Works",
  description = "A simple, intelligent operating system for your biology.",
  ctaHref = "/free-screening",
  ctaLabel = "Start free screening",
  steps = defaultSteps,
}: HowItWorksSectionProps) {
  return (
    <section id="how-it-works" className="w-full bg-black text-white py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Operating System</p>
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight">{title}</h2>
          <p className="text-base md:text-lg text-white/70 leading-relaxed">{description}</p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={cardVariants}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0C0C0C] via-[#111] to-[#0A0A0A] p-8 shadow-[0_28px_70px_rgba(0,0,0,0.35)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.45)] transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#61F2C8] to-[#34D8A5] text-black font-semibold text-lg shadow-[0_0_18px_rgba(79,242,200,0.4)] mb-6">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-sm text-white/80 leading-relaxed">{step.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center pt-6">
          <ArcButton href={ctaHref}>{ctaLabel}</ArcButton>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
