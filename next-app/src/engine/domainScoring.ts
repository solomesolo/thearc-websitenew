/**
 * Domain Scoring Logic
 * 
 * Calculates numeric scores for each health domain using the Medical Logic Registry
 * and CNS-driven biological domain analysis.
 * 
 * This uses the new MedicalLogicRegistry architecture with systemic taxes.
 */

import { TravelerSurveyAnswers, TravelerKeyMetricResult } from './types';
import { DomainAnalysis, DomainAnalysisOutput } from './types';
import { analyzeDomainsWithMedicalLogic } from './medicalLogic/engine';
import { TRAVELER_MEDICAL_REGISTRY } from './medicalLogic/registry';

/**
 * Calculate Immune domain score
 * Weights: T2 (Travel frequency), N2 (Nutrition/vegetables), LAB2_CRP
 */
function calculateImmuneScore(
  answers: TravelerSurveyAnswers,
  uiAnswers: Record<string, any>
): number {
  let rawScore = 0;
  let maxPossible = 0;
  
  // T2: Travel frequency (negative impact - more travel = lower score)
  // Weight: 30
  if (uiAnswers['T2']) {
    const travelMap: Record<string, number> = {
      'Never': 4,
      '1–3 times': 3,
      '4–6 times': 2,
      '7–10 times': 1,
      'More than 10 times': 0,
    };
    const travelScore = travelMap[uiAnswers['T2']] ?? 2;
    rawScore += (travelScore / 4) * 30;
    maxPossible += 30;
  }
  
  // N2: Vegetable/fruit servings (positive impact - more servings = higher score)
  // Weight: 40
  if (uiAnswers['N2']) {
    const servingsMap: Record<string, number> = {
      'Less than 1': 0,
      '1–2': 1,
      '3–4': 2,
      '5–7': 3,
      '8 or more': 4,
    };
    const servings = servingsMap[uiAnswers['N2']] ?? 0;
    rawScore += (servings / 4) * 40;
    maxPossible += 40;
  }
  
  // LAB2: CRP test results (if available)
  // Weight: 30
  if (Array.isArray(uiAnswers['LAB2'])) {
    const hasCRP = uiAnswers['LAB2'].some((test: string) => test.includes('CRP'));
    if (hasCRP) {
      const isNormal = uiAnswers['LAB2'].some((test: string) => 
        test.includes('CRP') && test.includes('normal')
      );
      const isAbnormal = uiAnswers['LAB2'].some((test: string) => 
        test.includes('CRP') && test.includes('abnormal')
      );
      
      if (isNormal) {
        rawScore += 30; // Full points for normal
      } else if (isAbnormal) {
        rawScore += 0; // No points for abnormal
      } else {
        rawScore += 15; // Partial points if tested but result unknown
      }
      maxPossible += 30;
    }
  }
  
  // Normalize to 0-100
  if (maxPossible === 0) return 50; // Default if no data
  return Math.round((rawScore / maxPossible) * 100);
}

/**
 * Calculate Metabolism domain score
 * Weights: BG5 (Diabetes), T3 (Sitting), M1 (Activity), LAB2_Glucose
 */
function calculateMetabolismScore(
  answers: TravelerSurveyAnswers,
  uiAnswers: Record<string, any>
): number {
  let rawScore = 0;
  let maxPossible = 0;
  
  // BG5: Diabetes/Prediabetes (negative impact)
  // Weight: 25
  if (Array.isArray(uiAnswers['BG5'])) {
    const hasDiabetes = uiAnswers['BG5'].includes('Prediabetes or diabetes');
    if (hasDiabetes) {
      rawScore += 0; // No points if diabetes
    } else {
      rawScore += 25; // Full points if no diabetes
    }
    maxPossible += 25;
  }
  
  // T3: Sitting duration (negative impact - more sitting = lower score)
  // Weight: 25
  if (uiAnswers['T3']) {
    const sittingMap: Record<string, number> = {
      '<2 hours': 4,
      '2–4 hours': 3,
      '4–6 hours': 2,
      '6–8 hours': 1,
      '>8 hours': 0,
    };
    const sittingScore = sittingMap[uiAnswers['T3']] ?? 2;
    rawScore += (sittingScore / 4) * 25;
    maxPossible += 25;
  }
  
  // M1: Activity days per week (positive impact)
  // Weight: 30
  if (uiAnswers['M1']) {
    const daysMap: Record<string, number> = {
      '0 days': 0,
      '1–2 days': 1,
      '3–4 days': 2,
      '5–6 days': 3,
      'Daily': 4,
    };
    const days = daysMap[uiAnswers['M1']] ?? 0;
    rawScore += (days / 4) * 30;
    maxPossible += 30;
  }
  
  // LAB2: Glucose test results (if available)
  // Weight: 20
  if (Array.isArray(uiAnswers['LAB2'])) {
    const hasGlucose = uiAnswers['LAB2'].some((test: string) => 
      test.includes('Glucose') || test.includes('HbA1c') || test.includes('Blood glucose')
    );
    if (hasGlucose) {
      const isNormal = uiAnswers['LAB2'].some((test: string) => 
        (test.includes('Glucose') || test.includes('HbA1c') || test.includes('Blood glucose')) && 
        test.includes('normal')
      );
      const isAbnormal = uiAnswers['LAB2'].some((test: string) => 
        (test.includes('Glucose') || test.includes('HbA1c') || test.includes('Blood glucose')) && 
        test.includes('abnormal')
      );
      
      if (isNormal) {
        rawScore += 20; // Full points for normal
      } else if (isAbnormal) {
        rawScore += 0; // No points for abnormal
      } else {
        rawScore += 10; // Partial points if tested but result unknown
      }
      maxPossible += 20;
    }
  }
  
  // Normalize to 0-100
  if (maxPossible === 0) return 50; // Default if no data
  return Math.round((rawScore / maxPossible) * 100);
}

/**
 * Calculate Longevity domain score
 * Weights: BG6 (Genetics), M2 (Recovery), N2 (Micro-nutrients)
 */
function calculateLongevityScore(
  answers: TravelerSurveyAnswers,
  uiAnswers: Record<string, any>
): number {
  let rawScore = 0;
  let maxPossible = 0;
  
  // BG6: Genetic predisposition (negative impact)
  // Weight: 30
  if (Array.isArray(uiAnswers['BG6'])) {
    const hasNeuroHistory = uiAnswers['BG6'].some((condition: string) => 
      condition.includes('Dementia') || 
      condition.includes('neurodegenerative') ||
      condition.includes('memory decline')
    );
    if (hasNeuroHistory) {
      rawScore += 0; // No points if genetic risk
    } else {
      rawScore += 30; // Full points if no genetic risk
    }
    maxPossible += 30;
  }
  
  // M2: Recovery days per week (positive impact)
  // Weight: 40
  if (uiAnswers['M2']) {
    const recoveryMap: Record<string, number> = {
      '0 days': 0,
      '1–2 days': 1,
      '3–4 days': 2,
      '5–6 days': 3,
      'Daily': 4,
    };
    const days = recoveryMap[uiAnswers['M2']] ?? 0;
    rawScore += (days / 4) * 40;
    maxPossible += 40;
  }
  
  // N2: Vegetable/fruit servings (positive impact)
  // Weight: 30
  if (uiAnswers['N2']) {
    const servingsMap: Record<string, number> = {
      'Less than 1': 0,
      '1–2': 1,
      '3–4': 2,
      '5–7': 3,
      '8 or more': 4,
    };
    const servings = servingsMap[uiAnswers['N2']] ?? 0;
    rawScore += (servings / 4) * 30;
    maxPossible += 30;
  }
  
  // Normalize to 0-100
  if (maxPossible === 0) return 50; // Default if no data
  return Math.round((rawScore / maxPossible) * 100);
}

/**
 * Calculate Cardiovascular domain score
 * Weights: BG5 (BP/Cholesterol), BG6 (Family Hx), LAB2_Lipids
 */
function calculateCardiovascularScore(
  answers: TravelerSurveyAnswers,
  uiAnswers: Record<string, any>
): number {
  let rawScore = 0;
  let maxPossible = 0;
  
  // BG5: High BP/Cholesterol (negative impact)
  // Weight: 35
  if (Array.isArray(uiAnswers['BG5'])) {
    const hasBP = uiAnswers['BG5'].includes('High blood pressure');
    const hasCholesterol = uiAnswers['BG5'].includes('High cholesterol');
    
    if (hasBP || hasCholesterol) {
      rawScore += 0; // No points if either condition
    } else {
      rawScore += 35; // Full points if neither
    }
    maxPossible += 35;
  }
  
  // BG6: Family history (negative impact)
  // Weight: 25
  if (Array.isArray(uiAnswers['BG6'])) {
    const hasCardiacHistory = uiAnswers['BG6'].some((condition: string) => 
      condition.includes('Heart disease') || 
      condition.includes('stroke')
    );
    if (hasCardiacHistory) {
      rawScore += 0; // No points if family history
    } else {
      rawScore += 25; // Full points if no family history
    }
    maxPossible += 25;
  }
  
  // LAB2: Lipid test results (if available)
  // Weight: 40
  if (Array.isArray(uiAnswers['LAB2'])) {
    const hasLipids = uiAnswers['LAB2'].some((test: string) => 
      test.includes('Cholesterol') || test.includes('Lipids') || test.includes('LDL') || test.includes('HDL')
    );
    if (hasLipids) {
      const isNormal = uiAnswers['LAB2'].some((test: string) => 
        (test.includes('Cholesterol') || test.includes('Lipids') || test.includes('LDL') || test.includes('HDL')) && 
        test.includes('normal')
      );
      const isAbnormal = uiAnswers['LAB2'].some((test: string) => 
        (test.includes('Cholesterol') || test.includes('Lipids') || test.includes('LDL') || test.includes('HDL')) && 
        test.includes('abnormal')
      );
      
      if (isNormal) {
        rawScore += 40; // Full points for normal
      } else if (isAbnormal) {
        rawScore += 0; // No points for abnormal
      } else {
        rawScore += 20; // Partial points if tested but result unknown
      }
      maxPossible += 40;
    }
  }
  
  // Normalize to 0-100
  if (maxPossible === 0) return 50; // Default if no data
  return Math.round((rawScore / maxPossible) * 100);
}

/**
 * Calculate domain analysis for all four domains using Medical Logic Registry
 * 
 * @param answers - Traveler engine format answers
 * @param uiAnswers - Raw UI answers (for accessing question IDs like "BG5", "T2", etc.)
 * @param keyMetrics - Key metrics from traveler engine (for CNS multipliers)
 * @returns Complete domain analysis with scores and factors
 */
export function calculateDomainAnalysis(
  answers: TravelerSurveyAnswers,
  uiAnswers: Record<string, any>,
  keyMetrics?: TravelerKeyMetricResult[]
): DomainAnalysisOutput {
  // Use new Medical Logic Engine if keyMetrics are provided
  if (keyMetrics && keyMetrics.length > 0) {
    const medicalAnalysis = analyzeDomainsWithMedicalLogic(
      uiAnswers,
      TRAVELER_MEDICAL_REGISTRY,
      keyMetrics
    );
    
    return {
      immune: {
        domain: 'immune',
        score: medicalAnalysis.immune.finalScore,
        analysis: {
          positiveInfluences: medicalAnalysis.factors.immune.positive,
          negativeInfluences: medicalAnalysis.factors.immune.negative,
        },
      },
      metabolism: {
        domain: 'metabolism',
        score: medicalAnalysis.metabolism.finalScore,
        analysis: {
          positiveInfluences: medicalAnalysis.factors.metabolism.positive,
          negativeInfluences: medicalAnalysis.factors.metabolism.negative,
        },
      },
      longevity: {
        domain: 'longevity',
        score: medicalAnalysis.longevity.finalScore,
        analysis: {
          positiveInfluences: medicalAnalysis.factors.longevity.positive,
          negativeInfluences: medicalAnalysis.factors.longevity.negative,
        },
      },
      cardiovascular: {
        domain: 'cardiovascular',
        score: medicalAnalysis.cardiovascular.finalScore,
        analysis: {
          positiveInfluences: medicalAnalysis.factors.cardiovascular.positive,
          negativeInfluences: medicalAnalysis.factors.cardiovascular.negative,
        },
      },
    };
  }
  
  // Fallback to old scoring method if keyMetrics not available
  console.warn("⚠️ Key metrics not provided, using legacy domain scoring");
  return calculateDomainAnalysisLegacy(answers, uiAnswers);
}

/**
 * Legacy domain analysis (for backward compatibility)
 */
function calculateDomainAnalysisLegacy(
  answers: TravelerSurveyAnswers,
  uiAnswers: Record<string, any>
): DomainAnalysisOutput {
  // Use old scoring methods (kept for backward compatibility)
  const immuneScore = calculateImmuneScore(answers, uiAnswers);
  const metabolismScore = calculateMetabolismScore(answers, uiAnswers);
  const longevityScore = calculateLongevityScore(answers, uiAnswers);
  const cardiovascularScore = calculateCardiovascularScore(answers, uiAnswers);
  
  // Use old factor extractor
  const { extractFactors } = require('./factorExtractor');
  const factors = extractFactors(uiAnswers);
  
  return {
    immune: {
      domain: 'immune',
      score: immuneScore,
      analysis: {
        positiveInfluences: factors.immune.positive,
        negativeInfluences: factors.immune.negative,
      },
    },
    metabolism: {
      domain: 'metabolism',
      score: metabolismScore,
      analysis: {
        positiveInfluences: factors.metabolism.positive,
        negativeInfluences: factors.metabolism.negative,
      },
    },
    longevity: {
      domain: 'longevity',
      score: longevityScore,
      analysis: {
        positiveInfluences: factors.longevity.positive,
        negativeInfluences: factors.longevity.negative,
      },
    },
    cardiovascular: {
      domain: 'cardiovascular',
      score: cardiovascularScore,
      analysis: {
        positiveInfluences: factors.cardiovascular.positive,
        negativeInfluences: factors.cardiovascular.negative,
      },
    },
  };
}






