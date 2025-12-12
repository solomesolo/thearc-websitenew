/**
 * Women in Menopause Questionnaire Scoring System
 * 
 * Implements deterministic scoring logic for the women's questionnaire
 * Based on the provided clinical calculation framework
 */

export interface QuestionnaireAnswers {
  [questionId: string]: any;
}

export interface Demographics {
  age?: string;
  height?: string;
  weight?: string;
  menstrual_status?: string;
  hrt_use?: string;
  diagnoses?: string[];
}

export interface CalculatedScores {
  // Section scores (0-100)
  nutrition_risk_score: number;
  supplement_gap_score: number;
  movement_recovery_gap_score: number;
  screening_gap_score: number;
  environment_risk_score: number;
  red_flag_burden_score: number;
  
  // Key metrics (0-100)
  stress_load_score: number;
  cortisol_regulation_score: number;
  sleep_quality_score: number;
  cognitive_recovery_score: number;
  
  // Derived values
  bmi?: number;
  postmenopausal: boolean;
  surgical_menopause: boolean;
  on_estrogen_or_combined: boolean;
  
  // Clinical flags
  metabolic_risk_flag: boolean;
  cardiometabolic_risk_flag: boolean;
  high_inflammation_risk_flag: boolean;
  poor_sleep_flag: boolean;
  high_stress_flag: boolean;
  cognitive_strain_flag: boolean;
  incomplete_basic_labs_flag: boolean;
  cortisol_testing_indicated_flag: boolean;
  vitD_testing_indicated_flag: boolean;
  glucose_testing_indicated_flag: boolean;
  lipids_testing_indicated_flag: boolean;
  thyroid_testing_indicated_flag: boolean;
  gut_workup_indicated_flag: boolean;
  
  // Raw item scores for reference
  rawScores: Record<string, number>;
}

/**
 * Extract numeric value from answer
 */
function getNumericValue(answer: any): number {
  if (typeof answer === 'number') return answer;
  if (typeof answer === 'string') {
    const num = parseInt(answer, 10);
    if (!isNaN(num)) return num;
  }
  return 0;
}

/**
 * Calculate BMI from height and weight
 */
function calculateBMI(height: string, weight: string): number | undefined {
  if (!height || !weight) return undefined;
  
  const heightCm = parseFloat(height.replace(/[^0-9.]/g, ''));
  const weightKg = parseFloat(weight.replace(/[^0-9.]/g, ''));
  
  if (isNaN(heightCm) || isNaN(weightKg) || heightCm === 0) return undefined;
  
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

/**
 * Parse age from answer
 */
function parseAge(ageAnswer: string): number | undefined {
  if (!ageAnswer) return undefined;
  const age = parseInt(ageAnswer.replace(/[^0-9]/g, ''), 10);
  return isNaN(age) ? undefined : age;
}

/**
 * Calculate all scores and flags from questionnaire answers
 */
export function calculateWomenQuestionnaireScores(
  answers: QuestionnaireAnswers,
  demographics: Demographics
): CalculatedScores {
  // Extract raw scores
  const rawScores: Record<string, number> = {};
  
  // Section 0 - Basic Info
  const age = parseAge(demographics.age || answers['0.1'] || '');
  
  // Parse height and weight - handle both old format (0.2 combined) and new format (0.2_h, 0.2_w separate)
  let height = demographics.height || answers['0.2_h'] || answers['0.2_height'] || '';
  let weight = demographics.weight || answers['0.2_w'] || answers['0.2_weight'] || '';
  
  // Fallback to old combined format if new format not present
  if (!height || !weight) {
    const heightWeightStr = answers['0.2'] || '';
    const heightWeightParts = heightWeightStr.split(/[,\s]+/).filter(p => p.trim());
    height = height || heightWeightParts[0] || '';
    weight = weight || heightWeightParts[1] || '';
  }
  const menstrual_status = demographics.menstrual_status || answers['0.3'] || '';
  const hrt_use = demographics.hrt_use || answers['0.4'] || '';
  const diagnoses = demographics.diagnoses || (Array.isArray(answers['0.5']) ? answers['0.5'] : []);
  
  // Calculate BMI
  const bmi = calculateBMI(height, weight);
  
  // Menopause context
  const postmenopausal = menstrual_status === 'No period 12+ months';
  const surgical_menopause = menstrual_status === 'Hysterectomy';
  const on_estrogen_or_combined = ['Estrogen', 'Combined'].includes(hrt_use);
  
  // Extract all question scores (0-4 scale)
  for (let i = 1; i <= 7; i++) {
    for (let j = 1; j <= 8; j++) {
      const qId = `${i}.${j}`;
      if (answers[qId] !== undefined) {
        rawScores[qId] = getNumericValue(answers[qId]);
      }
    }
  }
  
  // Section 1 - Nutrition (1.1-1.5)
  const q1_1 = getNumericValue(answers['1.1']); // processed foods
  const q1_2 = getNumericValue(answers['1.2']); // omega-3 foods
  const q1_3 = getNumericValue(answers['1.3']); // caffeine after 14:00
  const q1_4 = getNumericValue(answers['1.4']); // vegetables
  const q1_5 = getNumericValue(answers['1.5']); // bloating/sluggish
  
  const nutrition_raw = 
    (q1_1 * 1.5) +           // processed foods - heavy weight
    (q1_3 * 1.0) +           // late caffeine
    (q1_5 * 1.25) +          // gut symptoms
    ((4 - q1_2) * 1.25) +    // low omega-3 (reverse scored)
    ((4 - q1_4) * 1.0);      // low vegetables (reverse scored)
  
  const max_nutrition_raw = (4 * 1.5) + (4 * 1.0) + (4 * 1.25) + (4 * 1.25) + (4 * 1.0);
  const nutrition_risk_score = (nutrition_raw / max_nutrition_raw) * 100;
  
  // Section 2 - Supplements (2.1-2.3)
  const q2_1 = getNumericValue(answers['2.1']); // Vitamin D
  const q2_2 = getNumericValue(answers['2.2']); // Magnesium
  const q2_3 = getNumericValue(answers['2.3']); // Omega-3
  
  const supplement_raw = 
    (4 - q2_1) +  // Vit D gap
    (4 - q2_2) +  // Magnesium gap
    (4 - q2_3);   // Omega-3 gap
  
  const max_supplement_raw = 12;
  const supplement_gap_score = (supplement_raw / max_supplement_raw) * 100;
  
  // Section 3 - Movement & Recovery (3.1-3.4)
  const q3_1 = getNumericValue(answers['3.1']); // exercise days
  const q3_2 = getNumericValue(answers['3.2']); // strength sessions
  const q3_3 = getNumericValue(answers['3.3']); // movement breaks
  const q3_4 = getNumericValue(answers['3.4']); // evening stretching
  
  const movement_raw = 
    ((4 - q3_1) * 1.5) +   // lack of exercise
    ((4 - q3_2) * 1.5) +   // lack of strength
    ((4 - q3_3) * 1.0) +   // lack of breaks
    ((4 - q3_4) * 1.0);    // lack of stretching
  
  const max_movement_raw = (4 * 1.5) + (4 * 1.5) + (4 * 1.0) + (4 * 1.0);
  const movement_recovery_gap_score = (movement_raw / max_movement_raw) * 100;
  
  // Section 4 - Screenings (4.1-4.6)
  const q4_1 = getNumericValue(answers['4.1']); // blood panel recency
  const q4_2 = getNumericValue(answers['4.2']); // cortisol testing
  const q4_3 = answers['4.3']; // labs available (boolean/string)
  const q4_4 = getNumericValue(answers['4.4']); // Vit D status (0-3)
  const q4_5 = getNumericValue(answers['4.5']); // glucose status (0-3)
  const q4_6 = getNumericValue(answers['4.6']); // lipids status (0-3)
  
  const blood_panel_gap = (4 - q4_1);
  const cortisol_gap = (4 - q4_2);
  
  // Vit D gap calculation
  let vitD_gap = 0;
  if (q4_4 === 0) vitD_gap = 2.5;      // never tested
  else if (q4_4 === 1) vitD_gap = 2.0; // >1 year ago
  else if (q4_4 === 2) vitD_gap = 3.0; // abnormal
  else vitD_gap = 0;                    // normal
  
  // Glucose gap calculation
  let glucose_gap = 0;
  if (q4_5 === 0) glucose_gap = 2.0;      // never
  else if (q4_5 === 1) glucose_gap = 1.0; // old normal
  else if (q4_5 === 2) glucose_gap = 3.0; // abnormal
  else glucose_gap = 0;                   // recent normal
  
  // Lipid gap calculation
  let lipid_gap = 0;
  if (q4_6 === 0) lipid_gap = 2.0;      // never
  else if (q4_6 === 1) lipid_gap = 1.0; // old normal
  else if (q4_6 === 2) lipid_gap = 3.0; // abnormal
  else lipid_gap = 0;                    // recent normal
  
  const screening_raw = 
    (blood_panel_gap * 1.5) +
    (cortisol_gap * 1.0) +
    (vitD_gap * 1.0) +
    (glucose_gap * 1.25) +
    (lipid_gap * 1.25);
  
  const max_screening_raw = (4 * 1.5) + (4 * 1.0) + (3 * 1.0) + (3 * 1.25) + (3 * 1.25);
  const screening_gap_score = (screening_raw / max_screening_raw) * 100;
  
  // Section 5 - Environment (5.1-5.2)
  const q5_1 = getNumericValue(answers['5.1']); // brightness before bed
  const q5_2 = getNumericValue(answers['5.2']); // screens before bed
  
  const environment_raw = q5_1 + q5_2;
  const max_environment_raw = 8;
  const environment_risk_score = (environment_raw / max_environment_raw) * 100;
  
  // Section 6 - Red Flags (6.1-6.2)
  const q6_1 = getNumericValue(answers['6.1']); // midday crashes
  const q6_2 = getNumericValue(answers['6.2']); // headaches
  
  const red_flag_raw = q6_1 + q6_2;
  const max_red_flag_raw = 8;
  const red_flag_burden_score = (red_flag_raw / max_red_flag_raw) * 100;
  
  // Section 7 - Key Metrics (7.1-7.8)
  const q7_1 = getNumericValue(answers['7.1']); // pressure most days
  const q7_2 = getNumericValue(answers['7.2']); // stress lingers
  const q7_3 = getNumericValue(answers['7.3']); // wired but tired
  const q7_4 = getNumericValue(answers['7.4']); // wake 3-5 AM
  const q7_5 = getNumericValue(answers['7.5']); // struggle to fall asleep
  const q7_6 = getNumericValue(answers['7.6']); // unrefreshed on waking
  const q7_7 = getNumericValue(answers['7.7']); // mental fatigue
  const q7_8 = getNumericValue(answers['7.8']); // struggle to focus
  
  const stress_load_score = ((q7_1 + q7_2) / 8) * 100;
  const cortisol_regulation_score = ((q7_3 + q7_4) / 8) * 100;
  const sleep_quality_score = ((q7_5 + q7_6) / 8) * 100;
  const cognitive_recovery_score = ((q7_7 + q7_8) / 8) * 100;
  
  // Clinical Flags
  const has_diabetes = diagnoses.includes('Diabetes/prediabetes');
  const has_hypertension = diagnoses.includes('High blood pressure');
  const has_high_cholesterol = diagnoses.includes('High cholesterol');
  const has_anxiety_depression = diagnoses.includes('Anxiety/depression');
  const has_thyroid = diagnoses.includes('Thyroid condition');
  
  const metabolic_risk_flag = 
    has_diabetes ||
    has_hypertension ||
    has_high_cholesterol ||
    (bmi !== undefined && bmi >= 30) ||
    (red_flag_burden_score >= 60 && nutrition_risk_score >= 60);
  
  const cardiometabolic_risk_flag = 
    metabolic_risk_flag ||
    (postmenopausal && (age !== undefined && age >= 50));
  
  const high_inflammation_risk_flag = 
    (nutrition_risk_score >= 60) ||
    (q1_1 >= 3) ||
    (q1_2 <= 1) ||
    (q1_5 >= 3);
  
  const gut_workup_indicated_flag = 
    (q1_5 >= 3) && high_inflammation_risk_flag;
  
  const high_stress_flag = (stress_load_score >= 60);
  const poor_sleep_flag = 
    (sleep_quality_score >= 60) ||
    (q5_1 >= 3) ||
    (q5_2 >= 3);
  
  const cognitive_strain_flag = 
    (cognitive_recovery_score >= 60) ||
    has_anxiety_depression;
  
  const incomplete_basic_labs_flag = 
    (q4_1 <= 2) ||
    (vitD_gap > 0) ||
    (glucose_gap > 0) ||
    (lipid_gap > 0);
  
  const cortisol_testing_indicated_flag = 
    (cortisol_regulation_score >= 60) ||
    (high_stress_flag && poor_sleep_flag) ||
    (q4_2 === 0);
  
  const vitD_testing_indicated_flag = 
    (q4_4 <= 1) ||
    (supplement_gap_score >= 60 && poor_sleep_flag) ||
    (age !== undefined && age > 50 && bmi !== undefined && bmi < 20 && q3_2 <= 1);
  
  const glucose_testing_indicated_flag = 
    (q4_5 <= 1) ||
    metabolic_risk_flag ||
    (q6_1 >= 3 && q1_1 >= 2);
  
  const lipids_testing_indicated_flag = 
    (q4_6 <= 1) ||
    cardiometabolic_risk_flag ||
    (age !== undefined && age >= 45 && (has_high_cholesterol || has_hypertension));
  
  const thyroid_testing_indicated_flag = 
    has_thyroid ||
    (['Irregular periods', 'No period 12+ months'].includes(menstrual_status) &&
     poor_sleep_flag &&
     cognitive_strain_flag);
  
  return {
    nutrition_risk_score: Math.round(nutrition_risk_score),
    supplement_gap_score: Math.round(supplement_gap_score),
    movement_recovery_gap_score: Math.round(movement_recovery_gap_score),
    screening_gap_score: Math.round(screening_gap_score),
    environment_risk_score: Math.round(environment_risk_score),
    red_flag_burden_score: Math.round(red_flag_burden_score),
    stress_load_score: Math.round(stress_load_score),
    cortisol_regulation_score: Math.round(cortisol_regulation_score),
    sleep_quality_score: Math.round(sleep_quality_score),
    cognitive_recovery_score: Math.round(cognitive_recovery_score),
    bmi,
    postmenopausal,
    surgical_menopause,
    on_estrogen_or_combined,
    metabolic_risk_flag,
    cardiometabolic_risk_flag,
    high_inflammation_risk_flag,
    poor_sleep_flag,
    high_stress_flag,
    cognitive_strain_flag,
    incomplete_basic_labs_flag,
    cortisol_testing_indicated_flag,
    vitD_testing_indicated_flag,
    glucose_testing_indicated_flag,
    lipids_testing_indicated_flag,
    thyroid_testing_indicated_flag,
    gut_workup_indicated_flag,
    rawScores,
  };
}

