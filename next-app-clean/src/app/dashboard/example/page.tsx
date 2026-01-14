"use client";

import { useState } from "react";
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
import { GlowCard } from "@/components/ui/GlowCard";
import { motion } from "framer-motion";
import EmailSignupModal from "@/components/EmailSignupModal";

export default function ExampleDashboardPage() {
  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleOpenModal = () => {
    setShowEmailModal(true);
  };

  return (
    <div className="dashboard-container relative z-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Custom Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="dashboard-h1 mb-3">
            Example of your personal health program
          </h1>
          <p className="dashboard-description text-base max-w-2xl">
            Your ARC Dashboard gives you early insights, personalised guidance, and
            a clear view of your biological stability.
          </p>
        </motion.div>

        {/* This Week's Actions - No blur */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <WeeklyActions />
        </motion.section>

        {/* Key Metrics - No blur */}
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

        {/* Your Biological Profile - No blur */}
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

        {/* Metrics Dashboard - No blur */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MetricsDashboard />
        </motion.section>

        {/* Monthly Modules Timeline - First 3 months visible */}
        <motion.section
          className="mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div className="blur-sm opacity-40 pointer-events-none">
            <MonthlyModulesTimeline />
          </div>
          <div className="absolute top-0 left-0 w-full">
            <GlowCard delay={0.1} className="relative">
              <div className="space-y-6 mb-8">
                <div className="space-y-2">
                  <h3 className="dashboard-h2">Six-Month Modular Path</h3>
                  <p className="dashboard-description text-sm">
                    A progressive, month-by-month approach to biological optimization and longevity.
                  </p>
                </div>
              </div>

              <div className="relative pl-8">
                {/* Vertical Timeline Line */}
                <div className="timeline-line" />

                <div className="space-y-10">
                  {/* Month 1 - Visible */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="timeline-dot" style={{ top: "0.5rem" }} />
                    <div className="ml-6">
                      <span className="dashboard-label text-xs mb-2 block">Month 1</span>
                      <h4 className="text-lg font-semibold text-white mb-2">Reset & Re-baseline</h4>
                      <p className="dashboard-description text-sm">
                        Establish your biological foundation and identify baseline patterns before optimization.
                      </p>
                    </div>
                  </motion.div>

                  {/* Month 2 - Visible */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="timeline-dot" style={{ top: "0.5rem" }} />
                    <div className="ml-6">
                      <span className="dashboard-label text-xs mb-2 block">Month 2</span>
                      <h4 className="text-lg font-semibold text-white mb-2">Stabilise Core Systems</h4>
                      <p className="dashboard-description text-sm">
                        Strengthen foundational biological systems for sustained performance.
                      </p>
                    </div>
                  </motion.div>

                  {/* Month 3 - Visible */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="timeline-dot" style={{ top: "0.5rem" }} />
                    <div className="ml-6">
                      <span className="dashboard-label text-xs mb-2 block">Month 3</span>
                      <h4 className="text-lg font-semibold text-white mb-2">Strengthen Resilience</h4>
                      <p className="dashboard-description text-sm">
                        Build adaptive capacity to handle stress and maintain biological stability.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </GlowCard>
          </div>
        </motion.section>

        {/* Performance Path - Month 1 and 2 visible */}
        <motion.section
          className="mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="blur-sm opacity-40 pointer-events-none">
            <PerformancePathCard />
          </div>
          <div className="absolute top-0 left-0 w-full">
            <GlowCard delay={0.2} className="relative">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="dashboard-h2">Your 6-Month Performance Path</h3>
                  <p className="dashboard-description text-sm">
                    A clinically guided, month-by-month program designed to strengthen your focus, stamina, and resilience.
                  </p>
                </div>

                <div className="relative pl-8">
                  {/* Vertical Timeline Line */}
                  <div className="timeline-line" />

                  <div className="space-y-10">
                    {/* Month 1 - Visible */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <div className="timeline-dot" style={{ top: "0.5rem" }} />
                      <div className="ml-6">
                        <div className="mb-3">
                          <span className="dashboard-label text-xs mb-2 block">Month 1</span>
                          <h4 className="text-lg font-semibold text-white mb-3">Reset & Re-baseline</h4>
                        </div>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                            <span className="text-[#6FFFC3]">•</span>
                            <span>Full travel-specific blood panel</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                            <span className="text-[#6FFFC3]">•</span>
                            <span>Circadian + sleep pattern reset</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                            <span className="text-[#6FFFC3]">•</span>
                            <span>Digestive stabilisation plan</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                            <span className="text-[#6FFFC3]">•</span>
                            <span>Rebuild core biological baseline</span>
                          </li>
                        </ul>
                      </div>
                    </motion.div>

                    {/* Month 2 - Visible */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <div className="timeline-dot" style={{ top: "0.5rem" }} />
                      <div className="ml-6">
                        <div className="mb-3">
                          <span className="dashboard-label text-xs mb-2 block">Month 2</span>
                          <h4 className="text-lg font-semibold text-white mb-3">Stabilise & Strengthen</h4>
                        </div>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                            <span className="text-[#6FFFC3]">•</span>
                            <span>Stress + cortisol balancing</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                            <span className="text-[#6FFFC3]">•</span>
                            <span>Nutrient optimisation for energy</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                            <span className="text-[#6FFFC3]">•</span>
                            <span>Cardiometabolic stabilisation</span>
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>
        </motion.section>

        {/* Nutrition Plan - Day 1 visible, Day 2 and 3 blurred */}
        <motion.section
          className="mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <div className="blur-sm opacity-40 pointer-events-none">
            <NutritionPlan />
          </div>
          <div className="absolute top-0 left-0 w-full">
            <GlowCard delay={0.15}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="dashboard-h2">Nutrition Protocol</h3>
                    <span className="px-3 py-1 rounded-full bg-[#6FFFC3]/10 text-[#6FFFC3] text-xs font-medium border border-[#6FFFC3]/20">
                      Metabolic Flexibility
                    </span>
                  </div>
                  <p className="dashboard-description text-sm">
                    A science-backed nutrition plan designed to support metabolic health, energy stability, and longevity.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Core Principles</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-[#0f0f0f]/60 border border-white/5">
                      <span className="text-[#6FFFC3]">✓</span>
                      <span className="text-sm text-[#A3B3AA]">Prioritize whole, unprocessed foods</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-[#0f0f0f]/60 border border-white/5">
                      <span className="text-[#6FFFC3]">✓</span>
                      <span className="text-sm text-[#A3B3AA]">Time meals to support circadian rhythm</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-[#0f0f0f]/60 border border-white/5">
                      <span className="text-[#6FFFC3]">✓</span>
                      <span className="text-sm text-[#A3B3AA]">Balance macronutrients for metabolic flexibility</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-[#0f0f0f]/60 border border-white/5">
                      <span className="text-[#6FFFC3]">✓</span>
                      <span className="text-sm text-[#A3B3AA]">Include anti-inflammatory foods daily</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-[#0f0f0f]/60 border border-white/5">
                      <span className="text-[#6FFFC3]">✓</span>
                      <span className="text-sm text-[#A3B3AA]">Optimize protein intake for muscle maintenance</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-[#0f0f0f]/60 border border-white/5">
                      <span className="text-[#6FFFC3]">✓</span>
                      <span className="text-sm text-[#A3B3AA]">Support gut health with fiber and fermented foods</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">3-Day Meal Plan</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Day 1 - Visible */}
                    <div className="p-4 rounded-xl border bg-[#6FFFC3]/10 border-[#6FFFC3]/30">
                      <h5 className="text-sm font-semibold text-white mb-3">Day 1</h5>
                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="text-[#8A938E]">Breakfast:</span>
                          <p className="text-[#A3B3AA] mt-1">Scrambled eggs with spinach, avocado, and sauerkraut</p>
                        </div>
                        <div>
                          <span className="text-[#8A938E]">Lunch:</span>
                          <p className="text-[#A3B3AA] mt-1">Grilled salmon with roasted vegetables and quinoa</p>
                        </div>
                        <div>
                          <span className="text-[#8A938E]">Dinner:</span>
                          <p className="text-[#A3B3AA] mt-1">Chicken stir-fry with mixed vegetables and brown rice</p>
                        </div>
                        <div>
                          <span className="text-[#8A938E]">Snacks:</span>
                          <ul className="mt-1 space-y-1">
                            <li className="text-[#A3B3AA]">• Greek yogurt with berries</li>
                            <li className="text-[#A3B3AA]">• Almonds and apple</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Day 2 - Blurred */}
                    <div className="p-4 rounded-xl border bg-[#0f0f0f]/60 border-white/5 blur-sm opacity-40">
                      <h5 className="text-sm font-semibold text-white mb-3">Day 2</h5>
                    </div>

                    {/* Day 3 - Blurred */}
                    <div className="p-4 rounded-xl border bg-[#0f0f0f]/60 border-white/5 blur-sm opacity-40">
                      <h5 className="text-sm font-semibold text-white mb-3">Day 3</h5>
                    </div>
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>
        </motion.section>

        {/* Movement & Recovery - First 2 boxes visible */}
        <motion.section
          className="mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="blur-sm opacity-40 pointer-events-none">
            <MovementRecoveryModule />
          </div>
          <div className="absolute top-0 left-0 w-full">
            <GlowCard delay={0.2}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="dashboard-h2">Movement & Recovery Protocols</h3>
                  <p className="dashboard-description text-sm">
                    Evidence-based breathing, recovery, and movement techniques to optimize performance and resilience.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Box Breathing - Visible */}
                  <motion.div
                    className="rounded-xl border border-white/5 bg-[#0f0f0f]/60 overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <div className="w-full p-4 text-left flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-base font-semibold text-white">Box Breathing</h4>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium border bg-[#6FFFC3]/10 text-[#6FFFC3] border-[#6FFFC3]/20">
                            breathing
                          </span>
                        </div>
                        <p className="dashboard-description text-sm">
                          A simple technique to activate the parasympathetic nervous system and reduce stress.
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-[#8A938E]">
                          <span>⏱ 5-10 minutes</span>
                          <span>🔄 2-3x daily, especially during stress</span>
                        </div>
                      </div>
                      <span className="text-[#6FFFC3] text-xl">+</span>
                    </div>
                  </motion.div>

                  {/* 4-7-8 Breathing - Visible */}
                  <motion.div
                    className="rounded-xl border border-white/5 bg-[#0f0f0f]/60 overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <div className="w-full p-4 text-left flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-base font-semibold text-white">4-7-8 Breathing</h4>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium border bg-[#6FFFC3]/10 text-[#6FFFC3] border-[#6FFFC3]/20">
                            breathing
                          </span>
                        </div>
                        <p className="dashboard-description text-sm">
                          Promotes relaxation and can help with sleep onset.
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-[#8A938E]">
                          <span>⏱ 5 minutes</span>
                          <span>🔄 Before bed, during stress</span>
                        </div>
                      </div>
                      <span className="text-[#6FFFC3] text-xl">+</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </GlowCard>
          </div>
        </motion.section>

        {/* Supplement Protocol - Header and table header visible, table data blurred */}
        <motion.section
          className="mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <div className="blur-sm opacity-40 pointer-events-none">
            <SupplementProtocol />
          </div>
          <div className="absolute top-0 left-0 w-full">
            <GlowCard delay={0.25}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="dashboard-h2">Supplement Protocol</h3>
                  <p className="dashboard-description text-sm">
                    Evidence-based supplementation to support longevity, performance, and biological optimization.
                    Always consult with a healthcare provider before starting new supplements.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 dashboard-label text-xs">Supplement</th>
                        <th className="text-left py-3 px-4 dashboard-label text-xs">Dose</th>
                        <th className="text-left py-3 px-4 dashboard-label text-xs">Timing</th>
                        <th className="text-left py-3 px-4 dashboard-label text-xs">Why</th>
                        <th className="text-left py-3 px-4 dashboard-label text-xs">Safety Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* First 3 rows - Visible */}
                      <tr className="border-b border-white/5">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                            <span className="text-sm font-semibold text-white">Omega-3 (EPA/DHA)</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-[#A3B3AA]">2-3g daily</td>
                        <td className="py-4 px-4 text-sm text-[#A3B3AA]">With meals</td>
                        <td className="py-4 px-4 text-sm text-[#A3B3AA] max-w-xs">Supports cardiovascular health, reduces inflammation, and supports cognitive function.</td>
                        <td className="py-4 px-4 text-sm text-[#8A938E] max-w-xs">May interact with blood thinners. Consult healthcare provider if on anticoagulants.</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                            <span className="text-sm font-semibold text-white">Vitamin D3 + K2</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-[#A3B3AA]">2000-4000 IU D3, 100-200mcg K2</td>
                        <td className="py-4 px-4 text-sm text-[#A3B3AA]">Morning with fat-containing meal</td>
                        <td className="py-4 px-4 text-sm text-[#A3B3AA] max-w-xs">Essential for bone health, immune function, and calcium metabolism. K2 ensures proper calcium utilization.</td>
                        <td className="py-4 px-4 text-sm text-[#8A938E] max-w-xs">—</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                            <span className="text-sm font-semibold text-white">Magnesium</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-[#A3B3AA]">400-600mg elemental</td>
                        <td className="py-4 px-4 text-sm text-[#A3B3AA]">Evening, 1-2 hours before bed</td>
                        <td className="py-4 px-4 text-sm text-[#A3B3AA] max-w-xs">Supports sleep quality, muscle recovery, and stress response. Many people are deficient.</td>
                        <td className="py-4 px-4 text-sm text-[#8A938E] max-w-xs">—</td>
                      </tr>
                      {/* Remaining rows - Blurred */}
                      <tr className="border-b border-white/5 blur-sm opacity-40">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                            <span className="text-sm font-semibold text-white">Probiotics</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-[#A3B3AA]">10-50 billion CFU</td>
                        <td className="py-4 px-4 text-sm text-[#A3B3AA]">Morning on empty stomach or with first meal</td>
                        <td className="py-4 px-4 text-sm text-[#A3B3AA] max-w-xs">Supports gut health, immune function, and nutrient absorption.</td>
                        <td className="py-4 px-4 text-sm text-[#8A938E] max-w-xs">—</td>
                      </tr>
                      <tr className="border-b border-white/5 blur-sm opacity-40">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                            <span className="text-sm font-semibold text-white">CoQ10</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-[#A3B3AA]">100-200mg</td>
                        <td className="py-4 px-4 text-sm text-[#A3B3AA]">With meals</td>
                        <td className="py-4 px-4 text-sm text-[#A3B3AA] max-w-xs">Supports cellular energy production and cardiovascular health. Especially important with age.</td>
                        <td className="py-4 px-4 text-sm text-[#8A938E] max-w-xs">—</td>
                      </tr>
                      <tr className="border-b border-white/5 blur-sm opacity-40">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                            <span className="text-sm font-semibold text-white">B-Complex</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-[#A3B3AA]">As per label (B-50 or B-100)</td>
                        <td className="py-4 px-4 text-sm text-[#A3B3AA]">Morning with food</td>
                        <td className="py-4 px-4 text-sm text-[#A3B3AA] max-w-xs">Supports energy metabolism, cognitive function, and stress response.</td>
                        <td className="py-4 px-4 text-sm text-[#8A938E] max-w-xs">—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </GlowCard>
          </div>
        </motion.section>

        {/* Environmental Reset - First 2 sections visible */}
        <motion.section
          className="mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="blur-sm opacity-40 pointer-events-none">
            <EnvironmentalReset />
          </div>
          <div className="absolute top-0 left-0 w-full">
            <GlowCard delay={0.4}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="dashboard-h2">Environmental Reset Module</h3>
                  <p className="dashboard-description text-sm">
                    Optimize your physical environment to support circadian health, sleep quality, and biological resilience.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Circadian Reset - Visible */}
                  <motion.div
                    className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                  >
                    <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                      Circadian Reset
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">✓</span>
                        <span>Morning light exposure: 10-15 min within 30 min of waking</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">✓</span>
                        <span>Evening light dimming: Reduce blue light 2 hours before bed</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">✓</span>
                        <span>Consistent sleep-wake schedule (±30 min)</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">✓</span>
                        <span>Blackout curtains or sleep mask</span>
                      </li>
                    </ul>
                  </motion.div>

                  {/* Bedroom Optimization - Visible */}
                  <motion.div
                    className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                  >
                    <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                      Bedroom Optimization
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">✓</span>
                        <span>Temperature: 65-68°F (18-20°C)</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">✓</span>
                        <span>Remove electronic devices from bedroom</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">✓</span>
                        <span>Use blue light blocking glasses in evening</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">✓</span>
                        <span>Optimize mattress and pillow for comfort</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </div>
            </GlowCard>
          </div>
        </motion.section>

        {/* Micro Plans - First 2 sections visible */}
        <motion.section
          className="mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <div className="blur-sm opacity-40 pointer-events-none">
            <MicroPlans />
          </div>
          <div className="absolute top-0 left-0 w-full">
            <GlowCard delay={0.35}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="dashboard-h2">Risk-Focused Micro-Plans</h3>
                  <p className="dashboard-description text-sm">
                    Targeted intervention plans that activate automatically when specific risk markers are detected.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Inflammation Risk - Visible */}
                  <motion.div
                    className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                      <h4 className="text-base font-semibold text-white">Inflammation Risk</h4>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="text-xs font-semibold text-[#A3B3AA] mb-2 uppercase tracking-wider">
                          Micro-Actions
                        </h5>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                            <span className="text-[#6FFFC3]">•</span>
                            <span>Increase omega-3 intake (2-3g daily)</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                            <span className="text-[#6FFFC3]">•</span>
                            <span>Reduce processed foods by 50%</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                            <span className="text-[#6FFFC3]">•</span>
                            <span>Add turmeric/ginger to meals</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                            <span className="text-[#6FFFC3]">•</span>
                            <span>Prioritize 7-8 hours sleep</span>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-white/5">
                        <h5 className="text-xs font-semibold text-[#A3B3AA] mb-1 uppercase tracking-wider">
                          Weekly Trigger
                        </h5>
                        <p className="text-sm text-[#8A938E]">If inflammation markers rise above baseline</p>
                      </div>

                      <div className="pt-3 border-t border-white/5">
                        <h5 className="text-xs font-semibold text-[#A3B3AA] mb-1 uppercase tracking-wider">
                          Expected Benefits
                        </h5>
                        <p className="text-sm text-[#A3B3AA]">Reduced systemic inflammation, improved recovery, lower disease risk</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Stress Overload - Visible */}
                  <motion.div
                    className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                      <h4 className="text-base font-semibold text-white">Stress Overload</h4>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="text-xs font-semibold text-[#A3B3AA] mb-2 uppercase tracking-wider">
                          Micro-Actions
                        </h5>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                            <span className="text-[#6FFFC3]">•</span>
                            <span>Implement daily breathing exercises (10 min)</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                            <span className="text-[#6FFFC3]">•</span>
                            <span>Schedule 2-3 recovery breaks daily</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                            <span className="text-[#6FFFC3]">•</span>
                            <span>Reduce caffeine after 2pm</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                            <span className="text-[#6FFFC3]">•</span>
                            <span>Increase magnesium intake</span>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-white/5">
                        <h5 className="text-xs font-semibold text-[#A3B3AA] mb-1 uppercase tracking-wider">
                          Weekly Trigger
                        </h5>
                        <p className="text-sm text-[#8A938E]">If stress load exceeds 75 for 3+ consecutive days</p>
                      </div>

                      <div className="pt-3 border-t border-white/5">
                        <h5 className="text-xs font-semibold text-[#A3B3AA] mb-1 uppercase tracking-wider">
                          Expected Benefits
                        </h5>
                        <p className="text-sm text-[#A3B3AA]">Better stress resilience, improved sleep, enhanced cognitive function</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </GlowCard>
          </div>
        </motion.section>

        {/* Travel Protocol - Pre-Travel tab visible, other tabs blurred */}
        <motion.section
          className="mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="relative">
            <div className="blur-sm opacity-40 pointer-events-none">
              <TravelProtocol />
            </div>
            <div className="absolute top-0 left-0 w-full">
              <div className="bg-[#0a0a0a] rounded-xl border border-white/10 p-6">
                <div className="space-y-2 mb-6">
                  <h3 className="dashboard-h2">Travel Protocol</h3>
                  <p className="dashboard-description text-sm">
                    A comprehensive plan to maintain biological stability during travel and minimize jet lag impact.
                  </p>
                </div>

                <div className="flex gap-2 mb-6">
                  {/* Pre-Travel tab - Active and visible */}
                  <button className="px-4 py-2 rounded-lg text-sm font-medium bg-[#6FFFC3]/10 text-[#6FFFC3] border border-[#6FFFC3]/30">
                    Pre-Travel Stabilisation
                  </button>
                  {/* Other tabs - Blurred */}
                  <div className="blur-sm opacity-30">
                    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-[#0f0f0f]/60 text-[#A3B3AA] border border-white/5">
                      During-Travel Plan
                    </button>
                  </div>
                  <div className="blur-sm opacity-30">
                    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-[#0f0f0f]/60 text-[#A3B3AA] border border-white/5">
                      Post-Travel Recovery
                    </button>
                  </div>
                </div>

                {/* Pre-Travel content - Visible */}
                <div className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5">
                  <h4 className="text-base font-semibold text-white mb-4">
                    Pre-Travel Stabilisation
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                      <span className="text-[#6FFFC3]">•</span>
                      <span>Gradually adjust sleep schedule 2-3 days before departure</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                      <span className="text-[#6FFFC3]">•</span>
                      <span>Optimize hydration (increase water intake)</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                      <span className="text-[#6FFFC3]">•</span>
                      <span>Support immune system (vitamin C, zinc, probiotics)</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-[#A3B3AA]">
                      <span className="text-[#6FFFC3]">•</span>
                      <span>Pack travel essentials (sleep mask, earplugs, supplements)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Red Flags - First 2 sections visible */}
        <motion.section
          className="mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <div className="blur-sm opacity-40 pointer-events-none">
            <RedFlags />
          </div>
          <div className="absolute top-0 left-0 w-full">
            <GlowCard delay={0.5}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="dashboard-h2">Red Flags & Action Thresholds</h3>
                  <p className="dashboard-description text-sm">
                    Clear guidelines for when to monitor, retest, or seek medical attention based on biomarker changes.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Inflammation Markers - Visible */}
                  <motion.div
                    className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                  >
                    <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
                      Inflammation Markers
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="text-xs font-semibold text-[#A3B3AA] mb-2 uppercase tracking-wider">
                          When to Monitor
                        </h5>
                        <ul className="space-y-1.5">
                          <li className="text-xs text-[#8A938E]">• CRP &gt; 3.0 mg/L</li>
                          <li className="text-xs text-[#8A938E]">• Persistent elevated markers for 2+ weeks</li>
                          <li className="text-xs text-[#8A938E]">• Rapid increase (&gt;50%) in short period</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-xs font-semibold text-[#A3B3AA] mb-2 uppercase tracking-wider">
                          When to Retest
                        </h5>
                        <p className="text-xs text-[#8A938E]">If markers remain elevated after 4-6 weeks of intervention</p>
                      </div>

                      <div>
                        <h5 className="text-xs font-semibold text-red-400/80 mb-2 uppercase tracking-wider">
                          When to Seek Medical Review
                        </h5>
                        <p className="text-xs text-[#8A938E]">If CRP &gt; 10 mg/L or persistent symptoms (fever, joint pain, fatigue)</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Stress & Cortisol - Visible */}
                  <motion.div
                    className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.65 }}
                  >
                    <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
                      Stress & Cortisol
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="text-xs font-semibold text-[#A3B3AA] mb-2 uppercase tracking-wider">
                          When to Monitor
                        </h5>
                        <ul className="space-y-1.5">
                          <li className="text-xs text-[#8A938E]">• Cortisol awakening response &lt; 2.5 nmol/L</li>
                          <li className="text-xs text-[#8A938E]">• Evening cortisol not declining</li>
                          <li className="text-xs text-[#8A938E]">• DHEA-S significantly low for age</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-xs font-semibold text-[#A3B3AA] mb-2 uppercase tracking-wider">
                          When to Retest
                        </h5>
                        <p className="text-xs text-[#8A938E]">After 6-8 weeks of stress management protocols</p>
                      </div>

                      <div>
                        <h5 className="text-xs font-semibold text-red-400/80 mb-2 uppercase tracking-wider">
                          When to Seek Medical Review
                        </h5>
                        <p className="text-xs text-[#8A938E]">If experiencing severe fatigue, weight changes, or mood disturbances</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </GlowCard>
          </div>
        </motion.section>

        {/* Implementation Calendar - First 3 months visible */}
        <motion.section
          className="mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="blur-sm opacity-40 pointer-events-none">
            <ImplementationCalendar />
          </div>
          <div className="absolute top-0 left-0 w-full">
            <GlowCard delay={0.55}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="dashboard-h2">Implementation Calendar</h3>
                  <p className="dashboard-description text-sm">
                    A rotating monthly plan that integrates all modules into a cohesive, progressive program.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Month 1 - Visible */}
                  <motion.div
                    className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                      <span className="dashboard-label text-xs">Month 1</span>
                    </div>
                    <h4 className="text-base font-semibold text-white mb-3">Reset & Re-baseline</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-xs text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">•</span>
                        <span>Concept & Foundation</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">•</span>
                        <span>Environmental Reset</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">•</span>
                        <span>Basic Nutrition</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">•</span>
                        <span>Sleep Optimization</span>
                      </li>
                    </ul>
                  </motion.div>

                  {/* Month 2 - Visible */}
                  <motion.div
                    className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.65 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                      <span className="dashboard-label text-xs">Month 2</span>
                    </div>
                    <h4 className="text-base font-semibold text-white mb-3">Stabilise Core Systems</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-xs text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">•</span>
                        <span>Advanced Nutrition</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">•</span>
                        <span>Movement Protocols</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">•</span>
                        <span>Stress Management</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">•</span>
                        <span>Supplement Protocol</span>
                      </li>
                    </ul>
                  </motion.div>

                  {/* Month 3 - Visible */}
                  <motion.div
                    className="p-5 rounded-xl bg-[#0f0f0f]/60 border border-white/5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-[#6FFFC3]"></div>
                      <span className="dashboard-label text-xs">Month 3</span>
                    </div>
                    <h4 className="text-base font-semibold text-white mb-3">Strengthen Resilience</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-xs text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">•</span>
                        <span>Recovery Protocols</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">•</span>
                        <span>Micro-Plans Activation</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">•</span>
                        <span>Metrics Tracking</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-[#A3B3AA]">
                        <span className="text-[#6FFFC3]">•</span>
                        <span>Travel Protocol</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </div>
            </GlowCard>
          </div>
        </motion.section>

        {/* Final CTA Section */}
        <motion.section
          className="relative py-20 md:py-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          <div className="flex flex-col items-center text-center gap-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-wide leading-tight">
              Start building stability
            </h2>
            <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto">
              Your symptoms are real. Your path to clarity shouldn't be.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={handleOpenModal}
                className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-slate-950 bg-[#6FFFC3] hover:bg-[#6FFFC3]/90 shadow-lg shadow-[#6FFFC3]/40 transition-all"
              >
                Choose my plan
              </button>
              <button 
                onClick={handleOpenModal}
                className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white/30 transition-all"
              >
                Start free health screening
              </button>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Email Signup Modal */}
      <EmailSignupModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} />
    </div>
  );
}
