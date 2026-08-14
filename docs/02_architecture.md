# Shadow Level — Architecture

## Tech Stack

| Category | Technology |
|---|---|
| **Frontend Framework** | React 19 + TypeScript |
| **Routing** | TanStack Router (file-based) |
| **State Management** | Zustand |
| **Styling** | Tailwind CSS 4 + shadcn/ui |
| **Animations / Scroll** | Framer Motion + Lenis Smooth Scroll |
| **3D Graphics** | Three.js (landing page dungeon gate portal) |
| **Notifications** | Sonner (Cyber Glitch Theme) |
| **Audio Engine** | Web Audio API + HTML5 Audio fallback (`src/lib/audio.ts`) |
| **Data Storage** | localStorage via `src/lib/local-db.ts` |
| **Build Tool** | Vite |
| **Forms** | React Hook Form + Zod |
| **Deployment** | Vercel (static SPA, no backend) |

---

## Data Flow

```
User Action
  → Route Component
  → local-db.ts (localStorage CRUD)
  → Zustand Store (useAppStore)
  → UI Re-render

Side effects triggered from Route Components:
  → audio.ts SoundManager (SFX / ambient playback)
  → leveling.ts + profile.ts (EXP delta, streak, rank calculation)
```

---

## Key Modules

| Module | Path | Purpose |
|---|---|---|
| Local DB | `src/lib/local-db.ts` | All CRUD operations (profiles, habits, logs, rewards) |
| Store | `src/lib/store.ts` | Zustand global state (userId, profile, audio settings) |
| Leveling | `src/lib/leveling.ts` | EXP/level calculation formulas |
| Profile Utils | `src/lib/profile.ts` | EXP delta, streak computation, rank promotion |
| Audio Engine | `src/lib/audio.ts` | Global Audio Manager (see below) |
| Auth Guard | `src/components/RequireAuth.tsx` | Protected route wrapper |
| Navigation | `src/components/AppNav.tsx` | Sidebar + mobile nav with layout toggles |
| Landing Page | `src/components/InteractiveLanding.tsx` | Full cinematic landing (Three.js, parallax, scramble text, audio) |
| Level Up | `src/components/LevelUpSequence.tsx` | Cinematic level-up overlay |
| Theme Provider | `src/components/ThemeProvider.tsx` | CSS-variable injection for theme switching |

---

## Audio Engine (`src/lib/audio.ts`)

The audio system is built on a custom `SoundManager` class that wraps the Web Audio API:

### Architecture
```
SoundManager (singleton: `sound`)
  ├── getSharedAudioContext()     → Single AudioContext reused for all sounds
  ├── AudioBuffer cache           → Map<key, AudioBuffer> — files decoded once
  ├── Per-category GainNodes      → sfx | ui | ambient | voice channels
  ├── Master GainNode             → Global volume / mute
  ├── Cooldown Map                → Prevents sound spam per key
  └── WebAudioPlaceholder         → Synthesizer fallback (oscillators + noise)
```

### Playback Flow
```
sound.play(key)
  → cooldown check
  → if AudioBuffer cached → BufferSourceNode.start()
  → else if file URL known → fetch() → decodeAudioData() → cache → play
  → else → synthesizer fallback (WebAudioPlaceholder)
```

### Autoplay Unlock
The shared `AudioContext` starts in `suspended` state (Chrome/Edge policy).  
On first `pointerdown`, `touchstart`, or `click`, `ctx.resume()` is called and all preloads fire.  
This is wired via `<AudioBridge />` in the root layout.

### Custom Sound Overrides
Drop any MP3 into `public/audio/sfx/` matching a known key name (e.g. `rank-up.mp3`).  
The engine does a `HEAD` request on init; if the file exists it's preferred over the synthesizer.

---

## Theme System (`src/styles.css`)

All colors are CSS custom properties on `:root` and per-theme selectors:

```css
:root { --void: #08080D; --mana: #06B6D4; --moonlight: #F2F0FF; … }
[data-theme="mystic"] { --void: …; --mana: …; }
[data-theme="crimson"] { … }
[data-theme="forest"]  { … }
```

Tailwind classes map to these via `tailwind.config.ts` `extend.colors` entries (e.g. `bg-void`, `text-mana`, `border-mist`).  
The `ThemeProvider` component writes `data-theme` to `<html>` on mount and on user selection.

---

## Authentication

Local-only email/password stored in `localStorage` (`shadow_accounts` key) with client-side SHA-256 hashing.  
No server, no tokens, no cookies — purely client-side state managed through Zustand.

---

## Landing Page Architecture (`InteractiveLanding.tsx`)

The landing page is a self-contained component with:

| Sub-component | Purpose |
|---|---|
| `CinematicLoader` | Animated loading bar + system init text, blocks UI until complete |
| `ThreeDungeonGate` | Three.js `WebGLRenderer` torus-knot geometry portal, fades on scroll |
| `CustomCursor` | SVG ring cursor + click ripple system, replaces native cursor |
| `ScrambleText` | Hacker-decrypt heading animation (configurable speed) |
| `Magnetic` | Framer Motion spring wrapper for magnetic button effect |
| `InteractiveLanding` | Root component — scroll transforms, parallax, section audio triggers |

**Scroll-driven effects:**
- `navBgOpacity` — Navbar background fades in on scroll
- `heroParallaxBg` / `heroParallaxText` — Parallax layers in hero
- `gateOpacity` — 3D gate fades from `1 → 0` over first 400px of scroll, keeping lower sections clean
