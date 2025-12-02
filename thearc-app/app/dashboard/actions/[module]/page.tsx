"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ActionDetailCard } from "@/components/dashboard/weekly/ActionDetailCard";

const nutritionDetails = [
  {
    title: "Follow anti-inflammatory pattern",
    subtitle: "Lower systemic inflammation and stabilise metabolic function.",
    description:
      "This eating style focuses on nutrient-dense whole foods that minimise inflammatory load. It improves recovery, supports cognitive clarity, and reduces chronic stress markers.",
    bullets: [
      "Emphasize vegetables, berries, fish, olive oil, nuts.",
      "Limit refined carbs, seed oils, fried foods.",
    ],
  },
  {
    title: "Reduce caffeine after 14:00",
    subtitle: "Support circadian rhythm and reduce sleep fragmentation.",
    description:
      "Caffeine's half-life affects deep sleep and hormonal recovery. Reducing intake after 14:00 improves cortisol regulation and next-day focus.",
  },
  {
    title: "Increase omega-3 sources",
    subtitle: "Improve inflammation control and cognitive performance.",
    description:
      "EPA and DHA are essential for brain stability, cellular repair, and cardiovascular health.",
    bullets: [
      "Aim for 2–3 servings of oily fish weekly.",
      "Supplement if dietary intake is insufficient.",
    ],
  },
  {
    title: "Prioritize protein at each meal",
    subtitle: "Support metabolic stability and lean mass preservation.",
    description:
      "Consistent protein intake helps stabilise blood sugar and improves satiety. It is essential during periods of cognitive and physical load.",
    bullets: ["Target 1.6g/kg bodyweight daily."],
  },
  {
    title: "Time-restricted eating window (12–14h)",
    subtitle: "Enhance metabolic flexibility.",
    description:
      "A consistent eating window trains hormonal predictability and improves energy rhythms.",
  },
  {
    title: "Include fermented foods daily",
    subtitle: "Support gut microbiome diversity.",
    description:
      "These foods improve digestion, immunity, and stress resilience.",
    bullets: ["Examples: sauerkraut, kimchi, kefir"],
  },
  {
    title: "Reduce processed foods by 50%",
    subtitle: "Reduce inflammatory burden.",
    description:
      "Ultra-processed foods drive metabolic stress and cognitive fatigue. Even partial reduction has measurable effects.",
  },
  {
    title: "Add turmeric/ginger to meals",
    subtitle: "Support anti-inflammatory pathways.",
    description:
      "Both spices contain compounds that reduce inflammatory signaling and oxidative stress.",
  },
];

const supplementsDetails = [
  {
    title: "Vitamin D3 — morning",
    subtitle: "Essential for immune function and bone health.",
    description:
      "Take 2000-4000 IU with a fat-containing meal to enhance absorption. Vitamin D supports calcium metabolism, immune resilience, and mood regulation.",
    bullets: [
      "Best taken with breakfast containing healthy fats.",
      "Monitor levels every 3-6 months if supplementing long-term.",
    ],
  },
  {
    title: "Magnesium — evening",
    subtitle: "Support sleep quality and stress recovery.",
    description:
      "Take 400-600mg elemental magnesium 1-2 hours before bed. Magnesium supports muscle relaxation, nervous system calm, and deep sleep phases.",
    bullets: [
      "Forms: magnesium glycinate or citrate are well-absorbed.",
      "May cause loose stools if dose is too high—reduce if needed.",
    ],
  },
  {
    title: "Omega-3 — lunch",
    subtitle: "Improve inflammation control and cognitive function.",
    description:
      "Take 2-3g daily with meals. EPA and DHA support brain health, reduce systemic inflammation, and improve cardiovascular markers.",
    bullets: [
      "Look for high-EPA formulas for inflammation support.",
      "Store in refrigerator to prevent oxidation.",
    ],
  },
  {
    title: "Probiotics — morning",
    subtitle: "Support gut microbiome diversity and immunity.",
    description:
      "Take 10-50 billion CFU on empty stomach or with first meal. Probiotics help maintain healthy gut flora, which influences immunity, mood, and nutrient absorption.",
    bullets: [
      "Choose multi-strain formulas for diversity.",
      "Take consistently for 4-6 weeks to see benefits.",
    ],
  },
  {
    title: "CoQ10 — with meals",
    subtitle: "Support cellular energy production.",
    description:
      "Take 100-200mg with meals. CoQ10 is essential for mitochondrial function and becomes more important with age or if taking statins.",
  },
  {
    title: "B-Complex — morning",
    subtitle: "Support energy metabolism and stress response.",
    description:
      "Take with food in the morning. B vitamins are cofactors for energy production, neurotransmitter synthesis, and stress hormone regulation.",
  },
];

const movementDetails = [
  {
    title: "10-min daily activation",
    subtitle: "Prime your body for the day and improve mobility.",
    description:
      "Morning movement activates your nervous system, improves circulation, and sets a positive tone for the day. Focus on full-body movements and mobility work.",
    bullets: [
      "Include: hip circles, spinal twists, shoulder rolls, light squats.",
      "Can be done before breakfast or as a mid-morning break.",
    ],
  },
  {
    title: "2 strength sessions",
    subtitle: "Maintain muscle mass and metabolic health.",
    description:
      "Schedule two full-body strength sessions per week (Monday & Thursday). Strength training preserves lean mass, improves bone density, and supports metabolic flexibility.",
    bullets: [
      "Focus on compound movements: squats, deadlifts, presses, rows.",
      "3-4 sets of 6-12 reps per exercise.",
    ],
  },
  {
    title: "Evening mobility routine",
    subtitle: "Release tension and prepare for rest.",
    description:
      "A 15-minute evening mobility session helps release accumulated tension, improves recovery, and signals your body that it's time to wind down.",
    bullets: [
      "Focus on: hip flexors, hamstrings, shoulders, thoracic spine.",
      "Hold stretches for 30-60 seconds, breathe deeply.",
    ],
  },
  {
    title: "Daily breathing exercises",
    subtitle: "Activate parasympathetic nervous system.",
    description:
      "Practice Box breathing (4-4-4-4) or 4-7-8 breathing for 5-10 minutes daily. These techniques reduce stress, improve recovery, and enhance focus.",
    bullets: [
      "Best times: morning (to set calm tone) or evening (to prepare for sleep).",
      "Can be done anywhere—desk, car, before bed.",
    ],
  },
  {
    title: "Active recovery walk",
    subtitle: "Support circulation and mental clarity.",
    description:
      "Take 30-minute walks 3x per week on non-strength days. Walking improves blood flow, supports recovery, and provides mental space for reflection.",
  },
  {
    title: "Cold exposure protocol",
    subtitle: "Enhance recovery and resilience.",
    description:
      "End your shower with 2-3 minutes of cold water. Start with 30 seconds and gradually increase. Cold exposure improves recovery, reduces inflammation, and builds mental resilience.",
    bullets: [
      "Focus on controlled breathing throughout.",
      "Warm up naturally after—avoid hot water immediately.",
    ],
  },
];

const screeningsDetails = [
  {
    title: "Complete cortisol re-check",
    subtitle: "Monitor stress hormone patterns.",
    description:
      "A saliva cortisol test taken at 4 time points (waking, noon, evening, bedtime) reveals your stress hormone rhythm. This helps identify if cortisol is dysregulated.",
    bullets: [
      "Follow test kit instructions precisely.",
      "Avoid caffeine and intense exercise on test day.",
    ],
  },
  {
    title: "Upload last labwork",
    subtitle: "Keep your health graph current.",
    description:
      "Upload recent blood work results to your ARC dashboard. This allows the system to track trends, identify patterns, and update your risk profile.",
    bullets: [
      "Supported formats: PDF, images, or manual entry.",
      "Include date of test for accurate timeline tracking.",
    ],
  },
  {
    title: "Schedule blood panel",
    subtitle: "Establish comprehensive baseline.",
    description:
      "Schedule a full metabolic panel including lipids, glucose, liver function, kidney function, and inflammatory markers. This provides a complete picture of your current health status.",
    bullets: [
      "Fast for 12 hours before test.",
      "Schedule in morning for most accurate results.",
    ],
  },
  {
    title: "Track sleep metrics daily",
    subtitle: "Monitor recovery and circadian health.",
    description:
      "Use your wearable or sleep tracker to monitor HRV, sleep efficiency, and sleep stages. Consistent tracking reveals patterns and helps optimize recovery.",
    bullets: [
      "Review weekly trends, not just daily numbers.",
      "Note any lifestyle factors that affect sleep quality.",
    ],
  },
  {
    title: "Monitor glucose variability",
    subtitle: "Assess metabolic stability.",
    description:
      "If using a continuous glucose monitor, track glucose variability patterns. Stable glucose supports energy, mood, and long-term metabolic health.",
  },
  {
    title: "Weekly body composition check",
    subtitle: "Track changes in lean mass and body fat.",
    description:
      "Use a bioimpedance scale or DEXA scan weekly to track body composition changes. Focus on trends over time rather than daily fluctuations.",
  },
];

const environmentDetails = [
  {
    title: "Bedroom light reset",
    subtitle: "Optimize sleep environment.",
    description:
      "Remove all electronic devices from bedroom, install blackout curtains, and ensure complete darkness. Even small amounts of light can disrupt melatonin production and sleep quality.",
    bullets: [
      "Remove: phones, tablets, TVs, LED clocks.",
      "Use sleep mask if complete darkness isn't possible.",
    ],
  },
  {
    title: "Blue-light reduction evenings",
    subtitle: "Support natural circadian rhythm.",
    description:
      "Eliminate blue light exposure 90 minutes before bed. Blue light suppresses melatonin and delays sleep onset. Use blue-light blocking glasses or screen filters.",
    bullets: [
      "Set devices to night mode after sunset.",
      "Consider amber lighting in evening spaces.",
    ],
  },
  {
    title: "Morning light exposure",
    subtitle: "Reset circadian clock daily.",
    description:
      "Get 10-15 minutes of bright natural light (or 10,000+ lux light box) within 30 minutes of waking. This signals your brain that it's daytime and strengthens circadian rhythm.",
    bullets: [
      "Best: outdoor light, even on cloudy days.",
      "If indoors, sit near a bright window.",
    ],
  },
  {
    title: "Optimize bedroom temperature",
    subtitle: "Support deep sleep phases.",
    description:
      "Maintain bedroom temperature at 65-68°F (18-20°C). Cooler temperatures support deeper sleep and better recovery. Your body temperature naturally drops during sleep.",
    bullets: [
      "Use breathable bedding materials.",
      "Consider a cooling mattress pad if needed.",
    ],
  },
  {
    title: "Air purifier check",
    subtitle: "Reduce airborne toxins and allergens.",
    description:
      "Ensure your air purifier filter is clean and functioning. Replace filters as recommended. Clean air reduces inflammation, improves sleep, and supports respiratory health.",
    bullets: [
      "Check filter monthly, replace every 3-6 months.",
      "Run purifier in bedroom during sleep.",
    ],
  },
  {
    title: "Reduce plastic use",
    subtitle: "Minimize endocrine disruptor exposure.",
    description:
      "Especially avoid plastic food containers and water bottles. Plastics can leach chemicals that disrupt hormones. Use glass, stainless steel, or ceramic alternatives.",
    bullets: [
      "Replace plastic containers with glass.",
      "Use stainless steel water bottles.",
    ],
  },
];

const redFlagsDetails = [
  {
    title: "Monitor: Midday energy crashes",
    subtitle: "Track timing and triggers.",
    description:
      "Document when energy crashes occur, what you ate, sleep quality, and stress levels. This helps identify patterns—blood sugar dysregulation, cortisol issues, or sleep debt.",
    bullets: [
      "Keep a simple log: time, symptoms, potential triggers.",
      "Review patterns weekly to identify causes.",
    ],
  },
  {
    title: "Monitor: Intermittent headaches",
    subtitle: "Document frequency and severity.",
    description:
      "Track headache frequency, intensity (1-10 scale), location, and potential triggers. Headaches can indicate dehydration, stress, sleep issues, or nutrient deficiencies.",
    bullets: [
      "Note: timing, duration, what helps relieve them.",
      "If severe or increasing, seek medical evaluation.",
    ],
  },
  {
    title: "If sleep quality drops below 70% for 3+ nights",
    subtitle: "Activate sleep protocol.",
    description:
      "When sleep efficiency consistently drops, activate the sleep optimization micro-plan. This includes stricter light management, sleep schedule reset, and stress reduction protocols.",
    bullets: [
      "Review sleep hygiene checklist.",
      "Consider temporary sleep support (magnesium, melatonin).",
    ],
  },
  {
    title: "If stress load exceeds 75 for 3+ consecutive days",
    subtitle: "Activate stress micro-plan.",
    description:
      "Sustained high stress requires immediate intervention. Activate stress management protocols: increased breathing exercises, recovery breaks, and potentially reduce workload.",
    bullets: [
      "Prioritize recovery over performance temporarily.",
      "Consider professional support if stress persists.",
    ],
  },
  {
    title: "If inflammation markers rise above baseline",
    subtitle: "Activate inflammation protocol.",
    description:
      "When inflammatory markers (CRP, etc.) increase, immediately implement anti-inflammatory nutrition, stress reduction, and recovery protocols. Monitor closely.",
    bullets: [
      "Increase omega-3, reduce processed foods.",
      "Prioritize sleep and recovery.",
    ],
  },
  {
    title: "Seek medical review if:",
    subtitle: "Persistent symptoms or concerning changes.",
    description:
      "Consult a healthcare provider if symptoms persist >6 weeks, if you experience severe fatigue, significant weight changes, or if biomarker changes are concerning.",
    bullets: [
      "Persistent symptoms >6 weeks.",
      "Severe fatigue affecting daily function.",
      "Concerning biomarker changes.",
    ],
  },
];

const moduleDataMap: Record<
  string,
  Array<{
    title: string;
    subtitle?: string;
    description?: string;
    bullets?: string[];
  }>
> = {
  nutrition: nutritionDetails,
  supplements: supplementsDetails,
  movement: movementDetails,
  screenings: screeningsDetails,
  environment: environmentDetails,
  redflags: redFlagsDetails,
};

const moduleTitles: Record<string, string> = {
  nutrition: "Nutrition",
  supplements: "Supplements",
  movement: "Movement & Recovery",
  screenings: "Screenings / Checks",
  environment: "Environment",
  redflags: "Red Flags",
};

export default function ActionModulePage() {
  const params = useParams();
  const module = params.module as string;

  const moduleData = moduleDataMap[module];
  const moduleTitle = moduleTitles[module] || module;

  if (!moduleData) {
    return (
      <div className="dashboard-container relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="dashboard-h1 mb-4">Module Not Found</h1>
          <Link
            href="/dashboard"
            className="inline-block px-6 py-2.5 rounded-full bg-black border border-gray-600 text-[#6FFFC3] text-sm font-medium hover:border-[#6FFFC3] transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container relative z-10 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-[#A3B3AA] hover:text-[#6FFFC3] transition-colors mb-6"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="dashboard-h1 text-4xl mb-2">
            {moduleTitle} – Full Action Plan
          </h1>
          <p className="dashboard-description text-base">
            Complete list of actions and recommendations for this week.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {moduleData.map((action, index) => (
            <ActionDetailCard
              key={index}
              title={action.title}
              subtitle={action.subtitle}
              description={action.description}
              bullets={action.bullets}
              delay={0.1 + index * 0.05}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
