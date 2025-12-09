"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setPersona } from "@/lib/persona";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { MetricBar } from "@/components/ui/MetricBar";

export default function RebuilderScreeningWelcomePage() {
  const router = useRouter();

  useEffect(() => {
    // Set persona to rebuilder
    setPersona('rebuilder');
  }, []);

  const handleStartScreening = () => {
    // Navigate to rebuilder-specific questionnaire
    router.push('/questionnaire/rebuilder');
  };

  // Sample predisposition data (preview)
  const predispositionPreview = [
    { label: "Hormonal Stability", value: 65 },
    { label: "Metabolic Health", value: 55 },
    { label: "Sleep Quality", value: 45 },
    { label: "Stress Load", value: 70 },
  ];

  // Sample screening preview
  const screeningPreview = [
    { title: "Hormone panel", subtitle: "Estrogen, progesterone, FSH, LH", month: "Month 1" },
    { title: "Metabolic markers", subtitle: "HbA1c, insulin, lipids", month: "Month 1" },
    { title: "Inflammation panel", subtitle: "CRP, ESR, cytokines", month: "Month 2" },
  ];

  // Sample metrics preview
  const metricsPreview = [
    { name: "Stress Load", value: "70", trend: "moderate" },
    { name: "Sleep Quality", value: "45", trend: "needs attention" },
    { name: "Cortisol Regulation", value: "60", trend: "stable" },
    { name: "Cognitive Recovery", value: "55", trend: "mild drift" },
  ];

  return (
    <div className="dashboard-container relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header - Left Aligned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-3xl"
        >
          <h1 className="dashboard-h1 mb-3">
            Your Free ARC Screening
          </h1>
          <p className="dashboard-description text-lg max-w-2xl leading-relaxed">
            Your Biological Entry Point into the ARC HealthOS
          </p>
          <p className="dashboard-description text-base mt-4 max-w-2xl leading-relaxed">
            This short check-in is designed to help you understand what your body needs this week as you move through perimenopause or menopause.
          </p>
        </motion.div>

        {/* System Preview Block */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="dashboard-h2 mb-6">What You'll Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Biological Snapshot */}
            <GlowCard delay={0.15}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="dashboard-h3">Your Biological Snapshot</h3>
                  <p className="dashboard-description text-sm">
                    ARC starts building your Health Graph based on your answers.
                  </p>
                </div>
                <div className="space-y-3">
                  {metricsPreview.slice(0, 2).map((metric, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="dashboard-label text-xs">{metric.name}</span>
                        <span className="font-semibold text-white">{metric.value}</span>
                      </div>
                      <div className="metric-bar-container">
                        <div
                          className="metric-bar-fill"
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlowCard>

            {/* Predisposition Map Preview */}
            <GlowCard delay={0.2}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="dashboard-h3">Your Predisposition Map Preview</h3>
                  <p className="dashboard-description text-sm">
                    A snapshot of your biological risk areas.
                  </p>
                </div>
                <div className="space-y-3">
                  {predispositionPreview.slice(0, 2).map((metric, idx) => (
                    <MetricBar
                      key={idx}
                      label={metric.label}
                      value={metric.value}
                      delay={0.3 + idx * 0.1}
                    />
                  ))}
                </div>
              </div>
            </GlowCard>

            {/* Precision Screening Plan Preview */}
            <GlowCard delay={0.25}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="dashboard-h3">Your Precision Screening Plan (Sample)</h3>
                  <p className="dashboard-description text-sm">
                    Essential screenings mapped to your needs.
                  </p>
                </div>
                <div className="space-y-3">
                  {screeningPreview.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="pb-3 border-b border-white/5 last:border-0">
                      <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
                      <p className="dashboard-description text-xs">{item.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GlowCard>
          </div>
        </motion.section>

        {/* How It Works - ARC Layers */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="dashboard-h2 mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlowCard delay={0.35}>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#6FFFC3]/20 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-[#6FFFC3]">1</span>
                </div>
                <h3 className="dashboard-h3">ARC Learns You</h3>
                <p className="dashboard-description text-sm">
                  3-minute screening builds your entry point.
                </p>
              </div>
            </GlowCard>

            <GlowCard delay={0.4}>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#6FFFC3]/20 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-[#6FFFC3]">2</span>
                </div>
                <h3 className="dashboard-h3">ARC Maps You</h3>
                <p className="dashboard-description text-sm">
                  We generate your Stability Snapshot + risk signals.
                </p>
              </div>
            </GlowCard>

            <GlowCard delay={0.45}>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#6FFFC3]/20 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-[#6FFFC3]">3</span>
                </div>
                <h3 className="dashboard-h3">ARC Guides You</h3>
                <p className="dashboard-description text-sm">
                  Unlock precision path + screenings when you upgrade.
                </p>
              </div>
            </GlowCard>
          </div>
        </motion.section>

        {/* Preview of Dashboard Modules (Blurred/Locked) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="dashboard-h2 mb-2">Preview of Your Dashboard Modules</h2>
          <p className="dashboard-description text-sm mb-6">
            Your answers help ARC generate your first Stability Snapshot, which powers your HealthOS.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Predisposition Map - Blurred Preview */}
            <GlowCard delay={0.55} className="relative opacity-60">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="dashboard-h3">Predisposition Map</h3>
                  <p className="dashboard-description text-sm">Unlock with Full ARC Blueprint</p>
                </div>
                <div className="space-y-3 blur-sm">
                  {predispositionPreview.map((metric, idx) => (
                    <MetricBar
                      key={idx}
                      label={metric.label}
                      value={metric.value}
                      delay={0}
                    />
                  ))}
                </div>
              </div>
            </GlowCard>

            {/* Precision Screening Plan - Blurred Preview */}
            <GlowCard delay={0.6} className="relative opacity-60">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="dashboard-h3">Precision Screening Plan</h3>
                  <p className="dashboard-description text-sm">Unlock with Full ARC Blueprint</p>
                </div>
                <div className="space-y-3 blur-sm">
                  {screeningPreview.map((item, idx) => (
                    <div key={idx} className="pb-3 border-b border-white/5 last:border-0">
                      <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
                      <p className="dashboard-description text-xs">{item.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GlowCard>

            {/* Metrics Dashboard - Blurred Preview */}
            <GlowCard delay={0.65} className="relative opacity-60">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="dashboard-h3">Metrics Dashboard</h3>
                  <p className="dashboard-description text-sm">Unlock with Full ARC Blueprint</p>
                </div>
                <div className="grid grid-cols-2 gap-3 blur-sm">
                  {metricsPreview.map((metric, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-[#0f0f0f]/60">
                      <p className="dashboard-label text-xs mb-1">{metric.name}</p>
                      <p className="text-xl font-bold text-white">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GlowCard>
          </div>
        </motion.section>

        {/* What Questions Will Be Asked */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-12"
        >
          <GlowCard delay={0.75}>
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="dashboard-h2">What This Check-in Will Ask You About</h2>
                <p className="dashboard-description text-sm">
                  We'll ask a few simple questions about:
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#0f0f0f]/60 border border-white/5">
                  <h3 className="text-base font-semibold text-white mb-2">You & your health basics</h3>
                  <p className="dashboard-description text-sm">Age range, current health conditions, hormonal therapy.</p>
                </div>

                <div className="p-4 rounded-lg bg-[#0f0f0f]/60 border border-white/5">
                  <h3 className="text-base font-semibold text-white mb-2">Food & supplements</h3>
                  <p className="dashboard-description text-sm">How often you eat certain foods and whether you use Vitamin D, magnesium, or omega-3s.</p>
                </div>

                <div className="p-4 rounded-lg bg-[#0f0f0f]/60 border border-white/5">
                  <h3 className="text-base font-semibold text-white mb-2">Movement & recovery</h3>
                  <p className="dashboard-description text-sm">How much you move, and what you do (or don't do) to unwind.</p>
                </div>

                <div className="p-4 rounded-lg bg-[#0f0f0f]/60 border border-white/5">
                  <h3 className="text-base font-semibold text-white mb-2">Sleep, stress & brain fog</h3>
                  <p className="dashboard-description text-sm">How rested you feel, how stressed you are, and how your focus is holding up.</p>
                </div>

                <div className="p-4 rounded-lg bg-[#0f0f0f]/60 border border-white/5 md:col-span-2">
                  <h3 className="text-base font-semibold text-white mb-2">Screenings & lab tests</h3>
                  <p className="dashboard-description text-sm">When you last had routine blood tests and whether you have results available.</p>
                </div>
              </div>

              <p className="dashboard-description text-sm mt-4">
                Each question is multiple choice and easy to answer. There are no "perfect" answers—only honest ones.
              </p>
            </div>
          </GlowCard>
        </motion.section>

        {/* How Answers Will Be Used */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <GlowCard delay={0.85}>
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="dashboard-h2">How Your Answers Will Be Used</h2>
                <p className="dashboard-description text-sm">
                  Your answers help us:
                </p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#6FFFC3] mt-1">•</span>
                  <span className="dashboard-description">Spot patterns in stress, sleep, and energy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#6FFFC3] mt-1">•</span>
                  <span className="dashboard-description">Suggest one or two realistic changes for this week rather than overwhelm you</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#6FFFC3] mt-1">•</span>
                  <span className="dashboard-description">Recommend lab tests that are worth prioritizing (and which can wait)</span>
                </li>
              </ul>
              <p className="dashboard-description text-sm mt-4">
                You'll see your results translated into plain language, not just numbers.
              </p>
            </div>
          </GlowCard>
        </motion.section>

        {/* Important Notes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mb-12"
        >
          <GlowCard delay={0.95}>
            <div className="space-y-4">
              <h2 className="dashboard-h2">A Few Important Notes</h2>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#0f0f0f]/60 border border-white/5">
                  <h3 className="text-base font-semibold text-white mb-2">This is not a diagnostic tool.</h3>
                  <p className="dashboard-description text-sm">It's designed to support you and your clinician, not replace medical care.</p>
                </div>

                <div className="p-4 rounded-lg bg-[#0f0f0f]/60 border border-white/5">
                  <h3 className="text-base font-semibold text-white mb-2">Your responses are private.</h3>
                  <p className="dashboard-description text-sm">They are used only to generate your personalized insights and recommendations.</p>
                </div>

                <div className="p-4 rounded-lg bg-[#0f0f0f]/60 border border-white/5">
                  <h3 className="text-base font-semibold text-white mb-2">You're in control.</h3>
                  <p className="dashboard-description text-sm">You can pause at any time, and you decide what to share with your healthcare provider.</p>
                </div>
              </div>
            </div>
          </GlowCard>
        </motion.section>

        {/* CTA Block - Dashboard Style */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-12"
        >
          <GlowCard delay={1.05}>
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h2 className="dashboard-h2">Ready to Start?</h2>
                <p className="dashboard-description">
                  Build your Biological Entry Point and unlock your first Stability Snapshot.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleStartScreening}
                  className="px-8 py-3.5 rounded-full bg-black border border-[#6FFFC3] text-[#6FFFC3] text-base font-medium tracking-tight transition-all duration-200 hover:bg-[#6FFFC3]/10 hover:border-[#6FFFC3]"
                >
                  Build My Biological Entry Point →
                </button>
                <Link
                  href="/rebuilder"
                  className="px-8 py-3.5 rounded-full bg-black border border-white/20 text-white text-base font-medium tracking-tight transition-all duration-200 hover:border-white/30 hover:bg-white/5 text-center"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </GlowCard>
        </motion.section>
      </div>
    </div>
  );
}
