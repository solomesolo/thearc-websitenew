# User Flow Testing Guide - Women's Questionnaire

## Complete User Journey

### 1. Start Free Screening
**URL**: `/screening/welcome/women` or `/free-screening?persona=women`

- User sees welcome page with information about free screening
- Clicks "Build My Biological Entry Point →"
- Redirects to questionnaire

### 2. Complete Questionnaire
**URL**: `/questionnaire/women`

- User answers all 8 sections (35 questions)
- Questions include: Basic Info, Nutrition, Supplements, Movement, Screenings, Environment, Red Flags, Key Metrics
- Each question has "Why this matters" tooltip
- Progress bar shows completion status
- Click "Complete Assessment →" when done

**What happens:**
- Answers saved to `localStorage.getItem("questionnaireAnswers")`
- Persona saved to `localStorage.getItem("questionnairePersona")`
- Redirects to signup page

### 3. Sign Up / Register
**URL**: `/signup?persona=women&redirect=/loading`

- User fills in registration form:
  - First Name, Last Name
  - Email, Password
  - Country, Timezone
  - Mandatory consents (health data, data transfer, terms, age)
  - Optional consents (marketing, product updates)
- Click "Create Account"

**What happens:**
- Registration API called (`/api/auth/register`)
- On success, redirects to loading page

### 4. Processing / Loading
**URL**: `/loading?persona=women`

- Shows loading animation with progress bar
- Status messages update:
  - "Processing your responses..."
  - "Analyzing your health profile..."
  - "Calculating your risk factors..."
  - "Generating personalized recommendations..."
  - "Preparing your dashboard..."

**What happens:**
- Calls `/api/questionnaire/process-women` API
- API calculates all scores and flags
- Sends data to OpenAI GPT-4 with clinical prompt
- AI generates:
  - Key metric summaries
  - Weekly actions by category
  - Recommended screenings with timing
- Results saved to `localStorage.getItem("questionnaireResults")`
- After ~6 seconds, redirects to dashboard

### 5. Free Dashboard
**URL**: `/dashboard/women/free`

- Displays personalized results:
  - **Key Metrics**: 4 cards with scores (0-100) and AI-generated summaries
    - Stress Load
    - Cortisol Regulation
    - Sleep Quality
    - Cognitive Recovery
  - **This Week's Actions**: Actions by category
    - Nutrition
    - Supplements
    - Movement & Recovery
    - Screenings & Checks
    - Environment
    - Red Flags
  - **Recommended Screenings**: List with timing, reason, and trigger findings
  - **Disclaimer**: Educational information notice
  - **Upgrade CTA**: Link to full dashboard

## Testing Checklist

### ✅ Pre-Test Setup
- [ ] Next.js dev server running (`cd next-app && npm run dev`)
- [ ] OpenAI API key configured in `.env.local`
- [ ] Browser console open (F12) to see logs

### ✅ Test Steps

1. **Navigate to Welcome Page**
   - [ ] Go to `http://localhost:3000/screening/welcome/women`
   - [ ] Verify welcome page displays correctly
   - [ ] Click "Build My Biological Entry Point →"

2. **Complete Questionnaire**
   - [ ] Verify all 8 sections are accessible
   - [ ] Answer at least a few questions in each section
   - [ ] Check "Why this matters" tooltips work
   - [ ] Verify progress bar updates
   - [ ] Click "Complete Assessment →"
   - [ ] Check browser console for: "Questionnaire answers saved"

3. **Sign Up**
   - [ ] Verify redirect to signup page
   - [ ] Fill in all required fields
   - [ ] Check all mandatory consents
   - [ ] Click "Create Account"
   - [ ] Verify redirect to loading page

4. **Loading / Processing**
   - [ ] Verify loading animation displays
   - [ ] Check status messages update
   - [ ] Check browser console for:
     - "Processing your responses..."
     - "Questionnaire processed successfully"
     - Results object logged
   - [ ] Wait for redirect (~6 seconds)

5. **Dashboard Display**
   - [ ] Verify redirect to `/dashboard/women/free`
   - [ ] Check all 4 key metrics display with scores
   - [ ] Verify AI-generated summaries appear
   - [ ] Check weekly actions by category
   - [ ] Verify recommended screenings list
   - [ ] Check disclaimer displays
   - [ ] Verify upgrade CTA button works

### ✅ Expected Results

**Key Metrics:**
- Scores should be 0-100
- Summaries should be personalized and clinically relevant
- Progress bars should reflect scores

**Weekly Actions:**
- Should be actionable, specific items
- Organized by category
- 2-4 items per category typically

**Recommended Screenings:**
- Should have timing (Month 1, Month 2, etc.)
- Should have clinical rationale
- Should list trigger findings

## Troubleshooting

### Issue: Loading page doesn't process
- **Check**: Browser console for API errors
- **Check**: OpenAI API key is set in `.env.local`
- **Check**: Dev server was restarted after adding API key
- **Check**: Network tab shows API call to `/api/questionnaire/process-women`

### Issue: Dashboard shows "No Results Found"
- **Check**: `localStorage.getItem("questionnaireResults")` in browser console
- **Check**: Results were saved during loading page
- **Check**: Browser didn't clear localStorage

### Issue: API returns error
- **Check**: OpenAI API key is valid
- **Check**: API key has sufficient credits
- **Check**: Server logs for detailed error messages

### Issue: Scores seem incorrect
- **Check**: All questions were answered (not left empty)
- **Check**: Answer format matches expected (0-4 for scales, strings for selects)
- **Check**: Scoring logic in `women-questionnaire-scoring.ts`

## Data Flow

```
Questionnaire Answers
  ↓ (localStorage)
Signup Page
  ↓ (API: /api/auth/register)
Loading Page
  ↓ (API: /api/questionnaire/process-women)
  ↓ (OpenAI GPT-4)
Results Object
  ↓ (localStorage)
Dashboard Page
  ↓ (Display)
User sees personalized recommendations
```

## Next Steps After Testing

1. **Verify AI Quality**: Check that recommendations are clinically appropriate
2. **Test Edge Cases**: Empty answers, extreme scores, etc.
3. **Performance**: Check API response times
4. **Error Handling**: Test with invalid API key, network errors
5. **Mobile Responsiveness**: Test on different screen sizes

