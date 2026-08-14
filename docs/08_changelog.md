# Shadow Level — Changelog

## 2026-08-15 — Interactive Landing Page & Audio Engine Overhaul

### Added
- **Interactive Landing Page** (`src/components/InteractiveLanding.tsx`) — Full cinematic landing experience:
  - `ThreeDungeonGate` — Three.js WebGL torus-knot portal gate with rotation, pulse, and arise zoom burst
  - `CinematicLoader` — Animated system-init loading bar that blocks content until complete
  - `CustomCursor` — SVG ring cursor with hover/view state changes and click ripple effect
  - `ScrambleText` — Hacker-decrypt heading animation (configurable speed; currently 2× slower than original)
  - `Magnetic` — Framer Motion spring wrapper for magnetic CTA button
  - Scroll-driven `gateOpacity` — 3D gate fades out over first 400px of scroll, keeping lower sections legible
  - Section-locked audio events: `gateOpen` on scroll chapter change, `rankUp` on Stats window enter
  - Cinematic section transitions with `AnimatePresence` screen wipes
  - Floating mute toggle button with `penalty`/`mana` icon coloring

### Changed
- **Audio Engine Rewrite** (`src/lib/audio.ts`):
  - Replaced per-sound `AudioContext` creation with a **shared singleton** (`getSharedAudioContext`) — fixes Chrome/Edge `suspended` state bugs
  - Switched `playFile()` from `HTMLAudioElement` to `fetch → decodeAudioData → BufferSourceNode` — bypasses autoplay policy
  - Added `AudioBuffer` cache (`Map<string, AudioBuffer>`) — files decoded once and reused
  - Added gesture-unlock flow (`pointerdown` / `touchstart` / `click`) to call `ctx.resume()` and trigger preloads
  - Fixed async race condition: sounds triggered before `HEAD` check completes now fall through to synthesizer immediately
- **Landing Page Color Theme** — Replaced all hardcoded Tailwind `slate-*`/`cyan-*`/`amber-*` classes with project CSS-variable-based Tailwind classes (`bg-void`, `text-mana`, `border-mist`, etc.), ensuring full theme-switching compatibility
- **Yellow Color Removed** — All amber/yellow elements (CTA button, cursor, feature icons, trophy, S-Rank badge) replaced with the mana (cyan-blue) palette
- **Section Backgrounds Made Solid** — Features, Stats, Pricing, and Testimonials sections now use fully opaque `bg-void`/`bg-abyss` backgrounds, preventing 3D gate rings from bleeding through

### Removed
- `onViewportEnter` `shadowArmy` sound from the System Features section heading — was triggering unexpectedly on scroll

---


## 2026-08-14 — Audio Upgrade & Rank Up System

### Added
- **Rank Up Sound Effect** — Connected the newly added `rankUp.mp3` file to trigger a satisfying notification and sound effect whenever a player ranks up based on daily quest streaks.
- **Documentation Updates** — Updated the PRD and Architecture documents to reflect the local audio management system and custom sfx integrations.

### Changed
- **Audio Routing** — Updated path mappings inside the global Audio Manager to point to the root `/audio/` directory for custom `rankUp.mp3` overrides.

## 2026-08-13 — Theme Engine & UI Polish

### Added
- **Multi-Theme Support** — Added an interactive theme switcher with 4 distinct palettes: Shadow Level (Default), Mystic Nebula, Crimson Moon, and Deep Forest.
- **Navigation Layout Toggle** — Added the ability to toggle the navigation bar position between the left sidebar and the top of the screen.

### Changed
- **Auth Screen Redesign** — Overhauled the authentication page with the new `glass-strong` frosted effect, proportional inputs, and sleek glow animations.
- **Default Theme Polish** — Softened the default `--mana` cyan color (`#06B6D4`) for better eye comfort and accessibility, reducing harsh brightness on solid backgrounds.
- **Vercel Deployment** — Fixed the Vite base path configuration (`base: '/'`) to ensure proper asset loading when deployed to Vercel's root domain.

## 2026-08-12 — UI/UX Overhaul & Graphify Integration

### Removed
- **Analytics Dashboard** — Removed `analytics.tsx` and all related Recharts rendering logic for a leaner UI.

### Added
- **Lenis Smooth Scrolling** — Integrated physics-based momentum scrolling across the application.
- **Framer Motion Cascades** — Staggered `whileInView` reveals added to all dashboard sections.
- **Graphify Integration** — Integrated `.agents/workflows/graphify.md` for codebase AST mapping.

### Changed
- **Sonner Notifications** — Overhauled system toasts to match the "Cyber Glitch" aesthetic (neon glow, monospace, sharp edges, 2.5s duration).
- **Level Up Sequence** — Reduced duration and removed lag for a snappier "ARISE" animation.
- **Habit Cards** — Enhanced hover states with custom colored glowing borders.

## 2026-08-09 — Major Migration

### Removed
- **Supabase** — All database, auth, and storage dependencies removed
- **TanStack Start / Nitro** — SSR framework removed, converted to client-side SPA
- **Lovable.dev artifacts** — `.lovable/`, error reporting, `@lovable.dev/*` dependencies
- **Build artifacts** — `.output/`, `dist/`, `.tanstack/`, `.wrangler/`, `bun.lock`, `bunfig.toml`
- **`.env`** — Supabase credentials removed entirely

### Added
- **localStorage data layer** (`src/lib/local-db.ts`) — Full CRUD for profiles, habits, logs, rewards
- **Client-side SPA** — `index.html` + `src/main.tsx` entry points for Vite
- **GitHub Pages deployment** — `.github/workflows/deploy.yml`
- **`.env.example`** — Placeholder for future environment variables
- **`.ai/` directory** — Agent skill/reference documents
- **`/docs` directory** — PRD, architecture, changelog

### Changed
- All routes rewritten to use `local-db.ts` instead of Supabase queries
- Auth flow uses localStorage accounts instead of Supabase Auth
- Avatar upload stores images as data URLs in localStorage
- Profile lookup uses localStorage instead of Supabase queries
- `vite.config.ts` simplified (removed `tanstackStart`, `nitro` plugins)
- `package.json` cleaned up (removed 4 dependencies, renamed package)
- `.gitignore` updated with new exclusion patterns
