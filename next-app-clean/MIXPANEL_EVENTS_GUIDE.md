# 📊 Mixpanel Events Implementation Guide

## ✅ **All Required Events Implemented**

The following Mixpanel events have been successfully implemented across the application:

### **1. `page_view`** ✅ IMPLEMENTED
- **Location**: `MixPanelProvider.tsx`
- **Trigger**: Automatic on every page navigation
- **Data Tracked**:
  - Page name and title
  - URL and referrer
  - User agent and screen resolution
  - Viewport size and timezone
  - Timestamp

### **2. `test_start`** ✅ IMPLEMENTED
- **Location**: `questionnaire/page.tsx`
- **Trigger**: When user starts the health screening questionnaire
- **Data Tracked**:
  - Test type (health_screening)
  - Test ID (unique identifier)
  - Consent status and age
  - Test source
  - Timestamp

### **3. `test_complete`** ✅ IMPLEMENTED
- **Location**: `results/page.tsx`
- **Trigger**: When user completes the health screening and views results
- **Data Tracked**:
  - Test type (health_screening)
  - Test duration in milliseconds and seconds
  - Test ID (unique identifier)
  - Results source
  - Has results flag
  - Timestamp

### **4. `share_reveal`** ✅ IMPLEMENTED
- **Location**: `results.html`
- **Trigger**: When user clicks "Share Your Results" button
- **Data Tracked**:
  - Share type (results)
  - Page information
  - User agent and screen resolution
  - Viewport size and timezone
  - Timestamp

### **5. `marketplace_view`** ✅ IMPLEMENTED
- **Location**: `catalog/page.tsx`
- **Trigger**: When user visits the catalog/marketplace page
- **Data Tracked**:
  - Marketplace section (catalog_main)
  - Page type (catalog)
  - Services available flag
  - Timestamp

## 🔧 **Implementation Details**

### **Mixpanel Utility Class**
Created a comprehensive `MixpanelTracker` utility class in `/src/utils/mixpanel.ts`:

```typescript
// Usage examples:
import { trackTestStart, trackTestComplete, trackShareReveal, trackMarketplaceView } from '../utils/mixpanel';

// Track test start
trackTestStart('health_screening', { consent_given: true });

// Track test completion with timing
trackTestComplete('health_screening', { has_results: true });

// Track share reveal
trackShareReveal('results', { share_method: 'native' });

// Track marketplace view
trackMarketplaceView('catalog_main', { page_type: 'catalog' });
```

### **Enhanced Features**
- **Automatic timing**: Test duration is automatically calculated
- **Error handling**: All tracking calls are wrapped in try-catch blocks
- **Consistent data**: Standardized properties across all events
- **User identification**: Automatic user ID generation and persistence
- **Privacy compliance**: IP tracking disabled, sensitive data filtered

## 📍 **Event Locations**

| Event | File | Function/Component | Trigger |
|-------|------|-------------------|---------|
| `page_view` | `MixPanelProvider.tsx` | `useEffect` | Page navigation |
| `test_start` | `questionnaire/page.tsx` | `useEffect` | Questionnaire start |
| `test_complete` | `results/page.tsx` | `useEffect` | Results page load |
| `share_reveal` | `results.html` | `shareResults()` | Share button click |
| `marketplace_view` | `catalog/page.tsx` | `useEffect` | Catalog page load |

## 🎯 **Additional Events Available**

The utility also provides these additional tracking functions:

- `trackButtonClick()` - Button interactions
- `trackFormSubmission()` - Form submissions
- `trackEmailCollection()` - Email collection
- `trackEmailSent()` - Email delivery
- `updateUserProperties()` - User profile updates
- `incrementUserProperty()` - Counter increments

## 📊 **Data Structure**

All events include these standard properties:
```typescript
{
  timestamp: string,           // ISO timestamp
  page: string,               // Current page path
  url: string,                // Full URL
  user_agent: string,         // Browser info
  screen_resolution: string,  // Screen dimensions
  viewport_size: string,      // Viewport dimensions
  timezone: string,           // User timezone
  referrer: string            // Referring page
}
```

## 🚀 **Deployment Ready**

All Mixpanel events are:
- ✅ **Implemented and tested**
- ✅ **Error-handled**
- ✅ **Privacy-compliant**
- ✅ **Performance-optimized**
- ✅ **Ready for production**

## 🔍 **Testing**

To test the events in development:

1. **Open browser console** to see tracking logs
2. **Navigate between pages** to trigger `page_view`
3. **Start questionnaire** to trigger `test_start`
4. **Complete questionnaire** to trigger `test_complete`
5. **Visit catalog page** to trigger `marketplace_view`
6. **Click share button** to trigger `share_reveal`

## 📈 **Analytics Dashboard**

Events will appear in your Mixpanel dashboard with:
- Real-time event tracking
- User journey analysis
- Conversion funnel tracking
- A/B testing capabilities
- Custom cohort analysis

The implementation provides comprehensive user behavior tracking while maintaining privacy and performance standards.
