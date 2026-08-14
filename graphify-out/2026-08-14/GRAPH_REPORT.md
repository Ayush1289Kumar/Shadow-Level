# Graph Report - Shadow-Level  (2026-08-14)

## Corpus Check
- 103 files · ~179,587 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 863 nodes · 1511 edges · 109 communities (44 shown, 65 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9b05fcf2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- queries.ts
- dashboard.tsx
- sidebar.tsx
- cn
- routeTree.gen.ts
- button.tsx
- SoundManager
- compilerOptions
- utils.ts
- ThemeProvider.tsx
- components.json
- command.tsx
- menubar.tsx
- form.tsx
- dependencies
- devDependencies
- chart.tsx
- scripts
- table.tsx
- navigation-menu.tsx
- card.tsx
- toggle-group.tsx
- package.json
- alert.tsx
- badge.tsx
- setup.ts
- canvas-confetti
- date-fns
- clsx
- cmdk
- embla-carousel-react
- 🚀 AI Project Operating System (AI-POS) — Local Development
- @eslint/js
- eslint-plugin-prettier
- eslint-plugin-react-refresh
- framer-motion
- input-otp
- jsdom
- lenis
- lucide-react
- @radix-ui/react-alert-dialog
- UI/UX, Animation & Design — Agent Skill Reference
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
- Part 3 — Section-by-Section Spec
- Shadow Level — Audio, SFX & Interactive Animation Specification
- SECURITY.md — Local Development
- carousel.tsx
- 2026-08-09 — Major Migration
- ErrorBoundary
- main.tsx
- ⚔️ Shadow Level — RPG Habit Tracker
- __root.tsx
- dropdown-menu.tsx
- Shadow Level — Product Requirements Document
- Shadow Level — Architecture
- Audio Assets — Drop Real Files Here
- rules/graphify.md
- workflows/graphify.md
- class-variance-authority
- eslint-config-prettier

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

## Communities (109 total, 65 thin omitted)

### Community 0 - "queries.ts"
Cohesion: 0.10
Nodes (49): ExpBar(), LevelProgress(), RankBadge(), useCompleteHabit(), useCreateReward(), useDeleteReward(), useHabitLogs(), useHabitLogsByDate() (+41 more)

### Community 1 - "dashboard.tsx"
Cohesion: 0.06
Nodes (53): AppNav(), items, Habit, HabitCard(), HabitCardProps, LevelUpSequence(), RequireAuth(), Avatar (+45 more)

### Community 2 - "sidebar.tsx"
Cohesion: 0.06
Nodes (39): Separator, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay, SheetTitle (+31 more)

### Community 3 - "cn"
Cohesion: 0.08
Nodes (38): AccordionContent, AccordionItem, AccordionTrigger, Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList (+30 more)

### Community 4 - "routeTree.gen.ts"
Cohesion: 0.12
Nodes (22): Route, Route, Route, Route, Route, Route, Route, Route (+14 more)

### Community 5 - "button.tsx"
Cohesion: 0.12
Nodes (21): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+13 more)

### Community 6 - "SoundManager"
Cohesion: 0.18
Nodes (3): assetUrl(), SoundManager, WebAudioPlaceholder

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2022, eslint.config.js, src/**/*.ts, src/**/*.tsx, vite/client, vite.config.ts (+18 more)

### Community 8 - "utils.ts"
Cohesion: 0.08
Nodes (15): HoverCardContent, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, MorphText(), MorphTextProps, PopoverContent (+7 more)

### Community 9 - "ThemeProvider.tsx"
Cohesion: 0.21
Nodes (10): initialState, Theme, ThemeProviderContext, ThemeProviderProps, ThemeProviderState, useTheme(), themes, ThemeSwitcher() (+2 more)

### Community 10 - "components.json"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 11 - "command.tsx"
Cohesion: 0.12
Nodes (14): Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut() (+6 more)

### Community 12 - "menubar.tsx"
Cohesion: 0.12
Nodes (11): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarShortcut() (+3 more)

### Community 13 - "form.tsx"
Cohesion: 0.23
Nodes (10): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+2 more)

### Community 14 - "dependencies"
Cohesion: 0.15
Nodes (13): @hookform/resolvers, dependencies, @hookform/resolvers, @radix-ui/react-accordion, @radix-ui/react-aspect-ratio, @radix-ui/react-navigation-menu, @radix-ui/react-slider, react (+5 more)

### Community 15 - "devDependencies"
Cohesion: 0.18
Nodes (11): eslint, eslint-plugin-react-hooks, globals, devDependencies, eslint, eslint-plugin-react-hooks, globals, typescript-eslint (+3 more)

### Community 16 - "chart.tsx"
Cohesion: 0.25
Nodes (9): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, getPayloadConfigFromPayload(), THEMES (+1 more)

### Community 17 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, deploy, dev, predeploy, preview, test, test:ui (+1 more)

### Community 18 - "table.tsx"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 19 - "navigation-menu.tsx"
Cohesion: 0.29
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 20 - "card.tsx"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 21 - "toggle-group.tsx"
Cohesion: 0.43
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 22 - "package.json"
Cohesion: 0.40
Nodes (4): description, name, private, version

### Community 23 - "alert.tsx"
Cohesion: 0.50
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 24 - "badge.tsx"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

### Community 31 - "🚀 AI Project Operating System (AI-POS) — Local Development"
Cohesion: 0.06
Nodes (33): `01_prd.md`, `02_architecture.md`, `03_implementation_plan.md`, `04_task_today.md`, `05_rules.md`, `06_audit.md`, `07_decisions.md`, `08_changelog.md` (+25 more)

### Community 41 - "UI/UX, Animation & Design — Agent Skill Reference"
Cohesion: 0.07
Nodes (29): 1. Component Libraries, 2. Smooth Scroll, 3. Design Taste & Quality Enforcement, 4. Browser Automation & Visual Testing, 5. 3D & Three.js Portfolio References, 6. Reference & Checklists, Agent Instructions (Universal), agentation — `benjitaylor/agentation` (+21 more)

### Community 92 - "Part 3 — Section-by-Section Spec"
Cohesion: 0.07
Nodes (27): 1.1 — SFX Inventory Map, 1.2 — Audio Engine Rules, 1.3 — Ambient Soundscape (Optional Layer), 2.1 — Page Load Sequence, 2.2 — Hero Section Choreography, 2.3 — Scroll-Triggered Reveals, 2.4 — Cursor Effects, 2.5 — Particle System (+19 more)

### Community 93 - "Shadow Level — Audio, SFX & Interactive Animation Specification"
Cohesion: 0.11
Nodes (18): 1. Audio Architecture & Implementation Rules, 2. Sound Mapping — Where & When to Play, 3. Interactive Animations & Micro-Interactions, 4. Implementation Checklist for the Coding Agent, 5. Recommended Sound Character (Solo Leveling DNA), 6. Final Notes for the Coding Agent, Ambient (Optional but Atmospheric), Critical Moments (Highest Priority) (+10 more)

### Community 94 - "SECURITY.md — Local Development"
Cohesion: 0.14
Nodes (13): Check 0 — Local Environment Security, Check 1 — Secret Leak Prevention, Check 2 — Personal Data Flow Audit, Check 3 — Pre-Deploy Production Audit, Check 4 — Deep Security Audit for Complex Logic, Check 5 — Attacker's Perspective Review, Environment Setup, How to Use (+5 more)

### Community 95 - "carousel.tsx"
Cohesion: 0.19
Nodes (13): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+5 more)

### Community 96 - "2026-08-09 — Major Migration"
Cohesion: 0.15
Nodes (12): 2026-08-09 — Major Migration, 2026-08-12 — UI/UX Overhaul & Graphify Integration, 2026-08-13 — Theme Engine & UI Polish, Added, Added, Added, Changed, Changed (+4 more)

### Community 97 - "ErrorBoundary"
Cohesion: 0.22
Nodes (3): ErrorBoundary, Props, State

### Community 98 - "main.tsx"
Cohesion: 0.25
Nodes (7): sound, queryClient, router, getRouter(), Register, @tanstack/react-router, routeTree

### Community 99 - "⚔️ Shadow Level — RPG Habit Tracker"
Cohesion: 0.25
Nodes (7): 1. Clone the Repository, ✨ Features, 🚀 Getting Started, Prerequisites, 📁 Project Structure, ⚔️ Shadow Level — RPG Habit Tracker, 🛠️ Tech Stack

### Community 100 - "__root.tsx"
Cohesion: 0.32
Nodes (4): SmoothScrollProvider(), ThemeProvider(), Toaster(), ToasterProps

### Community 101 - "dropdown-menu.tsx"
Cohesion: 0.25
Nodes (7): DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut(), DropdownMenuSubContent, DropdownMenuSubTrigger

### Community 102 - "Shadow Level — Product Requirements Document"
Cohesion: 0.29
Nodes (6): Core Features (MVP — Complete), Data Storage, Deployment, Purpose, Shadow Level — Product Requirements Document, Target Users

### Community 103 - "Shadow Level — Architecture"
Cohesion: 0.33
Nodes (5): Authentication, Data Flow, Key Modules, Shadow Level — Architecture, Tech Stack

### Community 104 - "Audio Assets — Drop Real Files Here"
Cohesion: 0.50
Nodes (3): Audio Assets — Drop Real Files Here, Folder layout, Rules / tips

## Knowledge Gaps
- **313 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `css` (+308 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **65 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `dashboard.tsx`, `sidebar.tsx`, `button.tsx`, `dropdown-menu.tsx`, `utils.ts`, `ThemeProvider.tsx`, `command.tsx`, `menubar.tsx`, `form.tsx`, `chart.tsx`, `table.tsx`, `navigation-menu.tsx`, `card.tsx`, `toggle-group.tsx`, `alert.tsx`, `badge.tsx`, `carousel.tsx`?**
  _High betweenness centrality (0.199) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`, `canvas-confetti`, `date-fns`, `clsx`, `cmdk`, `embla-carousel-react`, `framer-motion`, `input-otp`, `lenis`, `lucide-react`, `@radix-ui/react-alert-dialog`, `@radix-ui/react-avatar`, `@radix-ui/react-checkbox`, `@radix-ui/react-collapsible`, `@radix-ui/react-context-menu`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-hover-card`, `@radix-ui/react-label`, `@radix-ui/react-menubar`, `@radix-ui/react-popover`, `@radix-ui/react-progress`, `@radix-ui/react-radio-group`, `@radix-ui/react-scroll-area`, `@radix-ui/react-select`, `@radix-ui/react-separator`, `@radix-ui/react-slot`, `@radix-ui/react-switch`, `@radix-ui/react-tabs`, `@radix-ui/react-toggle`, `@radix-ui/react-toggle-group`, `@radix-ui/react-tooltip`, `react-dom`, `react-hook-form`, `react-resizable-panels`, `recharts`, `sonner`, `tailwind-merge`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tanstack/react-router`, `@tanstack/router-plugin`, `tw-animate-css`, `vaul`, `vite-tsconfig-paths`, `zod`, `zustand`, `class-variance-authority`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `Button` connect `button.tsx` to `dashboard.tsx`, `sidebar.tsx`, `cn`, `carousel.tsx`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _313 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `queries.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09887005649717515 - nodes in this community are weakly interconnected._
- **Should `dashboard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06234567901234568 - nodes in this community are weakly interconnected._
- **Should `sidebar.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0595959595959596 - nodes in this community are weakly interconnected._