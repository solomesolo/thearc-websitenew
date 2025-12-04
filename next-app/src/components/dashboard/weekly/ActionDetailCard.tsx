"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ActionDetailCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  bullets?: string[];
  icon?: ReactNode;
  delay?: number;
}

export function ActionDetailCard({
  title,
  subtitle,
  description,
  bullets,
  icon,
  delay = 0,
}: ActionDetailCardProps) {
  return (
    <motion.div
      className="p-6 rounded-[24px] bg-gradient-to-b from-[#0E1211] to-[#111513] border border-white/5 shadow-[0_20px_60px_rgba(20,255,155,0.05)] hover:border-[#6FFFC3]/10 hover:shadow-[0_25px_70px_rgba(20,255,155,0.08)] transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex-shrink-0 mt-1 text-[#6FFFC3]">{icon}</div>
        )}
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
            {subtitle && (
              <p className="text-sm text-[#6FFFC3]/80 font-medium mb-2">
                {subtitle}
              </p>
            )}
          </div>

          {description && (
            <p className="text-sm text-[#A3B3AA] leading-relaxed">
              {description}
            </p>
          )}

          {bullets && bullets.length > 0 && (
            <ul className="space-y-2 pt-2">
              {bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                  <span className="text-[#6FFFC3]">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}

