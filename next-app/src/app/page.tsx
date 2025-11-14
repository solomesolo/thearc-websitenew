"use client";

import Link from "next/link";
import React from "react";
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
import PlanCard from "../components/PlanCard";
import CTAButton from "../components/CTAButton";

export default function HomePage() {
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
      <Section id="how-it-works">
        <SectionTitle className="text-center mb-16">How It Works</SectionTitle>
        <div className="grid-four-column mb-12">
          {[
            {
              step: "1",
              title: "Free check",
              desc: "See which blood screenings you miss."
            },
            {
              step: "2",
              title: "Full assessment",
              desc: "Get your personal health map."
            },
            {
              step: "3",
              title: "Your plan",
              desc: "Follow a simple 6-month plan."
            },
            {
              step: "4",
              title: "Learn what works",
              desc: "See real results."
            }
          ].map((item, i) => (
            <Card key={i} className="text-center">
              <div className="text-4xl font-bold text-[#4DE4C1] mb-4">{item.step}</div>
              <h3 className="text-2xl font-semibold mb-4 text-white">{item.title}</h3>
              <Paragraph>{item.desc}</Paragraph>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <CTAButton href="/free-screening" variant="primary">
            Start free screening
          </CTAButton>
        </div>
      </Section>

      {/* 3️⃣ Philosophy / The Arc Difference */}
      <Section background="black">
        <TwoColumn
          left={
            <ImagePlaceholder 
              height="500px" 
              label="Image: Calm human silhouette + moving circular glow"
            />
          }
          right={
            <div>
              <SectionTitle>You discover. We guide.</SectionTitle>
              <Paragraph className="mb-8" style={{ fontSize: '22px' }}>
                We help you find your health formula through clinical precision, clear steps, and feedback that teaches you what really improves your wellbeing.
              </Paragraph>
              <CTAButton href="#how-it-works" variant="secondary">
                How it works
              </CTAButton>
          </div>
          }
        />
      </Section>

      {/* 4️⃣ Three Personas Section */}
      <Section id="personas">
        <SectionTitle className="text-center mb-16">Find Your Path</SectionTitle>
        <div className="grid-three-column">
          <PersonaCard
            title="Busy Professionals"
            description="For those who optimize everything except their recovery."
            href="/achiever"
          />
          <PersonaCard
            title="Travellers & Nomads"
            description="Stay balanced wherever the world takes you."
            href="/explorer"
          />
          <PersonaCard
            title="Health Rebuilders"
            description="Rebuild your health with precision and care."
            href="/seeker"
          />
          </div>
      </Section>

      {/* 5️⃣ Plans & Pricing */}
      <Section id="plans" background="black">
        <SectionTitle className="text-center mb-16">Plans & Pricing</SectionTitle>
        <div className="grid-three-column mb-12" style={{ maxWidth: '960px', margin: '0 auto' }}>
          <PlanCard
            name="Starter"
            price="99"
            period="6 months"
            highlights={[
              "Free screening",
              "Health map",
              "6-month plan",
              "Basic support"
            ]}
            ctaHref="/checkout/self"
          />
          <PlanCard
            name="Education"
            price="199"
            period="6 months"
            highlights={[
              "Everything in Starter",
              "Closed sessions",
              "Advanced insights",
              "Priority support"
            ]}
            featured={true}
            ctaHref="/checkout/education"
          />
          <PlanCard
            name="Care"
            price="399"
            period="6 months"
            highlights={[
              "Everything in Education",
              "Medical consultations",
              "Personalized care",
              "Dedicated support"
            ]}
            waitlist={true}
          />
        </div>
          <div className="text-center">
          <CTAButton href="/free-screening" variant="secondary">
            Start with free screening
          </CTAButton>
                  </div>
      </Section>

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
