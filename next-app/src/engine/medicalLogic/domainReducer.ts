/**
 * Domain Reducer
 * 
 * Implements the Hierarchical Systemic Tax algorithm:
 * 1. Baseline starts at 100
 * 2. Primary impact from matched nodes
 * 3. Systemic multipliers (CNS taxes)
 * 4. Safety clamps (red flags)
 */

import { DomainScore, CNSMultipliers, DomainId } from './types';
import { MedicalNode } from './types';
import { getSystemicMultiplier } from './cnsMultipliers';
import { findMatchingNodes } from './nodeMatcher';

/**
 * Calculate domain score using the Hierarchical Systemic Tax algorithm
 */
export function reduceDomain(
  domain: DomainId,
  matchedNodes: MedicalNode[],
  cnsMultipliers: CNSMultipliers
): DomainScore {
  // Step 1: Baseline starts at 100
  const baseline = 100;
  
  // Step 2: Calculate primary impact (sum of impactWeights)
  let primaryImpact = 0;
  let hasRedFlag = false;
  
  // Separate positive and negative impacts
  const positiveImpacts: number[] = [];
  const negativeImpacts: number[] = [];
  
  for (const node of matchedNodes) {
    if (node.logic.targetDomain !== domain) continue;
    
    if (node.logic.isRedFlag) {
      hasRedFlag = true;
    }
    
    if (node.logic.impactWeight > 0) {
      positiveImpacts.push(node.logic.impactWeight);
    } else {
      negativeImpacts.push(node.logic.impactWeight);
    }
  }
  
  // Apply systemic multipliers to negative impacts
  const systemicMultiplier = getSystemicMultiplier(domain, cnsMultipliers);
  const adjustedNegativeImpacts = negativeImpacts.map(weight => 
    weight * systemicMultiplier
  );
  
  // Sum all impacts
  primaryImpact = positiveImpacts.reduce((sum, w) => sum + w, 0) +
                  adjustedNegativeImpacts.reduce((sum, w) => sum + w, 0);
  
  // Step 3: Calculate final score
  let finalScore = baseline + primaryImpact;
  
  // Step 4: Safety clamp - Red flags cap score at 20
  if (hasRedFlag) {
    finalScore = Math.min(finalScore, 20);
  }
  
  // Clamp to 0-100 range
  finalScore = Math.max(0, Math.min(100, Math.round(finalScore)));
  
  // Calculate systemic multipliers for reporting
  const systemicMultipliers = {
    cortisolTax: domain === 'metabolism' && cnsMultipliers.cortisol < 50 ? systemicMultiplier : undefined,
    stressTax: domain === 'immune' && cnsMultipliers.stress < 50 ? systemicMultiplier : undefined,
    sleepTax: domain === 'longevity' && cnsMultipliers.sleep < 50 ? systemicMultiplier : undefined,
    recoveryTax: domain === 'cardiovascular' && cnsMultipliers.recovery < 50 ? systemicMultiplier : undefined,
  };
  
  return {
    domain,
    score: finalScore,
    baseline,
    primaryImpact: Math.round(primaryImpact * 100) / 100, // Round to 2 decimals
    systemicMultipliers,
    finalScore,
    isRedFlagTriggered: hasRedFlag,
  };
}

/**
 * Reduce all domains
 */
export function reduceAllDomains(
  matchedNodes: MedicalNode[],
  cnsMultipliers: CNSMultipliers
): {
  immune: DomainScore;
  metabolism: DomainScore;
  longevity: DomainScore;
  cardiovascular: DomainScore;
} {
  return {
    immune: reduceDomain('immune', matchedNodes, cnsMultipliers),
    metabolism: reduceDomain('metabolism', matchedNodes, cnsMultipliers),
    longevity: reduceDomain('longevity', matchedNodes, cnsMultipliers),
    cardiovascular: reduceDomain('cardiovascular', matchedNodes, cnsMultipliers),
  };
}






