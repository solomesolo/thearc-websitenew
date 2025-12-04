"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import Link from "next/link";

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
    // Get results from localStorage
    const storedResults = localStorage.getItem("questionnaireResults");
    if (storedResults) {
      try {
        const parsed = JSON.parse(storedResults);
        setResults(parsed);
      } catch (error) {
        console.error("Failed to parse results:", error);
      }
    }
    setLoading(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
            Your Free ARC Screening Results
          </h1>
          <p className="text-xl text-gray-400">
            Personalized health assessment for Women in Menopause
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-teal-400">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <GlowCard key={index} delay={0.15 + index * 0.05}>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{metric.title}</h3>
                    <span className="text-2xl font-bold text-teal-400">{metric.score}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                    <div
                      className="bg-gradient-to-r from-teal-400 to-teal-600 h-2 rounded-full"
                      style={{ width: `${metric.score}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-300">{metric.summary}</p>
              </GlowCard>
            ))}
          </div>
        </motion.section>

        {/* This Week's Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-teal-400">This Week's Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(ai_analysis.weekly_actions).map(([category, actions], index) => (
              <GlowCard key={category} delay={0.35 + index * 0.05}>
                <h3 className="text-lg font-semibold mb-4 text-white capitalize">
                  {category.replace(/_/g, " ")}
                </h3>
                <ul className="space-y-2">
                  {actions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-teal-500 mt-1">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </GlowCard>
            ))}
          </div>
        </motion.section>

        {/* Recommended Screenings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-teal-400">Recommended Screenings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ai_analysis.recommended_screenings.map((screening, index) => (
              <GlowCard key={index} delay={0.55 + index * 0.05}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">{screening.screening}</h3>
                  <span className="px-3 py-1 bg-teal-500/20 text-teal-400 text-xs font-medium rounded-full">
                    {screening.timing}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-3">{screening.reason}</p>
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Triggered by:</span>{" "}
                  {screening.trigger_findings.join(", ")}
                </div>
              </GlowCard>
            ))}
          </div>
        </motion.section>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-12"
        >
          <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-6">
            <p className="text-sm text-yellow-200">{ai_analysis.global_disclaimer}</p>
          </div>
        </motion.div>

        {/* Upgrade CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-teal-500/20 rounded-2xl shadow-[0_0_30px_rgba(20,184,166,0.15)] p-8">
            <h2 className="text-2xl font-bold mb-4 text-teal-400">
              Unlock Your Full ARC Blueprint
            </h2>
            <p className="text-gray-400 mb-6">
              Get access to your complete personalized longevity plan with detailed protocols,
              advanced metrics, and ongoing support.
            </p>
            <Link
              href="/dashboard/full"
              className="inline-block bg-teal-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Upgrade to Full Blueprint →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

