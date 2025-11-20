"use client";

import Link from "next/link";
import Section from "../../components/Section";
import SectionTitle from "../../components/SectionTitle";
import { HowItWorksSection } from "../../components/HowItWorksSection";
import TravelerPersonaSection from "../../components/TravelerPersonaSection";

const travelerChallengesDetailed = [
  "Jet lag and sleep cycles that never fully reset",
  "Digestion that changes with every new country",
  "Immune dips during border crossings",
  "No doctor who knows your long-term picture",
  "Screenings missed for years because you never stay put",
  "Medical files scattered across countries",
  "Fatigue that hits mid-trip when you need clarity most",
];

const travelerSystemDisruptions = [
  "Circadian rhythms lose stability",
  "Hormonal cycles shift with sleep disruption",
  "Digestive rhythm resets every few weeks",
  "Immunity drops during transitions",
  "Recovery windows shrink as environments change",
];

const travelerContinuityBreaks = [
  "Each country resets the rules and the paperwork",
  "No central medical file follows you",
  "No long-term doctor-patient relationship",
  "Preventative schedules collapse without continuity",
  "Systems treat symptoms, not long-term risks",
  "Your data disappears every time you leave",
];

const travelerSolutions = [
  {
    title: "Reveal how travel impacts your biology",
    text: "Deep screening across immunity, sleep, digestion, stress, inflammation, longevity markers, and recovery patterns.",
  },
  {
    title: "Build your global health baseline",
    text: "Create one medical profile that stays with you — not the country you just left.",
  },
  {
    title: "Get personalised, travel-proof routines",
    text: "Circadian resets, immune support, digestive stability, portable nutrition, and micro-recovery habits for travel days.",
  },
  {
    title: "Stay guided every month",
    text: "We track your biomarkers over time and adjust your plan as your lifestyle evolves.",
  },
  {
    title: "A doctor who knows you — across borders",
    text: "Wherever you live next month, we follow your data, your risks, and your progress.",
  },
];

const travelerSteps = [
  { number: "01", title: "Free check", text: "Identify missing screenings and risks." },
  {
    number: "02",
    title: "Full assessment",
    text: "Map travel patterns, stress loads, sleep profile, and biological weak points.",
  },
  { number: "03", title: "Your 6-month plan", text: "Portable, simple, longevity-focused guidance." },
  { number: "04", title: "Insights update", text: "Track how your body adapts and stabilises over time." },
];

const travelerWhyItWorks = [
  "One medical system that follows you",
  "Portability across countries",
  "Routines that stabilise your biology",
  "Stronger immunity on the move",
  "Predictable screenings and health monitoring",
  "At-home medical services worldwide",
  "A lifespan strategy built for global living",
];

export default function TravelerPage() {
  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-black">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("/hero-background-traveler.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "calc(100% + 80px) center",
          }}
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent" />

        <div className="relative max-w-[1320px] mx-auto px-6 lg:px-10 py-[140px] min-h-[90vh] grid lg:grid-cols-[55%_45%] gap-10 lg:gap-[70px] items-center">
          <div className="flex flex-col gap-5 lg:col-span-1">
            <p className="text-[13px] tracking-[0.35em] uppercase text-white/55" data-hero-fade="label">
              Explorer Persona
            </p>
            <h1
              className="text-[32px] md:text-[40px] lg:text-[50px] leading-[1.1] font-semibold text-white max-w-[560px]"
              data-hero-fade="headline"
            >
              Your lifestyle moves. Your health should stay steady. Anywhere.
            </h1>
            <p className="text-[13.5px] md:text-[16px] lg:text-[18px] leading-[1.6] text-white/75 italic" data-hero-fade="body">
              Do you ever feel like you live everywhere — except inside a healthcare system that truly knows you?
            </p>
            <p className="text-[13.5px] md:text-[16px] lg:text-[18px] leading-[1.6] text-white/75" data-hero-fade="body">
              Your life moves across borders. New cities. New routines. New climates. But every time you land somewhere new,
              you start from zero again: a new medical system, a doctor who doesn’t know your history, unfamiliar insurance
              forms and waiting lists. You live globally — yet your health feels scattered.
            </p>
            <p className="text-[13.5px] md:text-[16px] lg:text-[18px] leading-[1.6] text-white/80" data-hero-fade="body">
              At The Arc, we give you <strong>one consistent health blueprint</strong> that travels with you. A single medical baseline.
              A single set of screenings. A single team that understands your biology — no matter the continent.
            </p>
            <p className="text-[13.5px] md:text-[16px] lg:text-[18px] leading-[1.6] text-white/75" data-hero-fade="body">
              Because your lifespan shouldn’t shrink just because your world is big.
            </p>
            <div className="mt-5 sm:mt-6 lg:mt-8" data-hero-fade="cta">
              <Link
                href="/free-screening"
                className="inline-flex items-center justify-center px-9 py-4 rounded-[32px] bg-[#2EF0C2] text-black font-semibold tracking-wide transition-all duration-200 border border-transparent hover:bg-transparent hover:text-[#2EF0C2] hover:border-[#2EF0C2]"
              >
                Start free screening
              </Link>
            </div>
          </div>
          <div className="hidden lg:block" />
        </div>
      </section>

      <TravelerPersonaSection />

      <Section>
        <div className="space-y-6 max-w-4xl mx-auto text-left">
          <SectionTitle className="text-left">
            Challenges You May Recognise
          </SectionTitle>
          <p className="text-white/70 text-lg italic">
            Does any of this feel uncomfortably familiar?
          </p>
          <div className="space-y-3 text-white/80 text-base leading-relaxed">
            {travelerChallengesDetailed.map((item) => (
              <p key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40" />
                <span>{item}</span>
              </p>
            ))}
          </div>
          <p className="text-white/75 text-base leading-relaxed font-medium">
            You’re not “unhealthy.” You’re <span className="text-white font-semibold">under-supported</span> for the life you live.
          </p>
        </div>
      </Section>

      <Section>
        <div className="space-y-10">
          <SectionTitle className="text-left">
            Why This Happens
          </SectionTitle>
          <p className="text-white/75 text-lg italic">
            The world changes around you faster than your biology can adapt.
          </p>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Travel disrupts core stability systems</h3>
              <div className="space-y-3 text-white/80 text-base leading-relaxed">
                {travelerSystemDisruptions.map((item) => (
                  <p key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/35" />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">A broken continuity of care</h3>
              <div className="space-y-3 text-white/80 text-base leading-relaxed">
                {travelerContinuityBreaks.map((item) => (
                  <p key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#4DE4C1]/35" />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
              <p className="text-white/70 text-base leading-relaxed">
                It’s not your discipline. It’s the design of global healthcare.
              </p>
            </div>
          </div>
          <p className="text-white/70 text-base leading-relaxed">
            You’re living a modern lifestyle with a medical system built for people who never move.
          </p>
        </div>
      </Section>

      {/* How The Arc Helps */}
      <Section>
        <div className="flex flex-col gap-12">
          <SectionTitle className="text-left">
            How The Arc Supports You
          </SectionTitle>
          <p className="text-white/75 leading-relaxed italic max-w-3xl text-lg">
            We become your consistent health system — wherever you go.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {travelerSolutions.map((solution) => (
              <div key={solution.title} className="p-8 border border-white/10 rounded-2xl bg-transparent">
                <h3 className="text-2xl font-semibold mb-3">
                  {solution.title}
                </h3>
                <p className="text-white/75 leading-relaxed">
                  {solution.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <HowItWorksSection
        description="A structured, global-first process designed for people who live everywhere."
        steps={travelerSteps}
      />

      {/* Why It Works */}
      <Section>
        <div className="space-y-8 max-w-4xl">
          <SectionTitle className="text-left">
            Why It Works for Travellers
          </SectionTitle>
          <p className="text-white/70 italic text-lg">
            One medical partner. One continuity plan. Wherever you live next.
          </p>
          <ul className="space-y-3 text-gray-300 text-lg">
            {travelerWhyItWorks.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <SectionTitle>
            Start building stability
          </SectionTitle>
          <p className="text-white/75 leading-relaxed">
            Your lifestyle is global. Your health can be too.
          </p>
          <Link
            href="/free-screening"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-white text-black font-semibold tracking-wide hover:bg-gray-200 transition"
          >
            Start free screening
          </Link>
        </div>
      </Section>
    </main>
  );
}

