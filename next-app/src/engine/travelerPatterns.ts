import { TravelerKeyMetricResult, TravelerWeeklyAction, TravelerSurveyAnswers, RuleEvaluation, DomainId } from './types';
import { getTravelerTags } from './travelerMappings';

/**
 * Pattern tags derived from rules, metric bands, and triggers for travelers
 * These are safe pattern-level identifiers that do not include raw user answers
 */
export type TravelerPatternTag =
  | "high_stress_persistence"
  | "sleep_circadian_disruption"
  | "travel_sleep_disruption"
  | "energy_instability"
  | "immune_vulnerability"
  | "mobility_strain"
  | "long_sit_strain"
  | "digestive_reactivity"
  | "cognitive_fatigue"
  | "nutrition_inconsistent"
  | "low_movement_base"
  | "screening_gap_core_labs"
  | "circadian_misalignment" // From rules
  | "metabolic_stasis" // From rules
  | "stress_recovery_gap" // From rules
  | "cardiometabolic_risk"; // From rules

export type TravelerPatternSummary = {
  tags: TravelerPatternTag[];
  severity: Record<TravelerPatternTag, 0 | 1 | 2 | 3>;
  dominantDomains: Array<"sleep"|"stress"|"energy"|"mobility"|"cognition"|"gut"|"immune"|"nutrition"|"screening">;
};

/**
 * Convert metric bands and causes to pattern tags for travelers
 */
function deriveTravelerPatternTags(
  keyMetrics: TravelerKeyMetricResult[],
  weeklyActions: TravelerWeeklyAction[],
  surveyAnswers: TravelerSurveyAnswers
): { tags: TravelerPatternTag[]; severity: Record<TravelerPatternTag, 0 | 1 | 2 | 3> } {
  const tags: TravelerPatternTag[] = [];
  const severity: Record<TravelerPatternTag, 0 | 1 | 2 | 3> = {
    high_stress_persistence: 0,
    sleep_circadian_disruption: 0,
    travel_sleep_disruption: 0,
    energy_instability: 0,
    immune_vulnerability: 0,
    mobility_strain: 0,
    long_sit_strain: 0,
    digestive_reactivity: 0,
    cognitive_fatigue: 0,
    nutrition_inconsistent: 0,
    low_movement_base: 0,
    screening_gap_core_labs: 0,
  };

  const travelTags = getTravelerTags(surveyAnswers);

  // Stress Load patterns
  const stressLoad = keyMetrics.find(m => m.id === "stress_load");
  if (stressLoad) {
    if (stressLoad.band === "HIGH") {
      tags.push("high_stress_persistence");
      severity.high_stress_persistence = 3;
    } else if (stressLoad.band === "MODERATE") {
      tags.push("high_stress_persistence");
      severity.high_stress_persistence = 2;
    }
  }

  // Sleep & Circadian patterns
  const sleepCircadian = keyMetrics.find(m => m.id === "sleep_circadian");
  if (sleepCircadian) {
    if (sleepCircadian.band === "POOR") {
      tags.push("sleep_circadian_disruption");
      severity.sleep_circadian_disruption = 3;
    } else if (sleepCircadian.band === "MODERATE") {
      tags.push("sleep_circadian_disruption");
      severity.sleep_circadian_disruption = 2;
    }
    
    // Check for travel-related sleep disruption
    const hasS4 = sleepCircadian.causes.some(c => c.questionId === "S4_scheduleDisruptsSleep");
    if (hasS4 || travelTags.includes("upcoming_travel")) {
      tags.push("travel_sleep_disruption");
      severity.travel_sleep_disruption = Math.max(severity.travel_sleep_disruption, 2);
    }
  }

  // Energy & Recovery patterns
  const energyRecovery = keyMetrics.find(m => m.id === "energy_recovery");
  if (energyRecovery) {
    if (energyRecovery.band === "ELEVATED") {
      tags.push("energy_instability");
      severity.energy_instability = 3;
    } else if (energyRecovery.band === "MODERATE") {
      tags.push("energy_instability");
      severity.energy_instability = 2;
    }
  }

  // Immune vulnerability
  if (surveyAnswers.IMM1_proneToSickDuringTravel === "Often" || surveyAnswers.IMM1_proneToSickDuringTravel === "Almost always") {
    tags.push("immune_vulnerability");
    severity.immune_vulnerability = 3;
  } else if (surveyAnswers.IMM1_proneToSickDuringTravel === "Sometimes") {
    tags.push("immune_vulnerability");
    severity.immune_vulnerability = 2;
  }

  // Mobility & Physical strain
  const mobilityPhysical = keyMetrics.find(m => m.id === "mobility_physical");
  if (mobilityPhysical) {
    if (mobilityPhysical.band === "POOR") {
      tags.push("mobility_strain");
      severity.mobility_strain = 3;
    } else if (mobilityPhysical.band === "MODERATE") {
      tags.push("mobility_strain");
      severity.mobility_strain = 2;
    }
  }

  // Long sitting strain
  if (travelTags.includes("long_sit") || surveyAnswers.BG10_sittingDuration === "6–8 hours" || surveyAnswers.BG10_sittingDuration === ">8 hours") {
    tags.push("long_sit_strain");
    severity.long_sit_strain = 3;
  }

  // Digestive patterns
  if (surveyAnswers.G1_digestiveDiscomfort === "Often" || surveyAnswers.G1_digestiveDiscomfort === "Almost always") {
    tags.push("digestive_reactivity");
    severity.digestive_reactivity = 3;
  } else if (surveyAnswers.G1_digestiveDiscomfort === "Sometimes") {
    tags.push("digestive_reactivity");
    severity.digestive_reactivity = 2;
  }

  // Cognitive patterns
  if (surveyAnswers.C1_loseTrack === "Often" || surveyAnswers.C1_loseTrack === "Almost always" ||
      surveyAnswers.C2_notSharpWhenTired === "Often" || surveyAnswers.C2_notSharpWhenTired === "Almost always") {
    tags.push("cognitive_fatigue");
    severity.cognitive_fatigue = 3;
  } else if (surveyAnswers.C1_loseTrack === "Sometimes" || surveyAnswers.C2_notSharpWhenTired === "Sometimes") {
    tags.push("cognitive_fatigue");
    severity.cognitive_fatigue = 2;
  }

  // Nutrition patterns
  if (surveyAnswers.L1_processedFoodsTravelDays === "Often" || surveyAnswers.L1_processedFoodsTravelDays === "Almost always") {
    tags.push("nutrition_inconsistent");
    severity.nutrition_inconsistent = 3;
  } else if (surveyAnswers.L1_processedFoodsTravelDays === "Sometimes") {
    tags.push("nutrition_inconsistent");
    severity.nutrition_inconsistent = 2;
  }

  // Movement patterns
  if (surveyAnswers.L2_20minMovement === "Rarely" || surveyAnswers.L2_20minMovement === "Never") {
    tags.push("low_movement_base");
    severity.low_movement_base = 3;
  } else if (surveyAnswers.L2_20minMovement === "Sometimes") {
    tags.push("low_movement_base");
    severity.low_movement_base = 2;
  }

  // Screening gaps
  if (surveyAnswers.LAB1_lastGeneralBloodTest === "Never" || surveyAnswers.LAB1_lastGeneralBloodTest === ">2 years ago") {
    tags.push("screening_gap_core_labs");
    severity.screening_gap_core_labs = 3;
  } else if (surveyAnswers.LAB1_lastGeneralBloodTest === "1–2 years ago") {
    tags.push("screening_gap_core_labs");
    severity.screening_gap_core_labs = 2;
  }

  return { tags: Array.from(new Set(tags)), severity };
}

/**
 * Determine dominant domains from pattern tags and metrics
 */
function determineTravelerDominantDomains(
  tags: TravelerPatternTag[],
  keyMetrics: TravelerKeyMetricResult[]
): Array<"sleep"|"stress"|"energy"|"mobility"|"cognition"|"gut"|"immune"|"nutrition"|"screening"> {
  const domainCounts: Record<string, number> = {
    sleep: 0,
    stress: 0,
    energy: 0,
    mobility: 0,
    cognition: 0,
    gut: 0,
    immune: 0,
    nutrition: 0,
    screening: 0,
  };

  // Map tags to domains
  tags.forEach(tag => {
    if (tag.includes("sleep") || tag.includes("circadian") || tag.includes("travel_sleep")) {
      domainCounts.sleep++;
    }
    if (tag.includes("stress")) {
      domainCounts.stress++;
    }
    if (tag.includes("energy") || tag.includes("instability")) {
      domainCounts.energy++;
    }
    if (tag.includes("mobility") || tag.includes("sit") || tag.includes("movement")) {
      domainCounts.mobility++;
    }
    if (tag.includes("cognitive")) {
      domainCounts.cognition++;
    }
    if (tag.includes("digestive") || tag.includes("gut")) {
      domainCounts.gut++;
    }
    if (tag.includes("immune")) {
      domainCounts.immune++;
    }
    if (tag.includes("nutrition")) {
      domainCounts.nutrition++;
    }
    if (tag.includes("screening")) {
      domainCounts.screening++;
    }
  });

  // Also check metric bands
  keyMetrics.forEach(metric => {
    if (metric.band === "HIGH" || metric.band === "POOR" || metric.band === "ELEVATED") {
      if (metric.id === "stress_load") domainCounts.stress += 2;
      if (metric.id === "sleep_circadian") domainCounts.sleep += 2;
      if (metric.id === "energy_recovery") domainCounts.energy += 2;
      if (metric.id === "mobility_physical") domainCounts.mobility += 2;
    }
  });

  // Return domains sorted by count (descending), take top 3-5
  const sorted = Object.entries(domainCounts)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([domain]) => domain as "sleep"|"stress"|"energy"|"mobility"|"cognition"|"gut"|"immune"|"nutrition"|"screening");

  return sorted.slice(0, 5);
}

/**
 * Extract patterns from rule effects
 */
function extractPatternsFromRules(ruleEval: RuleEvaluation): { tags: TravelerPatternTag[]; severity: Record<TravelerPatternTag, 0 | 1 | 2 | 3> } {
  const tags: TravelerPatternTag[] = [];
  const severity: Record<TravelerPatternTag, 0 | 1 | 2 | 3> = {
    high_stress_persistence: 0,
    sleep_circadian_disruption: 0,
    travel_sleep_disruption: 0,
    energy_instability: 0,
    immune_vulnerability: 0,
    mobility_strain: 0,
    long_sit_strain: 0,
    digestive_reactivity: 0,
    cognitive_fatigue: 0,
    nutrition_inconsistent: 0,
    low_movement_base: 0,
    screening_gap_core_labs: 0,
    circadian_misalignment: 0,
    metabolic_stasis: 0,
    stress_recovery_gap: 0,
    cardiometabolic_risk: 0,
  };

  // Process rule effects
  for (const match of ruleEval.matches) {
    for (const effect of match.effects) {
      if (effect.type === "addPattern") {
        const tag = effect.tag as TravelerPatternTag;
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
        // Set severity from rule (baseSeverity is 1-3, map to 0-3)
        severity[tag] = Math.max(severity[tag] || 0, effect.baseSeverity as 0 | 1 | 2 | 3);
      } else if (effect.type === "boostPattern") {
        const tag = effect.tag as TravelerPatternTag;
        if (tags.includes(tag)) {
          severity[tag] = Math.min(3, (severity[tag] || 0) + effect.delta) as 0 | 1 | 2 | 3;
        }
      }
    }
  }

  return { tags, severity };
}

/**
 * Boost pattern severity based on metric bands
 */
function boostPatternsFromMetricBands(
  tags: TravelerPatternTag[],
  severity: Record<TravelerPatternTag, 0 | 1 | 2 | 3>,
  metricBands: Record<string, string>
): void {
  // Map metric IDs to pattern tags
  const metricToPattern: Record<string, TravelerPatternTag[]> = {
    stress_load: ["high_stress_persistence", "stress_recovery_gap"],
    sleep_circadian: ["sleep_circadian_disruption", "circadian_misalignment", "travel_sleep_disruption"],
    energy_recovery: ["energy_instability"],
    mobility_physical: ["mobility_strain", "long_sit_strain"],
  };

  for (const [metricId, patternTags] of Object.entries(metricToPattern)) {
    const band = metricBands[metricId];
    if (!band) continue;

    const boost = band === "HIGH" || band === "POOR" || band === "ELEVATED" ? 1 : 0;
    for (const tag of patternTags) {
      if (tags.includes(tag) && severity[tag] < 3) {
        severity[tag] = Math.min(3, severity[tag] + boost) as 0 | 1 | 2 | 3;
      }
    }
  }
}

/**
 * Main function to derive pattern summary (RULES-DRIVEN)
 */
export function deriveTravelerPatternSummary(params: {
  metricBands: Record<string, string>;
  ruleEval: RuleEvaluation;
  weeklyActions?: TravelerWeeklyAction[];
  keyMetrics?: TravelerKeyMetricResult[]; // Optional for backward compatibility
}): TravelerPatternSummary {
  const { metricBands, ruleEval, weeklyActions = [], keyMetrics = [] } = params;

  // Step 1: Extract patterns primarily from rules
  const { tags, severity } = extractPatternsFromRules(ruleEval);

  // Step 2: Boost severity based on metric bands
  boostPatternsFromMetricBands(tags, severity, metricBands);

  // Step 3: Determine dominant domains from rules + metric bands
  const dominantDomains = determineDominantDomainsFromRules(ruleEval, metricBands, keyMetrics);

  return {
    tags: Array.from(new Set(tags)),
    severity,
    dominantDomains,
  };
}

/**
 * Determine dominant domains from rules, metric bands, and key metrics
 */
function determineDominantDomainsFromRules(
  ruleEval: RuleEvaluation,
  metricBands: Record<string, string>,
  keyMetrics: TravelerKeyMetricResult[]
): Array<"sleep"|"stress"|"energy"|"mobility"|"cognition"|"gut"|"immune"|"nutrition"|"screening"> {
  const domainWeights: Record<string, number> = {
    sleep: 0,
    stress: 0,
    energy: 0,
    mobility: 0,
    cognition: 0,
    gut: 0,
    immune: 0,
    nutrition: 0,
    screening: 0,
  };

  // Add weights from rule effects
  for (const match of ruleEval.matches) {
    for (const effect of match.effects) {
      if (effect.type === "addDomain") {
        const domain = effect.domain;
        if (domain in domainWeights) {
          domainWeights[domain] += effect.weight;
        }
      }
    }
  }

  // Add weights from metric bands
  const metricToDomain: Record<string, string> = {
    stress_load: "stress",
    sleep_circadian: "sleep",
    energy_recovery: "energy",
    mobility_physical: "mobility",
  };

  for (const [metricId, band] of Object.entries(metricBands)) {
    const domain = metricToDomain[metricId];
    if (domain && (band === "HIGH" || band === "POOR" || band === "ELEVATED")) {
      domainWeights[domain] += 2;
    }
  }

  // Return top 3-5 domains sorted by weight
  const sorted = Object.entries(domainWeights)
    .filter(([_, weight]) => weight > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([domain]) => domain as "sleep"|"stress"|"energy"|"mobility"|"cognition"|"gut"|"immune"|"nutrition"|"screening");

  return sorted.slice(0, 5);
}

/**
 * Legacy function for backward compatibility
 */
export function deriveTravelerPatternSummaryLegacy(
  keyMetrics: TravelerKeyMetricResult[],
  weeklyActions: TravelerWeeklyAction[],
  surveyAnswers: TravelerSurveyAnswers
): TravelerPatternSummary {
  const { tags, severity } = deriveTravelerPatternTags(keyMetrics, weeklyActions, surveyAnswers);
  const dominantDomains = determineTravelerDominantDomains(tags, keyMetrics);

  return {
    tags,
    severity,
    dominantDomains,
  };
}






