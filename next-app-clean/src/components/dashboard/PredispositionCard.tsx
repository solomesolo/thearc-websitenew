"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { MetricBar } from "@/components/ui/MetricBar";

const predispositionMetrics = [
  { label: "Family/Cardio Risk", value: 80 },
  { label: "Lifestyle Load", value: 65 },
  { label: "Biological Instability", value: 20 },
  { label: "Cognitive Rhythm", value: 40 },
];

export default function PredispositionCard() {
  return (
    <GlowCard delay={0.1}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="dashboard-h2">Predisposition Map</h3>
          <p className="dashboard-description text-sm">
            A snapshot of your genetic, biological, and lifestyle risk areas—summarised for fast
            understanding.
          </p>
        </div>

        <div className="space-y-5">
          {predispositionMetrics.map((metric, index) => (
            <MetricBar
              key={metric.label}
              label={metric.label}
              value={metric.value}
              delay={0.3 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </GlowCard>
  );
}
