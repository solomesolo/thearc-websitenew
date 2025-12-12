"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { ScatteredKineticSection } from "../components/ScatteredKineticSection";
import { ArcOperatingSystemSection } from "@/components/ArcOperatingSystemSection";
import { ArcOSCanvasSection } from "../components/ArcOSCanvasSection";
import HealthIntelligenceSystem from "../sections/HealthIntelligenceSystem";
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
import { HowItWorksSection } from "../components/HowItWorksSection";
import { FAQSection } from "../components/sections/FAQSection";

const personaCards = [
  {
    title: "Women in Menopause",
    struggles: "Hormone shifts, energy crashes, sleep disruption, mood variability, weight changes, brain fog.",
    promise:
      "A clinically guided view of what your body is signalling, plus personalised routines and screenings designed specifically for women in midlife transition.",
    href: "/women",
    cta: "See how this works for women →",
  },
  {
    title: "Global Movers",
    struggles: "Health fragmentation, missing medical records, new healthcare systems, unpredictable stress, and loss of continuity.",
    promise:
      "A unified health identity, clear risk picture, and a portable roadmap that keeps your biology stable during major life transitions.",
    href: "/traveler",
    cta: "See how this works for global movers →",
  },
  {
    title: "Health Rebuilders",
    struggles: "Unstable energy, unexplained symptoms, chronic stress, weight changes, or feeling \"not quite right.\"",
    promise:
      "Clinically informed clarity and a personalised path to restore stability, strength, and resilience.",
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
      <HeroSection
        title="Your Health Needs an Operating System. So We Built One."
        subtitle="ARC unifies everything you know about your body into one intelligent system that detects risks early, adapts to your life, and guides you with medical precision."
        bullets={["Not an app.", "Not a program.", "Your personal HealthOS."]}
        primaryCTA={{ label: "Start Free Screening →", href: "/free-screening" }}
        secondaryCTA={{ label: "Explore ARC Marketplace →", href: "/marketplace" }}
        image={{ src: "/header main page.png", alt: "The Arc cinematic hero" }}
      />
      <ScatteredKineticSection />
      <HealthIntelligenceSystem />
      <ArcOperatingSystemSection />

      {/* You discover. We guide. Section */}
      <section className="guidance-hero">
        <motion.div
          className="guidance-content text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <h2 className="text-center">
            You discover.
            <br />
            We guide.
          </h2>
          <p className="text-center">
            We help you find your own health formula through clinical precision, clear steps, and personal feedback that shows you what truly improves your wellbeing.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <Link
              href="#personas"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-black text-[#4DEECD] border border-white/20 text-base font-medium tracking-tight transition-all duration-200 hover:border-white/30 hover:text-[#4DEECD] hover:bg-black"
            >
              Find your path
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 2️⃣ Intelligence Journey → OS Canvas → How It Works */}
      <ArcOSCanvasSection />
      <HowItWorksSection />

      {/* 3️⃣ Three Personas Section */}
      <Section id="personas">
        <div className="mb-12" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <SectionTitle className="text-center text-4xl font-semibold tracking-tight">
              Find Your Path
            </SectionTitle>
          </div>
        </div>
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

      {/* 6️⃣ Service Catalog Highlight */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="mb-12" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
              <SectionTitle className="text-center text-4xl font-bold">Service Catalog</SectionTitle>
            </div>
          </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-4 text-gray-300 text-base leading-relaxed">
              <p>Your gateway to at-home diagnostics, lab testing, expert sessions, and restorative experiences curated by clinicians.</p>
              <p>Every service connects back to your plan so you know what matters, what's available now, and what unlocks next.</p>
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
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-black text-[#4DEECD] border border-white/20 text-base font-medium tracking-tight transition-all duration-200 hover:border-white/30 hover:text-[#4DEECD] hover:bg-black"
          >
            Explore the Catalog
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-black text-[#4DEECD] border border-white/20 text-base font-medium tracking-tight transition-all duration-200 hover:border-white/30 hover:text-[#4DEECD] hover:bg-black"
          >
            Partner With Us
          </Link>
        </div>
        </div>
      </Section>

      {/* 7️⃣ Future Vision / Roadmap */}
      <Section background="black">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
              <SectionTitle className="text-center text-4xl font-bold">
                What's next for The Arc
              </SectionTitle>
            </div>
            <p className="text-neutral-300 text-base leading-relaxed max-w-3xl mx-auto mt-10" style={{ textAlign: 'center' }}>
              We're shipping fast. The Arc is evolving from personalised insights into a complete
              platform with learning, expert access, and connected data so you always know what to do next.
            </p>
          </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            {/* Left side can be used for additional content if needed */}
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
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-black text-[#4DEECD] border border-white/20 text-base font-medium tracking-tight transition-all duration-200 hover:border-white/30 hover:text-[#4DEECD] hover:bg-black"
          >
            Join early access
          </Link>
        </div>
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
        <div className="max-w-3xl mx-auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
              <SectionTitle className="text-center">Begin your Arc today.</SectionTitle>
            </div>
            <Paragraph className="mt-10" style={{ fontSize: '22px', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
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
