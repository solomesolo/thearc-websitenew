/**
 * Medical Logic Registry Types
 * 
 * Defines the structure for the MedicalLogicRegistry that maps survey responses
 * to biological domain impacts via CNS "taxes" and clinical proxies.
 */

export type DomainId = 'immune' | 'metabolism' | 'longevity' | 'cardiovascular';

export type TaxPillar = 'stress_load' | 'cortisol_reg' | 'sleep_quality' | 'cog_recovery';

export type InfluenceType = 'positive' | 'negative';

export interface MedicalNode {
  trigger: {
    questionId: string;
    optionValue: any; // Can be string, number, array, or function for complex matching
  };
  logic: {
    targetDomain: DomainId;
    taxPillar: TaxPillar;
    impactWeight: number; // -30 to +30
    isRedFlag: boolean; // Overrides all logic if true (e.g., R1 Chest Pain)
  };
  factorMetadata: {
    id: string; // e.g., "CIRCADIAN_STRESS_TAX", "HIGH_TRAVEL_IMMUNE_LOAD"
    type: InfluenceType;
  };
}

export interface MedicalLogicRegistry {
  nodes: MedicalNode[];
}

export interface DomainScore {
  domain: DomainId;
  score: number; // 0-100
  baseline: number; // Always starts at 100
  primaryImpact: number; // Sum of impactWeights
  systemicMultipliers: {
    cortisolTax?: number; // Multiplier from cortisol pillar
    stressTax?: number; // Multiplier from stress pillar
    sleepTax?: number; // Multiplier from sleep pillar
    recoveryTax?: number; // Multiplier from recovery pillar
  };
  finalScore: number; // After all multipliers and clamps
  isRedFlagTriggered: boolean;
}

export interface CNSMultipliers {
  cortisol: number; // Derived from S1, F1
  stress: number; // Derived from T2, R2
  sleep: number; // Derived from sleep metrics
  recovery: number; // Derived from M2, F3
}

export interface DomainAnalysisResult {
  immune: DomainScore;
  metabolism: DomainScore;
  longevity: DomainScore;
  cardiovascular: DomainScore;
  cnsMultipliers: CNSMultipliers;
  factors: {
    immune: {
      positive: string[]; // Array of factorMetadata.id
      negative: string[]; // Array of factorMetadata.id
    };
    metabolism: {
      positive: string[];
      negative: string[];
    };
    longevity: {
      positive: string[];
      negative: string[];
    };
    cardiovascular: {
      positive: string[];
      negative: string[];
    };
  };
}






