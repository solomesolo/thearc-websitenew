"use client";

import { ArcButton } from "../ui/ArcButton";

const predispositionMetrics = [
  { label: "Family/Cardio Risk", value: 80 },
  { label: "Lifestyle Load", value: 65 },
  { label: "Biological Instability", value: 20 },
  { label: "Cognitive Rhythm", value: 40 },
];

const CardWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-[24px] bg-gradient-to-b from-[#0b0b0b] to-[#111111] p-8 shadow-[0_35px_90px_rgba(20,255,155,0.05)] space-y-6">
    {children}
  </div>
);

export function WomenBlueprint() {
  return (
    <section className="relative w-full py-20 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold text-white">Your Personal Arc Blueprint</h2>
          <p className="text-lg text-gray-300 max-w-2xl">
            A preview of the clarity and structure you receive after your first assessment.
          </p>
          <div className="pt-4">
            <ArcButton href="/dashboard/example">View the sample of the Blueprint</ArcButton>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
        {/* CARD 1 — Predisposition Map (UNCHANGED) */}
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

        {/* CARD 2 — Precision Screening Plan (Menopause Version) */}
        <CardWrapper>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-white">Precision Screening Plan</h3>
            <p className="text-sm text-gray-400">
              Your essential screenings — mapped to why they matter and when you should take them.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xl font-semibold text-white">Your First 6 Months</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              A structured, menopause-first stabilisation sequence that improves hormonal balance, metabolism, sleep,
              and emotional steadiness.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold mb-1 text-white">Hormone + thyroid panel</p>
              <p className="text-sm text-gray-400 mb-2">Identify hormonal drift & metabolic slowdown</p>
              <p className="text-sm text-gray-400">Month 1</p>
            </div>

            <div>
              <p className="text-sm font-semibold mb-1 text-white">Inflammation + nutrient markers</p>
              <p className="text-sm text-gray-400 mb-2">Restore immune balance and rebuild energy availability</p>
              <p className="text-sm text-gray-400">Month 2</p>
            </div>

            <div>
              <p className="text-sm font-semibold mb-1 text-white">Sleep + stress rhythm assessment</p>
              <p className="text-sm text-gray-400 mb-2">Reduce night waking & stabilise HPA rhythm</p>
              <p className="text-sm text-gray-400">Month 3</p>
            </div>
          </div>
        </CardWrapper>

        {/* CARD 3 — Stabilisation Roadmap (Menopause Version) */}
        <CardWrapper>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-white">Stabilisation Roadmap</h3>
            <p className="text-sm text-gray-400">
              A step-by-step plan to reduce symptoms, stabilise hormones, and rebuild long-term equilibrium.
            </p>
          </div>

          <div className="space-y-6">
            {/* Month 1 */}
            <div>
              <h4 className="uppercase text-xs tracking-widest text-gray-400 mb-3">
                Month 1 — Reset & Re-baseline
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Full hormone + thyroid panel</li>
                <li>• Circadian & sleep rhythm reset</li>
                <li>• Anti-inflammatory support for night symptoms</li>
                <li>• Digestive support for estrogen metabolism</li>
              </ul>
            </div>

            {/* Month 2 */}
            <div>
              <h4 className="uppercase text-xs tracking-widest text-gray-400 mb-3">
                Month 2 — Restore & Strengthen
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Stress + cortisol balancing</li>
                <li>• Nutrient optimisation for mood and energy</li>
                <li>• Cardiometabolic stabilisation routines</li>
              </ul>
            </div>

            {/* Month 3 */}
            <div>
              <h4 className="uppercase text-xs tracking-widest text-gray-400 mb-3">
                Month 3 — Rebuild & Sustain
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Cognitive clarity routines</li>
                <li>• Metabolic recovery & weight-regulation support</li>
                <li>• Long-term hormonal balance strategy</li>
              </ul>
            </div>
          </div>
        </CardWrapper>
        </div>

        <div className="relative z-10 mt-12 flex justify-center">
          <ArcButton href="/dashboard/example">View a sample Blueprint</ArcButton>
        </div>
      </div>
    </section>
  );
}

