---
name: ui-ux-animation-toolkit
description: >
  A curated reference for AI coding agents and tools covering UI/UX component libraries,
  animation systems, smooth scroll, design quality enforcement, browser automation,
  and multi-provider AI integration. Use this whenever building frontend interfaces,
  landing pages, portfolios, or any visually rich web experience.
  Covers React, TypeScript, Tailwind, Vue, and vanilla JS ecosystems.
version: 2.0.0
last-updated: 2026-08-08
compatible-with: [Cursor, Windsurf, GitHub Copilot, Cline, Aider, Continue, any MCP-compatible agent]
tags: [ui, ux, animation, scroll, components, design, taste, playwright, agentic, frontend]
---

# UI/UX, Animation & Design — Agent Skill Reference

## When to activate this skill

Activate this document whenever you are:
- Building or refining a **frontend UI** — landing page, app shell, portfolio, dashboard
- Adding **animations, transitions, or scroll behavior** to a web project
- Enforcing **design quality** to avoid generic, template-looking output
- Running **browser automation or visual testing** as part of a dev workflow
- Choosing between **component libraries** for a React, Vue, or TypeScript project
- Integrating **AI features** into a web app without vendor lock-in

---

## Agent Instructions (Universal)

When generating frontend UI, follow these rules by default:

1. **Never default to generic palettes.** Avoid reflexive blue/gray/white. Pick a palette justified by the brief.
2. **Typography is personality.** Pair display and body faces deliberately — not whatever comes first.
3. **Motion must earn its place.** Every animation should serve a purpose: feedback, hierarchy, or delight. Not decoration.
4. **Spacing is information.** Whitespace communicates structure. Don't compress or pad without intent.
5. **Critique before finalizing.** Before outputting any UI, do a self-review: does this look AI-generated? If yes, revise one thing.
6. **Semantic HTML first.** Structure should make sense without CSS. Accessibility is not optional.
7. **Respect `prefers-reduced-motion`.** Wrap animations in the appropriate media query check.

---

## 1. Component Libraries

### animate-ui — `imskyleen/animate-ui`
**Stack:** React · TypeScript · Tailwind CSS · Motion · Shadcn CLI
**Repo:** https://github.com/imskyleen/animate-ui

**What it is:**
A fully animated, open-source component distribution built for React. Components install individually via the Shadcn CLI — no full library import required.

**When to use:**
- Need pre-built animated React components (buttons, cards, modals, tabs, inputs) beyond static Shadcn defaults
- Want motion-first components without writing animation logic from scratch
- Working in a React + Tailwind + Shadcn stack

**Installation:**
```bash
npx shadcn@latest add https://animate-ui.com/r/[component-name]
```

**Key capabilities:**
- Animated buttons, badges, tabs, accordions, tooltips, popovers
- Scroll-triggered reveal components
- Hover micro-interaction primitives
- Fully TypeScript-typed and tree-shakeable

**Design guidance:**
- Motion is tasteful by default — not overwhelming
- Respects `prefers-reduced-motion`
- Composable: pull individual components, don't import the whole system

---

### VengeanceUI — `Ashutoshx7/VengeanceUI`
**Stack:** React · TypeScript · Tailwind CSS
**Repo:** https://github.com/Ashutoshx7/VengeanceUI

**What it is:**
A copy-paste animated landing page component library. No CLI — copy TSX directly into your project.

**When to use:**
- Rapidly shipping a landing page or marketing site
- Need hero sections, feature grids, CTAs, testimonials with built-in animations
- Want visual polish with zero setup overhead

**How to use:**
- Browse the component gallery at the project site
- Copy the TSX + Tailwind classes directly into your codebase
- Adjust colors and spacing to match your design system

**Key capabilities:**
- Animated hero sections
- Feature card grids with hover states
- Gradient text and border effects
- Ambient background animations

**Design guidance:**
- Components lean dramatic — dial down opacity/blur for professional SaaS contexts
- Best for portfolios, product launches, waitlist pages

---

### Inspira UI — `unovue/inspira-ui`
**Stack:** Vue 3 · Nuxt · TypeScript
**Repo:** https://github.com/unovue/inspira-ui

**What it is:**
Animated component library for the Vue/Nuxt ecosystem. The component gallery is also a strong visual design reference even if your stack is React.

**When to use:**
- Project is built on Vue 3 or Nuxt
- Evaluating design patterns — browse the gallery for inspiration regardless of stack

**Note:** For React projects, treat this as a visual reference. Port patterns manually or find animate-ui equivalents.

---

## 2. Smooth Scroll

### Lenis — `darkroomengineering/lenis`
**Stack:** Vanilla JS · Framework-agnostic
**Repo:** https://github.com/darkroomengineering/lenis

**What it is:**
The standard smooth scroll library. Replaces native scroll with a physics-based, inertia-driven scroll engine. Works with React, Next.js, Vue, Svelte, or plain HTML.

**When to use:**
- Any project where scroll UX matters — portfolios, landing pages, narrative sites
- Pairing with scroll-triggered animations (GSAP ScrollTrigger, Motion, etc.)
- Replacing `scroll-behavior: smooth` with something physically accurate

**Installation:**
```bash
npm install lenis
```

**Basic setup (framework-agnostic):**
```javascript
import Lenis from 'lenis'

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
```

**React / Next.js setup:**
```typescript
import Lenis from 'lenis'
import { useEffect } from 'react'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2 })
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])
  return <>{children}</>
}
```

**Key capabilities:**
- Smooth, inertia-based scroll across all platforms
- Does not break native scroll events or accessibility
- `lenis.scrollTo(target)` for programmatic smooth navigation
- GSAP ScrollTrigger: `lenis.on('scroll', ScrollTrigger.update)`

**Performance notes:**
- Runs on `requestAnimationFrame` — zero layout thrash
- Touch multiplier adjustable: `lenis.options.touchMultiplier = 0` to disable on touch

---

## 3. Design Taste & Quality Enforcement

> These are agent instruction files / skill documents. Add them to your project's
> `AGENTS.md`, `CLAUDE.md`, `CURSOR_RULES`, `.windsurfrules`, or equivalent agent
> config file for your tool. All are tool-agnostic in principle.

---

### taste-skill — `Leonxlnx/taste-skill`
**Repo:** https://github.com/Leonxlnx/taste-skill

**What it is:**
An agent instruction set that prevents AI coding tools from generating flat, generic, template-looking UI. Injects design taste at the prompt/instruction level.

**When to use:**
- Before any agent session generating frontend UI
- When agent output consistently looks templated or corporate
- As a project-wide rule in your agent config file

**How to integrate:**
- Copy the skill content into your project's agent config (`AGENTS.md`, `.cursorrules`, `.windsurfrules`, etc.)
- Or paste it as a system instruction at the start of your session

**What it enforces:**
- Opinionated, justified color palette choices
- Typography pairings with intentional personality
- Non-default layout decisions
- Motion used deliberately — not decoratively
- Self-critique pass before final output

---

### impeccable — `pbakaus/impeccable`
**Repo:** https://github.com/pbakaus/impeccable

**What it is:**
A design language specification for AI agents. More systematic than taste-skill — defines rules for spacing, color theory, visual hierarchy, and contrast.

**When to use:**
- Generating full-page designs or complex UI components with an agent
- Pair with taste-skill for layered design quality enforcement
- Projects where visual output is user-facing and needs to meet a professional bar

**How to integrate:**
- Include the specification in your agent's system prompt or project config file
- Reference specific rules when asking the agent to critique its own output

**Key principles it enforces:**
- Intentional whitespace — breathing room as a design decision
- Contrast ratios that work visually, not just WCAG-technically
- Hierarchy through size, weight, spacing — not icons or decorations
- Color restraint: fewer colors used with more confidence

---

### huashu-design — `alchaincyf/huashu-design`
**Repo:** https://github.com/alchaincyf/huashu-design

**What it is:**
An HTML-native design skill for AI agents. Contains 20 design philosophy rules, a 5-dimension design review system, high-fidelity prototype generation patterns, and MP4 export support.

**When to use:**
- Building HTML-first prototypes (not component-framework-based)
- Need a structured design review system baked into the agent workflow
- Generating slide decks or animated presentations through code

**How to integrate:**
- Works with any agent tool: paste into system prompt or project config
- Reference the 5-dimension review (Layout · Typography · Color · Motion · Content) as a checklist before finalizing any generated UI

**Key capabilities:**
- 20 embedded design philosophy rules
- 5-dimension self-review framework for agents
- MP4 export from HTML animations
- Agent-agnostic implementation

---

### ui-ux-pro-max-skill — `nextlevelbuilder/ui-ux-pro-max-skill`
**Repo:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

**What it is:**
The most exhaustive design intelligence skill in this set. Covers multi-platform design (web, mobile, desktop) with platform-specific conventions baked in.

**When to use:**
- Building across multiple platforms in one session (web + mobile)
- Need platform-specific guidance: iOS HIG, Material Design, Web conventions
- Professional-grade output that must match platform design standards

**How to integrate:**
- Add to agent config or system prompt
- Reference platform-specific sections based on target platform

---

### andrej-karpathy-skills — `multica-ai/andrej-karpathy-skills`
**Repo:** https://github.com/multica-ai/andrej-karpathy-skills

**What it is:**
A single agent config file derived from Andrej Karpathy's documented observations on LLM coding pitfalls. Not design-specific — enforces general code quality and reasoning hygiene.

**When to use:**
- As the base agent config for any new project, before layering design skills
- When agent-generated code has correctness or reasoning issues, not just visual issues

**Key behaviors it enforces:**
- No premature abstraction
- Readable code over clever code
- No silent failures
- Edge cases tested before declaring complete
- Honest uncertainty — agents should flag unknowns, not hallucinate confidence

---

### agentic-awesome-skills — `sickn33/agentic-awesome-skills`
**Repo:** https://github.com/sickn33/agentic-awesome-skills

**What it is:**
A local, agent-first catalog of 1,987+ agentic skills. Includes CLI and local MCP server for skill discovery, stack validation, and agent planning.

**When to use:**
- Need a skill not covered in this document — search the catalog first
- Building complex multi-step agent workflows that need orchestration
- Validating your stack before starting a project

**Usage:**
```bash
# Search for skills
npx aas search "animation react"
npx aas search "scroll typescript"

# Install a skill
npx aas install [skill-name]

# Start local MCP server
npx aas mcp
```

---

## 4. Browser Automation & Visual Testing

### playwright-mcp — `microsoft/playwright-mcp`
**Stack:** TypeScript · Node.js · MCP (Model Context Protocol)
**Repo:** https://github.com/microsoft/playwright-mcp

**What it is:**
A Playwright MCP server that lets any MCP-compatible agent control a real browser — navigate, click, screenshot, fill forms, run assertions.

**When to use:**
- Visually verifying UI after an agent generates it
- Running end-to-end tests as part of an agentic dev workflow
- Scraping or web research requiring real browser execution
- Confirming that animations and transitions render correctly

**Setup:**
```bash
npx @playwright/mcp@latest
```

**MCP config (tool-agnostic JSON format):**
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```
> Add this to your tool's MCP config file. Supported by any MCP-compatible agent.

**Key capabilities:**
- Browser navigation and interaction via natural language instructions
- Screenshot capture for visual verification
- Form filling, clicking, hovering, scroll simulation
- Network request interception and monitoring

**Recommended design workflow:**
```
Generate UI → Run Playwright MCP screenshot → Review output → Iterate
```

---

### agentation — `benjitaylor/agentation`
**Stack:** TypeScript
**Repo:** https://github.com/benjitaylor/agentation

**What it is:**
A visual feedback tool for AI agents running browser tasks. Makes agentic browser sessions observable — you can see what the agent sees in real time.

**When to use:**
- Debugging a Playwright or browser-agent workflow
- Building demos where agent browser interaction needs to be recorded or displayed
- Verifying agent actions are hitting the correct UI elements

---

## 5. 3D & Three.js Portfolio References

| Repo | Stack | Best For |
|---|---|---|
| `akashrmalhotra/3d-portfolio` | TypeScript + Three.js | Quick fork & customize |
| `adrianhajdin/3D_portfolio` | React + Three.js (R3F) | Tutorial-driven build with guidance |
| `adrianhajdin/project_3D_developer_portfolio` | Three.js (vanilla) | In-depth ThreeJS reference |

**When to use:**
- Building a personal portfolio with 3D visual elements
- Learning React Three Fiber / Three.js animation patterns
- Implementing scroll-driven 3D animations

**Core libraries used across all three:**
```bash
npm install three @react-three/fiber @react-three/drei
```

**Pairing note:** Combine any of these with Lenis for scroll + 3D integration:
```javascript
// Sync Lenis scroll position with Three.js camera or scene
lenis.on('scroll', ({ scroll }) => {
  camera.position.z = scroll * 0.01
})
```

---

## 6. Reference & Checklists

### Front-End Checklist — `thedaviddias/Front-End-Checklist`
**Repo:** https://github.com/thedaviddias/Front-End-Checklist

**What it is:**
The essential pre-launch checklist for modern web development. Covers performance, SEO, accessibility, security, and correctness.

**Run before every production deployment:**

**HTML**
- [ ] Semantic structure used throughout (not divs all the way down)
- [ ] `lang` attribute on `<html>`
- [ ] `viewport` meta tag present
- [ ] Meaningful `<title>` and `<meta description>` on every page

**CSS**
- [ ] No unused styles shipped to production
- [ ] All responsive breakpoints tested (320px → 1440px)
- [ ] No layout shift on load (check CLS in Lighthouse)

**Fonts**
- [ ] Critical fonts preloaded (`<link rel="preload">`)
- [ ] Fallback font stack defined
- [ ] No Flash of Invisible Text (FOIT)

**Images & Media**
- [ ] Next-gen formats used (WebP or AVIF)
- [ ] Lazy loading on below-fold images (`loading="lazy"`)
- [ ] All `<img>` have descriptive `alt` attributes

**JavaScript**
- [ ] No console errors in production
- [ ] Bundle size within acceptable limits (check with Bundlephobia)
- [ ] No secrets or API keys in client-side code

**Performance**
- [ ] Lighthouse score ≥ 90 on mobile
- [ ] LCP < 2.5s, FID < 100ms, CLS < 0.1

**Accessibility**
- [ ] Full keyboard navigation functional
- [ ] ARIA labels on interactive elements without visible text
- [ ] Color contrast ratio ≥ 4.5:1 for body text

**SEO**
- [ ] Open Graph tags (`og:title`, `og:image`, `og:description`)
- [ ] Canonical URLs set
- [ ] Sitemap and robots.txt present

**Security**
- [ ] HTTPS enforced
- [ ] Content Security Policy headers configured
- [ ] No sensitive data in client bundle or localStorage

---

### public-apis — `public-apis/public-apis`
**Repo:** https://github.com/public-apis/public-apis

**What it is:**
A collectively maintained directory of 400+ free public APIs. Essential reference for sourcing real data in prototypes, demos, or production features.

**Useful categories for UI/UX development:**

| Category | Use case |
|---|---|
| Photography | Image-heavy UIs — Unsplash, Pexels APIs |
| Open Data | Dashboards and data visualization |
| Finance | Financial app prototypes |
| Weather | Location-aware UI features |
| Machine Learning | AI-integrated features |
| Games & Comics | Fun or creative portfolio projects |

---

## Stack Combinations — Quick Reference

### Landing Page
```
Design quality:   taste-skill + impeccable
Components:       animate-ui + VengeanceUI (hero/CTA)
Scroll:           lenis
Verification:     playwright-mcp (screenshot)
Pre-launch:       front-end-checklist
```

### Portfolio (with 3D)
```
Base:             3d-portfolio or adrianhajdin template
Scroll:           lenis (+ GSAP ScrollTrigger)
Interactions:     animate-ui
Design review:    impeccable
Verification:     playwright-mcp
```

### AI-Powered Web App
```
Backend:          Supabase or Appwrite
UI components:    animate-ui
Testing:          playwright-mcp
Agent debugging:  agentation
```

### Any Agentic Dev Session
```
Base config:      andrej-karpathy-skills (code quality baseline)
Design taste:     taste-skill
Design review:    impeccable or huashu-design
Visual testing:   playwright-mcp
Skill discovery:  agentic-awesome-skills
```

---

## Quick Reference Index

| Repo | Category | Stack | Primary Use |
|---|---|---|---|
| `imskyleen/animate-ui` | Components | React / TS / Tailwind | Animated React components |
| `Ashutoshx7/VengeanceUI` | Components | React / TS / Tailwind | Landing page sections |
| `unovue/inspira-ui` | Components | Vue / Nuxt | Vue animated components |
| `darkroomengineering/lenis` | Scroll | Vanilla JS / Any | Physics-based smooth scroll |
| `Leonxlnx/taste-skill` | Agent Skill | Any tool | Design taste enforcement |
| `pbakaus/impeccable` | Agent Skill | Any tool | Design quality system |
| `alchaincyf/huashu-design` | Agent Skill | Any tool | HTML design + 5D review |
| `nextlevelbuilder/ui-ux-pro-max-skill` | Agent Skill | Any tool | Multi-platform design |
| `multica-ai/andrej-karpathy-skills` | Agent Skill | Any tool | Code quality baseline |
| `sickn33/agentic-awesome-skills` | Skill Catalog | MCP / CLI | Skill discovery |
| `microsoft/playwright-mcp` | Automation | TS / MCP | Browser agent & testing |
| `benjitaylor/agentation` | Automation | TypeScript | Agent visual feedback |
| `akashrmalhotra/3d-portfolio` | Portfolio | TypeScript | 3D portfolio base |
| `adrianhajdin/3D_portfolio` | Portfolio | React / Three.js | R3F portfolio tutorial |
| `adrianhajdin/project_3D_developer_portfolio` | Portfolio | Three.js | ThreeJS reference |
| `thedaviddias/Front-End-Checklist` | Reference | MDX | Pre-launch checklist |
| `public-apis/public-apis` | Reference | N/A | Free API directory |
