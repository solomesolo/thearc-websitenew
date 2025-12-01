"use client";

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

export function WomenScreeningPlan() {
  return (
    <section className="space-y-6 w-full flex flex-col items-center">
      <div className="space-y-2 w-full flex flex-col items-center">
        <h3 className="text-[28px] font-semibold tracking-wide text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.05)] text-center">
          Precision Screening Plan
        </h3>
        <p className="text-sm text-gray-400 max-w-2xl text-center leading-[1.55]">
          Your recommended screenings mapped to menopause biological demands — with clear
          rationale and sequencing.
        </p>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.035)] p-12 shadow-[0_45px_100px_rgba(0,0,0,0.5)] w-full max-w-2xl">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Biomarker Panels</p>
          {biomarkerPanels.map((panel) => (
            <div key={panel.title} className="space-y-1">
              <p className="text-base font-semibold text-white">{panel.title}</p>
              <p className="text-sm text-gray-400 leading-[1.55]">{panel.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

