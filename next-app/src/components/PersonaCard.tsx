"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { motion, useMotionTemplate } from "framer-motion";
import { useMagnetic } from "./pricing/magnetic";
import { useSpotlight } from "./pricing/useSpotlight";

interface PersonaCardProps {
  title: string;
  struggles: string;
  promise: string;
  href: string;
  cta: string;
  imagePlaceholder?: React.ReactNode;
}

export default function PersonaCard({ title, struggles, promise, href, cta }: PersonaCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
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

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    onMove(event);
    updateSpotlight(event);
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;
      cardRef.current?.style.setProperty("--mouse-x", `${localX}px`);
      cardRef.current?.style.setProperty("--mouse-y", `${localY}px`);
    }
  };

  const handleMouseLeave = () => {
    reset();
    resetSpotlight();
    cardRef.current?.style.setProperty("--mouse-x", `-9999px`);
    cardRef.current?.style.setProperty("--mouse-y", `-9999px`);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ x, y, backgroundImage: spotlightStyle }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="pricing-card path-card border border-neutral-800 hover:border-teal-500/40 flex flex-col justify-between h-full"
    >
      <div className="relative z-10 flex flex-col gap-6 text-left">
        <div className="space-y-4 max-w-[42ch]">
          <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
          <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
            <p>What you struggle with: {struggles}</p>
            <p>What The Arc gives you: {promise}</p>
          </div>
        </div>
        <Link
          href={href}
          className="text-[#4DE4C1] font-semibold inline-flex items-center gap-2 transition-all duration-200 hover:text-teal-300"
        >
          {cta}
        </Link>
      </div>
      <div className="path-card__spotlight" aria-hidden="true" />
    </motion.div>
  );
}

