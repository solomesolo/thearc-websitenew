/**
 * Narrative Orchestrator
 * 
 * Main orchestrator that runs the complete narrative generation pipeline:
 * Features → Rules → Patterns → Signals → LLM Story → Narrative Blocks
 * 
 * This is the primary entry point for narrative generation with the rules engine.
 */

import { TravelerKeyMetricResult, TravelerWeeklyAction, TravelerSurveyAnswers, NarrativeBlocks, TrajectoryPoint, NarrativeSignals, DomainId } from "./types";
import { deriveFeaturesFromAnswers } from "./features";
import { getRuleset } from "../rulesets";
import { evaluateRules } from "./rules/evaluate";
import { deriveTravelerPatternSummary } from "./travelerPatterns";
import { extractRuleThemes, extractRoadmapModifiers, extractPersonaTags, topEvidenceFeatures } from "./ruleEffects";
import { generateTravelerTrajectory } from "./travelerTrajectory";
import { buildTravelerNarrativeBlocks } from "./travelerNarrative";

/**
 * Convert key metrics to band-only format (no scores)
 */
function deriveMetricBands(keyMetrics: TravelerKeyMetricResult[]): Record<string, string> {
  const bands: Record<string, string> = {};
  keyMetrics.forEach(metric => {
    bands[metric.id] = metric.band;
  });
  return bands;
}

/**
 * Merge persona tags from existing sources with rule-driven tags
 */
function mergePersonaTags(
  existingTags: string[],
  ruleEval: ReturnType<typeof evaluateRules>
): string[] {
  const ruleTags = extractPersonaTags(ruleEval);
  const merged = new Set([...existingTags, ...ruleTags]);
  return Array.from(merged);
}

/**
 * Build plan pillar themes from weekly actions and rule themes
 * This converts rule themes into the format expected by NarrativeSignals
 */
function buildPlanPillarThemes(
  weeklyActions: TravelerWeeklyAction[],
  ruleThemes: Array<{ category: string; theme: string; weight: 1 | 2 | 3 }>
): Array<{ category: string; bulletThemes: string[] }> {
  // Start with action-derived pillars
  const actionPillars = weeklyActions.map(action => ({
    category: action.title,
    bulletThemes: action.bullets.map(bullet => {
      // Extract theme from bullet (remove any specific details)
      return bullet.split(':')[0] || bullet.split('.')[0] || bullet;
    }),
  }));
  
  // Merge rule themes (higher priority)
  if (ruleThemes && ruleThemes.length > 0) {
    const rulePillarsByCategory = new Map<string, string[]>();
    
    for (const ruleTheme of ruleThemes) {
      if (!rulePillarsByCategory.has(ruleTheme.category)) {
        rulePillarsByCategory.set(ruleTheme.category, []);
      }
      rulePillarsByCategory.get(ruleTheme.category)!.push(ruleTheme.theme);
    }
    
    // Merge: rule themes override action themes for same category
    const merged = new Map<string, { category: string; bulletThemes: string[] }>();
    
    // Add rule pillars first (higher priority)
    for (const [category, themes] of rulePillarsByCategory.entries()) {
      merged.set(category, { category, bulletThemes: themes });
    }
    
    // Add action pillars for categories not covered by rules
    for (const pillar of actionPillars) {
      if (!merged.has(pillar.category)) {
        merged.set(pillar.category, pillar);
      }
    }
    
    // Return top 3-5 pillars (prioritize by rule weight, then action priority)
    return Array.from(merged.values()).slice(0, 5);
  }
  
  // No rule themes, return action pillars (limit to 5)
  return actionPillars.slice(0, 5);
}

/**
 * Attach narrative to engine output using rules-based pipeline
 */
export async function attachNarrativeToTravelerOutput(params: {
  keyMetrics: TravelerKeyMetricResult[];
  weeklyActions: TravelerWeeklyAction[];
  personaId: string;
  // Internal only - not exported outside engine
  answers?: TravelerSurveyAnswers;
  uiAnswers?: Record<string, any>;
  telemetry?: any;
}): Promise<{
  keyMetrics: TravelerKeyMetricResult[];
  weeklyActions: TravelerWeeklyAction[];
  narrative: NarrativeBlocks;
  domainAnalysis?: any; // Optional domain analysis
}> {
  const { keyMetrics, weeklyActions, personaId, answers, uiAnswers = {} } = params;

  // NEW 1) Features from answers (internal-only)
  if (!answers) {
    throw new Error("Answers required for narrative generation");
  }
  
  const features = deriveFeaturesFromAnswers({ 
    answers, 
    uiAnswers,
    telemetry: params.telemetry 
  });

  // NEW 2) Rules evaluation
  const ruleset = getRuleset(personaId);
  const ruleEval = evaluateRules({ features, ruleset });

  // EXISTING/UPDATED: convert keyMetrics -> metricBands (no numeric)
  const metricBands = deriveMetricBands(keyMetrics);

  // UPDATED: patterns primarily from rules + bands/actions
  const patternSummary = deriveTravelerPatternSummary({
    metricBands,
    ruleEval,
    weeklyActions,
    keyMetrics, // Optional for backward compatibility
  });

  // UPDATED: plan themes merge rules effects + action extraction
  const ruleThemes = extractRuleThemes(ruleEval);
  
  // Get existing persona tags (from travel tags, etc.)
  const existingTags: string[] = []; // TODO: Extract from existing logic if needed
  
  // UPDATED: personaTags now includes rule-driven tags
  const personaTags = mergePersonaTags(existingTags, ruleEval);

  // NEW: roadmap modifiers
  const roadmapModifiers = extractRoadmapModifiers(ruleEval);

  // Build plan pillar themes from rule themes + weekly actions
  // This needs to be done here so it can be included in signals
  const planPillarThemes = buildPlanPillarThemes(weeklyActions, ruleThemes);

  // Build NarrativeSignals
  const signals: NarrativeSignals = {
    personaId,
    metricBands,
    patterns: patternSummary.tags.map(tag => ({ 
      tag, 
      severity: patternSummary.severity[tag] ?? 0 
    })),
    dominantDomains: patternSummary.dominantDomains as DomainId[],
    personaTags,
    planPillarThemes, // Now populated from rules + actions
    roadmapModifiers,
    provenance: {
      matchedRuleIds: ruleEval.matches.map(m => m.ruleId),
      topEvidenceFeatures: topEvidenceFeatures(ruleEval),
    },
  };

  // Generate trajectory (deterministic, can use roadmapModifiers)
  const trajectoryPoints = generateTravelerTrajectory(
    keyMetrics,
    patternSummary,
    weeklyActions,
    roadmapModifiers // Pass roadmap modifiers for trajectory customization
  );

  // Build narrative blocks (includes LLM story generation)
  // Pass pattern summary and trajectory to avoid duplicate generation
  const narrative = await buildTravelerNarrativeBlocks({
    keyMetrics,
    weeklyActions,
    surveyAnswers: answers,
    // Pass rule-derived data
    ruleThemes,
    patternSummary, // Use rules-driven pattern summary
    trajectoryPoints, // Use trajectory generated above
  });

  // Ensure trajectory is included (should already be there from buildTravelerNarrativeBlocks)
  const finalNarrative: NarrativeBlocks = {
    ...narrative,
    trajectory: narrative.trajectory && narrative.trajectory.length > 0 
      ? narrative.trajectory 
      : trajectoryPoints, // Fallback if narrative builder didn't include it
  };
  
  // Final validation: trajectory must have 8 points (4 horizons × 2 lanes)
  if (finalNarrative.trajectory.length !== 8) {
    console.warn("⚠️ Trajectory length is not 8, using generated trajectory");
    finalNarrative.trajectory = trajectoryPoints;
  }
  
  console.log("📊 Orchestrator: Final narrative trajectory length:", finalNarrative.trajectory.length);
  console.log("📊 Orchestrator: Trajectory points:", finalNarrative.trajectory.map(t => ({
    horizon: t.horizonMonths,
    lane: t.lane,
    hasTitle: !!t.title,
    hasDescription: !!t.description,
  })));

  return {
    keyMetrics,
    weeklyActions,
    narrative: finalNarrative,
  };
}






