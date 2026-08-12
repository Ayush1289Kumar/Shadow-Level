# Graph Report - Shadow-Level  (2026-08-13)

## Corpus Check
- 98 files · ~151,037 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 779 nodes · 1374 edges · 105 communities (40 shown, 65 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `75ff6f68`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- queries.ts
- cn
- devDependencies
- routeTree.gen.ts
- button.tsx
- sidebar.tsx
- compilerOptions
- components.json
- command.tsx
- menubar.tsx
- 🚀 AI Project Operating System (AI-POS) — Local Development
- form.tsx
- levelProgress
- dependencies
- env
- chart.tsx
- UI/UX, Animation & Design — Agent Skill Reference
- utils.ts
- sheet.tsx
- navigation-menu.tsx
- SECURITY.md — Local Development
- toggle-group.tsx
- alert.tsx
- carousel.tsx
- class-variance-authority
- clsx
- table.tsx
- date-fns
- embla-carousel-react
- framer-motion
- input-otp
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
- canvas-confetti
- @radix-ui/react-select
- @radix-ui/react-separator
- breadcrumb.tsx
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
- ⚔️ Shadow Level — RPG Habit Tracker
- drawer.tsx
- @radix-ui/react-slot
- @types/react
- Shadow Level — Product Requirements Document
- Shadow Level — Architecture
- 2026-08-09 — Major Migration
- scripts
- package.json
- light-lines.tsx
- setup.ts
- rules/graphify.md
- workflows/graphify.md
- eslint-config-prettier
- eslint-plugin-prettier
- HabitCard.tsx
- eslint-plugin-react-refresh
- @radix-ui/react-scroll-area
- prettier
- @types/canvas-confetti
- badge.tsx
- @types/react-dom
- typescript
- vite
- @vitejs/plugin-react
- @eslint/js
- @types/node
- @vitest/ui
- vercel.json
- jsdom

## God Nodes (most connected - your core abstractions)
1. `cn()` - 226 edges
2. `useAppStore` - 28 edges
3. `compilerOptions` - 17 edges
4. `read()` - 16 edges
5. `🚀 AI Project Operating System (AI-POS) — Local Development` - 16 edges
6. `write()` - 12 edges
7. `Button` - 11 edges
8. `levelProgress()` - 11 edges
9. `UI/UX, Animation & Design — Agent Skill Reference` - 11 edges
10. `📋 Required Documentation` - 11 edges

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
Nodes (71): AppNav(), items, RequireAuth(), Label, labelVariants, Textarea, qk, useCompleteHabit() (+63 more)

### Community 1 - "cn"
Cohesion: 0.08
Nodes (40): AccordionContent, AccordionItem, AccordionTrigger, Card, CardContent, CardDescription, CardFooter, CardHeader (+32 more)

### Community 2 - "devDependencies"
Cohesion: 0.18
Nodes (11): eslint, eslint-plugin-react-hooks, globals, devDependencies, eslint, eslint-plugin-react-hooks, globals, typescript-eslint (+3 more)

### Community 3 - "routeTree.gen.ts"
Cohesion: 0.06
Nodes (33): ErrorBoundary, Props, State, SmoothScrollProvider(), Toaster(), ToasterProps, queryClient, router (+25 more)

### Community 4 - "button.tsx"
Cohesion: 0.12
Nodes (21): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+13 more)

### Community 5 - "sidebar.tsx"
Cohesion: 0.07
Nodes (32): Input, Separator, Sidebar, SidebarContent, SidebarContext, SidebarContextProps, SidebarFooter, SidebarGroup (+24 more)

### Community 6 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2022, eslint.config.js, src/**/*.ts, src/**/*.tsx, vite/client, vite.config.ts (+18 more)

### Community 7 - "components.json"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 8 - "command.tsx"
Cohesion: 0.12
Nodes (14): Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut() (+6 more)

### Community 9 - "menubar.tsx"
Cohesion: 0.12
Nodes (11): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarShortcut() (+3 more)

### Community 10 - "🚀 AI Project Operating System (AI-POS) — Local Development"
Cohesion: 0.06
Nodes (33): `01_prd.md`, `02_architecture.md`, `03_implementation_plan.md`, `04_task_today.md`, `05_rules.md`, `06_audit.md`, `07_decisions.md`, `08_changelog.md` (+25 more)

### Community 11 - "form.tsx"
Cohesion: 0.23
Nodes (10): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+2 more)

### Community 12 - "levelProgress"
Cohesion: 0.22
Nodes (12): ExpBar(), LevelProgress(), RankBadge(), Avatar, AvatarFallback, AvatarImage, computeLevel(), expForLevel() (+4 more)

### Community 13 - "dependencies"
Cohesion: 0.15
Nodes (13): cmdk, @hookform/resolvers, dependencies, cmdk, @hookform/resolvers, @radix-ui/react-accordion, @radix-ui/react-navigation-menu, @radix-ui/react-slider (+5 more)

### Community 14 - "env"
Cohesion: 0.18
Nodes (10): env, ANTHROPIC_AUTH_TOKEN, ANTHROPIC_BASE_URL, ANTHROPIC_DEFAULT_HAIKU_MODEL, ANTHROPIC_DEFAULT_OPUS_MODEL, ANTHROPIC_DEFAULT_SONNET_MODEL, ANTHROPIC_MODEL, CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS (+2 more)

### Community 15 - "chart.tsx"
Cohesion: 0.25
Nodes (9): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, getPayloadConfigFromPayload(), THEMES (+1 more)

### Community 16 - "UI/UX, Animation & Design — Agent Skill Reference"
Cohesion: 0.07
Nodes (29): 1. Component Libraries, 2. Smooth Scroll, 3. Design Taste & Quality Enforcement, 4. Browser Automation & Visual Testing, 5. 3D & Three.js Portfolio References, 6. Reference & Checklists, Agent Instructions (Universal), agentation — `benjitaylor/agentation` (+21 more)

### Community 17 - "utils.ts"
Cohesion: 0.08
Nodes (15): HoverCardContent, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, MorphText(), MorphTextProps, PopoverContent (+7 more)

### Community 18 - "sheet.tsx"
Cohesion: 0.25
Nodes (8): SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay, SheetTitle, sheetVariants

### Community 19 - "navigation-menu.tsx"
Cohesion: 0.29
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 20 - "SECURITY.md — Local Development"
Cohesion: 0.14
Nodes (13): Check 0 — Local Environment Security, Check 1 — Secret Leak Prevention, Check 2 — Personal Data Flow Audit, Check 3 — Pre-Deploy Production Audit, Check 4 — Deep Security Audit for Complex Logic, Check 5 — Attacker's Perspective Review, Environment Setup, How to Use (+5 more)

### Community 21 - "toggle-group.tsx"
Cohesion: 0.43
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 22 - "alert.tsx"
Cohesion: 0.50
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 23 - "carousel.tsx"
Cohesion: 0.19
Nodes (13): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+5 more)

### Community 26 - "table.tsx"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 50 - "breadcrumb.tsx"
Cohesion: 0.25
Nodes (7): Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

### Community 75 - "⚔️ Shadow Level — RPG Habit Tracker"
Cohesion: 0.25
Nodes (7): 1. Clone the Repository, ✨ Features, 🚀 Getting Started, Prerequisites, 📁 Project Structure, ⚔️ Shadow Level — RPG Habit Tracker, 🛠️ Tech Stack

### Community 76 - "drawer.tsx"
Cohesion: 0.25
Nodes (6): DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 80 - "Shadow Level — Product Requirements Document"
Cohesion: 0.29
Nodes (6): Core Features (MVP — Complete), Data Storage, Deployment, Purpose, Shadow Level — Product Requirements Document, Target Users

### Community 81 - "Shadow Level — Architecture"
Cohesion: 0.33
Nodes (5): Authentication, Data Flow, Key Modules, Shadow Level — Architecture, Tech Stack

### Community 82 - "2026-08-09 — Major Migration"
Cohesion: 0.20
Nodes (9): 2026-08-09 — Major Migration, 2026-08-12 — UI/UX Overhaul & Graphify Integration, Added, Added, Changed, Changed, Removed, Removed (+1 more)

### Community 83 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, deploy, dev, predeploy, preview, test, test:ui (+1 more)

### Community 87 - "package.json"
Cohesion: 0.40
Nodes (4): description, name, private, version

### Community 94 - "light-lines.tsx"
Cohesion: 0.50
Nodes (3): AnimatedLightRef, LightLines(), LightLinesProps

### Community 105 - "HabitCard.tsx"
Cohesion: 0.40
Nodes (4): Habit, HabitCard(), HabitCardProps, Checkbox

### Community 111 - "badge.tsx"
Cohesion: 0.25
Nodes (6): LevelUpSequence(), Badge(), BadgeProps, badgeVariants, CyberGlitchText(), CyberGlitchTextProps

## Knowledge Gaps
- **274 isolated node(s):** `$schema`, `ANTHROPIC_BASE_URL`, `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_MODEL`, `ANTHROPIC_DEFAULT_HAIKU_MODEL` (+269 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **65 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `queries.ts`, `button.tsx`, `sidebar.tsx`, `command.tsx`, `menubar.tsx`, `form.tsx`, `levelProgress`, `chart.tsx`, `utils.ts`, `sheet.tsx`, `navigation-menu.tsx`, `toggle-group.tsx`, `alert.tsx`, `carousel.tsx`, `table.tsx`, `breadcrumb.tsx`, `drawer.tsx`, `light-lines.tsx`, `HabitCard.tsx`, `badge.tsx`?**
  _High betweenness centrality (0.219) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `class-variance-authority`, `clsx`, `date-fns`, `embla-carousel-react`, `framer-motion`, `input-otp`, `lenis`, `lucide-react`, `@radix-ui/react-alert-dialog`, `@radix-ui/react-aspect-ratio`, `@radix-ui/react-avatar`, `@radix-ui/react-checkbox`, `@radix-ui/react-collapsible`, `@radix-ui/react-context-menu`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-hover-card`, `@radix-ui/react-label`, `@radix-ui/react-menubar`, `@radix-ui/react-popover`, `@radix-ui/react-progress`, `@radix-ui/react-radio-group`, `canvas-confetti`, `@radix-ui/react-select`, `@radix-ui/react-separator`, `@radix-ui/react-switch`, `@radix-ui/react-tabs`, `@radix-ui/react-toggle`, `@radix-ui/react-toggle-group`, `@radix-ui/react-tooltip`, `react-dom`, `react-hook-form`, `react-resizable-panels`, `recharts`, `sonner`, `tailwind-merge`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tanstack/react-router`, `@tanstack/router-plugin`, `tw-animate-css`, `vaul`, `vite-tsconfig-paths`, `zod`, `zustand`, `@radix-ui/react-slot`, `package.json`, `@radix-ui/react-scroll-area`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `jsdom`, `eslint-config-prettier`, `eslint-plugin-prettier`, `eslint-plugin-react-refresh`, `prettier`, `@types/canvas-confetti`, `@types/react`, `@types/react-dom`, `typescript`, `vite`, `@vitejs/plugin-react`, `@eslint/js`, `@types/node`, `package.json`, `@vitest/ui`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `$schema`, `ANTHROPIC_BASE_URL`, `ANTHROPIC_AUTH_TOKEN` to the rest of the system?**
  _274 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `queries.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07122060470324748 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.0786308973172988 - nodes in this community are weakly interconnected._
- **Should `routeTree.gen.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05893719806763285 - nodes in this community are weakly interconnected._