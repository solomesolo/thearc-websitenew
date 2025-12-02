"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: number | string;
  description: string;
  delay?: number;
}

export default function MetricCard({ title, value, description, delay = 0 }: MetricCardProps) {
  return (
    <GlowCard delay={delay}>
      <div className="space-y-3">
        <h3 className="dashboard-label">{title}</h3>
        <motion.p
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
        >
          {value}
        </motion.p>
        <p className="dashboard-description text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </GlowCard>
  );
}
