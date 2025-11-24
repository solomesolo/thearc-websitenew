"use client";

const steps = [
  "Begin with a free screening to map your missing tests",
  "Upload any past labwork so your baseline is reconstructed",
  "Receive your first stabilisation tasks within 48 hours",
  "Get your global medical file — accessible anywhere you live next",
];

export function NextSteps() {
  return (
    <section className="space-y-4">
      <div className="space-y-2 text-center md:text-left">
        <h3 className="text-2xl font-semibold text-white">Your Recommended Next Steps</h3>
        <p className="text-sm text-gray-400">
          A precise, low-friction starting point so your blueprint translates into action.
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



