import { KeyMetricResult, WeeklyAction, SurveyAnswers, MetricBand } from './types';
import { getMenopauseTags } from './mappings';

/**
 * Pattern tags derived from metric bands, causes, and triggers
 * These are safe pattern-level identifiers that do not include raw user answers
 */
export type PatternTag =
  | "high_stress_persistence"
  | "night_hyperarousal"
  | "early_morning_wake_pattern"
  | "sleep_unrefreshing"
  | "screen_light_at_night"
  | "late_caffeine_pattern"
  | "low_movement_base"
  | "low_strength_support"
  | "digestive_reactivity"
  | "energy_instability_midday"
  | "cognitive_fatigue"
  | "focus_inconsistency"
  | "nutrition_inflammatory_pattern"
  | "low_veg_fiber_pattern"
  | "screening_gap_core_labs"
  | "supplement_complexity_risk";

export type PatternSummary = {
  tags: PatternTag[];
  severity: Record<PatternTag, 0 | 1 | 2 | 3>; // derived from s>=2 and/or band severity
  dominantDomains: Array<"sleep"|"stress"|"metabolic"|"cognition"|"gut"|"movement"|"screening">;
};

/**
 * Convert metric bands and causes to pattern tags
 * Uses the same trigger logic as the engine scoring
 */
function derivePatternTags(
  keyMetrics: KeyMetricResult[],
  weeklyActions: WeeklyAction[],
  surveyAnswers: SurveyAnswers
): { tags: PatternTag[]; severity: Record<PatternTag, 0 | 1 | 2 | 3> } {
  const tags: PatternTag[] = [];
  const severity: Record<PatternTag, 0 | 1 | 2 | 3> = {
    high_stress_persistence: 0,
    night_hyperarousal: 0,
    early_morning_wake_pattern: 0,
    sleep_unrefreshing: 0,
    screen_light_at_night: 0,
    late_caffeine_pattern: 0,
    low_movement_base: 0,
    low_strength_support: 0,
    digestive_reactivity: 0,
    energy_instability_midday: 0,
    cognitive_fatigue: 0,
    focus_inconsistency: 0,
    nutrition_inflammatory_pattern: 0,
    low_veg_fiber_pattern: 0,
    screening_gap_core_labs: 0,
    supplement_complexity_risk: 0,
  };

  // Stress Load patterns
  const stressLoad = keyMetrics.find(m => m.id === "stress_load");
  if (stressLoad) {
    if (stressLoad.band === "HIGH") {
      tags.push("high_stress_persistence");
      severity.high_stress_persistence = 3;
    } else if (stressLoad.band === "MODERATE") {
      tags.push("high_stress_persistence");
      severity.high_stress_persistence = 2;
    }
  }

  // Cortisol Regulation patterns (Q37, Q38, Q39)
  const cortisolReg = keyMetrics.find(m => m.id === "cortisol_regulation");
  if (cortisolReg) {
    if (cortisolReg.band === "DYSREGULATED") {
      tags.push("night_hyperarousal");
      tags.push("early_morning_wake_pattern");
      severity.night_hyperarousal = 3;
      severity.early_morning_wake_pattern = 3;
    } else if (cortisolReg.band === "SUBOPTIMAL") {
      tags.push("night_hyperarousal");
      severity.night_hyperarousal = 2;
    }
    
    // Check for Q37, Q38, Q39 causes
    const hasQ37 = cortisolReg.causes.some(c => c.questionId === "Q37");
    const hasQ38 = cortisolReg.causes.some(c => c.questionId === "Q38");
    const hasQ39 = cortisolReg.causes.some(c => c.questionId === "Q39");
    
    if (hasQ37 || hasQ38) {
      tags.push("night_hyperarousal");
      if (!tags.includes("night_hyperarousal")) tags.push("night_hyperarousal");
      severity.night_hyperarousal = Math.max(severity.night_hyperarousal, 2);
    }
    if (hasQ38) {
      tags.push("early_morning_wake_pattern");
      if (!tags.includes("early_morning_wake_pattern")) tags.push("early_morning_wake_pattern");
      severity.early_morning_wake_pattern = Math.max(severity.early_morning_wake_pattern, 2);
    }
  }

  // Sleep Quality patterns (Q40, Q39)
  const sleepQuality = keyMetrics.find(m => m.id === "sleep_quality");
  if (sleepQuality) {
    if (sleepQuality.band === "POOR") {
      tags.push("sleep_unrefreshing");
      severity.sleep_unrefreshing = 3;
    } else if (sleepQuality.band === "MODERATE") {
      tags.push("sleep_unrefreshing");
      severity.sleep_unrefreshing = 2;
    }
    
    const hasQ40 = sleepQuality.causes.some(c => c.questionId === "Q40");
    if (hasQ40) {
      tags.push("sleep_unrefreshing");
      severity.sleep_unrefreshing = Math.max(severity.sleep_unrefreshing, 2);
    }
  }

  // Environment patterns (Q30, Q31)
  if (surveyAnswers.Q30_brightnessBeforeBed === "Bright" || surveyAnswers.Q30_brightnessBeforeBed === "Very bright") {
    tags.push("screen_light_at_night");
    severity.screen_light_at_night = 2;
  }
  if (surveyAnswers.Q31_screensBeforeBed === "Often" || surveyAnswers.Q31_screensBeforeBed === "Constantly") {
    tags.push("screen_light_at_night");
    severity.screen_light_at_night = Math.max(severity.screen_light_at_night, 3);
  }

  // Caffeine pattern (Q9)
  if (surveyAnswers.Q9_caffeineAfter14 === "Often (most days)" || surveyAnswers.Q9_caffeineAfter14 === "Multiple cups daily") {
    tags.push("late_caffeine_pattern");
    severity.late_caffeine_pattern = 3;
  } else if (surveyAnswers.Q9_caffeineAfter14 === "Sometimes (1–2 times per week)") {
    tags.push("late_caffeine_pattern");
    severity.late_caffeine_pattern = 2;
  }

  // Movement patterns (Q18, Q19, Q20, Q21)
  if (surveyAnswers.Q18_exerciseDays === "0 days" || surveyAnswers.Q18_exerciseDays === "1–2 days") {
    tags.push("low_movement_base");
    severity.low_movement_base = 3;
  } else if (surveyAnswers.Q18_exerciseDays === "3–4 days") {
    tags.push("low_movement_base");
    severity.low_movement_base = 2;
  }
  
  if (surveyAnswers.Q19_strengthSessions === "None" || surveyAnswers.Q19_strengthSessions === "1 session") {
    tags.push("low_strength_support");
    severity.low_strength_support = 3;
  } else if (surveyAnswers.Q19_strengthSessions === "2 sessions") {
    tags.push("low_strength_support");
    severity.low_strength_support = 2;
  }

  // Gut patterns (Q11, Q34)
  if (surveyAnswers.Q11_bloatedSluggishMeals === "Often" || surveyAnswers.Q11_bloatedSluggishMeals === "Almost always") {
    tags.push("digestive_reactivity");
    severity.digestive_reactivity = 3;
  } else if (surveyAnswers.Q11_bloatedSluggishMeals === "Sometimes") {
    tags.push("digestive_reactivity");
    severity.digestive_reactivity = 2;
  }
  
  if (surveyAnswers.Q34_digestiveDiscomfort === "Often" || surveyAnswers.Q34_digestiveDiscomfort === "Very frequently") {
    tags.push("digestive_reactivity");
    severity.digestive_reactivity = Math.max(severity.digestive_reactivity, 3);
  }

  // Energy instability (Q32)
  if (surveyAnswers.Q32_middayCrashes === "Often" || surveyAnswers.Q32_middayCrashes === "Daily") {
    tags.push("energy_instability_midday");
    severity.energy_instability_midday = 3;
  } else if (surveyAnswers.Q32_middayCrashes === "Sometimes") {
    tags.push("energy_instability_midday");
    severity.energy_instability_midday = 2;
  }

  // Cognitive patterns (Q41, Q42)
  if (surveyAnswers.Q41_mentalFatigue === "Significant" || surveyAnswers.Q41_mentalFatigue === "Severe") {
    tags.push("cognitive_fatigue");
    severity.cognitive_fatigue = 3;
  } else if (surveyAnswers.Q41_mentalFatigue === "Moderate") {
    tags.push("cognitive_fatigue");
    severity.cognitive_fatigue = 2;
  }
  
  if (surveyAnswers.Q42_focusClarity === "Rarely" || surveyAnswers.Q42_focusClarity === "Never") {
    tags.push("focus_inconsistency");
    severity.focus_inconsistency = 3;
  } else if (surveyAnswers.Q42_focusClarity === "Sometimes") {
    tags.push("focus_inconsistency");
    severity.focus_inconsistency = 2;
  }

  // Nutrition patterns (Q7, Q10)
  if (surveyAnswers.Q7_processedFoods === "Once daily" || surveyAnswers.Q7_processedFoods === "Multiple times per day") {
    tags.push("nutrition_inflammatory_pattern");
    severity.nutrition_inflammatory_pattern = 3;
  } else if (surveyAnswers.Q7_processedFoods === "3–5 times per week") {
    tags.push("nutrition_inflammatory_pattern");
    severity.nutrition_inflammatory_pattern = 2;
  }
  
  if (surveyAnswers.Q10_vegServings === "Less than 1" || surveyAnswers.Q10_vegServings === "1–2") {
    tags.push("low_veg_fiber_pattern");
    severity.low_veg_fiber_pattern = 3;
  }

  // Screening gaps (Q23, Q26, Q27, Q28)
  if (surveyAnswers.Q23_lastBloodPanel === "Never" || surveyAnswers.Q23_lastBloodPanel === "More than 2 years ago") {
    tags.push("screening_gap_core_labs");
    severity.screening_gap_core_labs = 3;
  } else if (surveyAnswers.Q23_lastBloodPanel === "1–2 years ago") {
    tags.push("screening_gap_core_labs");
    severity.screening_gap_core_labs = 2;
  }

  // Supplement complexity (Q17, Q16)
  if (surveyAnswers.Q17_moreThanThreeSupps === "Yes") {
    tags.push("supplement_complexity_risk");
    severity.supplement_complexity_risk = 3;
  } else if (surveyAnswers.Q16_suppRegular?.includes("Herbal supplements (e.g., ashwagandha, turmeric, St. John's Wort)")) {
    tags.push("supplement_complexity_risk");
    severity.supplement_complexity_risk = 2;
  }

  return { tags: Array.from(new Set(tags)), severity };
}

/**
 * Determine dominant domains from pattern tags and metrics
 */
function determineDominantDomains(
  tags: PatternTag[],
  keyMetrics: KeyMetricResult[]
): Array<"sleep"|"stress"|"metabolic"|"cognition"|"gut"|"movement"|"screening"> {
  const domainCounts: Record<string, number> = {
    sleep: 0,
    stress: 0,
    metabolic: 0,
    cognition: 0,
    gut: 0,
    movement: 0,
    screening: 0,
  };

  // Map tags to domains
  tags.forEach(tag => {
    if (tag.includes("sleep") || tag.includes("wake") || tag.includes("hyperarousal") || tag.includes("unrefreshing")) {
      domainCounts.sleep++;
    }
    if (tag.includes("stress")) {
      domainCounts.stress++;
    }
    if (tag.includes("energy") || tag.includes("metabolic") || tag.includes("caffeine")) {
      domainCounts.metabolic++;
    }
    if (tag.includes("cognitive") || tag.includes("focus")) {
      domainCounts.cognition++;
    }
    if (tag.includes("digestive") || tag.includes("gut")) {
      domainCounts.gut++;
    }
    if (tag.includes("movement") || tag.includes("strength")) {
      domainCounts.movement++;
    }
    if (tag.includes("screening")) {
      domainCounts.screening++;
    }
  });

  // Also check metric bands
  keyMetrics.forEach(metric => {
    if (metric.band === "HIGH" || metric.band === "POOR" || metric.band === "DYSREGULATED") {
      if (metric.id === "stress_load") domainCounts.stress += 2;
      if (metric.id === "sleep_quality") domainCounts.sleep += 2;
      if (metric.id === "cognitive_recovery") domainCounts.cognition += 2;
      if (metric.id === "cortisol_regulation") {
        domainCounts.stress += 1;
        domainCounts.sleep += 1;
      }
    }
  });

  // Return domains sorted by count (descending), take top 3-5
  const sorted = Object.entries(domainCounts)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([domain]) => domain as "sleep"|"stress"|"metabolic"|"cognition"|"gut"|"movement"|"screening");

  return sorted.slice(0, 5);
}

/**
 * Main function to derive pattern summary from engine outputs
 */
export function derivePatternSummary(
  keyMetrics: KeyMetricResult[],
  weeklyActions: WeeklyAction[],
  surveyAnswers: SurveyAnswers
): PatternSummary {
  const { tags, severity } = derivePatternTags(keyMetrics, weeklyActions, surveyAnswers);
  const dominantDomains = determineDominantDomains(tags, keyMetrics);

  return {
    tags,
    severity,
    dominantDomains,
  };
}






