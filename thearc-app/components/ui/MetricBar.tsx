"use client";

import { motion } from "framer-motion";

interface MetricBarProps {
  value: number;
  max?: number;
  label: string;
  showValue?: boolean;
  delay?: number;
}

export function MetricBar({ value, max = 100, label, showValue = true, delay = 0 }: MetricBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-[#A3B3AA] uppercase tracking-wider text-xs font-normal">
          {label}
        </span>
        {showValue && (
          <span className="font-semibold text-white">{value}</span>
        )}
      </div>
      <div className="metric-bar-container">
        <motion.div
          className="metric-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, delay: (delay || 0) + 0.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

