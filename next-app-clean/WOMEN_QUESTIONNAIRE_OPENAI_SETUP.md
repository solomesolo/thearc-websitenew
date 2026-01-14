# Women's Questionnaire OpenAI Processing - Setup Complete

## Overview

The women's questionnaire (free screening) now processes responses through OpenAI GPT-4 using a comprehensive clinical prompt. This generates personalized recommendations, key metric explanations, and screening roadmaps.

## Components

### 1. Scoring System (`src/lib/women-questionnaire-scoring.ts`)
- Calculates all section scores (0-100)
- Computes key metrics (stress load, cortisol regulation, sleep quality, cognitive recovery)
- Derives clinical flags (metabolic risk, inflammation risk, testing indicators, etc.)
- Handles BMI calculation and menopause context

### 2. OpenAI Prompt (`src/lib/women-questionnaire-prompt.ts`)
- Uses exact clinical prompt as specified
- Formats questionnaire data into required JSON structure
- Includes demographics, raw scores, derived scores, and clinical flags

### 3. Processing API (`src/app/api/questionnaire/process-women/route.ts`)
- Only processes "women" persona (free screening)
- Calculates scores using deterministic logic
- Sends data to OpenAI GPT-4 with clinical prompt
- Returns structured results: scores, flags, AI analysis, demographics

### 4. Loading Page Integration (`src/app/loading/page.tsx`)
- Automatically calls processing API when loading
- Stores results in `localStorage` for dashboard
- Handles errors gracefully

## Environment Setup

✅ **OpenAI API Key**: Configured in `.env.local`
```
OPENAI_API_KEY=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
```

## User Flow

1. **User completes questionnaire** → Answers saved to `localStorage`
2. **User signs up/registers** → Redirects to `/loading?persona=women`
3. **Loading page** → Calls `/api/questionnaire/process-women`
4. **API processes**:
   - Calculates all scores and flags
   - Sends data to OpenAI GPT-4
   - Returns structured results
5. **Results stored** → `localStorage.getItem('questionnaireResults')`
6. **Dashboard** → Reads and displays results

## API Endpoint

**POST** `/api/questionnaire/process-women`

### Request Body
```json
{
  "persona": "women",
  "responseData": {
    "0.1": "48",
    "0.2": "165, 70",
    "0.3": "Irregular periods",
    // ... all questionnaire answers
  }
}
```

### Response
```json
{
  "success": true,
  "results": {
    "scores": {
      "stress_load_score": 75,
      "sleep_quality_score": 65,
      "nutrition_risk_score": 60,
      // ... all calculated scores
    },
    "flags": {
      "metabolic_risk_flag": true,
      "poor_sleep_flag": true,
      // ... all clinical flags
    },
    "ai_analysis": {
      "key_metrics": {
        "stress_load": { "score": 75, "summary": "..." },
        "cortisol_regulation": { "score": 70, "summary": "..." },
        "sleep_quality": { "score": 65, "summary": "..." },
        "cognitive_recovery": { "score": 60, "summary": "..." }
      },
      "weekly_actions": {
        "nutrition": ["action 1", "action 2"],
        "supplements": ["action 1"],
        "movement_recovery": ["action 1", "action 2"],
        "screenings_checks": ["action 1"],
        "environment": ["action 1"],
        "red_flags": ["action 1"]
      },
      "recommended_screenings": [
        {
          "screening": "Full blood panel",
          "timing": "Month 1",
          "reason": "...",
          "trigger_findings": ["..."]
        }
      ],
      "global_disclaimer": "..."
    },
    "demographics": {
      "age": 48,
      "bmi": 25.7,
      "postmenopausal": false,
      "on_estrogen_or_combined": false
    }
  }
}
```

## Testing

### Option 1: Test Script
```bash
cd next-app
node test-women-questionnaire-api.js
```

### Option 2: UI Flow
1. Complete the women's questionnaire at `/questionnaire/women`
2. Sign up/register
3. Loading page will automatically process
4. Check browser console for results
5. Dashboard can read from `localStorage.getItem('questionnaireResults')`

## Clinical Prompt

The system uses the exact clinical prompt specified, which:
- Positions AI as a board-certified medical clinician
- Focuses on risk-stratified education (not diagnosis)
- Generates weekly actions, key metric explanations, and screening roadmaps
- Emphasizes consultation with healthcare providers

## Scoring Logic

All scores are calculated deterministically:
- **Section Scores**: Nutrition risk, supplement gap, movement gap, screening gap, environment risk, red flag burden
- **Key Metrics**: Stress load, cortisol regulation, sleep quality, cognitive recovery
- **Clinical Flags**: Metabolic risk, inflammation risk, testing indicators, etc.

## Next Steps

1. ✅ OpenAI API key configured
2. ✅ Scoring system implemented
3. ✅ API endpoint created
4. ✅ Loading page integrated
5. ⏳ Dashboard integration (read from `localStorage.getItem('questionnaireResults')`)
6. ⏳ Display AI-generated recommendations in dashboard

## Notes

- Only processes "women" persona for free screening
- Results are stored in localStorage (can be extended to database)
- OpenAI API key must be set in `.env.local`
- Restart dev server after adding API key

