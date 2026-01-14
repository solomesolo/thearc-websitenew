/**
 * Feature Extraction Layer
 * 
 * Maps raw answers (internal) → canonical safe features.
 * 
 * Rules:
 * - No user-facing strings
 * - Convert to buckets/enums/booleans/sets
 * - Keep vocabulary stable (FeatureId constants)
 * - Features are safe to pass to rules engine (no PII, no raw answers)
 */

import { FeatureMap, FeatureId, FeatureValue } from "./types";
import { TravelerSurveyAnswers } from "./types";

/**
 * Feature ID constants (closed vocabulary)
 */
export const FEATURE_IDS = {
  // Travel-related
  TIME_ZONE_SHIFT: "time_zone_shift",
  UPCOMING_TRAVEL: "upcoming_travel",
  TRAVEL_FREQUENCY: "travel_frequency",
  SITTING_DURATION: "sitting_duration",
  
  // Sleep-related
  SLEEP_LATENCY: "sleep_latency",
  SLEEP_FRAGMENTATION: "sleep_fragmentation",
  SLEEP_CONSISTENCY: "sleep_consistency",
  SLEEP_DISRUPTION_TRAVEL: "sleep_disruption_travel",
  
  // Stress-related
  STRESS_LOAD: "stress_load",
  STRESS_RECOVERY: "stress_recovery",
  OVERWHELM_FREQUENCY: "overwhelm_frequency",
  
  // Energy/Recovery
  ENERGY_LEVEL: "energy_level",
  RECOVERY_QUALITY: "recovery_quality",
  AFTERNOON_FATIGUE: "afternoon_fatigue",
  
  // Movement/Physical
  MOVEMENT_FREQUENCY: "movement_frequency",
  STRENGTH_TRAINING: "strength_training",
  MOBILITY_ISSUES: "mobility_issues",
  
  // Nutrition
  PROCESSED_FOODS: "processed_foods",
  VEGETABLE_INTAKE: "vegetable_intake",
  HYDRATION: "hydration",
  
  // Health conditions
  HAS_DIABETES: "has_diabetes",
  HAS_HYPERTENSION: "has_hypertension",
  HAS_HIGH_CHOLESTEROL: "has_high_cholesterol",
  HAS_AUTOIMMUNE: "has_autoimmune",
  
  // Family history
  FAMILY_CARDIAC: "family_cardiac",
  FAMILY_DIABETES: "family_diabetes",
  FAMILY_NEURODEGENERATIVE: "family_neurodegenerative",
  
  // Lab results (if available)
  CRP_STATUS: "crp_status",
  GLUCOSE_STATUS: "glucose_status",
  LIPID_STATUS: "lipid_status",
} as const;

/**
 * Convert bucket value to severity
 */
function toBucket(value: number, thresholds: { low: number; med: number; high: number }): "NONE" | "LOW" | "MED" | "HIGH" {
  if (value >= thresholds.high) return "HIGH";
  if (value >= thresholds.med) return "MED";
  if (value >= thresholds.low) return "LOW";
  return "NONE";
}

/**
 * Map Likert frequency to bucket
 */
function likertFreqToBucket(freq: string): "NONE" | "LOW" | "MED" | "HIGH" {
  const map: Record<string, "NONE" | "LOW" | "MED" | "HIGH"> = {
    "Never": "NONE",
    "Rarely": "LOW",
    "Sometimes": "MED",
    "Often": "HIGH",
    "Almost always": "HIGH",
  };
  return map[freq] || "NONE";
}

/**
 * Derive features from traveler answers
 */
export function deriveFeaturesFromAnswers(input: {
  answers: TravelerSurveyAnswers;
  uiAnswers?: Record<string, any>; // Raw UI answers for additional context
  telemetry?: any;
}): FeatureMap {
  const { answers, uiAnswers = {} } = input;
  const features: FeatureMap = {};

  // Travel-related features
  features[FEATURE_IDS.UPCOMING_TRAVEL] = {
    kind: "boolean",
    value: answers.BG9_upcomingTravel6w === "Yes",
  };

  if (uiAnswers['T2']) {
    const travelFreqMap: Record<string, number> = {
      'Never': 0,
      '1–3 times': 1,
      '4–6 times': 2,
      '7–10 times': 3,
      'More than 10 times': 4,
    };
    const freq = travelFreqMap[uiAnswers['T2']] ?? 0;
    features[FEATURE_IDS.TRAVEL_FREQUENCY] = {
      kind: "bucket",
      value: toBucket(freq, { low: 1, med: 2, high: 3 }),
    };
    features[FEATURE_IDS.TIME_ZONE_SHIFT] = {
      kind: "bucket",
      value: freq >= 3 ? "HIGH" : freq >= 2 ? "MED" : "LOW",
    };
  }

  if (answers.BG10_sittingDuration) {
    const sittingMap: Record<string, number> = {
      '<2 hours': 0,
      '2–4 hours': 1,
      '4–6 hours': 2,
      '6–8 hours': 3,
      '>8 hours': 4,
    };
    const hours = sittingMap[answers.BG10_sittingDuration] ?? 0;
    features[FEATURE_IDS.SITTING_DURATION] = {
      kind: "bucket",
      value: toBucket(hours, { low: 2, med: 3, high: 4 }),
    };
  }

  // Sleep-related features
  features[FEATURE_IDS.SLEEP_LATENCY] = {
    kind: "bucket",
    value: likertFreqToBucket(answers.S1_fallAsleepDifficulty),
  };

  features[FEATURE_IDS.SLEEP_FRAGMENTATION] = {
    kind: "bucket",
    value: likertFreqToBucket(answers.S2_wakeNightStayAwake),
  };

  if (answers.S3_bedtimeConsistency) {
    const consistencyMap: Record<string, "NONE" | "LOW" | "MED" | "HIGH"> = {
      "Very consistent": "HIGH",
      "Somewhat consistent": "MED",
      "Neutral": "MED",
      "Somewhat inconsistent": "LOW",
      "Very inconsistent": "NONE",
    };
    features[FEATURE_IDS.SLEEP_CONSISTENCY] = {
      kind: "bucket",
      value: consistencyMap[answers.S3_bedtimeConsistency] || "MED",
    };
  }

  features[FEATURE_IDS.SLEEP_DISRUPTION_TRAVEL] = {
    kind: "bucket",
    value: likertFreqToBucket(answers.S4_scheduleDisruptsSleep),
  };

  // Stress-related features
  features[FEATURE_IDS.OVERWHELM_FREQUENCY] = {
    kind: "bucket",
    value: likertFreqToBucket(answers.ST1_overwhelmed),
  };

  features[FEATURE_IDS.STRESS_LOAD] = {
    kind: "bucket",
    value: likertFreqToBucket(answers.ST2_unableToRelax),
  };

  // Energy/Recovery features
  features[FEATURE_IDS.AFTERNOON_FATIGUE] = {
    kind: "bucket",
    value: likertFreqToBucket(answers.F1_wornOutAfternoon),
  };

  features[FEATURE_IDS.ENERGY_LEVEL] = {
    kind: "bucket",
    value: likertFreqToBucket(answers.F2_lowEnergyLimits),
  };

  if (answers.F3_refreshedOnWaking) {
    const refreshedMap: Record<string, "NONE" | "LOW" | "MED" | "HIGH"> = {
      "Very refreshed": "HIGH",
      "Somewhat refreshed": "MED",
      "Neutral": "MED",
      "Somewhat unrefreshed": "LOW",
      "Very unrefreshed": "NONE",
    };
    features[FEATURE_IDS.RECOVERY_QUALITY] = {
      kind: "bucket",
      value: refreshedMap[answers.F3_refreshedOnWaking] || "MED",
    };
  }

  // Movement features
  if (uiAnswers['M1']) {
    const daysMap: Record<string, number> = {
      '0 days': 0,
      '1–2 days': 1,
      '3–4 days': 2,
      '5–6 days': 3,
      'Daily': 4,
    };
    const days = daysMap[uiAnswers['M1']] ?? 0;
    features[FEATURE_IDS.MOVEMENT_FREQUENCY] = {
      kind: "bucket",
      value: toBucket(days, { low: 1, med: 2, high: 3 }),
    };
  }

  if (uiAnswers['M2']) {
    const strengthMap: Record<string, number> = {
      '0 days': 0,
      '1–2 days': 1,
      '3–4 days': 2,
      '5–6 days': 3,
      'Daily': 4,
    };
    const days = strengthMap[uiAnswers['M2']] ?? 0;
    features[FEATURE_IDS.STRENGTH_TRAINING] = {
      kind: "bucket",
      value: toBucket(days, { low: 1, med: 2, high: 3 }),
    };
  }

  features[FEATURE_IDS.MOBILITY_ISSUES] = {
    kind: "bucket",
    value: likertFreqToBucket(answers.PF1_difficultyStayActiveTravelDays || "Not difficult"),
  };

  // Nutrition features
  features[FEATURE_IDS.PROCESSED_FOODS] = {
    kind: "bucket",
    value: likertFreqToBucket(answers.L1_processedFoodsTravelDays),
  };

  if (uiAnswers['N2']) {
    const servingsMap: Record<string, number> = {
      'Less than 1': 0,
      '1–2': 1,
      '3–4': 2,
      '5–7': 3,
      '8 or more': 4,
    };
    const servings = servingsMap[uiAnswers['N2']] ?? 0;
    features[FEATURE_IDS.VEGETABLE_INTAKE] = {
      kind: "bucket",
      value: toBucket(servings, { low: 2, med: 3, high: 4 }),
    };
  }

  // Health conditions
  features[FEATURE_IDS.HAS_DIABETES] = {
    kind: "boolean",
    value: answers.BG7_dx?.includes("Prediabetes or diabetes") || false,
  };

  features[FEATURE_IDS.HAS_HYPERTENSION] = {
    kind: "boolean",
    value: answers.BG7_dx?.includes("High blood pressure") || false,
  };

  features[FEATURE_IDS.HAS_HIGH_CHOLESTEROL] = {
    kind: "boolean",
    value: answers.BG7_dx?.includes("High cholesterol") || false,
  };

  features[FEATURE_IDS.HAS_AUTOIMMUNE] = {
    kind: "boolean",
    value: answers.BG7_dx?.includes("Autoimmune condition") || false,
  };

  // Family history
  features[FEATURE_IDS.FAMILY_CARDIAC] = {
    kind: "boolean",
    value: answers.BG8_familyHx?.some(h => h.includes("Heart disease") || h.includes("stroke")) || false,
  };

  features[FEATURE_IDS.FAMILY_DIABETES] = {
    kind: "boolean",
    value: answers.BG8_familyHx?.includes("Diabetes") || false,
  };

  features[FEATURE_IDS.FAMILY_NEURODEGENERATIVE] = {
    kind: "boolean",
    value: answers.BG8_familyHx?.some(h => h.includes("Dementia") || h.includes("neurodegenerative")) || false,
  };

  // Lab results (if available in UI answers)
  if (Array.isArray(uiAnswers['LAB2'])) {
    const hasCRP = uiAnswers['LAB2'].some((test: string) => test.includes('CRP'));
    if (hasCRP) {
      const isNormal = uiAnswers['LAB2'].some((test: string) => test.includes('CRP') && test.includes('normal'));
      const isAbnormal = uiAnswers['LAB2'].some((test: string) => test.includes('CRP') && test.includes('abnormal'));
      features[FEATURE_IDS.CRP_STATUS] = {
        kind: "enum",
        value: isNormal ? "normal" : isAbnormal ? "abnormal" : "unknown",
      };
    }

    const hasGlucose = uiAnswers['LAB2'].some((test: string) => 
      test.includes('Glucose') || test.includes('HbA1c') || test.includes('Blood glucose')
    );
    if (hasGlucose) {
      const isNormal = uiAnswers['LAB2'].some((test: string) => 
        (test.includes('Glucose') || test.includes('HbA1c') || test.includes('Blood glucose')) && test.includes('normal')
      );
      const isAbnormal = uiAnswers['LAB2'].some((test: string) => 
        (test.includes('Glucose') || test.includes('HbA1c') || test.includes('Blood glucose')) && test.includes('abnormal')
      );
      features[FEATURE_IDS.GLUCOSE_STATUS] = {
        kind: "enum",
        value: isNormal ? "normal" : isAbnormal ? "abnormal" : "unknown",
      };
    }

    const hasLipids = uiAnswers['LAB2'].some((test: string) => 
      test.includes('Cholesterol') || test.includes('Lipids') || test.includes('LDL') || test.includes('HDL')
    );
    if (hasLipids) {
      const isNormal = uiAnswers['LAB2'].some((test: string) => 
        (test.includes('Cholesterol') || test.includes('Lipids') || test.includes('LDL') || test.includes('HDL')) && test.includes('normal')
      );
      const isAbnormal = uiAnswers['LAB2'].some((test: string) => 
        (test.includes('Cholesterol') || test.includes('Lipids') || test.includes('LDL') || test.includes('HDL')) && test.includes('abnormal')
      );
      features[FEATURE_IDS.LIPID_STATUS] = {
        kind: "enum",
        value: isNormal ? "normal" : isAbnormal ? "abnormal" : "unknown",
      };
    }
  }

  return features;
}






