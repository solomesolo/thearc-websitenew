# Questionnaire API Documentation

## Overview
The Questionnaire API provides standardized scoring (0-100) for health assessment questionnaires based on multiple validated instruments.

## Endpoint

### POST /api/score

**Purpose**: Accept raw questionnaire data, compute standardized scores (0–100), and store the record.

## Request Format

### Sample Request Body
```json
{
  "user": {
    "id": "uuid-123",
    "name": "Anna",
    "age": 35,
    "sex": "female",
    "email": "anna@example.com"
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
  "physiological_patterns": {
    "compass31_raw": 32,
    "compass31_max": 62
  },
  "lifestyle_load": {
    "pss10_raw": 26,
    "pss10_max": 40,
    "sleep_hours": 7,
    "sleep_quality": "good"
  },
  "biological_signals": {
    "waist_cm": 65,
    "height_cm": 176,
    "smoking": "never",
    "activity_min_week": 140,
    "labs_optional": {
      "crp_mg_L": null,
      "hba1c_percent": null,
      "vitamin_d_ng_ml": null,
      "lipids": {
        "ldl": null,
        "hdl": null,
        "tg": null
      }
    }
  },
  "cognitive_rhythm": {
    "cfq_raw": 20,
    "cfq_max": 100,
    "who5_raw": 14,
    "who5_max": 25
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

## Score Calculations

### 1. Family Risk Score (0-100)
- **CVD first-degree & onset <60**: +40 points
- **Diabetes first-degree**: +25 points  
- **Colorectal cancer first-degree**: +20 points
- **Maximum**: 100 points (capped)

### 2. Physiological Score (0-100)
- **Formula**: `(compass31_raw / compass31_max) * 100`
- Based on COMPASS-31 autonomic dysfunction assessment

### 3. Lifestyle Load Score (0-100)
- **Formula**: `(pss10_raw / 40) * 100`
- Based on Perceived Stress Scale (PSS-10)

### 4. Biological Score (0-100)
- **Waist/Height Ratio**:
  - < 0.4: +0 points (Good)
  - 0.4-0.5: +10 points (Moderate risk)
  - > 0.5: +20 points (High risk)
- **Smoking Status**:
  - Never: +0 points
  - Former: +5 points
  - Current: +15 points
- **Activity Level**:
  - ≥150 min/week: +0 points
  - 75-149 min/week: +10 points
  - <75 min/week: +20 points
- **Laboratory Values** (optional):
  - CRP >3 mg/L: +10 points
  - HbA1c >6.5%: +15 points
  - Vitamin D <30 ng/mL: +5 points
  - LDL >160 mg/dL: +10 points
  - HDL <40 mg/dL: +5 points
  - Triglycerides >200 mg/dL: +5 points

### 5. Cognitive Score (0-100)
- **Formula**: `0.6 * (100 - CFQ_score) + 0.4 * WHO5_score`
- CFQ: Cognitive Failures Questionnaire (inverted)
- WHO-5: Well-being Index

## Response Format

### Success Response (200)
```json
{
  "ok": true,
  "scores": {
    "family_risk": 85,
    "physiological": 51.61,
    "lifestyle_load": 65,
    "biological": 10,
    "cognitive": 70.4
  },
  "stored_id": "record-uuid-123"
}
```

### Error Response (400/500)
```json
{
  "ok": false,
  "error": "Invalid input data",
  "details": [
    {
      "instancePath": "/user/email",
      "schemaPath": "#/properties/user/properties/email/type",
      "keyword": "type",
      "params": {"type": "string"},
      "message": "must be string"
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
curl -X POST http://localhost:3000/api/score \
  -H "Content-Type: application/json" \
  -d @test/sample-input.json
```

### Expected Test Results
Using the sample input data:
- **Family Risk**: 85 (CVD +40, Diabetes +25, Cancer +20)
- **Physiological**: 51.61 (32/62 * 100)
- **Lifestyle Load**: 65 (26/40 * 100)
- **Biological**: 10 (Activity penalty +10)
- **Cognitive**: 70.4 (CFQ inverted + WHO-5 weighted)

## Validation

The API uses JSON Schema validation with Ajv for:
- Input data structure validation
- Response format validation
- Type checking for all fields
- Required field validation

## Data Persistence

Currently implemented as a placeholder that:
- Generates unique record IDs
- Logs all data to console
- Returns the stored record ID

**Note**: In production, implement actual database storage (PostgreSQL, MongoDB, etc.)

## Error Handling

- **400 Bad Request**: Invalid input data
- **500 Internal Server Error**: Server-side errors
- Graceful handling of missing optional fields
- Comprehensive error messages with validation details

## Dependencies

- `ajv`: JSON Schema validation
- `next`: Next.js framework
- Built-in Node.js modules

## File Structure

```
src/app/api/score/
├── route.ts                 # Main API endpoint
test/
├── sample-input.json        # Test data
├── test-api.sh             # Test script
└── test-score-calculations.js # Score verification
```
