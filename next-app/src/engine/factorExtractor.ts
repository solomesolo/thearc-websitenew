/**
 * Factor Extractor Utility
 * 
 * Processes user answers against factor mappings to extract positive and negative
 * influences for each health domain. This is a deterministic, pure function.
 */

import { FactorMapping, DomainId, InfluenceType } from './metadata/factorMap';
import { TRAVELER_FACTOR_MAPPINGS } from './metadata/factorMap';

export interface DomainFactors {
  positive: string[]; // Array of labelKeys
  negative: string[]; // Array of labelKeys
}

export interface ExtractedFactors {
  [domainId: string]: DomainFactors;
}

/**
 * Check if an option value matches a mapping condition
 */
function matchesMapping(
  mapping: FactorMapping,
  userAnswer: any,
  allAnswers: Record<string, any>
): boolean {
  const { optionValue, condition } = mapping;
  
  // Handle function-based matching
  if (typeof optionValue === 'function') {
    const matches = optionValue(userAnswer);
    if (!matches) return false;
    
    // Apply additional condition if present
    if (condition) {
      return condition(userAnswer, allAnswers);
    }
    return true;
  }
  
  // Handle array-based matching (for checkbox questions)
  if (Array.isArray(optionValue)) {
    if (Array.isArray(userAnswer)) {
      return optionValue.some(opt => userAnswer.includes(opt));
    }
    return optionValue.includes(userAnswer);
  }
  
  // Handle string-based matching
  if (typeof optionValue === 'string') {
    if (Array.isArray(userAnswer)) {
      return userAnswer.includes(optionValue);
    }
    return userAnswer === optionValue;
  }
  
  return false;
}

/**
 * Extract factors from user answers based on factor mappings
 * 
 * @param userAnswers - Raw user answers from questionnaire (UI format: "BG1", "T2", etc.)
 * @param mappings - Factor mappings to use (defaults to TRAVELER_FACTOR_MAPPINGS)
 * @returns Extracted factors grouped by domain
 */
export function extractFactors(
  userAnswers: Record<string, any>,
  mappings: FactorMapping[] = TRAVELER_FACTOR_MAPPINGS
): ExtractedFactors {
  const factors: ExtractedFactors = {
    immune: { positive: [], negative: [] },
    metabolism: { positive: [], negative: [] },
    longevity: { positive: [], negative: [] },
    cardiovascular: { positive: [], negative: [] },
  };
  
  // Iterate through all mappings
  for (const mapping of mappings) {
    const { questionId, domain, influence, labelKey } = mapping;
    const userAnswer = userAnswers[questionId];
    
    // Skip if question wasn't answered
    if (userAnswer === undefined || userAnswer === null) {
      continue;
    }
    
    // Check if this mapping matches the user's answer
    if (matchesMapping(mapping, userAnswer, userAnswers)) {
      // Add the labelKey to the appropriate domain and influence array
      const domainFactors = factors[domain];
      if (influence === 'positive') {
        // Avoid duplicates
        if (!domainFactors.positive.includes(labelKey)) {
          domainFactors.positive.push(labelKey);
        }
      } else {
        // Avoid duplicates
        if (!domainFactors.negative.includes(labelKey)) {
          domainFactors.negative.push(labelKey);
        }
      }
    }
  }
  
  return factors;
}

/**
 * Get factors for a specific domain
 */
export function getFactorsForDomain(
  userAnswers: Record<string, any>,
  domain: DomainId,
  mappings: FactorMapping[] = TRAVELER_FACTOR_MAPPINGS
): DomainFactors {
  const allFactors = extractFactors(userAnswers, mappings);
  return allFactors[domain] || { positive: [], negative: [] };
}

/**
 * Count total factors (positive + negative) for a domain
 */
export function countDomainFactors(factors: DomainFactors): number {
  return factors.positive.length + factors.negative.length;
}






