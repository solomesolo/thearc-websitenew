/**
 * Traveler Free Screening Ruleset v1
 * 
 * Versioned ruleset for traveler persona free screening.
 * Rules map feature combinations to effects (patterns, tags, themes, etc.)
 */

import { Rule } from "../../engine/rules/types";
import { FEATURE_IDS } from "../../engine/features";

export const travellerFreeScreeningRules_v1: Rule[] = [
  {
    id: "traveler_jetlag_vulnerability_v1",
    description: "High TZ shift + high sleep latency + high stress => circadian misalignment pattern",
    priority: 80,
    when: {
      op: "and",
      all: [
        { op: "gte", feature: FEATURE_IDS.TIME_ZONE_SHIFT, bucket: "HIGH" },
        { op: "gte", feature: FEATURE_IDS.SLEEP_LATENCY, bucket: "HIGH" },
        { op: "gte", feature: FEATURE_IDS.STRESS_LOAD, bucket: "HIGH" },
      ],
    },
    then: [
      { type: "addPattern", tag: "circadian_misalignment", baseSeverity: 3, domain: "sleep" },
      { type: "addPersonaTag", tag: "upcoming_travel", strength: 2 },
      { type: "addPlanTheme", category: "sleep", theme: "sleep_anchors", weight: 3 },
      { type: "roadmapModifier", key: "sleepTrajectory", value: "volatile" },
    ],
    evidenceFeatures: [FEATURE_IDS.TIME_ZONE_SHIFT, FEATURE_IDS.SLEEP_LATENCY, FEATURE_IDS.STRESS_LOAD],
  },
  
  {
    id: "traveler_sedentary_metabolic_risk_v1",
    description: "Long sitting + low movement + processed foods => metabolic stasis",
    priority: 75,
    when: {
      op: "and",
      all: [
        { op: "gte", feature: FEATURE_IDS.SITTING_DURATION, bucket: "HIGH" },
        { op: "in", feature: FEATURE_IDS.MOVEMENT_FREQUENCY, values: ["NONE", "LOW"] },
        { op: "gte", feature: FEATURE_IDS.PROCESSED_FOODS, bucket: "MED" },
      ],
    },
    then: [
      { type: "addPattern", tag: "metabolic_stasis", baseSeverity: 2, domain: "metabolic" },
      { type: "addDomain", domain: "metabolic", weight: 3 },
      { type: "addPlanTheme", category: "movement", theme: "circulation_breaks", weight: 3 },
    ],
    evidenceFeatures: [FEATURE_IDS.SITTING_DURATION, FEATURE_IDS.MOVEMENT_FREQUENCY, FEATURE_IDS.PROCESSED_FOODS],
  },
  
  {
    id: "traveler_high_stress_recovery_gap_v1",
    description: "High stress + poor recovery quality => stress-recovery gap",
    priority: 70,
    when: {
      op: "and",
      all: [
        { op: "gte", feature: FEATURE_IDS.STRESS_LOAD, bucket: "HIGH" },
        { op: "in", feature: FEATURE_IDS.RECOVERY_QUALITY, values: ["NONE", "LOW"] },
      ],
    },
    then: [
      { type: "addPattern", tag: "stress_recovery_gap", baseSeverity: 3, domain: "stress" },
      { type: "addDomain", domain: "stress", weight: 3 },
      { type: "addPlanTheme", category: "stress", theme: "recovery_practices", weight: 3 },
    ],
    evidenceFeatures: [FEATURE_IDS.STRESS_LOAD, FEATURE_IDS.RECOVERY_QUALITY],
  },
  
  {
    id: "traveler_immune_vulnerability_v1",
    description: "High travel frequency + low vegetable intake => immune vulnerability",
    priority: 65,
    when: {
      op: "and",
      all: [
        { op: "gte", feature: FEATURE_IDS.TRAVEL_FREQUENCY, bucket: "HIGH" },
        { op: "in", feature: FEATURE_IDS.VEGETABLE_INTAKE, values: ["NONE", "LOW"] },
      ],
    },
    then: [
      { type: "addPattern", tag: "immune_vulnerability", baseSeverity: 2, domain: "immune" },
      { type: "addDomain", domain: "immune", weight: 2 },
      { type: "addPlanTheme", category: "nutrition", theme: "micronutrient_density", weight: 2 },
    ],
    evidenceFeatures: [FEATURE_IDS.TRAVEL_FREQUENCY, FEATURE_IDS.VEGETABLE_INTAKE],
  },
  
  {
    id: "traveler_cardiometabolic_risk_v1",
    description: "Diabetes + hypertension + family cardiac history => high cardiometabolic risk",
    priority: 85,
    when: {
      op: "and",
      all: [
        { op: "eq", feature: FEATURE_IDS.HAS_DIABETES, value: "true" },
        { op: "eq", feature: FEATURE_IDS.HAS_HYPERTENSION, value: "true" },
        { op: "eq", feature: FEATURE_IDS.FAMILY_CARDIAC, value: "true" },
      ],
    },
    then: [
      { type: "addPattern", tag: "cardiometabolic_risk", baseSeverity: 3, domain: "cardiovascular" },
      { type: "addDomain", domain: "cardiovascular", weight: 3 },
      { type: "addPlanTheme", category: "screening", theme: "cardiometabolic_panel", weight: 3 },
      { type: "roadmapModifier", key: "riskLevel", value: "high" },
    ],
    evidenceFeatures: [FEATURE_IDS.HAS_DIABETES, FEATURE_IDS.HAS_HYPERTENSION, FEATURE_IDS.FAMILY_CARDIAC],
  },
  
  {
    id: "traveler_sleep_travel_disruption_v1",
    description: "Upcoming travel + sleep disruption => travel sleep pattern",
    priority: 60,
    when: {
      op: "and",
      all: [
        { op: "eq", feature: FEATURE_IDS.UPCOMING_TRAVEL, value: "true" },
        { op: "gte", feature: FEATURE_IDS.SLEEP_DISRUPTION_TRAVEL, bucket: "MED" },
      ],
    },
    then: [
      { type: "addPattern", tag: "travel_sleep_disruption", baseSeverity: 2, domain: "sleep" },
      { type: "addPersonaTag", tag: "upcoming_travel", strength: 2 },
      { type: "addPlanTheme", category: "sleep", theme: "travel_sleep_prep", weight: 2 },
    ],
    evidenceFeatures: [FEATURE_IDS.UPCOMING_TRAVEL, FEATURE_IDS.SLEEP_DISRUPTION_TRAVEL],
  },
];






