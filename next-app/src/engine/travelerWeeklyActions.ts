import { TravelerSurveyAnswers, TravelerWeeklyAction, TravelerKeyMetricResult } from './types';
import { toSeverityTraveler } from './travelerMappings';

/**
 * Generate weekly action cards based on triggers
 */
export function generateTravelerWeeklyActions(
  answers: TravelerSurveyAnswers,
  keyMetrics: TravelerKeyMetricResult[]
): TravelerWeeklyAction[] {
  const actions: TravelerWeeklyAction[] = [];
  
  // Get metric scores for priority calculation
  const stressLoad = keyMetrics.find(m => m.id === "stress_load");
  const sleepCircadian = keyMetrics.find(m => m.id === "sleep_circadian");
  const energyRecovery = keyMetrics.find(m => m.id === "energy_recovery");
  const mobilityPhysical = keyMetrics.find(m => m.id === "mobility_physical");
  
  // Sleep & Circadian card
  const sleepCard = generateSleepCircadianCard(answers, sleepCircadian);
  if (sleepCard) actions.push(sleepCard);
  
  // Movement & Circulation card
  const movementCard = generateMovementCirculationCard(answers, mobilityPhysical);
  if (movementCard) actions.push(movementCard);
  
  // Nutrition & Hydration card
  const nutritionCard = generateNutritionHydrationCard(answers);
  if (nutritionCard) actions.push(nutritionCard);
  
  // Stress Regulation card
  const stressCard = generateStressRegulationCard(answers, stressLoad);
  if (stressCard) actions.push(stressCard);
  
  // Immune & Gut card
  const immuneCard = generateImmuneGutCard(answers, energyRecovery, sleepCircadian);
  if (immuneCard) actions.push(immuneCard);
  
  // Red Flags card
  const redFlagsCard = generateRedFlagsCard(answers, stressLoad, sleepCircadian);
  if (redFlagsCard) actions.push(redFlagsCard);
  
  // Sort by priority (HIGH > MED > LOW), then by max metric score
  actions.sort((a, b) => {
    const priorityOrder = { HIGH: 3, MED: 2, LOW: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    
    // If same priority, sort by max contributing metric score
    const aMaxScore = Math.max(...a.drivers.map(d => {
      const metric = keyMetrics.find(m => m.id === d.metricId);
      return metric?.score || 0;
    }));
    const bMaxScore = Math.max(...b.drivers.map(d => {
      const metric = keyMetrics.find(m => m.id === d.metricId);
      return metric?.score || 0;
    }));
    return bMaxScore - aMaxScore;
  });
  
  return actions;
}

/**
 * Sleep & Circadian card
 */
function generateSleepCircadianCard(
  answers: TravelerSurveyAnswers,
  sleepMetric: TravelerKeyMetricResult | undefined
): TravelerWeeklyAction | null {
  const triggers: Array<{ condition: boolean; questionId: keyof TravelerSurveyAnswers; option: string; severity: number }> = [];
  
  const sS4 = toSeverityTraveler("S4_scheduleDisruptsSleep", answers.S4_scheduleDisruptsSleep);
  if (sS4 >= 3) {
    triggers.push({ condition: true, questionId: "S4_scheduleDisruptsSleep", option: answers.S4_scheduleDisruptsSleep, severity: sS4 });
  }
  
  const sS1 = toSeverityTraveler("S1_fallAsleepDifficulty", answers.S1_fallAsleepDifficulty);
  if (sS1 >= 3) {
    triggers.push({ condition: true, questionId: "S1_fallAsleepDifficulty", option: answers.S1_fallAsleepDifficulty, severity: sS1 });
  }
  
  const sS2 = toSeverityTraveler("S2_wakeNightStayAwake", answers.S2_wakeNightStayAwake);
  if (sS2 >= 3) {
    triggers.push({ condition: true, questionId: "S2_wakeNightStayAwake", option: answers.S2_wakeNightStayAwake, severity: sS2 });
  }
  
  if (sleepMetric && sleepMetric.band === "POOR") {
    triggers.push({ condition: true, questionId: "S4_scheduleDisruptsSleep", option: "", severity: 4 });
  }
  
  if (triggers.length === 0) return null;
  
  const bullets: string[] = [];
  const drivers: TravelerWeeklyAction['drivers'] = [];
  
  // Priority bullet: S4 >= Often
  if (sS4 >= 3) {
    bullets.push("Pre-plan a sleep anchor: protect a consistent wake time and a wind-down window on travel days.");
    drivers.push({ questionId: "S4_scheduleDisruptsSleep", selectedOption: answers.S4_scheduleDisruptsSleep });
  }
  
  // S1 >= Often
  if (sS1 >= 3 && bullets.length < 3) {
    bullets.push("Use a 30–60 minute screen-free wind-down and a consistent lights-out target for 7 days.");
    drivers.push({ questionId: "S1_fallAsleepDifficulty", selectedOption: answers.S1_fallAsleepDifficulty });
  }
  
  // S2 >= Often
  if (sS2 >= 3 && bullets.length < 3) {
    bullets.push("If night waking persists, prioritize recovery mornings (light, movement, hydration) rather than extra caffeine.");
    drivers.push({ questionId: "S2_wakeNightStayAwake", selectedOption: answers.S2_wakeNightStayAwake });
  }
  
  // Determine priority
  const maxSeverity = Math.max(...triggers.map(t => t.severity));
  const priority: "LOW" | "MED" | "HIGH" = maxSeverity === 4 || (sleepMetric && sleepMetric.band === "POOR") ? "HIGH" : maxSeverity === 3 ? "MED" : "LOW";
  
  if (sleepMetric) {
    drivers.push({ metricId: "sleep_circadian" });
  }
  
  return {
    cardId: "sleep_circadian",
    title: "Sleep & Circadian Rhythm",
    bullets,
    priority,
    drivers,
  };
}

/**
 * Movement & Circulation card
 */
function generateMovementCirculationCard(
  answers: TravelerSurveyAnswers,
  mobilityMetric: TravelerKeyMetricResult | undefined
): TravelerWeeklyAction | null {
  const triggers: Array<{ condition: boolean; questionId: keyof TravelerSurveyAnswers; option: string; severity: number }> = [];
  
  const sBG10 = toSeverityTraveler("BG10_sittingDuration", answers.BG10_sittingDuration);
  const isLongSit = answers.BG10_sittingDuration === "6–8 hours" || answers.BG10_sittingDuration === ">8 hours";
  if (isLongSit) {
    triggers.push({ condition: true, questionId: "BG10_sittingDuration", option: answers.BG10_sittingDuration, severity: sBG10 });
  }
  
  const sPF2 = toSeverityTraveler("PF2_sittingCausesStiffness", answers.PF2_sittingCausesStiffness);
  if (sPF2 >= 3) {
    triggers.push({ condition: true, questionId: "PF2_sittingCausesStiffness", option: answers.PF2_sittingCausesStiffness, severity: sPF2 });
  }
  
  if (mobilityMetric && mobilityMetric.band === "POOR") {
    triggers.push({ condition: true, questionId: "PF2_sittingCausesStiffness", option: "", severity: 4 });
  }
  
  if (triggers.length === 0) return null;
  
  const bullets: string[] = [];
  const drivers: TravelerWeeklyAction['drivers'] = [];
  
  // BG10 >= 6–8h
  if (isLongSit) {
    bullets.push("Stand, stretch, or walk at least every 1–2 hours during long trips.");
    drivers.push({ questionId: "BG10_sittingDuration", selectedOption: answers.BG10_sittingDuration });
  }
  
  // PF2 >= Often
  if (sPF2 >= 3 && bullets.length < 3) {
    bullets.push("Do seated mobility: ankle pumps, calf contractions, gentle hip and back resets every 30–60 minutes.");
    drivers.push({ questionId: "PF2_sittingCausesStiffness", selectedOption: answers.PF2_sittingCausesStiffness });
  }
  
  // PF1 very/extreme
  const sPF1 = toSeverityTraveler("PF1_difficultyStayActiveTravelDays", answers.PF1_difficultyStayActiveTravelDays);
  if (sPF1 >= 3 && bullets.length < 3) {
    bullets.push("Choose a minimum viable activity plan on travel days (10–20 minutes walking + stairs).");
    drivers.push({ questionId: "PF1_difficultyStayActiveTravelDays", selectedOption: answers.PF1_difficultyStayActiveTravelDays });
  }
  
  // Determine priority
  const maxSeverity = Math.max(...triggers.map(t => t.severity));
  const priority: "LOW" | "MED" | "HIGH" = maxSeverity === 4 || (mobilityMetric && mobilityMetric.band === "POOR") ? "HIGH" : maxSeverity === 3 ? "MED" : "LOW";
  
  if (mobilityMetric) {
    drivers.push({ metricId: "mobility_physical" });
  }
  
  return {
    cardId: "movement_circulation",
    title: "Movement & Circulation",
    bullets,
    priority,
    drivers,
  };
}

/**
 * Nutrition & Hydration card
 */
function generateNutritionHydrationCard(answers: TravelerSurveyAnswers): TravelerWeeklyAction | null {
  const triggers: Array<{ condition: boolean; questionId: keyof TravelerSurveyAnswers; option: string; severity: number }> = [];
  
  const sL1 = toSeverityTraveler("L1_processedFoodsTravelDays", answers.L1_processedFoodsTravelDays);
  if (sL1 >= 3) {
    triggers.push({ condition: true, questionId: "L1_processedFoodsTravelDays", option: answers.L1_processedFoodsTravelDays, severity: sL1 });
  }
  
  const sL2 = toSeverityTraveler("L2_20minMovement", answers.L2_20minMovement);
  if (sL2 >= 3) { // Reverse-coded, so >=3 means low movement
    triggers.push({ condition: true, questionId: "L2_20minMovement", option: answers.L2_20minMovement, severity: sL2 });
  }
  
  const sG1 = toSeverityTraveler("G1_digestiveDiscomfort", answers.G1_digestiveDiscomfort);
  if (sG1 >= 3) {
    triggers.push({ condition: true, questionId: "G1_digestiveDiscomfort", option: answers.G1_digestiveDiscomfort, severity: sG1 });
  }
  
  if (triggers.length === 0) return null;
  
  const bullets: string[] = [];
  const drivers: TravelerWeeklyAction['drivers'] = [];
  
  // L1 >= Often
  if (sL1 >= 3) {
    bullets.push("Build one main travel-day meal around protein + fiber to reduce energy swings.");
    drivers.push({ questionId: "L1_processedFoodsTravelDays", selectedOption: answers.L1_processedFoodsTravelDays });
  }
  
  // G1 >= Often
  if (sG1 >= 3 && bullets.length < 3) {
    bullets.push("Simplify meals for 7 days: easier-to-digest protein + cooked vegetables; track symptoms.");
    drivers.push({ questionId: "G1_digestiveDiscomfort", selectedOption: answers.G1_digestiveDiscomfort });
  }
  
  // L2 reverse-severity high (low movement)
  if (sL2 >= 3 && bullets.length < 3) {
    bullets.push("Add a daily 20-minute movement slot (walk + stairs) to improve appetite, sleep, and stiffness.");
    drivers.push({ questionId: "L2_20minMovement", selectedOption: answers.L2_20minMovement });
  }
  
  // Determine priority
  const maxSeverity = Math.max(...triggers.map(t => t.severity));
  const priority: "LOW" | "MED" | "HIGH" = maxSeverity === 4 ? "HIGH" : maxSeverity === 3 ? "MED" : "LOW";
  
  return {
    cardId: "nutrition_hydration",
    title: "Nutrition & Hydration",
    bullets,
    priority,
    drivers,
  };
}

/**
 * Stress Regulation card
 */
function generateStressRegulationCard(
  answers: TravelerSurveyAnswers,
  stressMetric: TravelerKeyMetricResult | undefined
): TravelerWeeklyAction | null {
  const triggers: Array<{ condition: boolean; questionId: keyof TravelerSurveyAnswers; option: string; severity: number }> = [];
  
  const sST1 = toSeverityTraveler("ST1_overwhelmed", answers.ST1_overwhelmed);
  if (sST1 >= 3) {
    triggers.push({ condition: true, questionId: "ST1_overwhelmed", option: answers.ST1_overwhelmed, severity: sST1 });
  }
  
  const sST2 = toSeverityTraveler("ST2_unableToRelax", answers.ST2_unableToRelax);
  if (sST2 >= 3) {
    triggers.push({ condition: true, questionId: "ST2_unableToRelax", option: answers.ST2_unableToRelax, severity: sST2 });
  }
  
  if (stressMetric && stressMetric.band === "HIGH") {
    triggers.push({ condition: true, questionId: "ST1_overwhelmed", option: "", severity: 4 });
  }
  
  if (triggers.length === 0) return null;
  
  const bullets: string[] = [];
  const drivers: TravelerWeeklyAction['drivers'] = [];
  
  // ST1 >= Often
  if (sST1 >= 3) {
    bullets.push("Schedule short decompression breaks before and after travel blocks (5–10 minutes).");
    drivers.push({ questionId: "ST1_overwhelmed", selectedOption: answers.ST1_overwhelmed });
  }
  
  // ST2 >= Often
  if (sST2 >= 3 && bullets.length < 3) {
    bullets.push("Use a brief downshift practice during transit (slow breathing or grounding for 2–3 minutes).");
    drivers.push({ questionId: "ST2_unableToRelax", selectedOption: answers.ST2_unableToRelax });
  }
  
  // M2 >= Often
  const sM2 = toSeverityTraveler("M2_stressHardToFocus", answers.M2_stressHardToFocus);
  if (sM2 >= 3 && bullets.length < 3) {
    bullets.push("Use focus protection: 1–2 single-task blocks daily instead of multitasking.");
    drivers.push({ questionId: "M2_stressHardToFocus", selectedOption: answers.M2_stressHardToFocus });
  }
  
  // Determine priority
  const maxSeverity = Math.max(...triggers.map(t => t.severity));
  const priority: "LOW" | "MED" | "HIGH" = maxSeverity === 4 || (stressMetric && stressMetric.band === "HIGH") ? "HIGH" : maxSeverity === 3 ? "MED" : "LOW";
  
  if (stressMetric) {
    drivers.push({ metricId: "stress_load" });
  }
  
  return {
    cardId: "stress_regulation",
    title: "Stress Regulation",
    bullets,
    priority,
    drivers,
  };
}

/**
 * Immune & Gut card
 */
function generateImmuneGutCard(
  answers: TravelerSurveyAnswers,
  energyMetric: TravelerKeyMetricResult | undefined,
  sleepMetric: TravelerKeyMetricResult | undefined
): TravelerWeeklyAction | null {
  const triggers: Array<{ condition: boolean; questionId: keyof TravelerSurveyAnswers; option: string; severity: number }> = [];
  
  const sIMM1 = toSeverityTraveler("IMM1_proneToSickDuringTravel", answers.IMM1_proneToSickDuringTravel);
  if (sIMM1 >= 3) {
    triggers.push({ condition: true, questionId: "IMM1_proneToSickDuringTravel", option: answers.IMM1_proneToSickDuringTravel, severity: sIMM1 });
  }
  
  const sG1 = toSeverityTraveler("G1_digestiveDiscomfort", answers.G1_digestiveDiscomfort);
  if (sG1 >= 3) {
    triggers.push({ condition: true, questionId: "G1_digestiveDiscomfort", option: answers.G1_digestiveDiscomfort, severity: sG1 });
  }
  
  if (energyMetric && energyMetric.band === "ELEVATED") {
    triggers.push({ condition: true, questionId: "IMM1_proneToSickDuringTravel", option: "", severity: 4 });
  }
  
  if (triggers.length === 0) return null;
  
  const bullets: string[] = [];
  const drivers: TravelerWeeklyAction['drivers'] = [];
  
  // IMM1 >= Often
  if (sIMM1 >= 3) {
    bullets.push("Prioritize sleep and hydration for 48 hours pre- and post-trip to support immune resilience.");
    drivers.push({ questionId: "IMM1_proneToSickDuringTravel", selectedOption: answers.IMM1_proneToSickDuringTravel });
  }
  
  // G1 >= Often
  if (sG1 >= 3 && bullets.length < 3) {
    bullets.push("Keep a simple symptom log during travel to identify triggers and timing.");
    drivers.push({ questionId: "G1_digestiveDiscomfort", selectedOption: answers.G1_digestiveDiscomfort });
  }
  
  // Both IMM1 and poor sleep
  if (sIMM1 >= 3 && sleepMetric && sleepMetric.band === "POOR" && bullets.length < 3) {
    bullets.push("Reduce strain stacking: avoid late caffeine and protect recovery mornings.");
    drivers.push({ questionId: "IMM1_proneToSickDuringTravel", selectedOption: answers.IMM1_proneToSickDuringTravel });
    if (sleepMetric) {
      drivers.push({ metricId: "sleep_circadian" });
    }
  }
  
  // Determine priority
  const maxSeverity = Math.max(...triggers.map(t => t.severity));
  const priority: "LOW" | "MED" | "HIGH" = maxSeverity === 4 || (energyMetric && energyMetric.band === "ELEVATED") ? "HIGH" : maxSeverity === 3 ? "MED" : "LOW";
  
  if (energyMetric) {
    drivers.push({ metricId: "energy_recovery" });
  }
  
  return {
    cardId: "immune_gut",
    title: "Immune & Gut Resilience",
    bullets,
    priority,
    drivers,
  };
}

/**
 * Red Flags card
 */
function generateRedFlagsCard(
  answers: TravelerSurveyAnswers,
  stressMetric: TravelerKeyMetricResult | undefined,
  sleepMetric: TravelerKeyMetricResult | undefined
): TravelerWeeklyAction | null {
  const triggers: Array<{ condition: boolean; questionId: keyof TravelerSurveyAnswers; option: string; severity: number }> = [];
  
  if (answers.R1_chestBreathlessDizzy === "Yes" || answers.R3_needsPromptEvaluation === "Yes") {
    triggers.push({ condition: true, questionId: "R1_chestBreathlessDizzy", option: answers.R1_chestBreathlessDizzy, severity: 4 });
  }
  
  if (answers.R2_moodStressImpairsFunction === "Yes") {
    triggers.push({ condition: true, questionId: "R2_moodStressImpairsFunction", option: answers.R2_moodStressImpairsFunction, severity: 4 });
  }
  
  // Strain convergence
  if (sleepMetric && sleepMetric.band === "POOR" && stressMetric && stressMetric.band === "HIGH") {
    triggers.push({ condition: true, questionId: "R2_moodStressImpairsFunction", option: "", severity: 4 });
  }
  
  if (triggers.length === 0) return null;
  
  const bullets: string[] = [];
  const drivers: TravelerWeeklyAction['drivers'] = [];
  
  // R1=Yes or R3=Yes
  if (answers.R1_chestBreathlessDizzy === "Yes" || answers.R3_needsPromptEvaluation === "Yes") {
    bullets.push("Some symptoms may need prompt evaluation. Seek medical care rather than relying on self-management.");
    drivers.push({ questionId: "R1_chestBreathlessDizzy", selectedOption: answers.R1_chestBreathlessDizzy });
  }
  
  // R2=Yes
  if (answers.R2_moodStressImpairsFunction === "Yes" && bullets.length < 3) {
    bullets.push("If mood or stress is impairing function, consider timely clinical support and reduce travel load if possible.");
    drivers.push({ questionId: "R2_moodStressImpairsFunction", selectedOption: answers.R2_moodStressImpairsFunction });
  }
  
  // Always HIGH priority for red flags
  const priority: "HIGH" = "HIGH";
  
  return {
    cardId: "red_flags",
    title: "Safety & Red Flags",
    bullets,
    priority,
    drivers,
  };
}






