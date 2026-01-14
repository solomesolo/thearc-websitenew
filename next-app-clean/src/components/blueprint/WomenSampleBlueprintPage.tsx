"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArcButton } from "../ui/ArcButton";
import { PredispositionMap } from "./PredispositionMap";
import { WomenScreeningPlan } from "./WomenScreeningPlan";
import { WomenSixMonthTimeline } from "./WomenSixMonthTimeline";
import { WomenKeyInsights } from "./WomenKeyInsights";
import { WomenNextSteps } from "./WomenNextSteps";

const sections = [
  { id: "predisposition", component: <PredispositionMap /> },
  { id: "screening", component: <WomenScreeningPlan /> },
  { id: "timeline", component: <WomenSixMonthTimeline /> },
  { id: "insights", component: <WomenKeyInsights /> },
  { id: "nextsteps", component: <WomenNextSteps /> },
];

export function WomenSampleBlueprintPage() {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-black text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, rgba(7,25,18,0.45), rgba(0,0,0,0.98) 75%), url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Crect width='2' height='2' fill='white' fill-opacity='0.02'/%3E%3C/svg%3E\")",
      }}
    >
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black" />

      <section className="relative w-full py-40 px-6 flex justify-center">
        <motion.div
          className="w-full max-w-4xl text-center space-y-5 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">
            Sample Preview
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-[0.02em] mx-auto max-w-[720px]">
            Your Arc Blueprint. Sample Preview
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-[1.6]">
            An example of the structure, scientific clarity, and personalised guidance you receive
            after your first assessment.
          </p>
        </motion.div>
      </section>

      <div className="relative z-10 max-w-5xl mx-auto px-6 space-y-24 pb-40">
        {sections.map((section, idx) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, delay: idx * 0.05 }}
            className="flex flex-col items-center"
          >
            {section.component}
          </motion.div>
        ))}

        <div className="flex flex-col gap-6 items-center justify-center pt-4">
          <ArcButton href="#personas">Get Started</ArcButton>
          <Link href="/women" className="text-sm text-gray-500 hover:text-white transition">
            Back to Women in Menopause Plans
          </Link>
        </div>
      </div>
    </main>
  );
}

