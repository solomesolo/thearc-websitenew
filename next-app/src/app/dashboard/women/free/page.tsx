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

export default function WomenFreeDashboardPage() {
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
            href="/questionnaire/women"
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
            Personalized health assessment for Women in Menopause
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
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
                    {metric.title}
                  </h3>
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 ml-2 flex-shrink-0">
                    {metric.score}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-auto" style={{ maxWidth: "65ch" }}>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.entries(ai_analysis.weekly_actions).map(([category, actions], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 + index * 0.05 }}
                className="rounded-3xl border border-emerald-500/10 bg-slate-950/60 px-4 sm:px-5 py-4 sm:py-5 shadow-[0_0_30px_rgba(15,118,110,0.15)]"
              >
                <h3 className="text-sm font-semibold tracking-wide text-white mb-3 lowercase">
                  {formatCategoryName(category)}
                </h3>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300 list-disc list-outside ml-4">
                  {actions.map((action, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {action}
                    </li>
                  ))}
                </ul>
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
                  <h3 className="text-base sm:text-lg font-semibold text-white flex-1">
                    {screening.screening}
                  </h3>
                  <span className="inline-flex items-center rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold px-3 py-0.5 flex-shrink-0">
                    {screening.timing}
                  </span>
                </div>

                {/* Purpose Text */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4" style={{ maxWidth: "65ch" }}>
                  {screening.reason}
                </p>

                {/* Triggered By Footer */}
                <div className="mt-4 pt-3 border-t border-slate-800/60">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-1">
                    Triggered by
                  </div>
                  <div className="text-xs text-slate-400">
                    {screening.trigger_findings.join(", ")}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-10 sm:mb-14"
        >
          <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 backdrop-blur-xl px-5 sm:px-6 py-5 sm:py-6">
            <p className="text-xs sm:text-sm text-yellow-200/90 leading-relaxed">
              {ai_analysis.global_disclaimer}
            </p>
          </div>
        </motion.div>

        {/* Upgrade CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center"
        >
          <div className="rounded-3xl border border-emerald-500/10 bg-slate-950/60 backdrop-blur-xl px-6 sm:px-8 py-8 sm:py-10 shadow-[0_0_40px_rgba(16,185,129,0.15)] text-center w-full max-w-3xl">
            <h2 className="dashboard-h2 mb-3 text-center">
              Unlock Your Full ARC Blueprint
            </h2>
            <p className="text-sm sm:text-base text-slate-300/90 mb-6 mx-auto leading-relaxed text-center">
              Get access to your complete personalized longevity plan with detailed protocols,
              advanced metrics, and ongoing support.
            </p>
            <div className="flex justify-center">
              <Link
                href="/dashboard/full"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-emerald-500 text-white text-sm sm:text-base font-semibold hover:bg-emerald-600 transition-colors"
              >
                Upgrade to Full Blueprint →
              </Link>
            </div>
          </div>
        </motion.div>
        </div>
      </main>
    </div>
  );
}
