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

      {/* 3️⃣ How The Arc Supports You */}
      <section className="how-arc-supports">
        <h2 className="section-title">How The Arc Supports You</h2>
        <p className="section-subtitle">
          We become your consistent health system — designed for your life.
        </p>

        <div className="supports-grid">
          {/* LEFT SIDE */}
          <div>
            <div className="supports-item fade-up">
              <h3>Reveal your personal predispositions</h3>
              <p>Get a clinical-level overview of hidden patterns, early risks, and core biomarkers that influence your health, energy, and resilience.</p>
            </div>

            <div className="supports-item fade-up">
              <h3>Get your health map</h3>
              <p>See exactly how your lifestyle affects your biology and where your strengths and weaknesses lie.</p>
            </div>
          </div>

          {/* CIRCLE CENTER */}
          <div>
            <img src="/circle.png" alt="Arc Symbol" className="supports-circle fade-up" />
          </div>

          {/* RIGHT SIDE */}
          <div>
            <div className="supports-item fade-up">
              <h3>Follow a personalised roadmap</h3>
              <p>Each month gives you small, high-impact routines — nutrition, sleep, stress, recovery — designed to fit into your life.</p>
          </div>

            <div className="supports-item fade-up">
              <h3>Track meaningful progress</h3>
              <p>At the end of 6 months, see what changed inside your body and which habits made the difference.</p>
        </div>
          </div>
        </div>
      </section>

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

      {/* 5️⃣ What You Get With The Arc */}
      <Section id="arc-value-section" className="pt-16 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 flex flex-col items-center">
            <SectionTitle className="text-4xl md:text-5xl font-semibold mb-3">
              What You Get With The Arc
            </SectionTitle>
            <p className="text-base text-gray-300 max-w-3xl mx-auto text-center leading-snug">
              Your personalised, clinically guided pathway to long-term health, clarity, and resilience — designed for real life.
          </p>
        </div>

          {/* Three Value Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {/* Card 1 - Clarity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-xl bg-[rgba(255,255,255,0.03)] border border-white/5 p-6 shadow-[0_4px_16px_rgba(0,0,0,0.15)] flex flex-col gap-2 max-w-[400px] mx-auto hover:shadow-[0_0_24px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 transition-all"
            >
              <div className="h-12 flex items-center justify-center mb-1">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4DEECD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 w-10 h-10 md:w-[40px] md:h-[40px]">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
          </div>
              <h3 className="text-lg font-bold text-white leading-tight">
                Clarity that unlocks performance
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Understand the patterns that shape your energy, focus, and stress. Know exactly where you stand — and what to do next.
              </p>
            </motion.div>

            {/* Card 2 - Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="rounded-xl bg-[rgba(255,255,255,0.03)] border border-white/5 p-6 shadow-[0_4px_16px_rgba(0,0,0,0.15)] flex flex-col gap-2 max-w-[400px] mx-auto hover:shadow-[0_0_24px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 transition-all"
            >
              <div className="h-12 flex items-center justify-center mb-1">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4DEECD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 w-10 h-10 md:w-[40px] md:h-[40px]">
                  <path d="M12 2c-2 0-4 2-4 4v4c0 2 2 4 4 4s4-2 4-4V6c0-2-2-4-4-4z" />
                  <path d="M12 14c-2 0-4 2-4 4v4c0 2 2 4 4 4s4-2 4-4v-4c0-2-2-4-4-4z" />
                  <path d="M8 6h8M8 18h8" />
                  <path d="M12 2v4M12 18v4" />
                </svg>
                    </div>
              <h3 className="text-lg font-bold text-white leading-tight">
                A plan tailored to your biology
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Each month brings simple, high-impact actions designed around your biomarkers and lifestyle — not generic routines.
              </p>
            </motion.div>

            {/* Card 3 - Prevention */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="rounded-xl bg-[rgba(255,255,255,0.03)] border border-white/5 p-6 shadow-[0_4px_16px_rgba(0,0,0,0.15)] flex flex-col gap-2 max-w-[400px] mx-auto hover:shadow-[0_0_24px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 transition-all"
            >
              <div className="h-12 flex items-center justify-center mb-1">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4DEECD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 w-10 h-10 md:w-[40px] md:h-[40px]">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                  </div>
              <h3 className="text-lg font-bold text-white leading-tight">
                Prevention, done right
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Learn which screenings matter for you and use data to catch issues early, before they affect performance or wellbeing.
              </p>
            </motion.div>
                </div>

          {/* Comparison Section */}
          <div className="pt-12 pb-16 bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.01)] to-transparent">
            <h3 className="text-[28px] font-semibold text-white text-center mb-6">
              How The Arc Compares
            </h3>
            
            <div className="rounded-xl bg-[rgba(255,255,255,0.02)] p-8 border border-white/5 max-w-[1000px] mx-auto shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
              <div className="grid grid-cols-2 gap-6 items-start">
                {/* Left Column */}
                <div className="space-y-3">
                  <div className="text-base font-semibold text-gray-400 mb-3 pb-2 border-b border-white/5">Typical Apps / Generic Plans</div>
                  <div className="flex items-start gap-2.5 text-gray-300 text-sm py-2 border-b border-white/5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    <span>Generic habits that don't fit your life</span>
                    </div>
                  <div className="flex items-start gap-2.5 text-gray-300 text-sm py-2 border-b border-white/5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    <span>No insight into your biology</span>
                    </div>
                  <div className="flex items-start gap-2.5 text-gray-300 text-sm py-2 border-b border-white/5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    <span>No prevention, only reaction</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-gray-300 text-sm py-2 border-b border-white/5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    <span>Too many routines that don't create change</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-gray-300 text-sm py-2 border-b border-white/5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    <span>No data-driven feedback</span>
                </div>
                  <div className="flex items-start gap-2.5 text-gray-300 text-sm py-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    <span>Not designed for high-pressure environments</span>
              </div>
                    </div>

                {/* Right Column */}
                <div className="space-y-3">
                  <div className="text-base font-semibold text-white mb-3 pb-2 border-b border-white/5">The Arc</div>
                  <div className="flex items-start gap-2.5 text-white text-sm py-2 border-b border-white/5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38E6B0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Built around your biomarkers and workload</span>
                    </div>
                  <div className="flex items-start gap-2.5 text-white text-sm py-2 border-b border-white/5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38E6B0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Full predisposition and risk mapping</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-white text-sm py-2 border-b border-white/5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38E6B0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Prevention-first model + screening guidance</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-white text-sm py-2 border-b border-white/5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38E6B0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Small, high-impact monthly actions</span>
                </div>
                  <div className="flex items-start gap-2.5 text-white text-sm py-2 border-b border-white/5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38E6B0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Clear feedback on what improves performance</span>
              </div>
                  <div className="flex items-start gap-2.5 text-white text-sm py-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38E6B0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Designed for people with demanding schedules</span>
            </div>
          </div>
                </div>
              </div>

            {/* CTA */}
            <div className="text-center mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <h4 className="text-2xl font-semibold text-white mb-5">
                  Find your personal health formula
                </h4>
                <Link
                  href="/free-screening"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-black text-[#4DEECD] border border-white/20 text-base font-medium tracking-tight transition-all duration-200 hover:border-white/30 hover:text-[#4DEECD] hover:bg-black"
                >
                  Start free screening
                </Link>
              </motion.div>
              </div>
            </div>
                </div>
      </Section>

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
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-black text-[#4DEECD] border border-white/20 text-base font-medium tracking-tight transition-all duration-200 hover:border-white/30 hover:text-[#4DEECD] hover:bg-black"
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
