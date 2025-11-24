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
    title: "Free check",
    text: "An initial clinical screening that identifies which core health evaluations you may be missing. This step provides a clear understanding of your current position and highlights the early signals that often remain undetected.",
  },
  {
    number: "02",
    title: "Full assessment",
    text: "A comprehensive assessment built on validated health and lifestyle indicators. Your responses are analysed across major longevity domains including metabolic balance, inflammatory tendencies, stress physiology, sleep architecture, immune stability, and environmental load.",
  },
  {
    number: "03",
    title: "Your 6 month plan",
    text: "A personalised, clinician informed program designed to strengthen foundational systems of health. Each month introduces a focused sequence of interventions, lifestyle refinements, and recommended screenings that support measurable improvement without excess complexity.",
  },
  {
    number: "04",
    title: "Learn what works",
    text: "At the conclusion of the program, your data is reassessed to identify the areas of greatest positive change. You receive a clear clinical summary of what improved, what contributed most to your progress, and which next steps will support continued longevity.",
  },
];

export function HowItWorksSection({
  title = "How It Works",
  description = "Placeholder paragraph describing this simple, science-driven process tailored for this persona.",
  ctaHref = "/free-screening",
  ctaLabel = "Start free screening",
  steps = defaultSteps,
}: HowItWorksSectionProps) {
  return (
    <section className="how-it-works-premium w-full bg-black text-white py-[120px]">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 flex flex-col items-center">
        <motion.h2
          className="text-[48px] font-bold text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-white/70 text-center max-w-[640px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          {description}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 w-full mt-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="how-it-works-card"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: index * 0.12 
              }}
            >
              <div className="how-it-works-number-badge">
                <span className="how-it-works-number">{step.number}</span>
              </div>
              
              <div className="how-it-works-connector"></div>
              
              <h3 className="how-it-works-title">{step.title}</h3>
              <p className="how-it-works-text">{step.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="w-full flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        >
          <ArcButton href={ctaHref}>
            {ctaLabel}
          </ArcButton>
        </motion.div>
      </div>
    </section>
  );
}

