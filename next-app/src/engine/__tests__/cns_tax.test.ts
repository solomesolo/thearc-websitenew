/**
 * CNS Tax System Tests
 * 
 * Tests verify that the systemic tax multipliers work correctly:
 * - Poor sleep correctly "taxes" the Cardiovascular score even if BP is normal
 * - Stress taxes Immune domain
 * - Cortisol taxes Metabolism domain
 */

import { analyzeDomainsWithMedicalLogic } from '../medicalLogic/engine';
import { TRAVELER_MEDICAL_REGISTRY } from '../medicalLogic/registry';
import { TravelerKeyMetricResult } from '../types';

describe('CNS Tax System', () => {
  describe('Poor sleep taxes Cardiovascular domain', () => {
    it('should apply sleep tax to cardiovascular when sleep is poor and BP is normal', () => {
      // Setup: Normal BP but poor sleep
      const userAnswers = {
        BG5: ['None of the above'], // No high BP
        BG6: ['None of the above'], // No family cardiac history
        LAB2: ['Cholesterol / Lipids - Within last year (normal)'], // Normal lipids
        F2: 'Sometimes', // Some energy limits
      };
      
      // Create key metrics with poor sleep (low score = high cortisol tax)
      const keyMetrics: TravelerKeyMetricResult[] = [
        {
          id: 'stress_load',
          score: 60, // Moderate stress
          band: 'MODERATE',
          travelTags: [],
          causes: [],
          description: '',
        },
        {
          id: 'sleep_circadian',
          score: 30, // POOR sleep (low score = high cortisol)
          band: 'POOR',
          travelTags: [],
          causes: [],
          description: '',
        },
        {
          id: 'energy_recovery',
          score: 50, // Moderate recovery
          band: 'MODERATE',
          travelTags: [],
          causes: [],
          description: '',
        },
        {
          id: 'mobility_physical',
          score: 50,
          band: 'MODERATE',
          travelTags: [],
          causes: [],
          description: '',
        },
      ];
      
      const result = analyzeDomainsWithMedicalLogic(
        userAnswers,
        TRAVELER_MEDICAL_REGISTRY,
        keyMetrics
      );
      
      // Cardiovascular should be taxed because:
      // - Sleep pillar (30) < 50, so recovery tax multiplier applies
      // - F2 energy limits has -18 weight
      // - With 1.2x multiplier on negative weights, the impact should be greater
      expect(result.cardiovascular.score).toBeLessThan(100);
      expect(result.cardiovascular.systemicMultipliers.recoveryTax).toBe(1.2);
      
      // Verify the score calculation
      // Baseline: 100
      // F2 (Sometimes): -18 * 1.2 (recovery tax) = -21.6
      // Normal lipids: +20
      // Expected: ~98 (rounded)
      expect(result.cardiovascular.finalScore).toBeGreaterThan(70);
      expect(result.cardiovascular.finalScore).toBeLessThan(100);
    });
  });
  
  describe('Cortisol tax on Metabolism domain', () => {
    it('should apply 1.5x multiplier to negative weights in Metabolism when Cortisol Pillar < 50', () => {
      const userAnswers = {
        S1: 'Often', // Poor sleep onset (triggers nocturnal cortisol)
        T3: '>8 hours', // Long sitting
        M1: '0 days', // No movement
        BG5: ['None of the above'], // No diabetes
      };
      
      // Create key metrics with poor sleep (low cortisol pillar)
      const keyMetrics: TravelerKeyMetricResult[] = [
        {
          id: 'stress_load',
          score: 50,
          band: 'MODERATE',
          travelTags: [],
          causes: [],
          description: '',
        },
        {
          id: 'sleep_circadian',
          score: 30, // POOR sleep = high cortisol (pillar < 50)
          band: 'POOR',
          travelTags: [],
          causes: [],
          description: '',
        },
        {
          id: 'energy_recovery',
          score: 50,
          band: 'MODERATE',
          travelTags: [],
          causes: [],
          description: '',
        },
        {
          id: 'mobility_physical',
          score: 50,
          band: 'MODERATE',
          travelTags: [],
          causes: [],
          description: '',
        },
      ];
      
      const result = analyzeDomainsWithMedicalLogic(
        userAnswers,
        TRAVELER_MEDICAL_REGISTRY,
        keyMetrics
      );
      
      // Metabolism should have cortisol tax applied
      expect(result.metabolism.systemicMultipliers.cortisolTax).toBe(1.5);
      
      // S1 (Often): -25 base weight
      // T3 (>8 hours): -15 base weight
      // With 1.5x multiplier: (-25 - 15) * 1.5 = -60
      // Baseline: 100
      // Expected score: 100 - 60 = 40
      expect(result.metabolism.finalScore).toBeLessThan(50);
      expect(result.metabolism.primaryImpact).toBeLessThan(0);
    });
  });
  
  describe('Stress tax on Immune domain', () => {
    it('should apply 1.3x multiplier to negative weights in Immune when Stress Pillar < 50', () => {
      const userAnswers = {
        T2: 'More than 10 times', // High travel frequency
        N2: 'Less than 1', // Low vegetable intake
        R2: 'Yes', // Mood/stress impairs function
      };
      
      // Create key metrics with high stress (low stress pillar)
      const keyMetrics: TravelerKeyMetricResult[] = [
        {
          id: 'stress_load',
          score: 30, // HIGH stress (low score = high stress tax)
          band: 'HIGH',
          travelTags: [],
          causes: [],
          description: '',
        },
        {
          id: 'sleep_circadian',
          score: 50,
          band: 'MODERATE',
          travelTags: [],
          causes: [],
          description: '',
        },
        {
          id: 'energy_recovery',
          score: 50,
          band: 'MODERATE',
          travelTags: [],
          causes: [],
          description: '',
        },
        {
          id: 'mobility_physical',
          score: 50,
          band: 'MODERATE',
          travelTags: [],
          causes: [],
          description: '',
        },
      ];
      
      const result = analyzeDomainsWithMedicalLogic(
        userAnswers,
        TRAVELER_MEDICAL_REGISTRY,
        keyMetrics
      );
      
      // Immune should have stress tax applied
      expect(result.immune.systemicMultipliers.stressTax).toBe(1.3);
      
      // T2 (More than 10 times): -15 base weight
      // R2 (Yes): -20 base weight
      // With 1.3x multiplier: (-15 - 20) * 1.3 = -45.5
      // Baseline: 100
      // Expected score: ~54
      expect(result.immune.finalScore).toBeLessThan(60);
      expect(result.immune.primaryImpact).toBeLessThan(0);
    });
  });
  
  describe('Red flag safety clamp', () => {
    it('should cap domain score at 20 when red flag is triggered', () => {
      const userAnswers = {
        R1: 'Yes', // Chest pain/breathless/dizzy - red flag
        BG5: ['High blood pressure'], // Also has hypertension
      };
      
      const keyMetrics: TravelerKeyMetricResult[] = [
        {
          id: 'stress_load',
          score: 50,
          band: 'MODERATE',
          travelTags: [],
          causes: [],
          description: '',
        },
        {
          id: 'sleep_circadian',
          score: 50,
          band: 'MODERATE',
          travelTags: [],
          causes: [],
          description: '',
        },
        {
          id: 'energy_recovery',
          score: 50,
          band: 'MODERATE',
          travelTags: [],
          causes: [],
          description: '',
        },
        {
          id: 'mobility_physical',
          score: 50,
          band: 'MODERATE',
          travelTags: [],
          causes: [],
          description: '',
        },
      ];
      
      const result = analyzeDomainsWithMedicalLogic(
        userAnswers,
        TRAVELER_MEDICAL_REGISTRY,
        keyMetrics
      );
      
      // Cardiovascular should be capped at 20 due to red flag
      expect(result.cardiovascular.isRedFlagTriggered).toBe(true);
      expect(result.cardiovascular.finalScore).toBeLessThanOrEqual(20);
    });
  });
  
  describe('Factor resolution', () => {
    it('should return top 2 positive and top 2 negative factor IDs', () => {
      const userAnswers = {
        N2: '8 or more', // High vegetable intake (positive)
        T2: 'More than 10 times', // High travel (negative)
        R2: 'Yes', // Stress impairs function (negative)
        LAB2: ['CRP - Within last year (normal)'], // Normal CRP (positive)
      };
      
      const keyMetrics: TravelerKeyMetricResult[] = [
        {
          id: 'stress_load',
          score: 50,
          band: 'MODERATE',
          travelTags: [],
          causes: [],
          description: '',
        },
        {
          id: 'sleep_circadian',
          score: 50,
          band: 'MODERATE',
          travelTags: [],
          causes: [],
          description: '',
        },
        {
          id: 'energy_recovery',
          score: 50,
          band: 'MODERATE',
          travelTags: [],
          causes: [],
          description: '',
        },
        {
          id: 'mobility_physical',
          score: 50,
          band: 'MODERATE',
          travelTags: [],
          causes: [],
          description: '',
        },
      ];
      
      const result = analyzeDomainsWithMedicalLogic(
        userAnswers,
        TRAVELER_MEDICAL_REGISTRY,
        keyMetrics
      );
      
      // Immune domain should have factors
      expect(result.factors.immune.positive.length).toBeGreaterThan(0);
      expect(result.factors.immune.negative.length).toBeGreaterThan(0);
      
      // Should contain expected factor IDs (not hardcoded strings)
      expect(result.factors.immune.positive).toContain('HIGH_MICRONUTRIENT_IMMUNE_SUPPORT');
      expect(result.factors.immune.positive).toContain('OPTIMAL_INFLAMMATION_MARKERS');
      expect(result.factors.immune.negative).toContain('HIGH_TRAVEL_IMMUNE_LOAD');
      expect(result.factors.immune.negative).toContain('CHRONIC_STRESS_HPA_SUPPRESSION');
    });
  });
  
  describe('Deterministic behavior', () => {
    it('should produce the same results for the same inputs', () => {
      const userAnswers = {
        T2: '7–10 times',
        N2: '5–7',
        S1: 'Often',
        BG5: ['High blood pressure'],
      };
      
      const keyMetrics: TravelerKeyMetricResult[] = [
        {
          id: 'stress_load',
          score: 40,
          band: 'MODERATE',
          travelTags: [],
          causes: [],
          description: '',
        },
        {
          id: 'sleep_circadian',
          score: 35,
          band: 'POOR',
          travelTags: [],
          causes: [],
          description: '',
        },
        {
          id: 'energy_recovery',
          score: 45,
          band: 'MODERATE',
          travelTags: [],
          causes: [],
          description: '',
        },
        {
          id: 'mobility_physical',
          score: 50,
          band: 'MODERATE',
          travelTags: [],
          causes: [],
          description: '',
        },
      ];
      
      const result1 = analyzeDomainsWithMedicalLogic(
        userAnswers,
        TRAVELER_MEDICAL_REGISTRY,
        keyMetrics
      );
      
      const result2 = analyzeDomainsWithMedicalLogic(
        userAnswers,
        TRAVELER_MEDICAL_REGISTRY,
        keyMetrics
      );
      
      // Results should be identical
      expect(result1.immune.finalScore).toBe(result2.immune.finalScore);
      expect(result1.metabolism.finalScore).toBe(result2.metabolism.finalScore);
      expect(result1.longevity.finalScore).toBe(result2.longevity.finalScore);
      expect(result1.cardiovascular.finalScore).toBe(result2.cardiovascular.finalScore);
      
      // Factors should be identical
      expect(result1.factors.immune.positive).toEqual(result2.factors.immune.positive);
      expect(result1.factors.immune.negative).toEqual(result2.factors.immune.negative);
    });
  });
});






