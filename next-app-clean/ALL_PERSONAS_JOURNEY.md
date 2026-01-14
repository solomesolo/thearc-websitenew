# Complete User Journey for All Personas

## Overview
The complete user journey has been implemented for all three personas:
- **Women in Menopause** (`women`)
- **Digital Nomads & Global Movers** (`traveler`)
- **Health Anxious & Rebuilders** (`rebuilder`)

## Complete Flow for Each Persona

### 1. Entry Point
- User clicks "Start free screening" from persona landing page
- Routes:
  - `/women` → `/free-screening?persona=women`
  - `/traveler` → `/free-screening?persona=traveler`
  - `/rebuilder` → `/free-screening?persona=rebuilder`

### 2. Welcome Page
- **Routes**:
  - `/screening/welcome/women`
  - `/screening/welcome/traveler`
  - `/screening/welcome/rebuilder`
- Shows persona-specific information about free screening
- "Build My Biological Entry Point →" button → goes to persona-specific questionnaire

### 3. Free Questionnaire
- **Routes**:
  - `/questionnaire/women`
  - `/questionnaire/traveler`
  - `/questionnaire/rebuilder`
- 8 sections with same questions (will be customized later)
- Saves answers to `localStorage` as `questionnaireAnswers`
- Redirects to `/signup` (if not logged in) or `/loading` (if logged in)

### 4. Registration
- After completing questionnaire
- Route: `/signup?persona={persona}&redirect=/loading`
- User must register to see results

### 5. Loading Page
- **Route**: `/loading?persona={persona}&type=free`
- Shows processing animation
- Calls appropriate API endpoint:
  - `/api/questionnaire/process-women`
  - `/api/questionnaire/process-traveler`
  - `/api/questionnaire/process-rebuilder`
- Saves results to `localStorage` as `questionnaireResults`
- Redirects to free dashboard

### 6. Free Screening Dashboard
- **Routes**:
  - `/dashboard/women/free`
  - `/dashboard/traveler/free`
  - `/dashboard/rebuilder/free`
- Shows free results:
  - Key Metrics
  - This Week's Actions
  - Recommended Screenings
  - Blurred preview of full blueprint
- "Upgrade to Full Blueprint" button → `/payment?persona={persona}`

### 7. Payment Page
- **Route**: `/payment?persona={persona}`
- Auto-fills with dummy data in development
- All required fields and checkboxes
- "Complete Purchase" → `/questionnaire/{persona}/full?payment=success`

### 8. Full Questionnaire
- **Routes**:
  - `/questionnaire/women/full`
  - `/questionnaire/traveler/full`
  - `/questionnaire/rebuilder/full`
- 9 sections with 95+ questions (same as women for now, will be customized)
- Saves answers to `localStorage` as `fullQuestionnaireAnswers`
- "Complete & Generate Blueprint" → `/loading?persona={persona}&type=full`

### 9. Loading Page (Full)
- **Route**: `/loading?persona={persona}&type=full`
- Shows processing animation
- Calls appropriate API endpoint:
  - `/api/questionnaire/process-women-full`
  - `/api/questionnaire/process-traveler-full`
  - `/api/questionnaire/process-rebuilder-full`
- Saves results to `localStorage` as `questionnaireResults`
- Redirects to full dashboard

### 10. Full Dashboard
- **Routes**:
  - `/dashboard/women`
  - `/dashboard/traveler`
  - `/dashboard/rebuilder`
- Shows complete ARC Blueprint:
  - Weekly Actions
  - Key Metrics (with actual scores)
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

## API Endpoints

### Free Screening Processing
- `POST /api/questionnaire/process-women`
- `POST /api/questionnaire/process-traveler`
- `POST /api/questionnaire/process-rebuilder`

### Full Blueprint Processing
- `POST /api/questionnaire/process-women-full`
- `POST /api/questionnaire/process-traveler-full`
- `POST /api/questionnaire/process-rebuilder-full`

**Note**: Currently, all personas use the same scoring engine and prompts as women. Questions will be customized later.

## File Structure

```
next-app/src/app/
├── questionnaire/
│   ├── women/
│   │   ├── page.tsx (free)
│   │   └── full/page.tsx
│   ├── traveler/
│   │   ├── page.tsx (free)
│   │   └── full/page.tsx
│   └── rebuilder/
│       ├── page.tsx (free)
│       └── full/page.tsx
├── screening/welcome/
│   ├── women/page.tsx
│   ├── traveler/page.tsx
│   └── rebuilder/page.tsx
├── dashboard/
│   ├── women/
│   │   ├── page.tsx (full)
│   │   └── free/page.tsx
│   ├── traveler/
│   │   ├── page.tsx (full)
│   │   └── free/page.tsx
│   └── rebuilder/
│       ├── page.tsx (full)
│       └── free/page.tsx
└── api/questionnaire/
    ├── process-women/route.ts
    ├── process-women-full/route.ts
    ├── process-traveler/route.ts
    ├── process-traveler-full/route.ts
    ├── process-rebuilder/route.ts
    └── process-rebuilder-full/route.ts
```

## Testing Checklist

For each persona (women, traveler, rebuilder):

- [ ] Free screening button from landing page works
- [ ] Welcome page displays correctly
- [ ] Free questionnaire loads and saves answers
- [ ] Registration flow works
- [ ] Loading page processes questionnaire
- [ ] Free dashboard displays results
- [ ] Upgrade button redirects to payment
- [ ] Payment page auto-fills in dev mode
- [ ] Full questionnaire loads and saves answers
- [ ] Loading page processes full questionnaire
- [ ] Full dashboard displays complete blueprint

## Notes

1. **Questions**: All personas currently use the same questions as women. These will be customized later.

2. **Scoring**: All personas use the same scoring engine (`arc-scoring-engine.ts`) and prompts. This will be customized per persona later.

3. **localStorage Keys**:
   - `questionnaireAnswers` - Free questionnaire answers
   - `fullQuestionnaireAnswers` - Full questionnaire answers
   - `questionnaireResults` - Processed results (used by dashboards)
   - `selectedPersona` - Current persona
   - `questionnaireType` - "free" or "full"

4. **Persona Detection**: The system detects persona from:
   - URL parameter (`?persona={type}`)
   - localStorage (`selectedPersona`)
   - Route pathname

## Next Steps

1. Customize questions for traveler and rebuilder personas
2. Create persona-specific scoring engines and prompts
3. Add persona-specific content to welcome pages
4. Test complete flow for each persona
5. Add error handling and edge cases

