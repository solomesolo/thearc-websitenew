# Issue Summary: Women Dashboard Internal Server Error

## Problem Description

**Issue**: Users cannot proceed to the results dashboard (`/dashboard/women/free`) after completing the free screening survey for the menopause persona. The page shows an "Internal Server Error" when accessed.

**Error Location**: `localhost:3000/dashboard/women/free`

**Error Type**: Internal Server Error (500)

## Root Cause Analysis

The error appears to be a server-side rendering issue, even though the component is marked as `"use client"`. Possible causes:

1. **Module Import Issue**: The API route `/api/questionnaire/process-women` imports `mapQuestionnaireAnswers` from `@/engine`, which may not be resolving correctly during server-side module resolution.

2. **Server-Side Execution**: Even with `"use client"`, Next.js may be attempting to execute some code during the initial server render pass.

3. **Data Processing During Render**: Complex data processing logic running during component initialization may be causing issues.

## Steps Taken Today

### 1. Initial Fixes (API Route)
- ✅ Fixed import in `/api/questionnaire/process-women/route.ts`:
  - Changed from: `import { runMenopauseEngine, mapQuestionnaireAnswers } from "@/engine"`
  - Changed to: `import { runMenopauseEngine } from "@/engine"` and `import { mapQuestionnaireAnswers } from "@/engine/mapQuestionnaireAnswers"`
- ✅ Verified engine exports in `/src/engine/index.ts`:
  - Confirmed `mapQuestionnaireAnswers` is explicitly exported
  - Added `export * from './mapQuestionnaireAnswers'` pattern

### 2. Loading Page Error Handling
- ✅ Improved error handling in `/app/loading/page.tsx`:
  - Added validation to ensure results are saved before redirecting
  - Added error messages that don't get overwritten
  - Changed behavior to redirect back to questionnaire on error (instead of empty dashboard)

### 3. Dashboard Component Fixes
- ✅ Fixed `key={metric.title}` → `key={metric.id}` (metric object doesn't have `title` property)
- ✅ Added defensive null checks for all data access
- ✅ Added safety checks for array operations
- ✅ Moved helper functions outside component to prevent recreation

### 4. Attempted Solutions (Didn't Work)
- ❌ Tried using `useMemo` to process data (still caused errors)
- ❌ Tried adding `mounted` state check (didn't resolve issue)
- ❌ Tried dynamic import with `ssr: false` (still getting error)
- ❌ Tried splitting component into separate `DashboardContent.tsx` file

### 5. Current Implementation
- ✅ **Final approach**: Copied exact structure from working `/dashboard/rebuilder/free/page.tsx`
- ✅ Simplified to match rebuilder pattern exactly
- ✅ Removed all complex data processing patterns
- ✅ Direct data access in render (same as rebuilder)

## Current File Structure

```
next-app/src/app/dashboard/women/free/
├── page.tsx (503 lines) - "use client" component, matches rebuilder structure
```

## Key Differences: Women vs Rebuilder Dashboard

**Rebuilder Dashboard** (WORKS):
- Uses `engine?.profile?.key_metrics` (object with `_score` properties)
- Uses `engine?.weeklyActions` (object with category keys)
- Processes data directly in render

**Women Dashboard** (NOT WORKING):
- Uses `engine?.keyMetrics` (array of metric objects with `id`, `score`, `band`, `description`)
- Uses `engine?.weeklyActions` (array of action objects with `cardId`, `title`, `bullets`)
- Same processing pattern but different data structure

## Files Modified

1. `/next-app/src/app/api/questionnaire/process-women/route.ts`
   - Fixed imports for `mapQuestionnaireAnswers`

2. `/next-app/src/app/loading/page.tsx`
   - Improved error handling and validation

3. `/next-app/src/app/dashboard/women/free/page.tsx`
   - Complete rewrite to match rebuilder structure
   - Simplified data processing
   - Removed dynamic imports

4. `/next-app/src/engine/index.ts`
   - Added explicit export for `mapQuestionnaireAnswers`

## Testing Performed

- ✅ Cleared `.next` build cache multiple times
- ✅ Verified all imports are correct
- ✅ Checked for lint errors (none found)
- ✅ Compared structure with working rebuilder dashboard
- ✅ Verified API route imports

## Current Status

**Still experiencing**: Internal Server Error when accessing `/dashboard/women/free`

**What works**:
- ✅ Questionnaire submission works
- ✅ Loading page processes questionnaire
- ✅ Results are saved to localStorage
- ✅ API route `/api/questionnaire/process-women` works (when called directly)
- ✅ Rebuilder dashboard works perfectly with same structure

**What doesn't work**:
- ❌ Women dashboard page shows Internal Server Error
- ❌ Cannot view results after completing questionnaire

## Next Steps for Debugging

1. **Check server logs**: Look at the actual error message in the terminal/console when accessing the page
2. **Compare with working dashboard**: The rebuilder dashboard works - need to identify what's different
3. **Test API route directly**: Verify `/api/questionnaire/process-women` works when called
4. **Check for layout files**: Verify there are no parent layout files causing issues
5. **Check Sidebar component**: Verify Sidebar component doesn't have server-side issues
6. **Check imports**: Verify all imports (motion, Link, Sidebar) are working correctly

## Questions to Investigate

1. Is the error happening during:
   - Page component initialization?
   - API route execution?
   - Data processing?
   - Component rendering?

2. What's the exact error message in the server logs?

3. Does the error happen:
   - On initial page load?
   - After data is loaded?
   - During data processing?

4. Are there any differences in:
   - How the data is structured for women vs rebuilder?
   - How the component processes the data?
   - Any server-side code that runs differently?

## Environment

- Next.js version: 15.4.1 (Turbopack)
- Framework: Next.js App Router
- Component type: Client Component ("use client")
- Data source: localStorage (from questionnaire processing)

## Request for Help

We need assistance identifying why the women dashboard is throwing an Internal Server Error when:
1. The exact same structure works for rebuilder dashboard
2. All imports are correct
3. The component is marked as "use client"
4. The API route works when tested directly

The error persists despite multiple refactoring attempts. We need to identify the root cause of the server-side error.






