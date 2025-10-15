# Carbon Calculator Enhancement Plan

## Overview
This plan covers three major enhancements to the Forevergreen website:
1. Update navigation menu with new items and working Carbon Calculator link
2. Match calculator styling to the landing page design system
3. Integrate Firebase Authentication and Firestore for data persistence

---

## Task 1: Update Navigation Component

### Current State
- Navigation has: Home, Course, Carbon Credits, Projects, Blog, About, FAQs, Shop, Cart
- Carbon Calculator is not in the menu

### Required Changes
**Update navigation items to:**
- Home
- Carbon Calculator (with working link to `/carbon-calculator`)
- Shop
- Course
- Blog
- About

### Implementation Steps
1. **Edit `src/components/Navigation.tsx`**
   - Update `navigationItems` array to match new menu structure
   - Add proper routing for Carbon Calculator link
   - Ensure active state tracking works for Carbon Calculator page
   - Keep "Get Started" CTA button

2. **Files to Modify:**
   - `src/components/Navigation.tsx` (lines 7-17)

---

## Task 2: Match Calculator Styling to Landing Page

### Design System Analysis
**Landing Page Style:**
- **Colors:** Green primary (#217E38), gradient backgrounds (from-green-50 to-white)
- **Typography:** Large bold headings, clean sans-serif
- **Components:** Cards with shadows, rounded corners (12px), elevated effects
- **Buttons:** Green hero style, large size, with hover effects
- **Animations:** Framer Motion with fadeUp, stagger effects
- **Spacing:** Generous padding, container max-width consistency

### Required Changes

#### 1. Update CalculatorNav Component
- Match the sticky navigation style from landing page
- Use consistent container width and padding
- Update progress bar styling to match design system
- Add subtle animations to step indicators

#### 2. Update Calculator Pages (PreSurvey, Transportation, Diet, Energy, Breakdown)
**Styling Updates:**
- Add hero background gradient or subtle pattern
- Update Card components with better shadows and borders
- Match button styles to landing page (hero variant, proper sizing)
- Add framer-motion animations (fadeUp, stagger)
- Ensure consistent spacing and typography
- Use proper color palette throughout
- Add icons from lucide-react where appropriate

#### 3. Specific Component Updates
- **PreSurvey:** Add welcome hero section with gradient background
- **Transportation/Diet/Energy:** Consistent card styling, better visual hierarchy
- **Breakdown:** Enhanced results display with animations and visual appeal

### Implementation Steps
1. Create a shared styles/constants file for calculator theme
2. Update each calculator component with new styling
3. Add framer-motion animations
4. Ensure responsive design matches landing page quality
5. Test visual consistency across all pages

### Files to Modify:
- `src/components/carbon-calculator/CalculatorNav.tsx`
- `src/components/carbon-calculator/PreSurvey.tsx`
- `src/components/carbon-calculator/Transportation.tsx`
- `src/components/carbon-calculator/Diet.tsx`
- `src/components/carbon-calculator/Energy.tsx`
- `src/components/carbon-calculator/Breakdown.tsx`
- Possibly create: `src/lib/calculator-theme.ts`

---

## Task 3: Firebase Integration

### Requirements
- Share authentication with mobile app
- Store/retrieve emissions data in Firestore
- Support both authenticated and anonymous users
- Maintain data structure compatibility with mobile app

### Firebase Structure (from Mobile App)

#### Collections:
```
users/{userId}/emissions/{YYYY-MM}
  - surveyData: Object
  - surveyEmissions: Object
  - totalEmissions: number
  - monthlyEmissions: number
  - lastUpdated: Timestamp

community/emissions_stats
  - emissions_calculated: number
  - emissions_offset: number
  - last_updated: Timestamp
```

### Implementation Steps

#### Step 1: Install Dependencies
```bash
npm install firebase dayjs
```

#### Step 2: Firebase Configuration
**Create files:**
- `src/lib/firebase/config.ts` - Firebase initialization
- `src/lib/firebase/auth.ts` - Authentication helpers
- `src/lib/firebase/firestore.ts` - Firestore helpers

**Configuration needs:**
- Firebase project credentials (from app's Firebase project)
- Enable Authentication (Anonymous, Email/Password, Google, Apple)
- Enable Firestore with proper security rules
- Use same Firebase project as mobile app

#### Step 3: Create Authentication Context
**Create files:**
- `src/contexts/AuthContext.tsx` - Auth state management
- `src/hooks/useAuth.ts` - Auth hook for components

**Features:**
- Track current user
- Handle sign in/sign up/sign out
- Support anonymous authentication
- Sync with Firebase Auth state

#### Step 4: Port API Functions
**Create files:**
- `src/api/emissions.ts` - Port from mobile app
- `src/types/emissions.ts` - TypeScript types

**Functions to port:**
- `saveEmissionsData()` - Save user's emissions data
- `fetchEmissionsData()` - Retrieve emissions data by month
- `saveCommunityEmissionsData()` - Update community stats
- `fetchCommunityEmissionsData()` - Get community stats

#### Step 5: Update Calculator Components
**Changes needed:**
- Wrap app with `AuthProvider`
- Update `CarbonCalculator.tsx` to use Firebase hooks
- Load existing data when user is authenticated
- Save data to Firestore on each step
- Handle anonymous vs authenticated users
- Show login prompts where appropriate

#### Step 6: Add User Features
**Optional enhancements:**
- Login/Signup modal components
- User profile display in navigation
- History view (previous months)
- Compare current vs previous footprint
- "Save your progress" prompts for anonymous users

### Files to Create:
```
src/
├── lib/
│   └── firebase/
│       ├── config.ts          (Firebase initialization)
│       ├── auth.ts            (Auth helpers)
│       └── firestore.ts       (Firestore helpers)
├── contexts/
│   └── AuthContext.tsx        (Auth state provider)
├── hooks/
│   └── useAuth.ts            (Auth hook)
├── api/
│   └── emissions.ts          (Emissions API - ported)
└── types/
    └── emissions.ts          (TypeScript types)
```

### Files to Modify:
- `src/App.tsx` - Add AuthProvider wrapper
- `src/pages/CarbonCalculator.tsx` - Integrate Firebase
- `src/components/Navigation.tsx` - Add auth status/login button
- All calculator step components - Add auto-save functionality

### Security Considerations
1. **Firestore Security Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own emissions data
    match /users/{userId}/emissions/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Community stats are readable by all, writable by authenticated users
    match /community/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

2. **Environment Variables:**
Create `.env.local`:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## Testing Plan

### Phase 1: Navigation & Styling
- [ ] Verify all navigation links work correctly
- [ ] Test responsive menu on mobile/tablet/desktop
- [ ] Validate Carbon Calculator link navigation
- [ ] Check styling consistency across all calculator pages
- [ ] Test animations and transitions
- [ ] Verify accessibility (keyboard navigation, screen readers)

### Phase 2: Firebase Integration
- [ ] Test anonymous user flow (no login required)
- [ ] Test authenticated user flow (login/signup)
- [ ] Verify data saves to Firestore correctly
- [ ] Test data retrieval (returning user sees saved data)
- [ ] Test month-to-month data isolation
- [ ] Verify community stats update correctly
- [ ] Test cross-platform (app user can login on website)
- [ ] Test error handling (network errors, auth failures)

### Phase 3: End-to-End
- [ ] Complete calculator as anonymous user
- [ ] Complete calculator as authenticated user
- [ ] Verify data persists across browser refresh
- [ ] Test on multiple devices/browsers
- [ ] Performance testing (load times, Firestore queries)

---

## Implementation Order

### Priority 1 (Quick Wins)
1. Update Navigation component ✓ Easy, immediate impact
2. Match calculator styling ✓ Improves user experience

### Priority 2 (Core Functionality)
3. Install Firebase dependencies
4. Create Firebase configuration
5. Create authentication context
6. Port emissions API functions

### Priority 3 (Integration)
7. Integrate Firebase into calculator
8. Test data persistence
9. Add user authentication UI
10. Polish and optimization

---

## Estimated Timeline

- **Task 1 (Navigation):** 30 minutes
- **Task 2 (Styling):** 2-3 hours
- **Task 3 (Firebase Setup):** 1-2 hours
- **Task 3 (Integration):** 2-3 hours
- **Testing & Polish:** 1-2 hours

**Total: ~7-11 hours**

---

## Success Criteria

✓ Navigation menu matches requirements (Home, Carbon Calculator, Shop, Course, Blog, About)
✓ Carbon Calculator link works and is prominent in navigation
✓ Calculator styling is visually consistent with landing page
✓ Calculator has smooth animations and professional appearance
✓ Firebase Authentication is working (anonymous + authenticated)
✓ Emissions data saves to Firestore correctly
✓ Returning users see their previous data
✓ App users can use the same account on website
✓ Data structure is compatible between app and website
✓ Community emissions stats update correctly

---

## Notes

- Keep the calculator functional even if Firebase is down (graceful degradation)
- Consider adding a "Continue as Guest" option prominently
- Anonymous users should be prompted to create account after completing calculator
- Make sure to use the SAME Firebase project as the mobile app
- Test with actual app users to verify cross-platform compatibility