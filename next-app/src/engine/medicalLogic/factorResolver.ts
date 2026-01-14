/**
 * Factor Resolver
 * 
 * Extracts positive and negative influences (factor IDs) for each domain.
 * Returns top-weighted factors sorted by absolute impactWeight.
 */

import { MedicalNode, DomainId } from './types';

export interface DomainFactors {
  positive: string[]; // Array of factorMetadata.id
  negative: string[]; // Array of factorMetadata.id
}

/**
 * Resolve factors for a specific domain
 * Returns top 2 positive and top 2 negative factor IDs
 */
export function resolveDomainFactors(
  domain: DomainId,
  matchedNodes: MedicalNode[]
): DomainFactors {
  // Filter nodes for this domain
  const domainNodes = matchedNodes.filter(node => node.logic.targetDomain === domain);
  
  // Separate positive and negative
  const positiveNodes: Array<{ id: string; weight: number }> = [];
  const negativeNodes: Array<{ id: string; weight: number }> = [];
  
  for (const node of domainNodes) {
    const factorId = node.factorMetadata.id;
    const weight = Math.abs(node.logic.impactWeight);
    
    if (node.factorMetadata.type === 'positive') {
      positiveNodes.push({ id: factorId, weight });
    } else {
      negativeNodes.push({ id: factorId, weight });
    }
  }
  
  // Sort by weight (descending) and take top 2
  const topPositive = positiveNodes
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 2)
    .map(n => n.id);
  
  const topNegative = negativeNodes
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 2)
    .map(n => n.id);
  
  return {
    positive: topPositive,
    negative: topNegative,
  };
}

/**
 * Resolve factors for all domains
 */
export function resolveAllDomainFactors(
  matchedNodes: MedicalNode[]
): {
  immune: DomainFactors;
  metabolism: DomainFactors;
  longevity: DomainFactors;
  cardiovascular: DomainFactors;
} {
  return {
    immune: resolveDomainFactors('immune', matchedNodes),
    metabolism: resolveDomainFactors('metabolism', matchedNodes),
    longevity: resolveDomainFactors('longevity', matchedNodes),
    cardiovascular: resolveDomainFactors('cardiovascular', matchedNodes),
  };
}






