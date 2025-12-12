# Menopause Scoring Engine Implementation

## Overview

The ARC Menopause Engine has been implemented for the Women in Menopause persona free screening dashboard. It provides comprehensive scoring, biomarker recommendations, supplement selection, and weekly actions based on questionnaire responses.

## Files Created

### 1. Core Engine (`src/lib/arcMenopauseEngine.ts`)
- Complete scoring engine with all composite calculations
- Menopause-specific profile building with risk flags and key metrics
- Biomarker target derivation (menopause-specific rules)
- Test product selection from catalog
- Supplement selection logic (menopause-focused)
- Weekly actions builder
- Main orchestration function

### 2. Config Converter (`src/lib/menopauseConfigToEngine.ts`)
- Converts JSON questionnaire config to engine format
- Handles scale mappings (severity -> impact_5, frequency -> frequency_5)
- Maps MENO composite to sleep/stress composites
- Transforms question options and composites

### 3. API Integration (`src/app/api/questionnaire/process-women/route.ts`)
- Integrated engine into processing endpoint
- Fetches products/supplements from Supabase (same tables as traveler)
- Returns comprehensive results including:
  - Composite scores (backward compatible)
  - Profile with menopause-specific risk flags
  - Selected screenings
  - Selected tests
  - Selected supplements
  - Weekly actions

## Database Tables Required

Uses the same tables as the Traveller engine:
- `products` table (biomarkers column)
- `Supplements` table

## Menopause-Specific Features

### Risk Flags
- `bone_density_scan_indicated_flag` - Based on age, menopause status, BMI, and activity
- `vitD_testing_indicated_flag` - For bone health and midlife patterns
- `glucose_testing_indicated_flag` - Metabolic risk assessment
- `lipids_testing_indicated_flag` - Cardiovascular risk
- `thyroid_testing_indicated_flag` - Fatigue and mood patterns
- `cortisol_testing_indicated_flag` - Stress and sleep issues
- `high_inflammation_risk_flag` - Cardiometabolic + symptom burden
- `screening_gap_high_flag` - Based on screening history

### Profile Context
- `menstrual_status` - Regular/Irregular/No period/Hormonal contraception/Hysterectomy
- `hrt_use` - No/Estrogen/Progesterone/Combined/Testosterone/DHEA
- `is_postmenopausal` - Calculated from status and age
- `is_perimenopausal` - Calculated from status and age range
- `on_HRT` - Boolean flag

### Biomarker Selection Logic
- Metabolic panel prioritized for midlife weight and cardiometabolic risk
- Vitamin D testing for bone health (age 50+, menopause status)
- Thyroid testing for fatigue/mood patterns
- Nutrient status panel for B12, iron, magnesium
- Cortisol testing for persistent stress/sleep issues
- Gut health assessment for digestive symptoms

### Supplement Selection
- Bone health focus (Vitamin D, Magnesium)
- Metabolic support (Fish Oil, Fiber)
- Stress/sleep support (L-Theanine, Magnesium, B Vitamins)
- HRT-aware recommendations (safety notes)

## API Response Format

```json
{
  "success": true,
  "results": {
    "scores": {
      "nutrition_risk_score": 65,
      "stress_load_score": 72,
      "sleep_quality_score": 68,
      // ... other scores
    },
    "flags": {
      "metabolic_risk_flag": true,
      "poor_sleep_flag": true,
      // ... other flags
    },
    "engine": {
      "profile": {
        "composites": { /* normalized scores */ },
        "key_metrics": { /* 4 key metrics */ },
        "risk_flags": { /* menopause-specific flags */ },
        "immediateConcerns": [],
        "booleanFlags": {},
        "age": 52,
        "bmi": 26.5,
        "menstrual_status": "No period 12+ months",
        "hrt_use": "No",
        "is_postmenopausal": true,
        "is_perimenopausal": false,
        "on_HRT": false
      },
      "screenings": [
        {
          "bundleId": "metabolic_panel",
          "title": "Comprehensive Metabolic Panel...",
          "month": 1,
          "biomarkers": ["HbA1c", "Fasting glucose", ...],
          "triggeredBy": ["Menopause-related cardiometabolic risk..."]
        }
      ],
      "selectedTests": [...],
      "selectedSupplements": [
        {
          "supplement_name": "Vitamin D",
          "priority": "Core",
          "why": "Supports bone, muscle and immune health...",
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

## Field Name Mapping

The engine handles multiple field name formats:
- `Q0_1`, `0.1`, `BG1` → age
- `Q0_2_h`, `0.2_h`, `BG3` → height
- `Q0_2_w`, `0.2_w`, `BG4` → weight
- `Q0_3`, `0.3`, `BG5` → menstrual status
- `Q0_4`, `0.4`, `BG6` → HRT use
- `Q0_5`, `0.5`, `BG7` → diagnoses

## Testing

To test the engine:

1. Complete the women's menopause questionnaire
2. Submit to `/api/questionnaire/process-women`
3. Check the response includes `engine` object with all components
4. Verify products and supplements are fetched from Supabase
5. Verify menopause-specific flags and recommendations

## Next Steps

1. Update women's dashboard to display engine output
2. Show screenings, tests, supplements, and weekly actions
3. Add UI for biomarker-based product recommendations
4. Integrate with catalog for product details
5. Enhance AI prompt with engine output for better recommendations

