import { TravelerSurveyAnswers, TravelerKeyMetricResult, TravelerCause, TravelerMetricBand, Likert5 } from './types';
import { toSeverityTraveler, getTravelerTags, TRAVELER_CAUSE_SENTENCES } from './travelerMappings';

/**
 * Calculate all 4 traveler key metrics
 */
export function calculateTravelerKeyMetrics(answers: TravelerSurveyAnswers): TravelerKeyMetricResult[] {
  const travelTags = getTravelerTags(answers);
  
  return [
    calculateStressLoad(answers, travelTags),
    calculateSleepCircadian(answers, travelTags),
    calculateEnergyRecovery(answers, travelTags),
    calculateMobilityPhysical(answers, travelTags),
  ];
}

/**
 * Metric 1: Stress Load
 */
function calculateStressLoad(answers: TravelerSurveyAnswers, travelTags: string[]): TravelerKeyMetricResult {
  const weights = {
    ST1: 25,
    ST2: 25,
    M2: 20,
    M1: 15,
    S5: 15,
  };
  
  let rawScore = 0;
  let maxPossible = 0;
  const causes: TravelerCause[] = [];
  
  // ST1: Overwhelmed
  const sST1 = toSeverityTraveler("ST1_overwhelmed", answers.ST1_overwhelmed);
  const pointsST1 = (sST1 / 4) * weights.ST1;
  rawScore += pointsST1;
  maxPossible += weights.ST1;
  if (sST1 >= 2) {
    causes.push({
      questionId: "ST1_overwhelmed",
      selectedOption: answers.ST1_overwhelmed,
      severity: sST1,
      points: pointsST1,
      sentence: TRAVELER_CAUSE_SENTENCES.stress_load.ST1_overwhelmed.replace("{option}", answers.ST1_overwhelmed.toLowerCase()),
    });
  }
  
  // ST2: Unable to relax
  const sST2 = toSeverityTraveler("ST2_unableToRelax", answers.ST2_unableToRelax);
  const pointsST2 = (sST2 / 4) * weights.ST2;
  rawScore += pointsST2;
  maxPossible += weights.ST2;
  if (sST2 >= 2) {
    causes.push({
      questionId: "ST2_unableToRelax",
      selectedOption: answers.ST2_unableToRelax,
      severity: sST2,
      points: pointsST2,
      sentence: TRAVELER_CAUSE_SENTENCES.stress_load.ST2_unableToRelax.replace("{option}", answers.ST2_unableToRelax.toLowerCase()),
    });
  }
  
  // M2: Stress hard to focus
  const sM2 = toSeverityTraveler("M2_stressHardToFocus", answers.M2_stressHardToFocus);
  const pointsM2 = (sM2 / 4) * weights.M2;
  rawScore += pointsM2;
  maxPossible += weights.M2;
  if (sM2 >= 2) {
    causes.push({
      questionId: "M2_stressHardToFocus",
      selectedOption: answers.M2_stressHardToFocus,
      severity: sM2,
      points: pointsM2,
      sentence: TRAVELER_CAUSE_SENTENCES.stress_load.M2_stressHardToFocus.replace("{option}", answers.M2_stressHardToFocus.toLowerCase()),
    });
  }
  
  // M1: Low mood
  const sM1 = toSeverityTraveler("M1_lowMood", answers.M1_lowMood);
  const pointsM1 = (sM1 / 4) * weights.M1;
  rawScore += pointsM1;
  maxPossible += weights.M1;
  if (sM1 >= 2) {
    causes.push({
      questionId: "M1_lowMood",
      selectedOption: answers.M1_lowMood,
      severity: sM1,
      points: pointsM1,
      sentence: TRAVELER_CAUSE_SENTENCES.stress_load.M1_lowMood.replace("{option}", answers.M1_lowMood.toLowerCase()),
    });
  }
  
  // S5: Poor sleep affects next day
  const sS5 = toSeverityTraveler("S5_poorSleepAffectsNextDay", answers.S5_poorSleepAffectsNextDay);
  const pointsS5 = (sS5 / 4) * weights.S5;
  rawScore += pointsS5;
  maxPossible += weights.S5;
  if (sS5 >= 2) {
    causes.push({
      questionId: "S5_poorSleepAffectsNextDay",
      selectedOption: answers.S5_poorSleepAffectsNextDay,
      severity: sS5,
      points: pointsS5,
      sentence: TRAVELER_CAUSE_SENTENCES.stress_load.S5_poorSleepAffectsNextDay.replace("{option}", answers.S5_poorSleepAffectsNextDay.toLowerCase()),
    });
  }
  
  // Modifiers
  if (travelTags.includes("upcoming_travel")) {
    rawScore += 2;
  }
  if (travelTags.includes("long_sit") && sST1 >= 3) {
    rawScore += 2;
  }
  
  // Normalize to 0-100
  const normalizedScore = maxPossible > 0 ? Math.min(100, Math.round((rawScore / maxPossible) * 100)) : 0;
  
  // Determine band
  let band: TravelerMetricBand;
  if (normalizedScore < 40) {
    band = "LOW";
  } else if (normalizedScore < 60) {
    band = "MODERATE";
  } else {
    band = "HIGH";
  }
  
  // Sort causes by points, filter s>=2, take top N
  causes.sort((a, b) => b.points - a.points);
  const filteredCauses = causes.filter(c => c.severity >= 2);
  const topN = band === "LOW" ? 2 : band === "MODERATE" ? 3 : 4;
  const topCauses = filteredCauses.slice(0, topN);
  
  // Generate description
  const description = generateMetricDescription("stress_load", band, topCauses, travelTags);
  
  return {
    id: "stress_load",
    score: normalizedScore,
    band,
    travelTags: travelTags.filter(t => t === "upcoming_travel" || t === "long_sit" || t === "cardiometabolic_dx"),
    causes: topCauses,
    description,
  };
}

/**
 * Metric 2: Sleep & Circadian
 */
function calculateSleepCircadian(answers: TravelerSurveyAnswers, travelTags: string[]): TravelerKeyMetricResult {
  const weights = {
    S4: 30,
    S1: 20,
    S2: 20,
    S3: 10,
    F3: 20,
  };
  
  let rawScore = 0;
  let maxPossible = 0;
  const causes: TravelerCause[] = [];
  
  // S4: Schedule disrupts sleep
  const sS4 = toSeverityTraveler("S4_scheduleDisruptsSleep", answers.S4_scheduleDisruptsSleep);
  const pointsS4 = (sS4 / 4) * weights.S4;
  rawScore += pointsS4;
  maxPossible += weights.S4;
  if (sS4 >= 2) {
    causes.push({
      questionId: "S4_scheduleDisruptsSleep",
      selectedOption: answers.S4_scheduleDisruptsSleep,
      severity: sS4,
      points: pointsS4,
      sentence: TRAVELER_CAUSE_SENTENCES.sleep_circadian.S4_scheduleDisruptsSleep.replace("{option}", answers.S4_scheduleDisruptsSleep.toLowerCase()),
    });
  }
  
  // S1: Fall asleep difficulty
  const sS1 = toSeverityTraveler("S1_fallAsleepDifficulty", answers.S1_fallAsleepDifficulty);
  const pointsS1 = (sS1 / 4) * weights.S1;
  rawScore += pointsS1;
  maxPossible += weights.S1;
  if (sS1 >= 2) {
    causes.push({
      questionId: "S1_fallAsleepDifficulty",
      selectedOption: answers.S1_fallAsleepDifficulty,
      severity: sS1,
      points: pointsS1,
      sentence: TRAVELER_CAUSE_SENTENCES.sleep_circadian.S1_fallAsleepDifficulty.replace("{option}", answers.S1_fallAsleepDifficulty.toLowerCase()),
    });
  }
  
  // S2: Wake night stay awake
  const sS2 = toSeverityTraveler("S2_wakeNightStayAwake", answers.S2_wakeNightStayAwake);
  const pointsS2 = (sS2 / 4) * weights.S2;
  rawScore += pointsS2;
  maxPossible += weights.S2;
  if (sS2 >= 2) {
    causes.push({
      questionId: "S2_wakeNightStayAwake",
      selectedOption: answers.S2_wakeNightStayAwake,
      severity: sS2,
      points: pointsS2,
      sentence: TRAVELER_CAUSE_SENTENCES.sleep_circadian.S2_wakeNightStayAwake.replace("{option}", answers.S2_wakeNightStayAwake.toLowerCase()),
    });
  }
  
  // S3: Bedtime consistency
  const sS3 = toSeverityTraveler("S3_bedtimeConsistency", answers.S3_bedtimeConsistency);
  const pointsS3 = (sS3 / 4) * weights.S3;
  rawScore += pointsS3;
  maxPossible += weights.S3;
  if (sS3 >= 2) {
    causes.push({
      questionId: "S3_bedtimeConsistency",
      selectedOption: answers.S3_bedtimeConsistency,
      severity: sS3,
      points: pointsS3,
      sentence: TRAVELER_CAUSE_SENTENCES.sleep_circadian.S3_bedtimeConsistency.replace("{option}", answers.S3_bedtimeConsistency.toLowerCase()),
    });
  }
  
  // F3: Refreshed on waking (reverse-coded)
  const sF3 = toSeverityTraveler("F3_refreshedOnWaking", answers.F3_refreshedOnWaking);
  const pointsF3 = (sF3 / 4) * weights.F3;
  rawScore += pointsF3;
  maxPossible += weights.F3;
  if (sF3 >= 2) {
    causes.push({
      questionId: "F3_refreshedOnWaking",
      selectedOption: answers.F3_refreshedOnWaking,
      severity: sF3,
      points: pointsF3,
      sentence: TRAVELER_CAUSE_SENTENCES.sleep_circadian.F3_refreshedOnWaking.replace("{option}", answers.F3_refreshedOnWaking.toLowerCase()),
    });
  }
  
  // Modifiers
  if (travelTags.includes("upcoming_travel") && sS4 >= 3) {
    rawScore += 5;
  }
  if (travelTags.includes("long_sit") && sS2 >= 3) {
    rawScore += 2;
  }
  
  // Normalize to 0-100
  const normalizedScore = maxPossible > 0 ? Math.min(100, Math.round((rawScore / maxPossible) * 100)) : 0;
  
  // Determine band
  let band: TravelerMetricBand;
  if (normalizedScore < 40) {
    band = "GOOD";
  } else if (normalizedScore < 60) {
    band = "MODERATE";
  } else {
    band = "POOR";
  }
  
  // Sort causes by points, filter s>=2, take top N
  causes.sort((a, b) => b.points - a.points);
  const filteredCauses = causes.filter(c => c.severity >= 2);
  const topN = band === "GOOD" ? 2 : band === "MODERATE" ? 3 : 4;
  const topCauses = filteredCauses.slice(0, topN);
  
  // Generate description
  const description = generateMetricDescription("sleep_circadian", band, topCauses, travelTags);
  
  return {
    id: "sleep_circadian",
    score: normalizedScore,
    band,
    travelTags: travelTags.filter(t => t === "upcoming_travel" || t === "long_sit" || t === "cardiometabolic_dx"),
    causes: topCauses,
    description,
  };
}

/**
 * Metric 3: Energy & Recovery
 */
function calculateEnergyRecovery(answers: TravelerSurveyAnswers, travelTags: string[]): TravelerKeyMetricResult {
  const weights = {
    F2: 25,
    F1: 20,
    F3: 20,
    S5: 15,
    IMM1: 20,
  };
  
  let rawScore = 0;
  let maxPossible = 0;
  const causes: TravelerCause[] = [];
  
  // F2: Low energy limits
  const sF2 = toSeverityTraveler("F2_lowEnergyLimits", answers.F2_lowEnergyLimits);
  const pointsF2 = (sF2 / 4) * weights.F2;
  rawScore += pointsF2;
  maxPossible += weights.F2;
  if (sF2 >= 2) {
    causes.push({
      questionId: "F2_lowEnergyLimits",
      selectedOption: answers.F2_lowEnergyLimits,
      severity: sF2,
      points: pointsF2,
      sentence: TRAVELER_CAUSE_SENTENCES.energy_recovery.F2_lowEnergyLimits.replace("{option}", answers.F2_lowEnergyLimits.toLowerCase()),
    });
  }
  
  // F1: Worn out afternoon
  const sF1 = toSeverityTraveler("F1_wornOutAfternoon", answers.F1_wornOutAfternoon);
  const pointsF1 = (sF1 / 4) * weights.F1;
  rawScore += pointsF1;
  maxPossible += weights.F1;
  if (sF1 >= 2) {
    causes.push({
      questionId: "F1_wornOutAfternoon",
      selectedOption: answers.F1_wornOutAfternoon,
      severity: sF1,
      points: pointsF1,
      sentence: TRAVELER_CAUSE_SENTENCES.energy_recovery.F1_wornOutAfternoon.replace("{option}", answers.F1_wornOutAfternoon.toLowerCase()),
    });
  }
  
  // F3: Refreshed on waking (reverse-coded)
  const sF3 = toSeverityTraveler("F3_refreshedOnWaking", answers.F3_refreshedOnWaking);
  const pointsF3 = (sF3 / 4) * weights.F3;
  rawScore += pointsF3;
  maxPossible += weights.F3;
  if (sF3 >= 2) {
    causes.push({
      questionId: "F3_refreshedOnWaking",
      selectedOption: answers.F3_refreshedOnWaking,
      severity: sF3,
      points: pointsF3,
      sentence: TRAVELER_CAUSE_SENTENCES.energy_recovery.F3_refreshedOnWaking.replace("{option}", answers.F3_refreshedOnWaking.toLowerCase()),
    });
  }
  
  // S5: Poor sleep affects next day
  const sS5 = toSeverityTraveler("S5_poorSleepAffectsNextDay", answers.S5_poorSleepAffectsNextDay);
  const pointsS5 = (sS5 / 4) * weights.S5;
  rawScore += pointsS5;
  maxPossible += weights.S5;
  if (sS5 >= 2) {
    causes.push({
      questionId: "S5_poorSleepAffectsNextDay",
      selectedOption: answers.S5_poorSleepAffectsNextDay,
      severity: sS5,
      points: pointsS5,
      sentence: TRAVELER_CAUSE_SENTENCES.energy_recovery.S5_poorSleepAffectsNextDay.replace("{option}", answers.S5_poorSleepAffectsNextDay.toLowerCase()),
    });
  }
  
  // IMM1: Prone to sick during travel
  const sIMM1 = toSeverityTraveler("IMM1_proneToSickDuringTravel", answers.IMM1_proneToSickDuringTravel);
  const pointsIMM1 = (sIMM1 / 4) * weights.IMM1;
  rawScore += pointsIMM1;
  maxPossible += weights.IMM1;
  if (sIMM1 >= 2) {
    causes.push({
      questionId: "IMM1_proneToSickDuringTravel",
      selectedOption: answers.IMM1_proneToSickDuringTravel,
      severity: sIMM1,
      points: pointsIMM1,
      sentence: TRAVELER_CAUSE_SENTENCES.energy_recovery.IMM1_proneToSickDuringTravel.replace("{option}", answers.IMM1_proneToSickDuringTravel.toLowerCase()),
    });
  }
  
  // Modifiers
  if (travelTags.includes("upcoming_travel") && sIMM1 >= 3) {
    rawScore += 3;
  }
  if (travelTags.includes("cardiometabolic_dx") && sF2 >= 3) {
    rawScore += 3;
  }
  
  // Normalize to 0-100
  const normalizedScore = maxPossible > 0 ? Math.min(100, Math.round((rawScore / maxPossible) * 100)) : 0;
  
  // Determine band
  let band: TravelerMetricBand;
  if (normalizedScore < 40) {
    band = "GOOD";
  } else if (normalizedScore < 60) {
    band = "MODERATE";
  } else {
    band = "ELEVATED";
  }
  
  // Sort causes by points, filter s>=2, take top N
  causes.sort((a, b) => b.points - a.points);
  const filteredCauses = causes.filter(c => c.severity >= 2);
  const topN = band === "GOOD" ? 2 : band === "MODERATE" ? 3 : 4;
  const topCauses = filteredCauses.slice(0, topN);
  
  // Generate description
  const description = generateMetricDescription("energy_recovery", band, topCauses, travelTags);
  
  return {
    id: "energy_recovery",
    score: normalizedScore,
    band,
    travelTags: travelTags.filter(t => t === "upcoming_travel" || t === "long_sit" || t === "cardiometabolic_dx"),
    causes: topCauses,
    description,
  };
}

/**
 * Metric 4: Mobility & Physical Strain
 */
function calculateMobilityPhysical(answers: TravelerSurveyAnswers, travelTags: string[]): TravelerKeyMetricResult {
  const weights = {
    PF2: 25,
    PF1: 25,
    P1: 20,
    P2: 15,
    BG10: 15,
  };
  
  let rawScore = 0;
  let maxPossible = 0;
  const causes: TravelerCause[] = [];
  
  // PF2: Sitting causes stiffness
  const sPF2 = toSeverityTraveler("PF2_sittingCausesStiffness", answers.PF2_sittingCausesStiffness);
  const pointsPF2 = (sPF2 / 4) * weights.PF2;
  rawScore += pointsPF2;
  maxPossible += weights.PF2;
  if (sPF2 >= 2) {
    causes.push({
      questionId: "PF2_sittingCausesStiffness",
      selectedOption: answers.PF2_sittingCausesStiffness,
      severity: sPF2,
      points: pointsPF2,
      sentence: TRAVELER_CAUSE_SENTENCES.mobility_physical.PF2_sittingCausesStiffness.replace("{option}", answers.PF2_sittingCausesStiffness.toLowerCase()),
    });
  }
  
  // PF1: Difficulty stay active travel days
  const sPF1 = toSeverityTraveler("PF1_difficultyStayActiveTravelDays", answers.PF1_difficultyStayActiveTravelDays);
  const pointsPF1 = (sPF1 / 4) * weights.PF1;
  rawScore += pointsPF1;
  maxPossible += weights.PF1;
  if (sPF1 >= 2) {
    causes.push({
      questionId: "PF1_difficultyStayActiveTravelDays",
      selectedOption: answers.PF1_difficultyStayActiveTravelDays,
      severity: sPF1,
      points: pointsPF1,
      sentence: TRAVELER_CAUSE_SENTENCES.mobility_physical.PF1_difficultyStayActiveTravelDays.replace("{option}", answers.PF1_difficultyStayActiveTravelDays.toLowerCase()),
    });
  }
  
  // P1: Pain limits activities
  const sP1 = toSeverityTraveler("P1_painLimitsActivities", answers.P1_painLimitsActivities);
  const pointsP1 = (sP1 / 4) * weights.P1;
  rawScore += pointsP1;
  maxPossible += weights.P1;
  if (sP1 >= 2) {
    causes.push({
      questionId: "P1_painLimitsActivities",
      selectedOption: answers.P1_painLimitsActivities,
      severity: sP1,
      points: pointsP1,
      sentence: TRAVELER_CAUSE_SENTENCES.mobility_physical.P1_painLimitsActivities.replace("{option}", answers.P1_painLimitsActivities.toLowerCase()),
    });
  }
  
  // P2: Avoid movement due discomfort
  const sP2 = toSeverityTraveler("P2_avoidMovementDueDiscomfort", answers.P2_avoidMovementDueDiscomfort);
  const pointsP2 = (sP2 / 4) * weights.P2;
  rawScore += pointsP2;
  maxPossible += weights.P2;
  if (sP2 >= 2) {
    causes.push({
      questionId: "P2_avoidMovementDueDiscomfort",
      selectedOption: answers.P2_avoidMovementDueDiscomfort,
      severity: sP2,
      points: pointsP2,
      sentence: TRAVELER_CAUSE_SENTENCES.mobility_physical.P2_avoidMovementDueDiscomfort.replace("{option}", answers.P2_avoidMovementDueDiscomfort.toLowerCase()),
    });
  }
  
  // BG10: Sitting duration (convert to severity)
  const sBG10 = toSeverityTraveler("BG10_sittingDuration", answers.BG10_sittingDuration);
  const pointsBG10 = (sBG10 / 4) * weights.BG10;
  rawScore += pointsBG10;
  maxPossible += weights.BG10;
  if (sBG10 >= 2) {
    causes.push({
      questionId: "BG10_sittingDuration",
      selectedOption: answers.BG10_sittingDuration,
      severity: sBG10,
      points: pointsBG10,
      sentence: TRAVELER_CAUSE_SENTENCES.mobility_physical.BG10_sittingDuration.replace("{option}", answers.BG10_sittingDuration.toLowerCase()),
    });
  }
  
  // Modifiers
  if (travelTags.includes("long_sit")) {
    rawScore += 3;
  }
  if (travelTags.includes("cardiometabolic_dx") && travelTags.includes("long_sit")) {
    rawScore += 2;
  }
  
  // Normalize to 0-100
  const normalizedScore = maxPossible > 0 ? Math.min(100, Math.round((rawScore / maxPossible) * 100)) : 0;
  
  // Determine band
  let band: TravelerMetricBand;
  if (normalizedScore < 40) {
    band = "GOOD";
  } else if (normalizedScore < 60) {
    band = "MODERATE";
  } else {
    band = "POOR";
  }
  
  // Sort causes by points, filter s>=2, take top N
  causes.sort((a, b) => b.points - a.points);
  const filteredCauses = causes.filter(c => c.severity >= 2);
  const topN = band === "GOOD" ? 2 : band === "MODERATE" ? 3 : 4;
  const topCauses = filteredCauses.slice(0, topN);
  
  // Generate description
  const description = generateMetricDescription("mobility_physical", band, topCauses, travelTags);
  
  return {
    id: "mobility_physical",
    score: normalizedScore,
    band,
    travelTags: travelTags.filter(t => t === "upcoming_travel" || t === "long_sit" || t === "cardiometabolic_dx"),
    causes: topCauses,
    description,
  };
}

/**
 * Generate metric description from template
 */
function generateMetricDescription(
  metricId: TravelerKeyMetricResult["id"],
  band: TravelerMetricBand,
  causes: TravelerCause[],
  travelTags: string[]
): string {
  const causeTexts = causes.map(c => c.sentence);
  
  let description = "";
  
  if (metricId === "stress_load") {
    if (band === "LOW") {
      description = `Your stress load is within a supportive range. Main factors: ${causeTexts.join("; ")}.`;
    } else if (band === "MODERATE") {
      description = `Your stress load is mildly elevated. Biggest drivers: ${causeTexts.join("; ")}.`;
    } else {
      description = `Your stress load is high and can make travel recovery harder. Key drivers: ${causeTexts.join("; ")}.`;
    }
    if (travelTags.includes("upcoming_travel")) {
      description += " With upcoming travel, these drivers may feel stronger due to disrupted routines.";
    }
  } else if (metricId === "sleep_circadian") {
    if (band === "GOOD") {
      description = `Your sleep and circadian rhythm appear stable. Main factors: ${causeTexts.join("; ")}.`;
    } else if (band === "MODERATE") {
      description = `Your sleep shows some disruption. Key drivers: ${causeTexts.join("; ")}.`;
    } else {
      description = `Your sleep quality is poor and likely affecting recovery. Biggest drivers: ${causeTexts.join("; ")}.`;
    }
    if (travelTags.includes("upcoming_travel")) {
      description += " Travel-related sleep disruption can compound these patterns.";
    }
  } else if (metricId === "energy_recovery") {
    if (band === "GOOD") {
      description = `Your energy and recovery appear well-regulated. Main factors: ${causeTexts.join("; ")}.`;
    } else if (band === "MODERATE") {
      description = `Your energy shows some strain. Key drivers: ${causeTexts.join("; ")}.`;
    } else {
      description = `Your energy and recovery are significantly impacted. Biggest drivers: ${causeTexts.join("; ")}.`;
    }
    if (travelTags.includes("upcoming_travel")) {
      description += " Travel can further strain energy reserves if these patterns aren't addressed.";
    }
  } else if (metricId === "mobility_physical") {
    if (band === "GOOD") {
      description = `Your mobility and physical function appear stable. Main factors: ${causeTexts.join("; ")}.`;
    } else if (band === "MODERATE") {
      description = `Your mobility shows some limitations. Key drivers: ${causeTexts.join("; ")}.`;
    } else {
      description = `Your mobility and physical function are significantly limited. Biggest drivers: ${causeTexts.join("; ")}.`;
    }
    if (travelTags.includes("long_sit")) {
      description += " Extended sitting during travel can worsen these patterns.";
    }
  }
  
  return description;
}






