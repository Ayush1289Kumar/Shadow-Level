# Shadow Level — Product Requirements Document

## Purpose
Shadow Level is a gamified habit tracker inspired by the *Solo Leveling* anime. It transforms daily routines into an RPG experience where completing habits earns EXP, helps users level up, and unlocks rewards.

## Target Users
- Anime/manga fans who want a themed productivity tool
- Anyone looking for a gamified approach to habit building
- Users who prefer client-side, privacy-first apps (no data leaves the device)

## Core Features (MVP — Complete)
- **RPG Progression** — EXP, leveling, stat allocation, and streak-based hunter Rank promotions (E-Rank to S-Rank)
- **Habit CRUD** — Create positive (gain EXP) and negative (lose EXP) habits
- **Daily Quest Tracking** — Check/uncheck habits with real-time EXP updates and streak preservation
- **Streak System** — Current + longest streak tracking with rank upgrades mapped to streak milestones
- **Penalty Zone** — 75% daily completion threshold enforcement with customizable penalty activities
- **Reward Shop** — Spend EXP on self-defined rewards (permanent, no refunds)
- **Profile & Avatar** — Customizable username, avatar upload, and shareable public profile cards
- **Authentication** — Local email/password auth (localStorage-based with SHA-256 password hashing)
- **Theme & Layout Engine** — Multi-theme support (Shadow Default, Mystic Nebula, Crimson Moon, Deep Forest) and navigation placement toggle (Left Sidebar vs. Top Nav)
- **Audio & Sound System** — Global Audio Manager supporting volume mixing, mute control, and custom audio file overrides (e.g. `rankUp.mp3`) with Web Audio API synthesizers as fallback
- **Responsive Design** — Desktop sidebar/top nav + mobile bottom navigation layout

## Data Storage
All data is stored in the browser's localStorage. No external database or API is used.

## Deployment
Static SPA deployed to GitHub Pages via GitHub Actions (or Vercel).
