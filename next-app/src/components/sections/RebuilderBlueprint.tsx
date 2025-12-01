"use client";

import { ArcButton } from "../ui/ArcButton";

// Column 1 - Predisposition Map (KEEP EXACTLY AS IS)
const predispositionMetrics = [
  { label: "Family/Cardio Risk", value: 80 },
  { label: "Lifestyle Load", value: 65 },
  { label: "Biological Instability", value: 20 },
  { label: "Cognitive Rhythm", value: 40 },
];

// Column 2 - Precision Screening Plan (simple structure like image)
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

// Column 3 - Your First 6 Months (simple structure like image - only Month 1)
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

export function RebuilderBlueprint() {
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
      </div>

      <div className="relative z-10 max-w-6xl mx-auto mt-12 grid gap-8 lg:grid-cols-3">
        {/* Column 1 — Predisposition Map (KEEP EXACTLY AS IS) */}
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

        {/* Column 2 — Precision Screening Plan (simple structure like image) */}
        <CardWrapper>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-white">Precision Screening Plan</h3>
            <p className="text-sm text-gray-400">
              Your essential screenings, mapped to why they matter and when you should take them.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-semibold text-white">Your First 6 Months</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              A clinically guided path that rebuilds your biological stability and restores consistent energy.
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Month 1</p>
                <p className="text-lg font-semibold text-white">Reset & Re-baseline</p>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 mt-1" />
                  <p>Full inflammation–hormone–metabolic baseline</p>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 mt-1" />
                  <p>Stress-load + recovery pattern assessment</p>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 mt-1" />
                  <p>Sleep & circadian dysregulation mapping</p>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 mt-1" />
                  <p>Immediate stabilisation routines for reducing fatigue and calming the nervous system</p>
                </div>
              </div>
            </div>
          </div>
        </CardWrapper>

        {/* Column 3 — Your First 6 Months (simple structure like image - only Month 1) */}
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

      <div className="relative z-10 mt-12 flex justify-center">
        <ArcButton href="/rebuilder/blueprint/sample">View a sample Blueprint</ArcButton>
      </div>
    </section>
  );
}
