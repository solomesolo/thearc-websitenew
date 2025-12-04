"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { motion } from "framer-motion";

interface Metric {
  name: string;
  value: string | number;
  trend: "up" | "down" | "stable";
  change: string;
  description: string;
}

const metrics: Metric[] = [
  {
    name: "Sleep Stability",
    value: "87%",
    trend: "up",
    change: "+5%",
    description: "Consistent sleep-wake timing",
  },
  {
    name: "Glucose Variability",
    value: "12%",
    trend: "down",
    change: "-3%",
    description: "Lower is better",
  },
  {
    name: "Stress Load",
    value: "65",
    trend: "down",
    change: "-8",
    description: "On a scale of 0-100",
  },
  {
    name: "HRV Trend",
    value: "42ms",
    trend: "up",
    change: "+5ms",
    description: "Heart rate variability",
  },
  {
    name: "Recovery Score",
    value: "78",
    trend: "up",
    change: "+6",
    description: "Overall recovery capacity",
  },
  {
    name: "Inflammation Trend",
    value: "Low",
    trend: "stable",
    change: "—",
    description: "Based on biomarkers",
  },
  {
    name: "Lifestyle Load",
    value: "Moderate",
    trend: "down",
    change: "Improving",
    description: "Work-life balance index",
  },
];

const getTrendColor = (trend: string) => {
  switch (trend) {
    case "up":
      return "text-[#6FFFC3]";
    case "down":
      return "text-[#8A938E]";
    default:
      return "text-[#A3B3AA]";
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return "↑";
    case "down":
      return "↓";
    default:
      return "→";
  }
};

export function MetricsDashboard() {
  return (
    <GlowCard delay={0.3}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="dashboard-h2">Metrics Dashboard</h3>
          <p className="dashboard-description text-sm">
            Real-time tracking of key biological markers and performance indicators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              className="p-4 rounded-xl bg-[#0f0f0f]/60 border border-white/5 hover:border-white/10 transition-all"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.35 + index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-semibold text-white">{metric.name}</h4>
                <span className={`text-xs font-medium ${getTrendColor(metric.trend)}`}>
                  {getTrendIcon(metric.trend)} {metric.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
              <p className="dashboard-description text-xs">{metric.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}

