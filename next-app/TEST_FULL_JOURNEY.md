# Testing the Full User Journey

## Complete Flow Test

### Step 1: Start Free Screening
1. Navigate to: `http://localhost:3000/women`
2. Click "Start free screening"
3. Should redirect to: `/screening/welcome/women`

### Step 2: Complete Free Questionnaire
1. Click "Build My Biological Entry Point →"
2. Complete the free questionnaire (8 sections)
3. Submit → Should redirect to `/signup` (if not logged in) or `/loading` (if logged in)

### Step 3: View Free Dashboard
1. After loading completes, should see `/dashboard/women/free`
2. Verify:
   - Key Metrics display correctly
   - This Week's Actions show
   - Recommended Screenings display
   - Blurred preview cards visible
   - "Unlock Your Full ARC Blueprint" CTA visible

### Step 4: Upgrade to Full Blueprint
1. Click "Upgrade to Full Blueprint" button
2. Should redirect to: `/payment?persona=women`
3. Verify:
   - Payment form is auto-filled (development mode)
   - All required fields present
   - All checkboxes checked
   - Order summary shows $299

### Step 5: Complete Payment
1. Click "Complete Purchase - $299.00"
2. Should redirect to: `/questionnaire/women/full?payment=success`
3. Verify:
   - Full questionnaire loads
   - 9 sections visible
   - Progress bar shows correct progress

### Step 6: Complete Full Questionnaire
1. Complete all 9 sections (95+ questions)
2. Click "Complete & Generate Blueprint" on last section
3. Should redirect to: `/loading?persona=women&type=full`
4. Verify:
   - Loading screen shows "Processing Your Results"
   - Progress bar animates
   - Skeleton metric tiles visible

### Step 7: View Full Dashboard
1. After processing completes, should redirect to: `/dashboard/women`
2. Verify:
   - Sidebar visible on left
   - Key Metrics display actual scores from results
   - All blueprint components render:
     - Weekly Actions
     - Predisposition Card
     - Screening Card
     - Metrics Dashboard
     - Monthly Modules Timeline
     - Performance Path
     - Nutrition Plan
     - Movement & Recovery
     - Supplement Protocol
     - Environmental Reset
     - Red Flags
     - Micro Plans
     - Implementation Calendar
     - Next Steps

## Console Checks

### During Loading Page
- Check browser console for:
  - "Processing full questionnaire for women..."
  - "Scores calculated: {...}"
  - "R8 immediate flag: false/true"
  - "Calling OpenAI..."
  - "Processing complete. Results generated."
  - "Results saved to localStorage: true"
  - "Redirecting to dashboard..."

### During Full Dashboard
- Check browser console for:
  - "Full Dashboard: Checking for results in localStorage"
  - "Full Dashboard: Parsed results: {...}"
  - "Full Dashboard: Results structure: {...}"

## localStorage Keys to Verify

After completing full questionnaire, check localStorage for:
- `fullQuestionnaireAnswers` - All questionnaire answers
- `questionnaireType` - Should be "full"
- `questionnaireResults` - Complete results object with:
  - `scores` - All composite scores
  - `composites` - Raw composite calculations
  - `r8Immediate` - Red flag status
  - `ai_analysis` - Full OpenAI-generated blueprint

## API Endpoints to Monitor

1. `POST /api/questionnaire/process-women-full`
   - Should return 200 OK
   - Response should include `results` object
   - Check for OpenAI API call success

2. Check Network tab for:
   - OpenAI API call to `https://api.openai.com/v1/chat/completions`
   - Should use `gpt-4o` model
   - Should return JSON response

## Common Issues to Check

1. **Payment page not auto-filling**
   - Check `NODE_ENV === "development"`
   - Verify `useEffect` runs on mount

2. **Full questionnaire not loading**
   - Check URL: `/questionnaire/women/full`
   - Verify route exists

3. **Loading page not processing**
   - Check API endpoint: `/api/questionnaire/process-women-full`
   - Verify OpenAI API key is set
   - Check console for errors

4. **Full dashboard showing "No Results Found"**
   - Check localStorage for `questionnaireResults`
   - Verify results were saved in loading page
   - Check retry mechanism (5 retries, 500ms interval)

5. **Scores not displaying**
   - Verify `ai_analysis.key_metrics` exists
   - Check fallback to `scores` object
   - Verify score values are numbers

## Quick Test Script

```javascript
// Run in browser console after completing full questionnaire
console.log("=== Full Journey Test ===");
console.log("1. Full Questionnaire Answers:", localStorage.getItem("fullQuestionnaireAnswers") ? "✅" : "❌");
console.log("2. Questionnaire Type:", localStorage.getItem("questionnaireType"));
console.log("3. Results:", localStorage.getItem("questionnaireResults") ? "✅" : "❌");

const results = JSON.parse(localStorage.getItem("questionnaireResults") || "{}");
console.log("4. Scores:", results.scores ? "✅" : "❌");
console.log("5. AI Analysis:", results.ai_analysis ? "✅" : "❌");
console.log("6. R8 Flag:", results.r8Immediate);
console.log("7. Key Metrics:", results.ai_analysis?.key_metrics ? "✅" : "❌");
```

## Expected Results Structure

```json
{
  "scores": {
    "stress_load_score": 0-100,
    "cortisol_regulation_score": 0-100,
    "sleep_quality_score": 0-100,
    "cognitive_recovery_score": 0-100,
    "movement_recovery_gap_score": 0-100,
    "nutrition_risk_score": 0-100,
    "environment_risk_score": 0-100,
    "supplement_gap_score": 0-100,
    "red_flag_burden_score": 0-100,
    "lifestyle_load_score": 0-100,
    "menopause_symptom_burden": 0-100
  },
  "composites": {
    "SLD": { "raw": number, "normalized": 0-100 },
    "CRT": { "raw": number, "normalized": 0-100 },
    // ... all 12 composites
  },
  "r8Immediate": false,
  "ai_analysis": {
    "key_metrics": { ... },
    "weekly_actions": { ... },
    "biological_profile": { ... },
    "metrics_dashboard": { ... },
    "six_month_modular_path": { ... },
    "performance_path_details": { ... },
    "nutrition_protocol": { ... },
    "movement_recovery_protocols": [ ... ],
    "supplement_protocol": [ ... ],
    "environmental_reset_module": { ... },
    "risk_focused_microplans": [ ... ],
    "travel_protocol": { ... },
    "red_flags_and_thresholds": [ ... ],
    "implementation_calendar": { ... },
    "global_disclaimer": "..."
  }
}
```

