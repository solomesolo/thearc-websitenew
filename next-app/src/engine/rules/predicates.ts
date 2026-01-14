/**
 * Predicate Evaluation
 * 
 * Evaluates predicates against feature maps deterministically.
 */

import { FeatureMap, FeatureValue } from "../types";
import { Predicate } from "./types";

function bucketRank(v: string): number {
  if (v === "HIGH") return 3;
  if (v === "MED") return 2;
  if (v === "LOW") return 1;
  if (v === "NONE") return 0;
  return 0;
}

function readValue(features: FeatureMap, feature: string): FeatureValue | undefined {
  return features[feature];
}

export function evalPredicate(p: Predicate, features: FeatureMap): boolean {
  switch (p.op) {
    case "eq": {
      const fv = readValue(features, p.feature);
      if (!fv) return false;
      if (fv.kind === "enum") return fv.value === p.value;
      if (fv.kind === "bucket") return fv.value === p.value;
      if (fv.kind === "boolean") return String(fv.value) === p.value;
      return false;
    }
    case "in": {
      const fv = readValue(features, p.feature);
      if (!fv) return false;
      if (fv.kind === "enum") return p.values.includes(fv.value);
      if (fv.kind === "bucket") return p.values.includes(fv.value);
      if (fv.kind === "set") {
        // Check if any value in the set matches
        return fv.value.some(v => p.values.includes(v));
      }
      return false;
    }
    case "gte": {
      const fv = readValue(features, p.feature);
      if (!fv || fv.kind !== "bucket") return false;
      return bucketRank(fv.value) >= bucketRank(p.bucket);
    }
    case "and":
      return p.all.every(x => evalPredicate(x, features));
    case "or":
      return p.any.some(x => evalPredicate(x, features));
    case "not":
      return !evalPredicate(p.pred, features);
    default:
      return false;
  }
}






