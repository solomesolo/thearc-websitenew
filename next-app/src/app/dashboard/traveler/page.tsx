"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import PredispositionCard from "@/components/dashboard/PredispositionCard";
import MetricCard from "@/components/dashboard/MetricCard";
import ScreeningCard from "@/components/dashboard/ScreeningCard";
import PerformancePathCard from "@/components/dashboard/PerformancePathCard";
import NextStepsCard from "@/components/dashboard/NextStepsCard";

// Blueprint Components
import { MonthlyModulesTimeline } from "@/components/dashboard/blueprint/MonthlyModulesTimeline";
import { NutritionPlan } from "@/components/dashboard/blueprint/NutritionPlan";
import { MovementRecoveryModule } from "@/components/dashboard/blueprint/MovementRecoveryModule";
import { SupplementProtocol } from "@/components/dashboard/blueprint/SupplementProtocol";
import { MetricsDashboard } from "@/components/dashboard/blueprint/MetricsDashboard";
import { MicroPlans } from "@/components/dashboard/blueprint/MicroPlans";
import { EnvironmentalReset } from "@/components/dashboard/blueprint/EnvironmentalReset";
import { TravelProtocol } from "@/components/dashboard/blueprint/TravelProtocol";
import { RedFlags } from "@/components/dashboard/blueprint/RedFlags";
import { ImplementationCalendar } from "@/components/dashboard/blueprint/ImplementationCalendar";
import { WeeklyActions } from "@/components/dashboard/weekly/WeeklyActions";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";

interface FullQuestionnaireResults {
  scores: {
    stress_load_score: number;
    cortisol_regulation_score: number;
    sleep_quality_score: number;
    cognitive_recovery_score: number;
    movement_recovery_gap_score: number;
    nutrition_risk_score: number;
    environment_risk_score: number;
    supplement_gap_score: number;
    red_flag_burden_score: number;
    lifestyle_load_score: number;
    menopause_symptom_burden: number;
  };
  composites: {
    [key: string]: { raw: number; normalized: number };
  };
  r8Immediate: boolean;
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
    biological_profile?: {
      predisposition_map: any;
      precision_screening_plan: any[];
    };
    metrics_dashboard?: any;
    six_month_modular_path?: any;
    performance_path_details?: any;
    nutrition_protocol?: any;
    movement_recovery_protocols?: any[];
    supplement_protocol?: any[];
    environmental_reset_module?: any;
    risk_focused_microplans?: any[];
    travel_protocol?: any;
    red_flags_and_thresholds?: any[];
    implementation_calendar?: any;
    global_disclaimer?: string;
  };
}

export default function TravelerFullDashboardPage() {
  const router = useRouter();
  const [results, setResults] = useState<FullQuestionnaireResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to load results
    const loadResults = () => {
      const storedResults = localStorage.getItem("questionnaireResults");
      console.log("Full Dashboard: Checking for results in localStorage");
      console.log("Full Dashboard: Stored results exists?", !!storedResults);
      
      if (storedResults) {
        try {
          const parsed = JSON.parse(storedResults);
          console.log("Full Dashboard: Parsed results:", parsed);
          console.log("Full Dashboard: Results structure:", {
            hasScores: !!parsed.scores,
            hasComposites: !!parsed.composites,
            hasAiAnalysis: !!parsed.ai_analysis,
            r8Immediate: parsed.r8Immediate,
          });
          setResults(parsed);
          setLoading(false);
          return true; // Success
        } catch (error) {
          console.error("Full Dashboard: Failed to parse results:", error);
          console.error("Full Dashboard: Raw stored results:", storedResults);
          setLoading(false);
          return false;
        }
      } else {
        console.warn("Full Dashboard: No results found in localStorage");
        console.log("Full Dashboard: Available localStorage keys:", Object.keys(localStorage));
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
      console.log(`Full Dashboard: Retry ${retryCount}/${maxRetries} - checking for results...`);
      
      if (loadResults()) {
        clearInterval(retryInterval);
      } else if (retryCount >= maxRetries) {
        console.warn("Full Dashboard: Max retries reached, giving up");
        clearInterval(retryInterval);
        setLoading(false);
      }
    }, 500);

    return () => clearInterval(retryInterval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p>Loading your full blueprint...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 flex items-center justify-center px-6">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">No Results Found</h1>
          <p className="text-gray-400 mb-8">
            It looks like you haven't completed the full questionnaire yet.
          </p>
          <Link
            href="/payment?persona=traveler"
            className="inline-block bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-semibold py-3 px-6 rounded-full hover:from-emerald-300 hover:to-teal-400 transition-all"
          >
            Complete Purchase & Questionnaire
          </Link>
        </div>
      </div>
    );
  }

  const { scores, ai_analysis } = results;

  // Extract key metrics from AI analysis or use scores as fallback
  const keyMetrics = ai_analysis?.key_metrics || {
    stress_load: { score: scores.stress_load_score, summary: "Based on your responses" },
    cortisol_regulation: { score: scores.cortisol_regulation_score, summary: "Based on your responses" },
    sleep_quality: { score: scores.sleep_quality_score, summary: "Based on your responses" },
    cognitive_recovery: { score: scores.cognitive_recovery_score, summary: "Based on your responses" },
  };

  return (
    <div className="dashboard-container relative z-10">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 max-w-7xl mx-auto px-6 py-12">
          <WelcomeHeader />

          {/* This Week's Actions */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <WeeklyActions />
          </motion.section>

          {/* Quick Metrics Row */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="dashboard-h2 mb-6">Key Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Stress Load"
                value={Math.round(keyMetrics.stress_load.score).toString()}
                trend={keyMetrics.stress_load.score < 30 ? "low" : keyMetrics.stress_load.score < 60 ? "moderate" : keyMetrics.stress_load.score < 80 ? "high" : "very high"}
                description={keyMetrics.stress_load.summary}
              />
              <MetricCard
                title="Sleep Quality"
                value={Math.round(keyMetrics.sleep_quality.score).toString()}
                trend={keyMetrics.sleep_quality.score < 30 ? "excellent" : keyMetrics.sleep_quality.score < 60 ? "good" : keyMetrics.sleep_quality.score < 80 ? "needs attention" : "poor"}
                description={keyMetrics.sleep_quality.summary}
              />
              <MetricCard
                title="Cortisol Regulation"
                value={Math.round(keyMetrics.cortisol_regulation.score).toString()}
                trend={keyMetrics.cortisol_regulation.score < 30 ? "stable" : keyMetrics.cortisol_regulation.score < 60 ? "moderate" : keyMetrics.cortisol_regulation.score < 80 ? "unstable" : "very unstable"}
                description={keyMetrics.cortisol_regulation.summary}
              />
              <MetricCard
                title="Cognitive Recovery"
                value={Math.round(keyMetrics.cognitive_recovery.score).toString()}
                trend={keyMetrics.cognitive_recovery.score < 30 ? "excellent" : keyMetrics.cognitive_recovery.score < 60 ? "good" : keyMetrics.cognitive_recovery.score < 80 ? "needs support" : "poor"}
                description={keyMetrics.cognitive_recovery.summary}
              />
            </div>
          </motion.section>

          {/* Predisposition & Screening */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="dashboard-h2 mb-6">Your Biological Profile</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PredispositionCard />
              <ScreeningCard />
            </div>
          </motion.section>

          {/* Metrics Dashboard */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MetricsDashboard />
          </motion.section>

          {/* Monthly Modules Timeline */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <MonthlyModulesTimeline />
          </motion.section>

          {/* Performance Path */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <PerformancePathCard />
          </motion.section>

          {/* Nutrition Plan */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <NutritionPlan />
          </motion.section>

          {/* Movement & Recovery */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MovementRecoveryModule />
          </motion.section>

          {/* Supplement Protocol */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <SupplementProtocol />
          </motion.section>

          {/* Environmental Reset */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <EnvironmentalReset />
          </motion.section>

          {/* Red Flags & Action Thresholds */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <RedFlags />
          </motion.section>

          {/* Micro Plans */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <MicroPlans />
          </motion.section>

          {/* Implementation Calendar */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <ImplementationCalendar />
          </motion.section>

          {/* Next Steps */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <NextStepsCard />
          </motion.section>
        </div>
      </div>
    </div>
  );
}

