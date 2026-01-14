"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { BarChart3, Search, MapPin, Target, Globe, MessageCircle, ChevronDown } from "lucide-react";
import DNAParticles from "../../components/DNAParticles";
import DNABackground from "../../components/DNABackground";
import { TwoColumnSection, Panel, EditorialSection } from "../../components/sections";
import EmailSignupModal from "../../components/EmailSignupModal";
import { HeroSection } from "../../components/HeroSection";
import ImagePlaceholder from "../../components/ImagePlaceholder";

// Check for reduced motion preference
const useReducedMotionPreference = () => {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ?? false;
};

// Premium Hero Visual Component
function HeroVisual({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px]">
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-token" style={{ backgroundColor: 'var(--panel-bg)' }}>
        {/* Faint inner glow */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 60px rgba(77, 228, 193, 0.08)',
          }}
        />
        
        {/* Very low contrast animated gradient blobs */}
        <motion.div
          animate={reducedMotion ? {} : {
            x: [0, 20, 0],
            y: [0, 15, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 opacity-[0.08]"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(77, 228, 193, 0.15) 0%, transparent 60%)',
          }}
        />
        
        <motion.div
          animate={reducedMotion ? {} : {
            x: [0, -15, 0],
            y: [0, -10, 0],
            scale: [1, 0.97, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 opacity-[0.06]"
          style={{
            background: 'radial-gradient(circle at 70% 30%, rgba(77, 228, 193, 0.12) 0%, transparent 55%)',
          }}
        />

        {/* System map SVG - very subtle */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* More nodes for richer system map */}
          <circle cx="80" cy="80" r="2.5" fill="currentColor" className="text-[#4DE4C1]" />
          <circle cx="150" cy="100" r="2.5" fill="currentColor" className="text-[#4DE4C1]" />
          <circle cx="220" cy="90" r="2.5" fill="currentColor" className="text-[#4DE4C1]" />
          <circle cx="280" cy="110" r="2.5" fill="currentColor" className="text-[#4DE4C1]" />
          <circle cx="120" cy="200" r="2.5" fill="currentColor" className="text-[#4DE4C1]" />
          <circle cx="200" cy="220" r="2.5" fill="currentColor" className="text-[#4DE4C1]" />
          <circle cx="260" cy="250" r="2.5" fill="currentColor" className="text-[#4DE4C1]" />
          <circle cx="320" cy="180" r="2.5" fill="currentColor" className="text-[#4DE4C1]" />
          <circle cx="100" cy="280" r="2.5" fill="currentColor" className="text-[#4DE4C1]" />
          <circle cx="180" cy="300" r="2.5" fill="currentColor" className="text-[#4DE4C1]" />
          <circle cx="250" cy="320" r="2.5" fill="currentColor" className="text-[#4DE4C1]" />
          
          {/* Connections - subtle network */}
          <line x1="80" y1="80" x2="150" y2="100" stroke="currentColor" strokeWidth="0.8" className="text-[#4DE4C1] opacity-20" />
          <line x1="150" y1="100" x2="220" y2="90" stroke="currentColor" strokeWidth="0.8" className="text-[#4DE4C1] opacity-20" />
          <line x1="220" y1="90" x2="280" y2="110" stroke="currentColor" strokeWidth="0.8" className="text-[#4DE4C1] opacity-20" />
          <line x1="150" y1="100" x2="120" y2="200" stroke="currentColor" strokeWidth="0.8" className="text-[#4DE4C1] opacity-20" />
          <line x1="220" y1="90" x2="200" y2="220" stroke="currentColor" strokeWidth="0.8" className="text-[#4DE4C1] opacity-20" />
          <line x1="200" y1="220" x2="260" y2="250" stroke="currentColor" strokeWidth="0.8" className="text-[#4DE4C1] opacity-20" />
          <line x1="120" y1="200" x2="100" y2="280" stroke="currentColor" strokeWidth="0.8" className="text-[#4DE4C1] opacity-20" />
          <line x1="200" y1="220" x2="180" y2="300" stroke="currentColor" strokeWidth="0.8" className="text-[#4DE4C1] opacity-20" />
          <line x1="260" y1="250" x2="250" y2="320" stroke="currentColor" strokeWidth="0.8" className="text-[#4DE4C1] opacity-20" />
          <line x1="280" y1="110" x2="320" y2="180" stroke="currentColor" strokeWidth="0.8" className="text-[#4DE4C1] opacity-20" />
        </svg>
      </div>
    </div>
  );
}

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
        <p className="text-xs font-semibold text-[#4DE4C1] uppercase tracking-wider mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="typography-h2 text-white mb-4">{title}</h2>
      <p className={`typography-body-muted ${centered ? 'max-w-[68ch] mx-auto' : 'max-w-[72ch]'}`}>{lead}</p>
    </div>
  );
}

// Premium Accordion Component for Principles
function PrincipleAccordion({
  title,
  meaning,
  inPractice,
  isExpanded,
  onToggle,
  index,
}: {
  title: string;
  meaning: string;
  inPractice: string;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}) {
  const reducedMotion = useReducedMotionPreference();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : index * 0.05, ease: "easeOut" }}
      className={`transition-all ${
        isExpanded 
          ? "rounded-2xl border border-token p-6 md:p-8" 
          : "border-b border-token"
      }`}
      style={isExpanded ? { backgroundColor: 'var(--panel-bg)' } : {}}
    >
      <button
        onClick={onToggle}
        className="w-full text-left py-5 px-0 hover:opacity-80 transition-opacity group focus:outline-none focus:ring-2 focus:ring-[#4DE4C1]/50 focus:ring-offset-2 focus:ring-offset-black rounded-2xl"
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? "Collapse" : "Expand"} ${title}`}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0 space-y-2">
            <h3 
              className="text-lg md:text-xl font-medium text-white leading-tight"
              style={{ letterSpacing: '-0.01em' }}
            >
              {title}
            </h3>
            <p 
              className="text-base leading-relaxed"
              style={{ color: 'rgba(255, 255, 255, 0.75)' }}
            >
              {meaning}
            </p>
          </div>
          {/* Plus/Minus Icon */}
          <div className="flex-shrink-0 mt-1">
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.22, ease: "easeOut" }}
              className="w-6 h-6 flex items-center justify-center"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-gray-400 group-hover:text-gray-300 transition-colors"
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
          </div>
        </div>
      </button>
      
      {/* In Practice - Expandable Content */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: reducedMotion ? 0 : 0.24, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <div className="pt-6 border-t border-token mt-4">
          <p 
            className="text-base leading-relaxed max-w-[70ch]"
            style={{ color: 'rgba(255, 255, 255, 0.72)' }}
          >
            {inPractice}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Comparison Table Component
function ComparisonTable({
  rows,
  selectedIndex,
  onSelect,
}: {
  rows: Array<{
    typical: string;
    theArc: string;
    expanded: {
      whatItChanges: string;
      howArcDoesIt: string;
      whatYouGet: string;
    };
  }>;
  selectedIndex: number | null;
  onSelect: (index: number | null) => void;
}) {
  const reducedMotion = useReducedMotionPreference();
  const selectedRow = selectedIndex !== null ? rows[selectedIndex] : null;

  return (
    <div className="space-y-8">
      {/* Desktop: Comparison Table */}
      <div className="hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeOut" }}
          className="border border-token rounded-2xl overflow-hidden"
          style={{ backgroundColor: 'var(--panel-bg)' }}
        >
          {/* Table Header */}
          <div 
            className="grid grid-cols-2 border-b border-token"
            style={{ backgroundColor: 'var(--panel-bg)' }}
          >
            <div className="py-4 px-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Typical</p>
            </div>
            <div className="py-4 px-6 border-l border-token">
              <p className="text-xs font-semibold text-[#4DE4C1] uppercase tracking-wider">The Arc</p>
            </div>
          </div>

          {/* Comparison Rows */}
          <div>
            {rows.map((row, index) => (
              <div
                key={index}
                onClick={() => onSelect(selectedIndex === index ? null : index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(selectedIndex === index ? null : index);
                  }
                }}
                className={`grid grid-cols-2 border-b border-token transition-all duration-150 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-token/50 focus:ring-offset-2 focus:ring-offset-[var(--page-bg)] ${
                  selectedIndex === index
                    ? "border-l-2 border-accent-token"
                    : ""
                }`}
                style={{
                  backgroundColor: selectedIndex === index ? 'var(--panel-bg)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (selectedIndex !== index) {
                    e.currentTarget.style.backgroundColor = 'var(--panel-bg)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedIndex !== index) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                aria-pressed={selectedIndex === index}
                aria-label={`${row.typical} vs ${row.theArc}`}
              >
                <div className="py-4 px-6 text-left">
                  <p className="typography-body-muted text-sm">{row.typical}</p>
                </div>
                <div className="py-4 px-6 text-left border-l border-token">
                  <p className="typography-body text-white font-medium text-sm">{row.theArc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mobile: Stacked Cards */}
      <div className="md:hidden space-y-4">
        {rows.map((row, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : index * 0.05, ease: "easeOut" }}
            className="border border-token rounded-2xl overflow-hidden"
            style={{ backgroundColor: 'var(--panel-bg)' }}
          >
            <div
              onClick={() => onSelect(selectedIndex === index ? null : index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(selectedIndex === index ? null : index);
                }
              }}
              className={`w-full p-4 text-left transition-all duration-150 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-token/50 focus:ring-offset-2 focus:ring-offset-[var(--page-bg)]`}
              style={{
                backgroundColor: selectedIndex === index ? 'var(--panel-bg)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (selectedIndex !== index) {
                  e.currentTarget.style.backgroundColor = 'var(--panel-bg)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedIndex !== index) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
              aria-pressed={selectedIndex === index}
              aria-label={`${row.typical} vs ${row.theArc}`}
            >
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Typical</p>
                  <p className="typography-body-muted text-sm">{row.typical}</p>
                </div>
                <div className="border-t border-token pt-4">
                  <p className="text-xs font-semibold text-[#4DE4C1] uppercase tracking-wider mb-2">The Arc</p>
                  <p className="typography-body text-white font-medium text-sm">{row.theArc}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Area */}
      {selectedRow && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
          className="border border-token rounded-2xl p-6 md:p-8 space-y-6"
          style={{ backgroundColor: 'var(--panel-bg)' }}
        >
          <div>
            <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
              What it changes
            </p>
            <p className="typography-body-muted leading-relaxed max-w-[72ch]">{selectedRow.expanded.whatItChanges}</p>
          </div>
          <div className="border-t border-token pt-6">
            <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
              How ARC does it
            </p>
            <p className="typography-body-muted leading-relaxed max-w-[72ch]">{selectedRow.expanded.howArcDoesIt}</p>
          </div>
          <div className="border-t border-token pt-6">
            <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
              What you get
            </p>
            <p className="typography-body-muted leading-relaxed max-w-[72ch]">{selectedRow.expanded.whatYouGet}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Clean Timeline Component
function TimelineStage({
  timeframe,
  title,
  summary,
  details,
  isExpanded,
  onToggle,
  index,
  isLast,
}: {
  timeframe: string;
  title: string;
  summary: string;
  details: string;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
  isLast: boolean;
}) {
  const reducedMotion = useReducedMotionPreference();

  return (
    <div className={`grid md:grid-cols-[140px_1fr] gap-6 md:gap-8 py-6 ${!isLast ? 'border-b border-token' : ''}`}>
      {/* Year Label Column */}
      <div className="pt-1">
        <p 
          className="text-xs font-medium"
          style={{ color: 'var(--muted-2)' }}
        >
          {timeframe}
        </p>
      </div>

      {/* Content Column */}
      <div className="space-y-3">
        {/* Title + One-liner */}
        <div>
          <h3 className="typography-h3 mb-2">{title}</h3>
          <p className="typography-body" style={{ maxWidth: '48ch' }}>
            {summary}
          </p>
        </div>

        {/* Expandable details with understated "More" link */}
        {details && (
          <div>
            <button
              onClick={onToggle}
              className="group flex items-center gap-1 text-xs transition-colors mt-2"
              style={{ color: 'var(--muted-2)' }}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "Hide details" : "Show details"}
            >
              <span className="group-hover:underline">{isExpanded ? "Hide" : "More"}</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ease-out ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                strokeWidth={2}
              />
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
              <div className="pt-4">
                <p className="typography-body" style={{ maxWidth: '48ch' }}>
                  {details}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

// Premium Roadmap Visual Component
function RoadmapVisual({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px]">
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-token" style={{ backgroundColor: 'var(--panel-bg)' }}>
        {/* Faint inner glow */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 60px rgba(77, 228, 193, 0.06)',
          }}
        />
        
        {/* Very low contrast animated gradient */}
        <motion.div
          animate={reducedMotion ? {} : {
            x: [0, 15, 0],
            y: [0, 10, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 opacity-[0.06]"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(77, 228, 193, 0.12) 0%, transparent 65%)',
          }}
        />

        {/* Abstract timeline visualization - subtle */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-[0.05]"
          viewBox="0 0 400 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Vertical timeline line */}
          <line x1="80" y1="50" x2="80" y2="550" stroke="currentColor" strokeWidth="1" className="text-[#4DE4C1] opacity-20" />
          
          {/* Timeline nodes */}
          <circle cx="80" cy="100" r="4" fill="currentColor" className="text-[#4DE4C1]" />
          <circle cx="80" cy="180" r="4" fill="currentColor" className="text-[#4DE4C1]" />
          <circle cx="80" cy="260" r="4" fill="currentColor" className="text-[#4DE4C1]" />
          <circle cx="80" cy="340" r="4" fill="currentColor" className="text-[#4DE4C1]" />
          <circle cx="80" cy="420" r="4" fill="currentColor" className="text-[#4DE4C1]" />
          <circle cx="80" cy="500" r="4" fill="currentColor" className="text-[#4DE4C1]" />
          
          {/* Subtle connecting lines */}
          <line x1="100" y1="100" x2="300" y2="100" stroke="currentColor" strokeWidth="0.8" className="text-[#4DE4C1] opacity-15" />
          <line x1="100" y1="180" x2="300" y2="180" stroke="currentColor" strokeWidth="0.8" className="text-[#4DE4C1] opacity-15" />
          <line x1="100" y1="260" x2="300" y2="260" stroke="currentColor" strokeWidth="0.8" className="text-[#4DE4C1] opacity-15" />
        </svg>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [expandedComparison, setExpandedComparison] = useState<number | null>(null);
  const [expandedTimeline, setExpandedTimeline] = useState<number | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const reducedMotion = useReducedMotionPreference();

  const handleCardToggle = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleComparisonToggle = (index: number | null) => {
    setExpandedComparison(index);
  };

  const handleTimelineToggle = (index: number) => {
    setExpandedTimeline(expandedTimeline === index ? null : index);
  };

  return (
    <>
      {/* Background */}
      <div className="hidden md:block w-full h-full fixed top-0 left-0 z-0">
        <DNAParticles />
      </div>
      <div className="block md:hidden w-full h-full fixed top-0 left-0 z-0" style={{ opacity: 0.25 }}>
        <DNABackground />
      </div>
      {/* Section 1: Hero */}
      <HeroSection
        title="Long-term health, continuously personalized."
        subtitle="ARC is a living system designed to evolve with your biology, lifestyle, and environment—so your health compounds over decades, not resets every year."
        bullets={["Designed with evidence.", "Built for continuity.", "Portable for life."]}
        image={{ src: "/hero_about.png", alt: "About The Arc" }}
      />

      {/* Section 2: Foundation / Purpose + Mission */}
      <section 
        className="relative z-10 py-24 md:py-32 px-6 md:px-10"
        style={{ backgroundColor: 'var(--page-bg)' }}
      >
        {/* Subtle background gradient */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(77, 228, 193, 0.05) 0%, transparent 60%)',
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Foundation Eyebrow - Mobile only */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeOut" }}
            className="mb-8 md:hidden"
          >
            <p className="typography-eyebrow">
              FOUNDATION
            </p>
          </motion.div>

          {/* Desktop: 2-column grid - Purpose + Mission aligned */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left: Purpose - bigger, more present */}
            <div className="space-y-6">
              {/* Foundation Eyebrow - Desktop only */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeOut" }}
                className="hidden md:block"
              >
                <p className="typography-eyebrow mb-8">
                  FOUNDATION
                </p>
              </motion.div>

              {/* Purpose Block - proper H3, not footnote */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.1, ease: "easeOut" }}
                className="space-y-4"
              >
                <h3 className="typography-h3">
                  Purpose
                </h3>
                <p 
                  className="typography-body"
                  style={{ maxWidth: '42ch' }}
                >
                  ARC brings continuity, clarity, and structure to long-term health—turning fragmented data into a system that evolves with you.
                </p>
              </motion.div>

              {/* Vision Block - Hidden on mobile, shown after Mission */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
                className="space-y-4 hidden md:block mt-12"
              >
                <h3 className="typography-h3">
                  Vision
                </h3>
                <p 
                  className="typography-body"
                  style={{ maxWidth: '42ch' }}
                >
                  A future where health decisions are continuous, personal, and never reset by borders, systems, or time.
                </p>
              </motion.div>
            </div>

            {/* Right: Mission Panel - aligned to same baseline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.15, ease: "easeOut" }}
            >
              <Panel>
                <div className="space-y-8">
                  {/* Mission Header */}
                  <div className="space-y-4">
                    <h3 className="typography-h3">
                      Mission
                    </h3>
                    <p 
                      className="typography-body"
                      style={{ maxWidth: '42ch' }}
                    >
                      We help people make better long-term health decisions through:
                    </p>
                  </div>

                  {/* Mission Capabilities - hairlines with more breathing room */}
                  <div className="space-y-0">
                    {/* Baseline */}
                    <div className="border-b border-token py-8 first:pt-0">
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                          Baseline
                        </h4>
                        <p className="typography-body" style={{ maxWidth: '42ch' }}>
                          Evidence-based screening that establishes a durable health starting point.
                        </p>
                      </div>
                    </div>

                    {/* Guidance */}
                    <div className="border-b border-token py-8">
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                          Guidance
                        </h4>
                        <p className="typography-body" style={{ maxWidth: '42ch' }}>
                          Biomarker insights translated into clear, personalized actions.
                        </p>
                      </div>
                    </div>

                    {/* Continuity */}
                    <div className="py-8 last:pb-0">
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                          Continuity
                        </h4>
                        <p className="typography-body" style={{ maxWidth: '42ch' }}>
                          Protocols that adapt as your biology, context, and goals change.
                        </p>
                      </div>
                    </div>
      </div>
      
                  {/* Footer line */}
                  <p 
                    className="text-sm pt-6 border-t border-token"
                    style={{ color: 'var(--muted-2)' }}
                  >
                    Built for decades. Designed for change.
                  </p>
                </div>
              </Panel>
            </motion.div>
          </div>
          
          {/* Vision Block - Mobile only (appears after Mission) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
            className="space-y-4 mt-12 md:hidden"
          >
            <h3 className="typography-h3">
              Vision
            </h3>
            <p 
              className="typography-body"
              style={{ maxWidth: '42ch' }}
            >
              A future where health decisions are continuous, personal, and never reset by borders, systems, or time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 3: How ARC Thinks */}
      <section 
        id="how-it-works" 
        className="relative z-10 py-24 md:py-32 px-6 md:px-10"
        style={{ backgroundColor: 'var(--page-bg)' }}
      >
        {/* Subtle background gradient */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(77, 228, 193, 0.05) 0%, transparent 60%)',
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Mobile: Stacked Layout */}
          <div className="md:hidden space-y-12">
            {/* Eyebrow + Title + Intro */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeOut" }}
              className="space-y-6"
            >
              <p 
                className="text-xs font-medium uppercase tracking-[0.12em]"
                style={{ color: 'rgba(255, 255, 255, 0.55)' }}
              >
                PRINCIPLES
              </p>
              <h2 
                className="text-3xl md:text-4xl font-medium text-white leading-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                How ARC Thinks
              </h2>
              <p 
                className="text-base md:text-lg leading-relaxed max-w-[68ch]"
                style={{ color: 'rgba(255, 255, 255, 0.75)' }}
              >
                ARC is built as a system, not a checklist. These principles shape how we interpret evidence, update guidance, and communicate uncertainty.
              </p>
            </motion.div>

            {/* Accordion List */}
            <div className="space-y-0">
              {[
                {
                  title: "Evidence, Not Noise",
                  meaning: "Decisions are grounded in research, not trends.",
                  inPractice: "We weight evidence quality and update recommendations when better data emerges.",
                },
                {
                  title: "Transparency by Default",
                  meaning: "You should understand the \"why\" behind every step.",
                  inPractice: "We show sources, confidence, and tradeoffs—so choices are informed.",
                },
                {
                  title: "Personal Autonomy",
                  meaning: "ARC informs decisions; it doesn't replace them.",
                  inPractice: "You control goals, constraints, and how aggressive or conservative you want to be.",
                },
                {
                  title: "Continuity Over Time",
                  meaning: "Your health story should compound, not reset.",
                  inPractice: "Baselines persist, changes are tracked, and guidance adapts across life stages.",
                },
                {
                  title: "Long-Term Thinking",
                  meaning: "Sustainable health beats short-term optimization.",
                  inPractice: "We prioritize habits and interventions you can maintain—not hacks you can't.",
                },
              ].map((principle, index) => (
                <PrincipleAccordion
                  key={index}
                  title={principle.title}
                  meaning={principle.meaning}
                  inPractice={principle.inPractice}
                  isExpanded={expandedCard === index}
                  onToggle={() => handleCardToggle(index)}
                  index={index}
                />
              ))}
            </div>

            {/* Footer + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
              className="space-y-6 pt-8"
            >
              <p 
                className="text-base leading-relaxed max-w-[68ch]"
                style={{ color: 'rgba(255, 255, 255, 0.72)' }}
              >
                We don't ask for trust. We earn it with clarity.
              </p>
              <Link
                href="/method"
                className="inline-flex items-center gap-2 text-base font-medium text-white hover:text-[#4DE4C1] transition-colors group"
              >
                <span className="border-b border-transparent group-hover:border-[#4DE4C1] transition-colors duration-200">
                  → Read our method
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Desktop: 2-Column Editorial Layout */}
          <div className="hidden md:grid md:grid-cols-[380px_1fr] gap-16 items-start">
            {/* Left Column: Eyebrow + Title + Intro + Index */}
            <div className="space-y-10 sticky top-24">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeOut" }}
                className="space-y-6"
              >
                <p 
                  className="text-xs font-medium uppercase tracking-[0.12em]"
                  style={{ color: 'rgba(255, 255, 255, 0.55)' }}
                >
                  PRINCIPLES
                </p>
                <h2 
                  className="text-4xl font-medium text-white leading-tight"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  How ARC Thinks
                </h2>
                <p 
                  className="text-lg leading-relaxed"
                  style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                >
                  ARC is built as a system, not a checklist. These principles shape how we interpret evidence, update guidance, and communicate uncertainty.
                </p>
              </motion.div>

              {/* Principles Index */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.1, ease: "easeOut" }}
                className="space-y-4 pt-8 border-t border-token"
              >
                {[
                  "Evidence, Not Noise",
                  "Transparency by Default",
                  "Personal Autonomy",
                  "Continuity Over Time",
                  "Long-Term Thinking",
                ].map((title, index) => (
                  <button
                    key={index}
                    onClick={() => handleCardToggle(index)}
                    className={`w-full text-left py-2 transition-colors ${
                      expandedCard === index 
                        ? 'text-white' 
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <span 
                      className="text-sm font-medium"
                      style={{ color: expandedCard === index ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.4)' }}
                    >
                      {String(index + 1).padStart(2, '0')} — {title}
                    </span>
                  </button>
                ))}
              </motion.div>
            </div>

            {/* Right Column: Accordion Content */}
            <div className="space-y-0 max-w-[70ch]">
              {[
                {
                  title: "Evidence, Not Noise",
                  meaning: "Decisions are grounded in research, not trends.",
                  inPractice: "We weight evidence quality and update recommendations when better data emerges.",
                },
                {
                  title: "Transparency by Default",
                  meaning: "You should understand the \"why\" behind every step.",
                  inPractice: "We show sources, confidence, and tradeoffs—so choices are informed.",
                },
                {
                  title: "Personal Autonomy",
                  meaning: "ARC informs decisions; it doesn't replace them.",
                  inPractice: "You control goals, constraints, and how aggressive or conservative you want to be.",
                },
                {
                  title: "Continuity Over Time",
                  meaning: "Your health story should compound, not reset.",
                  inPractice: "Baselines persist, changes are tracked, and guidance adapts across life stages.",
                },
                {
                  title: "Long-Term Thinking",
                  meaning: "Sustainable health beats short-term optimization.",
                  inPractice: "We prioritize habits and interventions you can maintain—not hacks you can't.",
                },
              ].map((principle, index) => (
                <PrincipleAccordion
                  key={index}
                  title={principle.title}
                  meaning={principle.meaning}
                  inPractice={principle.inPractice}
                  isExpanded={expandedCard === index}
                  onToggle={() => handleCardToggle(index)}
                  index={index}
                />
              ))}

              {/* Footer + CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
                className="space-y-6 pt-12 mt-8 border-t border-token"
              >
                <p 
                  className="text-lg leading-relaxed"
                  style={{ color: 'rgba(255, 255, 255, 0.72)' }}
                >
                  We don't ask for trust. We earn it with clarity.
                </p>
                <Link
                  href="/method"
                  className="inline-flex items-center gap-2 text-base font-medium text-white hover:text-[#4DE4C1] transition-colors group"
                >
                  <span className="border-b border-transparent group-hover:border-[#4DE4C1] transition-colors duration-200">
                    → Read our method
                  </span>
            </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: The Arc Difference */}
      <section 
        className="relative z-10 py-24 md:py-32 px-6 md:px-10"
        style={{ backgroundColor: 'var(--page-bg)' }}
      >
        {/* Subtle background gradient */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(77, 228, 193, 0.05) 0%, transparent 60%)',
          }}
        />

        {/* Subtle divider above to anchor it */}
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="border-t border-token mb-16"></div>
          
          <div className="max-w-[56ch]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Eyebrow */}
              <p className="typography-eyebrow">
                THE ARC DIFFERENCE
              </p>

              {/* Headline */}
              <h2 className="typography-h2">
                Designed for continuity.
              </h2>

              {/* Supporting paragraph */}
              <p className="typography-body">
                Longevity only works when decisions remain coherent over time. ARC is designed as a system that preserves clarity, context, and continuity—no matter how your life or data changes.
              </p>

              {/* Secondary line */}
              <p 
                className="typography-body"
                style={{ color: 'var(--muted-2)' }}
              >
                Built to be clear, continuous, and portable across every stage of life.
              </p>

              {/* CTA */}
              <div className="pt-2">
            <Link 
                  href="/method"
                  className="link-understated"
                >
                  Read the Method
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5: Where We Are Going */}
      <section 
        className="relative z-10 py-24 md:py-32 px-6 md:px-10"
        style={{ backgroundColor: 'var(--page-bg)' }}
      >
        {/* Subtle background gradient */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(77, 228, 193, 0.05) 0%, transparent 60%)',
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeOut" }}
            className="mb-12"
          >
            <p className="typography-eyebrow mb-6">
              ROADMAP
            </p>
            <h2 className="typography-h2 mb-6">
              Where We Are Going
            </h2>
            <p className="typography-body" style={{ maxWidth: '60ch' }}>
              ARC is growing step by step. Each stage is designed to add value to your health journey without rushing or overcomplicating things.
            </p>
          </motion.div>

          {/* Two-column: Visual + Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left: Premium Visual */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeOut" }}
            >
              <RoadmapVisual reducedMotion={reducedMotion} />
            </motion.div>

            {/* Right: Timeline List */}
            <div className="space-y-0">
              {[
                {
                  timeframe: "Q1 2026",
                  title: "A careful first launch",
                  summary: "ARC will open in selected regions with a small group of early users.",
                  details: "This stage focuses on making sure the system works smoothly in everyday life. You will be able to explore your health patterns, understand what matters most, and build a foundation that stays with you over time.",
                },
                {
                  timeframe: "2026",
                  title: "More countries and more people",
                  summary: "ARC will gradually become available in more regions.",
                  details: "The marketplace will grow so you can access trusted tests and services in more places. Your health system remains consistent even as your location or routine changes.",
                },
                {
                  timeframe: "Late 2026",
                  title: "Talk to real medical experts",
                  summary: "Book one to one conversations with experienced medical professionals through ARC.",
                  details: "These sessions are designed to help you understand your results, ask questions, and make informed decisions with real human support.",
                },
                {
                  timeframe: "Late 2026",
                  title: "Learn what truly works for your body",
                  summary: "Run structured personal experiments inside ARC.",
                  details: "Make small changes, track outcomes, and discover which routines or interventions fit you best. This helps you move away from generic advice and toward your own proven blueprint.",
                },
                {
                  timeframe: "2027",
                  title: "Share your data on your terms",
                  summary: "Share health information with doctors or services without revealing your identity.",
                  details: "You stay in control of what is shared, when it is shared, and with whom.",
                },
                {
                  timeframe: "2027",
                  title: "Help improve preventive health",
                  summary: "Opt in to contribute to research while keeping your identity private.",
                  details: "Your anonymised data can support better preventive medicine while maintaining personal privacy and control.",
                },
                {
                  timeframe: "Beginning 2028",
                  title: "More to come",
                  summary: "ARC will continue to evolve as new needs and possibilities emerge.",
                  details: "This journey is intentionally open, shaped by learning, care, and long term thinking.",
                },
              ].map((stage, index, array) => (
                <TimelineStage
                  key={index}
                  timeframe={stage.timeframe}
                  title={stage.title}
                  summary={stage.summary}
                  details={stage.details}
                  isExpanded={expandedTimeline === index}
                  onToggle={() => handleTimelineToggle(index)}
                  index={index}
                  isLast={index === array.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Footer - Full width, centered */}
          <div className="w-full mt-16 flex justify-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
              className="typography-body text-center"
              style={{ maxWidth: '60ch' }}
            >
              We are building ARC with patience and purpose, so it can grow with you for years to come.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Section 6: The Problem / Why ARC Exists */}
      <section 
        className="relative z-10 py-24 md:py-32 px-6 md:px-10"
        style={{ backgroundColor: 'var(--page-bg)' }}
      >
        {/* Subtle background gradient */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(77, 228, 193, 0.05) 0%, transparent 60%)',
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="max-w-[42ch]">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeOut" }}
                className="space-y-8"
              >
                {/* Eyebrow */}
                <p className="typography-eyebrow">
                  THE PROBLEM
                </p>

                {/* Headline */}
                <h2 className="typography-h2">
                  Modern health is fragmented.
                </h2>

                {/* Problem paragraph */}
                <p className="typography-body">
                  Modern health lives in fragments. A lab result here. A wearable chart there. A doctor in one country, a clinic in another.
                </p>

                {/* Standalone emphasis line */}
                <p 
                  className="typography-body"
                  style={{ color: 'var(--text)' }}
                >
                  The context lives with you.
                </p>

                {/* Divider */}
                <div className="border-t border-token pt-8 mt-8">
                  {/* Solution paragraph */}
                  <p className="typography-body mb-8">
                    ARC was built to solve this—not by adding another app, but by creating one system that preserves context over time.
                  </p>

                  {/* Closing line - larger than body */}
                  <p 
                    className="text-xl md:text-2xl leading-relaxed mb-8"
                    style={{ color: 'var(--text)', fontWeight: 500 }}
                  >
                    Preventive health that travels with you.
                  </p>

                  {/* Micro-line */}
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--muted-2)', fontStyle: 'italic' }}
                  >
                    Built for continuity, clarity, and long-term decisions.
                  </p>
                </div>
              </motion.div>
      </div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
              className="relative w-full h-[500px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/modern health.jpg"
                alt="Modern health is fragmented"
                fill
                className="object-cover rounded-2xl opacity-70"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 6b: What ARC Fixes */}
      <section 
        className="relative z-10 py-24 md:py-32 px-6 md:px-10"
        style={{ backgroundColor: 'var(--page-bg)' }}
      >
        {/* Subtle background gradient */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(77, 228, 193, 0.05) 0%, transparent 60%)',
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header - Left aligned */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeOut" }}
            className="mb-12"
          >
            <p className="typography-eyebrow mb-6">
              THE SOLUTION
            </p>
            <h2 className="typography-h2 mb-6">
              What ARC Fixes
            </h2>
            <p className="typography-body" style={{ maxWidth: '60ch' }}>
              ARC turns scattered health information into one coherent blueprint you can use.
            </p>
          </motion.div>

          {/* Clean 2-column grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "One health story", description: "Your records, results, and trends stay together even when life changes." },
              { title: "Earlier signals", description: "Spot subtle drift before it becomes a problem." },
              { title: "Clear next steps", description: "Know what to test, what to change, and what matters most." },
              { title: "Less noise", description: "Understand your biomarkers without being overwhelmed." },
              { title: "Continuity across places", description: "Move between countries or providers without starting over." },
              { title: "Support when you want it", description: "Use guidance on your own, or add expert help when you are ready." },
            ].map((fix, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : index * 0.05, ease: "easeOut" }}
                className="rounded-2xl border border-token p-8 md:p-10 relative overflow-hidden"
                style={{ 
                  backgroundColor: 'var(--panel-bg)',
                }}
                role="listitem"
              >
                {/* Subtle depth - very faint inner glow */}
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 40px rgba(77, 228, 193, 0.03)',
                  }}
                />

                <div className="relative z-10 space-y-3">
                  {/* Title - smaller, more refined (not bold shout) */}
                  <h3 
                    className="text-lg font-medium"
                    style={{ color: 'var(--text)' }}
                  >
                    {fix.title}
                  </h3>
                  {/* Description */}
                  <p className="typography-body" style={{ maxWidth: '48ch' }}>
                    {fix.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
            className="typography-body mt-12"
            style={{ maxWidth: '60ch', fontStyle: 'italic', color: 'var(--muted-2)' }}
          >
            This is not more data. It is a system you can follow.
          </motion.p>
        </div>
      </section>

      {/* Section 7: Founder */}
      <section 
        className="relative z-10 py-24 md:py-32 px-6 md:px-10"
        style={{ backgroundColor: 'var(--page-bg)' }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeOut" }}
            className="mb-12"
          >
            <p className="typography-eyebrow mb-6">
              FOUNDER'S NOTE
            </p>
            <h2 className="typography-h2">
              Mission from the Founder
            </h2>
          </motion.div>

          {/* Two-column: Photo + Editorial Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-stretch">
            {/* Left: Photo + Name/Title (tight) */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeOut" }}
              className="flex flex-col md:sticky md:top-24"
            >
              <div className="relative w-full flex-1 min-h-[400px] rounded-2xl overflow-hidden border border-token">
                <Image
                  src="/IMG_8091.JPG"
                  alt="Anna Solovyova, Founder of ARC"
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div>
                <p className="typography-h3">Anna Solovyova</p>
                <p 
                  className="text-sm mt-1"
                  style={{ color: 'var(--muted-2)' }}
                >
                  Founder, ARC
                </p>
              </div>
            </motion.div>

            {/* Right: Editorial Text */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeOut" }}
              className="space-y-6"
              style={{ maxWidth: '65ch' }}
            >
              {/* Paragraph 1 */}
              <p className="typography-body">
                I have spent more than a decade working on medical innovation projects across multiple institutions. In every single one, I encountered the same fundamental problem: data silos and institutional separation that make effective preventive care almost impossible.
              </p>

              {/* Paragraph 2 */}
              <p className="typography-body">
                Coming from a medical family and working inside the healthcare system, I have seen firsthand how profoundly broken modern medicine is when it comes to prevention. Doctors lack the tools they need to practice prevention effectively. Patients lack clarity about what is happening inside their own bodies.
              </p>

              {/* Paragraph 3 */}
              <p className="typography-body">
                Critical health data remains trapped inside disconnected systems.
              </p>

              {/* Pull-quote - subtle with hairline border */}
              <div 
                className="my-8 pl-6 border-l border-token"
                style={{ borderLeftWidth: '1px' }}
              >
                <p 
                  className="text-lg md:text-xl leading-relaxed"
                  style={{ color: 'var(--text)', fontStyle: 'italic' }}
                >
                  As a result, the vast majority of chronic disease suffering could have been prevented years, sometimes decades, earlier.
                </p>
              </div>

              {/* Paragraph 4 */}
              <p className="typography-body">
                ARC was born from this frustration. It is built to fix what traditional medicine has never solved: clarity, continuity, and connection.
              </p>

              {/* Paragraph 5 */}
              <p className="typography-body">
                This is not just another startup. It is a fundamental rethinking of how the health ecosystem should work when designed by someone who has seen the system fail patients from the inside, repeatedly, for over ten years.
              </p>

              {/* Signature */}
              <div className="mt-10 pt-6 border-t border-token">
                <p 
                  className="font-medium italic"
                  style={{ color: 'var(--text)' }}
                >
                  Anna Solovyova
                </p>
                <p 
                  className="text-sm mt-1"
                  style={{ color: 'var(--muted-2)' }}
                >
                  Founder, ARC
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 8: Closing CTA */}
      <section 
        className="relative z-10 py-24 md:py-32 px-6 md:px-10"
        style={{ backgroundColor: 'var(--page-bg)' }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeOut" }}
            className="space-y-6"
            style={{ maxWidth: '56ch', marginLeft: 'auto', marginRight: 'auto' }}
          >
            {/* Title */}
            <h2 className="typography-h2 text-center">
              Begin your Arc today.
            </h2>

            {/* One-liner */}
            <p className="typography-body text-center">
              Find your own formula. See what works for you. Keep what matters.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
              {/* Primary CTA - Understated outlined button with mint accent on hover */}
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

              {/* Secondary CTA - Text link */}
              <button
                onClick={() => setShowEmailModal(true)}
                className="link-understated"
              >
                See plans
              </button>
      </div>
          </motion.div>
    </div>
      </section>
      <EmailSignupModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} />
    </>
  );
}

