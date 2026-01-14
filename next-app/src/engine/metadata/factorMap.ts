/**
 * Factor Mapping Configuration
 * 
 * This file maps survey question IDs and option values to health domains
 * with positive or negative influence indicators. All label keys reference
 * the Persona Specification for i18n/translation.
 * 
 * NO HARDCODED STRINGS: All display text must come from PersonaSpec.
 */

export type InfluenceType = 'positive' | 'negative';
export type DomainId = 'immune' | 'metabolism' | 'longevity' | 'cardiovascular';

export interface FactorMapping {
  questionId: string; // UI question ID (e.g., "BG5", "T2", "N2")
  optionValue: string | string[] | ((value: any) => boolean); // The answer(s) that trigger this factor, or a function for complex logic
  domain: DomainId;
  influence: InfluenceType;
  labelKey: string; // Reference to a translation/i18n key in PersonaSpec
  condition?: (value: any, allAnswers: Record<string, any>) => boolean; // Optional additional condition
}

/**
 * Factor mappings for Traveler persona
 * Based on survey structure: BG1-BG10, T1-T3, E1-E3, S1-S6, ST1-ST4, M1-M4, C1-C2, G1-G3, L1-L2, N1-N3, SUP1-SUP3, LAB1-LAB2, R1-R3
 */
export const TRAVELER_FACTOR_MAPPINGS: FactorMapping[] = [
  // ============================================================================
  // IMMUNE DOMAIN
  // ============================================================================
  
  // Positive: High micronutrient intake (N2 >= 5 servings)
  {
    questionId: 'N2',
    optionValue: (value: any) => {
      // Map scale values: "Less than 1" = 0, "1–2" = 1, "3–4" = 2, "5–7" = 3, "8 or more" = 4
      const servingsMap: Record<string, number> = {
        'Less than 1': 0,
        '1–2': 1,
        '3–4': 2,
        '5–7': 3,
        '8 or more': 4,
      };
      const servings = servingsMap[value] ?? 0;
      return servings >= 3; // 5-7 or 8+ servings
    },
    domain: 'immune',
    influence: 'positive',
    labelKey: 'factor_high_micronutrients',
  },
  
  // Negative: High travel frequency (T2 > 10 trips)
  {
    questionId: 'T2',
    optionValue: (value: any) => {
      // Map travel frequency: "Never" = 0, "1–3 times" = 1, "4–6 times" = 2, "7–10 times" = 3, "More than 10 times" = 4
      const travelMap: Record<string, number> = {
        'Never': 0,
        '1–3 times': 1,
        '4–6 times': 2,
        '7–10 times': 3,
        'More than 10 times': 4,
      };
      const trips = travelMap[value] ?? 0;
      return trips >= 4; // More than 10 times
    },
    domain: 'immune',
    influence: 'negative',
    labelKey: 'factor_high_viral_exposure',
  },
  
  // Positive: Optimal inflammation markers (LAB2 includes CRP and it's normal)
  {
    questionId: 'LAB2',
    optionValue: (value: any) => {
      if (!Array.isArray(value)) return false;
      // Check if CRP test exists and is normal
      return value.some((test: string) => 
        test.includes('CRP') && test.includes('normal')
      );
    },
    domain: 'immune',
    influence: 'positive',
    labelKey: 'factor_optimal_inflammation_markers',
  },
  
  // Negative: High inflammation markers (LAB2 includes CRP and it's abnormal)
  {
    questionId: 'LAB2',
    optionValue: (value: any) => {
      if (!Array.isArray(value)) return false;
      return value.some((test: string) => 
        test.includes('CRP') && test.includes('abnormal')
      );
    },
    domain: 'immune',
    influence: 'negative',
    labelKey: 'factor_elevated_inflammation',
  },
  
  // ============================================================================
  // METABOLISM DOMAIN
  // ============================================================================
  
  // Positive: Metabolic flexibility (M1 Daily/4-6x per week)
  {
    questionId: 'M1',
    optionValue: (value: any) => {
      // Days per week: "0 days" = 0, "1–2 days" = 1, "3–4 days" = 2, "5–6 days" = 3, "Daily" = 4
      const daysMap: Record<string, number> = {
        '0 days': 0,
        '1–2 days': 1,
        '3–4 days': 2,
        '5–6 days': 3,
        'Daily': 4,
      };
      const days = daysMap[value] ?? 0;
      return days >= 2; // 3-4 days or more
    },
    domain: 'metabolism',
    influence: 'positive',
    labelKey: 'factor_metabolic_flexibility',
  },
  
  // Negative: Sedentary stasis (T3 > 8 hours sitting)
  {
    questionId: 'T3',
    optionValue: (value: any) => {
      // Sitting duration: "<2 hours" = 0, "2–4 hours" = 1, "4–6 hours" = 2, "6–8 hours" = 3, ">8 hours" = 4
      const sittingMap: Record<string, number> = {
        '<2 hours': 0,
        '2–4 hours': 1,
        '4–6 hours': 2,
        '6–8 hours': 3,
        '>8 hours': 4,
      };
      const hours = sittingMap[value] ?? 0;
      return hours >= 4; // >8 hours
    },
    domain: 'metabolism',
    influence: 'negative',
    labelKey: 'factor_sedentary_stasis',
  },
  
  // Negative: Diabetes/Prediabetes diagnosis (BG5 includes diabetes)
  {
    questionId: 'BG5',
    optionValue: (value: any) => {
      if (!Array.isArray(value)) return false;
      return value.includes('Prediabetes or diabetes');
    },
    domain: 'metabolism',
    influence: 'negative',
    labelKey: 'factor_diabetes_risk',
  },
  
  // Positive: Normal glucose markers (LAB2 includes Glucose/HbA1c and it's normal)
  {
    questionId: 'LAB2',
    optionValue: (value: any) => {
      if (!Array.isArray(value)) return false;
      return value.some((test: string) => 
        (test.includes('Glucose') || test.includes('HbA1c') || test.includes('Blood glucose')) && 
        test.includes('normal')
      );
    },
    domain: 'metabolism',
    influence: 'positive',
    labelKey: 'factor_optimal_glucose_control',
  },
  
  // Negative: Abnormal glucose markers (LAB2 includes Glucose/HbA1c and it's abnormal)
  {
    questionId: 'LAB2',
    optionValue: (value: any) => {
      if (!Array.isArray(value)) return false;
      return value.some((test: string) => 
        (test.includes('Glucose') || test.includes('HbA1c') || test.includes('Blood glucose')) && 
        test.includes('abnormal')
      );
    },
    domain: 'metabolism',
    influence: 'negative',
    labelKey: 'factor_glucose_dysregulation',
  },
  
  // ============================================================================
  // LONGEVITY DOMAIN
  // ============================================================================
  
  // Positive: High resilience (M2 Always recovered)
  {
    questionId: 'M2',
    optionValue: (value: any) => {
      // Recovery frequency: "0 days" = 0, "1–2 days" = 1, "3–4 days" = 2, "5–6 days" = 3, "Daily" = 4
      const recoveryMap: Record<string, number> = {
        '0 days': 0,
        '1–2 days': 1,
        '3–4 days': 2,
        '5–6 days': 3,
        'Daily': 4,
      };
      const days = recoveryMap[value] ?? 0;
      return days >= 3; // 5-6 days or Daily
    },
    domain: 'longevity',
    influence: 'positive',
    labelKey: 'factor_high_resilience',
  },
  
  // Negative: Genetic predisposition (BG6 includes Dementia/Neuro)
  {
    questionId: 'BG6',
    optionValue: (value: any) => {
      if (!Array.isArray(value)) return false;
      return value.some((condition: string) => 
        condition.includes('Dementia') || 
        condition.includes('neurodegenerative') ||
        condition.includes('memory decline')
      );
    },
    domain: 'longevity',
    influence: 'negative',
    labelKey: 'factor_genetic_predisposition',
  },
  
  // Positive: High micronutrient intake (N2 >= 5 servings) - also contributes to longevity
  {
    questionId: 'N2',
    optionValue: (value: any) => {
      const servingsMap: Record<string, number> = {
        'Less than 1': 0,
        '1–2': 1,
        '3–4': 2,
        '5–7': 3,
        '8 or more': 4,
      };
      const servings = servingsMap[value] ?? 0;
      return servings >= 3; // 5-7 or 8+ servings
    },
    domain: 'longevity',
    influence: 'positive',
    labelKey: 'factor_high_micronutrients',
  },
  
  // ============================================================================
  // CARDIOVASCULAR DOMAIN
  // ============================================================================
  
  // Negative: Hypertension load (BG5 includes High blood pressure)
  {
    questionId: 'BG5',
    optionValue: (value: any) => {
      if (!Array.isArray(value)) return false;
      return value.includes('High blood pressure');
    },
    domain: 'cardiovascular',
    influence: 'negative',
    labelKey: 'factor_hypertension_load',
  },
  
  // Negative: High cholesterol (BG5 includes High cholesterol)
  {
    questionId: 'BG5',
    optionValue: (value: any) => {
      if (!Array.isArray(value)) return false;
      return value.includes('High cholesterol');
    },
    domain: 'cardiovascular',
    influence: 'negative',
    labelKey: 'factor_high_cholesterol',
  },
  
  // Negative: Family history of heart disease (BG6 includes Heart disease or stroke)
  {
    questionId: 'BG6',
    optionValue: (value: any) => {
      if (!Array.isArray(value)) return false;
      return value.some((condition: string) => 
        condition.includes('Heart disease') || 
        condition.includes('stroke')
      );
    },
    domain: 'cardiovascular',
    influence: 'negative',
    labelKey: 'factor_family_cardiac_history',
  },
  
  // Positive: Optimal lipid profile (LAB2 includes Cholesterol/Lipids and it's normal)
  {
    questionId: 'LAB2',
    optionValue: (value: any) => {
      if (!Array.isArray(value)) return false;
      return value.some((test: string) => 
        (test.includes('Cholesterol') || test.includes('Lipids') || test.includes('LDL') || test.includes('HDL')) && 
        test.includes('normal')
      );
    },
    domain: 'cardiovascular',
    influence: 'positive',
    labelKey: 'factor_optimal_lipid_profile',
  },
  
  // Negative: Abnormal lipid profile (LAB2 includes Cholesterol/Lipids and it's abnormal)
  {
    questionId: 'LAB2',
    optionValue: (value: any) => {
      if (!Array.isArray(value)) return false;
      return value.some((test: string) => 
        (test.includes('Cholesterol') || test.includes('Lipids') || test.includes('LDL') || test.includes('HDL')) && 
        test.includes('abnormal')
      );
    },
    domain: 'cardiovascular',
    influence: 'negative',
    labelKey: 'factor_dyslipidemia',
  },
];

/**
 * Get all factor mappings for a specific domain
 */
export function getFactorMappingsForDomain(domain: DomainId): FactorMapping[] {
  return TRAVELER_FACTOR_MAPPINGS.filter(mapping => mapping.domain === domain);
}

/**
 * Get all factor mappings for a specific question
 */
export function getFactorMappingsForQuestion(questionId: string): FactorMapping[] {
  return TRAVELER_FACTOR_MAPPINGS.filter(mapping => mapping.questionId === questionId);
}






