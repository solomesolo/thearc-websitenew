import Link from "next/link";

const predispositionData = [
  { label: "Family/Cardio Risk", value: 80 },
  { label: "Lifestyle Load", value: 65 },
  { label: "Biological Instability", value: 20 },
  { label: "Cognitive Rhythm", value: 40 },
];

const screeningRows = [
  {
    title: "Full blood panel",
    subtitle: "Detect early biological shifts",
    month: "Month 1",
  },
  {
    title: "Sleep & recovery markers",
    subtitle: "Stabilise circadian rhythm",
    month: "Month 2",
  },
  {
    title: "GI + immune markers",
    subtitle: "Strengthen travel resilience",
    month: "Month 3",
  },
];

const phasePreview = [
  { month: "Month 1", label: "Reset" },
  { month: "Month 2", label: "Stabilise" },
  { month: "Month 3", label: "Strengthen" },
  { month: "Month 4", label: "Energy" },
  { month: "Month 5", label: "Mobility" },
  { month: "Month 6", label: "Longevity habits" },
];

export default function BlueprintPreview() {
  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden bg-black">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(20,60,40,0.25) 0%, rgba(0,0,0,0.95) 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-0 text-center">
        <div className="space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold text-white">
            Your Personal Arc Blueprint
          </h2>
          <p className="text-lg text-gray-300">
            A preview of the clarity and structure you receive after your first assessment.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-left">
          {/* Card 1 */}
          <div className="rounded-[24px] bg-gradient-to-b from-[#0b0b0b] to-[#111] p-8 shadow-[0_20px_60px_rgba(20,255,155,0.05)] space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-white">Predisposition Map</h3>
              <p className="text-sm text-gray-400 mt-2">
                A snapshot of your genetic, biological, and lifestyle risk areas—summarised for fast
                understanding.
              </p>
            </div>
            <div className="space-y-4">
              {predispositionData.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <span>{item.label}</span>
                    <span className="font-semibold text-white">{item.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#1A1A1A] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-[24px] bg-gradient-to-b from-[#0b0b0b] to-[#111] p-8 shadow-[0_20px_60px_rgba(20,255,155,0.05)] space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-white">Precision Screening Plan</h3>
              <p className="text-sm text-gray-400 mt-2">
                Your essential screenings, mapped to why they matter and when you should take them.
              </p>
            </div>
            <div className="space-y-4">
              {screeningRows.map((row) => (
                <div key={row.title} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold text-white">{row.title}</p>
                    <p className="text-sm text-gray-400">{row.subtitle}</p>
                  </div>
                  <span className="text-sm text-gray-400">{row.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-[24px] bg-gradient-to-b from-[#0b0b0b] to-[#111] p-8 shadow-[0_20px_60px_rgba(20,255,155,0.05)] space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-white">Your First 6 Months</h3>
              <p className="text-sm text-gray-400 mt-2">
                A clear, stabilising path that structures your biological reset.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {phasePreview.map((phase) => (
                <div
                  key={phase.month}
                  className="flex items-center gap-3 bg-[#0f0f0f]/60 rounded-2xl px-4 py-3"
                >
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">{phase.month}</p>
                    <p className="text-xs text-gray-400">{phase.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Link href="/blueprint/sample" className="premium-button mx-auto inline-flex">
            View a sample Blueprint
          </Link>
        </div>
      </div>
    </section>
  );
}


