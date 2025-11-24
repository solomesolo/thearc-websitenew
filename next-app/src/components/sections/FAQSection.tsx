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
    <section className="faq-section-wrapper">
      <div className="faq-section-container">
        <h2 className="faq-section-title animate-fade-up">
          {title}
        </h2>

        <div className="faq-accordion-list">
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

