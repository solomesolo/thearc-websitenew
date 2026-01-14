"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { FileText, Beaker, Lightbulb, Target, BarChart3, Shield, Zap, TrendingUp } from "lucide-react";
import DNAParticles from "../../components/DNAParticles";
import DNABackground from "../../components/DNABackground";
import EmailSignupModal from "../../components/EmailSignupModal";

// Check for reduced motion preference
const useReducedMotionPreference = () => {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ?? false;
};

// Section Header Component
function SectionHeader({ 
  eyebrow, 
  title, 
  lead,
  centered = false
}: { 
  eyebrow: string; 
  title: string; 
  lead: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className="typography-eyebrow mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="typography-h2 mb-4">{title}</h2>
      {lead && (
        <p className="typography-body" style={{ maxWidth: centered ? '56ch' : '56ch' }}>{lead}</p>
      )}
    </div>
  );
}

// Sticky Table of Contents Component
function TableOfContents({ sections, activeSection }: { sections: Array<{ label: string; id: string }>; activeSection: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const reducedMotion = useReducedMotionPreference();

  return (
    <>
      {/* Desktop TOC */}
      <div className="hidden md:block fixed left-0 top-1/2 transform -translate-y-1/2 z-20 pl-8">
        <nav className="space-y-2">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            return (
              <a
                key={index}
                href={`#${section.id}`}
                className={`block text-sm transition-colors ${
                  isActive
                    ? "font-semibold"
                    : ""
                }`}
                style={{
                  color: isActive ? 'var(--accent)' : 'var(--muted-2)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--muted-2)';
                  }
                }}
              >
                {section.label}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Mobile TOC */}
      <div className="md:hidden sticky top-20 z-20 backdrop-blur-sm border-b border-token" style={{ backgroundColor: 'rgba(11, 13, 16, 0.8)' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 text-left flex items-center justify-between"
        >
          <span className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
            {sections.find(s => s.id === activeSection)?.label || "On this page"}
          </span>
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            style={{ color: 'var(--muted-2)' }}
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </button>
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: reducedMotion ? 0 : 0.3 }}
          className="overflow-hidden"
        >
          <nav className="px-4 pb-3 space-y-1">
            {sections.map((section, index) => {
              const isActive = activeSection === section.id;
              return (
                <a
                  key={index}
                  href={`#${section.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 text-sm transition-colors ${
                    isActive
                      ? "font-semibold"
                      : ""
                  }`}
                  style={{
                    color: isActive ? 'var(--accent)' : 'var(--muted-2)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--muted-2)';
                    }
                  }}
                >
                  {section.label}
                </a>
              );
            })}
          </nav>
        </motion.div>
      </div>
    </>
  );
}

// Premium Sequence Step Component
function SequenceStep({
  number,
  title,
  summary,
  details,
  whyItMatters,
  isExpanded,
  onToggle,
  index,
  isLast,
}: {
  number: number;
  title: string;
  summary: string;
  details: React.ReactNode;
  whyItMatters?: string;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
  isLast: boolean;
}) {
  const reducedMotion = useReducedMotionPreference();

  return (
    <motion.div
      id={`step-${number}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : index * 0.05 }}
      className={`py-8 ${!isLast ? 'border-b border-token' : ''}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <div className="flex items-start gap-6">
        {/* Index */}
        <div className="flex-shrink-0 pt-1">
          <span 
            className="text-sm font-medium tabular-nums"
            style={{ color: 'var(--muted-2)' }}
          >
            {String(number).padStart(2, '0')}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="typography-h3 mb-3">{title}</h3>
          
          {/* Summary */}
          <p 
            className="typography-body mb-6"
            style={{ maxWidth: '56ch' }}
          >
            {summary}
          </p>

          {/* Expandable Details */}
          {details && (
            <div className="mb-6">
              <button
                onClick={onToggle}
                className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-accent-token/50 focus:ring-offset-2 focus:ring-offset-[var(--page-bg)] rounded-lg"
                aria-expanded={isExpanded}
                aria-label={`${isExpanded ? "Hide" : "Show"} details for ${title}`}
              >
                <span 
                  className="text-xs font-medium"
                  style={{ color: 'var(--muted-2)' }}
                >
                  {isExpanded ? "Hide details" : "Details"}
                </span>
                <motion.div
                  animate={{ rotate: isExpanded ? 45 : 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
                  className="w-4 h-4 flex items-center justify-center"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ color: 'var(--muted-2)' }}
                  >
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: isExpanded ? "auto" : 0,
                  opacity: isExpanded ? 1 : 0,
                }}
                transition={{ duration: reducedMotion ? 0 : 0.24, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div 
                  className={`pt-6 space-y-6 typography-body ${isExpanded ? 'border-t border-token' : ''}`}
                  style={{ maxWidth: '56ch' }}
                >
                  {details}
                </div>
              </motion.div>
            </div>
          )}

          {/* Why it matters */}
          {whyItMatters && (
            <p 
              className="typography-body-muted italic text-sm"
              style={{ maxWidth: '56ch' }}
            >
              {whyItMatters}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const SECTIONS = [
  { label: "Our Method", id: "our-method" },
  { label: "Three principles", id: "three-principles" },
  { label: "We start with what matters most", id: "we-start-with-what-matters-most" },
  { label: "We translate your answers into risk and opportunity", id: "we-translate-your-answers-into-risk-and-opportunity" },
  { label: "We use a conservative, safety first decision model", id: "we-use-a-conservative-safety-first-decision-model" },
  { label: "Recommendations come from curated, clinically relevant options", id: "recommendations-come-from-curated-clinically-relevant-options" },
  { label: "Your dashboard is designed to be actionable, not overwhelming", id: "your-dashboard-is-designed-to-be-actionable-not-overwhelming" },
  { label: "ARC supports, but never replaces, clinical care", id: "arc-supports-but-never-replaces-clinical-care" },
  { label: "The outcome", id: "the-outcome" },
  { label: "Ready to see your starting point", id: "ready-to-see-your-starting-point" },
];

export default function MethodPage() {
  const [activeSection, setActiveSection] = useState("our-method");
  const [expandedStep, setExpandedStep] = useState<number | null>(1); // Only step 1 expanded by default
  const [showEmailModal, setShowEmailModal] = useState(false);
  const reducedMotion = useReducedMotionPreference();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const sectionIds = SECTIONS.map(s => s.id);

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Background */}
      <div className="hidden md:block w-full h-full fixed top-0 left-0 z-0">
        <DNAParticles />
      </div>
      <div className="block md:hidden w-full h-full fixed top-0 left-0 z-0" style={{ opacity: 0.25 }}>
        <DNABackground />
      </div>

      {/* Section B: Sticky TOC */}
        <TableOfContents sections={SECTIONS} activeSection={activeSection} />

      {/* Section A: Our Method + Six Steps - Two Column Editorial Layout */}
      <section id="our-method" className="relative z-10 py-24 md:py-32 px-6 md:px-10" style={{ backgroundColor: 'var(--page-bg)' }}>
        <div className="max-w-6xl mx-auto">
          {/* Two-column grid: 12 columns, left 5 (40%), right 7 (60%) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
            {/* Left Column (40% / col-span-5): Header + Intro + Principles */}
            <div className="md:col-span-5 space-y-8">
              {/* Our Method Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.6 }}
                className="typography-h1 mb-6"
              >
                Our Method
              </motion.h1>

              {/* Intro */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.1 }}
                className="typography-body mb-8"
                style={{ maxWidth: '56ch' }}
              >
                The ARC screening is built to do one thing well: turn a small amount of information into a clear, practical plan. No guessing. No fear based messaging. No one size advice.
              </motion.p>

              {/* Three Principles - Subtle pills */}
              <div id="three-principles" className="scroll-mt-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.2 }}
                  className="flex flex-wrap gap-3"
                >
                {[
                  { Icon: FileText, label: "Structured inputs" },
                  { Icon: Beaker, label: "Evidence aligned rules" },
                  { Icon: Lightbulb, label: "Human friendly outputs" },
                ].map((principle, index) => {
                  const IconComponent = principle.Icon;
                  return (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-token"
                      style={{ backgroundColor: 'var(--panel-bg)' }}
                    >
                      <IconComponent 
                        className="w-4 h-4" 
                        strokeWidth={1.5}
                        style={{ color: 'var(--muted-2)', opacity: 0.6 }}
                      />
                      <p className="text-sm typography-body">{principle.label}</p>
                    </div>
                  );
                })}
                </motion.div>
              </div>
            </div>

            {/* Right Column (60% / col-span-7): Six Steps - Sequence List */}
            <div className="md:col-span-7">
              {/* Step 1 */}
              <div id="we-start-with-what-matters-most" className="scroll-mt-24">
                <SequenceStep
                  number={1}
                  title="We start with what matters most"
                  summary="Our intake focuses on the few signals that reliably predict day to day health trajectory."
                  details={
                    <>
                      <ul className="space-y-2.5 typography-body-muted" style={{ maxWidth: '56ch' }}>
                        <li className="flex items-start gap-3">
                          <span style={{ color: 'var(--muted-2)' }}>•</span>
                          <span>Stress load and recovery</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span style={{ color: 'var(--muted-2)' }}>•</span>
                          <span>Sleep quality and rhythm</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span style={{ color: 'var(--muted-2)' }}>•</span>
                          <span>Energy and cognitive clarity</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span style={{ color: 'var(--muted-2)' }}>•</span>
                          <span>Nutrition pattern</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span style={{ color: 'var(--muted-2)' }}>•</span>
                          <span>Movement and recovery habits</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span style={{ color: 'var(--muted-2)' }}>•</span>
                          <span>Personal risk context including health history and family history</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span style={{ color: 'var(--muted-2)' }}>•</span>
                          <span>Recent screening status including what is known and what is missing</span>
                        </li>
                      </ul>
                    </>
                  }
                  whyItMatters="This keeps the experience short, but meaningful."
                  isExpanded={expandedStep === 1}
                  onToggle={() => setExpandedStep(expandedStep === 1 ? null : 1)}
                  index={0}
                  isLast={false}
                />
              </div>

              {/* Step 2 */}
              <div id="we-translate-your-answers-into-risk-and-opportunity" className="scroll-mt-24">
                <SequenceStep
                  number={2}
                  title="We translate your answers into risk and opportunity"
                  summary="Rather than labeling conditions, we identify patterns and leverage points you can act on."
                  details={
                    <>
                      <ul className="space-y-2.5 typography-body-muted" style={{ maxWidth: '56ch' }}>
                        <li className="flex items-start gap-3">
                          <span style={{ color: 'var(--muted-2)' }}>•</span>
                          <span>Where your system looks stable and we reinforce it</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span style={{ color: 'var(--muted-2)' }}>•</span>
                          <span>Where your system looks strained and we simplify first</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span style={{ color: 'var(--muted-2)' }}>•</span>
                          <span>Where your data suggests something is worth checking with a clinician</span>
                        </li>
                      </ul>
                    </>
                  }
                  whyItMatters="You get a prioritized view of what can move the needle now, and what can wait."
                  isExpanded={expandedStep === 2}
                  onToggle={() => setExpandedStep(expandedStep === 2 ? null : 2)}
                  index={1}
                  isLast={false}
                />
              </div>

              {/* Step 3 */}
              <div id="we-use-a-conservative-safety-first-decision-model" className="scroll-mt-24">
                <SequenceStep
                  number={3}
                  title="We use a conservative, safety first decision model"
                  summary="ARC avoids two common failures of health platforms: overreacting and oversimplifying."
                  details={
                    <>
                      <div className="rounded-2xl p-6 border border-token" style={{ backgroundColor: 'var(--panel-bg)' }}>
                        <h4 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: 'var(--text)' }}>
                          Guardrails
                        </h4>
                        <ul className="space-y-2.5 typography-body-muted" style={{ maxWidth: '56ch' }}>
                          <li className="flex items-start gap-3">
                            <span style={{ color: 'var(--muted-2)' }}>•</span>
                            <span>Lifestyle steps come first when appropriate</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span style={{ color: 'var(--muted-2)' }}>•</span>
                            <span>Only a small number of focused actions each week</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span style={{ color: 'var(--muted-2)' }}>•</span>
                            <span>Screenings only when signals are clear or baselines are missing</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span style={{ color: 'var(--muted-2)' }}>•</span>
                            <span>We avoid add everything supplement behavior and flag clinician review when needed</span>
                          </li>
                        </ul>
                      </div>
                    </>
                  }
                  whyItMatters="This approach keeps recommendations safe, focused, and sustainable."
                  isExpanded={expandedStep === 3}
                  onToggle={() => setExpandedStep(expandedStep === 3 ? null : 3)}
                  index={2}
                  isLast={false}
                />
              </div>

              {/* Step 4 */}
              <div id="recommendations-come-from-curated-clinically-relevant-options" className="scroll-mt-24">
                <SequenceStep
                  number={4}
                  title="Recommendations come from curated, clinically relevant options"
                  summary="ARC selects from a structured library designed to stay grounded and consistent while still feeling personal."
                  details={
                    <>
                      <ul className="space-y-2.5 typography-body-muted" style={{ maxWidth: '56ch' }}>
                        <li className="flex items-start gap-3">
                          <span style={{ color: 'var(--muted-2)' }}>•</span>
                          <span>Common preventive screening categories</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span style={{ color: 'var(--muted-2)' }}>•</span>
                          <span>Practical lifestyle interventions</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span style={{ color: 'var(--muted-2)' }}>•</span>
                          <span>Supplement options with safety considerations</span>
                        </li>
                      </ul>
                    </>
                  }
                  whyItMatters="This ensures recommendations are evidence-based and clinically relevant, not generic advice."
                  isExpanded={expandedStep === 4}
                  onToggle={() => setExpandedStep(expandedStep === 4 ? null : 4)}
                  index={3}
                  isLast={false}
                />
              </div>

              {/* Step 5 */}
              <div id="your-dashboard-is-designed-to-be-actionable-not-overwhelming" className="scroll-mt-24">
                <SequenceStep
                  number={5}
                  title="Your dashboard is designed to be actionable, not overwhelming"
                  summary="Your dashboard shows Key Metrics, This Week's Actions, Recommended Screenings, and Red Flags—all organized for clarity."
                  details={
                    <>
                      <ul className="space-y-2.5 typography-body-muted" style={{ maxWidth: '56ch' }}>
                        <li className="flex items-start gap-3">
                          <span style={{ color: 'var(--muted-2)' }}>•</span>
                          <span><span className="typography-emphasis">Key Metrics</span> that summarise your current state</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span style={{ color: 'var(--muted-2)' }}>•</span>
                          <span><span className="typography-emphasis">This Week's Actions</span> grouped by category such as nutrition and movement</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span style={{ color: 'var(--muted-2)' }}>•</span>
                          <span><span className="typography-emphasis">Recommended Screenings</span> with a clear why this matters explanation</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span style={{ color: 'var(--muted-2)' }}>•</span>
                          <span><span className="typography-emphasis">Red Flags</span> and thresholds for when to seek medical review</span>
                        </li>
                      </ul>
                    </>
                  }
                  whyItMatters="In other words: clarity, not complexity."
                  isExpanded={expandedStep === 5}
                  onToggle={() => setExpandedStep(expandedStep === 5 ? null : 5)}
                  index={4}
                  isLast={false}
                />
              </div>

              {/* Step 6 */}
              <div id="arc-supports-but-never-replaces-clinical-care" className="scroll-mt-24">
                <SequenceStep
                  number={6}
                  title="ARC supports, but never replaces, clinical care"
                  summary="ARC is educational and preventive by design. We do not diagnose or prescribe."
                  details={
                    <>
                      <div className="rounded-2xl p-6 border border-token" style={{ backgroundColor: 'rgba(77, 228, 193, 0.08)', maxWidth: '56ch' }}>
                        <p className="font-semibold mb-2 typography-body" style={{ color: 'var(--accent)' }}>Discuss this with your clinician</p>
                      </div>
                      <p className="typography-body-muted mt-4" style={{ maxWidth: '56ch' }}>
                        When something needs your personal medical context, we say so clearly and we help you bring the right questions to a professional.
                      </p>
                    </>
                  }
                  whyItMatters="This ensures ARC supports your health decisions without replacing professional medical care."
                  isExpanded={expandedStep === 6}
                  onToggle={() => setExpandedStep(expandedStep === 6 ? null : 6)}
                  index={5}
                  isLast={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section D: The outcome */}
      <section id="the-outcome" className="relative z-10 py-24 md:py-32 px-6 md:px-10" style={{ backgroundColor: 'var(--page-bg)' }}>
        <div className="max-w-6xl mx-auto">
          {/* Two-column grid: 12 columns, left 5 (40%), right 7 (60%) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
            {/* Left Column (40% / col-span-5): Title + Explanation */}
            <div className="md:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: reducedMotion ? 0 : 0.6 }}
                className="space-y-4"
              >
                <p className="typography-eyebrow mb-4">
                  RESULT
                </p>
                <h2 className="typography-h2 mb-4">
                  The outcome
                </h2>
                <p className="typography-body" style={{ maxWidth: '56ch' }}>
                  You get a plan that is built to help you build momentum week by week.
                </p>
              </motion.div>
            </div>

            {/* Right Column (60% / col-span-7): 2-column grid of outcomes */}
            <div className="md:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { Icon: Target, title: "Personalised" },
                  { Icon: BarChart3, title: "Evidence aligned" },
                  { Icon: Shield, title: "Safe and conservative" },
                  { Icon: Zap, title: "Easy to execute" },
                  { Icon: TrendingUp, title: "Designed for progress" },
                ].map((benefit, index) => {
                  const IconComponent = benefit.Icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : index * 0.05 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-full border border-token"
                      style={{ backgroundColor: 'var(--panel-bg)' }}
                    >
                      <IconComponent 
                        className="w-4 h-4 flex-shrink-0" 
                        strokeWidth={1.5}
                        style={{ color: 'var(--muted-2)', opacity: 0.6 }}
                      />
                      <p className="text-sm typography-body">{benefit.title}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section E: CTA Band */}
      <section id="ready-to-see-your-starting-point" className="relative z-10 py-24 md:py-32 px-6 md:px-10" style={{ backgroundColor: 'var(--page-bg)' }}>
        <div className="max-w-6xl mx-auto">

          {/* CTA Band - Full width within container */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeOut" }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            {/* Left: Title + Copy */}
            <div className="flex-1">
              <h2 className="typography-h2 mb-3">
                Ready to see your starting point
              </h2>
              <p className="typography-body" style={{ maxWidth: '56ch' }}>
                Start the free screening and get a clear baseline with next steps you can actually follow.
              </p>
            </div>

            {/* Right: CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 md:flex-shrink-0">
              {/* Primary CTA - Subtle outline button */}
              <button
                onClick={() => setShowEmailModal(true)}
                className="
                  px-8 py-3 rounded-2xl
                  border border-token
                  transition-all duration-200 ease-out
                  hover:border-accent-token hover:bg-accent-token/5
                  focus:outline-none focus:ring-2 focus:ring-accent-token/50 focus:ring-offset-2 focus:ring-offset-[var(--page-bg)]
                  inline-flex items-center justify-center
                "
                style={{ 
                  color: 'var(--text)',
                  backgroundColor: 'transparent',
                }}
              >
                <span className="typography-body">Start free screening</span>
              </button>

              {/* Secondary CTA - Text link with arrow */}
              <Link
                href="/catalog/countries"
                className="link-understated self-center sm:self-auto"
              >
                Explore ARC Marketplace
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <EmailSignupModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} />
    </>
  );
}
