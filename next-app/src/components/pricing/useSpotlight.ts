"use client";

import type React from "react";
import { useMotionValue } from "framer-motion";

export function useSpotlight() {
  const spotlightX = useMotionValue(-9999);
  const spotlightY = useMotionValue(-9999);

  const updateSpotlight = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  const resetSpotlight = () => {
    spotlightX.set(-9999);
    spotlightY.set(-9999);
  };

  return { spotlightX, spotlightY, updateSpotlight, resetSpotlight };
}

