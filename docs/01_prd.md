# Shadow Level — Product Requirements Document

## Purpose
Shadow Level is a gamified habit tracker inspired by the *Solo Leveling* anime. It transforms daily routines into a cinematic RPG experience where completing habits earns EXP, levels up the user, and builds their shadow army.

## Target Users
- Anime/manga fans who want a themed productivity tool
- Anyone looking for a gamified approach to habit building
- Users who prefer client-side, privacy-first apps (no data leaves the device)

## Core Features (MVP — Complete)

- **RPG Progression** — EXP, leveling, stat allocation, and streak-based hunter Rank promotions (E-Rank → S-Rank)
- **Habit CRUD** — Create positive (gain EXP) and negative (lose EXP) habits
- **Daily Quest Tracking** — Check/uncheck habits with real-time EXP updates and streak preservation
- **Streak System** — Current + longest streak tracking with rank upgrades mapped to streak milestones
- **Penalty Zone** — 75% daily completion threshold enforcement with customizable penalty activities
- **Reward Shop** — Spend EXP on self-defined rewards (permanent, no refunds)
- **Profile & Avatar** — Customizable username, avatar upload, and shareable public profile cards at `/profile/[username]`
- **Authentication** — Local email/password auth (localStorage-based with SHA-256 password hashing)
- **Theme & Layout Engine** — Multi-theme support (Shadow Default, Mystic Nebula, Crimson Moon, Deep Forest) and navigation placement toggle (Left Sidebar vs. Top Nav)
- **Audio & Sound System** — Global Audio Manager with Web Audio API buffer playback, per-category volume mixing, cooldown gating, synthesizer fallbacks, and custom file overrides
- **Interactive Landing Page** — Cinematic loader, Three.js 3D portal gate, parallax hero, slow scramble-text heading, magnetic CTA, custom cursor, and scroll-locked audio events
- **Responsive Design** — Desktop sidebar/top nav + mobile bottom navigation layout

## Data Storage
All data is stored in the browser's `localStorage`. No external database or API is used. Key buckets:

| Key | Contents |
|---|---|
| `shadow_accounts` | Hashed user credentials |
| `shadow_profile_[userId]` | Profile data (level, EXP, streaks, avatar) |
| `shadow_habits_[userId]` | Habit definitions |
| `shadow_logs_[userId]` | Daily completion logs |
| `shadow_rewards_[userId]` | Reward shop items |
| `shadow_muted` | Audio mute preference |

## Deployment
Static SPA deployed to Vercel (no environment variables required — fully client-side).

## Non-Goals (Out of Scope)
- Server-side persistence or sync across devices
- Social features / multiplayer
- Push notifications
- Analytics dashboard (removed in 2026-08-12 cleanup)
