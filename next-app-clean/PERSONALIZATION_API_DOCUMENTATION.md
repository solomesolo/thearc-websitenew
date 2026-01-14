# Personalization API Documentation

## Overview
The Personalization API computes phase order and selects appropriate screenings, nutrition archetype, baseline supplements, and breathwork based on questionnaire scores and user data.

## Endpoint

### POST /api/personalize

**Purpose**: Compute phase order and select personalized health interventions based on scores and symptoms.

## Request Format

### Sample Request Body
```json
{
  "scores": {
    "family_risk": 85,
    "physiological": 51.61,
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
  "preferences": {
    "diet": "flexible",
    "equipment": "minimal",
    "budget": "low"
  }
}
```

## Personalization Logic

### 1. Phase Order Calculation

**Default Phases**: `["Decode", "Rebalance", "Strengthen", "Nourish", "Refine", "Sustain"]`

**Rule 1**: If `max(lifestyle_load, physiological) >= 70` → Start with "Rebalance", then "Decode"
- **Result**: `["Rebalance", "Decode", "Strengthen", "Nourish", "Refine", "Sustain"]`

**Rule 2**: If `max(family_risk, biological) >= 70` → Move "Nourish" before "Strengthen"
- **Result**: `["Decode", "Rebalance", "Nourish", "Strengthen", "Refine", "Sustain"]`

**Rule 3**: If `cognitive >= 70` → Move "Refine" to index 3
- **Result**: `["Decode", "Rebalance", "Strengthen", "Refine", "Nourish", "Sustain"]`

### 2. Screening Selection

**Core Screenings** (always included):
- CRP
- Lipid panel  
- HbA1c
- Vitamin D

**Additional Screenings**:
- **AM Cortisol**: If `lifestyle_load >= 60` OR `physiological >= 60`
- **Ferritin + TSH**: If `fatigue` symptoms present
- **Maximum**: 6 screenings total

### 3. Nutrition Archetype Selection

**Anti-inflammatory Mediterranean**:
- `family_risk >= 70` OR
- Inflammation symptoms (`gut` OR `skin`)

**Metabolic-steady**:
- `biological >= 70` (metabolic risk)

**Gut-calming**:
- `gut` OR `skin` symptoms (if not already Anti-inflammatory)

**Balanced Mediterranean** (default):
- All other cases

### 4. Supplement Selection

**Safe Defaults** (always included):
- Omega-3
- Magnesium glycinate
- Vitamin D3 + K2

**Conditional Supplements**:
- **Probiotic**: If `gut` symptoms
- **Creatine**: If `fatigue` symptoms
- **CoQ10**: If `family_risk >= 70`
- **B-Complex**: If `physiological >= 70`
- **L-Theanine**: If `cognitive >= 70`

### 5. Breathwork Selection

**Core Techniques** (always included):
- Cardiac coherence
- Physiological sighs

**Additional Techniques**:
- **Box breathing**: If `lifestyle_load >= 60` OR `physiological >= 60`
- **4-7-8 breathing**: If `fatigue` symptoms
- **Alternate nostril breathing**: If `cognitive >= 70`

## Response Format

### Success Response (200)
```json
{
  "ok": true,
  "phase_order": [
    "Decode",
    "Rebalance", 
    "Nourish",
    "Strengthen",
    "Refine",
    "Sustain"
  ],
  "screenings": [
    "CRP",
    "Lipid panel",
    "HbA1c", 
    "Vitamin D",
    "AM Cortisol",
    "Ferritin"
  ],
  "nutrition_archetype": "Anti-inflammatory Mediterranean",
  "supplements": [
    "Omega-3",
    "Magnesium glycinate",
    "Vitamin D3 + K2",
    "Probiotic",
    "Creatine",
    "CoQ10"
  ],
  "breath_recovery": [
    "Cardiac coherence",
    "Physiological sighs",
    "Box breathing",
    "4-7-8 breathing"
  ]
}
```

### Error Response (400/500)
```json
{
  "ok": false,
  "error": "Invalid input data",
  "details": [
    {
      "instancePath": "/scores/family_risk",
      "schemaPath": "#/properties/scores/properties/family_risk/type",
      "keyword": "type",
      "params": {"type": "number"},
      "message": "must be number"
    }
  ]
}
```

## Testing

### Local Test
```bash
# Start the development server
npm run dev

# Test the API endpoint
curl -X POST http://localhost:3000/api/personalize \
  -H "Content-Type: application/json" \
  -d '{
    "scores":{"family_risk":85,"physiological":51.61,"lifestyle_load":65,"biological":10,"cognitive":56},
    "family_history":{"cvd":{"present":true,"first_degree":true,"onset":"<60"}},
    "symptoms":{"gut":true,"skin":true,"fatigue":true},
    "preferences":{"diet":"flexible","equipment":"minimal","budget":"low"}
  }'
```

### Expected Test Results
Using the sample input data:
- **Phase Order**: `["Decode", "Rebalance", "Nourish", "Strengthen", "Refine", "Sustain"]`
- **Screenings**: `["CRP", "Lipid panel", "HbA1c", "Vitamin D", "AM Cortisol", "Ferritin"]`
- **Nutrition**: `"Anti-inflammatory Mediterranean"`
- **Supplements**: `["Omega-3", "Magnesium glycinate", "Vitamin D3 + K2", "Probiotic", "Creatine", "CoQ10"]`
- **Breathwork**: `["Cardiac coherence", "Physiological sighs", "Box breathing", "4-7-8 breathing"]`

## Validation

The API uses JSON Schema validation with Ajv for:
- Input data structure validation
- Response format validation
- Score range validation (0-100)
- Required field validation

## Key Features

- **Deterministic Logic**: Pure rule-based personalization
- **No AI Required**: All decisions based on clear thresholds
- **Comprehensive Coverage**: All health domains addressed
- **Flexible Rules**: Easy to modify thresholds and logic
- **Validated Output**: Ensures all arrays are non-empty and aligned

## File Structure

```
src/app/api/personalize/
├── route.ts                    # Main API endpoint
test/
├── personalize-test.json       # Test data
└── test-personalization-logic.js # Logic verification
```

## Integration

This API works seamlessly with the Questionnaire API (`/api/score`) to provide a complete health assessment and personalization pipeline:

1. **Questionnaire API**: Computes standardized scores from raw questionnaire data
2. **Personalization API**: Uses scores to generate personalized health plan

## Future Enhancements

- **Machine Learning Integration**: Add ML models for more sophisticated personalization
- **Dynamic Thresholds**: Adjust thresholds based on user demographics
- **A/B Testing**: Support for testing different personalization strategies
- **User Feedback**: Incorporate user preferences and outcomes
