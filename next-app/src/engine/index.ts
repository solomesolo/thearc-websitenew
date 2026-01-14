import { SurveyAnswers, EngineOutput } from './types';
import { calculateKeyMetrics } from './keyMetrics';
import { generateWeeklyActions } from './weeklyActions';
import { mapQuestionnaireAnswers } from './mapQuestionnaireAnswers';
import { buildNarrativeBlocks } from './narrative';

/**
 * Main engine function - processes survey answers and returns key metrics and weekly actions
 */
export function runMenopauseEngine(answers: SurveyAnswers): EngineOutput {
  const keyMetrics = calculateKeyMetrics(answers);
  const weeklyActions = generateWeeklyActions(answers, keyMetrics);
  
  return {
    keyMetrics,
    weeklyActions,
  };
}

/**
 * Extended engine function that includes narrative blocks (requires async for LLM)
 * Use this for free screening results that need narrative content
 */
export async function runMenopauseEngineWithNarrative(answers: SurveyAnswers): Promise<{
  keyMetrics: EngineOutput['keyMetrics'];
  weeklyActions: EngineOutput['weeklyActions'];
  narrative: Awaited<ReturnType<typeof buildNarrativeBlocks>>;
}> {
  const keyMetrics = calculateKeyMetrics(answers);
  const weeklyActions = generateWeeklyActions(answers, keyMetrics);
  const narrative = await buildNarrativeBlocks({
    keyMetrics,
    weeklyActions,
    surveyAnswers: answers,
  });
  
  return {
    keyMetrics,
    weeklyActions,
    narrative,
  };
}

// Explicitly export mapQuestionnaireAnswers
export { mapQuestionnaireAnswers };

// Export all types and utilities
export * from './types';
export * from './keyMetrics';
export * from './weeklyActions';
export * from './mappings';
export * from './patterns';
export * from './trajectory';
export * from './narrative';
export * from './narrativePrompt';

// Export traveler engine
export * from './travelerEngine';
export * from './travelerKeyMetrics';
export * from './travelerWeeklyActions';
export * from './travelerMappings';
export * from './travelerMapAnswers';
export * from './travelerScreening';
export * from './travelerSupplements';
export * from './travelerNarrative';
export * from './travelerPatterns';
export * from './travelerTrajectory';
export * from './travelerNarrativePrompt';

// Export domain analysis and factor extraction
export * from './domainScoring';
export * from './factorExtractor';
export * from './metadata/factorMap';

// Export medical logic engine
export * from './medicalLogic/types';
export * from './medicalLogic/registry';
export * from './medicalLogic/engine';
export * from './medicalLogic/domainReducer';
export * from './medicalLogic/factorResolver';
export * from './medicalLogic/cnsMultipliers';
export * from './medicalLogic/nodeMatcher';

// Export rules engine
export * from './rules/types';
export * from './rules/predicates';
export * from './rules/evaluate';
export * from './ruleEffects';
export * from './features';

// Export narrative orchestrator
export * from './narrativeOrchestrator';

