"use client";

import { FAQSection } from "./FAQSection";

const faqs = [
  {
    q: "How does menopause affect my biomarkers?",
    a: "Menopause triggers shifts in estrogen, progesterone, cortisol, insulin sensitivity, inflammation markers, cardiovascular risk factors, bone density markers, and metabolic rate. The Arc tracks these changes and provides personalised guidance to stabilise each system as your hormones evolve.",
  },
  {
    q: "Will my plan change as my hormones shift?",
    a: "Yes. Your plan updates monthly based on your biomarker trends. As your hormones recalibrate, your routines, nutrition, sleep protocols, and screening schedule adapt to support your current biological state.",
  },
  {
    q: "Do I need hormone therapy to use The Arc?",
    a: "No. The Arc works whether you're using hormone therapy, natural approaches, or no intervention. We help you understand your biomarkers and provide evidence-based guidance that supports your chosen path.",
  },
  {
    q: "What if my symptoms fluctuate?",
    a: "Fluctuation is normal during perimenopause and menopause. Your plan accounts for variability and provides stability anchors — sleep protocols, stress management, metabolic support — that help smooth out the peaks and valleys.",
  },
  {
    q: "Can The Arc help with sleep issues?",
    a: "Yes. Sleep disruption is one of the most common menopause challenges. Your plan includes personalised sleep architecture protocols, temperature regulation strategies, and circadian anchors designed specifically for hormonal transitions.",
  },
  {
    q: "Do I need specific labs?",
    a: "Your Precision Screening Plan identifies exactly which tests matter for your biology — hormonal panels, cardiovascular markers, metabolic indicators, inflammation tests, bone density, and cognitive markers. You can access these through our global marketplace.",
  },
  {
    q: "How long until I see improvements?",
    a: "Many women notice improvements in energy, sleep quality, mood stability, and cognitive clarity within 6–12 weeks. Hormonal stabilisation and metabolic improvements typically become more evident by months 3–6.",
  },
  {
    q: "What if I'm in perimenopause, not menopause yet?",
    a: "The Arc is designed for the entire transition — from early perimenopause through postmenopause. Early detection and intervention during perimenopause can significantly improve your experience and long-term health outcomes.",
  },
];

export function WomenFAQ() {
  return <FAQSection title="Frequently Asked Questions" faqs={faqs} />;
}

