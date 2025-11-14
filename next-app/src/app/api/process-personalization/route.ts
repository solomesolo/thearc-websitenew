import { NextRequest, NextResponse } from 'next/server';
import Ajv from 'ajv';

// Input validation schema - more flexible to handle different input formats
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

// Score calculation functions
function calculateFamilyRisk(familyHistory: any): number {
  let score = 0;
  
  if (familyHistory.cvd.present && familyHistory.cvd.first_degree && familyHistory.cvd.onset === '<60') {
    score += 40;
  }
  
  if (familyHistory.diabetes.present && familyHistory.diabetes.first_degree) {
    score += 25;
  }
  
  if (familyHistory.cancer.length > 0) {
    const colorectalCancer = familyHistory.cancer.find((c: any) => c.type === 'colorectal');
    if (colorectalCancer && colorectalCancer.relative === 'mother') {
      score += 20;
    }
  }
  
  return Math.min(score, 100);
}

function calculatePhysiological(physiological: any): number {
  let score = 0;
  
  // Lightheaded standing
  if (physiological.lightheaded_standing === 'often') score += 40;
  else if (physiological.lightheaded_standing === 'sometimes') score += 20;
  
  // Skin color changes
  if (physiological.skin_color_changes) score += 30;
  
  // Temperature sensitivity
  if (physiological.temperature_sensitivity === 'high') score += 30;
  else if (physiological.temperature_sensitivity === 'moderate') score += 15;
  
  return Math.min(score, 100);
}

function calculateLifestyleLoad(lifestyle: any): number {
  let score = 0;
  
  // Overwhelmed
  if (lifestyle.overwhelmed === 'often') score += 40;
  else if (lifestyle.overwhelmed === 'sometimes') score += 20;
  
  // Confidence handling
  if (lifestyle.confidence_handling === 'never') score += 30;
  else if (lifestyle.confidence_handling === 'rarely') score += 15;
  
  // In control
  if (lifestyle.in_control === 'never') score += 30;
  else if (lifestyle.in_control === 'rarely') score += 15;
  
  return Math.min(score, 100);
}

function calculateBiological(biological: any): number {
  let score = 0;
  
  // Age factor
  if (biological.age >= 65) score += 30;
  else if (biological.age >= 45) score += 20;
  else if (biological.age >= 35) score += 10;
  
  // Gender factor
  if (biological.gender === 'male') score += 10;
  
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
  
  // Upset/annoyed
  if (cognitive.upset_annoyed === 'often') score += 30;
  else if (cognitive.upset_annoyed === 'sometimes') score += 15;
  
  // Tense/nervous
  if (cognitive.tense_nervous === 'often') score += 30;
  else if (cognitive.tense_nervous === 'sometimes') score += 15;
  
  // Too many demands
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
  
  // If high cognitive issues, move Refine to index 3
  if (scores.cognitive >= 70) {
    const refineIndex = phases.indexOf("Refine");
    if (refineIndex !== 3) {
      phases.splice(refineIndex, 1);
      phases.splice(3, 0, "Refine");
    }
  }
  
  return phases;
}

function selectScreenings(scores: any, symptoms: any, familyHistory: any): string[] {
  const screenings = [];
  
  // Always include basic screenings
  screenings.push("CRP", "Lipid panel", "HbA1c", "Vitamin D");
  
  // Add based on scores and symptoms
  if (scores.family_risk >= 70 || familyHistory.cvd.present) {
    screenings.push("AM Cortisol");
  }
  
  if (symptoms.fatigue) {
    screenings.push("Ferritin", "TSH");
  }
  
  return screenings.slice(0, 6); // Limit to 6 screenings
}

function selectNutritionArchetype(scores: any, symptoms: any, familyHistory: any): string {
  if (scores.family_risk >= 70 || symptoms.gut || symptoms.skin) {
    return "Anti-inflammatory Mediterranean";
  }
  
  if (scores.biological >= 70) {
    return "Metabolic-steady";
  }
  
  if (symptoms.gut || symptoms.skin) {
    return "Gut-calming";
  }
  
  return "Balanced Mediterranean";
}

function selectSupplements(scores: any, symptoms: any, preferences: any): string[] {
  const supplements = ["Omega-3", "Magnesium glycinate", "Vitamin D3 + K2"];
  
  if (symptoms.gut) {
    supplements.push("Probiotic");
  }
  
  if (symptoms.fatigue) {
    supplements.push("Creatine");
  }
  
  return supplements;
}

function selectBreathwork(scores: any, symptoms: any): string[] {
  return ["Cardiac coherence", "Physiological sighs", "Box breathing"];
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { 
      ok: false, 
      error: "Method not allowed",
      message: "This endpoint only accepts POST requests. Please use the questionnaire to submit your data."
    },
    { 
      status: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    }
  );
}

export async function POST(request: NextRequest) {
  try {
    const ajv = new Ajv();
    
    // Parse request body
    const body = await request.json();
    
    // DEBUG: Log the received data
    console.log('=== API RECEIVED DATA DEBUG ===');
    console.log('Full request body:', JSON.stringify(body, null, 2));
    console.log('Family history:', body.family_history);
    console.log('Physiological patterns:', body.physiological_patterns);
    console.log('Lifestyle load:', body.lifestyle_load);
    console.log('Biological signals:', body.biological_signals);
    console.log('Cognitive rhythm:', body.cognitive_rhythm);
    console.log('=== END API RECEIVED DATA DEBUG ===');
    
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
    
    // Use the actual data from the questionnaire, don't override with defaults
    const familyHistory = body.family_history || {
      cvd: { present: false, first_degree: false, onset: 'unknown' },
      diabetes: { present: false, first_degree: false, onset: 'unknown' },
      cancer: []
    };
    
    const physiologicalPatterns = body.physiological_patterns || {
      lightheaded_standing: 'never',
      skin_color_changes: false,
      temperature_sensitivity: 'normal'
    };
    
    const lifestyleLoad = body.lifestyle_load || {
      overwhelmed: 'never',
      confidence_handling: 'never',
      in_control: 'never'
    };
    
    const biologicalSignals = body.biological_signals || {
      age: 30,
      gender: 'other',
      location: 'urban',
      education: 'university',
      work_status: 'employed'
    };
    
    const cognitiveRhythm = body.cognitive_rhythm || {
      upset_annoyed: 'never',
      tense_nervous: 'never',
      too_many_demands: 'never'
    };
    
    const symptoms = body.symptoms || {
      gut: false,
      skin: false,
      fatigue: false
    };
    
    const preferences = body.preferences || {
      diet: 'flexible',
      equipment: 'minimal',
      budget: 'low'
    };
    
    // Calculate scores
    console.log('=== SCORE CALCULATION DEBUG ===');
    console.log('Family history for scoring:', familyHistory);
    console.log('Physiological patterns for scoring:', physiologicalPatterns);
    console.log('Lifestyle load for scoring:', lifestyleLoad);
    console.log('Biological signals for scoring:', biologicalSignals);
    console.log('Cognitive rhythm for scoring:', cognitiveRhythm);
    
    const scores = {
      family_risk: calculateFamilyRisk(familyHistory),
      physiological: calculatePhysiological(physiologicalPatterns),
      lifestyle_load: calculateLifestyleLoad(lifestyleLoad),
      biological: calculateBiological(biologicalSignals),
      cognitive: calculateCognitive(cognitiveRhythm)
    };
    
    console.log('Calculated scores:', scores);
    console.log('=== END SCORE CALCULATION DEBUG ===');
    
    // Generate personalized recommendations
    const phase_order = calculatePhaseOrder(scores, symptoms);
    const screenings = selectScreenings(scores, symptoms, familyHistory);
    const nutrition_archetype = selectNutritionArchetype(scores, symptoms, familyHistory);
    const supplements = selectSupplements(scores, symptoms, preferences);
    const breath_recovery = selectBreathwork(scores, symptoms);
    
    // Generate LLM content (simplified for this endpoint)
    const explanations = {
      family_risk: `Family risk score of ${Math.round(scores.family_risk)} indicates ${scores.family_risk >= 70 ? 'high' : scores.family_risk >= 40 ? 'moderate' : 'low'} genetic predisposition to health problems.`,
      physiological: `A physiological score of ${Math.round(scores.physiological)} suggests ${scores.physiological >= 70 ? 'elevated' : scores.physiological >= 40 ? 'moderate' : 'good'} physiological health.`,
      lifestyle_load: `Lifestyle load score of ${Math.round(scores.lifestyle_load)} shows ${scores.lifestyle_load >= 70 ? 'high' : scores.lifestyle_load >= 40 ? 'moderate' : 'low'} impact of lifestyle factors on health.`,
      biological: `A biological score of ${Math.round(scores.biological)} indicates ${scores.biological >= 70 ? 'elevated' : scores.biological >= 40 ? 'moderate' : 'low'} biological aging markers.`,
      cognitive: `Cognitive score of ${Math.round(scores.cognitive)} suggests ${scores.cognitive >= 70 ? 'elevated' : scores.cognitive >= 40 ? 'moderate' : 'good'} cognitive health.`
    };
    
    const executive_summary = `Your personalized longevity blueprint is designed for a ${body.user.age}-year-old ${body.user.sex}, considering your family history, lifestyle, and cognitive factors. The blueprint identifies key risk areas and provides tailored strategies to optimize your health and longevity.`;
    
    // Generate PDF data
    const pdfData = {
      user: body.user,
      scores,
      explanations: {
        explanations
      },
      screenings: screenings.map(name => ({
        name,
        why: `Recommended based on your health profile and risk factors.`,
        when: "Consult your healthcare provider for timing."
      })),
      nutrition: {
        archetype: nutrition_archetype,
        principles: [
          "Focus on whole, unprocessed foods",
          "Prioritize anti-inflammatory ingredients",
          "Maintain consistent meal timing"
        ],
        days: [
          {
            day: 1,
            breakfast: "Greek yogurt with berries and nuts",
            lunch: "Grilled salmon with quinoa and vegetables",
            dinner: "Baked chicken with sweet potato and greens",
            snacks: ["Apple with almond butter", "Mixed nuts"]
          },
          {
            day: 2,
            breakfast: "Oatmeal with chia seeds and fruit",
            lunch: "Lentil soup with whole grain bread",
            dinner: "Grilled fish with brown rice and vegetables",
            snacks: ["Greek yogurt", "Vegetable sticks with hummus"]
          },
          {
            day: 3,
            breakfast: "Smoothie with spinach, banana, and protein powder",
            lunch: "Quinoa salad with chickpeas and vegetables",
            dinner: "Turkey meatballs with zucchini noodles",
            snacks: ["Trail mix", "Berries"]
          }
        ]
      },
      supplements: supplements.map(name => ({
        name,
        dose: "As recommended by healthcare provider",
        timing: "As directed",
        why: `Supports your specific health needs and goals.`,
        safety: "Consult your healthcare provider before starting any supplements."
      })),
      breath_recovery: breath_recovery.map(name => ({
        name,
        how: "Practice daily for 5-10 minutes to support stress management and recovery."
      })),
      phase_order,
      months: phase_order.map((phase, index) => ({
        name: phase,
        goal: `Focus on ${phase.toLowerCase()} strategies`,
        why: `Essential for your personalized health journey`,
        daily: [
          "Follow your nutrition plan",
          "Practice breathwork techniques",
          "Monitor your progress"
        ],
        weekly_reflection: "Assess your progress and adjust as needed"
      })),
      executive_summary,
      disclaimer: "This report is educational and informational only. It is not intended to replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals before making significant changes to your health routine."
    };
    
    // Generate PDF
    console.log('Generating PDF with data:', JSON.stringify(pdfData, null, 2));
    const pdfResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/generate-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pdfData)
    });
    
    console.log('PDF response status:', pdfResponse.status);
    console.log('PDF response headers:', Object.fromEntries(pdfResponse.headers.entries()));
    
    if (!pdfResponse.ok) {
      const errorText = await pdfResponse.text();
      console.error('PDF generation failed:', errorText);
      throw new Error(`Failed to generate PDF: ${pdfResponse.status} ${errorText}`);
    }
    
    const pdfBlob = await pdfResponse.blob();
    const pdfUrl = URL.createObjectURL(pdfBlob);
    
    // Return complete results with CORS headers
    return NextResponse.json({
      ok: true,
      scores,
      personalize: {
        phase_order,
        screenings,
        nutrition_archetype,
        supplements,
        breath_recovery
      },
      llm: {
        explanations,
        executive_summary
      },
      pdfUrl,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
    
  } catch (error) {
    console.error('Process Personalization API Error:', error);
    return NextResponse.json(
      { 
        ok: false, 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );
  }
}
