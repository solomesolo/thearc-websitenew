"use client";

import { FAQSection } from "./FAQSection";

const faqs = [
  {
    q: "What if my symptoms are vague or inconsistent?",
    a: "Many early biological shifts present subtly. Your assessment clarifies underlying drivers.",
  },
  {
    q: "Can this help with chronic fatigue?",
    a: "Yes. The plan targets metabolic efficiency, hormonal balance, and inflammation — the core factors behind persistent fatigue.",
  },
  {
    q: "Do I need medical supervision?",
    a: "Your plan is clinician informed, and the Care tier includes professional guidance.",
  },
  {
    q: "How quickly will I see change?",
    a: "Most users notice improved stability and energy within the first 4 to 6 weeks.",
  },
];

export function RebuilderFAQ() {
  return <FAQSection title="Frequently Asked Questions" faqs={faqs} />;
}

