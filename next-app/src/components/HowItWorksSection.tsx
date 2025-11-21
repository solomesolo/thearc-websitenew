"use client";

import React from "react";
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

export function HowItWorksSection({
  title = "How It Works",
  description = "Placeholder paragraph describing this simple, science-driven process tailored for this persona.",
  ctaHref = "/free-screening",
  ctaLabel = "Start free screening",
  steps = defaultSteps,
}: HowItWorksSectionProps) {
  const animationDelays = ["0.1s", "0.2s", "0.3s", "0.4s"];

  return (
    <section className="w-full bg-black text-white py-36">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-center">{title}</h2>
        <p className="text-lg md:text-xl text-gray-300 text-center max-w-2xl mt-10">
          {description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-20 w-full mt-20">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center animate-fade-up"
              style={{ animationDelay: animationDelays[index] }}
            >
              <div 
                className="text-[3.8rem] font-extrabold leading-none tracking-[-0.5px] opacity-90 filter drop-shadow-[0_0_14px_rgba(20,241,149,0.12)]"
                style={{
                  backgroundImage: "linear-gradient(135deg, #0ECF7A, #66FFC2)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                {step.number}
              </div>
              
              <div className="h-12 w-px mx-auto my-6 opacity-30 bg-gradient-to-b from-[#0ECF7A] to-[#66FFC2]"></div>
              
              <h3 className="text-xl font-semibold mt-4 mb-4">{step.title}</h3>
              <p className="text-sm opacity-80 leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center mt-10">
          <ArcButton href={ctaHref}>
            {ctaLabel}
          </ArcButton>
        </div>
      </div>
    </section>
  );
}

