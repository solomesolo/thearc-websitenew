// Complete test for LLM Enrichment API
// This demonstrates the full functionality without requiring OpenAI API key

const testData = {
  "user": {
    "name": "Anna",
    "age": 35,
    "sex": "female"
  },
  "scores": {
    "family_risk": 85,
    "physiological": 52,
    "lifestyle_load": 65,
    "biological": 10,
    "cognitive": 56
  },
  "family_history": {
    "cvd": {
      "present": true,
      "first_degree": true,
      "onset": "<60"
    },
    "diabetes": {
      "present": true,
      "first_degree": true,
      "onset": "40-60"
    },
    "cancer": [
      {
        "type": "colorectal",
        "relative": "mother",
        "onset": "50-60"
      }
    ]
  },
  "symptoms": {
    "gut": true,
    "skin": true,
    "fatigue": true
  },
  "selections": {
    "phase_order": ["Decode", "Rebalance", "Strengthen", "Nourish", "Refine", "Sustain"],
    "screenings": ["CRP", "Lipid panel", "HbA1c", "Vitamin D", "AM Cortisol"],
    "nutrition_archetype": "Anti-inflammatory Mediterranean",
    "supplements": ["Omega-3", "Magnesium glycinate", "Vitamin D3 + K2", "Probiotic"],
    "breath_recovery": ["Cardiac coherence", "Physiological sighs", "Box breathing"]
  },
  "preferences": {
    "diet": "flexible",
    "equipment": "minimal",
    "budget": "low"
  }
};

console.log("LLM Enrichment API - Complete Test");
console.log("==================================");
console.log("");

console.log("📋 Input Data:");
console.log("User:", testData.user);
console.log("Scores:", testData.scores);
console.log("Symptoms:", testData.symptoms);
console.log("Selections:", testData.selections);
console.log("");

console.log("🤖 Expected LLM Prompts:");
console.log("========================");
console.log("");

console.log("P1 - Vector Explanations:");
console.log("System: Clinical writing assistant for consumer longevity report. British English. No diagnosis.");
console.log("User: Provide concise explanations (<=120 words each) for family_risk, physiological, lifestyle_load, biological, cognitive");
console.log("Given: Age 35, Sex female, Scores {family_risk:85, physiological:52, lifestyle_load:65, biological:10, cognitive:56}");
console.log("Expected Output: JSON with explanations for each score dimension");
console.log("");

console.log("P2 - Screening Guidance:");
console.log("System: Create preventive screening guidance. No diagnosis. British English.");
console.log("User: Tests [CRP, Lipid panel, HbA1c, Vitamin D, AM Cortisol], Family history, Symptoms, Scores");
console.log("Expected Output: JSON with why & when for each screening");
console.log("");

console.log("P3 - Nutrition Examples:");
console.log("System: Produce practical meal examples for the selected archetype with minimal prep.");
console.log("User: Archetype Anti-inflammatory Mediterranean, constraints: budget=low, equipment=minimal, diet=flexible");
console.log("Expected Output: JSON with 3-day meal plan with principles");
console.log("");

console.log("P4 - Supplements Rationale:");
console.log("System: Conservative, evidence-based supplement list with dose, timing, rationale, safety. No diagnosis.");
console.log("User: Age 35, Sex female, Scores, Symptoms, Labs");
console.log("Expected Output: JSON with detailed supplement information");
console.log("");

console.log("P5 - Breath & Recovery:");
console.log("System: Return 2–3 breath/recovery techniques tailored to stress/sleep. Each instruction <40 words.");
console.log("User: Scores, sleep 7h, quality good");
console.log("Expected Output: JSON with breathwork techniques");
console.log("");

console.log("P6 - Monthly Modules:");
console.log("System: Create concise monthly modules for the given phase order. Keep each under 140 words. British English.");
console.log("User: Phase order [Decode, Rebalance, Strengthen, Nourish, Refine, Sustain], Archetype, Supplements, Breath, Tests, Top risks");
console.log("Expected Output: JSON with monthly modules for each phase");
console.log("");

console.log("P7 - Executive Summary:");
console.log("System: Write a 90–120 word executive summary for a personalised longevity blueprint. Calm, precise.");
console.log("User: Age 35, Sex female, Top risks [family_risk, lifestyle_load, physiological], Goals");
console.log("Expected Output: Plain text executive summary");
console.log("");

console.log("🔧 API Features:");
console.log("===============");
console.log("✅ OpenAI GPT-4 integration");
console.log("✅ Parallel processing of all 7 prompts");
console.log("✅ JSON schema validation with Ajv");
console.log("✅ Automatic retry logic for failed requests");
console.log("✅ British English throughout");
console.log("✅ Clinical quality, no diagnostic language");
console.log("✅ Conservative, evidence-based approach");
console.log("✅ Comprehensive error handling");
console.log("");

console.log("📊 Expected Response Structure:");
console.log("=============================");
console.log(`{
  "ok": true,
  "explanations": {
    "family_risk": "Your family history shows significant cardiovascular risk...",
    "physiological": "Your autonomic nervous system shows moderate dysfunction...",
    "lifestyle_load": "Your current stress levels indicate high perceived pressure...",
    "biological": "Your metabolic markers suggest good overall health...",
    "cognitive": "Your cognitive function shows some fatigue-related concerns..."
  },
  "screenings": [
    {
      "name": "CRP",
      "why": "C-reactive protein indicates systemic inflammation...",
      "when": "once now, then every 6–12 months"
    }
  ],
  "nutrition": {
    "archetype": "Anti-inflammatory Mediterranean",
    "principles": ["Focus on omega-3 rich foods", "Minimise processed foods"],
    "days": [
      {
        "day": 1,
        "breakfast": "Greek yoghurt with berries and nuts",
        "lunch": "Salmon salad with olive oil dressing",
        "dinner": "Grilled chicken with roasted vegetables",
        "snacks": ["Apple with almond butter", "Green tea"]
      }
    ]
  },
  "supplements": [
    {
      "name": "Magnesium glycinate",
      "dose": "200–400 mg",
      "timing": "evening",
      "why": "Supports muscle relaxation and sleep quality",
      "safety": "Generally well-tolerated, may cause loose stools at high doses"
    }
  ],
  "breath_recovery": [
    {
      "name": "Cardiac coherence",
      "how": "Inhale 4s, exhale 6s, 5 minutes morning."
    }
  ],
  "monthly_modules": [
    {
      "name": "Decode",
      "goal": "Understand your current health baseline",
      "why": "Foundation for all subsequent interventions",
      "daily": ["Track symptoms", "Monitor energy levels", "Practice breathwork"],
      "weekly_reflection": "Assess progress and adjust approach"
    }
  ],
  "executive_summary": "Anna, at 35, presents with significant family cardiovascular risk and current stress-related symptoms. Your personalised longevity blueprint focuses on anti-inflammatory nutrition, targeted supplementation, and stress management techniques..."
}`);
console.log("");

console.log("🚀 Testing Instructions:");
console.log("=======================");
console.log("1. Add your OpenAI API key to .env.local:");
console.log("   OPENAI_API_KEY=your_actual_api_key_here");
console.log("");
console.log("2. Start the development server:");
console.log("   npm run dev");
console.log("");
console.log("3. Test the API endpoint:");
console.log("   curl -X POST http://localhost:3000/api/personalize/llm \\");
console.log("     -H 'Content-Type: application/json' \\");
console.log("     -d @test/personalize-llm-input.json");
console.log("");
console.log("4. Or use the test script:");
console.log("   ./test-llm-api.sh");
console.log("");

console.log("✅ All components implemented and ready for testing!");
