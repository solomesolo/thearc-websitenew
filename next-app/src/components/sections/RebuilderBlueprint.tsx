"use client";

import { ArcButton } from "../ui/ArcButton";

const predispositionMetrics = [
  { label: "Fatigue Tendency", value: 75 },
  { label: "Inflammation Load", value: 65 },
  { label: "Hormonal Balance", value: 55 },
  { label: "Digestive Function", value: 50 },
  { label: "Stress Recovery", value: 60 },
  { label: "Metabolic Efficiency", value: 40 },
];

const screeningPlan = [
  {
    title: "Full metabolic panel",
    detail: "Detect underlying issues in energy regulation.",
    month: "Month 1",
  },
  {
    title: "Hormonal markers",
    detail: "Assess thyroid, adrenal, and sex hormone balance.",
    month: "Month 1",
  },
  {
    title: "Inflammation markers",
    detail: "Identify chronic or low-grade inflammatory load.",
    month: "Month 2",
  },
  {
    title: "Digestive function panel",
    detail: "Reveal digestive irregularities and microbiome shifts.",
    month: "Month 3",
  },
  {
    title: "Recovery and stress response markers",
    detail: "Assess the resilience of your nervous system.",
    month: "Month 5",
  },
];

const sixMonthPlan = [
  {
    month: "Month 1",
    focus: "Establish stability",
    bullets: [
      "Metabolic support",
      "Foundational routines",
      "Early symptom tracking",
    ],
  },
  {
    month: "Month 2",
    focus: "Reduce inflammation",
    bullets: [
      "Anti inflammatory nutrition",
      "Stress load reduction",
    ],
  },
  {
    month: "Month 3",
    focus: "Improve digestion",
    bullets: [
      "Microbiome support",
      "Digestive repair sequences",
    ],
  },
  {
    month: "Month 4",
    focus: "Balance hormones",
    bullets: [
      "Thyroid and adrenal support",
      "Sleep and recovery restoration",
    ],
  },
  {
    month: "Month 5",
    focus: "Strengthen resilience",
    bullets: [
      "Nervous system training",
      "Emotionally supportive practices",
    ],
  },
  {
    month: "Month 6",
    focus: "Clarity and direction",
    bullets: [
      "Full reassessment",
      "Personal long term health strategy",
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
            <div className="pt-2">
              <p className="text-sm text-gray-400">Month 6: Reassessment</p>
            </div>
          </div>
        </CardWrapper>

        <CardWrapper>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-white">Your First 6 Months</h3>
            <p className="text-sm text-gray-400">
              A structured, clinician-informed program designed to rebuild foundational systems of health.
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
        <ArcButton href="/blueprint/sample">View a sample Blueprint</ArcButton>
      </div>
    </section>
  );
}

