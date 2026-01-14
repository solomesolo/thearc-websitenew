"use client";

import { ArcButton } from "../ui/ArcButton";

const predispositionMetrics = [
  { label: "Family/Cardio Risk", value: 80 },
  { label: "Lifestyle Load", value: 65 },
  { label: "Biological Instability", value: 20 },
  { label: "Cognitive Rhythm", value: 40 },
];

const screeningPlan = [
  {
    title: "Full blood panel",
    detail: "Detect early biological shifts",
    month: "Month 1",
  },
  {
    title: "Sleep & recovery markers",
    detail: "Stabilise circadian rhythm",
    month: "Month 2",
  },
  {
    title: "GI + immune markers",
    detail: "Strengthen travel resilience",
    month: "Month 3",
  },
];

const sixMonthPlan = [
  {
    month: "Month 1",
    focus: "Reset & Re-baseline",
    bullets: [
      "Full travel-specific blood panel",
      "Circadian + sleep pattern reset",
      "Digestive stabilisation plan for mixed environments",
      "Rebuild core biological baseline after recent travel",
    ],
  },
];

const CardWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-[24px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] p-8 shadow-[0_35px_90px_rgba(20,255,155,0.05)] space-y-6">
    {children}
  </div>
);

export function PersonalBlueprint() {
  return (
    <section className="relative w-full py-20 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold text-white">Your Personal Arc Blueprint</h2>
          <p className="text-lg text-gray-300 max-w-2xl">
            A preview of the clarity and structure you receive after your first assessment.
          </p>
          <div className="pt-4">
            <ArcButton href="/traveler/blueprint/sample">View the sample of the Blueprint</ArcButton>
          </div>
        </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <CardWrapper>
          <div className="space-y-2">
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
              </div>
            ))}
          </div>
        </CardWrapper>

        <CardWrapper>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-white">Precision Screening Plan</h3>
            <p className="text-sm text-gray-400">
              Your essential screenings, mapped to why they matter and when you should take them.
            </p>
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-semibold tracking-tight text-white">Your First 6 Months</h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xl mx-auto">
              A structured, global-first stabilisation path that rebuilds your biological
              consistency while you live across borders.
            </p>
          </div>

          <div className="space-y-5">
            {screeningPlan.map((row) => (
              <div key={row.title} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-base font-semibold text-white">{row.title}</p>
                  <p className="text-sm text-gray-400">{row.detail}</p>
                </div>
                <span className="text-sm text-gray-400">{row.month}</span>
              </div>
            ))}
          </div>
        </CardWrapper>

        <CardWrapper>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-white">Your First 6 Months</h3>
            <p className="text-sm text-gray-400">
              A structured, global-first stabilisation path that rebuilds your biological
              consistency while you live across borders.
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
      </div>
    </section>
  );
}


