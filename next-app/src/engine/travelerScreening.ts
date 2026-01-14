import { TravelerSurveyAnswers, TravelerKeyMetricResult } from './types';
import { toSeverityTraveler } from './travelerMappings';

/**
 * Screening bundle definition
 */
export type ScreeningBundle = {
  bundleId: string;
  title: string;
  month: 1 | 2 | 3;
  biomarkers: string[];
  triggeredBy: string[];
  strengthScore: number;
};

/**
 * Calculate BMI from height and weight
 */
function calculateBMI(heightCm?: number, weightKg?: number): number | undefined {
  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) return undefined;
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

/**
 * Derive screening risk flags from answers and metrics
 */
export function deriveTravelerRiskFlags(
  answers: TravelerSurveyAnswers,
  keyMetrics: TravelerKeyMetricResult[]
): {
  poor_sleep_flag: boolean;
  high_stress_flag: boolean;
  metabolic_risk_flag: boolean;
  cardiometabolic_risk_flag: boolean;
  immune_vulnerability_flag: boolean;
  gut_workup_indicated_flag: boolean;
  travel_strain_flag: boolean;
  red_flag_burden_flag: boolean;
} {
  const sleepMetric = keyMetrics.find(m => m.id === "sleep_circadian");
  const stressMetric = keyMetrics.find(m => m.id === "stress_load");
  const energyMetric = keyMetrics.find(m => m.id === "energy_recovery");
  const mobilityMetric = keyMetrics.find(m => m.id === "mobility_physical");
  
  const sS1 = toSeverityTraveler("S1_fallAsleepDifficulty", answers.S1_fallAsleepDifficulty);
  const sS2 = toSeverityTraveler("S2_wakeNightStayAwake", answers.S2_wakeNightStayAwake);
  const sS4 = toSeverityTraveler("S4_scheduleDisruptsSleep", answers.S4_scheduleDisruptsSleep);
  
  const sST1 = toSeverityTraveler("ST1_overwhelmed", answers.ST1_overwhelmed);
  const sST2 = toSeverityTraveler("ST2_unableToRelax", answers.ST2_unableToRelax);
  
  const sL2 = toSeverityTraveler("L2_20minMovement", answers.L2_20minMovement);
  const sL1 = toSeverityTraveler("L1_processedFoodsTravelDays", answers.L1_processedFoodsTravelDays);
  const sG1 = toSeverityTraveler("G1_digestiveDiscomfort", answers.G1_digestiveDiscomfort);
  const sIMM1 = toSeverityTraveler("IMM1_proneToSickDuringTravel", answers.IMM1_proneToSickDuringTravel);
  
  const bmi = calculateBMI(answers.BG3_heightCm, answers.BG4_weightKg);
  
  // Poor sleep flag
  const poor_sleep_flag = 
    sS1 >= 3 ||
    sS2 >= 3 ||
    sS4 >= 3 ||
    (sleepMetric && sleepMetric.score >= 60);
  
  // High stress flag
  const high_stress_flag =
    sST1 >= 3 ||
    sST2 >= 3 ||
    (stressMetric && stressMetric.score >= 60);
  
  // Metabolic risk flag
  const metabolic_risk_flag =
    (bmi !== undefined && bmi >= 27) ||
    answers.BG7_dx.includes("High blood pressure") ||
    answers.BG7_dx.includes("High cholesterol") ||
    answers.BG7_dx.includes("Prediabetes or diabetes") ||
    sL2 >= 3; // Low movement (reverse-coded)
  
  // Cardiometabolic risk flag
  const cardiometabolic_risk_flag =
    metabolic_risk_flag ||
    ((stressMetric && stressMetric.score >= 40) && (mobilityMetric && mobilityMetric.score >= 50));
  
  // Immune vulnerability flag
  const immune_vulnerability_flag = sIMM1 >= 3;
  
  // Gut workup indicated flag
  const gut_workup_indicated_flag =
    sG1 >= 3 ||
    ((stressMetric && stressMetric.score >= 60) && sIMM1 >= 3);
  
  // Travel strain flag
  const travel_strain_flag =
    (answers.BG9_upcomingTravel6w === "Yes" && sleepMetric && sleepMetric.score >= 50);
  
  // Red flag burden flag
  const red_flag_burden_flag =
    answers.R1_chestBreathlessDizzy === "Yes" ||
    answers.R3_needsPromptEvaluation === "Yes";
  
  return {
    poor_sleep_flag,
    high_stress_flag,
    metabolic_risk_flag,
    cardiometabolic_risk_flag,
    immune_vulnerability_flag,
    gut_workup_indicated_flag,
    travel_strain_flag,
    red_flag_burden_flag,
  };
}

/**
 * Generate screening recommendations based on risk flags and metrics
 */
export function generateTravelerScreenings(
  answers: TravelerSurveyAnswers,
  keyMetrics: TravelerKeyMetricResult[],
  riskFlags: ReturnType<typeof deriveTravelerRiskFlags>
): ScreeningBundle[] {
  const screenings: ScreeningBundle[] = [];
  const bmi = calculateBMI(answers.BG3_heightCm, answers.BG4_weightKg);
  
  const stressMetric = keyMetrics.find(m => m.id === "stress_load");
  const sleepMetric = keyMetrics.find(m => m.id === "sleep_circadian");
  const energyMetric = keyMetrics.find(m => m.id === "energy_recovery");
  const mobilityMetric = keyMetrics.find(m => m.id === "mobility_physical");
  
  const sL1 = toSeverityTraveler("L1_processedFoodsTravelDays", answers.L1_processedFoodsTravelDays);
  const sL2 = toSeverityTraveler("L2_20minMovement", answers.L2_20minMovement);
  const sF1 = toSeverityTraveler("F1_wornOutAfternoon", answers.F1_wornOutAfternoon);
  const sF2 = toSeverityTraveler("F2_lowEnergyLimits", answers.F2_lowEnergyLimits);
  const sM1 = toSeverityTraveler("M1_lowMood", answers.M1_lowMood);
  
  // 1. METABOLIC PANEL (Month 1)
  const metabolicTriggers = [];
  if (riskFlags.cardiometabolic_risk_flag) metabolicTriggers.push("cardiometabolic_risk_flag");
  if (stressMetric && stressMetric.score >= 60) metabolicTriggers.push("metabolic_composite_high");
  if (
    (bmi !== undefined && bmi >= 27) ||
    answers.BG7_dx.some(d => ["High blood pressure", "High cholesterol", "Prediabetes or diabetes"].includes(d)) ||
    answers.BG8_familyHx.some(h => ["Heart disease or stroke", "Diabetes"].includes(h)) ||
    sL1 >= 3 ||
    sL2 >= 3
  ) {
    const triggerCount = [
      bmi !== undefined && bmi >= 27,
      answers.BG7_dx.some(d => ["High blood pressure", "High cholesterol", "Prediabetes or diabetes"].includes(d)),
      answers.BG8_familyHx.some(h => ["Heart disease or stroke", "Diabetes"].includes(h)),
      sL1 >= 3,
      sL2 >= 3,
    ].filter(Boolean).length;
    
    if (triggerCount >= 2 || riskFlags.cardiometabolic_risk_flag || (stressMetric && stressMetric.score >= 60)) {
      screenings.push({
        bundleId: "metabolic_panel",
        title: "Comprehensive Metabolic Panel",
        month: 1,
        biomarkers: [
          "Fasting glucose",
          "HbA1c",
          "Fasting insulin",
          "HOMA-IR",
          "Total cholesterol",
          "LDL-C",
          "HDL-C",
          "Triglycerides",
          "Non-HDL-C",
          "ApoB",
        ],
        triggeredBy: metabolicTriggers,
        strengthScore: triggerCount >= 3 ? 3 : triggerCount >= 2 ? 2 : 1,
      });
    }
  }
  
  // 2. LIVER & KIDNEY (Month 1) - if metabolic panel triggered
  if (screenings.some(s => s.bundleId === "metabolic_panel")) {
    if (stressMetric && stressMetric.score >= 60 || (bmi !== undefined && bmi >= 30) || riskFlags.cardiometabolic_risk_flag) {
      const existing = screenings.find(s => s.bundleId === "metabolic_panel");
      if (existing) {
        existing.biomarkers.push("ALT", "AST", "GGT", "Creatinine", "eGFR");
      }
    }
  }
  
  // 3. VITAMIN D (Month 1)
  const vitDTriggers = [];
  if (stressMetric && stressMetric.score >= 60) vitDTriggers.push("nutrition_composite_high");
  if (riskFlags.immune_vulnerability_flag) vitDTriggers.push("immune_vulnerability_flag");
  if ((sleepMetric && sleepMetric.score >= 60) && (energyMetric && energyMetric.score >= 60)) {
    vitDTriggers.push("sleep_and_energy_high");
  }
  if (answers.BG1_age && answers.BG1_age >= 50) vitDTriggers.push("age_50_plus");
  
  if (vitDTriggers.length > 0) {
    screenings.push({
      bundleId: "vitamin_d",
      title: "Vitamin D Status",
      month: 1,
      biomarkers: ["25-OH Vitamin D"],
      triggeredBy: vitDTriggers,
      strengthScore: vitDTriggers.length >= 2 ? 2 : 1,
    });
  }
  
  // 4. B-VITAMINS (Month 2)
  const bVitaminTriggers = [];
  if (stressMetric && stressMetric.score >= 60) bVitaminTriggers.push("nutrition_composite_high");
  if (sF1 >= 3 || sF2 >= 3) bVitaminTriggers.push("fatigue_often");
  if (energyMetric && energyMetric.score >= 60) bVitaminTriggers.push("cognitive_strain_high");
  
  if (bVitaminTriggers.length > 0) {
    screenings.push({
      bundleId: "nutrient_status",
      title: "B-Vitamin Status",
      month: 2,
      biomarkers: ["Vitamin B12", "Folate", "Homocysteine"],
      triggeredBy: bVitaminTriggers,
      strengthScore: bVitaminTriggers.length >= 2 ? 2 : 1,
    });
  }
  
  // 5. IRON STATUS (Month 2)
  if ((sF1 >= 3 || sF2 >= 3) && (riskFlags.immune_vulnerability_flag || sL1 >= 3)) {
    const existing = screenings.find(s => s.bundleId === "nutrient_status" && s.month === 2);
    if (existing) {
      existing.biomarkers.push("Ferritin", "Serum iron", "Transferrin saturation");
    } else {
      screenings.push({
        bundleId: "nutrient_status",
        title: "Iron Status",
        month: 2,
        biomarkers: ["Ferritin", "Serum iron", "Transferrin saturation"],
        triggeredBy: ["fatigue_often", "immune_or_processed_food"],
        strengthScore: 2,
      });
    }
  }
  
  // 6. MAGNESIUM (Month 2)
  if (riskFlags.poor_sleep_flag || riskFlags.high_stress_flag || (mobilityMetric && mobilityMetric.score >= 60)) {
    const existing = screenings.find(s => s.bundleId === "nutrient_status" && s.month === 2);
    if (existing) {
      existing.biomarkers.push("Serum magnesium", "RBC magnesium");
    } else {
      screenings.push({
        bundleId: "nutrient_status",
        title: "Magnesium Status",
        month: 2,
        biomarkers: ["Serum magnesium", "RBC magnesium"],
        triggeredBy: ["poor_sleep_flag", "high_stress_flag", "mobility_high"].filter((_, i, arr) => {
          return (riskFlags.poor_sleep_flag && i === 0) || (riskFlags.high_stress_flag && i === 1) || ((mobilityMetric && mobilityMetric.score >= 60) && i === 2);
        }),
        strengthScore: 2,
      });
    }
  }
  
  // 7. THYROID PANEL (Month 2)
  const thyroidTriggers = [];
  if (answers.BG7_dx.includes("Thyroid condition")) thyroidTriggers.push("thyroid_dx");
  if ((sF1 >= 3 || sF2 >= 3) && sM1 >= 3) thyroidTriggers.push("fatigue_and_low_mood");
  if ((sF1 >= 3 || sF2 >= 3) && riskFlags.poor_sleep_flag && sL2 >= 3) {
    thyroidTriggers.push("fatigue_sleep_low_activity");
  }
  
  if (thyroidTriggers.length > 0) {
    screenings.push({
      bundleId: "thyroid_panel",
      title: "Thyroid Function Panel",
      month: 2,
      biomarkers: ["TSH", "Free T4", "Free T3", "Anti-TPO"],
      triggeredBy: thyroidTriggers,
      strengthScore: thyroidTriggers.length >= 2 ? 2 : 1,
    });
  }
  
  // 8. CORTISOL / HPA AXIS (Month 2)
  if (riskFlags.high_stress_flag && riskFlags.poor_sleep_flag && riskFlags.travel_strain_flag) {
    screenings.push({
      bundleId: "cortisol_rhythm",
      title: "Cortisol Rhythm Assessment",
      month: 2,
      biomarkers: ["AM cortisol", "PM cortisol", "Diurnal cortisol curve"],
      triggeredBy: ["high_stress_flag", "poor_sleep_flag", "travel_strain_flag"],
      strengthScore: 3,
    });
  }
  
  // 9. GUT HEALTH (Month 3)
  if (riskFlags.gut_workup_indicated_flag) {
    screenings.push({
      bundleId: "gut_health",
      title: "Gut Health Assessment",
      month: 3,
      biomarkers: ["Stool microbiome", "Calprotectin", "Zonulin", "Fecal occult blood"],
      triggeredBy: ["gut_workup_indicated_flag"],
      strengthScore: 2,
    });
  }
  
  // 10. INFLAMMATION (add to nutrient_status if red flags + pain)
  const sP1 = toSeverityTraveler("P1_painLimitsActivities", answers.P1_painLimitsActivities);
  if (riskFlags.red_flag_burden_flag && sP1 >= 3) {
    const existing = screenings.find(s => s.bundleId === "nutrient_status");
    if (existing) {
      existing.biomarkers.push("hs-CRP", "ESR", "Fibrinogen");
    }
  }
  
  // Deduplicate and merge bundles with same bundleId
  const merged: ScreeningBundle[] = [];
  const bundleMap = new Map<string, ScreeningBundle>();
  
  for (const screening of screenings) {
    const existing = bundleMap.get(screening.bundleId);
    if (existing) {
      // Merge biomarkers
      const combinedBiomarkers = [...new Set([...existing.biomarkers, ...screening.biomarkers])];
      const combinedTriggers = [...new Set([...existing.triggeredBy, ...screening.triggeredBy])];
      existing.biomarkers = combinedBiomarkers;
      existing.triggeredBy = combinedTriggers;
      existing.strengthScore = Math.max(existing.strengthScore, screening.strengthScore);
    } else {
      bundleMap.set(screening.bundleId, { ...screening });
    }
  }
  
  return Array.from(bundleMap.values());
}






