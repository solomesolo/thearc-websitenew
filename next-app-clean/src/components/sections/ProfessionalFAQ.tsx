"use client";

import { FAQSection } from "./FAQSection";

const faqs = [
  {
    q: "Why do I feel fatigued even when I sleep enough?",
    a: "Workload, stress hormones, and cognitive load can reduce sleep quality without affecting duration.",
  },
  {
    q: "Can The Arc help with burnout?",
    a: "Yes. The system identifies biological drivers of burnout and builds routines to reverse early signs.",
  },
  {
    q: "Do I need strict routines?",
    a: "No. Your program uses small, reliable steps that fit into demanding schedules.",
  },
  {
    q: "How fast will I notice improvements?",
    a: "Most professionals experience better clarity and energy within 3 to 5 weeks.",
  },
];

export function ProfessionalFAQ() {
  return <FAQSection title="Frequently Asked Questions" faqs={faqs} />;
}

