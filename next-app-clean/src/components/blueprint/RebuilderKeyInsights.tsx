"use client";

const insights = [
  {
    title: "Your Core Risks",
    points: [
      "Chronic stress / cortisol reactivity",
      "Inflammation-driven fatigue",
      "Metabolic slowdown",
      "Sleep fragmentation",
    ],
  },
  {
    title: "Your Strengths",
    points: [
      "High recovery potential",
      "Strong mobility baseline",
      "Fast response once stabilised",
      "Strong cardiovascular adaptability",
    ],
  },
  {
    title: "What We Watch Closely",
    points: [
      "Inflammation patterns",
      "Metabolic resilience",
      "Sleep depth & nervous-system stability",
      "Gut–brain axis variability",
    ],
  },
];

export function RebuilderKeyInsights() {
  return (
    <section className="space-y-4 w-full flex flex-col items-center">
      <div className="space-y-2 w-full flex flex-col items-center">
        <h3 className="text-2xl font-semibold text-white text-center">Key Insights Summary</h3>
        <p className="text-sm text-gray-400 max-w-2xl text-center">
          A snapshot of what we interpret from your initial assessment.
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

