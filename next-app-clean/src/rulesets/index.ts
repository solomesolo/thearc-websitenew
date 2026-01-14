/**
 * Ruleset Registry
 * 
 * Central registry for versioned rulesets by persona.
 */

import { Rule } from "../engine/rules/types";
import { travellerFreeScreeningRules_v1 } from "./traveller_free_screening/v1";

export function getRuleset(personaId: string): Rule[] {
  // Map persona IDs to their rulesets
  if (personaId === "traveler" || personaId === "traveller_free_screening") {
    return travellerFreeScreeningRules_v1;
  }
  
  // Default: empty ruleset
  return [];
}






