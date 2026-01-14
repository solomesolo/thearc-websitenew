export type Likert5 = 0 | 1 | 2 | 3 | 4;

export type SurveyAnswers = {
  Q1_age?: number;
  Q1_bmi?: number;
  Q4_menstrualStatus: "Regular periods" | "Irregular periods" | "No period for 12+ months" | "Hormonal contraception" | "Hysterectomy";
  Q5_hrt: "No" | "Estrogen" | "Progesterone" | "Combined estrogen + progesterone" | "Testosterone or DHEA";
  Q6_dx: Array<"Thyroid condition"|"High blood pressure"|"High cholesterol"|"Diabetes or prediabetes"|"Anxiety or depression"|"None of the above">;

  // Nutrition
  Q7_processedFoods: "Never"|"1–2 times per week"|"3–5 times per week"|"Once daily"|"Multiple times per day";
  Q8_omegaFoods: "Never"|"Less than once per week"|"1–2 times per week"|"3–5 times per week"|"Daily";
  Q9_caffeineAfter14: "Never"|"Rarely"|"Sometimes (1–2 times per week)"|"Often (most days)"|"Multiple cups daily";
  Q10_vegServings: "Less than 1"|"1–2"|"3–4"|"5–7"|"8 or more";
  Q11_bloatedSluggishMeals: "Not at all"|"Occasionally"|"Sometimes"|"Often"|"Almost always";
  Q12_dietPatterns: Array<"Vegetarian or vegan"|"Low-carbohydrate or ketogenic"|"Intermittent fasting"|"Dairy-free"|"Gluten-free"|"None of the above">;

  // Supplements
  Q13_vitDUse: "Never"|"Rarely"|"Sometimes"|"Often"|"Always";
  Q14_magnesiumEvening: "Never"|"Rarely"|"Sometimes"|"Often"|"Always";
  Q15_omegaSuppUse: "Never"|"Rarely"|"Sometimes"|"Often"|"Always";
  Q16_suppRegular: Array<"Iron"|"Calcium"|"Creatine"|"Herbal supplements (e.g., ashwagandha, turmeric, St. John's Wort)"|"Protein powders"|"None of the above">;
  Q17_moreThanThreeSupps: "Yes"|"No";

  // Movement
  Q18_exerciseDays: "0 days"|"1–2 days"|"3–4 days"|"5–6 days"|"Daily";
  Q19_strengthSessions: "None"|"1 session"|"2 sessions"|"3–4 sessions"|"5 or more sessions";
  Q20_movementBreaks: "Never"|"1 time per day"|"2–3 times per day"|"4–5 times per day"|"More than 5 times per day";
  Q21_eveningMobility: "Never"|"Rarely"|"Sometimes"|"Often"|"Daily";
  Q22_jointPain: "No"|"Mild"|"Moderate"|"Severe";

  // Screenings
  Q23_lastBloodPanel: "Never"|"More than 2 years ago"|"1–2 years ago"|"6–12 months ago"|"Within the last 6 months";
  Q26_vitDTest: "Never checked"|"More than 1 year ago"|"Within the last year and it was low"|"Within the last year and it was normal";
  Q27_glucoseTest: "Never checked"|"More than 1 year ago"|"Within the last year and it was abnormal"|"Within the last year and it was normal";
  Q28_cholesterolTest: "Never checked"|"More than 1 year ago"|"Within the last year and it was abnormal"|"Within the last year and it was normal";
  Q29_priorLabsNeedFollowUp: "Yes"|"No"|"Not sure";

  // Environment
  Q30_brightnessBeforeBed: "Very dim"|"Dim"|"Moderate"|"Bright"|"Very bright";
  Q31_screensBeforeBed: "Never"|"Rarely"|"Sometimes"|"Often"|"Constantly";

  // Red Flags
  Q32_middayCrashes: "Never"|"Rarely"|"Sometimes"|"Often"|"Daily";
  Q33_headaches: "Never"|"Rarely"|"Sometimes"|"Often"|"Frequently";
  Q34_digestiveDiscomfort: "Not at all"|"Occasionally"|"Sometimes"|"Often"|"Very frequently";

  // Stress, Sleep & Cognitive
  Q35_pressure: "Not at all"|"Slightly"|"Moderately"|"Very"|"Extremely";
  Q36_stressLingers: "Not at all"|"Slightly"|"Moderately"|"Very"|"Extremely";
  Q37_wiredTired: "Never"|"Rarely"|"Sometimes"|"Often"|"Always";
  Q38_wake3to5: "Never"|"Rarely"|"Sometimes"|"Often"|"Always";
  Q39_fallAsleep: "Never"|"Rarely"|"Sometimes"|"Often"|"Always";
  Q40_refreshed: "Very refreshed"|"Somewhat refreshed"|"Neutral"|"Somewhat unrefreshed"|"Very unrefreshed";
  Q41_mentalFatigue: "None"|"Mild"|"Moderate"|"Significant"|"Severe";
  Q42_focusClarity: "Never"|"Rarely"|"Sometimes"|"Often"|"Daily";

  // User Interest
  Q43_interests: Array<"Blood sugar & metabolism"|"Heart health"|"Hormones & menopause transition"|"Bone health"|"Stress & burnout"|"Gut health"|"Nutrient deficiencies"|"Longevity & healthy aging"|"I'm not sure">;
  Q44_selectTests: "Yes"|"No";
};

export type MetricBand = "LOW"|"MODERATE"|"HIGH"|"STABLE"|"SUBOPTIMAL"|"DYSREGULATED"|"GOOD"|"POOR"|"ELEVATED";

export type Cause = {
  questionId: string;
  selectedOption: string;
  severity: Likert5;
  points: number;
  sentence: string;
};

export type KeyMetricResult = {
  id: "stress_load"|"cortisol_regulation"|"sleep_quality"|"cognitive_recovery";
  score: number;               // 0..100
  band: MetricBand;
  menopauseTags: Array<"perimenopause"|"postmenopause"|"no_hrt">;
  causes: Cause[];             // top 2..4, s>=2
  description: string;         // template with causes inserted
};

export type ActionCardId = "nutrition"|"supplements"|"movement_recovery"|"screenings_checks"|"environment"|"red_flags";

export type WeeklyAction = {
  cardId: ActionCardId;
  title: string;
  bullets: string[];          // 1..3 items
  priority: "LOW"|"MED"|"HIGH";
  drivers: Array<{ metricId?: string; questionId?: string; selectedOption?: string }>;
};

export type EngineOutput = {
  keyMetrics: KeyMetricResult[];
  weeklyActions: WeeklyAction[];
};

// New types for narrative and trajectory features
export type TrajectoryHorizon = 3 | 6 | 9 | 12;

export type TrajectoryLane = "without_plan" | "with_plan";

// ============================================================================
// DOMAIN ANALYSIS TYPES (Dynamic Factor Extraction System)
// ============================================================================

// Domain types (extended for rules engine)
export type DomainId = 
  | 'immune' 
  | 'metabolism' 
  | 'longevity' 
  | 'cardiovascular'
  | 'sleep'
  | 'stress'
  | 'metabolic'
  | 'cognition'
  | 'gut'
  | 'movement'
  | 'screening'
  | 'safety';

export type InfluenceType = 'positive' | 'negative';

export interface DomainFactors {
  positive: string[]; // Array of labelKeys (references to PersonaSpec)
  negative: string[]; // Array of labelKeys (references to PersonaSpec)
}

export interface DomainAnalysis {
  domain: DomainId;
  score: number; // 0..100
  analysis: {
    positiveInfluences: string[]; // Array of labelKeys
    negativeInfluences: string[]; // Array of labelKeys
  };
}

export interface DomainAnalysisOutput {
  immune: DomainAnalysis;
  metabolism: DomainAnalysis;
  longevity: DomainAnalysis;
  cardiovascular: DomainAnalysis;
}

// ============================================================================
// RULES ENGINE TYPES (Dynamic Factor Extraction System v2)
// ============================================================================

// --- NEW: Canonical features (safe, closed-vocabulary) ---
export type FeatureId = string;

export type FeatureValue =
  | { kind: "boolean"; value: boolean }
  | { kind: "bucket"; value: "NONE" | "LOW" | "MED" | "HIGH" }
  | { kind: "enum"; value: string }
  | { kind: "set"; value: string[] };

export type FeatureMap = Record<FeatureId, FeatureValue>;

// --- NEW: Rules Engine outputs (deterministic) ---
export type RuleId = string;

export type RuleEffect =
  | { type: "addPattern"; tag: string; baseSeverity: 1 | 2 | 3; domain: DomainId }
  | { type: "boostPattern"; tag: string; delta: 1 | 2 }
  | { type: "addPersonaTag"; tag: string; strength?: 1 | 2 | 3 }
  | { type: "addDomain"; domain: DomainId; weight: 1 | 2 | 3 }
  | { type: "addPlanTheme"; category: string; theme: string; weight: 1 | 2 | 3 }
  | { type: "roadmapModifier"; key: string; value: string };

export type RuleMatch = {
  ruleId: RuleId;
  effects: RuleEffect[];
  evidenceFeatures: FeatureId[]; // safe ids only
};

export type RuleEvaluation = {
  matches: RuleMatch[];
};

// --- UPDATE: NarrativeSignals add provenance and roadmap modifiers ---
export type NarrativeSignals = {
  personaId: string;
  metricBands: Record<string, string>;
  patterns: Array<{ tag: string; severity: 0 | 1 | 2 | 3 }>;
  dominantDomains: DomainId[];
  personaTags: string[];
  planPillarThemes: Array<{ category: string; bulletThemes: string[] }>;

  // NEW: traceability + additional selection power
  roadmapModifiers: Record<string, string>; // from RuleEffect.roadmapModifier
  provenance: {
    matchedRuleIds: RuleId[];
    topEvidenceFeatures: FeatureId[]; // safe ids only (used for "based on" UI)
  };
};

// --- UPDATE: TrajectoryPoint with signal-story split support ---
export type TrajectoryPointWithBasis = TrajectoryPoint & {
  confidenceDetail?: { level: "LOW" | "MED" | "HIGH"; reasonKeys: string[] };
  basis?: Array<{ labelKey: string; signalRefs: Array<{ type: string; id: string }> }>;
};

export type TrajectoryPoint = {
  horizonMonths: TrajectoryHorizon;
  lane: TrajectoryLane;
  title: string;          // short label for UI card
  description: string;    // 2–4 sentences, pattern-based
  confidence: "LOW" | "MED" | "HIGH";  // based on convergence of signals
  drivers: Array<{ metricId: string; driverTag: string }>;
};

export type NarrativeBlocks = {
  whereYouAreNow: {
    headline: string;
    body: string; // 2–4 short paragraphs
    patternSummaryBullets: string[]; // 3–5 bullets, no raw values
  };
  yourPersonalPlan: {
    headline: string;
    body: string; // 2–4 short paragraphs
    planPillars: Array<{ title: string; description: string }>; // 3–5 pillars
  };
  trajectory: TrajectoryPoint[];
};

export type MenopauseFreeScreeningOutput = {
  keyMetrics: KeyMetricResult[];
  weeklyActions: WeeklyAction[];
  narrative: NarrativeBlocks;
};

// ============================================================================
// TRAVELER ENGINE TYPES
// ============================================================================

export type LikertFreq = "Never" | "Rarely" | "Sometimes" | "Often" | "Almost always";
export type RefreshedScale = "Very refreshed" | "Somewhat refreshed" | "Neutral" | "Somewhat unrefreshed" | "Very unrefreshed";
export type ConsistencyScale = "Very consistent" | "Somewhat consistent" | "Neutral" | "Somewhat inconsistent" | "Very inconsistent";
export type DifficultyScale = "Not difficult" | "Slightly difficult" | "Moderately difficult" | "Very difficult" | "Extremely difficult";

export type TravelerSurveyAnswers = {
  // Section 0 — Background
  BG1_age?: number;
  BG2_gender: "Female" | "Male" | "Intersex" | "Prefer not to say";
  BG3_heightCm?: number;
  BG4_weightKg?: number;
  BG5_noPeriod12mo?: "Yes" | "No" | "Not sure" | "Not applicable"; // kept for compatibility
  BG6_hormoneTherapy?: "No" | "Estrogen" | "Progesterone" | "Combined estrogen + progesterone" | "Testosterone or DHEA" | "Not sure"; // not used for traveler
  BG7_dx: Array<"High blood pressure" | "High cholesterol" | "Prediabetes or diabetes" | "Thyroid condition" | "Anxiety or depression" | "Autoimmune condition" | "Cardiovascular disease" | "Kidney disease" | "Liver disease" | "None of the above">;
  BG8_familyHx: Array<"Heart disease or stroke" | "Diabetes" | "Autoimmune disease" | "Dementia or neurodegenerative disease" | "None of the above">;
  BG9_upcomingTravel6w: "Yes" | "No";
  BG10_sittingDuration: "<2 hours" | "2–4 hours" | "4–6 hours" | "6–8 hours" | ">8 hours";

  // Section 1 — Energy
  F1_wornOutAfternoon: LikertFreq;
  F2_lowEnergyLimits: LikertFreq;
  F3_refreshedOnWaking: RefreshedScale;

  // Section 2 — Sleep
  S1_fallAsleepDifficulty: LikertFreq;
  S2_wakeNightStayAwake: LikertFreq;
  S3_bedtimeConsistency: ConsistencyScale;
  S4_scheduleDisruptsSleep: LikertFreq;
  S5_poorSleepAffectsNextDay: LikertFreq;
  S6_caffeineAfter14: "Never" | "Rarely" | "Sometimes (1–2×/week)" | "Often (most days)" | "Multiple servings daily";

  // Section 3 — Stress & Mood
  ST1_overwhelmed: LikertFreq;
  ST2_unableToRelax: LikertFreq;
  M1_lowMood: LikertFreq;
  M2_stressHardToFocus: LikertFreq;

  // Section 4 — Pain & Function
  P1_painLimitsActivities: LikertFreq;
  P2_avoidMovementDueDiscomfort: LikertFreq;
  PF1_difficultyStayActiveTravelDays: DifficultyScale;
  PF2_sittingCausesStiffness: LikertFreq;

  // Section 5 — Cognition
  C1_loseTrack: LikertFreq;
  C2_notSharpWhenTired: LikertFreq;

  // Section 6 — Digestive & Immune
  G1_digestiveDiscomfort: LikertFreq;
  IMM1_proneToSickDuringTravel: LikertFreq;
  G3_giIllnessPastYear: "No" | "Yes, once" | "Yes, more than once";

  // Section 7 — Lifestyle
  L1_processedFoodsTravelDays: LikertFreq;
  L2_20minMovement: LikertFreq; // reverse-coded (protective)
  N3_underHydratedWhileTraveling: LikertFreq;

  // Section 8 — Supplements & Medications
  SUP1_supplements: Array<"No" | "Yes - Vitamin D" | "Yes - Magnesium" | "Yes - Omega-3 / Fish oil" | "Yes - Iron" | "Yes - Calcium" | "Yes - Creatine" | "Yes - Herbal supplements (e.g. ashwagandha, turmeric)" | "Yes - Multivitamin" | "Yes - Other">;
  SUP2_supplementCount: "0–1" | "2–3" | "4–5" | ">5";
  SUP3_prescriptionMeds: "No" | "Yes";

  // Section 9 — Labs
  LAB1_lastGeneralBloodTest: "Never" | ">2 years ago" | "1–2 years ago" | "Within last year (normal)" | "Within last year (abnormal)";
  LAB2_specificTests: Array<string>; // Array of test status strings like "Blood glucose / HbA1c - Never"

  // Section 10 — Safety
  R1_chestBreathlessDizzy: "Yes" | "No";
  R2_moodStressImpairsFunction: "Yes" | "No";
  R3_needsPromptEvaluation: "Yes" | "No";
};

export type TravelerMetricBand = "LOW" | "MODERATE" | "HIGH" | "GOOD" | "POOR" | "ELEVATED";

export type TravelerCause = {
  questionId: keyof TravelerSurveyAnswers;
  selectedOption: string;
  severity: Likert5;
  points: number;
  sentence: string;
};

export type TravelerKeyMetricResult = {
  id: "stress_load" | "sleep_circadian" | "energy_recovery" | "mobility_physical";
  score: number; // 0..100
  band: TravelerMetricBand;
  travelTags: Array<"upcoming_travel" | "long_sit" | "cardiometabolic_dx">;
  causes: TravelerCause[]; // top 2..4, s>=2
  description: string;
};

export type TravelerActionCardId =
  | "sleep_circadian"
  | "movement_circulation"
  | "nutrition_hydration"
  | "stress_regulation"
  | "immune_gut"
  | "red_flags";

export type TravelerWeeklyAction = {
  cardId: TravelerActionCardId;
  title: string;
  bullets: string[]; // 1..3
  priority: "LOW" | "MED" | "HIGH";
  drivers: Array<{ metricId?: TravelerKeyMetricResult["id"]; questionId?: keyof TravelerSurveyAnswers; selectedOption?: string }>;
};

export type TravelerEngineOutput = {
  keyMetrics: TravelerKeyMetricResult[];
  weeklyActions: TravelerWeeklyAction[];
};









