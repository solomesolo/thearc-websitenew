"use client";

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
import { motion } from "framer-motion";

export default function FullDashboardPage() {
  return (
    <div className="dashboard-container relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
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
              value={85}
              description="Sustained cognitive and emotional pressure detected."
              delay={0.05}
            />
            <MetricCard
              title="Cortisol Regulation"
              value={70}
              description="Reduced recovery capacity across the week."
              delay={0.1}
            />
            <MetricCard
              title="Sleep Quality"
              value={55}
              description="Irregular routines affecting circadian stability."
              delay={0.15}
            />
            <MetricCard
              title="Cognitive Recovery"
              value={60}
              description="Mild fatigue accumulation detected."
              delay={0.2}
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

        {/* Micro Plans */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <MicroPlans />
        </motion.section>

        {/* Travel Protocol */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <TravelProtocol />
        </motion.section>

        {/* Red Flags */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <RedFlags />
        </motion.section>

        {/* Implementation Calendar */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <ImplementationCalendar />
        </motion.section>

        {/* Next Steps */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          <NextStepsCard />
        </motion.section>
      </div>
    </div>
  );
}
