"use client";

const biomarkerPanels = [
  {
    title: "Full blood panel",
    detail: "Detect early biological shifts and metabolic stress.",
  },
  {
    title: "GI & digestion markers",
    detail: "Identify dysregulation caused by inconsistent environments.",
  },
  {
    title: "Immune markers",
    detail: "Reveal suppressed resilience and travel-related immune load.",
  },
  {
    title: "Sleep & circadian markers",
    detail: "Assess circadian rhythm disruption from timezone changes.",
  },
  {
    title: "Inflammation panel",
    detail: "Detect systemic stress and inflammatory responses.",
  },
];

const timing = [
  "Month 1 — Foundational blood panel",
  "Month 2 — Sleep & recovery markers",
  "Month 3 — GI + immune markers",
  "Month 4 — Longevity + micronutrients",
  "Month 5 — Environmental stress load",
  "Month 6 — Comprehensive reassessment",
];

export function ScreeningPlan() {
  return (
    <section className="space-y-6">
      <div className="space-y-2 text-center md:text-left">
        <h3 className="text-[28px] font-semibold tracking-wide text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          Precision Screening Plan
        </h3>
        <p className="text-sm text-gray-400 max-w-2xl leading-[1.55]">
          Your recommended screenings mapped to your travel-driven biological risks — with clear
          rationale and sequencing.
        </p>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.035)] p-12 shadow-[0_45px_100px_rgba(0,0,0,0.5)]">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:divide-x lg:divide-white/10">
          <div className="space-y-5 pr-0 lg:pr-10">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Biomarker Panels</p>
            {biomarkerPanels.map((panel) => (
              <div key={panel.title} className="space-y-1">
                <p className="text-base font-semibold text-white">{panel.title}</p>
                <p className="text-sm text-gray-400 leading-[1.55]">{panel.detail}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-6 lg:pt-0 lg:pl-10">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Timing</p>
            {timing.map((entry) => (
              <p key={entry} className="text-sm text-gray-300 leading-[1.55]">
                {entry}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



