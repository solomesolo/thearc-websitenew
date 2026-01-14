/**
 * Persona specification types
 * All persona-specific wording must live in PersonaSpec, never in engine code
 */

export type PersonaId = "traveller_free_screening" | "women_free_screening" | "rebuilder_free_screening";

export type PersonaSpec = {
  id: PersonaId;

  voice: {
    styleTags: string[];          // e.g. ["calm","practical","time-poor"]
    disallowedPhrases: string[];  // must not appear in output
  };

  // Pattern tag → safe UI bullet label + optional snippet fragments
  patternLexicon: Record<string, {
    label: string;               // bullet label
    snippets: string[];          // short fragments used in body assembly
  }>;

  // Pillars keyed by category and/or pillarId
  planPillarCatalog: Record<string, {
    title: string;
    description: string;
    supportsDomains: string[];
    supportsPatterns: string[];
  }>;

  // Roadmap templates: selected deterministically; text lives here
  roadmapLibrary: {
    withoutPlan: RoadmapTemplate[];
    withPlan: RoadmapTemplate[];
  };

  // Confidence thresholds (persona-configured)
  confidenceRules: {
    high: { minDomains: number; minTags: number; minWorstBands: number };
    med:  { minDomains: number; minTags: number; minWorstBands: number };
  };

  // Headline templates for "Where you are now" section
  headlines: {
    byDomain: Record<string, string[]>; // domain → array of headline options
    byPattern: Record<string, string[]>; // pattern tag → array of headline options
  };

  // Body snippet templates
  bodySnippets: {
    domainFraming: Record<string, string[]>; // domain → framing paragraphs
    patternInteraction: Record<string, string[]>; // pattern combinations → interaction text
    personaContext: Record<string, string[]>; // persona tag → context snippets
  };
};

export type RoadmapTemplate = {
  id: string;

  eligibility: {
    horizons: Array<3|6|9|12>;
    requiredDomains?: string[];
    requiredPatterns?: string[];
    requiredPersonaTags?: string[];
    excludedPatterns?: string[];
  };

  render: {
    title: string;
    sentences: string[]; // 2–4 sentences; placeholders allowed
    placeholders?: Array<{
      key: string;
      source: "topPattern" | "topDomain" | "personaTag" | "planPillar";
    }>;
  };
};






