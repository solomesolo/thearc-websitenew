"use client";

const insights = [
  {
    title: "Your Core Risks",
    points: [
      "Hormonal instability (estrogen / progesterone drift)",
      "Sleep fragmentation",
      "Metabolic slowdown",
      "Cortisol + stress reactivity",
    ],
  },
  {
    title: "Your Strengths",
    points: [
      "Strong foundational mobility",
      "Good cardiovascular resilience",
      "High baseline adaptability",
      "Capacity for fast improvement",
    ],
  },
  {
    title: "What We Watch Closely",
    points: [
      "Inflammation patterns",
      "Thyroid + metabolism signals",
      "Sleep efficiency + night-time awakenings",
      "Gut/hormone interaction",
    ],
  },
];

export function WomenKeyInsights() {
  return (
    <section className="space-y-4 w-full flex flex-col items-center">
      <div className="space-y-2 w-full flex flex-col items-center">
        <h3 className="text-2xl font-semibold text-white text-center">Key Insights Summary</h3>
        <p className="text-sm text-gray-400 max-w-2xl text-center">
          A snapshot of how we interpret your underlying biology and the systems that need ongoing calibration.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {insights.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl bg-gradient-to-b from-[#0a0a0a] to-[#101010] border border-white/5 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2v20M2 12h20"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white">{card.title}</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              {card.points.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

