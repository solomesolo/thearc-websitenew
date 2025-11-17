"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Header from "../components/Header";
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
import { PricingSection } from "../components/pricing/PricingSection";

const personaCards = [
  {
    title: "Busy Professionals",
    description: "For those who optimize everything except their recovery.",
    href: "/achiever",
  },
  {
    title: "Travellers & Nomads",
    description: "Stay balanced wherever the world takes you.",
    href: "/explorer",
  },
  {
    title: "Health Rebuilders",
    description: "Rebuild your health with precision and care.",
    href: "/seeker",
  },
];

export default function HomePage() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLAnchorElement>(".path-card"));

    const listeners: Array<{
      card: HTMLAnchorElement;
      handleMouseMove: (event: MouseEvent) => void;
      handleMouseLeave: () => void;
      handleResize: () => void;
    }> = [];

    cards.forEach((card) => {
      const spotlight = card.querySelector<HTMLDivElement>(".spotlight");
      if (!spotlight) return;

      let rect = card.getBoundingClientRect();
      const updateRect = () => {
        rect = card.getBoundingClientRect();
      };

      const handleMouseMove = (event: MouseEvent) => {
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const midX = rect.width / 2;
        const midY = rect.height / 2;

        const rotateX = ((y - midY) / midY) * 4;
        const rotateY = ((x - midX) / midX) * -4;

        card.style.transform = `
          perspective(900px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-6px)
          scale(1.02)
        `;

        spotlight.style.opacity = "1";
        spotlight.style.background = `
          radial-gradient(
            350px circle at ${x}px ${y}px,
            rgba(255,255,255,0.14),
            rgba(255,255,255,0.06) 35%,
            rgba(255,255,255,0) 70%
          )
        `;
      };

      const handleMouseLeave = () => {
        card.style.transform =
          "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
        spotlight.style.opacity = "0";
      };

      const handleResize = () => updateRect();

      window.addEventListener("resize", handleResize);
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      listeners.push({ card, handleMouseLeave, handleMouseMove, handleResize });
    });

    return () => {
      listeners.forEach(({ card, handleMouseLeave, handleMouseMove, handleResize }) => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
        window.removeEventListener("resize", handleResize);
      });
    };
  }, []);

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
      {/* Navigation Header */}
      <Header />

      {/* 1️⃣ Hero Section */}
      <Hero
        title="Find your own health formula."
        subtitle="Understand what works for your body through clinical precision, clear steps, and personal feedback."
        primaryCTA={{ label: "Start free screening", href: "/free-screening" }}
        secondaryCTA={{ label: "See plans", href: "#plans" }}
      />

      {/* 2️⃣ How It Works (4 Steps) */}
      <section className="w-full bg-black text-white py-28">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-6">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-gray-300 text-center max-w-2xl mb-28">
            A simple, science-driven process that shows you exactly what your body needs and helps you build habits that truly work.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 w-full mt-8">
            <div className="hw-card-magnetic bg-[#141414] p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="spotlight" aria-hidden="true" />
              <div className="relative z-10 flex flex-col items-start space-y-5 text-left">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-2xl font-semibold">
                  01
                </div>
                <div className="w-10 h-10 opacity-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-10 h-10 text-white/70"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m4 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
        </div>
                <h3 className="text-xl font-semibold">Free check</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Start with a quick, clinical-grade screening that shows which essential blood tests you are missing. No registration needed, no complexity, just a clear picture of what your body has not been checked for yet.
                </p>
          </div>
          </div>

            <div className="hw-card-magnetic bg-[#141414] p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="spotlight" aria-hidden="true" />
              <div className="relative z-10 flex flex-col items-start space-y-5 text-left">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-2xl font-semibold">
                  02
        </div>
                <div className="w-10 h-10 opacity-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-10 h-10 text-white/70"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5h6m-6 4h6m-6 4h6m-6 4h6M7 3v2m10-2v2m-9 4h8m-8 4h6m-7 6h10a2 2 0 002-2V7H5v10a2 2 0 002 2z"
                    />
                  </svg>
        </div>
                <h3 className="text-xl font-semibold">Full assessment</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Complete our validated questionnaire to get a personal health map. It highlights your potential risks, strengths, lifestyle gaps, and predispositions while giving you a clear snapshot of where your health stands today.
            </p>
        </div>
                  </div>
          
            <div className="hw-card-magnetic bg-[#141414] p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="spotlight" aria-hidden="true" />
              <div className="relative z-10 flex flex-col items-start space-y-5 text-left">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-2xl font-semibold">
                  03
                  </div>
                <div className="w-10 h-10 opacity-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-10 h-10 text-white/70"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V5m8 2V5m-9 4h10m-7 4l2 2 3-3m-2 7H7a2 2 0 01-2-2V9h14v10a2 2 0 01-2 2z"
                    />
                  </svg>
              </div>
                <h3 className="text-xl font-semibold">Your 6-month plan</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We create a personalised plan built around your body’s needs. You get a month-by-month path including screenings, nutrition guidance, lifestyle routines, and practical steps that fit real life.
                </p>
                </div>
              </div>

            <div className="hw-card-magnetic bg-[#141414] p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="spotlight" aria-hidden="true" />
              <div className="relative z-10 flex flex-col items-start space-y-5 text-left">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-2xl font-semibold">
                  04
                </div>
                <div className="w-10 h-10 opacity-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-10 h-10 text-white/70"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13h4v8H3zm7-6h4v14h-4zm7 8h4v6h-4z"
                    />
                  </svg>
              </div>
                <h3 className="text-xl font-semibold">Learn what works for you</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  At the end of six months, you receive renewed insights that show which habits and interventions truly improved your wellbeing — helping you build your own long-term health formula.
                </p>
            </div>
                </div>
              </div>

          <div className="w-full flex justify-center mt-24">
            <a
              href="/free-screening"
              className="px-10 py-4 bg-white text-black rounded-full text-lg font-semibold hover:bg-gray-200 transition"
            >
              Start free screening
            </a>
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
      <Section id="personas" className="pt-32">
        <SectionTitle className="text-center mb-16 text-4xl font-semibold tracking-tight">
          Find Your Path
        </SectionTitle>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 mb-32"
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
        <SectionTitle className="text-center mb-16">Service Catalog</SectionTitle>
        <Card className="text-center">
          <Paragraph className="mb-8" style={{ fontSize: '20px' }}>
            Browse our curated selection of health and wellness services from certified partners.
          </Paragraph>
          <CTAButton href="/catalog" variant="primary">
            Browse catalog
          </CTAButton>
        </Card>
      </Section>

      {/* 7️⃣ Future Vision / Roadmap */}
      <Section background="black">
        <SectionTitle className="text-center mb-16">What's next for The Arc</SectionTitle>
        
        {/* Soft curved line background */}
        <div className="relative mb-12">
          <div className="flex items-center justify-center h-64 mb-12">
            <svg width="300" height="300" viewBox="0 0 300 300" className="absolute opacity-30">
              <path
                d="M 150 50 Q 200 100 250 150 T 150 250"
                fill="none"
                stroke="#4DE4C1"
                strokeWidth="2"
                className="animate-pulse"
              />
              <path
                d="M 150 50 Q 100 100 50 150 T 150 250"
                fill="none"
                stroke="#4DE4C1"
                strokeWidth="2"
                className="animate-pulse"
                style={{ animationDelay: '0.5s' }}
              />
            </svg>
          </div>
        </div>

        {/* Three bullet points as text (no icons) */}
        <div className="grid-three-column mb-12" style={{ maxWidth: '960px', margin: '0 auto' }}>
          {[
            "Knowledge Base for learning",
            "Access to certified specialists",
            "New health data integrations"
          ].map((item, i) => (
            <Card key={i} className="text-center">
              <Paragraph style={{ fontSize: '18px' }}>{item}</Paragraph>
            </Card>
                ))}
        </div>

          <div className="text-center">
          <CTAButton href="/early-access" variant="secondary">
            Join early access
          </CTAButton>
            </div>
      </Section>

      {/* 8️⃣ Final Call to Action */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
            <SectionTitle className="mb-6">Begin your Arc today.</SectionTitle>
            <Paragraph className="mb-10" style={{ fontSize: '22px' }}>
              Find your own formula. See what works for you. Keep what matters.
            </Paragraph>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
