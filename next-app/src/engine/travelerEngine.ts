import { TravelerSurveyAnswers, TravelerEngineOutput, DomainAnalysisOutput } from './types';
import { calculateTravelerKeyMetrics } from './travelerKeyMetrics';
import { generateTravelerWeeklyActions } from './travelerWeeklyActions';
import { mapTravelerQuestionnaireAnswers } from './travelerMapAnswers';
import { buildTravelerNarrativeBlocks } from './travelerNarrative';
import { calculateDomainAnalysis } from './domainScoring';
import { attachNarrativeToTravelerOutput } from './narrativeOrchestrator';

/**
 * Main traveler engine function - processes survey answers and returns key metrics and weekly actions
 */
export function runTravelerEngine(answers: TravelerSurveyAnswers): TravelerEngineOutput {
  const keyMetrics = calculateTravelerKeyMetrics(answers);
  const weeklyActions = generateTravelerWeeklyActions(answers, keyMetrics);
  
  return {
    keyMetrics,
    weeklyActions,
  };
}

/**
 * Extended traveler engine function that includes narrative blocks and domain analysis
 * Uses the new rules-based orchestrator for robust narrative generation
 */
export async function runTravelerEngineWithNarrative(
  answers: TravelerSurveyAnswers,
  uiAnswers?: Record<string, any>
): Promise<{
  keyMetrics: TravelerEngineOutput['keyMetrics'];
  weeklyActions: TravelerEngineOutput['weeklyActions'];
  narrative: Awaited<ReturnType<typeof buildTravelerNarrativeBlocks>>;
  domainAnalysis?: DomainAnalysisOutput;
}> {
  const keyMetrics = calculateTravelerKeyMetrics(answers);
  const weeklyActions = generateTravelerWeeklyActions(answers, keyMetrics);
  
  console.log("🔨 runTravelerEngineWithNarrative: Using rules-based orchestrator");
  
  // Use new orchestrator for narrative generation
  const narrativeResult = await attachNarrativeToTravelerOutput({
    keyMetrics,
    weeklyActions,
    personaId: "traveler",
    answers,
    uiAnswers,
  });
  
  console.log("🔨 runTravelerEngineWithNarrative: Narrative received:", {
    hasNarrative: !!narrativeResult.narrative,
    narrativeType: typeof narrativeResult.narrative,
    narrativeKeys: narrativeResult.narrative ? Object.keys(narrativeResult.narrative) : [],
    hasWhereYouAreNow: !!narrativeResult.narrative?.whereYouAreNow,
    hasYourPersonalPlan: !!narrativeResult.narrative?.yourPersonalPlan,
    trajectoryLength: narrativeResult.narrative?.trajectory?.length || 0,
  });
  
  // Calculate domain analysis if UI answers are provided (using new Medical Logic Engine)
  let domainAnalysis: DomainAnalysisOutput | undefined;
  if (uiAnswers) {
    console.log("🔨 runTravelerEngineWithNarrative: Calculating domain analysis with Medical Logic Engine");
    domainAnalysis = calculateDomainAnalysis(answers, uiAnswers, narrativeResult.keyMetrics);
    console.log("🔨 runTravelerEngineWithNarrative: Domain analysis calculated:", {
      immuneScore: domainAnalysis.immune.score,
      metabolismScore: domainAnalysis.metabolism.score,
      longevityScore: domainAnalysis.longevity.score,
      cardiovascularScore: domainAnalysis.cardiovascular.score,
      immunePositive: domainAnalysis.immune.analysis.positiveInfluences.length,
      immuneNegative: domainAnalysis.immune.analysis.negativeInfluences.length,
    });
  }
  
  return {
    keyMetrics: narrativeResult.keyMetrics,
    weeklyActions: narrativeResult.weeklyActions,
    narrative: narrativeResult.narrative,
    domainAnalysis,
  };
}

/**
 * Map UI questionnaire answers to traveler engine format
 */
export { mapTravelerQuestionnaireAnswers };






