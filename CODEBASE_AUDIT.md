# Shadow Level — Comprehensive Codebase Audit

**Audit Date:** August 8, 2026
**Project:** Shadow Level - Gamified Habit Tracker
**Version:** Current main branch
**Auditor:** Claude (AI Assistant)

---

## Executive Summary

Shadow Level is a single-page React application styled as a dark, RPG-themed habit tracker inspired by the anime Solo Leveling. The application transforms habit building into a gamified experience where users earn EXP, level up, unlock shadow companions, and face penalty zones for missed habits.

**Core Philosophy:** Client-side only, zero backend dependencies, all data persisted via localStorage.

---

## Table of Contents

1. Project Overview
2. Technology Stack
3. Architecture and Design Patterns
4. Project Structure
5. Core Features Analysis
6. Data Layer
7. Authentication and Session Management
8. State Management
9. Routing Structure
10. Component Library
11. Styling System
12. Gamification Mechanics
13. Security Considerations
14. Performance Analysis
15. Code Quality Assessment
16. Areas for Improvement
17. Technical Debt
18. Recommendations

---

## 1. Project Overview

### Purpose
Shadow Level is a habit tracking application that uses RPG game mechanics to motivate users. It turns daily habits into quests that reward players with experience points (EXP), levels, and virtual rewards.

### Target Audience
- Users seeking gamified productivity tools
- Fans of Solo Leveling anime/manhwa
- Individuals motivated by RPG progression systems

### Unique Selling Points
1. Gamified Habit Tracking - EXP, levels, streaks, stat allocation
2. Dark Fantasy Theme - Solo Leveling-inspired terminology and aesthetics
3. Dual Habit System - Positive habits (gain EXP) and negative habits (lose EXP)
4. Penalty Zone - Accountability mechanism for missed habits
5. Zero Backend - Complete client-side persistence, no server required

---

## 2. Technology Stack

### Core Framework
- React 19.2.0 - Latest React with StrictMode
- TypeScript 5.8.3 - Strict mode, ES2022 target
- Vite 8.1.3 - Build tool with HMR

### Routing and State
- TanStack Router 1.170.16 - Type-safe file-based routing
- Zustand 5.0.14 - Minimal global state management
- TanStack React Query 5.101.1 - Installed but minimally used

### UI Libraries
- Tailwind CSS 4.2.1 - Utility-first CSS with custom theme
- shadcn/ui - 50+ Radix UI primitives (new-york style)
- Framer Motion 12.42.2 - Animation library
- Lucide React 0.575.0 - Icon library
- Recharts 2.15.4 - Charts for analytics
- Sonner 2.0.7 - Toast notifications

### Development Tools
- ESLint 9.32.0 - Linting with TypeScript plugin
- Prettier 3.7.3 - Code formatting
- date-fns 4.1.0 - Date manipulation
- Lenis 1.3.26 - Smooth scrolling

---

## 3. Architecture and Design Patterns

### Architectural Decision: localStorage-First
The entire application is built around localStorage persistence, replacing what was originally a Supabase backend. This decision provides:
- Zero server costs
- Instant response times
- Offline-first capability
- Simple deployment (static hosting)

**Trade-offs:**
- No cross-device sync
- Data loss if localStorage cleared
- Not suitable for multi-user scenarios
- Security limitations (plain text passwords)

### Component Architecture
`
Route Component -> RequireAuth Wrapper -> Business Logic -> UI Components
`

**Pattern: Container/Presentational Separation**
- Route files contain business logic and state
- Components in /components/ui/ are pure presentational
- Shared components handle navigation and authentication

### State Management Strategy
1. **Global State (Zustand):** Session, userId, profile
2. **Local State:** Form inputs, UI toggles, editing modes
3. **Derived State:** Computed from localStorage reads

---

## 4. Project Structure

`
d:\Vibe Coding\Projects\Shadow-Level\
├── src/
│   ├── components/
│   │   ├── ui/                    - 50+ shadcn/ui components
│   │   ├── AppNav.tsx             - Navigation (sidebar + mobile)
│   │   ├── ExpBar.tsx             - Animated progress bar
│   │   ├── RequireAuth.tsx        - Auth guard wrapper
│   │   └── SmoothScrollProvider.tsx
│   ├── hooks/                     - Custom hooks
│   ├── lib/
│   │   ├── local-db.ts            - localStorage CRUD engine
│   │   ├── leveling.ts            - EXP/level calculations
│   │   ├── profile.ts             - Profile and streak management
│   │   ├── store.ts               - Zustand state
│   │   └── utils.ts               - Tailwind utilities
│   ├── routes/                    - TanStack Router pages
│   │   ├── __root.tsx             - Root layout
│   │   ├── index.tsx              - Entry redirect
│   │   ├── auth.tsx               - Login/signup
│   │   ├── dashboard.tsx          - Main habit interface
│   │   ├── habits.tsx             - Habit CRUD
│   │   ├── rewards.tsx            - Reward shop
│   │   ├── analytics.tsx          - Charts
│   │   ├── me.tsx                 - Profile settings
│   │   └── profile..tsx  - Public profile
│   ├── main.tsx                   - App entry
│   ├── router.tsx                 - Router config
│   └── styles.css                 - Tailwind + custom utilities
├── index.html                     - HTML template
├── vite.config.ts                 - Vite configuration
├── tsconfig.json                  - TypeScript config
├── package.json                   - Dependencies
└── components.json                - shadcn/ui config
`

---

## 5. Core Features Analysis

### 5.1 Dashboard (/dashboard)
**Purpose:** Main habit tracking interface

**Features:**
- Today quests list with checkboxes
- Real-time EXP updates
- Streak tracking
- Level-up animations
- Penalty zone trigger
- Stat allocation panel
- Shadow army progression
- Dungeon raid rank display

**Implementation:**
- Reads habits from localStorage
- Creates/deletes habit logs
- Updates profile EXP and streak
- Framer Motion animations with reduced motion support

### 5.2 Habit Forge (/habits)
**Purpose:** CRUD interface for habits

**Features:**
- Create/edit/delete habits
- Configure EXP value (1-1000)
- Set habit type (positive/negative)
- Set frequency (daily/weekly/monthly)

### 5.3 Rewards (/rewards)
**Purpose:** Self-defined reward system

**Features:**
- Create custom rewards with EXP cost
- Purchase rewards (deducts EXP)
- Track purchased status

### 5.4 Analytics (/analytics)
**Purpose:** Visualize progress

**Features:**
- 7-day EXP bar chart
- Positive vs negative pie chart
- 90-day activity heatmap
- All using Recharts library

### 5.5 Profile (/me)
**Purpose:** User settings

**Features:**
- Username editing
- Avatar upload (stored as data URL)
- Public profile link
- Penalty configuration
- Stats display

### 5.6 Public Profile (/profile/)
**Purpose:** Shareable hunter card

**Features:**
- Read-only profile view
- Level, EXP, streaks
- No sensitive data exposure

---

## 6. Data Layer

### localStorage Keys
`
shadow_profiles      - User profiles
shadow_accounts      - Email/password/userId mapping
shadow_session       - Current session { userId }
shadow_habits        - User habits
shadow_habit_logs    - Completion logs
shadow_rewards       - User rewards
shadow_penalty       - User-configured penalty
stats_{userId}       - Allocated stat points
`

### CRUD Operations (local-db.ts)

**Profiles:**
- getProfile(id) - Get by ID
- getProfileByUsername(username) - Get by username
- getProfileByEmail(email) - Get with account info
- createAccount(email, password) - Create new user
- loginAccount(email, password) - Validate credentials
- updateProfile(id, updates) - Update profile fields

**Habits:**
- getHabits(userId, activeOnly) - List habits
- createHabit(data) - Create habit
- updateHabit(id, updates) - Update habit
- deleteHabit(id) - Remove habit

**Habit Logs:**
- getHabitLogs(userId) - All logs
- getHabitLogsByDate(userId, date) - Daily logs
- getHabitLogsSince(userId, date) - Logs since date
- createHabitLog(data) - Log completion
- deleteHabitLog(id) - Remove log

**Rewards:**
- getRewards(userId) - List rewards
- createReward(data) - Create reward
- purchaseReward(id) - Mark as purchased
- deleteReward(id) - Remove reward

---

## 7. Authentication and Session Management

### Signup Flow
1. User enters email/password
2. createAccount() checks for duplicates
3. Creates profile with random username Player_random
4. Stores email/password/profileId in shadow_accounts
5. Sets session in shadow_session
6. Updates Zustand store
7. Redirects to /dashboard

### Login Flow
1. User enters email/password
2. loginAccount() validates credentials
3. Retrieves profile by profileId
4. Sets session in shadow_session
5. Updates Zustand store
6. Redirects to /dashboard

### Session Persistence
- Session stored as { userId } in localStorage
- Checked on app load in index.tsx and RequireAuth.tsx
- Profile loaded from shadow_profiles

### Sign Out
1. clearSession() removes shadow_session
2. Zustand signOut() clears userId and profile
3. Navigate to /auth

**Security Note:** Passwords stored in plain text. Not suitable for production without backend authentication.

---

## 8. State Management

### Zustand Store (store.ts)

`	ypescript
interface AppState {
  sessionLoaded: boolean;
  userId: string | null;
  profile: Profile | null;
  setSessionLoaded: () => void;
  setUserId: (id: string | null) => void;
  setProfile: (p: Profile | null) => void;
  signOut: () => void;
}
`

**Why Minimal State?**
- Most data lives in localStorage
- Components read directly from localStorage
- Zustand only tracks authentication state

### Local State Patterns

Each route manages its own state:
`	ypescript
const [form, setForm] = useState(empty);
const [editing, setEditing] = useState<string | null>(null);
const [showForm, setShowForm] = useState(false);
const [tick, setTick] = useState(0); // Force re-read
`

---

## 9. Routing Structure

### File-Based Routing

| File | Route | Purpose |
|------|-------|---------|
| __root.tsx | - | Root layout with providers |
| index.tsx | / | Session check, redirect |
| auth.tsx | /auth | Login/signup |
| dashboard.tsx | /dashboard | Main interface |
| habits.tsx | /habits | Habit CRUD |
| rewards.tsx | /rewards | Reward shop |
| analytics.tsx | /analytics | Charts |
| me.tsx | /me | Profile settings |
| profile..tsx | /profile/ | Public profile |

### Route Protection
All authenticated routes use RequireAuth wrapper.

---

## 10. Component Library

### shadcn/ui Components (50+)
Located in src/components/ui/:
- Forms: input, textarea, select, checkbox, radio-group, slider, switch
- Layout: card, separator, tabs, accordion, collapsible
- Navigation: breadcrumb, navigation-menu, pagination, sidebar
- Overlays: dialog, alert-dialog, sheet, drawer, popover, tooltip
- Data: table, progress, avatar, badge, calendar
- Buttons: button, toggle, toggle-group

### Custom Components

**AppNav.tsx**
- Desktop: Fixed 240px sidebar
- Mobile: Bottom tab navigation (5 items)
- Shows user stats in sidebar footer
- Sign out button

**ExpBar.tsx**
- Animated progress bar
- Shows level, percentage, EXP remaining

**RequireAuth.tsx**
- Authentication guard
- Loads session on mount
- Shows spinner while loading

**SmoothScrollProvider.tsx**
- Lenis smooth scroll integration

---

## 11. Styling System

### Tailwind CSS 4 Configuration
- Custom theme with Cinzel and Montserrat fonts
- Primary: Blue (#3b82f6)
- Accent: Purple (#a855f7)
- Destructive: Rose (#be123c)

### Custom Utilities
- glass - Frosted glass effect
- glass-strong - Stronger gradient glass
- text-glow-primary - Glowing blue text
- bg-monarch-radial - Dark radial background

### Responsive Design
- Mobile-first approach
- Bottom navigation on mobile
- Sidebar navigation on desktop (md: breakpoint)

---

## 12. Gamification Mechanics

### Leveling System (leveling.ts)

**Formula:**
`	ypescript
level = floor(sqrt(totalExp / 100)) + 1
expForLevel(n) = (n-1)^2 * 100
`

**Example Progression:**
- Level 1: 0 EXP
- Level 5: 1,600 EXP
- Level 10: 8,100 EXP
- Level 50: 240,100 EXP

### Streak System (profile.ts)

**Algorithm:**
1. Get all positive habit logs
2. Build set of unique completion dates
3. Count consecutive days from today backwards
4. Update longest streak if current exceeds it

### Stat Allocation

- Gain 5 stat points per level
- Allocate to Strength, Agility, Intelligence
- Base stats: 10 each

### Shadow Army

| Shadow | Unlock Level | Buff |
|--------|-------------|------|
| Igris | 5 | +5% EXP |
| Tank | 15 | Dungeon Pass |
| Beru | 30 | +20% EXP |

### Dungeon Raid Ranks

| Rank | Streak Required |
|------|----------------|
| E-Rank | 0 days |
| D-Rank | 3 days |
| C-Rank | 7 days |
| B-Rank | 14 days |
| A-Rank | 30 days |
| S-Rank | 90 days |

### Penalty Zone

**Trigger:**
- Checks yesterday positive habit completions
- Requires 75% completion rate
- Triggers once per day

---

## 13. Security Considerations

### Current Implementation

**Strengths:**
- No external API calls (no data leakage)
- All data stays on user device
- No third-party tracking
- No cookies or external storage

**Weaknesses:**

1. **Plain Text Passwords**
   - Passwords stored in localStorage without hashing
   - Anyone with device access can read them

2. **No Encryption**
   - All localStorage data is plain text

3. **No Rate Limiting**
   - No brute force protection
   - No account lockout mechanism

4. **XSS Vulnerability**
   - If XSS exists, all data exposed

### Recommendations for Production:
1. Implement backend authentication (JWT, OAuth)
2. Hash passwords with bcrypt/argon2
3. Add CSRF protection
4. Add Content Security Policy

---

## 14. Performance Analysis

### Bundle Size
Estimated Total: ~420 KB gzipped

### Optimizations Implemented:
1. Code Splitting - TanStack Router splits per route
2. Tree Shaking - ES modules throughout
3. Lazy Loading - Routes loaded on demand
4. Reduced Motion support - Accessibility option

### Areas for Improvement:
1. localStorage Reads - Synchronous, blocks main thread
2. No Caching - Re-reads on every render
3. Large Avatar Storage - Base64 data URLs

---

## 15. Code Quality Assessment

### TypeScript Usage
- Strict mode enabled
- Proper interface definitions
- Type-safe routing
- No any types in business logic

### Code Organization
- Clear separation of concerns
- Consistent file naming
- Logical folder structure
- Single responsibility components

### Error Handling
- Try-catch in async operations
- Toast notifications for errors
- Graceful fallbacks

### Accessibility
- Radix UI primitives (accessible by default)
- useReducedMotion hook
- Semantic HTML
- ARIA attributes via components

---

## 16. Areas for Improvement

1. **Data Persistence**
   - Add export/import functionality
   - Use IndexedDB for larger storage

2. **Authentication**
   - Implement backend authentication
   - Consider Supabase or Firebase

3. **State Management**
   - React Query for derived state
   - Implement caching layer

4. **Testing**
   - Add unit tests with Vitest
   - Component tests with Testing Library
   - E2E tests with Playwright

5. **Error Boundaries**
   - Add React Error Boundaries
   - Implement crash reporting

6. **Internationalization**
   - Add i18n support
   - Support multiple languages

---

## 17. Technical Debt

### High Priority
1. **No Test Coverage**
   - Critical business logic untested
   
2. **Plain Text Passwords**
   - Security vulnerability
   
3. **Direct localStorage Access**
   - Scattered throughout codebase

### Medium Priority
4. React Query Unused
5. No Error Boundaries
6. Large Avatar Storage

### Low Priority
7. No Documentation
8. Hard-coded Strings

---

## 18. Recommendations

### Immediate Actions
1. Add Unit Tests
2. Add Error Boundaries
3. Implement Data Export

### Short-term
4. Add Backend Authentication
5. Implement React Query
6. Add Zod Validation

### Long-term
7. Build PWA Features
8. Add Cloud Sync
9. Implement Sharing Features

---

## Conclusion

Shadow Level is a well-architected React application with a clear vision and solid execution. The gamification mechanics are thoughtfully implemented, and the Solo Leveling theme is consistently applied throughout the UI/UX.

**Strengths:**
- Clean, maintainable codebase
- Modern technology stack
- Excellent UI/UX design
- Responsive and accessible
- Offline-first by design

**Weaknesses:**
- No backend/authentication
- No test coverage
- Security limitations
- Data persistence risks

**Verdict:** An excellent personal project or MVP that demonstrates strong React development skills. For production use, it would benefit from backend integration and comprehensive testing.

**Overall Rating:** 8/10 for code quality, 7/10 for architecture, 6/10 for production readiness.

---

**Audit Complete**
Generated by Claude on August 8, 2026