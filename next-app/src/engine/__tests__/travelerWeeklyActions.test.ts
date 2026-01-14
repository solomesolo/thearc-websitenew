import { describe, it, expect } from '@jest/globals';
import { generateTravelerWeeklyActions } from '../travelerWeeklyActions';
import { TravelerSurveyAnswers, TravelerKeyMetricResult } from '../types';

describe('Traveler Weekly Actions', () => {
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

  const createBaseMetrics = (): TravelerKeyMetricResult[] => [
    {
      id: "stress_load",
      score: 30,
      band: "LOW",
      travelTags: [],
      causes: [],
      description: "Low stress load.",
    },
    {
      id: "sleep_circadian",
      score: 35,
      band: "GOOD",
      travelTags: [],
      causes: [],
      description: "Good sleep quality.",
    },
    {
      id: "energy_recovery",
      score: 40,
      band: "MODERATE",
      travelTags: [],
      causes: [],
      description: "Moderate energy.",
    },
    {
      id: "mobility_physical",
      score: 25,
      band: "GOOD",
      travelTags: [],
      causes: [],
      description: "Good mobility.",
    },
  ];

  it('should generate sleep_circadian card when S4 >= Often', () => {
    const answers = createBaseAnswers();
    answers.S4_scheduleDisruptsSleep = "Often";
    
    const metrics = createBaseMetrics();
    const actions = generateTravelerWeeklyActions(answers, metrics);
    
    const sleepCard = actions.find(a => a.cardId === "sleep_circadian");
    expect(sleepCard).toBeDefined();
    expect(sleepCard?.bullets.length).toBeGreaterThan(0);
    expect(sleepCard?.priority).toBe("MED");
  });

  it('should generate movement_circulation card when long sitting', () => {
    const answers = createBaseAnswers();
    answers.BG10_sittingDuration = ">8 hours";
    
    const metrics = createBaseMetrics();
    const actions = generateTravelerWeeklyActions(answers, metrics);
    
    const movementCard = actions.find(a => a.cardId === "movement_circulation");
    expect(movementCard).toBeDefined();
    expect(movementCard?.bullets).toContain("Stand, stretch, or walk at least every 1–2 hours during long trips.");
  });

  it('should generate red_flags card when R1=Yes', () => {
    const answers = createBaseAnswers();
    answers.R1_chestBreathlessDizzy = "Yes";
    
    const metrics = createBaseMetrics();
    const actions = generateTravelerWeeklyActions(answers, metrics);
    
    const redFlagsCard = actions.find(a => a.cardId === "red_flags");
    expect(redFlagsCard).toBeDefined();
    expect(redFlagsCard?.priority).toBe("HIGH");
    expect(redFlagsCard?.bullets.length).toBeGreaterThan(0);
  });

  it('should prioritize HIGH when metric band is HIGH/POOR/ELEVATED', () => {
    const answers = createBaseAnswers();
    answers.ST1_overwhelmed = "Often";
    
    const metrics = createBaseMetrics();
    metrics.find(m => m.id === "stress_load")!.band = "HIGH";
    metrics.find(m => m.id === "stress_load")!.score = 70;
    
    const actions = generateTravelerWeeklyActions(answers, metrics);
    const stressCard = actions.find(a => a.cardId === "stress_regulation");
    
    expect(stressCard?.priority).toBe("HIGH");
  });

  it('should sort actions by priority (HIGH > MED > LOW)', () => {
    const answers = createBaseAnswers();
    answers.R1_chestBreathlessDizzy = "Yes"; // HIGH priority
    answers.S4_scheduleDisruptsSleep = "Sometimes"; // MED priority
    answers.L1_processedFoodsTravelDays = "Rarely"; // LOW priority
    
    const metrics = createBaseMetrics();
    const actions = generateTravelerWeeklyActions(answers, metrics);
    
    const priorities = actions.map(a => a.priority);
    const highIndex = priorities.indexOf("HIGH");
    const medIndex = priorities.indexOf("MED");
    const lowIndex = priorities.indexOf("LOW");
    
    if (highIndex !== -1 && medIndex !== -1) {
      expect(highIndex).toBeLessThan(medIndex);
    }
    if (medIndex !== -1 && lowIndex !== -1) {
      expect(medIndex).toBeLessThan(lowIndex);
    }
  });
});






