"use client";

import React from "react";
import Link from "next/link";

interface StepItem {
  number: string;
  title: string;
  text: string;
  icon?: React.ReactNode;
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
    text: "Placeholder copy describing the quick screening that shows which essential tests you may be missing.",
  },
  {
    number: "02",
    title: "Full assessment",
    text: "Placeholder copy describing the validated questionnaire and how it maps strengths, risks, and lifestyle gaps.",
  },
  {
    number: "03",
    title: "Your 6-month plan",
    text: "Placeholder copy highlighting the personalized path including screenings, nutrition guidance, and routines.",
  },
  {
    number: "04",
    title: "Learn what works",
    text: "Placeholder copy describing the follow-up insights that show which interventions created the biggest gains.",
  },
];

const defaultIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-white/70">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m4 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export function HowItWorksSection({
  title = "How It Works",
  description = "Placeholder paragraph describing this simple, science-driven process tailored for this persona.",
  ctaHref = "/free-screening",
  ctaLabel = "Start free screening",
  steps = defaultSteps,
}: HowItWorksSectionProps) {
  return (
    <section className="w-full bg-black text-white py-36">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-center">{title}</h2>
        <p className="text-lg md:text-xl text-gray-300 text-center max-w-2xl mt-10">
          {description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 w-full mt-12">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-start bg-[#141414] p-8 rounded-2xl border border-white/10 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-2xl font-semibold mb-6">
                {step.number}
              </div>
              <div className="w-10 h-10 mb-6 opacity-80">
                {step.icon ?? defaultIcon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center mt-12">
          <Link
            href={ctaHref}
            className="px-10 py-4 bg-white text-black rounded-full text-lg font-semibold hover:bg-gray-200 transition"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

