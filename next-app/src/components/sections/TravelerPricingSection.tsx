"use client";

import Link from "next/link";
import React, { useId } from "react";
import { motion } from "framer-motion";

const CheckIcon = () => {
  const gradientId = useId();
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
      style={{
        filter: "drop-shadow(0 0 6px rgba(20,241,149,0.3))",
      }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14F195" />
          <stop offset="100%" stopColor="#7CFFB2" />
        </linearGradient>
      </defs>
      <path
        d="M20 6L9 17L4 12"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={`url(#${gradientId})`}
      />
    </svg>
  );
};

const cards = [
  {
    title: "Business Starter",
    description: "For professionals who want clarity and a performance-ready health baseline.",
    price: "119 EUR",
    period: "6 months",
    features: [
      "Executive health baseline & core biomarkers",
      "Stress, sleep & metabolic stability overview",
      "Early-risk detection & health-history reconstruction",
      "Personal medical file you can access anywhere",
    ],
    ctaLabel: "Choose plan",
    ctaHref: "/checkout/traveller-starter",
  },
  {
    title: "Business Performance",
    description: "For high performers who want guidance, accountability, and measurable improvement.",
    price: "249 EUR",
    period: "6 months",
    features: [
      "Everything in Starter",
      "1:1 performance-health review session",
      "Monthly biomarker-guided routine resets",
      "Focus, energy & recovery optimisation protocols",
      "Workload-adaptive stress-management sequences",
    ],
    ctaLabel: "Start with free screening",
    ctaHref: "/free-screening",
    badge: "Most Popular",
  },
  {
    title: "Business Care",
    description: "For professionals who want medically-supervised optimisation and long-term resilience.",
    price: "499 EUR",
    period: "6 months",
    features: [
      "Everything in Business Performance",
      "Clinician-supervised improvement pathway",
      "Medical consultations tailored to workload cycles",
      "Continuous risk monitoring & early-detection alerts",
      "Executive-level health strategy & long-term resilience planning",
    ],
    ctaLabel: "Join waitlist",
    ctaHref: "/waitlist/traveller-care",
  },
];

export function TravelerPricingSection() {
  return (
    <section className="relative w-full bg-black py-36 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.05), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-semibold text-white">Business Plans</h2>
          <p className="text-lg md:text-xl text-neutral-300">
            Longevity-driven healthcare designed for people who perform at the highest level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-[32px] p-8 flex flex-col justify-between gap-8 text-left bg-[#060606]/90
                border border-white/5 text-white md:min-h-[560px]
                shadow-[inset_0_0_22px_rgba(0,255,180,0.015),0_6px_16px_rgba(0,0,0,0.45)]
                ${card.badge ? "lg:shadow-[inset_0_0_28px_rgba(0,255,180,0.03),0_16px_34px_rgba(0,0,0,0.5)]" : ""}`}
              style={{
                backdropFilter: "blur(10px)",
              }}
            >
              {card.badge && (
                <span className="self-center px-3 py-1 text-xs font-semibold tracking-wide text-black bg-emerald-200/80 rounded-full shadow-md shadow-emerald-200/20">
                  {card.badge}
                </span>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold tracking-tight">{card.title}</h3>
                  <p className="text-sm text-neutral-300 leading-relaxed font-light">{card.description}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">{card.price}</span>
                    <span className="text-base text-neutral-400 font-light">/ {card.period}</span>
                  </div>
                  <div className="h-px w-full bg-white/10" />
                </div>
              </div>

              <div className="space-y-4 text-neutral-300">
                {card.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                  >
                    <CheckIcon />
                    <p>{feature}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-center">
                <Link href={card.ctaHref} className="premium-button w-full md:w-auto text-center">
                  {card.ctaLabel}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

