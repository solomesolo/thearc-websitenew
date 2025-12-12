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
    title: "Global Baseline",
    description: "For people who move often and want a clear, travel-ready health foundation.",
    price: "119 EUR",
    period: "6 months",
    features: [
      "Global biology baseline & core biomarkers",
      "Sleep, circadian & recovery impact from travel",
      "Immunity, digestion & stress stability overview",
      "Reconstruction of scattered medical history from different countries",
      "Portable medical file you can share with any doctor, anywhere",
    ],
    ctaLabel: "Choose plan",
    ctaHref: "/checkout/traveller-starter",
  },
  {
    title: "Global Stability",
    description: "For frequent travellers and nomads who want ongoing guidance and stability.",
    price: "249 EUR",
    period: "6 months",
    features: [
      "Everything in Global Baseline",
      "1:1 travel-health strategy session",
      "Monthly biomarker-guided reset blocks around major trips",
      "Jet lag, energy & digestion optimisation protocols",
      "Risk monitoring for frequent flying, time-zone shifts and workload",
    ],
    ctaLabel: "Start with free screening",
    ctaHref: "/free-screening",
    badge: "Most Popular",
  },
  {
    title: "Global Care",
    description: "For global movers who want medically supervised continuity and long-term protection.",
    price: "499 EUR",
    period: "6 months",
    features: [
      "Everything in Global Stability",
      "Clinician-supervised improvement pathway tailored to your travel pattern",
      "Medical consultations focused on mobility-related risks and symptoms",
      "Ongoing interpretation of international lab results & reports",
      "Cross-border risk management, referrals and long-term longevity planning",
    ],
    ctaLabel: "Join waitlist",
    ctaHref: "/waitlist/traveller-care",
  },
];

export function TravelerPricingSection() {
  return (
    <section className="relative w-full py-20 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-semibold text-white">Global Mover Plans</h2>
          <p className="text-lg md:text-xl text-neutral-300">
            Longevity-driven healthcare designed for people who live and work across borders.
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
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {card.title}
                    {card.badge && (
                      <small className="text-sm font-normal text-neutral-400 ml-2">(Most Popular)</small>
                    )}
                  </h3>
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

