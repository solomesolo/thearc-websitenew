/**
 * CNS Multiplier Calculation
 * 
 * Calculates Central Nervous System multipliers from tax pillars.
 * These multipliers apply systemic "taxes" across domains.
 */

import { TravelerKeyMetricResult } from '../types';
import { CNSMultipliers, TaxPillar } from './types';

/**
 * Calculate CNS multipliers from key metrics (tax pillars)
 */
export function calculateCNSMultipliers(keyMetrics: TravelerKeyMetricResult[]): CNSMultipliers {
  // Extract tax pillar scores
  const stressLoad = keyMetrics.find(m => m.id === 'stress_load')?.score ?? 50;
  const sleepCircadian = keyMetrics.find(m => m.id === 'sleep_circadian')?.score ?? 50;
  const energyRecovery = keyMetrics.find(m => m.id === 'energy_recovery')?.score ?? 50;
  const mobilityPhysical = keyMetrics.find(m => m.id === 'mobility_physical')?.score ?? 50;
  
  // Map to tax pillars
  // Note: Key metrics use inverse scoring (lower score = worse condition)
  // Cortisol pillar: derived from sleep_circadian (poor sleep = high cortisol)
  // sleep_circadian: POOR = low score (high cortisol), GOOD = high score (low cortisol)
  const cortisolPillar = sleepCircadian; // Lower score = higher cortisol tax
  
  // Stress pillar: derived from stress_load
  // stress_load: HIGH = low score (high stress), LOW = high score (low stress)
  const stressPillar = stressLoad; // Lower score = higher stress tax
  
  // Sleep pillar: directly from sleep_circadian
  const sleepPillar = sleepCircadian; // Lower score = worse sleep
  
  // Recovery pillar: derived from energy_recovery
  // energy_recovery: ELEVATED = low score (poor recovery), GOOD = high score (good recovery)
  const recoveryPillar = energyRecovery; // Lower score = poor recovery
  
  return {
    cortisol: cortisolPillar,
    stress: stressPillar,
    sleep: sleepPillar,
    recovery: recoveryPillar,
  };
}

/**
 * Get multiplier for a domain based on CNS state
 * Returns the multiplier to apply to negative weights
 */
export function getSystemicMultiplier(
  domain: 'immune' | 'metabolism' | 'longevity' | 'cardiovascular',
  cnsMultipliers: CNSMultipliers
): number {
  let multiplier = 1.0;
  
  // Domain A: Immune - If Stress Pillar < 50, multiply negative weights by 1.3x
  if (domain === 'immune' && cnsMultipliers.stress < 50) {
    multiplier = 1.3;
  }
  
  // Domain B: Metabolism - If Cortisol Pillar < 50, multiply negative weights by 1.5x
  if (domain === 'metabolism' && cnsMultipliers.cortisol < 50) {
    multiplier = 1.5;
  }
  
  // Domain C: Longevity - If Sleep Pillar < 50, multiply negative weights by 1.2x
  if (domain === 'longevity' && cnsMultipliers.sleep < 50) {
    multiplier = 1.2;
  }
  
  // Domain D: Cardiovascular - If Recovery Pillar < 50, multiply negative weights by 1.2x
  if (domain === 'cardiovascular' && cnsMultipliers.recovery < 50) {
    multiplier = 1.2;
  }
  
  return multiplier;
}






