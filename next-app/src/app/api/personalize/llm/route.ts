import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import Ajv from 'ajv';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Input validation schema
const inputSchema = {
  type: "object",
  required: ["user", "scores", "selections"],
  properties: {
    user: {
      type: "object",
      required: ["name", "age", "sex"],
      properties: {
        name: { type: "string" },
        age: { type: "number" },
        sex: { type: "string", enum: ["male", "female", "other"] }
      }
    },
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
        cvd: { type: "object" },
        diabetes: { type: "object" },
        cancer: { type: "array" }
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
    selections: {
      type: "object",
      required: ["phase_order", "screenings", "nutrition_archetype", "supplements", "breath_recovery"],
      properties: {
        phase_order: { type: "array", items: { type: "string" } },
        screenings: { type: "array", items: { type: "string" } },
        nutrition_archetype: { type: "string" },
        supplements: { type: "array", items: { type: "string" } },
        breath_recovery: { type: "array", items: { type: "string" } }
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

// Response validation schemas
const explanationsSchema = {
  type: "object",
  required: ["explanations"],
  properties: {
    explanations: {
      type: "object",
      required: ["family_risk", "physiological", "lifestyle_load", "biological", "cognitive"],
      properties: {
        family_risk: { type: "string" },
        physiological: { type: "string" },
        lifestyle_load: { type: "string" },
        biological: { type: "string" },
        cognitive: { type: "string" }
      }
    }
  }
};

const screeningsSchema = {
  type: "object",
  required: ["screenings"],
  properties: {
    screenings: {
      type: "array",
      items: {
        type: "object",
        required: ["name", "why", "when"],
        properties: {
          name: { type: "string" },
          why: { type: "string" },
          when: { type: "string" }
        }
      }
    }
  }
};

const nutritionSchema = {
  type: "object",
  required: ["archetype", "principles", "days"],
  properties: {
    archetype: { type: "string" },
    principles: { type: "array", items: { type: "string" } },
    days: {
      type: "array",
      items: {
        type: "object",
        required: ["day", "breakfast", "lunch", "dinner", "snacks"],
        properties: {
          day: { type: "number" },
          breakfast: { type: "string" },
          lunch: { type: "string" },
          dinner: { type: "string" },
          snacks: { type: "array", items: { type: "string" } }
        }
      }
    }
  }
};

const supplementsSchema = {
  type: "object",
  required: ["supplements"],
  properties: {
    supplements: {
      type: "array",
      items: {
        type: "object",
        required: ["name", "dose", "timing", "why", "safety"],
        properties: {
          name: { type: "string" },
          dose: { type: "string" },
          timing: { type: "string" },
          why: { type: "string" },
          safety: { type: "string" }
        }
      }
    }
  }
};

const breathRecoverySchema = {
  type: "object",
  required: ["breath_recovery"],
  properties: {
    breath_recovery: {
      type: "array",
      items: {
        type: "object",
        required: ["name", "how"],
        properties: {
          name: { type: "string" },
          how: { type: "string" }
        }
      }
    }
  }
};

const monthlyModulesSchema = {
  type: "object",
  required: ["months"],
  properties: {
    months: {
      type: "array",
      items: {
        type: "object",
        required: ["name", "goal", "why", "daily", "weekly_reflection"],
        properties: {
          name: { type: "string" },
          goal: { type: "string" },
          why: { type: "string" },
          daily: { type: "array", items: { type: "string" } },
          weekly_reflection: { type: "string" }
        }
      }
    }
  }
};

// Helper function to call OpenAI with retry logic
async function callOpenAIWithRetry(prompt: string, schema: any, maxRetries: number = 2): Promise<any> {
  const ajv = new Ajv();
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a clinical writing assistant. You MUST respond with ONLY valid JSON. No markdown formatting, no code blocks, no additional text, no explanations. The response must be parseable JSON that matches the exact schema provided. Start your response with { and end with }."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      });

      const responseText = completion.choices[0]?.message?.content;
      if (!responseText) {
        throw new Error("No response from OpenAI");
      }

      // Parse JSON response
      const jsonResponse = JSON.parse(responseText);
      
      // Validate against schema
      const validate = ajv.compile(schema);
      const valid = validate(jsonResponse);
      
      if (valid) {
        return jsonResponse;
      } else {
        console.log(`Attempt ${attempt}: JSON validation failed`, validate.errors);
        if (attempt === maxRetries) {
          throw new Error(`JSON validation failed after ${maxRetries} attempts: ${JSON.stringify(validate.errors)}`);
        }
      }
    } catch (error) {
      console.log(`Attempt ${attempt} failed:`, error);
      if (attempt === maxRetries) {
        throw error;
      }
    }
  }
}

// P1 - Vector explanations
async function getVectorExplanations(user: any, scores: any, symptoms: any, familyHistory: any): Promise<any> {
  const prompt = `Provide concise explanations (<=120 words each) for each health score dimension.

User: Age ${user.age}, Sex ${user.sex}
Scores: ${JSON.stringify(scores)}
Symptoms: ${JSON.stringify(symptoms)}
Family History: ${JSON.stringify(familyHistory)}

You MUST respond with ONLY valid JSON in this exact format:
{
  "explanations": {
    "family_risk": "explanation text here",
    "physiological": "explanation text here", 
    "lifestyle_load": "explanation text here",
    "biological": "explanation text here",
    "cognitive": "explanation text here"
  }
}

Return ONLY the JSON object, no additional text.`;

  return await callOpenAIWithRetry(prompt, explanationsSchema);
}

// P2 - Screening guidance
async function getScreeningGuidance(screenings: string[], familyHistory: any, symptoms: any, scores: any): Promise<any> {
  const prompt = `Provide detailed screening guidance for these tests: ${JSON.stringify(screenings)}

Family History: ${JSON.stringify(familyHistory)}
Symptoms: ${JSON.stringify(symptoms)}
Scores: ${JSON.stringify(scores)}

You MUST respond with ONLY valid JSON in this exact format:
{
  "screenings": [
    {
      "name": "Test Name",
      "why": "Detailed explanation of why this test is recommended",
      "when": "When to get this test (timing and frequency)"
    }
  ]
}

Return ONLY the JSON object, no additional text.`;

  return await callOpenAIWithRetry(prompt, screeningsSchema);
}

// P3 - Nutrition examples
async function getNutritionExamples(archetype: string, preferences: any): Promise<any> {
  const prompt = `Create a 3-day meal plan for the ${archetype} nutrition archetype.

Constraints: budget=${preferences.budget}, equipment=${preferences.equipment}, diet=${preferences.diet}
Focus: anti-inflammatory + glucose stability

CRITICAL: You MUST include the "principles" array with exactly 3 nutrition principles.

You MUST respond with ONLY valid JSON in this exact format:
{
  "archetype": "${archetype}",
  "principles": ["Anti-inflammatory foods", "Glucose stability", "Nutrient density"],
  "days": [
    {
      "day": 1,
      "breakfast": "meal description",
      "lunch": "meal description", 
      "dinner": "meal description",
      "snacks": ["snack 1", "snack 2"]
    },
    {
      "day": 2,
      "breakfast": "meal description",
      "lunch": "meal description",
      "dinner": "meal description", 
      "snacks": ["snack 1", "snack 2"]
    },
    {
      "day": 3,
      "breakfast": "meal description",
      "lunch": "meal description",
      "dinner": "meal description",
      "snacks": ["snack 1", "snack 2"]
    }
  ]
}

Return ONLY the JSON object, no additional text.`;

  return await callOpenAIWithRetry(prompt, nutritionSchema);
}

// P4 - Supplements rationale
async function getSupplementsRationale(user: any, scores: any, symptoms: any, supplements: string[], labsOptional?: any): Promise<any> {
  const prompt = `Provide detailed supplement information for these supplements: ${JSON.stringify(supplements)}

User: Age ${user.age}, Sex ${user.sex}
Scores: ${JSON.stringify(scores)}
Symptoms: ${JSON.stringify(symptoms)}
Labs: ${JSON.stringify(labsOptional || {})}

You MUST respond with ONLY valid JSON in this exact format:
{
  "supplements": [
    {
      "name": "Supplement Name",
      "dose": "Recommended dose",
      "timing": "When to take",
      "why": "Scientific rationale for this supplement",
      "safety": "Safety considerations and contraindications"
    }
  ]
}

Return ONLY the JSON object, no additional text.`;

  return await callOpenAIWithRetry(prompt, supplementsSchema);
}

// P5 - Breath & recovery
async function getBreathRecovery(scores: any, sleepHours?: number, sleepQuality?: string): Promise<any> {
  const prompt = `Provide breathwork and recovery techniques based on these health scores.

Scores: ${JSON.stringify(scores)}
Sleep: ${sleepHours || 7} hours, quality: ${sleepQuality || "good"}

You MUST respond with ONLY valid JSON in this exact format:
{
  "breath_recovery": [
    {
      "name": "Technique Name",
      "how": "Step-by-step instructions for the technique"
    }
  ]
}

Return ONLY the JSON object, no additional text.`;

  return await callOpenAIWithRetry(prompt, breathRecoverySchema);
}

// P6 - Monthly modules
async function getMonthlyModules(phaseOrder: string[], archetype: string, supplements: string[], breathRecovery: string[], screenings: string[], topRisks: string[]): Promise<any> {
  const prompt = `Create monthly modules for this personalized health plan.

Phase Order: ${JSON.stringify(phaseOrder)}
Nutrition Archetype: ${archetype}
Supplements: ${JSON.stringify(supplements)}
Breathwork: ${JSON.stringify(breathRecovery)}
Screenings: ${JSON.stringify(screenings)}
Top Risks: ${JSON.stringify(topRisks)}

You MUST respond with ONLY valid JSON in this exact format:
{
  "months": [
    {
      "name": "Phase Name",
      "goal": "What this phase accomplishes",
      "why": "Scientific rationale",
      "daily": ["action 1", "action 2", "action 3"],
      "weekly_reflection": "What to reflect on weekly"
    }
  ]
}

Return ONLY the JSON object, no additional text.`;

  return await callOpenAIWithRetry(prompt, monthlyModulesSchema);
}

// P7 - Executive summary
async function getExecutiveSummary(user: any, topRisks: string[], goals: string[]): Promise<string> {
  const prompt = `Write a 90-120 word executive summary for a personalized longevity blueprint.

User: Age ${user.age}, Sex ${user.sex}
Top Risks: ${JSON.stringify(topRisks)}
Goals: ${JSON.stringify(goals)}

Write a calm, precise executive summary in British English that synthesizes the key findings and recommendations.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a clinical writing assistant. Write a 90-120 word executive summary for a personalized longevity blueprint. Use calm, precise language in British English. Focus on synthesizing key findings and recommendations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 200
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Executive summary error:", error);
    throw error;
  }
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

    const { user, scores, family_history, symptoms, selections, preferences } = body;
    
    // Determine top risks based on highest scores
    const scoreEntries = Object.entries(scores);
    const sortedScores = scoreEntries.sort(([,a], [,b]) => (b as number) - (a as number));
    const topRisks = sortedScores.slice(0, 3).map(([key]) => key);
    
    // Generate goals based on selections
    const goals = [
      `Follow ${selections.nutrition_archetype} nutrition plan`,
      `Complete ${selections.phase_order.length} phase health journey`,
      `Implement ${selections.supplements.length} targeted supplements`,
      `Practice ${selections.breath_recovery.length} breathwork techniques`
    ];

    // Call all LLM prompts in parallel
    const [
      explanations,
      screenings,
      nutrition,
      supplements,
      breathRecovery,
      monthlyModules,
      executiveSummary
    ] = await Promise.all([
      getVectorExplanations(user, scores, symptoms, family_history),
      getScreeningGuidance(selections.screenings, family_history, symptoms, scores),
      getNutritionExamples(selections.nutrition_archetype, preferences),
      getSupplementsRationale(user, scores, symptoms, selections.supplements),
      getBreathRecovery(scores),
      getMonthlyModules(selections.phase_order, selections.nutrition_archetype, selections.supplements, selections.breath_recovery, selections.screenings, topRisks),
      getExecutiveSummary(user, topRisks, goals)
    ]);

    // Return comprehensive response
    return NextResponse.json({
      ok: true,
      explanations: explanations.explanations,
      screenings: screenings.screenings,
      nutrition: nutrition,
      supplements: supplements.supplements,
      breath_recovery: breathRecovery.breath_recovery,
      monthly_modules: monthlyModules.months,
      executive_summary: executiveSummary
    });
    
  } catch (error) {
    console.error('LLM Enrichment API Error:', error);
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
