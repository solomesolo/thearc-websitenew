/**
 * Rule Effects Extraction Utilities
 * 
 * Helper functions to extract specific effect types from rule evaluations.
 */

import { RuleEvaluation, RuleEffect } from "./types";

/**
 * Extract plan themes from rule effects
 */
export function extractRuleThemes(ruleEval: RuleEvaluation): Array<{ category: string; theme: string; weight: 1 | 2 | 3 }> {
  const themes: Array<{ category: string; theme: string; weight: 1 | 2 | 3 }> = [];
  
  for (const match of ruleEval.matches) {
    for (const effect of match.effects) {
      if (effect.type === "addPlanTheme") {
        themes.push({
          category: effect.category,
          theme: effect.theme,
          weight: effect.weight,
        });
      }
    }
  }
  
  // Sort by weight (desc) and deduplicate by category+theme
  const seen = new Set<string>();
  return themes
    .filter(t => {
      const key = `${t.category}:${t.theme}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => b.weight - a.weight);
}

/**
 * Extract roadmap modifiers from rule effects
 */
export function extractRoadmapModifiers(ruleEval: RuleEvaluation): Record<string, string> {
  const modifiers: Record<string, string> = {};
  
  for (const match of ruleEval.matches) {
    for (const effect of match.effects) {
      if (effect.type === "roadmapModifier") {
        modifiers[effect.key] = effect.value;
      }
    }
  }
  
  return modifiers;
}

/**
 * Extract persona tags from rule effects
 */
export function extractPersonaTags(ruleEval: RuleEvaluation): string[] {
  const tags: string[] = [];
  const seen = new Set<string>();
  
  for (const match of ruleEval.matches) {
    for (const effect of match.effects) {
      if (effect.type === "addPersonaTag") {
        if (!seen.has(effect.tag)) {
          tags.push(effect.tag);
          seen.add(effect.tag);
        }
      }
    }
  }
  
  return tags;
}

/**
 * Get top evidence features from rule evaluation (stable ordering)
 */
export function topEvidenceFeatures(ruleEval: RuleEvaluation, limit: number = 6): string[] {
  const featureCounts = new Map<string, number>();
  
  for (const match of ruleEval.matches) {
    for (const featureId of match.evidenceFeatures) {
      featureCounts.set(featureId, (featureCounts.get(featureId) || 0) + 1);
    }
  }
  
  // Sort by count (desc) then by id (asc) for deterministic ordering
  return Array.from(featureCounts.entries())
    .sort((a, b) => {
      const countDiff = b[1] - a[1];
      if (countDiff !== 0) return countDiff;
      return a[0].localeCompare(b[0]);
    })
    .slice(0, limit)
    .map(([featureId]) => featureId);
}






