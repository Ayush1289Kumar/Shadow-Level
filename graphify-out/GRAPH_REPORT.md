# Graph Report - Shadow-Level  (2026-08-14)

## Corpus Check
- 103 files · ~179,729 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 866 nodes · 1514 edges · 105 communities (40 shown, 65 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ecf08c06`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- queries.ts
- cn
- sidebar.tsx
- dashboard.tsx
- audio.ts
- 🚀 AI Project Operating System (AI-POS) — Local Development
- UI/UX, Animation & Design — Agent Skill Reference
- Part 3 — Section-by-Section Spec
- dropdown-menu.tsx
- compilerOptions
- button.tsx
- utils.ts
- routeTree.gen.ts
- components.json
- Shadow Level — Audio, SFX & Interactive Animation Specification
- command.tsx
- menubar.tsx
- Shadow Level — Changelog
- SECURITY.md — Local Development
- carousel.tsx
- dependencies
- form.tsx
- devDependencies
- chart.tsx
- scripts
- table.tsx
- ⚔️ Shadow Level — RPG Habit Tracker
- navigation-menu.tsx
- Shadow Level — Product Requirements Document
- card.tsx
- toggle-group.tsx
- Shadow Level — Architecture
- package.json
- alert.tsx
- Audio Assets — Drop Real Files Here
- badge.tsx
- setup.ts
- rules/graphify.md
- workflows/graphify.md
- class-variance-authority
- clsx
- cmdk
- date-fns
- embla-carousel-react
- eslint-config-prettier
- @eslint/js
- eslint-plugin-prettier
- eslint-plugin-react-refresh
- framer-motion
- input-otp
- jsdom
- lenis
- lucide-react
- @radix-ui/react-alert-dialog
- @radix-ui/react-aspect-ratio
- @radix-ui/react-avatar
- @radix-ui/react-checkbox
- @radix-ui/react-collapsible
- @radix-ui/react-context-menu
- @radix-ui/react-dialog
- @radix-ui/react-dropdown-menu
- @radix-ui/react-hover-card
- @radix-ui/react-label
- @radix-ui/react-menubar
- @radix-ui/react-popover
- @radix-ui/react-progress
- @radix-ui/react-radio-group
- @radix-ui/react-scroll-area
- @radix-ui/react-select
- @radix-ui/react-separator
- @radix-ui/react-slot
- @radix-ui/react-switch
- @radix-ui/react-tabs
- @radix-ui/react-toggle
- @radix-ui/react-toggle-group
- @radix-ui/react-tooltip
- react-dom
- react-hook-form
- react-resizable-panels
- recharts
- sonner
- tailwind-merge
- @tailwindcss/vite
- @tanstack/react-query
- @tanstack/react-router
- @tanstack/router-plugin
- tw-animate-css
- vaul
- vite-tsconfig-paths
- zod
- zustand
- prettier
- @types/canvas-confetti
- @types/node
- @types/react
- @types/react-dom
- typescript
- vite
- @vitejs/plugin-react
- @vitest/ui
- vercel.json

## God Nodes (most connected - your core abstractions)
1. `cn()` - 226 edges
2. `useAppStore` - 30 edges
3. `playSound()` - 18 edges
4. `compilerOptions` - 17 edges
5. `read()` - 16 edges
6. `🚀 AI Project Operating System (AI-POS) — Local Development` - 16 edges
7. `write()` - 12 edges
8. `Button` - 11 edges
9. `SoundManager` - 11 edges
10. `levelProgress()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `AlertDialogOverlay` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogContent` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogHeader()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogTitle` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (105 total, 65 thin omitted)

### Community 0 - "queries.ts"
Cohesion: 0.07
Nodes (75): AppNav(), items, Props, State, RequireAuth(), Input, Label, labelVariants (+67 more)

### Community 1 - "cn"
Cohesion: 0.08
Nodes (38): AccordionContent, AccordionItem, AccordionTrigger, Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList (+30 more)

### Community 2 - "sidebar.tsx"
Cohesion: 0.06
Nodes (39): Separator, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay, SheetTitle (+31 more)

### Community 3 - "dashboard.tsx"
Cohesion: 0.09
Nodes (25): ExpBar(), Habit, HabitCard(), HabitCardProps, LevelProgress(), LevelUpSequence(), RankBadge(), Avatar (+17 more)

### Community 4 - "audio.ts"
Cohesion: 0.07
Nodes (16): ErrorBoundary, assetUrl(), AudioBridge(), AudioSettingsState, sound, SOUND_SPECS, SoundKey, SoundManager (+8 more)

### Community 5 - "🚀 AI Project Operating System (AI-POS) — Local Development"
Cohesion: 0.06
Nodes (33): `01_prd.md`, `02_architecture.md`, `03_implementation_plan.md`, `04_task_today.md`, `05_rules.md`, `06_audit.md`, `07_decisions.md`, `08_changelog.md` (+25 more)

### Community 6 - "UI/UX, Animation & Design — Agent Skill Reference"
Cohesion: 0.07
Nodes (29): 1. Component Libraries, 2. Smooth Scroll, 3. Design Taste & Quality Enforcement, 4. Browser Automation & Visual Testing, 5. 3D & Three.js Portfolio References, 6. Reference & Checklists, Agent Instructions (Universal), agentation — `benjitaylor/agentation` (+21 more)

### Community 7 - "Part 3 — Section-by-Section Spec"
Cohesion: 0.07
Nodes (27): 1.1 — SFX Inventory Map, 1.2 — Audio Engine Rules, 1.3 — Ambient Soundscape (Optional Layer), 2.1 — Page Load Sequence, 2.2 — Hero Section Choreography, 2.3 — Scroll-Triggered Reveals, 2.4 — Cursor Effects, 2.5 — Particle System (+19 more)

### Community 8 - "dropdown-menu.tsx"
Cohesion: 0.09
Nodes (21): SmoothScrollProvider(), initialState, Theme, ThemeProvider(), ThemeProviderContext, ThemeProviderProps, ThemeProviderState, useTheme() (+13 more)

### Community 9 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2022, eslint.config.js, src/**/*.ts, src/**/*.tsx, vite/client, vite.config.ts (+18 more)

### Community 10 - "button.tsx"
Cohesion: 0.12
Nodes (21): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+13 more)

### Community 11 - "utils.ts"
Cohesion: 0.08
Nodes (15): HoverCardContent, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, MorphText(), MorphTextProps, PopoverContent (+7 more)

### Community 12 - "routeTree.gen.ts"
Cohesion: 0.13
Nodes (21): Route, Route, Route, Route, Route, Route, Route, AuthRoute (+13 more)

### Community 13 - "components.json"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 14 - "Shadow Level — Audio, SFX & Interactive Animation Specification"
Cohesion: 0.11
Nodes (18): 1. Audio Architecture & Implementation Rules, 2. Sound Mapping — Where & When to Play, 3. Interactive Animations & Micro-Interactions, 4. Implementation Checklist for the Coding Agent, 5. Recommended Sound Character (Solo Leveling DNA), 6. Final Notes for the Coding Agent, Ambient (Optional but Atmospheric), Critical Moments (Highest Priority) (+10 more)

### Community 15 - "command.tsx"
Cohesion: 0.12
Nodes (14): Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut() (+6 more)

### Community 16 - "menubar.tsx"
Cohesion: 0.12
Nodes (11): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarShortcut() (+3 more)

### Community 17 - "Shadow Level — Changelog"
Cohesion: 0.12
Nodes (15): 2026-08-09 — Major Migration, 2026-08-12 — UI/UX Overhaul & Graphify Integration, 2026-08-13 — Theme Engine & UI Polish, 2026-08-14 — Audio Upgrade & Rank Up System, Added, Added, Added, Added (+7 more)

### Community 18 - "SECURITY.md — Local Development"
Cohesion: 0.14
Nodes (13): Check 0 — Local Environment Security, Check 1 — Secret Leak Prevention, Check 2 — Personal Data Flow Audit, Check 3 — Pre-Deploy Production Audit, Check 4 — Deep Security Audit for Complex Logic, Check 5 — Attacker's Perspective Review, Environment Setup, How to Use (+5 more)

### Community 19 - "carousel.tsx"
Cohesion: 0.19
Nodes (13): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+5 more)

### Community 20 - "dependencies"
Cohesion: 0.15
Nodes (13): canvas-confetti, @hookform/resolvers, dependencies, canvas-confetti, @hookform/resolvers, @radix-ui/react-accordion, @radix-ui/react-navigation-menu, @radix-ui/react-slider (+5 more)

### Community 21 - "form.tsx"
Cohesion: 0.23
Nodes (10): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+2 more)

### Community 22 - "devDependencies"
Cohesion: 0.18
Nodes (11): eslint, eslint-plugin-react-hooks, globals, devDependencies, eslint, eslint-plugin-react-hooks, globals, typescript-eslint (+3 more)

### Community 23 - "chart.tsx"
Cohesion: 0.25
Nodes (9): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, getPayloadConfigFromPayload(), THEMES (+1 more)

### Community 24 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, deploy, dev, predeploy, preview, test, test:ui (+1 more)

### Community 25 - "table.tsx"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 26 - "⚔️ Shadow Level — RPG Habit Tracker"
Cohesion: 0.25
Nodes (7): 1. Clone the Repository, ✨ Features, 🚀 Getting Started, Prerequisites, 📁 Project Structure, ⚔️ Shadow Level — RPG Habit Tracker, 🛠️ Tech Stack

### Community 27 - "navigation-menu.tsx"
Cohesion: 0.29
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 28 - "Shadow Level — Product Requirements Document"
Cohesion: 0.29
Nodes (6): Core Features (MVP — Complete), Data Storage, Deployment, Purpose, Shadow Level — Product Requirements Document, Target Users

### Community 29 - "card.tsx"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 30 - "toggle-group.tsx"
Cohesion: 0.43
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 31 - "Shadow Level — Architecture"
Cohesion: 0.33
Nodes (5): Authentication, Data Flow, Key Modules, Shadow Level — Architecture, Tech Stack

### Community 32 - "package.json"
Cohesion: 0.40
Nodes (4): description, name, private, version

### Community 33 - "alert.tsx"
Cohesion: 0.50
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 34 - "Audio Assets — Drop Real Files Here"
Cohesion: 0.50
Nodes (3): Audio Assets — Drop Real Files Here, Folder layout, Rules / tips

### Community 35 - "badge.tsx"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

## Knowledge Gaps
- **315 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `css` (+310 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **65 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `queries.ts`, `alert.tsx`, `sidebar.tsx`, `dashboard.tsx`, `badge.tsx`, `dropdown-menu.tsx`, `button.tsx`, `utils.ts`, `command.tsx`, `menubar.tsx`, `carousel.tsx`, `form.tsx`, `chart.tsx`, `table.tsx`, `navigation-menu.tsx`, `card.tsx`, `toggle-group.tsx`?**
  _High betweenness centrality (0.198) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`, `class-variance-authority`, `clsx`, `cmdk`, `date-fns`, `embla-carousel-react`, `framer-motion`, `input-otp`, `lenis`, `lucide-react`, `@radix-ui/react-alert-dialog`, `@radix-ui/react-aspect-ratio`, `@radix-ui/react-avatar`, `@radix-ui/react-checkbox`, `@radix-ui/react-collapsible`, `@radix-ui/react-context-menu`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-hover-card`, `@radix-ui/react-label`, `@radix-ui/react-menubar`, `@radix-ui/react-popover`, `@radix-ui/react-progress`, `@radix-ui/react-radio-group`, `@radix-ui/react-scroll-area`, `@radix-ui/react-select`, `@radix-ui/react-separator`, `@radix-ui/react-slot`, `@radix-ui/react-switch`, `@radix-ui/react-tabs`, `@radix-ui/react-toggle`, `@radix-ui/react-toggle-group`, `@radix-ui/react-tooltip`, `react-dom`, `react-hook-form`, `react-resizable-panels`, `recharts`, `sonner`, `tailwind-merge`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tanstack/react-router`, `@tanstack/router-plugin`, `tw-animate-css`, `vaul`, `vite-tsconfig-paths`, `zod`, `zustand`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `Button` connect `button.tsx` to `queries.ts`, `cn`, `sidebar.tsx`, `dashboard.tsx`, `carousel.tsx`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _315 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `queries.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0700171821305842 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.0782608695652174 - nodes in this community are weakly interconnected._
- **Should `sidebar.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0595959595959596 - nodes in this community are weakly interconnected._