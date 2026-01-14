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

const XIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0 text-white/40"
  >
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const plans = [
  {
    id: "plan-access",
    color: "blue",
    title: "Plan Access Only",
    subtitle: "For people who just want the plans",
    pricing: {
      "6months": "€150",
      "12months": "€300"
    },
    included: [
      "Personalized health plan based on your goals",
      "Access to all health blueprints",
      "Ability to switch blueprints anytime",
      "Weekly check-ins",
      "Monthly plan updates",
      "Progress dashboard"
    ],
    notIncluded: [
      "No health capital allocation",
      "No bonuses",
      "No additional accountability layer"
    ],
    bestIf: "You want guidance but don't want to commit financially.",
    badge: null,
    ctaHref: "/checkout/plan-access"
  },
  {
    id: "6month-commitment",
    color: "yellow",
    title: "6-Month Health Commitment Plan",
    subtitle: "Put money behind your health — and get it back if you stay consistent",
    totalUpfront: "€320",
    breakdown: {
      healthCapital: "€200",
      programFee: "€120"
    },
    included: [
      "Health Capital allocation",
      "Your own money, held separately",
      "Returned at the end of the program",
      "Never used by the company",
      "Commitment-based accountability",
      "Daily 1-tap check-ins",
      "Weekly progress reflections",
      "Clear eligibility tracking",
      "Bonus eligibility",
      "Discounts on diagnostics and health services",
      "Partner credits",
      "Occasional cash bonuses",
      "Funded by medical and wellness partners",
      "Priority plan adjustments",
      "Faster blueprint changes",
      "Monthly optimization review",
      "Progress summary at program end",
      "Clear overview of habits, consistency, and improvements"
    ],
    bestIf: "You want real accountability and are willing to commit to yourself.",
    badge: "Most Popular",
    ctaHref: "/checkout/6month-commitment"
  },
  {
    id: "12month-commitment",
    color: "green",
    title: "12-Month Health Commitment Plan",
    subtitle: "Full commitment for long-term results",
    totalUpfront: "€800",
    breakdown: {
      healthCapital: "€500",
      programFee: "€300"
    },
    bonusEligibility: "Complete the program consistently and become eligible for up to €200 in bonuses.",
    included: [
      "Everything in the 6-Month Health Commitment Plan",
      "Longer-term plan evolution",
      "More blueprint cycles",
      "Higher bonus eligibility",
      "Best value over time"
    ],
    bestIf: "You want a full year of structure and are ready for long-term change.",
    badge: null,
    ctaHref: "/checkout/12month-commitment"
  }
];

interface UnifiedPricingSectionProps {
  onPlanClick?: () => void;
}

export function UnifiedPricingSection({ onPlanClick }: UnifiedPricingSectionProps = {}) {
  return (
    <section className="relative w-full py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl md:text-5xl font-semibold text-white">
            Choose How Much You Want to Commit to Your Health
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-lg md:text-xl text-white/80">
            <p>
              Most people don't fail because they lack information.
            </p>
            <p>
              They fail because there's no real commitment.
            </p>
            <p className="font-medium text-white">
              Pick the level that matches how seriously you want to treat your health.
            </p>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-[32px] p-8 flex flex-col gap-8 text-left bg-[#060606]/90
                border border-white/5 text-white
                shadow-[inset_0_0_22px_rgba(0,255,180,0.015),0_6px_16px_rgba(0,0,0,0.45)]
                ${plan.badge ? "lg:shadow-[inset_0_0_28px_rgba(0,255,180,0.03),0_16px_34px_rgba(0,0,0,0.5)] border-[#40e0c2]/20" : ""}`}
              style={{
                backdropFilter: "blur(10px)",
              }}
            >
              {plan.badge && (
                <span className="self-center px-3 py-1 text-xs font-semibold tracking-wide text-black bg-emerald-200/80 rounded-full shadow-md shadow-emerald-200/20">
                  {plan.badge}
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight mb-2">{plan.title}</h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">{plan.subtitle}</p>
                </div>

                {/* Pricing */}
                {plan.pricing ? (
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white">{plan.pricing["6months"]}</span>
                      <span className="text-base text-neutral-400">/ 6 months</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white">{plan.pricing["12months"]}</span>
                      <span className="text-base text-neutral-400">/ 12 months</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-white">{plan.totalUpfront}</div>
                    <p className="text-sm text-neutral-400">Total upfront</p>
                    {plan.breakdown && (
                      <div className="text-sm text-neutral-300 space-y-1 pt-2 border-t border-white/10">
                        <p><span className="font-medium">How it works:</span></p>
                        <p>{plan.breakdown.healthCapital} Health Capital — securely allocated to your health</p>
                        <p>{plan.breakdown.programFee} Program Usage Fee — covers your personalized plan, tools, and accountability</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bonus eligibility (for 12-month) */}
              {plan.bonusEligibility && (
                <div className="text-sm text-neutral-300 border-t border-white/10 pt-4">
                  <p>{plan.bonusEligibility}</p>
                </div>
              )}

              {/* What's included */}
              <div className="space-y-3 border-t border-white/10 pt-4">
                <p className="font-medium text-white text-sm">
                  What's included{plan.id === "6month-commitment" ? " (everything from Plan Access, plus):" : ":"}
                </p>
                <div className="space-y-2">
                  {plan.included.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-300">
                      <CheckIcon />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's not included (only for plan access) */}
              {plan.notIncluded && (
                <div className="space-y-3 border-t border-white/10 pt-4">
                  <p className="font-medium text-white text-sm">What's not included:</p>
                  <div className="space-y-2">
                    {plan.notIncluded.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-300">
                        <XIcon />
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}


              {/* Best if */}
              <div className="border-t border-white/10 pt-4">
                <p className="text-sm text-neutral-300">
                  <span className="font-medium text-white">Best if:</span> {plan.bestIf}
                </p>
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-white/10">
                {onPlanClick ? (
                  <button
                    onClick={onPlanClick}
                    className="premium-button w-full text-center block"
                  >
                    Choose plan
                  </button>
                ) : (
                  <Link
                    href={plan.ctaHref}
                    className="premium-button w-full text-center block"
                  >
                    Choose plan
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

