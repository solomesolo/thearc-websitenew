"use client";

const faqs = [
  {
    q: "What makes The Arc different from regular health apps?",
    a: "Most health apps rely on generic advice. The Arc uses clinical-grade analysis to reveal your personal predispositions, overlooked biological shifts, and the exact screenings that matter for you.",
  },
  {
    q: "Is this based on real medical science?",
    a: "Yes. Your roadmap is informed by biomarkers, clinician-reviewed patterns, and evidence-based lifestyle protocols.",
  },
  {
    q: "Do I need to already be healthy or active?",
    a: "Not at all. The Arc adapts to your starting point — rebuilding or optimising.",
  },
  {
    q: "What screenings do you recommend?",
    a: "Screenings vary by predisposition, but most include blood markers, inflammation, digestion, immune resilience, and circadian rhythm indicators.",
  },
  {
    q: "How long until I see changes?",
    a: "Most people notice improvements within 3–6 weeks. Full measurable progress appears at 6 months.",
  },
  {
    q: "Is this a medical service?",
    a: "The Arc provides clinically informed guidance. The Care tier includes supervision from licensed practitioners.",
  },
  {
    q: "Is this suitable for travellers?",
    a: "Yes. The Arc stabilises sleep, immunity, and recovery across time zones.",
  },
  {
    q: "What if I’m not sure where to start?",
    a: "Begin with the free screening — it reveals where your blind spots are.",
  },
];

export function TravelerFAQ() {
  return (
    <section className="relative w-full px-6 pt-36 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-12 animate-fade-up">
          <h2 className="text-[30px] font-semibold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Desktop layout */}
        <div className="faq-grid">
          {faqs.map((faq, idx) => (
            <div
              key={faq.q}
              className="border-t border-white/10 pt-6 space-y-3 animate-fade-up"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <p className="text-base font-semibold text-white">{faq.q}</p>
              <p className="text-sm text-gray-300 leading-[1.55]">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* Mobile accordions */}
        <div className="faq-accordion rounded-2xl border border-white/10 bg-white/5 overflow-hidden divide-y divide-white/10">
          {faqs.map((faq, idx) => (
            <details
              key={faq.q}
              className="group animate-fade-up"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <summary className="flex items-center justify-between px-5 py-4 text-left text-white text-base font-medium cursor-pointer">
                {faq.q}
                <span className="text-emerald-300 transition group-open:hidden">+</span>
                <span className="text-emerald-300 transition hidden group-open:inline">–</span>
              </summary>
              <div className="faq-answer px-5 pb-4 text-sm text-gray-300 leading-[1.55]">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}



