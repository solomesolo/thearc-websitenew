"use client";

import { FAQAccordion } from "../ui/FAQAccordion";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  title?: string;
  faqs: FAQItem[];
}

export function FAQSection({ title = "Frequently Asked Questions", faqs }: FAQSectionProps) {
  return (
    <section className="py-20 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-semibold text-center" style={{ marginBottom: '5rem' }}>
          {title}
        </h2>

        <div className="space-y-4" style={{ marginTop: '1rem' }}>
          {faqs.map((faq, idx) => (
            <FAQAccordion
              key={faq.q}
              question={faq.q}
              answer={faq.a}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

