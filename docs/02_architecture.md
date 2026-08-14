# Shadow Level — Architecture

## Tech Stack

| Category | Technology |
|---|---|
| **Frontend Framework** | React 19 + TypeScript |
| **Routing** | TanStack Router (file-based) |
| **State Management** | Zustand |
| **Styling** | Tailwind CSS 4 + shadcn/ui |
| **Animations / Scroll** | Framer Motion + Lenis Smooth Scroll |
| **Notifications** | Sonner (Cyber Glitch Theme) |
| **Audio Engine** | Web Audio API / HTML5 Audio Manager |
| **Data Storage** | localStorage (via `src/lib/local-db.ts`) |
| **Build Tool** | Vite |
| **Forms** | React Hook Form + Zod |
| **Deployment** | Vercel & GitHub Pages |

## Data Flow
```
User Action → Route Component → local-db.ts (localStorage CRUD) → Zustand Store → UI Update
                                                             └─> Audio Manager (SFX play)
```

## Key Modules

| Module | Path | Purpose |
|---|---|---|
| Local DB | `src/lib/local-db.ts` | All CRUD operations (profiles, habits, logs, rewards) |
| Store | `src/lib/store.ts` | Zustand global state (userId, profile, audio settings) |
| Leveling | `src/lib/leveling.ts` | EXP/level calculation formulas |
| Profile Utils | `src/lib/profile.ts` | EXP delta, streak computation |
| Audio Engine | `src/lib/audio.ts` | Global Audio Manager (preloading, playback volume mix, synthesizer fallbacks) |
| Auth Guard | `src/components/RequireAuth.tsx` | Protected route wrapper |
| Navigation | `src/components/AppNav.tsx` | Sidebar + mobile nav with layout toggles |

## Authentication
Local-only email/password stored in localStorage (`shadow_accounts` key) with client-side SHA-256 hashing. No server, no tokens, no cookies — just client-side state.
