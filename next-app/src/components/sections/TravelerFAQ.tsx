"use client";

import { FAQSection } from "./FAQSection";

const faqs = [
  {
    q: "How does travel actually affect my biology?",
    a: "Frequent movement disrupts your circadian rhythm, immune readiness, digestive stability, hydration balance, and stress recovery. The Arc detects these early shifts and gives you targeted routines to stabilise them, even when your schedule changes every week.",
  },
  {
    q: "Will my plan work across different time zones?",
    a: "Yes. Your recommendations adapt to timezone changes, flight patterns, and irregular sleep. You'll receive circadian anchors, pre-flight conditioning, and arrival reset protocols that make your rhythm more resilient.",
  },
  {
    q: "Do I need lab access in every country I visit?",
    a: "No. The Arc provides a global marketplace of verified at-home services. You can order tests almost anywhere, and your plan explains exactly why each test matters for someone with a mobile lifestyle.",
  },
  {
    q: "What if I can't follow a strict routine while travelling?",
    a: "You don't need strict routines. Your plan uses minimal, portable micro-habits designed specifically for unpredictable environments. Even 5-minute interventions can stabilise your energy and sleep while traveling.",
  },
  {
    q: "Can The Arc help with jet lag?",
    a: "Yes. Your plan includes personalised circadian reset strategies based on your predispositions, sleep tendencies, and travel patterns. These protocols help you adjust faster and reduce fatigue after long flights.",
  },
  {
    q: "What if my destinations change often?",
    a: "Your plan is dynamic. It focuses on biological signals — not location-specific routines — so it remains effective whether you're in Asia this week and Europe next week.",
  },
  {
    q: "Do I need to be perfectly consistent to see progress?",
    a: "No. The system is designed for inconsistency. You'll receive stability anchors (sleep, nutrition timing, immune-load buffers) that hold your body steady even on chaotic weeks.",
  },
  {
    q: "How long until I notice improvements?",
    a: "Most travellers feel improvements in sleep quality, mental clarity, digestive stability, and energy within 2–4 weeks. More resilient circadian patterns typically emerge by months 2–3.",
  },
  {
    q: "Is this a medical service?",
    a: "Your baseline plan is clinically informed. If you choose the Care tier, licensed professionals will oversee your screenings and help interpret changes in your biomarkers.",
  },
  {
    q: "What if I don't have a stable schedule or routine?",
    a: "That's exactly who this plan is built for. The Arc identifies the smallest, most impactful habits that remain achievable during movement — helping stabilise your biology even when nothing else is stable.",
  },
];

export function TravelerFAQ() {
  return <FAQSection title="Frequently Asked Questions" faqs={faqs} />;
}



