import { describe, it, expect } from '@jest/globals';
import { calculateTravelerKeyMetrics } from '../travelerKeyMetrics';
import { TravelerSurveyAnswers } from '../types';

describe('Traveler Key Metrics', () => {
  const createBaseAnswers = (): TravelerSurveyAnswers => ({
    BG1_age: 35,
    BG2_gender: "Female",
    BG3_heightCm: 165,
    BG4_weightKg: 70,
    BG5_noPeriod12mo: "Not applicable",
    BG6_hormoneTherapy: "No",
    BG7_dx: ["None of the above"],
    BG8_familyHx: ["None of the above"],
    BG9_upcomingTravel6w: "No",
    BG10_sittingDuration: "<2 hours",
    F1_wornOutAfternoon: "Never",
    F2_lowEnergyLimits: "Never",
    F3_refreshedOnWaking: "Very refreshed",
    S1_fallAsleepDifficulty: "Never",
    S2_wakeNightStayAwake: "Never",
    S3_bedtimeConsistency: "Very consistent",
    S4_scheduleDisruptsSleep: "Never",
    S5_poorSleepAffectsNextDay: "Never",
    S6_caffeineAfter14: "Never",
    ST1_overwhelmed: "Never",
    ST2_unableToRelax: "Never",
    M1_lowMood: "Never",
    M2_stressHardToFocus: "Never",
    P1_painLimitsActivities: "Never",
    P2_avoidMovementDueDiscomfort: "Never",
    PF1_difficultyStayActiveTravelDays: "Not difficult",
    PF2_sittingCausesStiffness: "Never",
    C1_loseTrack: "Never",
    C2_notSharpWhenTired: "Never",
    G1_digestiveDiscomfort: "Never",
    IMM1_proneToSickDuringTravel: "Never",
    G3_giIllnessPastYear: "No",
    L1_processedFoodsTravelDays: "Never",
    L2_20minMovement: "Almost always",
    N3_underHydratedWhileTraveling: "Never",
    SUP1_supplements: ["No"],
    SUP2_supplementCount: "0–1",
    SUP3_prescriptionMeds: "No",
    LAB1_lastGeneralBloodTest: "Never",
    LAB2_specificTests: [],
    R1_chestBreathlessDizzy: "No",
    R2_moodStressImpairsFunction: "No",
    R3_needsPromptEvaluation: "No",
  });

  it('should calculate all 4 metrics', () => {
    const answers = createBaseAnswers();
    const metrics = calculateTravelerKeyMetrics(answers);
    
    expect(metrics).toHaveLength(4);
    expect(metrics.map(m => m.id)).toEqual([
      "stress_load",
      "sleep_circadian",
      "energy_recovery",
      "mobility_physical",
    ]);
  });

  it('should calculate stress_load with upcoming travel modifier', () => {
    const answers = createBaseAnswers();
    answers.BG9_upcomingTravel6w = "Yes";
    answers.ST1_overwhelmed = "Often";
    
    const metrics = calculateTravelerKeyMetrics(answers);
    const stressMetric = metrics.find(m => m.id === "stress_load");
    
    expect(stressMetric).toBeDefined();
    expect(stressMetric?.travelTags).toContain("upcoming_travel");
    expect(stressMetric?.score).toBeGreaterThan(0);
  });

  it('should calculate sleep_circadian with travel disruption', () => {
    const answers = createBaseAnswers();
    answers.BG9_upcomingTravel6w = "Yes";
    answers.S4_scheduleDisruptsSleep = "Often";
    
    const metrics = calculateTravelerKeyMetrics(answers);
    const sleepMetric = metrics.find(m => m.id === "sleep_circadian");
    
    expect(sleepMetric).toBeDefined();
    expect(sleepMetric?.band).toBe("POOR");
    expect(sleepMetric?.causes.length).toBeGreaterThan(0);
  });

  it('should calculate energy_recovery with fatigue indicators', () => {
    const answers = createBaseAnswers();
    answers.F2_lowEnergyLimits = "Often";
    answers.F1_wornOutAfternoon = "Often";
    answers.F3_refreshedOnWaking = "Very unrefreshed";
    
    const metrics = calculateTravelerKeyMetrics(answers);
    const energyMetric = metrics.find(m => m.id === "energy_recovery");
    
    expect(energyMetric).toBeDefined();
    expect(energyMetric?.score).toBeGreaterThan(50);
    expect(energyMetric?.causes.length).toBeGreaterThan(0);
  });

  it('should calculate mobility_physical with long sitting', () => {
    const answers = createBaseAnswers();
    answers.BG10_sittingDuration = ">8 hours";
    answers.PF2_sittingCausesStiffness = "Often";
    
    const metrics = calculateTravelerKeyMetrics(answers);
    const mobilityMetric = metrics.find(m => m.id === "mobility_physical");
    
    expect(mobilityMetric).toBeDefined();
    expect(mobilityMetric?.travelTags).toContain("long_sit");
    expect(mobilityMetric?.score).toBeGreaterThan(40);
  });

  it('should include causes with severity >= 2', () => {
    const answers = createBaseAnswers();
    answers.ST1_overwhelmed = "Sometimes";
    answers.ST2_unableToRelax = "Often";
    
    const metrics = calculateTravelerKeyMetrics(answers);
    const stressMetric = metrics.find(m => m.id === "stress_load");
    
    expect(stressMetric?.causes.every(c => c.severity >= 2)).toBe(true);
  });

  it('should apply cardiometabolic_dx tag when conditions present', () => {
    const answers = createBaseAnswers();
    answers.BG7_dx = ["High blood pressure", "High cholesterol"];
    
    const metrics = calculateTravelerKeyMetrics(answers);
    const stressMetric = metrics.find(m => m.id === "stress_load");
    
    expect(stressMetric?.travelTags).toContain("cardiometabolic_dx");
  });
});






