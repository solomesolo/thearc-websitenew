# 📐 TheArc Architecture Overview

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     TheArc Platform                              │
│                  (Local Repository: v1-baseline)                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
        ┌───────▼────────┐         ┌───────▼────────┐
        │   Website      │         │   Dashboard    │
        │  (next-app/)   │         │ (thearc-app/)  │
        │   Next.js 15   │         │   Next.js      │
        └───────┬────────┘         └───────┬────────┘
                │                           │
                │                           │
    ┌───────────┴───────────┐   ┌──────────┴──────────┐
    │                       │   │                     │
┌───▼────┐           ┌─────▼───▼─────┐        ┌──────▼──────┐
│ Public │           │   Blueprint    │        │    Auth     │
│ Pages  │           │   Components   │        │   System    │
└────────┘           └────────────────┘        └─────────────┘
```

---

## 🌐 Website Structure (next-app/)

```
next-app/
│
├── 📱 Public Pages
│   ├── / (Homepage)
│   ├── /traveler (Traveler persona)
│   ├── /women (Women persona)
│   ├── /rebuilder (Rebuilder persona)
│   └── /events
│
├── 🎯 Blueprint Features (NEW)
│   ├── /blueprint/sample
│   ├── /women/blueprint/sample
│   └── /rebuilder/blueprint/sample
│
├── 🧩 Components
│   ├── BlueprintPreview.tsx ⭐ (NEW)
│   ├── blueprint/
│   │   ├── SampleBlueprintPage.tsx
│   │   ├── WomenSampleBlueprintPage.tsx
│   │   └── RebuilderSampleBlueprintPage.tsx
│   └── sections/
│       ├── PersonalBlueprint.tsx
│       ├── WomenBlueprint.tsx
│       └── RebuilderBlueprint.tsx
│
└── 📊 Analytics
    ├── Google Analytics 4 (G-90L63EEKYH)
    ├── MixPanel
    └── Google Tag Manager (GTM-MJ4KKD9N)
```

---

## 🎯 Dashboard Structure (thearc-app/) - DEPLOYED THIS WEEK

```
thearc-app/
│
├── 🔐 Authentication
│   ├── /login
│   ├── /verify
│   ├── /forgot-password
│   └── /reset-password
│
├── 🏠 Protected Pages
│   ├── /dashboard ⭐ (REDESIGNED)
│   ├── /account
│   ├── /privacy
│   └── /settings
│
├── 📋 Blueprint System (NEW - 11 Modules)
│   │
│   ├── 1️⃣ This Week's Actions ⭐
│   │   ├── WeeklyActions.tsx
│   │   ├── WeeklyActionCard.tsx
│   │   └── /dashboard/actions/[module]
│   │
│   ├── 2️⃣ Monthly Modules Timeline
│   │   └── MonthlyModulesTimeline.tsx
│   │
│   ├── 3️⃣ Nutrition Plan
│   │   └── NutritionPlan.tsx
│   │
│   ├── 4️⃣ Movement & Recovery
│   │   └── MovementRecoveryModule.tsx
│   │
│   ├── 5️⃣ Supplement Protocol
│   │   └── SupplementProtocol.tsx
│   │
│   ├── 6️⃣ Metrics Dashboard
│   │   └── MetricsDashboard.tsx
│   │
│   ├── 7️⃣ Micro Plans
│   │   └── MicroPlans.tsx
│   │
│   ├── 8️⃣ Environmental Reset
│   │   └── EnvironmentalReset.tsx
│   │
│   ├── 9️⃣ Travel Protocol
│   │   └── TravelProtocol.tsx
│   │
│   ├── 🔟 Red Flags
│   │   └── RedFlags.tsx
│   │
│   └── 1️⃣1️⃣ Implementation Calendar
│       └── ImplementationCalendar.tsx
│
├── 🗄️ Database (PostgreSQL + Prisma)
│   ├── User (encrypted emails)
│   ├── Consent (GDPR compliance)
│   ├── VerificationToken
│   └── PasswordResetToken
│
└── 🔧 API Routes
    ├── /api/auth/* (login, register, verify)
    ├── /api/user/* (update, delete, export)
    └── /api/privacy/* (consents, update)
```

---

## 🎨 Design System Comparison

### Website (Public)
```
┌─────────────────────────────────────┐
│  🌐 Website Design                  │
├─────────────────────────────────────┤
│ Theme:     Dark + Emerald           │
│ Background: Radial gradients        │
│ Accent:    Emerald-400 (#34d399)    │
│ Effects:   Glassmorphism            │
│ Animation: DNA particles            │
│ Font:      Montserrat               │
└─────────────────────────────────────┘
```

### Dashboard (Protected)
```
┌─────────────────────────────────────┐
│  🎯 Dashboard Design (NEW)          │
├─────────────────────────────────────┤
│ Theme:     Dark + Teal              │
│ Background: #0a0a0a → #0f0f0f       │
│ Accent:    Teal-500 (#14b8a6)       │
│ Effects:   Glow, shadows            │
│ Animation: Framer Motion            │
│ Font:      System (clinical)        │
└─────────────────────────────────────┘
```

---

## 🔄 Data Flow

### Website User Journey
```
1. Visit Homepage
   ↓
2. See Blueprint Preview (BlueprintPreview.tsx)
   ↓
3. Click "View Sample Blueprint"
   ↓
4. Navigate to /blueprint/sample
   ↓
5. View full sample blueprint
   ↓
6. Sign up for personalized blueprint
```

### Dashboard User Journey
```
1. Register Account
   ↓
2. Verify Email
   ↓
3. Login
   ↓
4. View Dashboard
   ↓
5. See "This Week's Actions" ⭐
   ↓
6. Explore Blueprint Modules (11 sections)
   ↓
7. Track Progress & Metrics
```

---

## 📊 Blueprint Component Hierarchy

```
Dashboard Page
│
├── WelcomeHeader
│
├── 🎯 This Week's Actions ⭐ (NEW)
│   ├── WeeklyActionCard (Nutrition)
│   ├── WeeklyActionCard (Movement)
│   ├── WeeklyActionCard (Sleep)
│   └── WeeklyActionCard (Supplements)
│
├── 📊 Key Metrics
│   ├── MetricCard (Stress Load: 85)
│   ├── MetricCard (Cortisol: 70)
│   ├── MetricCard (Sleep: 55)
│   └── MetricCard (Cognitive: 60)
│
├── 🧬 Biological Profile
│   ├── PredispositionCard
│   └── ScreeningCard
│
├── 📈 Metrics Dashboard
│
├── 📅 Monthly Modules Timeline
│   ├── Month 1: Reset & Assessment
│   ├── Month 2: Strengthen Core
│   ├── Month 3: Metabolic Stability
│   ├── Month 4: Cognitive Performance
│   ├── Month 5: Resilience Layer
│   └── Month 6: Longevity Optimization
│
├── 🥗 Nutrition Plan
│
├── 🏃 Movement & Recovery
│
├── 💊 Supplement Protocol
│
├── 🌿 Environmental Reset
│
├── 📝 Micro Plans
│
├── ✈️ Travel Protocol
│
├── ⚠️ Red Flags
│
├── 📆 Implementation Calendar
│
└── ➡️ Next Steps
```

---

## 🚀 Deployment Status

### Production (Vercel)
```
┌─────────────────────────────────────┐
│  Website: thearcme.com              │
│  Status: ✅ LIVE                    │
│  Last Deploy: Oct 2024              │
│  Features: Blueprint preview        │
└─────────────────────────────────────┘
```

### Local Development
```
┌─────────────────────────────────────┐
│  Dashboard: localhost:3000          │
│  Status: ✅ COMPLETE                │
│  Last Update: Dec 2, 2025 ⭐        │
│  Features: Full blueprint system    │
└─────────────────────────────────────┘
```

---

## 📦 Technology Stack

### Frontend
- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion (dashboard)
- **UI Components:** Custom components

### Backend
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT + Argon2
- **Email:** SendGrid
- **Encryption:** Google Cloud KMS

### Analytics
- **Google Analytics 4:** G-90L63EEKYH
- **MixPanel:** Event tracking
- **Google Tag Manager:** GTM-MJ4KKD9N

---

## 🎯 Key Metrics

### Website
- **Pages:** 15+
- **Components:** 50+
- **Routes:** 20+
- **Analytics:** 3 platforms

### Dashboard
- **Blueprint Modules:** 11
- **Protected Pages:** 5
- **API Endpoints:** 15+
- **Database Tables:** 4

---

## 🔐 Security Features

```
┌─────────────────────────────────────┐
│  🔒 Security Layers                 │
├─────────────────────────────────────┤
│ ✅ Email encryption (KMS)           │
│ ✅ Password hashing (Argon2)        │
│ ✅ JWT sessions (HttpOnly)          │
│ ✅ Email verification required      │
│ ✅ GDPR compliance                  │
│ ✅ CSRF protection                  │
│ ✅ XSS protection                   │
└─────────────────────────────────────┘
```

---

## 📅 Timeline

```
Oct 2024    │ Website deployed to production
            │ Blueprint preview added
            │
Nov 2024    │ Dashboard development started
            │ Authentication system built
            │
Dec 2, 2025 │ ⭐ DASHBOARD REDESIGN COMPLETE
            │ • Full blueprint system (11 modules)
            │ • Weekly actions module
            │ • Premium ARC styling
            │ • Framer Motion animations
            │
Dec 4, 2025 │ 📍 Current status documented
            │ Ready for production deployment
```

---

**Visual Guide Created:** December 4, 2025  
**Branch:** v1-baseline  
**Status:** ✅ Both components ready for deployment
