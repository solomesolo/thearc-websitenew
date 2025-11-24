"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Section from "../components/Section";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Paragraph from "../components/Paragraph";
import Card from "../components/Card";
import TwoColumn from "../components/TwoColumn";
import ImagePlaceholder from "../components/ImagePlaceholder";
import PersonaCard from "../components/PersonaCard";
import CTAButton from "../components/CTAButton";
import Link from "next/link";
import { PricingSection } from "../components/pricing/PricingSection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { FAQSection } from "../components/sections/FAQSection";

const personaCards = [
  {
    title: "Busy Professionals",
    struggles: "Stress buildup, irregular sleep, low energy, and early signs of burnout.",
    promise:
      "A clear picture of what your body is missing and practical ways to restore energy without slowing down your life.",
    href: "/professional",
    cta: "See how this works for professionals →",
  },
  {
    title: "Travellers & Nomads",
    struggles: "Disrupted sleep, weak immunity, and fatigue from constant movement.",
    promise:
      "Insights into how travel affects your body and personalised routines that keep you energised and balanced wherever you are.",
    href: "/traveler",
    cta: "See how this works for travellers →",
  },
  {
    title: "Health Rebuilders",
    struggles: "Unexplained tiredness, weight changes, chronic stress, or lingering symptoms.",
    promise:
      "Clinically guided clarity and a personalised plan to rebuild stability, strength, and confidence.",
    href: "/rebuilder",
    cta: "See how this works for rebuilding your health →",
  },
];

export default function HomePage() {
  useEffect(() => {
    const hwCards = Array.from(document.querySelectorAll<HTMLDivElement>(".hw-card-magnetic"));
    if (!hwCards.length) return;

    const hoverHandlers: Array<{
      card: HTMLDivElement;
      handleMouseMove: (event: MouseEvent) => void;
      handleMouseLeave: () => void;
    }> = [];

    hwCards.forEach((card, index) => {
      const spotlight = card.querySelector<HTMLDivElement>(".spotlight");
      if (!spotlight) {
        return;
      }

      card.style.transitionDelay = `${index * 0.08}s`;

      const handleMouseMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        spotlight.style.left = `${x}px`;
        spotlight.style.top = `${y}px`;
        spotlight.style.opacity = "1";

        const moveX = (x - rect.width / 2) * 0.03;
        const moveY = (y - rect.height / 2) * 0.03;
        card.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.015)`;
      };

      const handleMouseLeave = () => {
        card.style.transform = "";
        if (spotlight) {
          spotlight.style.opacity = "0";
        }
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      hoverHandlers.push({ card, handleMouseLeave, handleMouseMove });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    hwCards.forEach((card) => observer.observe(card));

    return () => {
      hoverHandlers.forEach(({ card, handleMouseLeave, handleMouseMove }) => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      });
      observer.disconnect();
    };
  }, []);
  const personaGridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const personaCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

    return (
    <div className="min-h-screen bg-black text-white">
      {/* 1️⃣ Hero Section */}
      <Hero
        title="Find your own health formula."
        subtitle="Understand what works for your body through clinical precision, clear steps, and personal feedback."
        primaryCTA={{ label: "Start free screening", href: "/free-screening" }}
        secondaryCTA={{ label: "See plans", href: "#plans" }}
      />

      {/* 2️⃣ How It Works (4 Steps) */}
      <HowItWorksSection />

      <section className="guidance-hero">
        <motion.div
          className="guidance-content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <h2>You discover.<br />We guide.</h2>
          <p>
            We help you find your own health formula through clinical precision,
            clear steps, and personal feedback that shows you what truly improves
            your wellbeing.
          </p>
          <motion.button
            className="cta-secondary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            Find your path
          </motion.button>
        </motion.div>
      </section>

      {/* 4️⃣ Three Personas Section */}
      <Section id="personas">
        <SectionTitle className="text-center text-4xl font-semibold tracking-tight">
          Find Your Path
        </SectionTitle>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          variants={personaGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {personaCards.map((cardItem) => (
            <motion.div
              key={cardItem.href}
              variants={personaCardVariants}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <PersonaCard {...cardItem} />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 5️⃣ Plans & Pricing */}
      <PricingSection />

      {/* 6️⃣ Service Catalog Highlight */}
      <Section>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SectionTitle className="text-left text-4xl font-bold">Service Catalog</SectionTitle>
            <div className="space-y-4 text-gray-300 text-base leading-relaxed max-w-xl mt-10">
              <p>Your gateway to at-home diagnostics, lab testing, expert sessions, and restorative experiences curated by clinicians.</p>
              <p>Every service connects back to your plan so you know what matters, what’s available now, and what unlocks next.</p>
              <p>Filter by goal, location, time, budget, or medical guidance level — and find what fits wherever you are.</p>
              </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-y-12 gap-x-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {[
              {
                value: "120+",
                text: "Curated health and wellness services available worldwide.",
              },
              {
                value: "40+",
                text: "Global direct-to-consumer providers reviewed and verified.",
              },
              {
                value: "100+",
                text: "Specialized lab testing options covering every major biomarker category.",
              },
              {
                value: "All locations",
                text: "Find services near you with trusted reviews and transparent pricing.",
              },
            ].map((item) => (
              <motion.div
                key={item.value}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="text-6xl font-semibold text-white">{item.value}</div>
                <p className="text-lg text-neutral-300 mt-4 leading-snug">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
              </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Link
            href="/catalog"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold bg-teal-500 text-black hover:bg-teal-400 transition shadow-[0_15px_30px_rgba(0,255,200,0.25)]"
          >
            Explore the Catalog
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold border border-teal-400 text-teal-400 hover:bg-teal-400/10 transition"
          >
            Partner With Us
          </Link>
              </div>
      </Section>

      {/* 7️⃣ Future Vision / Roadmap */}
      <Section background="black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <SectionTitle className="text-left text-4xl font-bold">
              What's next for The Arc
            </SectionTitle>
            <p className="text-neutral-300 text-base leading-relaxed max-w-xl mt-10">
              We’re shipping fast. The Arc is evolving from personalised insights into a complete
              platform with learning, expert access, and connected data so you always know what to do next.
            </p>
                </div>

          <div className="border-l border-neutral-800 ml-4 pl-8 space-y-16">
            {[
              {
                label: "Now",
                title: "Knowledge Base for Learning",
                desc:
                  "Personalised, clinically guided content to help you understand tests, biomarkers and lifestyle changes.",
              },
              {
                label: "Next",
                title: "Access to Certified Specialists",
                desc:
                  "Book consultations with vetted clinicians, practitioners and health experts from around the world.",
              },
              {
                label: "Soon",
                title: "New Health Data Integrations",
                desc:
                  "Connect wearables, home diagnostic devices and lab results for a complete personal dashboard.",
              },
              {
                label: "Continuous",
                title: "Expanding Global Provider Network",
                desc:
                  "More trusted direct-to-consumer partners, more services, more locations — always growing.",
              },
            ].map((item) => (
              <div key={item.title} className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-sm text-neutral-500 uppercase tracking-wide">
                    {item.label}
                  </span>
              </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-neutral-300 leading-relaxed mt-1">{item.desc}</p>
            </div>
            ))}
            </div>
              </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/early-access"
            className="px-8 py-4 rounded-full text-base font-semibold border border-emerald-400 text-emerald-400 hover:bg-emerald-400/10 transition"
          >
            Join early access
          </Link>
            </div>
      </Section>

      {/* FAQ Section */}
      <FAQSection
        faqs={[
          {
            q: "What makes The Arc different from regular health apps?",
            a: "Most health apps rely on generic advice. The Arc uses clinical-grade analysis to reveal your personal predispositions, overlooked biological shifts, and the exact screenings that matter for you. It's the closest alternative to a longevity clinic — but accessible to everyone.",
          },
          {
            q: "Is this based on real medical science?",
            a: "Yes. Your roadmap is informed by validated biomarkers, clinician-informed guidelines, and evidence-based lifestyle protocols. Every recommendation is built to support metabolic health, inflammation control, circadian stability, and long-term risk reduction.",
          },
          {
            q: "Do I need to already be healthy or active?",
            a: "Not at all. The Arc works whether you're rebuilding your health or optimising an already healthy lifestyle. The system adapts to your age, symptoms, stress load, and personal goals.",
          },
          {
            q: "What screenings do you recommend?",
            a: "Screenings vary by persona and predisposition, but most plans include blood panels, inflammation markers, digestive markers, immune markers, and circadian assessments. You'll always see why each test is recommended — in simple, clinical language.",
          },
          {
            q: "How long until I see changes?",
            a: "Most users report noticeable changes in clarity, energy, digestion, or sleep within the first 3–6 weeks. The full system is built around measurable progress at the 6-month mark.",
          },
          {
            q: "Is this a medical service?",
            a: "The Arc provides clinically informed guidance. Our Care tier includes access to licensed professionals who review your plan, explain biomarkers, and supervise your progress.",
          },
          {
            q: "Is this suitable for travellers or people with irregular schedules?",
            a: "Yes. Many of our users move between cities or time zones. Your plan adjusts to your lifestyle and helps stabilise sleep, recovery, immunity, and stress.",
          },
          {
            q: "What if I'm not sure where to start?",
            a: "Start with the free screening. It reveals what you may be missing and shows the first steps toward clarity — with zero commitment.",
          },
        ]}
      />

      {/* 8️⃣ Final Call to Action */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
            <SectionTitle>Begin your Arc today.</SectionTitle>
            <Paragraph className="mt-10" style={{ fontSize: '22px' }}>
              Find your own formula. See what works for you. Keep what matters.
            </Paragraph>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <CTAButton href="/free-screening" variant="primary">
                Start free screening
              </CTAButton>
              <CTAButton href="#plans" variant="secondary">
                See plans
              </CTAButton>
          </div>
        </div>
      </Section>

      {/* 9️⃣ Footer */}
      <Footer />
        </div>
  );
}
