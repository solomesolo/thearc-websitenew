/**
 * Rules Evaluation Engine
 * 
 * Evaluates a ruleset against features and returns matched rules with effects.
 * Handles exclusive groups deterministically.
 */

import { FeatureMap, RuleEvaluation, RuleMatch } from "../types";
import { Rule } from "./types";
import { evalPredicate } from "./predicates";

export function evaluateRules(params: { features: FeatureMap; ruleset: Rule[] }): RuleEvaluation {
  const { features, ruleset } = params;

  // 1) Find all matches
  const allMatches: Array<{ match: RuleMatch; rule: Rule }> = ruleset
    .filter(r => evalPredicate(r.when, features))
    .map(r => ({
      match: {
        ruleId: r.id,
        effects: r.then,
        evidenceFeatures: r.evidenceFeatures ?? [],
      },
      rule: r,
    }));

  // 2) Sort by priority (desc) then id (asc) for deterministic ordering
  allMatches.sort((a, b) => {
    const priorityDiff = b.rule.priority - a.rule.priority;
    if (priorityDiff !== 0) return priorityDiff;
    return a.rule.id.localeCompare(b.rule.id);
  });

  // 3) Handle exclusive groups (keep only highest priority rule per group)
  const ruleMap = new Map<string, Rule>();
  ruleset.forEach(r => ruleMap.set(r.id, r));

  const byGroup = new Map<string, Array<{ match: RuleMatch; rule: Rule }>>();
  const ungrouped: Array<{ match: RuleMatch; rule: Rule }> = [];

  for (const item of allMatches) {
    const exclusiveGroup = item.rule.exclusiveGroup;
    if (exclusiveGroup) {
      if (!byGroup.has(exclusiveGroup)) {
        byGroup.set(exclusiveGroup, []);
      }
      byGroup.get(exclusiveGroup)!.push(item);
    } else {
      ungrouped.push(item);
    }
  }

  // For each exclusive group, keep only the first (highest priority) match
  const keep: RuleMatch[] = [];
  for (const groupMatches of byGroup.values()) {
    if (groupMatches.length > 0) {
      keep.push(groupMatches[0].match);
    }
  }
  
  // Add all ungrouped matches
  keep.push(...ungrouped.map(item => item.match));

  return { matches: keep };
}






