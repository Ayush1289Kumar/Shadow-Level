# Shadow Level — Changelog

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
