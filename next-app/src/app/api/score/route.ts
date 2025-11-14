import { NextRequest, NextResponse } from 'next/server';
import Ajv from 'ajv';

// Input validation schema
const inputSchema = {
  type: "object",
  required: ["user", "family_history", "physiological_patterns", "lifestyle_load", "biological_signals", "cognitive_rhythm"],
  properties: {
    user: {
      type: "object",
      required: ["id", "name", "age", "sex", "email"],
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        age: { type: "number" },
        sex: { type: "string", enum: ["male", "female", "other"] },
        email: { type: "string" }
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
    physiological_patterns: {
      type: "object",
      required: ["compass31_raw", "compass31_max"],
      properties: {
        compass31_raw: { type: "number" },
        compass31_max: { type: "number" }
      }
    },
    lifestyle_load: {
      type: "object",
      required: ["pss10_raw", "pss10_max"],
      properties: {
        pss10_raw: { type: "number" },
        pss10_max: { type: "number" },
        sleep_hours: { type: "number" },
        sleep_quality: { type: "string" }
      }
    },
    biological_signals: {
      type: "object",
      required: ["waist_cm", "height_cm", "smoking", "activity_min_week"],
      properties: {
        waist_cm: { type: "number" },
        height_cm: { type: "number" },
        smoking: { type: "string" },
        activity_min_week: { type: "number" },
        labs_optional: {
          type: "object",
          properties: {
            crp_mg_L: { type: ["number", "null"] },
            hba1c_percent: { type: ["number", "null"] },
            vitamin_d_ng_ml: { type: ["number", "null"] },
            lipids: {
              type: "object",
              properties: {
                ldl: { type: ["number", "null"] },
                hdl: { type: ["number", "null"] },
                tg: { type: ["number", "null"] }
              }
            }
          }
        }
      }
    },
    cognitive_rhythm: {
      type: "object",
      required: ["cfq_raw", "cfq_max", "who5_raw", "who5_max"],
      properties: {
        cfq_raw: { type: "number" },
        cfq_max: { type: "number" },
        who5_raw: { type: "number" },
        who5_max: { type: "number" }
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
    }
  }
};

// Score calculation functions
function calculateFamilyRisk(familyHistory: any): number {
  let score = 0;
  
  // CVD first-degree & onset <60 → +40
  if (familyHistory.cvd?.present && familyHistory.cvd?.first_degree && familyHistory.cvd?.onset === "<60") {
    score += 40;
  }
  
  // Diabetes first-degree → +25
  if (familyHistory.diabetes?.present && familyHistory.diabetes?.first_degree) {
    score += 25;
  }
  
  // Colorectal cancer first-degree → +20
  if (familyHistory.cancer) {
    for (const cancer of familyHistory.cancer) {
      if (cancer.type === "colorectal" && cancer.relative === "mother") {
        score += 20;
        break; // Only count once
      }
    }
  }
  
  // Cap at 100
  return Math.min(score, 100);
}

function calculatePhysiological(physiologicalPatterns: any): number {
  const { compass31_raw, compass31_max } = physiologicalPatterns;
  return (compass31_raw / compass31_max) * 100;
}

function calculateLifestyleLoad(lifestyleLoad: any): number {
  const { pss10_raw } = lifestyleLoad;
  return (pss10_raw / 40) * 100;
}

function calculateBiological(biologicalSignals: any): number {
  let score = 0;
  
  // Waist/height ratio
  const waistHeightRatio = biologicalSignals.waist_cm / biologicalSignals.height_cm;
  if (waistHeightRatio < 0.4) {
    score += 0; // Good ratio
  } else if (waistHeightRatio < 0.5) {
    score += 10; // Moderate risk
  } else {
    score += 20; // High risk
  }
  
  // Smoking
  if (biologicalSignals.smoking === "never") {
    score += 0; // No penalty
  } else if (biologicalSignals.smoking === "former") {
    score += 5; // Slight penalty
  } else {
    score += 15; // High penalty
  }
  
  // Activity level
  if (biologicalSignals.activity_min_week >= 150) {
    score += 0; // Good activity
  } else if (biologicalSignals.activity_min_week >= 75) {
    score += 10; // Moderate activity
  } else {
    score += 20; // Low activity
  }
  
  // Labs (handle null values gracefully)
  const labs = biologicalSignals.labs_optional;
  if (labs) {
    // CRP
    if (labs.crp_mg_L !== null && labs.crp_mg_L > 3) {
      score += 10;
    }
    
    // HbA1c
    if (labs.hba1c_percent !== null && labs.hba1c_percent > 6.5) {
      score += 15;
    }
    
    // Vitamin D
    if (labs.vitamin_d_ng_ml !== null && labs.vitamin_d_ng_ml < 30) {
      score += 5;
    }
    
    // Lipids
    if (labs.lipids) {
      if (labs.lipids.ldl !== null && labs.lipids.ldl > 160) {
        score += 10;
      }
      if (labs.lipids.hdl !== null && labs.lipids.hdl < 40) {
        score += 5;
      }
      if (labs.lipids.tg !== null && labs.lipids.tg > 200) {
        score += 5;
      }
    }
  }
  
  return Math.min(score, 100);
}

function calculateCognitive(cognitiveRhythm: any): number {
  const { cfq_raw, cfq_max, who5_raw, who5_max } = cognitiveRhythm;
  
  // CFQ score (higher is worse, so we invert it)
  const cfqScore = (cfq_raw / cfq_max) * 100;
  
  // WHO-5 score (higher is better, so we keep it as is)
  const who5Score = (who5_raw / who5_max) * 100;
  
  // Combined score: 60% CFQ (inverted) + 40% WHO-5
  return 0.6 * (100 - cfqScore) + 0.4 * who5Score;
}

// Database storage function (placeholder - you'll need to implement actual DB storage)
async function storeRecord(user: any, scores: any, rawData: any): Promise<string> {
  // Generate a UUID for the record
  const recordId = `record-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // In a real implementation, you would store this in your database
  // For now, we'll just log it and return the ID
  console.log('Storing record:', {
    id: recordId,
    user,
    scores,
    rawData,
    timestamp: new Date().toISOString()
  });
  
  return recordId;
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
    
    // Calculate scores
    const scores = {
      family_risk: calculateFamilyRisk(body.family_history),
      physiological: calculatePhysiological(body.physiological_patterns),
      lifestyle_load: calculateLifestyleLoad(body.lifestyle_load),
      biological: calculateBiological(body.biological_signals),
      cognitive: calculateCognitive(body.cognitive_rhythm)
    };
    
    // Validate response
    const validateResponse = ajv.compile(responseSchema);
    const responseValid = validateResponse({ scores });
    
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
    
    // Store record
    const storedId = await storeRecord(body.user, scores, body);
    
    // Return response
    return NextResponse.json({
      ok: true,
      scores,
      stored_id: storedId
    });
    
  } catch (error) {
    console.error('API Error:', error);
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
