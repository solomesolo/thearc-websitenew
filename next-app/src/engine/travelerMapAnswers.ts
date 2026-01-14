import { TravelerSurveyAnswers } from './types';

/**
 * Maps questionnaire answers from UI format (question IDs like "BG1", "T1", etc.)
 * to traveler engine format (BG1_age, F1_wornOutAfternoon, etc.)
 */
export function mapTravelerQuestionnaireAnswers(uiAnswers: Record<string, any>): TravelerSurveyAnswers {
  // Calculate BMI if height and weight are provided
  const heightCm = uiAnswers['BG3'] ? Number(uiAnswers['BG3']) : undefined;
  const weightKg = uiAnswers['BG4'] ? Number(uiAnswers['BG4']) : undefined;

  // Validate required fields
  const missingFields: string[] = [];
  
  // Check BG7_dx (from BG5)
  const bg7_dx = Array.isArray(uiAnswers['BG5']) ? uiAnswers['BG5'] : (uiAnswers['BG5'] ? [uiAnswers['BG5']] : ["None of the above"]);
  if (!bg7_dx || bg7_dx.length === 0) {
    missingFields.push('BG5 (diagnosed conditions -> BG7_dx)');
  }
  
  // Check BG8_familyHx (from BG6)
  const bg8_familyHx = Array.isArray(uiAnswers['BG6']) ? uiAnswers['BG6'] : (uiAnswers['BG6'] ? [uiAnswers['BG6']] : ["None of the above"]);
  if (!bg8_familyHx || bg8_familyHx.length === 0) {
    missingFields.push('BG6 (family history -> BG8_familyHx)');
  }
  
  // Check BG10_sittingDuration (from T3)
  if (!uiAnswers['T3']) {
    missingFields.push('T3 (sitting duration -> BG10_sittingDuration)');
  }

  if (missingFields.length > 0) {
    console.warn("Missing required fields:", missingFields);
    console.warn("Available answer keys:", Object.keys(uiAnswers));
  }

  const mapped: TravelerSurveyAnswers = {
    // Section 0 — Demographics & Core Health Context
    BG1_age: uiAnswers['BG1'] ? Number(uiAnswers['BG1']) : undefined,
    BG2_gender: (uiAnswers['BG2'] as "Female" | "Male" | "Intersex" | "Prefer not to say") || "Prefer not to say",
    BG3_heightCm: heightCm,
    BG4_weightKg: weightKg,
    BG5_noPeriod12mo: "Not applicable", // Not in new questionnaire structure
    BG6_hormoneTherapy: "No", // Not in new questionnaire structure
    BG7_dx: bg7_dx as TravelerSurveyAnswers['BG7_dx'],
    BG8_familyHx: bg8_familyHx as TravelerSurveyAnswers['BG8_familyHx'],
    BG9_upcomingTravel6w: uiAnswers['T1'] === "Yes" ? "Yes" : "No",
    BG10_sittingDuration: (uiAnswers['T3'] as TravelerSurveyAnswers['BG10_sittingDuration']) || "<2 hours",

    // Section 1 — Energy, Fatigue & Recovery
    F1_wornOutAfternoon: mapScaleToLikertFreq(uiAnswers['E1'] ?? "Never"),
    F2_lowEnergyLimits: mapScaleToLikertFreq(uiAnswers['E2'] ?? "Never"),
    F3_refreshedOnWaking: mapScaleToRefreshed(uiAnswers['E3'] ?? "Neutral"),

    // Section 2 — Sleep & Circadian Rhythm
    S1_fallAsleepDifficulty: mapScaleToLikertFreq(uiAnswers['S1'] ?? "Never"),
    S2_wakeNightStayAwake: mapScaleToLikertFreq(uiAnswers['S2'] ?? "Never"),
    S3_bedtimeConsistency: mapScaleToConsistency(uiAnswers['S3'] ?? "Neutral"),
    S4_scheduleDisruptsSleep: mapScaleToLikertFreq(uiAnswers['S4'] ?? "Never"),
    S5_poorSleepAffectsNextDay: mapScaleToLikertFreq(uiAnswers['S5'] ?? "Never"),
    S6_caffeineAfter14: (uiAnswers['S6'] as TravelerSurveyAnswers['S6_caffeineAfter14']) || "Never",

    // Section 3 — Stress & Emotional Load
    ST1_overwhelmed: mapScaleToLikertFreqOrExtremity(uiAnswers['ST1'] ?? "Never"),
    ST2_unableToRelax: mapScaleToLikertFreqOrExtremity(uiAnswers['ST2'] ?? "Never"),
    M1_lowMood: mapScaleToLikertFreq(uiAnswers['ST4'] ?? "Never"),
    M2_stressHardToFocus: mapScaleToLikertFreqOrDaily(uiAnswers['ST3'] ?? "Never"),

    // Section 4 — Movement, Pain & Circulation
    P1_painLimitsActivities: mapScaleToLikertFreq(uiAnswers['M4'] ?? "Never"),
    P2_avoidMovementDueDiscomfort: mapScaleToLikertFreq(uiAnswers['M4'] ?? "Never"),
    PF1_difficultyStayActiveTravelDays: mapScaleToDifficulty(uiAnswers['M3'] ?? "Not difficult"),
    PF2_sittingCausesStiffness: mapScaleToLikertFreq(uiAnswers['M3'] ?? "Never"),

    // Section 5 — Cognition
    // Note: C1 and C2 might not be in the questionnaire, use defaults
    C1_loseTrack: mapScaleToLikertFreq(uiAnswers['C1'] ?? "Never"),
    C2_notSharpWhenTired: mapScaleToLikertFreq(uiAnswers['C2'] ?? "Never"),

    // Section 6 — Digestive & Immune Resilience
    G1_digestiveDiscomfort: mapScaleToLikertFreq(uiAnswers['G1'] ?? "Never"),
    IMM1_proneToSickDuringTravel: mapScaleToLikertFreq(uiAnswers['G2'] ?? "Never"),
    G3_giIllnessPastYear: (uiAnswers['G3'] as TravelerSurveyAnswers['G3_giIllnessPastYear']) || "No",

    // Section 7 — Nutrition & Hydration
    L1_processedFoodsTravelDays: mapScaleToLikertFreq(uiAnswers['N1'] ?? "Never"),
    L2_20minMovement: mapDaysPerWeekToLikertFreq(uiAnswers['M1'] ?? "0 days"), // M1: Days per week with ≥30 minutes of moderate movement (reverse-coded)
    N3_underHydratedWhileTraveling: mapScaleToLikertFreq(uiAnswers['N3'] ?? "Never"),

    // Section 8 — Current Supplement & Medication Use
    SUP1_supplements: Array.isArray(uiAnswers['SUP1']) ? uiAnswers['SUP1'] : (uiAnswers['SUP1'] ? [uiAnswers['SUP1']] : ["No"]),
    SUP2_supplementCount: uiAnswers['SUP2'] || "0–1",
    SUP3_prescriptionMeds: uiAnswers['SUP3'] || "No",

    // Section 9 — Lab History & Screening Gap
    LAB1_lastGeneralBloodTest: uiAnswers['LAB1'] || "Never",
    LAB2_specificTests: Array.isArray(uiAnswers['LAB2']) ? uiAnswers['LAB2'] : [],

    // Section 10 — Safety & Red Flags
    R1_chestBreathlessDizzy: uiAnswers['R1'] === "Yes" ? "Yes" : "No",
    R2_moodStressImpairsFunction: uiAnswers['R2'] === "Yes" ? "Yes" : "No",
    R3_needsPromptEvaluation: uiAnswers['R3'] === "Yes" ? "Yes" : "No",
  };

  return mapped;
}

/**
 * Maps numeric scale value (0-4) or string to LikertFreq
 */
function mapScaleToLikertFreq(value: any): "Never" | "Rarely" | "Sometimes" | "Often" | "Almost always" {
  if (typeof value === 'string') {
    // Handle "Always" as "Almost always"
    if (value === "Always") {
      return "Almost always";
    }
    
    const validOptions = ["Never", "Rarely", "Sometimes", "Often", "Almost always"];
    if (validOptions.includes(value)) {
      return value as "Never" | "Rarely" | "Sometimes" | "Often" | "Almost always";
    }
  }
  
  const num = typeof value === 'number' ? value : Number(value);
  const options: Array<"Never" | "Rarely" | "Sometimes" | "Often" | "Almost always"> = [
    "Never",
    "Rarely",
    "Sometimes",
    "Often",
    "Almost always",
  ];
  
  if (isNaN(num) || num < 0 || num >= options.length) {
    return "Never";
  }
  
  return options[num];
}

/**
 * Maps to RefreshedScale
 */
function mapScaleToRefreshed(value: any): "Very refreshed" | "Somewhat refreshed" | "Neutral" | "Somewhat unrefreshed" | "Very unrefreshed" {
  if (typeof value === 'string') {
    const validOptions = ["Very refreshed", "Somewhat refreshed", "Neutral", "Somewhat unrefreshed", "Very unrefreshed"];
    if (validOptions.includes(value)) {
      return value as "Very refreshed" | "Somewhat refreshed" | "Neutral" | "Somewhat unrefreshed" | "Very unrefreshed";
    }
  }
  
  const num = typeof value === 'number' ? value : Number(value);
  const options: Array<"Very refreshed" | "Somewhat refreshed" | "Neutral" | "Somewhat unrefreshed" | "Very unrefreshed"> = [
    "Very refreshed",
    "Somewhat refreshed",
    "Neutral",
    "Somewhat unrefreshed",
    "Very unrefreshed",
  ];
  
  if (isNaN(num) || num < 0 || num >= options.length) {
    return "Neutral";
  }
  
  return options[num];
}

/**
 * Maps to ConsistencyScale
 */
function mapScaleToConsistency(value: any): "Very consistent" | "Somewhat consistent" | "Neutral" | "Somewhat inconsistent" | "Very inconsistent" {
  if (typeof value === 'string') {
    const validOptions = ["Very consistent", "Somewhat consistent", "Neutral", "Somewhat inconsistent", "Very inconsistent"];
    if (validOptions.includes(value)) {
      return value as "Very consistent" | "Somewhat consistent" | "Neutral" | "Somewhat inconsistent" | "Very inconsistent";
    }
  }
  
  const num = typeof value === 'number' ? value : Number(value);
  const options: Array<"Very consistent" | "Somewhat consistent" | "Neutral" | "Somewhat inconsistent" | "Very inconsistent"> = [
    "Very consistent",
    "Somewhat consistent",
    "Neutral",
    "Somewhat inconsistent",
    "Very inconsistent",
  ];
  
  if (isNaN(num) || num < 0 || num >= options.length) {
    return "Neutral";
  }
  
  return options[num];
}

/**
 * Maps to DifficultyScale
 */
function mapScaleToDifficulty(value: any): "Not difficult" | "Slightly difficult" | "Moderately difficult" | "Very difficult" | "Extremely difficult" {
  if (typeof value === 'string') {
    const validOptions = ["Not difficult", "Slightly difficult", "Moderately difficult", "Very difficult", "Extremely difficult"];
    if (validOptions.includes(value)) {
      return value as "Not difficult" | "Slightly difficult" | "Moderately difficult" | "Very difficult" | "Extremely difficult";
    }
  }
  
  const num = typeof value === 'number' ? value : Number(value);
  const options: Array<"Not difficult" | "Slightly difficult" | "Moderately difficult" | "Very difficult" | "Extremely difficult"> = [
    "Not difficult",
    "Slightly difficult",
    "Moderately difficult",
    "Very difficult",
    "Extremely difficult",
  ];
  
  if (isNaN(num) || num < 0 || num >= options.length) {
    return "Not difficult";
  }
  
  return options[num];
}

/**
 * Maps scale to LikertFreq, handling "Not at all" to "Extremely" scale (for ST1, ST2)
 */
function mapScaleToLikertFreqOrExtremity(value: any): "Never" | "Rarely" | "Sometimes" | "Often" | "Almost always" {
  if (typeof value === 'string') {
    // Handle "Not at all" to "Extremely" scale (for ST1, ST2)
    const extremityMap: Record<string, "Never" | "Rarely" | "Sometimes" | "Often" | "Almost always"> = {
      "Not at all": "Never",
      "Slightly": "Rarely",
      "Moderately": "Sometimes",
      "Very": "Often",
      "Extremely": "Almost always",
    };
    if (extremityMap[value]) {
      return extremityMap[value];
    }
    
    // Also handle "Always" as "Almost always"
    if (value === "Always") {
      return "Almost always";
    }
    
    const validOptions = ["Never", "Rarely", "Sometimes", "Often", "Almost always"];
    if (validOptions.includes(value)) {
      return value as "Never" | "Rarely" | "Sometimes" | "Often" | "Almost always";
    }
  }
  
  const num = typeof value === 'number' ? value : Number(value);
  const options: Array<"Never" | "Rarely" | "Sometimes" | "Often" | "Almost always"> = [
    "Never",
    "Rarely",
    "Sometimes",
    "Often",
    "Almost always",
  ];
  
  if (isNaN(num) || num < 0 || num >= options.length) {
    return "Never";
  }
  
  return options[num];
}

/**
 * Maps scale to LikertFreq, handling "Never" to "Daily" scale (for M2_stressHardToFocus)
 */
function mapScaleToLikertFreqOrDaily(value: any): "Never" | "Rarely" | "Sometimes" | "Often" | "Almost always" {
  if (typeof value === 'string') {
    // Handle "Never" to "Daily" scale
    const dailyMap: Record<string, "Never" | "Rarely" | "Sometimes" | "Often" | "Almost always"> = {
      "Never": "Never",
      "Rarely": "Rarely",
      "Sometimes": "Sometimes",
      "Often": "Often",
      "Daily": "Almost always",
    };
    if (dailyMap[value]) {
      return dailyMap[value];
    }
    
    const validOptions = ["Never", "Rarely", "Sometimes", "Often", "Almost always"];
    if (validOptions.includes(value)) {
      return value as "Never" | "Rarely" | "Sometimes" | "Often" | "Almost always";
    }
  }
  
  const num = typeof value === 'number' ? value : Number(value);
  const options: Array<"Never" | "Rarely" | "Sometimes" | "Often" | "Almost always"> = [
    "Never",
    "Rarely",
    "Sometimes",
    "Often",
    "Almost always",
  ];
  
  if (isNaN(num) || num < 0 || num >= options.length) {
    return "Never";
  }
  
  return options[num];
}

/**
 * Maps days per week to LikertFreq (reverse-coded for movement)
 */
function mapDaysPerWeekToLikertFreq(value: any): "Never" | "Rarely" | "Sometimes" | "Often" | "Almost always" {
  if (typeof value === 'string') {
    // Handle "0 days" to "Daily" scale (reverse-coded)
    const daysMap: Record<string, "Never" | "Rarely" | "Sometimes" | "Often" | "Almost always"> = {
      "0 days": "Almost always", // No movement = high risk
      "1–2 days": "Often",
      "3–4 days": "Sometimes",
      "5–6 days": "Rarely",
      "Daily": "Never", // Daily movement = low risk
    };
    if (daysMap[value]) {
      return daysMap[value];
    }
  }
  
  // If numeric (0-4), reverse it
  const num = typeof value === 'number' ? value : Number(value);
  const options: Array<"Never" | "Rarely" | "Sometimes" | "Often" | "Almost always"> = [
    "Almost always", // 0 = no movement
    "Often",         // 1
    "Sometimes",     // 2
    "Rarely",        // 3
    "Never",         // 4 = daily movement
  ];
  
  if (isNaN(num) || num < 0 || num >= options.length) {
    return "Almost always"; // Default to high risk if unknown
  }
  
  return options[num];
}






