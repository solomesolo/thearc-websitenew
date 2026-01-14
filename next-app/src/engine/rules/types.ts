/**
 * Rules Engine Types
 * 
 * Defines the structure for versioned, deterministic rules that map
 * feature combinations to effects (patterns, tags, themes, etc.)
 */

import { FeatureId, RuleEffect, RuleId } from "../types";

export type Predicate =
  | { op: "eq"; feature: FeatureId; value: string }
  | { op: "in"; feature: FeatureId; values: string[] }
  | { op: "gte"; feature: FeatureId; bucket: "LOW" | "MED" | "HIGH" }
  | { op: "and"; all: Predicate[] }
  | { op: "or"; any: Predicate[] }
  | { op: "not"; pred: Predicate };

export type Rule = {
  id: RuleId;
  description: string; // dev-only, for debugging
  when: Predicate;
  then: RuleEffect[];
  priority: number; // Higher = more important, used for exclusive groups
  exclusiveGroup?: string; // If set, only highest priority rule in group fires
  evidenceFeatures?: FeatureId[]; // Features that support this rule (for provenance)
};






