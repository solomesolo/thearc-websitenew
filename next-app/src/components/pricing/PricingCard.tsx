"use client";

import React from "react";
import { motion, useMotionTemplate } from "framer-motion";
import { useMagnetic } from "./magnetic";
import { useSpotlight } from "./useSpotlight";

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  cta: React.ReactNode;
  highlight?: boolean;
}

export function PricingCard({
  title,
  price,
  period,
  features,
  cta,
  highlight = false,
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
      className={`pricing-card relative border border-neutral-800 ${
        highlight ? "featured" : ""
      }`}
    >
      <h3 className="text-xl font-semibold text-white">{title}</h3>

      <p className="mt-2 text-4xl font-extrabold text-white">
        {price} <span className="text-lg opacity-60">/ {period}</span>
      </p>

      <ul className="mt-6 space-y-3 text-sm text-neutral-300">
        {features.map((feature) => (
          <li key={feature} className="pl-7 relative leading-relaxed">
            {feature}
          </li>
        ))}
      </ul>

      <div className="cta-container mt-8 w-full">{cta}</div>
    </motion.div>
  );
}

