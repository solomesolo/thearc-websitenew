"use client";

import { FAQSection } from "./FAQSection";

const faqs = [
  {
    q: "Why do my symptoms persist even when labs look normal?",
    a: "Many biological imbalances exist within \"normal\" lab ranges but still cause symptoms. The Arc uses deeper screening, trend analysis, and functional markers to identify these hidden patterns that standard checkups miss.",
  },
  {
    q: "How does ARC find root causes?",
    a: "ARC analyzes patterns across hormones, nutrients, inflammation, metabolic rhythm, sleep, and stress markers — not just individual values. This systems-based approach reveals the underlying drivers behind your symptoms.",
  },
  {
    q: "Do I need to change everything at once?",
    a: "No. Your plan prioritizes the most impactful changes first, based on your biomarker patterns. You'll receive clear, sequenced steps that build on each other — not overwhelming overhauls.",
  },
  {
    q: "Can ARC help with fatigue or brain fog?",
    a: "Yes. Fatigue and brain fog often stem from nutrient deficiencies, hormonal imbalances, inflammation, or metabolic dysfunction. ARC identifies these root causes and provides targeted routines to restore energy and cognitive clarity.",
  },
  {
    q: "How long until I feel improvement?",
    a: "Many people notice improvements in energy, sleep quality, and mental clarity within 4–8 weeks. More significant stability and symptom reduction typically emerge by months 2–4 as core systems begin to rebalance.",
  },
  {
    q: "Do I need tests to start?",
    a: "The free screening identifies which tests you're missing. You can start with your existing labs, and ARC will guide you on which additional screenings will provide the most clarity for your symptoms.",
  },
  {
    q: "Is this a medical program or lifestyle program?",
    a: "ARC combines clinically informed biomarker analysis with evidence-based lifestyle interventions. Your baseline plan is science-driven. If you choose the Care tier, licensed clinicians oversee your recovery pathway.",
  },
  {
    q: "What if my symptoms change over time?",
    a: "Your plan updates monthly based on your biomarker trends and symptom patterns. As you improve, your routines and focus areas adapt — ensuring your plan stays aligned with your current biological state.",
  },
];

export function RebuilderFAQ() {
  return <FAQSection title="Frequently Asked Questions" faqs={faqs} />;
}
