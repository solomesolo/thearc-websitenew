# LLM Enrichment API Documentation

## Overview
The LLM Enrichment API uses OpenAI GPT-4 to transform deterministic personalization selections into polished, clinical-quality text blocks for PDF reports. It provides comprehensive explanations, meal examples, supplement rationales, and monthly modules.

## Endpoint

### POST /api/personalize/llm

**Purpose**: Generate polished text blocks for personalized health reports using OpenAI GPT-4.

## Request Format

### Sample Request Body
```json
{
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
    }
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
}
```

## LLM Prompts

### P1 - Vector Explanations
**Purpose**: Generate concise explanations for each health score dimension.

**System Prompt**: Clinical writing assistant for consumer longevity report. British English. No diagnosis.

**User Prompt**: 
```
Provide concise explanations (<=120 words each) for family_risk, physiological, lifestyle_load, biological, cognitive
given:
Age {{age}}, Sex {{sex}}, Scores {{scores_json}}, Symptoms {{symptoms}}, Family {{family_history}}.
```

**Output Schema**:
```json
{
  "explanations": {
    "family_risk": "string",
    "physiological": "string", 
    "lifestyle_load": "string",
    "biological": "string",
    "cognitive": "string"
  }
}
```

### P2 - Screening Guidance
**Purpose**: Generate "why & when" explanations for recommended screenings.

**System Prompt**: Create preventive screening guidance. No diagnosis. British English.

**User Prompt**:
```
Tests {{tests_array}}, Family {{family_history}}, Symptoms {{symptoms}}, Scores {{scores_json}}
```

**Output Schema**:
```json
{
  "screenings": [
    {
      "name": "string",
      "why": "string", 
      "when": "string"
    }
  ]
}
```

### P3 - Nutrition Examples
**Purpose**: Generate 3-day meal examples for the selected nutrition archetype.

**System Prompt**: Produce practical meal examples for the selected archetype with minimal prep.

**User Prompt**:
```
Archetype {{archetype}}, constraints: budget={{budget}}, equipment={{equipment}}, diet={{diet}},
focus: anti-inflammatory + glucose stability.
```

**Output Schema**:
```json
{
  "archetype": "string",
  "principles": ["string"],
  "days": [
    {
      "day": 1,
      "breakfast": "string",
      "lunch": "string", 
      "dinner": "string",
      "snacks": ["string"]
    }
  ]
}
```

### P4 - Supplements Rationale
**Purpose**: Generate evidence-based supplement information with dosing and safety.

**System Prompt**: Conservative, evidence-based supplement list with dose, timing, rationale, safety. No diagnosis.

**User Prompt**:
```
Age {{age}}, Sex {{sex}}, Scores {{scores_json}}, Symptoms {{symptoms}}, Labs {{labs_optional}}
```

**Output Schema**:
```json
{
  "supplements": [
    {
      "name": "string",
      "dose": "string",
      "timing": "string", 
      "why": "string",
      "safety": "string"
    }
  ]
}
```

### P5 - Breath & Recovery
**Purpose**: Generate breathwork and recovery techniques.

**System Prompt**: Return 2–3 breath/recovery techniques tailored to stress/sleep. Each instruction <40 words.

**User Prompt**:
```
Scores {{scores_json}}, sleep {{sleep_hours}}h, quality {{sleep_quality}}
```

**Output Schema**:
```json
{
  "breath_recovery": [
    {
      "name": "string",
      "how": "string"
    }
  ]
}
```

### P6 - Monthly Modules
**Purpose**: Generate monthly modules for each phase of the health journey.

**System Prompt**: Create concise monthly modules for the given phase order. Keep each under 140 words. British English.

**User Prompt**:
```
Phase order {{phase_order}}, Archetype {{archetype}}, Supplements {{supps}}, Breath {{breath}}, Tests {{tests}},
Top risks {{top_risks}}.
```

**Output Schema**:
```json
{
  "months": [
    {
      "name": "string",
      "goal": "string",
      "why": "string",
      "daily": ["string"],
      "weekly_reflection": "string"
    }
  ]
}
```

### P7 - Executive Summary
**Purpose**: Generate a concise executive summary for the personalized longevity blueprint.

**System Prompt**: Write a 90–120 word executive summary for a personalised longevity blueprint. Calm, precise.

**User Prompt**:
```
Age {{age}}, Sex {{sex}}, Top risks {{top_risks}}, Goals {{goals}}
```

**Output**: Plain text string (90-120 words)

## Response Format

### Success Response (200)
```json
{
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
}
```

### Error Response (400/500)
```json
{
  "ok": false,
  "error": "Invalid input data",
  "details": [
    {
      "instancePath": "/user/age",
      "schemaPath": "#/properties/user/properties/age/type",
      "keyword": "type",
      "params": {"type": "number"},
      "message": "must be number"
    }
  ]
}
```

## Configuration

### Environment Variables
Create a `.env.local` file in the Next.js app root:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

Get your API key from: https://platform.openai.com/api-keys

### Dependencies
```bash
npm install openai ajv
```

## Testing

### Local Test
```bash
# Start the development server
npm run dev

# Test the API endpoint
curl -X POST http://localhost:3000/api/personalize/llm \
  -H "Content-Type: application/json" \
  -d @test/personalize-llm-input.json
```

### Test Script
```bash
# Run the test script
./test-llm-api.sh
```

## Key Features

### 1. **Robust Error Handling**
- JSON validation with Ajv schemas
- Automatic retry logic for failed requests
- Graceful fallback for OpenAI API errors

### 2. **Parallel Processing**
- All 7 prompts executed simultaneously
- Optimized for speed and efficiency
- Comprehensive error handling per prompt

### 3. **Clinical Quality**
- British English throughout
- Evidence-based recommendations
- No diagnostic language
- Conservative, safety-focused approach

### 4. **JSON Validation**
- Strict schema validation for all responses
- Automatic retry with corrected prompts
- Ensures consistent output format

### 5. **Personalization**
- Context-aware prompts based on user data
- Tailored recommendations for age, sex, symptoms
- Risk-stratified content generation

## Integration

This API works as the final step in the health assessment pipeline:

1. **Questionnaire API** (`/api/score`): Computes standardized scores
2. **Personalization API** (`/api/personalize`): Selects interventions
3. **LLM Enrichment API** (`/api/personalize/llm`): Generates polished content

## Cost Optimization

- **Temperature**: 0.3 for consistent, clinical output
- **Max Tokens**: 2000 per prompt (optimized for content length)
- **Model**: GPT-4 for highest quality
- **Parallel Processing**: Reduces total API call time

## File Structure

```
src/app/api/personalize/llm/
├── route.ts                    # Main API endpoint
test/
├── personalize-llm-input.json # Test data
└── test-llm-api.sh            # Test script
```

## Future Enhancements

- **Caching**: Cache common responses to reduce API costs
- **Streaming**: Real-time content generation for better UX
- **Custom Models**: Fine-tuned models for specific use cases
- **Multi-language**: Support for multiple languages
- **Quality Scoring**: Automated content quality assessment
