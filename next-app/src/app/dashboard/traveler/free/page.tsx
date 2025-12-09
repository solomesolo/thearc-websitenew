"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

interface QuestionnaireResults {
  scores: {
    stress_load_score: number;
    cortisol_regulation_score: number;
    sleep_quality_score: number;
    cognitive_recovery_score: number;
    nutrition_risk_score: number;
    supplement_gap_score: number;
    movement_recovery_gap_score: number;
    screening_gap_score: number;
    environment_risk_score: number;
    red_flag_burden_score: number;
  };
  flags: {
    [key: string]: boolean;
  };
  ai_analysis: {
    key_metrics: {
      stress_load: { score: number; summary: string };
      cortisol_regulation: { score: number; summary: string };
      sleep_quality: { score: number; summary: string };
      cognitive_recovery: { score: number; summary: string };
    };
    weekly_actions: {
      nutrition: string[];
      supplements: string[];
      movement_recovery: string[];
      screenings_checks: string[];
      environment: string[];
      red_flags: string[];
    };
    recommended_screenings: Array<{
      screening: string;
      timing: string;
      reason: string;
      trigger_findings: string[];
    }>;
    global_disclaimer: string;
  };
  demographics: {
    age?: string;
    bmi?: number;
    postmenopausal: boolean;
    on_estrogen_or_combined: boolean;
  };
}

export default function TravelerFreeDashboardPage() {
  const [results, setResults] = useState<QuestionnaireResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to load results
    const loadResults = () => {
      const storedResults = localStorage.getItem("questionnaireResults");
      console.log("Dashboard: Checking for results in localStorage");
      console.log("Dashboard: Stored results exists?", !!storedResults);
      
      if (storedResults) {
        try {
          const parsed = JSON.parse(storedResults);
          console.log("Dashboard: Parsed results:", parsed);
          console.log("Dashboard: Results structure:", {
            hasScores: !!parsed.scores,
            hasFlags: !!parsed.flags,
            hasAiAnalysis: !!parsed.ai_analysis,
            hasDemographics: !!parsed.demographics,
          });
          setResults(parsed);
          setLoading(false);
          return true; // Success
        } catch (error) {
          console.error("Dashboard: Failed to parse results:", error);
          console.error("Dashboard: Raw stored results:", storedResults);
          setLoading(false);
          return false;
        }
      } else {
        console.warn("Dashboard: No results found in localStorage");
        console.log("Dashboard: Available localStorage keys:", Object.keys(localStorage));
        return false;
      }
    };

    // Try loading immediately
    if (loadResults()) {
      return; // Success, no need to retry
    }

    // If not found, retry a few times (in case loading page is still saving)
    let retryCount = 0;
    const maxRetries = 5;
    const retryInterval = setInterval(() => {
      retryCount++;
      console.log(`Dashboard: Retry ${retryCount}/${maxRetries} - checking for results...`);
      
      if (loadResults()) {
        clearInterval(retryInterval);
      } else if (retryCount >= maxRetries) {
        console.warn("Dashboard: Max retries reached, giving up");
        clearInterval(retryInterval);
        setLoading(false);
      }
    }, 500); // Check every 500ms

    return () => clearInterval(retryInterval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] flex items-center justify-center">
        <div className="text-white text-center">
          <p>Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] flex items-center justify-center px-6">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">No Results Found</h1>
          <p className="text-gray-400 mb-8">
            It looks like you haven't completed the questionnaire yet.
          </p>
          <Link
            href="/questionnaire/traveler"
            className="inline-block bg-teal-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Start Free Screening
          </Link>
        </div>
      </div>
    );
  }

  const { scores, ai_analysis, demographics } = results;

  // Helper to format category names
  const formatCategoryName = (category: string): string => {
    return category.replace(/_/g, " ").toLowerCase();
  };

  // Helper to get category display name
  const getCategoryDisplayName = (category: string): string => {
    const names: { [key: string]: string } = {
      nutrition: "Nutrition",
      supplements: "Supplements",
      movement_recovery: "Movement & Recovery",
      screenings_checks: "Screenings & Checks",
      environment: "Environment",
      red_flags: "Red Flags",
    };
    return names[category] || formatCategoryName(category);
  };

  return (
    <div className="dashboard-container relative z-10 flex min-h-screen">
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14 text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-3">
            Your Free ARC Screening Results
          </h1>
          <p className="text-base sm:text-lg text-slate-300/90">
            Personalized health assessment for Digital Nomads Women in Menopause Global Movers
          </p>
        </motion.div>

        {/* Key Metrics Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10 sm:mb-14 space-y-6"
        >
          <div className="text-center">
            <h2 className="dashboard-h2 mb-2">
              Key Metrics
            </h2>
            <div className="h-[1.5px] w-24 bg-gradient-to-r from-emerald-400 to-transparent mb-6 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Stress Load",
                score: scores.stress_load_score,
                summary: ai_analysis.key_metrics.stress_load.summary,
              },
              {
                title: "Cortisol Regulation",
                score: scores.cortisol_regulation_score,
                summary: ai_analysis.key_metrics.cortisol_regulation.summary,
              },
              {
                title: "Sleep Quality",
                score: scores.sleep_quality_score,
                summary: ai_analysis.key_metrics.sleep_quality.summary,
              },
              {
                title: "Cognitive Recovery",
                score: scores.cognitive_recovery_score,
                summary: ai_analysis.key_metrics.cognitive_recovery.summary,
              },
            ].map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + index * 0.05 }}
                className="rounded-3xl border border-emerald-500/10 bg-slate-950/60 backdrop-blur-xl px-4 sm:px-5 py-5 sm:py-6 flex flex-col justify-between shadow-[0_0_40px_rgba(16,185,129,0.12)] hover:border-emerald-400/30 transition-colors min-h-[180px]"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-semibold text-white">
                    {metric.title}
                  </h3>
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 ml-2 flex-shrink-0">
                    {metric.score}
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mt-auto" style={{ maxWidth: "65ch" }}>
                  {metric.summary}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* This Week's Actions Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10 sm:mb-14 space-y-6"
        >
          <div className="text-center">
            <h2 className="dashboard-h2 mb-2">
              This Week's Actions
            </h2>
            <div className="h-[1.5px] w-24 bg-gradient-to-r from-emerald-400 to-transparent mb-6 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {Object.entries(ai_analysis.weekly_actions).map(([category, actions], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 + index * 0.05 }}
                className="
                  h-full flex flex-col
                  rounded-3xl
                  border border-emerald-500/10
                  bg-slate-950/60
                  shadow-[0_0_35px_rgba(16,185,129,0.18)]
                  backdrop-blur-xl
                  px-5 py-5 sm:px-6 sm:py-6
                  transition-all duration-200
                  hover:border-emerald-400/40
                  hover:shadow-[0_0_40px_rgba(16,185,129,0.32)]
                  hover:-translate-y-0.5
                "
              >
                <div className="flex flex-col flex-1">
                  <h3 className="text-sm sm:text-base font-semibold tracking-tight text-white mb-1">
                    {getCategoryDisplayName(category)}
                  </h3>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-emerald-300/80 mb-3">
                    This week's focus
                  </p>
                  
                  <div className="mt-3 space-y-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed flex-1">
                    <ul className="list-disc list-outside ml-4 space-y-1.5">
                      {actions.map((action, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recommended Screenings Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-10 sm:mb-14 space-y-6"
        >
          <div className="text-center">
            <h2 className="dashboard-h2 mb-2">
              Recommended Screenings
            </h2>
            <div className="h-[1.5px] w-24 bg-gradient-to-r from-emerald-400 to-transparent mb-6 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4">
            {ai_analysis.recommended_screenings.map((screening, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.55 + index * 0.05 }}
                className="rounded-3xl border border-emerald-500/10 bg-slate-950/60 px-4 sm:px-5 py-5 sm:py-6 flex flex-col justify-between shadow-[0_0_40px_rgba(16,185,129,0.15)] min-h-[180px]"
              >
                {/* Top Row */}
                <div className="flex items-start justify-between mb-3 gap-3">
                  <h3 className="text-base font-semibold text-white flex-1">
                    {screening.screening}
                  </h3>
                  <span className="inline-flex items-center rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold px-3 py-0.5 flex-shrink-0">
                    {screening.timing}
                  </span>
                </div>

                {/* Purpose Text */}
                <p className="text-sm text-slate-300 leading-relaxed mb-4" style={{ maxWidth: "65ch" }}>
                  {screening.reason}
                </p>

                {/* Triggered By Footer */}
                <div className="mt-4 pt-3 border-t border-slate-800/60 mb-4">
                  <div className="text-xs text-slate-500 mb-1">
                    Triggered by
                  </div>
                  <div className="text-xs text-slate-400">
                    {screening.trigger_findings.join(", ")}
                  </div>
                </div>

                {/* Find on Catalog Button */}
                <div className="mt-auto pt-3 border-t border-slate-800/60">
                  <Link
                    href="/catalog"
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg bg-emerald-500/10 text-emerald-300 text-sm font-semibold border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-colors"
                  >
                    Find on TheArc Catalog
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Full Blueprint Preview Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mb-10 sm:mb-14 space-y-6"
        >
          <div className="text-center">
            <h2 className="dashboard-h2 mb-2">
              Your Full ARC Blueprint Preview
            </h2>
            <div className="h-[1.5px] w-24 bg-gradient-to-r from-emerald-400 to-transparent mb-6 mx-auto" />
            <p className="text-sm text-slate-400 mb-8">
              Preview of advanced modules available in your full blueprint
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Predisposition Map Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="rounded-3xl border border-emerald-500/10 bg-slate-950/60 backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.12)] relative overflow-hidden"
            >
              <div className="px-5 py-6">
                <div className="space-y-2 mb-4">
                  <h3 className="dashboard-h2 text-lg">Predisposition Map</h3>
                  <p className="dashboard-description text-sm">
                    A snapshot of your genetic, biological, and lifestyle risk areas
                  </p>
                </div>
                <div className="space-y-4 blur-sm pointer-events-none">
                  <div className="h-4 bg-slate-800/50 rounded-full" />
                  <div className="h-4 bg-slate-800/50 rounded-full w-3/4" />
                  <div className="h-4 bg-slate-800/50 rounded-full w-1/2" />
                  <div className="h-4 bg-slate-800/50 rounded-full w-4/5" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-2xl mb-2">🔒</div>
                  <p className="text-xs text-emerald-300/80 font-medium">Premium Feature</p>
                </div>
              </div>
            </motion.div>

            {/* Metrics Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.75 }}
              className="rounded-3xl border border-emerald-500/10 bg-slate-950/60 backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.12)] relative overflow-hidden"
            >
              <div className="px-5 py-6">
                <div className="space-y-2 mb-4">
                  <h3 className="dashboard-h2 text-lg">Metrics Dashboard</h3>
                  <p className="dashboard-description text-sm">
                    Real-time tracking of key biological markers and performance indicators
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 blur-sm pointer-events-none">
                  <div className="h-20 bg-slate-800/50 rounded-xl" />
                  <div className="h-20 bg-slate-800/50 rounded-xl" />
                  <div className="h-20 bg-slate-800/50 rounded-xl" />
                  <div className="h-20 bg-slate-800/50 rounded-xl" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-2xl mb-2">🔒</div>
                  <p className="text-xs text-emerald-300/80 font-medium">Premium Feature</p>
                </div>
              </div>
            </motion.div>

            {/* Red Flags & Action Thresholds Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="rounded-3xl border border-emerald-500/10 bg-slate-950/60 backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.12)] relative overflow-hidden"
            >
              <div className="px-5 py-6">
                <div className="space-y-2 mb-4">
                  <h3 className="dashboard-h2 text-lg">Red Flags & Action Thresholds</h3>
                  <p className="dashboard-description text-sm">
                    Critical indicators that require immediate attention and clinical review
                  </p>
                </div>
                <div className="space-y-3 blur-sm pointer-events-none">
                  <div className="h-12 bg-slate-800/50 rounded-lg" />
                  <div className="h-12 bg-slate-800/50 rounded-lg" />
                  <div className="h-12 bg-slate-800/50 rounded-lg" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-2xl mb-2">🔒</div>
                  <p className="text-xs text-emerald-300/80 font-medium">Premium Feature</p>
                </div>
              </div>
            </motion.div>

            {/* This Week's Actions Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.85 }}
              className="rounded-3xl border border-emerald-500/10 bg-slate-950/60 backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.12)] relative overflow-hidden"
            >
              <div className="px-5 py-6">
                <div className="space-y-2 mb-4">
                  <h3 className="dashboard-h2 text-lg">This Week's Actions</h3>
                  <p className="dashboard-description text-sm">
                    Prioritized action items across nutrition, movement, recovery, and screenings
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 blur-sm pointer-events-none">
                  <div className="h-20 bg-slate-800/50 rounded-xl" />
                  <div className="h-20 bg-slate-800/50 rounded-xl" />
                  <div className="h-20 bg-slate-800/50 rounded-xl" />
                  <div className="h-20 bg-slate-800/50 rounded-xl" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-2xl mb-2">🔒</div>
                  <p className="text-xs text-emerald-300/80 font-medium">Premium Feature</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Upgrade CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          aria-labelledby="cta-blueprint-heading"
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14 mb-12"
        >
          <div
            className="
              rounded-3xl
              border border-emerald-500/10
              bg-slate-950/70
              shadow-[0_0_45px_rgba(16,185,129,0.3)]
              backdrop-blur-xl
              px-6 sm:px-10
              py-8 sm:py-10
              relative
              overflow-hidden
            "
          >
            {/* Subtle gradient glow at top */}
            <div className="pointer-events-none absolute inset-x-0 -top-16 h-32 bg-gradient-to-b from-emerald-500/25 to-transparent blur-3xl opacity-70" />
            
            <div className="flex flex-col items-center text-center relative z-10">
              {/* Upgrade label */}
              <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-300/80 mb-2">
                Premium Blueprint Access
              </p>
              
              {/* Headline */}
              <h2
                id="cta-blueprint-heading"
                className="text-2xl sm:text-3xl font-semibold tracking-tight text-white"
              >
                Unlock Your Full ARC Blueprint
              </h2>
              
              {/* Subheading */}
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
                Get access to your complete personalised longevity plan with detailed protocols,
                deeper metrics, and guided support.
              </p>
              
              {/* Button */}
              <div className="mt-7 flex justify-center">
                <Link
                  href="/payment?persona=traveler"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    px-8 py-3.5
                    rounded-full
                    bg-black
                    text-[#4DEECD]
                    border
                    border-white/20
                    text-base
                    font-medium
                    tracking-tight
                    transition-all
                    duration-200
                    ease-out
                    hover:border-white/30
                    hover:text-[#4DEECD]
                    hover:bg-black
                    w-full sm:w-auto
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4DEECD] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
                  "
                >
                  Upgrade to Full Blueprint →
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mb-10 sm:mb-14"
        >
          <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 backdrop-blur-xl px-5 sm:px-6 py-5 sm:py-6">
            <p className="text-xs sm:text-sm text-yellow-200/90 leading-relaxed">
              This assessment is informational and does not replace care from a licensed clinician. Please review these results with your healthcare provider before making medical decisions.
            </p>
          </div>
        </motion.div>
        </div>
      </main>
    </div>
  );
}
