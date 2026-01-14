/**
 * Test Data Scenarios for Traveler Questionnaire
 * 
 * Provides pre-filled answer sets for automated testing.
 * Use URL parameter ?test=SCENARIO_NAME to auto-fill.
 */

export type TestScenario = 
  | 'healthy'
  | 'high-risk'
  | 'moderate'
  | 'poor-sleep'
  | 'high-travel'
  | 'metabolic-issues'
  | 'stress-overload'
  | 'optimal';

export interface TestAnswers {
  [questionId: string]: any;
}

/**
 * Healthy Traveler - Good baseline, occasional travel, good habits
 */
export const healthyTraveler: TestAnswers = {
  // Demographics
  BG1: "35",
  BG2: "Female",
  BG3: "165",
  BG4: "65",
  BG5: ["None of the above"],
  BG6: ["None of the above"],
  
  // Travel
  T1: "Yes",
  T2: "Frequently (5–10 trips)",
  T3: "4–6 hours",
  T4: "1–3 hours",
  T5: [], // Empty array for regions
  
  // Energy
  E1: "Rarely",
  E2: "Rarely",
  E3: "Somewhat refreshed",
  E4: "Rarely",
  
  // Sleep
  S1: "Rarely",
  S2: "Rarely",
  S3: "Somewhat consistent",
  S4: "Rarely",
  S5: "Rarely",
  S6: "Sometimes (1–2×/week)",
  
  // Stress
  ST1: "Sometimes",
  ST2: "Sometimes",
  ST3: "Sometimes",
  ST4: "Rarely",
  
  // Movement
  M1: "5–6 days",
  M2: "≥3 days",
  M3: "Sometimes",
  M4: "Rarely",
  
  // Digestive
  G1: "Rarely",
  G2: "Sometimes",
  G3: "No",
  
  // Nutrition
  N1: "Sometimes",
  N2: "≥5 servings",
  N3: "Sometimes",
  
  // Supplements
  SUP1: ["No"],
  SUP2: "0–1",
  SUP3: "No",
  
  // Labs
  LAB1: "Within last year (normal)",
  LAB2: [
    "Blood glucose / HbA1c - Within last year normal",
    "Cholesterol / lipids - Within last year normal",
    "Inflammation (CRP) - Within last year normal"
  ],
  
  // Red Flags
  R1: "No",
  R2: "No",
  R3: "No",
};

/**
 * High Risk Traveler - Multiple health issues, frequent travel, poor habits
 */
export const highRiskTraveler: TestAnswers = {
  // Demographics
  BG1: "52",
  BG2: "Male",
  BG3: "180",
  BG4: "95",
  BG5: ["High blood pressure", "High cholesterol", "Prediabetes or diabetes"],
  BG6: ["Heart disease or stroke", "Diabetes"],
  
  // Travel
  T1: "Yes",
  T2: "Very frequently (>10 trips)",
  T3: ">8 hours",
  T4: ">6 hours",
  T5: ["South / Southeast Asia", "Africa"],
  
  // Energy
  E1: "Often",
  E2: "Often",
  E3: "Somewhat unrefreshed",
  E4: "Sometimes",
  
  // Sleep
  S1: "Almost always",
  S2: "Often",
  S3: "Very inconsistent",
  S4: "Often",
  S5: "Often",
  S6: "Multiple servings daily",
  
  // Stress
  ST1: "Often",
  ST2: "Often",
  ST3: "Often",
  ST4: "Sometimes",
  
  // Movement
  M1: "1–2 days",
  M2: "0 days",
  M3: "Often",
  M4: "Sometimes",
  
  // Digestive
  G1: "Sometimes",
  G2: "Often",
  G3: "Yes, more than once",
  
  // Nutrition
  N1: "Almost always",
  N2: "<1 serving",
  N3: "Often",
  
  // Supplements
  SUP1: ["No"],
  SUP2: "0–1",
  SUP3: "Yes",
  
  // Labs
  LAB1: ">2 years ago",
  LAB2: [
    "Blood glucose / HbA1c - Within last year abnormal",
    "Cholesterol / lipids - Within last year abnormal"
  ],
  
  // Red Flags
  R1: "No",
  R2: "Yes",
  R3: "No",
};

/**
 * Moderate Risk Traveler - Some issues, moderate travel
 */
export const moderateTraveler: TestAnswers = {
  // Demographics
  BG1: "42",
  BG2: "Female",
  BG3: "170",
  BG4: "75",
  BG5: ["High cholesterol"],
  BG6: ["Diabetes"],
  
  // Travel
  T1: "Yes",
  T2: "Frequently (5–10 trips)",
  T3: "6–8 hours",
  T4: "4–6 hours",
  T5: ["Europe", "North America"],
  
  // Energy
  E1: "Sometimes",
  E2: "Sometimes",
  E3: "Neutral",
  E4: "Rarely",
  
  // Sleep
  S1: "Sometimes",
  S2: "Sometimes",
  S3: "Somewhat inconsistent",
  S4: "Sometimes",
  S5: "Sometimes",
  S6: "Often (most days)",
  
  // Stress
  ST1: "Sometimes",
  ST2: "Sometimes",
  ST3: "Sometimes",
  ST4: "Sometimes",
  
  // Movement
  M1: "3–4 days",
  M2: "2 days",
  M3: "Sometimes",
  M4: "Rarely",
  
  // Digestive
  G1: "Sometimes",
  G2: "Sometimes",
  G3: "Yes, once",
  
  // Nutrition
  N1: "Sometimes",
  N2: "3–4 servings",
  N3: "Sometimes",
  
  // Supplements
  SUP1: ["Yes - Vitamin D", "Yes - Magnesium"],
  SUP2: "2–3",
  SUP3: "No",
  
  // Labs
  LAB1: "Within last year (normal)",
  LAB2: [
    "Cholesterol / lipids - Within last year abnormal",
    "Inflammation (CRP) - Within last year normal"
  ],
  
  // Red Flags
  R1: "No",
  R2: "No",
  R3: "No",
};

/**
 * Poor Sleep Traveler - Good health but severe sleep issues
 */
export const poorSleepTraveler: TestAnswers = {
  // Demographics
  BG1: "38",
  BG2: "Female",
  BG3: "160",
  BG4: "62",
  BG5: ["None of the above"],
  BG6: ["None of the above"],
  
  // Travel
  T1: "Yes",
  T2: "Frequently (5–10 trips)",
  T3: "4–6 hours",
  T4: ">6 hours",
  T5: ["East Asia", "Oceania"],
  
  // Energy
  E1: "Sometimes",
  E2: "Sometimes",
  E3: "Somewhat unrefreshed",
  E4: "Sometimes",
  
  // Sleep - POOR
  S1: "Almost always",
  S2: "Often",
  S3: "Very inconsistent",
  S4: "Often",
  S5: "Often",
  S6: "Multiple servings daily",
  
  // Stress
  ST1: "Sometimes",
  ST2: "Sometimes",
  ST3: "Often",
  ST4: "Sometimes",
  
  // Movement
  M1: "3–4 days",
  M2: "1 day",
  M3: "Sometimes",
  M4: "Rarely",
  
  // Digestive
  G1: "Rarely",
  G2: "Sometimes",
  G3: "No",
  
  // Nutrition
  N1: "Rarely",
  N2: "≥5 servings",
  N3: "Sometimes",
  
  // Supplements
  SUP1: ["Yes - Magnesium"],
  SUP2: "2–3",
  SUP3: "No",
  
  // Labs
  LAB1: "Within last year (normal)",
  LAB2: [
    "Blood glucose / HbA1c - Within last year normal",
    "Cholesterol / lipids - Within last year normal"
  ],
  
  // Red Flags
  R1: "No",
  R2: "Yes",
  R3: "No",
};

/**
 * High Travel Frequency - Frequent traveler with good baseline
 */
export const highTravelTraveler: TestAnswers = {
  // Demographics
  BG1: "40",
  BG2: "Male",
  BG3: "175",
  BG4: "78",
  BG5: ["None of the above"],
  BG6: ["None of the above"],
  
  // Travel - HIGH FREQUENCY
  T1: "Yes",
  T2: "Very frequently (>10 trips)",
  T3: "6–8 hours",
  T4: ">6 hours",
  T5: ["Europe", "North America", "East Asia"],
  
  // Energy
  E1: "Sometimes",
  E2: "Rarely",
  E3: "Somewhat refreshed",
  E4: "Rarely",
  
  // Sleep
  S1: "Sometimes",
  S2: "Sometimes",
  S3: "Somewhat inconsistent",
  S4: "Sometimes",
  S5: "Sometimes",
  S6: "Often (most days)",
  
  // Stress
  ST1: "Sometimes",
  ST2: "Sometimes",
  ST3: "Sometimes",
  ST4: "Rarely",
  
  // Movement
  M1: "3–4 days",
  M2: "2 days",
  M3: "Sometimes",
  M4: "Rarely",
  
  // Digestive
  G1: "Sometimes",
  G2: "Sometimes",
  G3: "Yes, once",
  
  // Nutrition
  N1: "Sometimes",
  N2: "3–4 servings",
  N3: "Sometimes",
  
  // Supplements
  SUP1: ["Yes - Vitamin D"],
  SUP2: "2–3",
  SUP3: "No",
  
  // Labs
  LAB1: "Within last year (normal)",
  LAB2: [
    "Blood glucose / HbA1c - Within last year normal",
    "Inflammation (CRP) - Within last year normal"
  ],
  
  // Red Flags
  R1: "No",
  R2: "No",
  R3: "No",
};

/**
 * Metabolic Issues - Focus on blood sugar and metabolism problems
 */
export const metabolicIssuesTraveler: TestAnswers = {
  // Demographics
  BG1: "48",
  BG2: "Female",
  BG3: "168",
  BG4: "82",
  BG5: ["Prediabetes or diabetes", "High cholesterol"],
  BG6: ["Diabetes"],
  
  // Travel
  T1: "Yes",
  T2: "Frequently (5–10 trips)",
  T3: ">8 hours",
  T4: "1–3 hours",
  T5: [],
  
  // Energy
  E1: "Sometimes",
  E2: "Sometimes",
  E3: "Somewhat unrefreshed",
  E4: "Sometimes",
  
  // Sleep
  S1: "Often",
  S2: "Sometimes",
  S3: "Somewhat inconsistent",
  S4: "Sometimes",
  S5: "Sometimes",
  S6: "Often (most days)",
  
  // Stress
  ST1: "Sometimes",
  ST2: "Sometimes",
  ST3: "Sometimes",
  ST4: "Rarely",
  
  // Movement
  M1: "1–2 days",
  M2: "0 days",
  M3: "Often",
  M4: "Sometimes",
  
  // Digestive
  G1: "Sometimes",
  G2: "Rarely",
  G3: "No",
  
  // Nutrition
  N1: "Often",
  N2: "1–2 servings",
  N3: "Often",
  
  // Supplements
  SUP1: ["No"],
  SUP2: "0–1",
  SUP3: "Yes",
  
  // Labs
  LAB1: "Within last year (normal)",
  LAB2: [
    "Blood glucose / HbA1c - Within last year abnormal",
    "Cholesterol / lipids - Within last year abnormal"
  ],
  
  // Red Flags
  R1: "No",
  R2: "No",
  R3: "No",
};

/**
 * Stress Overload - High stress, good physical health
 */
export const stressOverloadTraveler: TestAnswers = {
  // Demographics
  BG1: "36",
  BG2: "Female",
  BG3: "162",
  BG4: "58",
  BG5: ["Anxiety or depression"],
  BG6: ["None of the above"],
  
  // Travel
  T1: "Yes",
  T2: "Frequently (5–10 trips)",
  T3: "4–6 hours",
  T4: "4–6 hours",
  T5: ["Europe"],
  
  // Energy
  E1: "Sometimes",
  E2: "Sometimes",
  E3: "Somewhat refreshed",
  E4: "Rarely",
  
  // Sleep
  S1: "Often",
  S2: "Sometimes",
  S3: "Somewhat inconsistent",
  S4: "Sometimes",
  S5: "Often",
  S6: "Often (most days)",
  
  // Stress - HIGH STRESS
  ST1: "Often",
  ST2: "Often",
  ST3: "Often",
  ST4: "Sometimes",
  
  // Movement
  M1: "3–4 days",
  M2: "1 day",
  M3: "Sometimes",
  M4: "Rarely",
  
  // Digestive
  G1: "Sometimes",
  G2: "Rarely",
  G3: "No",
  
  // Nutrition
  N1: "Sometimes",
  N2: "3–4 servings",
  N3: "Sometimes",
  
  // Supplements
  SUP1: ["Yes - Magnesium", "Yes - Herbal supplements (e.g. ashwagandha, turmeric)"],
  SUP2: "2–3",
  SUP3: "Yes",
  
  // Labs
  LAB1: "Within last year (normal)",
  LAB2: [
    "Blood glucose / HbA1c - Within last year normal",
    "Inflammation (CRP) - Within last year normal"
  ],
  
  // Red Flags
  R1: "No",
  R2: "Yes",
  R3: "No",
};

/**
 * Optimal Traveler - Best case scenario
 */
export const optimalTraveler: TestAnswers = {
  // Demographics
  BG1: "32",
  BG2: "Female",
  BG3: "170",
  BG4: "65",
  BG5: ["None of the above"],
  BG6: ["None of the above"],
  
  // Travel
  T1: "Yes",
  T2: "Occasionally (2–4 trips)",
  T3: "<2 hours",
  T4: "1–3 hours",
  T5: [],
  
  // Energy
  E1: "Never",
  E2: "Never",
  E3: "Very refreshed",
  E4: "Never",
  
  // Sleep
  S1: "Never",
  S2: "Never",
  S3: "Very consistent",
  S4: "Never",
  S5: "Never",
  S6: "Rarely",
  
  // Stress
  ST1: "Not at all",
  ST2: "Not at all",
  ST3: "Never",
  ST4: "Never",
  
  // Movement
  M1: "Daily",
  M2: "≥3 days",
  M3: "Never",
  M4: "Never",
  
  // Digestive
  G1: "Never",
  G2: "Never",
  G3: "No",
  
  // Nutrition
  N1: "Never",
  N2: "≥5 servings",
  N3: "Never",
  
  // Supplements
  SUP1: ["Yes - Vitamin D", "Yes - Omega-3 / Fish oil"],
  SUP2: "2–3",
  SUP3: "No",
  
  // Labs
  LAB1: "Within last year (normal)",
  LAB2: [
    "Blood glucose / HbA1c - Within last year normal",
    "Cholesterol / lipids - Within last year normal",
    "Inflammation (CRP) - Within last year normal"
  ],
  
  // Red Flags
  R1: "No",
  R2: "No",
  R3: "No",
};

/**
 * Get test scenario answers by name
 */
export function getTestScenario(scenario: TestScenario): TestAnswers {
  const scenarios: Record<TestScenario, TestAnswers> = {
    healthy: healthyTraveler,
    'high-risk': highRiskTraveler,
    moderate: moderateTraveler,
    'poor-sleep': poorSleepTraveler,
    'high-travel': highTravelTraveler,
    'metabolic-issues': metabolicIssuesTraveler,
    'stress-overload': stressOverloadTraveler,
    optimal: optimalTraveler,
  };
  
  return scenarios[scenario] || healthyTraveler;
}

/**
 * Get all available scenario names
 */
export function getAvailableScenarios(): TestScenario[] {
  return [
    'healthy',
    'high-risk',
    'moderate',
    'poor-sleep',
    'high-travel',
    'metabolic-issues',
    'stress-overload',
    'optimal',
  ];
}






