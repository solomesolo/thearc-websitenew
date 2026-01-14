"use client";

import { ArcButton } from "../ui/ArcButton";

const predispositionMetrics = [
  { label: "Stress Load", value: 85 },
  { label: "Cortisol Regulation", value: 70 },
  { label: "Sleep Quality", value: 55 },
  { label: "Cognitive Recovery", value: 60 },
  { label: "Inflammation", value: 50 },
];

const biomarkerPanels = [
  {
    title: "Full blood panel",
    detail: "Reveals foundational metabolic, hormonal, and inflammatory markers.",
  },
  {
    title: "Stress & cortisol markers",
    detail: "Assesses chronic stress load, resilience capacity, and burnout risks.",
  },
  {
    title: "Cognitive performance markers",
    detail: "Identifies nutrient deficits and neurological load affecting focus and mental stamina.",
  },
  {
    title: "Sleep & circadian markers",
    detail: "Analyses sleep efficiency, rhythm alignment, and recovery ability.",
  },
  {
    title: "Inflammation panel",
    detail: "Detects systemic inflammation influencing performance and long-term health.",
  },
];

const sixMonthPlan = [
  {
    month: "Month 1",
    focus: "Reset & Establish Clarity",
    bullets: [
      "Full executive health baseline",
      "Stress-load and recovery pattern assessment",
      "Metabolic and sleep architecture profiling",
      "Immediate stabilisation routines for energy and focus",
    ],
  },
  {
    month: "Month 2",
    focus: "Strengthen Core Systems",
    bullets: [
      "Essential micronutrient optimisation",
      "Anti-inflammatory lifestyle adjustments",
      "Foundational routines to stabilise energy and cognitive output",
    ],
  },
];

const CardWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-[24px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] p-8 shadow-[0_35px_90px_rgba(20,255,155,0.05)] space-y-6">
    {children}
  </div>
);

export function ProfessionalBlueprint() {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(20,60,40,0.25) 0%, rgba(0,0,0,0.95) 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-0 text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-semibold text-white">Your Personal Arc Blueprint</h2>
        <p className="text-lg text-gray-300">
          A preview of the clarity and structure you receive after your first assessment.
        </p>
        <div className="pt-4">
          <ArcButton href="/dashboard/example">View the sample of the Blueprint</ArcButton>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto mt-12 grid gap-8 lg:grid-cols-3">
        <CardWrapper>
          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-semibold text-white">Predisposition Map</h3>
            <p className="text-sm text-gray-400">
              A snapshot of your genetic, biological, and lifestyle risk areas—summarised for fast
              understanding.
            </p>
          </div>
          <div className="space-y-4">
            {predispositionMetrics.map((metric) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-300">
                  <span>{metric.label}</span>
                  <span className="font-semibold text-white">{metric.value}</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#1A1A1A] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300"
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
                {metric.label === "Stress Load" && (
                  <p className="text-xs text-gray-500">Sustained cognitive and emotional pressure elevates baseline stress physiology.</p>
                )}
                {metric.label === "Cortisol Regulation" && (
                  <p className="text-xs text-gray-500">Patterns indicate reduced recovery capacity across the workweek.</p>
                )}
                {metric.label === "Sleep Quality" && (
                  <p className="text-xs text-gray-500">Irregular routines impact sleep depth and circadian rhythm stability.</p>
                )}
                {metric.label === "Cognitive Recovery" && (
                  <p className="text-xs text-gray-500">Signs of mild fatigue accumulation affecting clarity and focus.</p>
                )}
                {metric.label === "Inflammation" && (
                  <p className="text-xs text-gray-500">Early markers of systemic inflammation may emerge under chronic workload.</p>
                )}
              </div>
            ))}
          </div>
        </CardWrapper>

        <CardWrapper>
          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-semibold text-white">Precision Screening Plan</h3>
            <p className="text-sm text-gray-400">
              Your recommended screenings mapped to workload-driven biological demands — with clear rationale and sequencing.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Biomarker Panels</p>
            {biomarkerPanels.map((panel) => (
              <div key={panel.title} className="space-y-1">
                <p className="text-base font-semibold text-white">{panel.title}</p>
                <p className="text-sm text-gray-400 leading-[1.55]">{panel.detail}</p>
              </div>
            ))}
          </div>
        </CardWrapper>

        <CardWrapper>
          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-semibold text-white">Your 6-Month Performance Path</h3>
            <p className="text-sm text-gray-400">
              A clinically guided, month-by-month program designed to strengthen your focus, stamina, and resilience while you perform at a high level.
            </p>
          </div>

          <div className="space-y-5">
            {sixMonthPlan.map((phase, idx) => (
              <div key={phase.month} className="space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{phase.month}</p>
                  <p className="text-lg font-semibold text-white">{phase.focus}</p>
                </div>

                <div className="space-y-2.5">
                  {phase.bullets.map((text) => (
                    <div key={text} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                      <div className="h-2 w-2 rounded-full bg-emerald-400 mt-1" />
                      <p>{text}</p>
                    </div>
                  ))}
                </div>

                {idx !== sixMonthPlan.length - 1 && <div className="h-px w-full bg-white/10" />}
              </div>
            ))}
          </div>
        </CardWrapper>
      </div>

      <div className="relative z-10 mt-12 flex justify-center">
        <ArcButton href="/dashboard/example">View a sample Blueprint</ArcButton>
      </div>
    </section>
  );
}

