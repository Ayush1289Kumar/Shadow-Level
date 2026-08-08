# Shadow Level — Architecture

## Tech Stack

| Category | Technology |
|---|---|
| **Frontend Framework** | React 19 + TypeScript |
| **Routing** | TanStack Router (file-based) |
| **State Management** | Zustand |
| **Styling** | Tailwind CSS 4 + shadcn/ui |
| **Animations** | Framer Motion + canvas-confetti |
| **Charts** | Recharts |
| **Data Storage** | localStorage (via `src/lib/local-db.ts`) |
| **Build Tool** | Vite |
| **Forms** | React Hook Form + Zod |
| **Deployment** | GitHub Pages (via GitHub Actions) |

## Data Flow
```
User Action → Route Component → local-db.ts (localStorage CRUD) → Zustand Store → UI Update
```

## Key Modules

| Module | Path | Purpose |
|---|---|---|
| Local DB | `src/lib/local-db.ts` | All CRUD operations (profiles, habits, logs, rewards) |
| Store | `src/lib/store.ts` | Zustand global state (userId, profile) |
| Leveling | `src/lib/leveling.ts` | EXP/level calculation formulas |
| Profile Utils | `src/lib/profile.ts` | EXP delta, streak computation |
| Auth Guard | `src/components/RequireAuth.tsx` | Protected route wrapper |
| Navigation | `src/components/AppNav.tsx` | Sidebar + mobile nav |

## Authentication
Local-only email/password stored in localStorage (`shadow_accounts` key). No server, no tokens, no cookies — just client-side state.
