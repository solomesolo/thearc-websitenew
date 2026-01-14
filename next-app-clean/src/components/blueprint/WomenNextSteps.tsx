"use client";

const steps = [
  "Start the free screening to identify missing essential tests",
  "Upload past labs so we can rebuild your hormonal history",
  "Receive personalised stabilisation tasks within 48 hours",
  "Get your unified medical file — accessible anywhere, anytime",
];

export function WomenNextSteps() {
  return (
    <section className="space-y-4">
      <div className="space-y-2 text-center md:text-left">
        <h3 className="text-2xl font-semibold text-white">Your Recommended Next Steps</h3>
        <p className="text-sm text-gray-400">
          A clear and low-friction way to begin stabilising your biology.
        </p>
      </div>

      <div className="rounded-[24px] bg-gradient-to-b from-[#080808] to-[#101010] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="space-y-3">
          {steps.map((step) => (
            <div key={step} className="flex items-start gap-3 text-sm text-gray-200 leading-relaxed">
              <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300 mt-1" />
              <p>{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

