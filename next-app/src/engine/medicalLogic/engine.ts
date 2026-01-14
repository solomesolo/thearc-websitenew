/**
 * Medical Logic Engine
 * 
 * Main entry point for the CNS-driven biological domain analysis.
 * Pure function: (Answers, Registry, KeyMetrics) => AnalysisResult
 */

import { DomainAnalysisResult, MedicalLogicRegistry } from './types';
import { TravelerKeyMetricResult } from '../types';
import { findMatchingNodes } from './nodeMatcher';
import { calculateCNSMultipliers } from './cnsMultipliers';
import { reduceAllDomains } from './domainReducer';
import { resolveAllDomainFactors } from './factorResolver';

/**
 * Analyze user answers using the Medical Logic Registry
 * 
 * @param userAnswers - Raw UI answers (question IDs like "BG1", "T2", etc.)
 * @param registry - Medical logic registry
 * @param keyMetrics - Key metrics from the traveler engine (for CNS multipliers)
 * @returns Complete domain analysis with scores and factors
 */
export function analyzeDomainsWithMedicalLogic(
  userAnswers: Record<string, any>,
  registry: MedicalLogicRegistry,
  keyMetrics: TravelerKeyMetricResult[]
): DomainAnalysisResult {
  // Step 1: Find all matching nodes
  const matchedNodes = findMatchingNodes(registry.nodes, userAnswers);
  
  // Step 2: Calculate CNS multipliers from tax pillars
  const cnsMultipliers = calculateCNSMultipliers(keyMetrics);
  
  // Step 3: Reduce all domains (calculate scores with systemic taxes)
  const domainScores = reduceAllDomains(matchedNodes, cnsMultipliers);
  
  // Step 4: Resolve factors (positive/negative influences)
  const factors = resolveAllDomainFactors(matchedNodes);
  
  return {
    immune: domainScores.immune,
    metabolism: domainScores.metabolism,
    longevity: domainScores.longevity,
    cardiovascular: domainScores.cardiovascular,
    cnsMultipliers,
    factors,
  };
}






