# Shadow Level — Product Requirements Document

## Purpose
Shadow Level is a gamified habit tracker inspired by the *Solo Leveling* anime. It transforms daily routines into an RPG experience where completing habits earns EXP, helps users level up, and unlocks rewards.

## Target Users
- Anime/manga fans who want a themed productivity tool
- Anyone looking for a gamified approach to habit building
- Users who prefer client-side, privacy-first apps (no data leaves the device)

## Core Features (MVP — Complete)
- **RPG Progression** — EXP, leveling, stat allocation
- **Habit CRUD** — Create positive (gain EXP) and negative (lose EXP) habits
- **Daily Quest Tracking** — Check/uncheck habits with real-time EXP updates
- **Streak System** — Current + longest streak tracking
- **Penalty Zone** — 75% daily completion threshold enforcement
- **Reward Shop** — Spend EXP on self-defined rewards (permanent, no refunds)
- **Analytics Dashboard** — 7-day EXP bar chart, positive/negative pie, 90-day heatmap
- **Profile & Avatar** — Customizable username, avatar upload, shareable public profile
- **Authentication** — Local email/password auth (localStorage-based)
- **Responsive Design** — Desktop sidebar + mobile bottom nav

## Data Storage
All data is stored in the browser's localStorage. No external database or API is used.

## Deployment
Static SPA deployed to GitHub Pages via GitHub Actions.
