"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { motion } from "framer-motion";
import { useState } from "react";

const nutritionPrinciples = [
  "Prioritize whole, unprocessed foods",
  "Time meals to support circadian rhythm",
  "Balance macronutrients for metabolic flexibility",
  "Include anti-inflammatory foods daily",
  "Optimize protein intake for muscle maintenance",
  "Support gut health with fiber and fermented foods",
];

const mealPlan = {
  day1: {
    breakfast: "Scrambled eggs with spinach, avocado, and sauerkraut",
    lunch: "Grilled salmon with roasted vegetables and quinoa",
    dinner: "Chicken stir-fry with mixed vegetables and brown rice",
    snacks: ["Greek yogurt with berries", "Almonds and apple"],
  },
  day2: {
    breakfast: "Overnight oats with chia seeds, nuts, and berries",
    lunch: "Mediterranean salad with chickpeas, olives, and feta",
    dinner: "Grilled lamb with sweet potato and steamed broccoli",
    snacks: ["Hummus with vegetables", "Dark chocolate (85%+)"],
  },
  day3: {
    breakfast: "Smoothie: protein powder, greens, berries, MCT oil",
    lunch: "Turkey and vegetable soup with whole grain bread",
    dinner: "Baked cod with roasted root vegetables",
    snacks: ["Cottage cheese with fruit", "Trail mix"],
  },
};

export function NutritionPlan() {
  const [expandedDay, setExpandedDay] = useState<string | null>("day1");

  return (
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
            {nutritionPrinciples.map((principle, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-2 p-3 rounded-lg bg-[#0f0f0f]/60 border border-white/5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + idx * 0.05 }}
              >
                <span className="text-[#6FFFC3]">✓</span>
                <span className="text-sm text-[#A3B3AA]">{principle}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">3-Day Meal Plan</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(mealPlan).map(([day, meals]) => (
              <motion.button
                key={day}
                onClick={() => setExpandedDay(expandedDay === day ? null : day)}
                className={`p-4 rounded-xl border transition-all text-left ${
                  expandedDay === day
                    ? "bg-[#6FFFC3]/10 border-[#6FFFC3]/30"
                    : "bg-[#0f0f0f]/60 border-white/5 hover:border-white/10"
                }`}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <h5 className="text-sm font-semibold text-white mb-3">
                  {day === "day1" ? "Day 1" : day === "day2" ? "Day 2" : "Day 3"}
                </h5>
                {expandedDay === day && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 text-xs"
                  >
                    <div>
                      <span className="text-[#8A938E]">Breakfast:</span>
                      <p className="text-[#A3B3AA] mt-1">{meals.breakfast}</p>
                    </div>
                    <div>
                      <span className="text-[#8A938E]">Lunch:</span>
                      <p className="text-[#A3B3AA] mt-1">{meals.lunch}</p>
                    </div>
                    <div>
                      <span className="text-[#8A938E]">Dinner:</span>
                      <p className="text-[#A3B3AA] mt-1">{meals.dinner}</p>
                    </div>
                    <div>
                      <span className="text-[#8A938E]">Snacks:</span>
                      <ul className="mt-1 space-y-1">
                        {meals.snacks.map((snack, idx) => (
                          <li key={idx} className="text-[#A3B3AA]">• {snack}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </GlowCard>
  );
}

