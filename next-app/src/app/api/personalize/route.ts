import { NextRequest, NextResponse } from 'next/server';
import Ajv from 'ajv';

// Input validation schema
const inputSchema = {
  type: "object",
  required: ["scores"],
  properties: {
    scores: {
      type: "object",
      required: ["family_risk", "physiological", "lifestyle_load", "biological", "cognitive"],
      properties: {
        family_risk: { type: "number", minimum: 0, maximum: 100 },
        physiological: { type: "number", minimum: 0, maximum: 100 },
        lifestyle_load: { type: "number", minimum: 0, maximum: 100 },
        biological: { type: "number", minimum: 0, maximum: 100 },
        cognitive: { type: "number", minimum: 0, maximum: 100 }
      }
    },
    family_history: {
      type: "object",
      properties: {
        cvd: {
          type: "object",
          properties: {
            present: { type: "boolean" },
            first_degree: { type: "boolean" },
            onset: { type: "string" }
          }
        },
        diabetes: {
          type: "object",
          properties: {
            present: { type: "boolean" },
            first_degree: { type: "boolean" },
            onset: { type: "string" }
          }
        },
        cancer: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: { type: "string" },
              relative: { type: "string" },
              onset: { type: "string" }
            }
          }
        }
      }
    },
    symptoms: {
      type: "object",
      properties: {
        gut: { type: "boolean" },
        skin: { type: "boolean" },
        fatigue: { type: "boolean" }
      }
    },
    preferences: {
      type: "object",
      properties: {
        diet: { type: "string" },
        equipment: { type: "string" },
        budget: { type: "string" }
      }
    }
  }
};

// Response validation schema
const responseSchema = {
  type: "object",
  required: ["phase_order", "screenings", "nutrition_archetype", "supplements", "breath_recovery"],
  properties: {
    phase_order: {
      type: "array",
      items: { type: "string" },
      minItems: 1
    },
    screenings: {
      type: "array",
      items: { type: "string" },
      minItems: 1
    },
    nutrition_archetype: { type: "string" },
    supplements: {
      type: "array",
      items: { type: "string" },
      minItems: 1
    },
    breath_recovery: {
      type: "array",
      items: { type: "string" },
      minItems: 1
    }
  }
};

// Phase order calculation
function calculatePhaseOrder(scores: any, symptoms: any): string[] {
  const defaultPhases = ["Decode", "Rebalance", "Strengthen", "Nourish", "Refine", "Sustain"];
  let phases = [...defaultPhases];
  
  // If max(lifestyle_load, physiological) >= 70 → start with Rebalance, then Decode
  if (Math.max(scores.lifestyle_load, scores.physiological) >= 70) {
    phases = ["Rebalance", "Decode", "Strengthen", "Nourish", "Refine", "Sustain"];
  }
  
  // If max(family_risk, biological) >= 70 → move Nourish before Strengthen
  if (Math.max(scores.family_risk, scores.biological) >= 70) {
    const nourishIndex = phases.indexOf("Nourish");
    const strengthenIndex = phases.indexOf("Strengthen");
    
    if (nourishIndex > strengthenIndex) {
      phases.splice(nourishIndex, 1);
      phases.splice(strengthenIndex, 0, "Nourish");
    }
  }
  
  // If cognitive >= 70 → move Refine to index 3
  if (scores.cognitive >= 70) {
    const refineIndex = phases.indexOf("Refine");
    if (refineIndex !== -1) {
      phases.splice(refineIndex, 1);
      phases.splice(3, 0, "Refine");
    }
  }
  
  return phases;
}

// Screening selection logic
function selectScreenings(scores: any, symptoms: any, familyHistory: any): string[] {
  const screenings: string[] = [];
  
  // Core screenings (always include 3-6)
  const coreScreenings = ["CRP", "Lipid panel", "HbA1c", "Vitamin D"];
  
  // Add core screenings
  screenings.push(...coreScreenings);
  
  // Add AM Cortisol if stress-related scores are high
  if (scores.lifestyle_load >= 60 || scores.physiological >= 60) {
    screenings.push("AM Cortisol");
  }
  
  // Add Ferritin/TSH if fatigue symptoms
  if (symptoms?.fatigue) {
    screenings.push("Ferritin", "TSH");
  }
  
  // Limit to 6 screenings maximum
  return screenings.slice(0, 6);
}

// Nutrition archetype selection
function selectNutritionArchetype(scores: any, symptoms: any, familyHistory: any): string {
  // family_risk≥70 or inflammation symptoms → Anti-inflammatory Mediterranean
  if (scores.family_risk >= 70 || (symptoms?.gut || symptoms?.skin)) {
    return "Anti-inflammatory Mediterranean";
  }
  
  // metabolic score≥70 or HbA1c risk → Metabolic-steady
  // Using biological score as metabolic indicator
  if (scores.biological >= 70) {
    return "Metabolic-steady";
  }
  
  // gut/skin → Gut-calming
  if (symptoms?.gut || symptoms?.skin) {
    return "Gut-calming";
  }
  
  // Default to balanced approach
  return "Balanced Mediterranean";
}

// Supplement selection logic
function selectSupplements(scores: any, symptoms: any, preferences: any): string[] {
  const supplements: string[] = [];
  
  // Safe defaults
  supplements.push("Omega-3", "Magnesium glycinate", "Vitamin D3 + K2");
  
  // Probiotic if gut symptoms
  if (symptoms?.gut) {
    supplements.push("Probiotic");
  }
  
  // Creatine if fatigue
  if (symptoms?.fatigue) {
    supplements.push("Creatine");
  }
  
  // Additional supplements based on scores
  if (scores.family_risk >= 70) {
    supplements.push("CoQ10");
  }
  
  if (scores.physiological >= 70) {
    supplements.push("B-Complex");
  }
  
  if (scores.cognitive >= 70) {
    supplements.push("L-Theanine");
  }
  
  return supplements;
}

// Breathwork selection
function selectBreathwork(scores: any, symptoms: any): string[] {
  const breathwork: string[] = [];
  
  // Core breathwork
  breathwork.push("Cardiac coherence", "Physiological sighs");
  
  // Box breathing for stress management
  if (scores.lifestyle_load >= 60 || scores.physiological >= 60) {
    breathwork.push("Box breathing");
  }
  
  // Additional techniques based on symptoms
  if (symptoms?.fatigue) {
    breathwork.push("4-7-8 breathing");
  }
  
  if (scores.cognitive >= 70) {
    breathwork.push("Alternate nostril breathing");
  }
  
  return breathwork;
}

export async function POST(request: NextRequest) {
  try {
    const ajv = new Ajv();
    
    // Parse request body
    const body = await request.json();
    
    // Validate input
    const validate = ajv.compile(inputSchema);
    const valid = validate(body);
    
    if (!valid) {
      return NextResponse.json(
        { 
          ok: false, 
          error: "Invalid input data", 
          details: validate.errors 
        },
        { status: 400 }
      );
    }
    
    const { scores, family_history, symptoms, preferences } = body;
    
    // Calculate personalization
    const phase_order = calculatePhaseOrder(scores, symptoms);
    const screenings = selectScreenings(scores, symptoms, family_history);
    const nutrition_archetype = selectNutritionArchetype(scores, symptoms, family_history);
    const supplements = selectSupplements(scores, symptoms, preferences);
    const breath_recovery = selectBreathwork(scores, symptoms);
    
    const response = {
      phase_order,
      screenings,
      nutrition_archetype,
      supplements,
      breath_recovery
    };
    
    // Validate response
    const validateResponse = ajv.compile(responseSchema);
    const responseValid = validateResponse(response);
    
    if (!responseValid) {
      return NextResponse.json(
        { 
          ok: false, 
          error: "Invalid response data", 
          details: validateResponse.errors 
        },
        { status: 500 }
      );
    }
    
    // Return response
    return NextResponse.json({
      ok: true,
      ...response
    });
    
  } catch (error) {
    console.error('Personalization API Error:', error);
    return NextResponse.json(
      { 
        ok: false, 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
