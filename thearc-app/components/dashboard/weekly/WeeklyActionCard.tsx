"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface WeeklyActionCardProps {
  title: string;
  preview: string[];
  module: string;
  delay?: number;
}

export function WeeklyActionCard({ title, preview, module, delay = 0 }: WeeklyActionCardProps) {
  return (
    <Link href={`/dashboard/actions/${module}`}>
      <motion.div
        className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5 hover:border-[#6FFFC3]/20 transition-all cursor-pointer group hover:bg-[#0f0f0f]/80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
          {title}
        </h3>

        <ul className="space-y-2 mb-4">
          {preview.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-[#A3B3AA]">
              <span className="text-[#6FFFC3]">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-end">
          <span className="text-xs text-[#6FFFC3] font-medium group-hover:underline">
            View more →
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

