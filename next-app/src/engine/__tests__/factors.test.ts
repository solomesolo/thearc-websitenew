/**
 * Deterministic Tests for Factor Extraction System
 * 
 * Tests ensure that:
 * 1. Factor extraction is deterministic (same input = same output)
 * 2. No hardcoded strings are returned (only labelKeys)
 * 3. Factors are correctly mapped to domains
 * 4. Positive and negative influences are correctly identified
 */

import { extractFactors, getFactorsForDomain } from '../factorExtractor';
import { TRAVELER_FACTOR_MAPPINGS } from '../metadata/factorMap';
import { DomainId } from '../types';

describe('Factor Extraction System', () => {
  describe('extractFactors', () => {
    it('should return empty factors for empty answers', () => {
      const answers = {};
      const factors = extractFactors(answers);
      
      expect(factors.immune.positive).toEqual([]);
      expect(factors.immune.negative).toEqual([]);
      expect(factors.metabolism.positive).toEqual([]);
      expect(factors.metabolism.negative).toEqual([]);
      expect(factors.longevity.positive).toEqual([]);
      expect(factors.longevity.negative).toEqual([]);
      expect(factors.cardiovascular.positive).toEqual([]);
      expect(factors.cardiovascular.negative).toEqual([]);
    });

    it('should extract positive immune factor for high micronutrient intake (N2 >= 5 servings)', () => {
      const answers = {
        N2: '5–7', // 5-7 servings
      };
      const factors = extractFactors(answers);
      
      expect(factors.immune.positive).toContain('factor_high_micronutrients');
      expect(factors.immune.negative).not.toContain('factor_high_micronutrients');
    });

    it('should extract negative immune factor for high travel frequency (T2 > 10 trips)', () => {
      const answers = {
        T2: 'More than 10 times',
      };
      const factors = extractFactors(answers);
      
      expect(factors.immune.negative).toContain('factor_high_viral_exposure');
      expect(factors.immune.positive).not.toContain('factor_high_viral_exposure');
    });

    it('should extract positive immune factor for optimal CRP markers', () => {
      const answers = {
        LAB2: ['CRP - Within last year (normal)'],
      };
      const factors = extractFactors(answers);
      
      expect(factors.immune.positive).toContain('factor_optimal_inflammation_markers');
    });

    it('should extract negative immune factor for elevated CRP markers', () => {
      const answers = {
        LAB2: ['CRP - Within last year (abnormal)'],
      };
      const factors = extractFactors(answers);
      
      expect(factors.immune.negative).toContain('factor_elevated_inflammation');
    });

    it('should extract positive metabolism factor for high activity (M1 >= 3-4 days)', () => {
      const answers = {
        M1: '3–4 days',
      };
      const factors = extractFactors(answers);
      
      expect(factors.metabolism.positive).toContain('factor_metabolic_flexibility');
    });

    it('should extract negative metabolism factor for sedentary behavior (T3 > 8 hours)', () => {
      const answers = {
        T3: '>8 hours',
      };
      const factors = extractFactors(answers);
      
      expect(factors.metabolism.negative).toContain('factor_sedentary_stasis');
    });

    it('should extract negative metabolism factor for diabetes diagnosis', () => {
      const answers = {
        BG5: ['Prediabetes or diabetes'],
      };
      const factors = extractFactors(answers);
      
      expect(factors.metabolism.negative).toContain('factor_diabetes_risk');
    });

    it('should extract positive metabolism factor for optimal glucose control', () => {
      const answers = {
        LAB2: ['Blood glucose / HbA1c - Within last year (normal)'],
      };
      const factors = extractFactors(answers);
      
      expect(factors.metabolism.positive).toContain('factor_optimal_glucose_control');
    });

    it('should extract negative metabolism factor for glucose dysregulation', () => {
      const answers = {
        LAB2: ['Blood glucose / HbA1c - Within last year (abnormal)'],
      };
      const factors = extractFactors(answers);
      
      expect(factors.metabolism.negative).toContain('factor_glucose_dysregulation');
    });

    it('should extract positive longevity factor for high recovery frequency (M2 >= 5-6 days)', () => {
      const answers = {
        M2: '5–6 days',
      };
      const factors = extractFactors(answers);
      
      expect(factors.longevity.positive).toContain('factor_high_resilience');
    });

    it('should extract negative longevity factor for genetic predisposition', () => {
      const answers = {
        BG6: ['Dementia or neurodegenerative disease'],
      };
      const factors = extractFactors(answers);
      
      expect(factors.longevity.negative).toContain('factor_genetic_predisposition');
    });

    it('should extract positive longevity factor for high micronutrient intake', () => {
      const answers = {
        N2: '8 or more',
      };
      const factors = extractFactors(answers);
      
      expect(factors.longevity.positive).toContain('factor_high_micronutrients');
    });

    it('should extract negative cardiovascular factor for hypertension', () => {
      const answers = {
        BG5: ['High blood pressure'],
      };
      const factors = extractFactors(answers);
      
      expect(factors.cardiovascular.negative).toContain('factor_hypertension_load');
    });

    it('should extract negative cardiovascular factor for high cholesterol', () => {
      const answers = {
        BG5: ['High cholesterol'],
      };
      const factors = extractFactors(answers);
      
      expect(factors.cardiovascular.negative).toContain('factor_high_cholesterol');
    });

    it('should extract negative cardiovascular factor for family cardiac history', () => {
      const answers = {
        BG6: ['Heart disease or stroke'],
      };
      const factors = extractFactors(answers);
      
      expect(factors.cardiovascular.negative).toContain('factor_family_cardiac_history');
    });

    it('should extract positive cardiovascular factor for optimal lipid profile', () => {
      const answers = {
        LAB2: ['Cholesterol / Lipids - Within last year (normal)'],
      };
      const factors = extractFactors(answers);
      
      expect(factors.cardiovascular.positive).toContain('factor_optimal_lipid_profile');
    });

    it('should extract negative cardiovascular factor for dyslipidemia', () => {
      const answers = {
        LAB2: ['Cholesterol / Lipids - Within last year (abnormal)'],
      };
      const factors = extractFactors(answers);
      
      expect(factors.cardiovascular.negative).toContain('factor_dyslipidemia');
    });

    it('should be deterministic - same input produces same output', () => {
      const answers = {
        N2: '5–7',
        T2: 'More than 10 times',
        M1: '3–4 days',
        BG5: ['High blood pressure'],
      };
      
      const factors1 = extractFactors(answers);
      const factors2 = extractFactors(answers);
      
      expect(factors1).toEqual(factors2);
    });

    it('should not return hardcoded strings - only labelKeys', () => {
      const answers = {
        N2: '5–7',
        T2: 'More than 10 times',
        M1: 'Daily',
        BG5: ['High blood pressure', 'High cholesterol'],
        BG6: ['Heart disease or stroke'],
        LAB2: ['CRP - Within last year (normal)', 'Cholesterol / Lipids - Within last year (normal)'],
      };
      
      const factors = extractFactors(answers);
      
      // Check that all returned values are labelKeys (start with 'factor_')
      const allFactors = [
        ...factors.immune.positive,
        ...factors.immune.negative,
        ...factors.metabolism.positive,
        ...factors.metabolism.negative,
        ...factors.longevity.positive,
        ...factors.longevity.negative,
        ...factors.cardiovascular.positive,
        ...factors.cardiovascular.negative,
      ];
      
      allFactors.forEach(factor => {
        expect(factor).toMatch(/^factor_/);
        // Ensure it's not a hardcoded display string
        expect(factor).not.toMatch(/[A-Z][a-z]+ [a-z]+/); // No capitalized words (like "High micronutrient")
      });
    });

    it('should handle multiple factors in the same domain', () => {
      const answers = {
        N2: '8 or more', // Positive immune factor
        T2: 'More than 10 times', // Negative immune factor
        LAB2: ['CRP - Within last year (normal)'], // Positive immune factor
      };
      
      const factors = extractFactors(answers);
      
      expect(factors.immune.positive.length).toBeGreaterThan(1);
      expect(factors.immune.negative.length).toBeGreaterThan(0);
      expect(factors.immune.positive).toContain('factor_high_micronutrients');
      expect(factors.immune.positive).toContain('factor_optimal_inflammation_markers');
      expect(factors.immune.negative).toContain('factor_high_viral_exposure');
    });

    it('should not duplicate factors', () => {
      const answers = {
        N2: '5–7',
      };
      
      const factors = extractFactors(answers);
      
      // N2 contributes to both immune and longevity
      const immunePositives = factors.immune.positive.filter(f => f === 'factor_high_micronutrients');
      const longevityPositives = factors.longevity.positive.filter(f => f === 'factor_high_micronutrients');
      
      // Should appear once in each domain
      expect(immunePositives.length).toBe(1);
      expect(longevityPositives.length).toBe(1);
    });
  });

  describe('getFactorsForDomain', () => {
    it('should return factors for a specific domain', () => {
      const answers = {
        N2: '5–7',
        T2: 'More than 10 times',
        M1: '3–4 days',
      };
      
      const immuneFactors = getFactorsForDomain(answers, 'immune');
      
      expect(immuneFactors.positive).toContain('factor_high_micronutrients');
      expect(immuneFactors.negative).toContain('factor_high_viral_exposure');
    });

    it('should return empty factors for domain with no matches', () => {
      const answers = {
        M1: '3–4 days', // Only metabolism factor
      };
      
      const cardiovascularFactors = getFactorsForDomain(answers, 'cardiovascular');
      
      expect(cardiovascularFactors.positive).toEqual([]);
      expect(cardiovascularFactors.negative).toEqual([]);
    });
  });

  describe('Factor Mapping Coverage', () => {
    it('should have mappings for all required question IDs', () => {
      const requiredQuestions = ['BG5', 'BG6', 'T2', 'T3', 'M1', 'M2', 'N2', 'LAB2'];
      const mappedQuestions = new Set(TRAVELER_FACTOR_MAPPINGS.map(m => m.questionId));
      
      requiredQuestions.forEach(questionId => {
        expect(mappedQuestions.has(questionId)).toBe(true);
      });
    });

    it('should have mappings for all four domains', () => {
      const domains = new Set(TRAVELER_FACTOR_MAPPINGS.map(m => m.domain));
      
      expect(domains.has('immune')).toBe(true);
      expect(domains.has('metabolism')).toBe(true);
      expect(domains.has('longevity')).toBe(true);
      expect(domains.has('cardiovascular')).toBe(true);
    });

    it('should have both positive and negative influences for each domain', () => {
      const domainInfluences: Record<DomainId, { positive: number; negative: number }> = {
        immune: { positive: 0, negative: 0 },
        metabolism: { positive: 0, negative: 0 },
        longevity: { positive: 0, negative: 0 },
        cardiovascular: { positive: 0, negative: 0 },
      };
      
      TRAVELER_FACTOR_MAPPINGS.forEach(mapping => {
        if (mapping.influence === 'positive') {
          domainInfluences[mapping.domain].positive++;
        } else {
          domainInfluences[mapping.domain].negative++;
        }
      });
      
      // Each domain should have at least one positive and one negative factor
      Object.entries(domainInfluences).forEach(([domain, counts]) => {
        expect(counts.positive).toBeGreaterThan(0);
        expect(counts.negative).toBeGreaterThan(0);
      });
    });
  });
});






