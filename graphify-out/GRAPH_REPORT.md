# Graph Report - Shadow-Level  (2026-08-15)

## Corpus Check
- 105 files · ~956,670 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 921 nodes · 1586 edges · 107 communities (41 shown, 66 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `45ec8b50`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- audio.ts
- Implementation Plan — Gemini AI Frame-Scrubbed Dungeon Gate
- sidebar.tsx
- me.tsx
- select.tsx
- 🚀 AI Project Operating System (AI-POS) — Local Development
- UI/UX, Animation & Design — Agent Skill Reference
- aren_interactive.md
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
- accordion.tsx
- dependencies
- form.tsx
- devDependencies
- chart.tsx
- scripts
- cn
- ⚔️ Shadow Level — RPG Habit Tracker
- navigation-menu.tsx
- Shadow Level — Product Requirements Document
- queries.ts
- carousel.tsx
- Shadow Level — Architecture
- package.json
- alert.tsx
- Audio Assets — Drop Real Files Here
- light-lines.tsx
- setup.ts
- rules/graphify.md
- workflows/graphify.md
- canvas-confetti
- clsx
- class-variance-authority
- date-fns
- embla-carousel-react
- eslint-config-prettier
- badge.tsx
- cmdk
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
- @eslint/js
- @types/react-dom
- eslint-plugin-prettier
- vite
- @vitejs/plugin-react
- eslint-plugin-react-hooks
- vercel.json
- three
- @types/three
- vitest

## God Nodes (most connected - your core abstractions)
1. `cn()` - 226 edges
2. `useAppStore` - 32 edges
3. `playSound()` - 22 edges
4. `compilerOptions` - 17 edges
5. `read()` - 16 edges
6. `🚀 AI Project Operating System (AI-POS) — Local Development` - 16 edges
7. `Button` - 12 edges
8. `SoundManager` - 12 edges
9. `write()` - 12 edges
10. `levelProgress()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `AccordionItem` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/accordion.tsx → src/lib/utils.ts
- `AccordionTrigger` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/accordion.tsx → src/lib/utils.ts
- `AccordionContent` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/accordion.tsx → src/lib/utils.ts
- `AlertDialogOverlay` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogContent` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (107 total, 66 thin omitted)

### Community 0 - "audio.ts"
Cohesion: 0.10
Nodes (15): LevelUpSequence(), CyberGlitchText(), CyberGlitchTextProps, assetUrl(), AudioBridge(), AudioSettingsState, getSharedAudioContext(), sound (+7 more)

### Community 1 - "Implementation Plan — Gemini AI Frame-Scrubbed Dungeon Gate"
Cohesion: 0.14
Nodes (13): Automated, Implementation Plan — Gemini AI Frame-Scrubbed Dungeon Gate, Manual, [MODIFY] `docs/aren_interactive.md`, [MODIFY] [`InteractiveLanding.tsx`](file:///d:/Vibe%20Coding/Projects/Shadow-Level/src/components/InteractiveLanding.tsx), Open Questions, Phase 1 — Video Frame Extraction (FFmpeg), Phase 2 — Canvas Scroll Scrubber (+5 more)

### Community 2 - "sidebar.tsx"
Cohesion: 0.06
Nodes (40): Input, Separator, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay (+32 more)

### Community 3 - "me.tsx"
Cohesion: 0.17
Nodes (13): ExpBar(), LevelProgress(), RankBadge(), Avatar, AvatarFallback, AvatarImage, compressAvatar(), computeLevel() (+5 more)

### Community 4 - "select.tsx"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 5 - "🚀 AI Project Operating System (AI-POS) — Local Development"
Cohesion: 0.06
Nodes (33): `01_prd.md`, `02_architecture.md`, `03_implementation_plan.md`, `04_task_today.md`, `05_rules.md`, `06_audit.md`, `07_decisions.md`, `08_changelog.md` (+25 more)

### Community 6 - "UI/UX, Animation & Design — Agent Skill Reference"
Cohesion: 0.07
Nodes (29): 1. Component Libraries, 2. Smooth Scroll, 3. Design Taste & Quality Enforcement, 4. Browser Automation & Visual Testing, 5. 3D & Three.js Portfolio References, 6. Reference & Checklists, Agent Instructions (Universal), agentation — `benjitaylor/agentation` (+21 more)

### Community 7 - "aren_interactive.md"
Cohesion: 0.06
Nodes (30): 1.1 — SFX Inventory Map, 1.2 — Audio Engine Rules, 1.3 — Ambient Soundscape (Optional Layer), 2.1 — Page Load Sequence, 2.2 — Hero Section Choreography, 2.3 — Scroll-Triggered Reveals, 2.4 — Cursor Effects, 2.5 — Particle System (+22 more)

### Community 8 - "dropdown-menu.tsx"
Cohesion: 0.07
Nodes (24): ErrorBoundary, Props, State, SmoothScrollProvider(), initialState, Theme, ThemeProvider(), ThemeProviderContext (+16 more)

### Community 9 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2022, eslint.config.js, src/**/*.ts, src/**/*.tsx, vite/client, vite.config.ts (+18 more)

### Community 10 - "button.tsx"
Cohesion: 0.12
Nodes (21): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+13 more)

### Community 11 - "utils.ts"
Cohesion: 0.08
Nodes (18): HoverCardContent, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, MorphText(), MorphTextProps, PopoverContent (+10 more)

### Community 12 - "routeTree.gen.ts"
Cohesion: 0.10
Nodes (26): getRouter(), Register, @tanstack/react-router, Route, Route, Route, Route, Route (+18 more)

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
Cohesion: 0.10
Nodes (19): 2026-08-09 — Major Migration, 2026-08-12 — UI/UX Overhaul & Graphify Integration, 2026-08-13 — Theme Engine & UI Polish, 2026-08-14 — Audio Upgrade & Rank Up System, 2026-08-15 — Interactive Landing Page & Audio Engine Overhaul, Added, Added, Added (+11 more)

### Community 18 - "SECURITY.md — Local Development"
Cohesion: 0.14
Nodes (13): Check 0 — Local Environment Security, Check 1 — Secret Leak Prevention, Check 2 — Personal Data Flow Audit, Check 3 — Pre-Deploy Production Audit, Check 4 — Deep Security Audit for Complex Logic, Check 5 — Attacker's Perspective Review, Environment Setup, How to Use (+5 more)

### Community 19 - "accordion.tsx"
Cohesion: 0.50
Nodes (3): AccordionContent, AccordionItem, AccordionTrigger

### Community 20 - "dependencies"
Cohesion: 0.15
Nodes (13): @hookform/resolvers, dependencies, @hookform/resolvers, @radix-ui/react-accordion, @radix-ui/react-navigation-menu, @radix-ui/react-progress, @radix-ui/react-slider, react (+5 more)

### Community 21 - "form.tsx"
Cohesion: 0.19
Nodes (12): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+4 more)

### Community 22 - "devDependencies"
Cohesion: 0.15
Nodes (13): eslint, globals, devDependencies, eslint, globals, @types/react, typescript, typescript-eslint (+5 more)

### Community 23 - "chart.tsx"
Cohesion: 0.25
Nodes (9): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, getPayloadConfigFromPayload(), THEMES (+1 more)

### Community 24 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, deploy, dev, predeploy, preview, test, test:ui (+1 more)

### Community 25 - "cn"
Cohesion: 0.07
Nodes (44): Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator(), Card (+36 more)

### Community 26 - "⚔️ Shadow Level — RPG Habit Tracker"
Cohesion: 0.10
Nodes (20): 1. Clone the Repository, 2. Install Dependencies, 3. Run the Development Server, 🙏 Acknowledgments, 🔊 Audio System, 🤝 Contributing, Deploy to Vercel, 🚢 Deployment (+12 more)

### Community 27 - "navigation-menu.tsx"
Cohesion: 0.29
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 28 - "Shadow Level — Product Requirements Document"
Cohesion: 0.25
Nodes (7): Core Features (MVP — Complete), Data Storage, Deployment, Non-Goals (Out of Scope), Purpose, Shadow Level — Product Requirements Document, Target Users

### Community 29 - "queries.ts"
Cohesion: 0.06
Nodes (79): AppNav(), items, Habit, HabitCard(), HabitCardProps, CinematicLoader(), CursorRipple, CustomCursor() (+71 more)

### Community 30 - "carousel.tsx"
Cohesion: 0.19
Nodes (13): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+5 more)

### Community 31 - "Shadow Level — Architecture"
Cohesion: 0.15
Nodes (12): Architecture, Audio Engine (`src/lib/audio.ts`), Authentication, Autoplay Unlock, Custom Sound Overrides, Data Flow, Key Modules, Landing Page Architecture (`InteractiveLanding.tsx`) (+4 more)

### Community 32 - "package.json"
Cohesion: 0.40
Nodes (4): description, name, private, version

### Community 33 - "alert.tsx"
Cohesion: 0.50
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 34 - "Audio Assets — Drop Real Files Here"
Cohesion: 0.50
Nodes (3): Audio Assets — Drop Real Files Here, Folder layout, Rules / tips

### Community 35 - "light-lines.tsx"
Cohesion: 0.50
Nodes (3): AnimatedLightRef, LightLines(), LightLinesProps

### Community 45 - "badge.tsx"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

## Knowledge Gaps
- **349 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `css` (+344 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **66 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `audio.ts`, `alert.tsx`, `sidebar.tsx`, `me.tsx`, `light-lines.tsx`, `select.tsx`, `dropdown-menu.tsx`, `button.tsx`, `utils.ts`, `badge.tsx`, `command.tsx`, `menubar.tsx`, `accordion.tsx`, `form.tsx`, `chart.tsx`, `navigation-menu.tsx`, `queries.ts`, `carousel.tsx`?**
  _High betweenness centrality (0.178) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`, `canvas-confetti`, `clsx`, `class-variance-authority`, `date-fns`, `embla-carousel-react`, `cmdk`, `framer-motion`, `input-otp`, `lenis`, `lucide-react`, `@radix-ui/react-alert-dialog`, `@radix-ui/react-aspect-ratio`, `@radix-ui/react-avatar`, `@radix-ui/react-checkbox`, `@radix-ui/react-collapsible`, `@radix-ui/react-context-menu`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-hover-card`, `@radix-ui/react-label`, `@radix-ui/react-menubar`, `@radix-ui/react-popover`, `@radix-ui/react-radio-group`, `@radix-ui/react-scroll-area`, `@radix-ui/react-select`, `@radix-ui/react-separator`, `@radix-ui/react-slot`, `@radix-ui/react-switch`, `@radix-ui/react-tabs`, `@radix-ui/react-toggle`, `@radix-ui/react-toggle-group`, `@radix-ui/react-tooltip`, `react-dom`, `react-hook-form`, `react-resizable-panels`, `recharts`, `sonner`, `tailwind-merge`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tanstack/react-router`, `@tanstack/router-plugin`, `tw-animate-css`, `vaul`, `vite-tsconfig-paths`, `zod`, `zustand`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `Button` connect `button.tsx` to `sidebar.tsx`, `me.tsx`, `cn`, `queries.ts`, `carousel.tsx`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _349 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `audio.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10037878787878787 - nodes in this community are weakly interconnected._
- **Should `Implementation Plan — Gemini AI Frame-Scrubbed Dungeon Gate` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `sidebar.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05735430157261795 - nodes in this community are weakly interconnected._