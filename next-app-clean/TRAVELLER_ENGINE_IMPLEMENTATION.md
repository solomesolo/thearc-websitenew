# Traveller Scoring Engine Implementation

## Overview

The ARC Traveller Engine has been implemented for the Global Mover / Traveller persona free screening dashboard. It provides comprehensive scoring, biomarker recommendations, supplement selection, and weekly actions based on questionnaire responses.

## Files Created

### 1. Core Engine (`src/lib/arcTravellerEngine.ts`)
- Complete scoring engine with all composite calculations
- Profile building with risk flags and key metrics
- Biomarker target derivation
- Test product selection from catalog
- Supplement selection logic
- Weekly actions builder
- Main orchestration function

### 2. Supabase Integration (`src/lib/travellerSupabaseData.ts`)
- Fetches test products from `products` table (biomarkers column)
- Fetches supplements from `Supplements` table
- Handles various biomarker data formats (string, array, JSONB)
- Parallel fetching for performance

### 3. Config Converter (`src/lib/travelerConfigToEngine.ts`)
- Converts JSON questionnaire config to engine format
- Handles scale mappings
- Transforms question options and composites

### 4. API Integration (`src/app/api/questionnaire/process-traveler/route.ts`)
- Integrated engine into processing endpoint
- Fetches products/supplements from Supabase
- Returns comprehensive results including:
  - Composite scores
  - Profile with risk flags
  - Selected screenings
  - Selected tests
  - Selected supplements
  - Weekly actions

## Database Tables Required

### `products` table
- **Columns needed:**
  - `id` (primary key)
  - `name` (product name)
  - `biomarkers` (JSONB or array - contains biomarker names)
  - `available` (boolean)

### `Supplements` table
- **Columns needed:**
  - `id` (primary key)
  - `supplement_name` (string - must match engine logic)
  - `biomarker` (optional string)
  - `category` (optional string)
  - `red_flags` or `safety_notes` or `safety_note` (optional string)

## How It Works

1. **Questionnaire Submission**
   - User completes traveler questionnaire
   - Responses sent to `/api/questionnaire/process-traveler`

2. **Scoring**
   - Engine computes 12 composite scores (SLD, CRT, SLP, CRV, CRY, MOB, NUT, ENV, RFB, LIF, MET, TRV)
   - Builds traveler profile with risk flags and key metrics

3. **Biomarker Selection**
   - Engine analyzes profile and responses
   - Determines which biomarkers to test
   - Groups into screening bundles (metabolic_panel, vitamin_d, etc.)

4. **Product Matching**
   - Fetches products from Supabase `products` table
   - Matches products by biomarker names
   - Creates test product list

5. **Supplement Selection**
   - Fetches supplements from Supabase `Supplements` table
   - Applies selection logic based on profile
   - Prioritizes supplements (Core, Optional, Discuss_with_clinician)
   - Includes safety notes from database

6. **Weekly Actions**
   - Generates personalized actions for:
     - Nutrition
     - Supplements
     - Movement & Recovery
     - Screenings & Checks
     - Environment
     - Red Flags

## API Response Format

```json
{
  "success": true,
  "results": {
    "scores": {
      "stress_load_score": 65,
      "cortisol_regulation_score": 45,
      "sleep_quality_score": 72,
      // ... other scores
    },
    "flags": {
      "upcoming_travel_within_6w": true,
      "has_immediate_concern": false
    },
    "engine": {
      "profile": {
        "composites": { /* normalized scores */ },
        "key_metrics": { /* 5 key metrics */ },
        "risk_flags": { /* 9 risk flags */ },
        "immediateConcerns": [],
        "booleanFlags": {},
        "bmi": 25.5,
        "age": 35
      },
      "screenings": [
        {
          "bundleId": "metabolic_panel",
          "title": "Comprehensive Metabolic Panel...",
          "month": 1,
          "biomarkers": ["HbA1c", "Fasting glucose", ...],
          "triggeredBy": ["Multiple cardiometabolic risk indicators..."]
        }
      ],
      "selectedTests": [
        {
          "id": "123-HbA1c",
          "name": "HbA1c Test",
          "biomarker": "HbA1c"
        }
      ],
      "selectedSupplements": [
        {
          "supplement_name": "Fish Oil/Omega-3s",
          "priority": "Core",
          "why": "Supports triglycerides...",
          "safety_note": ""
        }
      ],
      "weeklyActions": {
        "nutrition": ["..."],
        "supplements": ["..."],
        "movement_recovery": ["..."],
        "screenings_checks": ["..."],
        "environment": ["..."],
        "red_flags": ["..."]
      }
    }
  }
}
```

## Testing

To test the engine:

1. Complete the traveler questionnaire
2. Submit to `/api/questionnaire/process-traveler`
3. Check the response includes `engine` object with all components
4. Verify products and supplements are fetched from Supabase

## Next Steps

1. Update traveler dashboard to display engine output
2. Show screenings, tests, supplements, and weekly actions
3. Add UI for biomarker-based product recommendations
4. Integrate with catalog for product details

