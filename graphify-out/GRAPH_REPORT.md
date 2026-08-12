# Graph Report - Shadow-Level  (2026-08-12)

## Corpus Check
- 97 files · ~152,176 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 853 nodes · 1447 edges · 121 communities (56 shown, 65 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c9a44a7b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- queries.ts
- cn
- devDependencies
- routeTree.gen.ts
- carousel.tsx
- sidebar.tsx
- compilerOptions
- components.json
- command.tsx
- menubar.tsx
- 🚀 AI Project Operating System (AI-POS) — Local Development
- form.tsx
- me.tsx
- dependencies
- env
- chart.tsx
- UI/UX, Animation & Design — Agent Skill Reference
- utils.ts
- Shadow Level Design System
- navigation-menu.tsx
- SECURITY.md — Local Development
- toggle-group.tsx
- alert.tsx
- dropdown-menu.tsx
- class-variance-authority
- clsx
- cmdk
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
- CODEBASE_AUDIT.md
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
- sheet.tsx
- select.tsx
- 12. Gamification Mechanics
- 5. Core Features Analysis
- Shadow Level — Product Requirements Document
- Shadow Level — Architecture
- 2026-08-09 — Major Migration
- scripts
- 15. Code Quality Assessment
- 2. Technology Stack
- 7. Authentication and Session Management
- package.json
- 11. Styling System
- 14. Performance Analysis
- 17. Technical Debt
- 18. Recommendations
- 1. Project Overview
- 3. Architecture and Design Patterns
- badge.tsx
- setup.ts
- 10. Component Library
- 6. Data Layer
- card.tsx
- 9. Routing Structure
- rules/graphify.md
- workflows/graphify.md
- eslint
- eslint-config-prettier
- eslint-plugin-prettier
- HabitCard.tsx
- eslint-plugin-react-refresh
- tabs.tsx
- @radix-ui/react-scroll-area
- prettier
- @types/canvas-confetti
- @types/react
- @types/react-dom
- typescript
- 13. Security Considerations
- vite
- @vitejs/plugin-react
- @eslint/js
- @types/node
- @vitest/ui
- vercel.json

## God Nodes (most connected - your core abstractions)
1. `cn()` - 220 edges
2. `useAppStore` - 30 edges
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

## Communities (121 total, 65 thin omitted)

### Community 0 - "queries.ts"
Cohesion: 0.08
Nodes (67): AppNav(), items, RequireAuth(), Textarea, qk, useCompleteHabit(), useCreateHabit(), useCreateReward() (+59 more)

### Community 1 - "cn"
Cohesion: 0.08
Nodes (36): AccordionContent, AccordionItem, AccordionTrigger, Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList (+28 more)

### Community 2 - "devDependencies"
Cohesion: 0.18
Nodes (11): eslint-plugin-react-hooks, globals, jsdom, devDependencies, eslint-plugin-react-hooks, globals, jsdom, typescript-eslint (+3 more)

### Community 3 - "routeTree.gen.ts"
Cohesion: 0.06
Nodes (36): ErrorBoundary, Props, State, SmoothScrollProvider(), Toaster(), ToasterProps, queryClient, router (+28 more)

### Community 4 - "carousel.tsx"
Cohesion: 0.07
Nodes (34): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+26 more)

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
Cohesion: 0.19
Nodes (12): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+4 more)

### Community 12 - "me.tsx"
Cohesion: 0.18
Nodes (14): ExpBar(), LevelProgress(), RankBadge(), Avatar, AvatarFallback, AvatarImage, compressAvatar(), computeLevel() (+6 more)

### Community 13 - "dependencies"
Cohesion: 0.15
Nodes (13): @hookform/resolvers, dependencies, @hookform/resolvers, @radix-ui/react-accordion, @radix-ui/react-navigation-menu, @radix-ui/react-slider, @radix-ui/react-slot, react (+5 more)

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
Cohesion: 0.09
Nodes (13): HoverCardContent, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, PopoverContent, Progress, ResizableHandle() (+5 more)

### Community 18 - "Shadow Level Design System"
Cohesion: 0.17
Nodes (11): Backgrounds, Changing the Design, Color Palette, Custom Utilities & Components, Design Philosophy, Glassmorphism, Glow Effects, Key Pillars (+3 more)

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

### Community 23 - "dropdown-menu.tsx"
Cohesion: 0.20
Nodes (9): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut(), DropdownMenuSubContent (+1 more)

### Community 50 - "CODEBASE_AUDIT.md"
Cohesion: 0.22
Nodes (8): 16. Areas for Improvement, 4. Project Structure, 8. State Management, Conclusion, Executive Summary, Local State Patterns, Table of Contents, Zustand Store (store.ts)

### Community 75 - "⚔️ Shadow Level — RPG Habit Tracker"
Cohesion: 0.25
Nodes (7): 1. Clone the Repository, ✨ Features, 🚀 Getting Started, Prerequisites, 📁 Project Structure, ⚔️ Shadow Level — RPG Habit Tracker, 🛠️ Tech Stack

### Community 76 - "sheet.tsx"
Cohesion: 0.25
Nodes (8): SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay, SheetTitle, sheetVariants

### Community 77 - "select.tsx"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 78 - "12. Gamification Mechanics"
Cohesion: 0.29
Nodes (7): 12. Gamification Mechanics, Dungeon Raid Ranks, Leveling System (leveling.ts), Penalty Zone, Shadow Army, Stat Allocation, Streak System (profile.ts)

### Community 79 - "5. Core Features Analysis"
Cohesion: 0.29
Nodes (7): 5.1 Dashboard (/dashboard), 5.2 Habit Forge (/habits), 5.3 Rewards (/rewards), 5.4 Analytics (/analytics), 5.5 Profile (/me), 5.6 Public Profile (/profile/), 5. Core Features Analysis

### Community 80 - "Shadow Level — Product Requirements Document"
Cohesion: 0.29
Nodes (6): Core Features (MVP — Complete), Data Storage, Deployment, Purpose, Shadow Level — Product Requirements Document, Target Users

### Community 81 - "Shadow Level — Architecture"
Cohesion: 0.33
Nodes (5): Authentication, Data Flow, Key Modules, Shadow Level — Architecture, Tech Stack

### Community 82 - "2026-08-09 — Major Migration"
Cohesion: 0.33
Nodes (5): 2026-08-09 — Major Migration, Added, Changed, Removed, Shadow Level — Changelog

### Community 83 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, deploy, dev, predeploy, preview, test, test:ui (+1 more)

### Community 84 - "15. Code Quality Assessment"
Cohesion: 0.40
Nodes (5): 15. Code Quality Assessment, Accessibility, Code Organization, Error Handling, TypeScript Usage

### Community 85 - "2. Technology Stack"
Cohesion: 0.40
Nodes (5): 2. Technology Stack, Core Framework, Development Tools, Routing and State, UI Libraries

### Community 86 - "7. Authentication and Session Management"
Cohesion: 0.40
Nodes (5): 7. Authentication and Session Management, Login Flow, Session Persistence, Sign Out, Signup Flow

### Community 87 - "package.json"
Cohesion: 0.40
Nodes (4): description, name, private, version

### Community 88 - "11. Styling System"
Cohesion: 0.50
Nodes (4): 11. Styling System, Custom Utilities, Responsive Design, Tailwind CSS 4 Configuration

### Community 89 - "14. Performance Analysis"
Cohesion: 0.50
Nodes (4): 14. Performance Analysis, Areas for Improvement:, Bundle Size, Optimizations Implemented:

### Community 90 - "17. Technical Debt"
Cohesion: 0.50
Nodes (4): 17. Technical Debt, High Priority, Low Priority, Medium Priority

### Community 91 - "18. Recommendations"
Cohesion: 0.50
Nodes (4): 18. Recommendations, Immediate Actions, Long-term, Short-term

### Community 92 - "1. Project Overview"
Cohesion: 0.50
Nodes (4): 1. Project Overview, Purpose, Target Audience, Unique Selling Points

### Community 93 - "3. Architecture and Design Patterns"
Cohesion: 0.50
Nodes (4): 3. Architecture and Design Patterns, Architectural Decision: localStorage-First, Component Architecture, State Management Strategy

### Community 94 - "badge.tsx"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

### Community 96 - "10. Component Library"
Cohesion: 0.67
Nodes (3): 10. Component Library, Custom Components, shadcn/ui Components (50+)

### Community 97 - "6. Data Layer"
Cohesion: 0.67
Nodes (3): 6. Data Layer, CRUD Operations (local-db.ts), localStorage Keys

### Community 98 - "card.tsx"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 99 - "9. Routing Structure"
Cohesion: 0.67
Nodes (3): 9. Routing Structure, File-Based Routing, Route Protection

### Community 105 - "HabitCard.tsx"
Cohesion: 0.40
Nodes (4): Habit, HabitCard(), HabitCardProps, Checkbox

### Community 107 - "tabs.tsx"
Cohesion: 0.50
Nodes (3): TabsContent, TabsList, TabsTrigger

### Community 114 - "13. Security Considerations"
Cohesion: 0.67
Nodes (3): 13. Security Considerations, Current Implementation, Recommendations for Production:

## Knowledge Gaps
- **333 isolated node(s):** `$schema`, `ANTHROPIC_BASE_URL`, `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_MODEL`, `ANTHROPIC_DEFAULT_HAIKU_MODEL` (+328 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **65 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `queries.ts`, `carousel.tsx`, `sidebar.tsx`, `command.tsx`, `menubar.tsx`, `form.tsx`, `me.tsx`, `chart.tsx`, `utils.ts`, `navigation-menu.tsx`, `toggle-group.tsx`, `alert.tsx`, `dropdown-menu.tsx`, `sheet.tsx`, `select.tsx`, `badge.tsx`, `card.tsx`, `HabitCard.tsx`, `tabs.tsx`?**
  _High betweenness centrality (0.175) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `class-variance-authority`, `clsx`, `cmdk`, `date-fns`, `embla-carousel-react`, `framer-motion`, `input-otp`, `lenis`, `lucide-react`, `@radix-ui/react-alert-dialog`, `@radix-ui/react-aspect-ratio`, `@radix-ui/react-avatar`, `@radix-ui/react-checkbox`, `@radix-ui/react-collapsible`, `@radix-ui/react-context-menu`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-hover-card`, `@radix-ui/react-label`, `@radix-ui/react-menubar`, `@radix-ui/react-popover`, `@radix-ui/react-progress`, `@radix-ui/react-radio-group`, `canvas-confetti`, `@radix-ui/react-select`, `@radix-ui/react-separator`, `@radix-ui/react-switch`, `@radix-ui/react-tabs`, `@radix-ui/react-toggle`, `@radix-ui/react-toggle-group`, `@radix-ui/react-tooltip`, `react-dom`, `react-hook-form`, `react-resizable-panels`, `recharts`, `sonner`, `tailwind-merge`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tanstack/react-router`, `@tanstack/router-plugin`, `tw-animate-css`, `vaul`, `vite-tsconfig-paths`, `zod`, `zustand`, `package.json`, `@radix-ui/react-scroll-area`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `eslint`, `eslint-config-prettier`, `eslint-plugin-prettier`, `eslint-plugin-react-refresh`, `prettier`, `@types/canvas-confetti`, `@types/react`, `@types/react-dom`, `typescript`, `vite`, `@vitejs/plugin-react`, `@eslint/js`, `@types/node`, `package.json`, `@vitest/ui`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `$schema`, `ANTHROPIC_BASE_URL`, `ANTHROPIC_AUTH_TOKEN` to the rest of the system?**
  _333 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `queries.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07863113897596656 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.08416389811738649 - nodes in this community are weakly interconnected._
- **Should `routeTree.gen.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05612244897959184 - nodes in this community are weakly interconnected._