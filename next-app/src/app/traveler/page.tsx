"use client";

import Section from "../../components/Section";
import SectionTitle from "../../components/SectionTitle";
import { HowItWorksSection } from "../../components/HowItWorksSection";
import TravelerPersonaSection from "../../components/TravelerPersonaSection";
import TravelerHero from "../../components/TravelerHero";
import { ArcButton } from "../../components/ui/ArcButton";

const travelerChallengesDetailed = [
  "Jet lag and sleep cycles that never fully reset",
  "Digestion that shifts with every new country",
  "Immune dips at border crossings",
  "No doctor who knows your long-term health picture",
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

const travelerSupportPillars = [
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
];

const travelerSteps = [
  {
    number: "01",
    title: "Free check",
    text: "A fast, risk-spotting scan that shows what's missing in your screening history — and what needs attention now.",
  },
  {
    number: "02",
    title: "Full assessment",
    text: "A deep review of your travel patterns, recovery load, sleep, immunity, and long-term biological strengths & weak points.",
  },
  {
    number: "03",
    title: "Your 6-month plan",
    text: "A personalised, travel-proof roadmap that stabilises your biology and supports longevity — wherever you live next.",
  },
  {
    number: "04",
    title: "Insights update",
    text: "Monthly adjustments guided by your biomarkers, ensuring your plan evolves as your lifestyle moves.",
  },
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
  const leftPillars = travelerSupportPillars.slice(0, 2);
  const rightPillars = travelerSupportPillars.slice(2);

  return (
    <main className="bg-black text-white">
      <TravelerHero />

      <TravelerPersonaSection />

      <section className="relative w-full py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-white/40 tracking-[0.3em] uppercase text-xs md:text-sm mb-12">
            Challenges We Commonly See
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
            <div className="relative w-full h-[400px] md:h-[520px] lg:h-[600px] order-1 md:order-1">
              <img
                src="/header-explorer.png"
                alt="Global travelers with luggage"
                className="w-full h-full object-cover rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
              />
            </div>

            <div className="flex flex-col items-start space-y-8 max-w-xl order-2 md:order-2">
              <div className="space-y-3">
                <p className="uppercase tracking-[0.25em] text-white/60 text-xs md:text-sm">
                  Travellers & Nomads
                </p>
                <h2 className="text-4xl md:text-5xl font-semibold leading-[1.1]">
                  Challenges You May Recognise
                </h2>
                <p className="italic text-white/80 text-lg md:text-xl">
                  Does any of this feel uncomfortably familiar?
                </p>
              </div>

              <ul className="space-y-4 text-white/75 leading-relaxed">
                {travelerChallengesDetailed.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-white/40" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-white font-medium text-lg md:text-xl">
                You’re not “unhealthy.” You’re <span className="underline decoration-white/20">under-supported</span> for the life you live.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-this-happens">
        <div className="header">
          <h2>Why This Happens</h2>
          <p className="subtitle">
            The world changes around you faster than your biology can adapt.
          </p>
        </div>

        <div className="grid-container">
          <div className="col card">
            <div className="number">1</div>
            <h3>Your core systems destabilise</h3>
            <p>
              Travel disrupts the rhythms your biology depends on. Circadian timing loses its anchor, hormones shift with
              sleep disruption, digestion resets every few weeks, and immunity dips during each transition.
            </p>
            <div className="label">Travel Biology Impact</div>
          </div>

          <div className="col card">
            <div className="number">2</div>
            <h3>Care resets every time you cross borders</h3>
            <p>
              Each country brings a new system, new rules, and new paperwork. No central medical file follows you.
              Preventative schedules collapse without continuity, and relationships with doctors never form long enough to manage risks.
            </p>
            <div className="label">Continuity Breakdown</div>
          </div>

          <div className="col card">
            <div className="number">3</div>
            <h3>Healthcare wasn’t built for movers</h3>
            <p>
              Modern mobility exposes a system designed for one-location living. Symptoms get treated, not underlying
              patterns. Your data disappears every time you leave. It’s not your discipline — it’s outdated infrastructure.
            </p>
            <div className="label">Systemic Limitations</div>
          </div>
        </div>

        <p className="summary">
          You’re living a modern lifestyle with a medical system built for people who never move.
        </p>
      </section>

      {/* How The Arc Supports You */}
      <section className="w-full mt-32 mb-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            How The Arc Supports You
          </h2>
          <p className="mt-4 text-lg text-white/80">
            We become your consistent health system — wherever you go.
          </p>
        </div>

        <div className="max-w-6xl mx-auto mt-16 lg:mt-20 grid grid-cols-1 xl:grid-cols-[1fr_auto_1fr] gap-12 xl:gap-20 items-center">
          <div className="flex flex-col gap-16 text-left items-start order-2 xl:order-1 w-full">
            {leftPillars.map((pillar) => (
              <div key={pillar.title} className="space-y-3 max-w-xl w-full">
                <h3 className="text-xl font-semibold">{pillar.title}</h3>
                <p className="text-base text-white/80 leading-relaxed">{pillar.text}</p>
              </div>
            ))}
          </div>

          <div className="relative flex justify-center order-1 xl:order-2 mb-12 xl:mb-0">
            <div className="relative z-10 flex items-center justify-center">
              <div className="arc-glow absolute w-[620px] h-[620px]" />
              <img
                src="/circle.png"
                alt="Arc"
                className="relative z-20 w-[420px] h-[420px] md:w-[540px] md:h-[540px] opacity-65"
              />
            </div>
          </div>

          <div className="flex flex-col gap-16 text-left items-start order-3 w-full">
            {rightPillars.map((pillar) => (
              <div key={pillar.title} className="space-y-3 max-w-xl w-full">
                <h3 className="text-xl font-semibold">{pillar.title}</h3>
                <p className="text-base text-white/80 leading-relaxed">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorksSection
        description="A structured, global-first process designed for people who live everywhere."
        steps={travelerSteps}
      />

      {/* Why It Works */}
      <section className="relative w-full">
        {/* Background */}
        <div className="absolute inset-0 bg-[url('/header-explorer.png')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative mx-auto max-w-5xl px-6 py-40">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Why It Works for Travellers
          </h2>

          <p className="text-lg italic text-neutral-300 mt-4">
            One medical partner. One continuity plan. Wherever you live next.
          </p>

          <div className="mt-10 space-y-3 text-neutral-200 leading-7 max-w-2xl">
            {travelerWhyItWorks.map((item) => (
              <p key={item}>– {item}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <Section>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <SectionTitle>
            Start building stability
          </SectionTitle>
          <p className="text-white/75 leading-relaxed">
            Your lifestyle is global. Your health can be too.
          </p>
          <ArcButton href="/free-screening">
            Start free screening
          </ArcButton>
        </div>
      </Section>
    </main>
  );
}

