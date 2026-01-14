"use client";

import type React from "react";
import { animate, useMotionValue } from "framer-motion";
import { useCallback } from "react";

export function useMagnetic(strength: number = 25) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const reset = useCallback(() => {
    animate(x, 0, { duration: 0.4 });
    animate(y, 0, { duration: 0.4 });
  }, [x, y]);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    x.set(dx / strength);
    y.set(dy / strength);
  };

  return { x, y, onMove, reset };
}

