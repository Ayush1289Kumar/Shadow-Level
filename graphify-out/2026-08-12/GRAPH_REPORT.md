# Graph Report - .  (2026-08-12)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 599 nodes · 1105 edges · 75 communities (28 shown, 47 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f4fa41d3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- local-db.ts
- cn
- devDependencies
- routeTree.gen.ts
- utils.ts
- sidebar.tsx
- compilerOptions
- components.json
- command.tsx
- menubar.tsx
- me.tsx
- form.tsx
- carousel.tsx
- dependencies
- env
- chart.tsx
- sheet.tsx
- table.tsx
- drawer.tsx
- navigation-menu.tsx
- card.tsx
- toggle-group.tsx
- alert.tsx
- input-otp.tsx
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 220 edges
2. `useAppStore` - 19 edges
3. `compilerOptions` - 17 edges
4. `read()` - 16 edges
5. `Button` - 11 edges
6. `write()` - 11 edges
7. `FileRoutesByPath` - 10 edges
8. `env` - 9 edges
9. `RequireAuth()` - 9 edges
10. `buttonVariants` - 9 edges

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

## Communities (75 total, 47 thin omitted)

### Community 0 - "local-db.ts"
Cohesion: 0.08
Nodes (58): AppNav(), items, RequireAuth(), Checkbox, Input, SelectContent, SelectItem, SelectLabel (+50 more)

### Community 1 - "cn"
Cohesion: 0.08
Nodes (38): AccordionContent, AccordionItem, AccordionTrigger, Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList (+30 more)

### Community 2 - "devDependencies"
Cohesion: 0.05
Nodes (43): eslint, eslint-config-prettier, @eslint/js, eslint-plugin-prettier, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, description (+35 more)

### Community 3 - "routeTree.gen.ts"
Cohesion: 0.07
Nodes (33): SmoothScrollProvider(), Toaster(), ToasterProps, queryClient, router, getRouter(), Register, @tanstack/react-router (+25 more)

### Community 4 - "utils.ts"
Cohesion: 0.07
Nodes (29): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+21 more)

### Community 5 - "sidebar.tsx"
Cohesion: 0.07
Nodes (31): Separator, Sidebar, SidebarContent, SidebarContext, SidebarContextProps, SidebarFooter, SidebarGroup, SidebarGroupAction (+23 more)

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

### Community 10 - "me.tsx"
Cohesion: 0.25
Nodes (10): ExpBar(), Avatar, AvatarFallback, AvatarImage, computeLevel(), expForLevel(), expForNextLevel(), levelProgress() (+2 more)

### Community 11 - "form.tsx"
Cohesion: 0.19
Nodes (12): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+4 more)

### Community 12 - "carousel.tsx"
Cohesion: 0.19
Nodes (13): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+5 more)

### Community 13 - "dependencies"
Cohesion: 0.15
Nodes (13): @hookform/resolvers, dependencies, @hookform/resolvers, @radix-ui/react-accordion, @radix-ui/react-navigation-menu, @radix-ui/react-scroll-area, @radix-ui/react-slider, react (+5 more)

### Community 14 - "env"
Cohesion: 0.18
Nodes (10): env, ANTHROPIC_AUTH_TOKEN, ANTHROPIC_BASE_URL, ANTHROPIC_DEFAULT_HAIKU_MODEL, ANTHROPIC_DEFAULT_OPUS_MODEL, ANTHROPIC_DEFAULT_SONNET_MODEL, ANTHROPIC_MODEL, CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS (+2 more)

### Community 15 - "chart.tsx"
Cohesion: 0.25
Nodes (9): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, getPayloadConfigFromPayload(), THEMES (+1 more)

### Community 16 - "sheet.tsx"
Cohesion: 0.25
Nodes (8): SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay, SheetTitle, sheetVariants

### Community 17 - "table.tsx"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 18 - "drawer.tsx"
Cohesion: 0.25
Nodes (6): DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 19 - "navigation-menu.tsx"
Cohesion: 0.29
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 20 - "card.tsx"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 21 - "toggle-group.tsx"
Cohesion: 0.43
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 22 - "alert.tsx"
Cohesion: 0.50
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 23 - "input-otp.tsx"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

## Knowledge Gaps
- **174 isolated node(s):** `$schema`, `ANTHROPIC_BASE_URL`, `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_MODEL`, `ANTHROPIC_DEFAULT_HAIKU_MODEL` (+169 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **47 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `local-db.ts`, `utils.ts`, `sidebar.tsx`, `command.tsx`, `menubar.tsx`, `me.tsx`, `form.tsx`, `carousel.tsx`, `chart.tsx`, `sheet.tsx`, `table.tsx`, `drawer.tsx`, `navigation-menu.tsx`, `card.tsx`, `toggle-group.tsx`, `alert.tsx`, `input-otp.tsx`?**
  _High betweenness centrality (0.308) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`, `class-variance-authority`, `clsx`, `cmdk`, `date-fns`, `embla-carousel-react`, `framer-motion`, `input-otp`, `lenis`, `lucide-react`, `@radix-ui/react-alert-dialog`, `@radix-ui/react-aspect-ratio`, `@radix-ui/react-avatar`, `@radix-ui/react-checkbox`, `@radix-ui/react-collapsible`, `@radix-ui/react-context-menu`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-hover-card`, `@radix-ui/react-label`, `@radix-ui/react-menubar`, `@radix-ui/react-popover`, `@radix-ui/react-progress`, `@radix-ui/react-radio-group`, `canvas-confetti`, `@radix-ui/react-select`, `@radix-ui/react-separator`, `@radix-ui/react-slot`, `@radix-ui/react-switch`, `@radix-ui/react-tabs`, `@radix-ui/react-toggle`, `@radix-ui/react-toggle-group`, `@radix-ui/react-tooltip`, `react-dom`, `react-hook-form`, `react-resizable-panels`, `recharts`, `sonner`, `tailwind-merge`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tanstack/react-router`, `@tanstack/router-plugin`, `tw-animate-css`, `vaul`, `vite-tsconfig-paths`, `zod`, `zustand`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **What connects `$schema`, `ANTHROPIC_BASE_URL`, `ANTHROPIC_AUTH_TOKEN` to the rest of the system?**
  _174 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `local-db.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0758714969241285 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.0782608695652174 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `routeTree.gen.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06923076923076923 - nodes in this community are weakly interconnected._