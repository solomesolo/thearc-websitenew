"use client";

import React from "react";
import { motion, useMotionTemplate } from "framer-motion";
import { useMagnetic } from "./magnetic";
import { useSpotlight } from "./useSpotlight";

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: React.ReactNode;
  highlight?: boolean;
  badge?: string;
}

export function PricingCard({
  title,
  price,
  period,
  description,
  features,
  cta,
  highlight = false,
  badge,
}: PricingCardProps) {
  const { x, y, onMove, reset } = useMagnetic(18);
  const { spotlightX, spotlightY, updateSpotlight, resetSpotlight } = useSpotlight();
  const baseGradient = "linear-gradient(to bottom, #1a1a1a, #0e0e0e)";

  const spotlightStyle = useMotionTemplate`
    radial-gradient(
      400px circle at ${spotlightX}px ${spotlightY}px,
      rgba(0, 255, 200, 0.12),
      rgba(0, 0, 0, 0)
    ), ${baseGradient}
  `;

  const CheckIcon = () => (
    <svg
      className="w-4 h-4 text-teal-400 mt-1 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  return (
    <motion.div
      style={{ x, y, backgroundImage: spotlightStyle }}
      onMouseMove={(e) => {
        onMove(e);
        updateSpotlight(e);
      }}
      onMouseLeave={() => {
        reset();
        resetSpotlight();
      }}
      className={`pricing-card relative border border-neutral-800 flex flex-col justify-between h-full ${
        highlight ? "featured" : ""
      } ${highlight ? "border border-teal-500/30 shadow-[0_0_30px_rgba(0,255,200,0.15)]" : ""}`}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-black text-xs px-3 py-1 rounded-full">
          {badge}
        </span>
      )}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-extrabold text-white">{price}</span>
          <span className="text-gray-400 text-lg">/ {period}</span>
        </div>

        <div className="space-y-3 text-sm text-neutral-300">
          {features.map((feature) => (
            <div key={feature} className="flex items-start gap-3">
              <CheckIcon />
              <p className="text-sm leading-relaxed text-gray-300">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-container mt-10 w-full">{cta}</div>
    </motion.div>
  );
}

