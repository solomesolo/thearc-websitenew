"use client";

import React, { useState } from "react";

interface FAQAccordionProps {
  question: string;
  answer: string;
  index?: number;
}

export function FAQAccordion({ question, answer, index = 0 }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="faq-accordion-item animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        className="faq-accordion-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="faq-accordion-question">{question}</span>
        <span 
          className={`faq-accordion-icon ${isOpen ? "faq-accordion-icon-open" : ""}`}
        >
          +
        </span>
      </button>
      <div
        className={`faq-accordion-body ${isOpen ? "faq-accordion-body-open" : ""}`}
      >
        <p className="faq-accordion-answer">{answer}</p>
      </div>
    </div>
  );
}

