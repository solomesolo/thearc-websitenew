"use client";

import { motion } from "framer-motion";

interface ResultsLoadingProps {
  progress: number; // 0-100
  personaLabel?: string;
  stageLabel?: string;
}

export default function ResultsLoading({
  progress,
  personaLabel = "Women in Menopause",
  stageLabel = "Calculating your risk factors...",
}: ResultsLoadingProps) {
  const metricLabels = [
    "STRESS LOAD",
    "CORTISOL REGULATION",
    "SLEEP QUALITY",
    "COGNITIVE RECOVERY",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] flex items-center justify-center px-4 sm:px-6 py-12">
      {/* Visually hidden text for screen readers */}
      <div className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0">
        Calculating your personalised health assessment. {progress}% complete.
      </div>

      <div className="w-full max-w-3xl">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-emerald-500/10 bg-slate-900/60 shadow-[0_0_40px_rgba(16,185,129,0.25)] backdrop-blur-xl px-6 py-8 sm:px-10 sm:py-12"
        >
          {/* Label Row */}
          <div className="flex items-center justify-between mb-6">
            <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-xs uppercase tracking-[0.25em] text-emerald-400/80 font-medium">
                Processing your health profile
              </span>
            </div>
            <div className="px-3 py-1 rounded-full bg-slate-800/60 border border-emerald-500/20">
              <span className="text-xs uppercase tracking-[0.2em] text-slate-300/70 font-medium">
                {personaLabel}
              </span>
            </div>
          </div>

          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-3">
              Processing Your Results
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-300/90">
              We're analysing your responses across stress, sleep, metabolism, and recovery.
            </p>
          </div>

          {/* Progress Section */}
          <div className="mb-8 space-y-4">
            {/* Stage Label */}
            <p className="text-sm text-slate-400/80 font-medium">{stageLabel}</p>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Progress: ${progress}%`}
                />
              </div>

              {/* Progress Info Row */}
              <div className="flex items-center justify-between text-xs text-slate-400/70">
                <span>Step 3 of 3 · Building your personalised blueprint</span>
                <span className="font-medium">{progress}% Complete</span>
              </div>
            </div>
          </div>

          {/* Metric Skeleton Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {metricLabels.map((label, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="rounded-2xl border border-emerald-500/10 bg-black/40 px-4 py-5 flex flex-col gap-2 animate-pulse"
              >
                {/* Label */}
                <div className="text-xs tracking-[0.2em] text-slate-400/70 uppercase font-medium">
                  {label}
                </div>

                {/* Large placeholder number */}
                <div className="h-6 rounded-full bg-slate-800/80 w-16" />

                {/* Two shorter body lines */}
                <div className="space-y-2 mt-1">
                  <div className="h-2.5 rounded-full bg-slate-800/80 w-3/4" />
                  <div className="h-2.5 rounded-full bg-slate-800/80 w-1/2" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Area */}
          <div className="mt-10 text-center space-y-4">
            {/* Text */}
            <div className="space-y-1">
              <p className="text-sm text-slate-300/80 font-medium">
                This usually takes less than 20 seconds.
              </p>
              <p className="text-xs text-slate-400/60">
                You can keep this tab open while we prepare your personalised assessment.
              </p>
            </div>

            {/* Subtle Spinner */}
            <div className="flex justify-center pt-2">
              <div className="w-8 h-8 rounded-full border-2 border-emerald-500/20 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 border-t-2 border-emerald-400 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

