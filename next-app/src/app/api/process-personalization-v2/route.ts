import { NextRequest, NextResponse } from 'next/server';

// Input validation schema - matches the actual questionnaire data structure
const inputSchema = {
  type: "object",
  required: ["user"],
  properties: {
    user: {
      type: "object",
      required: ["name", "age", "sex"],
      properties: {
        name: { type: "string" },
        age: { type: "number" },
        sex: { type: "string", enum: ["male", "female", "other"] },
        email: { type: "string" }
      }
    },
    family_history: { type: "object" },
    physiological_patterns: { type: "object" },
    lifestyle_load: { type: "object" },
    biological_signals: { type: "object" },
    cognitive_rhythm: { type: "object" },
    symptoms: { type: "object" },
    preferences: { type: "object" }
  }
};

// Score calculation functions - CORRECTED to match the actual data structure
function calculateFamilyRisk(familyHistory: any): number {
  let score = 0;
  
  if (familyHistory.cvd && familyHistory.cvd.present && familyHistory.cvd.first_degree && familyHistory.cvd.onset === '<60') {
    score += 40;
  }
  
  if (familyHistory.diabetes && familyHistory.diabetes.present && familyHistory.diabetes.first_degree) {
    score += 25;
  }
  
  if (familyHistory.cancer && familyHistory.cancer.length > 0) {
    const colorectalCancer = familyHistory.cancer.find((c: any) => c.type === 'colorectal');
    if (colorectalCancer && colorectalCancer.relative === 'mother') {
      score += 20;
    }
  }
  
  return Math.min(score, 100);
}

function calculatePhysiological(physiological: any): number {
  let score = 0;
  
  // Handle both transformed data and raw data
  if (physiological.lightheaded_standing) {
    // Transformed data
    if (physiological.lightheaded_standing === 'often') score += 40;
    else if (physiological.lightheaded_standing === 'sometimes') score += 20;
  } else if (physiological.compass31_raw !== undefined) {
    // Raw data - convert to score
    score += (physiological.compass31_raw / physiological.compass31_max) * 100;
  }
  
  // Skin color changes
  if (physiological.skin_color_changes) score += 30;
  
  // Temperature sensitivity
  if (physiological.temperature_sensitivity === 'high') score += 30;
  else if (physiological.temperature_sensitivity === 'moderate') score += 15;
  
  return Math.min(score, 100);
}

function calculateLifestyleLoad(lifestyle: any): number {
  let score = 0;
  
  // Use raw scores when available (PSS-10)
  if (lifestyle.pss10_raw !== undefined && lifestyle.pss10_max > 0) {
    // PSS-10 scoring: higher raw score = higher risk
    const pss10Score = (lifestyle.pss10_raw / lifestyle.pss10_max) * 100;
    score += pss10Score;
  } else if (lifestyle.overwhelmed) {
    // Fallback to transformed data
    if (lifestyle.overwhelmed === 'often') score += 40;
    else if (lifestyle.overwhelmed === 'sometimes') score += 20;
  }
  
  // Additional factors
  if (lifestyle.confidence_handling === 'never') score += 30;
  else if (lifestyle.confidence_handling === 'rarely') score += 15;
  
  if (lifestyle.in_control === 'never') score += 30;
  else if (lifestyle.in_control === 'rarely') score += 15;
  
  return Math.min(score, 100);
}

function calculateBiological(biological: any, user: any): number {
  let score = 0;
  
  // Age factor - use user.age instead of biological.age
  if (user.age >= 65) score += 30;
  else if (user.age >= 45) score += 20;
  else if (user.age >= 35) score += 10;
  
  // Gender factor - use user.sex instead of biological.gender
  if (user.sex === 'male') score += 10;
  
  // Location factor
  if (biological.location === 'rural') score += 5;
  
  // Education factor
  if (biological.education === 'high_school') score += 15;
  else if (biological.education === 'university') score += 5;
  
  // Work status factor
  if (biological.work_status === 'unemployed') score += 20;
  else if (biological.work_status === 'retired') score += 10;
  
  return Math.min(score, 100);
}

function calculateCognitive(cognitive: any): number {
  let score = 0;
  
  // Use raw scores when available (CFQ + WHO-5)
  if (cognitive.cfq_raw !== undefined && cognitive.cfq_max > 0) {
    // CFQ scoring: higher raw score = higher cognitive fatigue
    const cfqScore = (cognitive.cfq_raw / cognitive.cfq_max) * 50; // Weight CFQ at 50%
    score += cfqScore;
  }
  
  if (cognitive.who5_raw !== undefined && cognitive.who5_max > 0) {
    // WHO-5 scoring: lower raw score = higher risk (inverted)
    const who5Score = ((cognitive.who5_max - cognitive.who5_raw) / cognitive.who5_max) * 50; // Weight WHO-5 at 50%
    score += who5Score;
  }
  
  // Fallback to individual questions if raw scores not available
  if (cognitive.upset_annoyed === 'often') score += 30;
  else if (cognitive.upset_annoyed === 'sometimes') score += 15;
  
  if (cognitive.tense_nervous === 'often') score += 30;
  else if (cognitive.tense_nervous === 'sometimes') score += 15;
  
  if (cognitive.too_many_demands === 'often') score += 30;
  else if (cognitive.too_many_demands === 'sometimes') score += 15;
  
  return Math.min(score, 100);
}

// Personalization functions
function calculatePhaseOrder(scores: any, symptoms: any): string[] {
  const defaultPhases = ["Decode", "Rebalance", "Strengthen", "Nourish", "Refine", "Sustain"];
  
  let phases = [...defaultPhases];
  
  // If high lifestyle load or physiological stress, start with Rebalance
  if (Math.max(scores.lifestyle_load, scores.physiological) >= 70) {
    phases = ["Rebalance", "Decode", ...phases.slice(2)];
  }
  
  // If high family risk or biological aging, move Nourish before Strengthen
  if (Math.max(scores.family_risk, scores.biological) >= 70) {
    const nourishIndex = phases.indexOf("Nourish");
    const strengthenIndex = phases.indexOf("Strengthen");
    if (nourishIndex > strengthenIndex) {
      phases.splice(nourishIndex, 1);
      phases.splice(strengthenIndex, 0, "Nourish");
    }
  }
  
  return phases;
}

function selectScreenings(scores: any, symptoms: any, familyHistory: any): string[] {
  const screenings = [];
  
  // Always include basic screenings
  screenings.push("CRP", "Lipid panel", "HbA1c", "Vitamin D");
  
  // Add specific screenings based on scores
  if (scores.family_risk >= 40) {
    screenings.push("AM Cortisol");
  }
  
  if (scores.physiological >= 40) {
    screenings.push("Ferritin", "TSH");
  }
  
  if (scores.lifestyle_load >= 60) {
    screenings.push("Cortisol");
  }
  
  return [...new Set(screenings)]; // Remove duplicates
}

function selectNutritionArchetype(scores: any, symptoms: any, familyHistory: any): string {
  if (scores.family_risk >= 60 || scores.biological >= 60) {
    return "Anti-inflammatory Mediterranean";
  } else if (scores.lifestyle_load >= 60) {
    return "Stress-Adaptive";
  } else {
    return "Balanced Mediterranean";
  }
}

function selectSupplements(scores: any, symptoms: any, preferences: any): string[] {
  const supplements = [];
  
  // Always include basic supplements
  supplements.push("Omega-3", "Magnesium glycinate", "Vitamin D3 + K2");
  
  // Add specific supplements based on scores
  if (scores.lifestyle_load >= 60) {
    supplements.push("Ashwagandha", "Rhodiola");
  }
  
  if (scores.physiological >= 40) {
    supplements.push("Probiotic");
  }
  
  if (scores.cognitive >= 40) {
    supplements.push("Creatine");
  }
  
  return supplements;
}

function selectBreathwork(scores: any, symptoms: any): string[] {
  const breathwork = [];
  
  // Always include basic breathwork
  breathwork.push("Cardiac coherence", "Physiological sighs", "Box breathing");
  
  // Add specific breathwork based on scores
  if (scores.lifestyle_load >= 60) {
    breathwork.push("4-7-8 breathing");
  }
  
  if (scores.physiological >= 40) {
    breathwork.push("Alternate nostril breathing");
  }
  
  return breathwork;
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    console.log("=== API V2 RECEIVED REQUEST ===");
    
    const body = await request.json();
    console.log("Full request body:", JSON.stringify(body, null, 2));
    
    // Validate input
    const ajv = new (await import('ajv')).default();
    const validate = ajv.compile(inputSchema);
    const valid = validate(body);
    
    if (!valid) {
      console.log("Validation errors:", validate.errors);
      return NextResponse.json(
        { ok: false, error: "Invalid input data", details: validate.errors },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          }
        }
      );
    }
    
    const { user, family_history, physiological_patterns, lifestyle_load, biological_signals, cognitive_rhythm, symptoms, preferences } = body;
    
    console.log("=== SCORE CALCULATION DEBUG ===");
    console.log("Family history:", family_history);
    console.log("Physiological patterns:", physiological_patterns);
    console.log("Lifestyle load:", lifestyle_load);
    console.log("Biological signals:", biological_signals);
    console.log("Cognitive rhythm:", cognitive_rhythm);
    console.log("=== END SCORE CALCULATION DEBUG ===");
    
    // Calculate scores
    const scores = {
      family_risk: calculateFamilyRisk(family_history),
      physiological: calculatePhysiological(physiological_patterns),
      lifestyle_load: calculateLifestyleLoad(lifestyle_load),
      biological: calculateBiological(biological_signals, user),
      cognitive: calculateCognitive(cognitive_rhythm)
    };
    
    console.log("Calculated scores:", scores);
    
    // Generate personalization
    const phase_order = calculatePhaseOrder(scores, symptoms);
    const screenings = selectScreenings(scores, symptoms, family_history);
    const nutrition_archetype = selectNutritionArchetype(scores, symptoms, family_history);
    const supplements = selectSupplements(scores, symptoms, preferences);
    const breath_recovery = selectBreathwork(scores, symptoms);
    
    const response = {
      ok: true,
      scores,
      phase_order,
      screenings,
      nutrition_archetype,
      supplements,
      breath_recovery
    };
    
    console.log("=== API V2 RESPONSE ===");
    console.log("Response:", JSON.stringify(response, null, 2));
    
    return NextResponse.json(response, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
    
  } catch (error) {
    console.error('API V2 Error:', error);
    return NextResponse.json(
      { ok: false, error: "Internal server error", message: error instanceof Error ? error.message : "Unknown error" },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    );
  }
}
