# Persona-Based User Journey System

## Overview
This system implements three distinct user profiles, each with their own questionnaire and dashboard, while maintaining the same user journey flow.

## Three Personas

1. **Women in Menopause** (`women`)
   - Route: `/women`
   - Questionnaire: `/questionnaire/women`
   - Dashboard: `/dashboard/women`

2. **Digital Nomads & Global Movers** (`traveler`)
   - Route: `/traveler`
   - Questionnaire: `/questionnaire/traveler`
   - Dashboard: `/dashboard/traveler`

3. **Health Anxious & Rebuilders** (`rebuilder`)
   - Route: `/rebuilder`
   - Questionnaire: `/questionnaire/rebuilder`
   - Dashboard: `/dashboard/rebuilder`

## User Journey Flow

### 1. Entry Point
- User clicks "Free Screening" from homepage or persona page
- Route: `/free-screening?persona={women|traveler|rebuilder}`
- Redirects to: `/screening/welcome?persona={persona}`

### 2. Welcome Page
- **Route**: `/screening/welcome`
- Shows information about free screening
- Persona-specific content
- "Start Free Screening" button → goes to persona-specific questionnaire

### 3. Questionnaire
- **Routes**:
  - `/questionnaire/women`
  - `/questionnaire/traveler`
  - `/questionnaire/rebuilder`
- Different questions for each persona
- Saves answers to localStorage and/or backend

### 4. Registration
- After completing questionnaire
- User must register to see results
- Route: `/email-collection` or `/register`
- Saves persona with user account

### 5. Loading Page
- **Route**: `/loading`
- Shows processing animation
- Fetches personalized results

### 6. Free Screening Dashboard
- **Routes**:
  - `/dashboard/women/free`
  - `/dashboard/traveler/free`
  - `/dashboard/rebuilder/free`
- Shows free results
- Option to "Upgrade to Full Blueprint"

### 7. Payment
- **Route**: `/checkout` or `/payment`
- User pays for full blueprint
- Saves payment status

### 8. Full Dashboard
- **Routes**:
  - `/dashboard/women`
  - `/dashboard/traveler`
  - `/dashboard/rebuilder`
- Complete Executive Blueprint
- All features unlocked

## Implementation Files

### Core System
- `/src/lib/persona.ts` - Persona types, configs, and utilities
- `/src/app/free-screening/page.tsx` - Entry point redirect
- `/src/app/screening/welcome/page.tsx` - Welcome page

### Questionnaire Pages (To Create)
- `/src/app/questionnaire/women/page.tsx`
- `/src/app/questionnaire/traveler/page.tsx`
- `/src/app/questionnaire/rebuilder/page.tsx`

### Dashboard Pages (To Create)
- `/src/app/dashboard/women/free/page.tsx`
- `/src/app/dashboard/traveler/free/page.tsx`
- `/src/app/dashboard/rebuilder/free/page.tsx`
- `/src/app/dashboard/women/page.tsx`
- `/src/app/dashboard/traveler/page.tsx`
- `/src/app/dashboard/rebuilder/page.tsx`

### Registration Integration
- Update `/src/app/email-collection/page.tsx` to save persona
- Update registration API to store persona

### Payment Integration
- Create `/src/app/checkout/page.tsx`
- Create payment API endpoint
- Update dashboard to check payment status

## Persona Tracking

Persona is tracked via:
1. URL parameter: `?persona={type}`
2. localStorage: `selectedPersona`
3. User account: stored in database

## Key Functions

```typescript
// Get persona from route
getPersonaFromRoute(pathname: string): PersonaType | null

// Store persona
setPersona(persona: PersonaType): void

// Get stored persona
getStoredPersona(): PersonaType | null

// Clear persona
clearPersona(): void
```

## Next Steps

1. ✅ Create persona system and utilities
2. ✅ Create welcome page
3. ⏳ Create persona-specific questionnaire pages
4. ⏳ Create persona-specific dashboard pages
5. ⏳ Update registration flow
6. ⏳ Create payment flow
7. ⏳ Update routing throughout app

