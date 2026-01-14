/**
 * Medical Logic Registry
 * 
 * Contains all medical nodes that map survey responses to biological domain impacts.
 * This is the single source of truth for scoring logic - no hardcoded rules elsewhere.
 */

import { MedicalNode, MedicalLogicRegistry } from './types';

/**
 * Traveler-specific Medical Logic Registry
 * Based on clinical pillars: Immune, Blood Sugar, Longevity, Cardiovascular
 */
export const TRAVELER_MEDICAL_REGISTRY: MedicalLogicRegistry = {
  nodes: [
    // ============================================================================
    // IMMUNE & INFECTION DOMAIN
    // Clinical Proxy: Allostatic Load & PNI (Psycho-Neuro-Immunology)
    // ============================================================================
    
    // T2 (Travel Frequency) - High frequency increases immune vulnerability
    {
      trigger: {
        questionId: 'T2',
        optionValue: (value: any) => {
          const travelMap: Record<string, number> = {
            'Never': 0,
            '1–3 times': 1,
            '4–6 times': 2,
            '7–10 times': 3,
            'More than 10 times': 4,
          };
          return (travelMap[value] ?? 0) >= 3; // 7-10 times or more
        },
      },
      logic: {
        targetDomain: 'immune',
        taxPillar: 'stress_load',
        impactWeight: -15,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'HIGH_TRAVEL_IMMUNE_LOAD',
        type: 'negative',
      },
    },
    
    // N2 (Vegetable/Fruit Intake) - High intake supports immune function
    {
      trigger: {
        questionId: 'N2',
        optionValue: (value: any) => {
          const servingsMap: Record<string, number> = {
            'Less than 1': 0,
            '1–2': 1,
            '3–4': 2,
            '5–7': 3,
            '8 or more': 4,
          };
          return (servingsMap[value] ?? 0) >= 3; // 5-7 or more
        },
      },
      logic: {
        targetDomain: 'immune',
        taxPillar: 'stress_load',
        impactWeight: +20,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'HIGH_MICRONUTRIENT_IMMUNE_SUPPORT',
        type: 'positive',
      },
    },
    
    // N3 (Hydration) - Poor hydration during travel
    {
      trigger: {
        questionId: 'N3',
        optionValue: (value: any) => {
          const freqMap: Record<string, number> = {
            'Never': 0,
            'Rarely': 1,
            'Sometimes': 2,
            'Often': 3,
            'Almost always': 4,
          };
          return (freqMap[value] ?? 0) >= 2; // Sometimes or more
        },
      },
      logic: {
        targetDomain: 'immune',
        taxPillar: 'stress_load',
        impactWeight: -10,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'DEHYDRATION_IMMUNE_STRESS',
        type: 'negative',
      },
    },
    
    // R2 (Mood/Stress Impairs Function) - Chronic stress suppresses HPA axis
    {
      trigger: {
        questionId: 'R2',
        optionValue: 'Yes',
      },
      logic: {
        targetDomain: 'immune',
        taxPillar: 'stress_load',
        impactWeight: -20,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'CHRONIC_STRESS_HPA_SUPPRESSION',
        type: 'negative',
      },
    },
    
    // LAB2: CRP (Inflammation markers)
    {
      trigger: {
        questionId: 'LAB2',
        optionValue: (value: any) => {
          if (!Array.isArray(value)) return false;
          return value.some((test: string) => 
            test.includes('CRP') && test.includes('normal')
          );
        },
      },
      logic: {
        targetDomain: 'immune',
        taxPillar: 'stress_load',
        impactWeight: +15,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'OPTIMAL_INFLAMMATION_MARKERS',
        type: 'positive',
      },
    },
    
    {
      trigger: {
        questionId: 'LAB2',
        optionValue: (value: any) => {
          if (!Array.isArray(value)) return false;
          return value.some((test: string) => 
            test.includes('CRP') && test.includes('abnormal')
          );
        },
      },
      logic: {
        targetDomain: 'immune',
        taxPillar: 'stress_load',
        impactWeight: -20,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'ELEVATED_INFLAMMATION_MARKERS',
        type: 'negative',
      },
    },
    
    // ============================================================================
    // BLOOD SUGAR & METABOLISM DOMAIN
    // Clinical Proxy: Cortisol-Induced Gluconeogenesis
    // ============================================================================
    
    // S1 (Sleep Onset Difficulty) - High nocturnal cortisol triggers hepatic glucose production
    {
      trigger: {
        questionId: 'S1',
        optionValue: (value: any) => {
          const freqMap: Record<string, number> = {
            'Never': 0,
            'Rarely': 1,
            'Sometimes': 2,
            'Often': 3,
            'Almost always': 4,
          };
          return (freqMap[value] ?? 0) >= 3; // Often or more
        },
      },
      logic: {
        targetDomain: 'metabolism',
        taxPillar: 'cortisol_reg',
        impactWeight: -25, // Base penalty
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'NOCTURNAL_CORTISOL_GLUCONEOGENESIS',
        type: 'negative',
      },
    },
    
    // T3 (Sitting Duration) - Sedentary behavior affects glucose metabolism
    {
      trigger: {
        questionId: 'T3',
        optionValue: (value: any) => {
          const sittingMap: Record<string, number> = {
            '<2 hours': 0,
            '2–4 hours': 1,
            '4–6 hours': 2,
            '6–8 hours': 3,
            '>8 hours': 4,
          };
          return (sittingMap[value] ?? 0) >= 3; // 6-8 hours or more
        },
      },
      logic: {
        targetDomain: 'metabolism',
        taxPillar: 'cortisol_reg',
        impactWeight: -15,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'SEDENTARY_GLUCOSE_METABOLISM_TAX',
        type: 'negative',
      },
    },
    
    // M1 (Movement Frequency) - Regular movement improves insulin sensitivity
    {
      trigger: {
        questionId: 'M1',
        optionValue: (value: any) => {
          const daysMap: Record<string, number> = {
            '0 days': 0,
            '1–2 days': 1,
            '3–4 days': 2,
            '5–6 days': 3,
            'Daily': 4,
          };
          return (daysMap[value] ?? 0) >= 2; // 3-4 days or more
        },
      },
      logic: {
        targetDomain: 'metabolism',
        taxPillar: 'cortisol_reg',
        impactWeight: +20,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'REGULAR_MOVEMENT_INSULIN_SENSITIVITY',
        type: 'positive',
      },
    },
    
    // BG5 (Diabetes/Prediabetes) - Hard penalty
    {
      trigger: {
        questionId: 'BG5',
        optionValue: (value: any) => {
          if (!Array.isArray(value)) return false;
          return value.includes('Prediabetes or diabetes');
        },
      },
      logic: {
        targetDomain: 'metabolism',
        taxPillar: 'cortisol_reg',
        impactWeight: -30,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'DIABETES_METABOLIC_DYSREGULATION',
        type: 'negative',
      },
    },
    
    // LAB2: Glucose/HbA1c
    {
      trigger: {
        questionId: 'LAB2',
        optionValue: (value: any) => {
          if (!Array.isArray(value)) return false;
          return value.some((test: string) => 
            (test.includes('Glucose') || test.includes('HbA1c') || test.includes('Blood glucose')) && 
            test.includes('normal')
          );
        },
      },
      logic: {
        targetDomain: 'metabolism',
        taxPillar: 'cortisol_reg',
        impactWeight: +15,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'OPTIMAL_GLUCOSE_CONTROL',
        type: 'positive',
      },
    },
    
    {
      trigger: {
        questionId: 'LAB2',
        optionValue: (value: any) => {
          if (!Array.isArray(value)) return false;
          return value.some((test: string) => 
            (test.includes('Glucose') || test.includes('HbA1c') || test.includes('Blood glucose')) && 
            test.includes('abnormal')
          );
        },
      },
      logic: {
        targetDomain: 'metabolism',
        taxPillar: 'cortisol_reg',
        impactWeight: -25,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'GLUCOSE_DYSREGULATION',
        type: 'negative',
      },
    },
    
    // ============================================================================
    // LONGEVITY & RESILIENCE DOMAIN
    // Clinical Proxy: Glymphatic Clearance & Telomere Maintenance
    // ============================================================================
    
    // BG1 (Age) - Baseline for longevity
    {
      trigger: {
        questionId: 'BG1',
        optionValue: (value: any) => {
          const age = Number(value);
          return age >= 50; // Age 50+ baseline adjustment
        },
      },
      logic: {
        targetDomain: 'longevity',
        taxPillar: 'sleep_quality',
        impactWeight: -5, // Small baseline adjustment
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'AGE_BASELINE_LONGEVITY',
        type: 'negative',
      },
    },
    
    // M2 (Recovery Quality) - Feeling recovered supports resilience
    {
      trigger: {
        questionId: 'M2',
        optionValue: (value: any) => {
          const recoveryMap: Record<string, number> = {
            '0 days': 0,
            '1–2 days': 1,
            '3–4 days': 2,
            '5–6 days': 3,
            'Daily': 4,
          };
          return (recoveryMap[value] ?? 0) >= 3; // 5-6 days or Daily
        },
      },
      logic: {
        targetDomain: 'longevity',
        taxPillar: 'cog_recovery',
        impactWeight: +25,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'HIGH_RECOVERY_RESILIENCE',
        type: 'positive',
      },
    },
    
    // S3 (Bedtime Consistency) - Inconsistent bedtimes stop glymphatic clearance
    {
      trigger: {
        questionId: 'S3',
        optionValue: (value: any) => {
          return value === 'Very inconsistent' || value === 'Somewhat inconsistent';
        },
      },
      logic: {
        targetDomain: 'longevity',
        taxPillar: 'sleep_quality',
        impactWeight: -20,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'CIRCADIAN_MISALIGNMENT_GLYMPHATIC',
        type: 'negative',
      },
    },
    
    // T2 (Travel Frequency) - Time zone shifts disrupt circadian rhythm
    {
      trigger: {
        questionId: 'T2',
        optionValue: (value: any) => {
          const travelMap: Record<string, number> = {
            'Never': 0,
            '1–3 times': 1,
            '4–6 times': 2,
            '7–10 times': 3,
            'More than 10 times': 4,
          };
          return (travelMap[value] ?? 0) >= 2; // 4-6 times or more (time zone shifts)
        },
      },
      logic: {
        targetDomain: 'longevity',
        taxPillar: 'sleep_quality',
        impactWeight: -15,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'TIME_ZONE_SHIFT_CIRCADIAN_DISRUPTION',
        type: 'negative',
      },
    },
    
    // N2 (Vegetable Intake) - Micronutrients support telomere maintenance
    {
      trigger: {
        questionId: 'N2',
        optionValue: (value: any) => {
          const servingsMap: Record<string, number> = {
            'Less than 1': 0,
            '1–2': 1,
            '3–4': 2,
            '5–7': 3,
            '8 or more': 4,
          };
          return (servingsMap[value] ?? 0) >= 3; // 5-7 or more
        },
      },
      logic: {
        targetDomain: 'longevity',
        taxPillar: 'cog_recovery',
        impactWeight: +18,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'HIGH_MICRONUTRIENT_TELOMERE_SUPPORT',
        type: 'positive',
      },
    },
    
    // BG6 (Family History - Neurodegenerative)
    {
      trigger: {
        questionId: 'BG6',
        optionValue: (value: any) => {
          if (!Array.isArray(value)) return false;
          return value.some((condition: string) => 
            condition.includes('Dementia') || 
            condition.includes('neurodegenerative') ||
            condition.includes('memory decline')
          );
        },
      },
      logic: {
        targetDomain: 'longevity',
        taxPillar: 'cog_recovery',
        impactWeight: -25,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'GENETIC_NEURODEGENERATIVE_RISK',
        type: 'negative',
      },
    },
    
    // ============================================================================
    // CARDIOVASCULAR HEALTH DOMAIN
    // Clinical Proxy: Autonomic Nervous System (ANS) Balance
    // ============================================================================
    
    // BG5 (High Blood Pressure) - Hard penalty
    {
      trigger: {
        questionId: 'BG5',
        optionValue: (value: any) => {
          if (!Array.isArray(value)) return false;
          return value.includes('High blood pressure');
        },
      },
      logic: {
        targetDomain: 'cardiovascular',
        taxPillar: 'cortisol_reg',
        impactWeight: -30,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'HYPERTENSION_ARTERIAL_STIFFNESS',
        type: 'negative',
      },
    },
    
    // BG5 (High Cholesterol)
    {
      trigger: {
        questionId: 'BG5',
        optionValue: (value: any) => {
          if (!Array.isArray(value)) return false;
          return value.includes('High cholesterol');
        },
      },
      logic: {
        targetDomain: 'cardiovascular',
        taxPillar: 'cortisol_reg',
        impactWeight: -20,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'HIGH_CHOLESTEROL_CARDIOVASCULAR_RISK',
        type: 'negative',
      },
    },
    
    // F2 (Energy Limits) - Functional tax reflecting heart's inability to meet metabolic demand
    {
      trigger: {
        questionId: 'F2',
        optionValue: (value: any) => {
          const freqMap: Record<string, number> = {
            'Never': 0,
            'Rarely': 1,
            'Sometimes': 2,
            'Often': 3,
            'Almost always': 4,
          };
          return (freqMap[value] ?? 0) >= 2; // Sometimes or more
        },
      },
      logic: {
        targetDomain: 'cardiovascular',
        taxPillar: 'cog_recovery',
        impactWeight: -18,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'ENERGY_LIMITS_CARDIOVASCULAR_FUNCTIONAL_TAX',
        type: 'negative',
      },
    },
    
    // BG6 (Family History - Cardiac)
    {
      trigger: {
        questionId: 'BG6',
        optionValue: (value: any) => {
          if (!Array.isArray(value)) return false;
          return value.some((condition: string) => 
            condition.includes('Heart disease') || 
            condition.includes('stroke')
          );
        },
      },
      logic: {
        targetDomain: 'cardiovascular',
        taxPillar: 'cortisol_reg',
        impactWeight: -22,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'FAMILY_CARDIAC_HISTORY_RISK',
        type: 'negative',
      },
    },
    
    // LAB2: Cholesterol/Lipids
    {
      trigger: {
        questionId: 'LAB2',
        optionValue: (value: any) => {
          if (!Array.isArray(value)) return false;
          return value.some((test: string) => 
            (test.includes('Cholesterol') || test.includes('Lipids') || test.includes('LDL') || test.includes('HDL')) && 
            test.includes('normal')
          );
        },
      },
      logic: {
        targetDomain: 'cardiovascular',
        taxPillar: 'cortisol_reg',
        impactWeight: +20,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'OPTIMAL_LIPID_PROFILE',
        type: 'positive',
      },
    },
    
    {
      trigger: {
        questionId: 'LAB2',
        optionValue: (value: any) => {
          if (!Array.isArray(value)) return false;
          return value.some((test: string) => 
            (test.includes('Cholesterol') || test.includes('Lipids') || test.includes('LDL') || test.includes('HDL')) && 
            test.includes('abnormal')
          );
        },
      },
      logic: {
        targetDomain: 'cardiovascular',
        taxPillar: 'cortisol_reg',
        impactWeight: -25,
        isRedFlag: false,
      },
      factorMetadata: {
        id: 'DYSLIPIDEMIA_CARDIOVASCULAR_RISK',
        type: 'negative',
      },
    },
    
    // ============================================================================
    // RED FLAGS (Override all logic)
    // ============================================================================
    
    // R1 (Chest Pain/Breathless/Dizzy) - Hard red flag
    {
      trigger: {
        questionId: 'R1',
        optionValue: 'Yes',
      },
      logic: {
        targetDomain: 'cardiovascular',
        taxPillar: 'cortisol_reg',
        impactWeight: -50, // Severe penalty
        isRedFlag: true,
      },
      factorMetadata: {
        id: 'CARDIOVASCULAR_RED_FLAG_SYMPTOMS',
        type: 'negative',
      },
    },
    
    // R3 (Needs Prompt Evaluation) - Red flag
    {
      trigger: {
        questionId: 'R3',
        optionValue: 'Yes',
      },
      logic: {
        targetDomain: 'cardiovascular',
        taxPillar: 'cortisol_reg',
        impactWeight: -40,
        isRedFlag: true,
      },
      factorMetadata: {
        id: 'PROMPT_MEDICAL_EVALUATION_NEEDED',
        type: 'negative',
      },
    },
  ],
};






