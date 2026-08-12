# Shadow Level Design System

> **Version:** 3.0  
> **Last Updated:** 2026-08-12  
> **Product:** Shadow Level — A gamified habit tracker inspired by RPG progression systems  
> **Theme Lock:** Dark mode only. No section flips to light mode mid-page.  
> **Design Variance:** 7/10 (asymmetric, cinematic, but not chaotic)  
> **Motion Intensity:** 6/10 (meaningful micro-interactions + scroll reveals + level-up celebration)  
> **Visual Density:** 4/10 (spacious, hierarchy-driven, calm until intensity is earned)

---

## 0. Design Philosophy

**Shadow Level** turns the discipline of habit building into an engaging personal progression interface. The design is intended to feel **premium, dark, and system-like** — like a HUD from a AAA RPG that you actually live inside.

### Core Principle: 95% Visual Calm + 5% Visual Intensity
The interface focuses on hierarchy and readability. Intensity appears **only** when the user accomplishes something meaningful (level-up, streak milestone, quest completion). The calm moments make the intense ones land harder.

### The "Expensive" Difference
What separates a 7/10 dark UI from a 10/10:
- **Restraint over decoration.** Every glow, every animation, every border must earn its place.
- **Atmospheric depth, not flat darkness.** The background breathes. Surfaces have subtle elevation through tint, not shadow.
- **Typography as architecture.** Cinzel is not just a font choice — it is the structural spine of the brand. Montserrat is the invisible servant that makes everything readable.
- **Silence is a design element.** The space between elements is as intentional as the elements themselves.
- **One moment of awe per session.** Not ten. One. When the user levels up, the entire interface pauses to celebrate. Then it returns to calm.

### Key Pillars
- **Dark & Atmospheric**: Predominantly deep blacks, very dark indigos, and subtle glowing highlights. Never pure `#000000` — always tint with indigo.
- **Glassmorphism (Disciplined)**: Selective use of blurred, translucent backgrounds for layered depth. **Never** nest glass inside glass. One layer per viewport.
- **Strict Hierarchy**: Priority is placed on Level, XP, Daily Progress, and Streaks. Everything else recedes.
- **Meaningful Animation**: Animations communicate state changes and achievements. Hover = micro-interaction. Level-up = cinematic celebration.
- **RPG Elements**: Terminology (Quest, XP, Rank) and visual rewards (subtle glows, progress bars) — not cartoonish game clones.
- **No AI Slop Tells**: No Inter as default font, no purple-to-blue gradients as decoration, no generic card nesting, no bounce easing, no decorative status dots, no em-dashes anywhere.

---

## 1. Typography

The project relies on **two** Google Fonts with strict, non-overlapping responsibilities.

### Font Stack

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| **Display & Branding** | `Cinzel` | 400, 600, 700 | Shadow Level branding, major level numbers, ranks, major achievement titles, cinematic headers. **Never** for general UI text. |
| **Body & UI** | `Montserrat` | 400, 500, 600, 700 | Navigation, buttons, labels, habit names, stats, metadata, body copy. Clean, modern, highly legible against dark backgrounds. |

### Typography Scale

| Token | Font | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|------|--------|-------------|----------------|-------|
| `text-hero` | Cinzel | `clamp(3rem, 8vw, 7rem)` | 700 | 1.0 | `0.02em` | Hero level numbers, cinematic headers |
| `text-display` | Cinzel | `clamp(2rem, 5vw, 4rem)` | 600 | 1.1 | `0.01em` | Section titles, rank titles |
| `text-headline` | Montserrat | `clamp(1.25rem, 2.5vw, 1.75rem)` | 600 | 1.2 | `0` | Card titles, habit names |
| `text-body` | Montserrat | `1rem` (16px) | 400 | 1.6 | `0` | Body copy, descriptions |
| `text-caption` | Montserrat | `0.875rem` (14px) | 500 | 1.4 | `0.01em` | Metadata, timestamps, labels |
| `text-micro` | Montserrat | `0.75rem` (12px) | 600 | 1.3 | `0.08em` | Eyebrow tags, badges, uppercase labels |

### Typography Rules
- **No em-dashes (`—`) anywhere** on the page. Use a period, comma, or line break instead. This is non-negotiable.
- **No en-dashes (`–`) as separators.** Use a regular hyphen (`-`) for ranges and compound words.
- **Italic usage:** Only for emphasis in body copy. Never for display text. Ensure descender clearance (`leading-[1.1]` min + `pb-1` reserve) for italic words containing `y, g, j, p, q`.
- **Uppercase tracking:** Eyebrow tags use `uppercase tracking-[0.2em]` at `text-micro` size. Maximum one eyebrow per section.
- **Hero discipline:** Headline ≤ 2 lines. Subtext ≤ 20 words AND ≤ 4 lines. CTA visible without scroll. Max 4 text elements in hero.
- **Cinzel is sacred.** It appears only where the brand needs to speak. Never use Cinzel for body text, labels, or UI chrome. Its rarity is its power.

---

## 2. Color System

### The Philosophy of Darkness
A 10/10 dark UI does not use "dark gray." It uses **atmospheric black** — a black that has been carefully tinted so it feels like depth, not absence. Every color in this system has been extracted and refined from the Shadow Level logo's DNA: the deep void behind the shadow figure, the electric purple of the eyes and flames, and the silver-white of the letterforms.

### Logo Color DNA

The Shadow Level logo contains three essential color families:

| Element | Color Family | Hex Reference | Role in UI |
|---------|-------------|---------------|------------|
| **Shadow Figure / Background** | Deep indigo-black | `#08080D` | The void — deepest background |
| **Purple Flames / Eyes** | Electric violet | `#7C3AED` | Primary brand — actions, glows |
| **"SHADOW" Letterforms** | Silver-white | `#F2F0FF` | Primary text — moonlight on obsidian |
| **"LEVEL" Letterforms** | Pale lavender | `#C4B5FD` | Secondary text — softer highlights |
| **Sword Icon** | Bright violet | `#8B5CF6` | Accent — rank badges, secondary glows |

### Semantic Palette

All colors are defined as CSS custom properties in `src/styles.css` using Tailwind v4's theme integration. **Every color is tinted** — never pure black, never pure gray, never pure white.

#### Backgrounds — The Void

| Role | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| **Void** | `#08080D` | `--void` | Deepest atmospheric black with indigo tint. The canvas. The atmosphere. The logo's background. |
| **Abyss** | `#0D0D14` | `--abyss` | Primary page background. One step up from the void. |
| **Depth** | `#12121C` | `--depth` | Card surfaces, panels, data containers. |
| **Shade** | `#1A1A28` | `--shade` | Elevated surfaces, hover states, active panels. |
| **Mist** | `#242436` | `--mist` | Borders, dividers, subtle separators. Rarely used directly. |

#### Text — Moonlight on Obsidian

| Role | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| **Moonlight** | `#F2F0FF` | `--moonlight` | Primary headings, high-priority text. Not pure white — tinted with the faintest purple to harmonize with the brand. |
| **Silver** | `#A8A4C0` | `--silver` | Body copy, descriptions, metadata. Recedes gracefully. |
| **Ash** | `#6B6680` | `--ash` | Disabled states, placeholders, timestamps. Nearly invisible but readable. |
| **Shadow** | `#3D3A4D` | `--shadow-text` | Placeholder text, inactive borders, ghost elements. |

#### Brand — The Logo's Soul

| Role | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| **Monarch Purple** | `#7C3AED` | `--monarch` | Primary brand color. The logo's flame color. Used for primary actions, level numbers, XP bars, and the hero glow. **Used sparingly — never more than 10% of any viewport.** |
| **Electric Violet** | `#8B5CF6` | `--violet` | Secondary brand color. The logo's sword/accent color. Used for rank badges, secondary highlights, and subtle UI accents. |
| **Deep Amethyst** | `#5B21B6` | `--amethyst` | Dark variant of Monarch Purple. Used for pressed states, shadow tints, and depth. Creates the "shadow" in Shadow Level. |
| **Pale Lavender** | `#C4B5FD` | `--lavender` | Light variant of the brand. Used for hover states on primary elements, disabled primary buttons, and subtle highlights. |

#### Functional — RPG System

| Role | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| **Blood Ember** | `#DC2626` | `--ember` | Danger, failure, streak breaks, negative changes. The color of lost progress. |
| **Ember Glow** | `#991B1B` | `--ember-dark` | Dark variant for danger backgrounds, error states, and danger borders. |
| **Soul Emerald** | `#10B981` | `--soul` | Success, quest completion, positive changes. The color of earned progress. |
| **Deep Emerald** | `#065F46` | `--soul-dark` | Dark variant for success backgrounds and completed state borders. |
| **Amber Eye** | `#F59E0B` | `--amber` | Warnings, streak alerts, medium-priority notifications. |
| **Deep Amber** | `#92400E` | `--amber-dark` | Dark variant for warning backgrounds and alert borders. |

#### Glow — Atmospheric Only

| Role | Value | CSS Variable | Usage |
|------|-------|--------------|-------|
| **Monarch Haze** | `rgba(124, 58, 237, 0.15)` | `--glow-monarch` | Primary ambient glow. Subtle radial gradients in the background. |
| **Violet Aura** | `rgba(139, 92, 246, 0.10)` | `--glow-violet` | Secondary ambient glow. Even more subdued. |
| **Ember Aura** | `rgba(220, 38, 38, 0.08)` | `--glow-ember` | Danger ambient glow. Barely perceptible. |
| **Soul Aura** | `rgba(16, 185, 129, 0.08)` | `--glow-soul` | Success ambient glow. Barely perceptible. |
| **Moonlight Halo** | `rgba(242, 240, 255, 0.04)` | `--glow-moonlight` | Subtle text glow for cinematic moments. Almost invisible. |

### Color Rules

- **One brand color system per page.** Monarch Purple is the dominant accent. Electric Violet is the secondary. No third accent color.
- **The 60-30-10 Rule:** 60% void/abyss/depth backgrounds, 30% moonlight/silver/ash text, 10% monarch purple accent. Never exceed 10% accent in any viewport.
- **Ember (danger) is strictly for negative states.** Never use `--ember` as a general brand accent or decoration.
- **Text on colored backgrounds must pass WCAG AA** (4.5:1 minimum contrast ratio).
- **No gray text on colored backgrounds.** If text sits on `--monarch`, it must be moonlight or white.
- **No pure black (`#000000`) or pure gray.** Always tint with indigo or purple undertones.
- **Glow effects are controlled.** Never more than one glowing element per viewport section at rest. Glows intensify on interaction.
- **Atmospheric gradients only.** Background gradients must be radial, extremely subtle (3-5% opacity), and slow-moving. No linear purple-to-blue decorative gradients.
- **The logo's purple is sacred.** `#7C3AED` is the exact hex from the logo's flames. Do not shift it warmer or cooler. It is the anchor of the entire palette.

## 3. Spacing & Layout System

### The Rhythm of Breath
A 10/10 interface breathes. The spacing is not mathematical — it is **musical**. Large sections are separated by silence. Related elements are close enough to feel connected. Unrelated elements are far enough to feel independent.

### Spacing Scale

Strictly relies on standard numeric scales. **No random values** like 13px, 17px, or 23px.

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | `4px` | Micro gaps, icon padding |
| `space-2` | `8px` | Tight gaps, inline spacing |
| `space-3` | `12px` | Small gaps |
| `space-4` | `16px` | Standard padding, card internal |
| `space-5` | `20px` | Medium gaps |
| `space-6` | `24px` | Section internal padding |
| `space-8` | `32px` | Card padding, section gaps |
| `space-10` | `40px` | Large section gaps |
| `space-12` | `48px` | Major section padding |
| `space-16` | `64px` | Section vertical padding |
| `space-20` | `80px` | Hero padding, major sections |
| `space-24` | `96px` | Page-level vertical rhythm |
| `space-32` | `128px` | Cinematic section breaks |

### Border Radius Scale

Slightly sharp, sophisticated edges — not generic rounded looks.

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | `4px` | Small buttons, tags, badges |
| `radius-md` | `8px` | Inputs, small cards |
| `radius-lg` | `12px` | Standard cards, panels |
| `radius-xl` | `16px` | Large cards, modals |
| `radius-2xl` | `24px` | Feature cards, hero containers |
| `radius-full` | `9999px` | Pills, avatars, circular buttons |

### Layout Rules
- **Section padding:** Minimum `py-24` (96px) between major sections. Hero sections use `py-32` (128px). Allow the design to breathe heavily.
- **Content max-width:** `max-w-7xl` (1280px) centered with `mx-auto`. Never stretch content to edge on large screens.
- **Horizontal padding:** `px-4` mobile, `px-6` tablet, `px-8` desktop, `px-12` wide.
- **No `h-screen` for full-height sections.** Always use `min-h-[100dvh]` to prevent iOS Safari viewport jumping.
- **Grid gap:** Minimum `gap-6` (24px) between grid items. Never cram elements.
- **Navigation height:** ≤ 56px at desktop. Navigation on ONE line.
- **Hero top padding:** Max `pt-24` at desktop. Hero content does not float halfway down the viewport.
- **Asymmetric balance:** The layout should feel intentional, not accidental. If one side is heavy, the other side must be intentionally light — not empty.
- **Z-axis discipline:** Elements exist on distinct elevation planes. Background → Surface → Elevated Surface → Floating → Overlay. Never ambiguous elevation.

---

## 4. Custom Utilities & Components

### Surface Utilities

| Utility | Description | Usage |
|---------|-------------|-------|
| `surface` | Solid, dark surface (`--depth`) with subtle border. | Dense data, lists, forms, settings panels. |
| `glass` | Standard blurred background (`backdrop-blur-xl`, `bg-white/[0.03]`, `border-white/[0.06]`). | Cards, floating navigation, secondary panels. **Never** nest glass inside glass. |
| `glass-strong` | Stronger glass with a linear gradient from `--monarch` to `--violet` at very low opacity (`bg-gradient-to-br from-primary/[0.08] to-accent/[0.08]`, `backdrop-blur-2xl`). | **Only** for featured content, level-up notifications, major achievements, and cinematic moments. |

### The Double-Bezel Pattern (Doppelrand)
Never place a premium card, image, or container flatly on the background. They must look like physical, machined hardware.

**Outer Shell:**
- Background: `bg-white/[0.02]` or `--depth`
- Border: `ring-1 ring-white/[0.06]`
- Padding: `p-1.5` or `p-2`
- Radius: `rounded-[2rem]` (or contextually appropriate large radius)

**Inner Core:**
- Background: `--depth` or `--depth-elevated`
- Inner highlight: `shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]`
- Radius: `rounded-[calc(2rem-0.375rem)]` — mathematically calculated smaller radius for concentric curves
- Content padding: `p-6` or `p-8`

### Glow Effects

| Utility | Description | Usage |
|---------|-------------|-------|
| `text-glow-monarch` | `text-shadow: 0 0 20px var(--glow-monarch), 0 0 40px var(--glow-monarch)` | Important progression moments, level numbers, rank titles |
| `text-glow-violet` | `text-shadow: 0 0 20px var(--glow-violet), 0 0 40px var(--glow-violet)` | Rank badges, featured achievements |
| `text-glow-soul` | `text-shadow: 0 0 16px var(--glow-soul)` | Completed habit names, success states |
| `text-glow-ember` | `text-shadow: 0 0 16px var(--glow-ember)` | Failed states, warnings — used sparingly |
| `box-glow-monarch` | `box-shadow: 0 0 24px var(--glow-monarch)` | Primary buttons on hover, active navigation |
| `box-glow-violet` | `box-shadow: 0 0 24px var(--glow-violet)` | Featured cards, achievement containers |

### Glow Discipline (Critical)
- **At rest:** Zero glow. The interface is calm.
- **On hover:** Subtle glow (opacity 0.3-0.5) on interactive elements.
- **On active/pressed:** Glow intensifies briefly, then returns to hover state.
- **On achievement:** Full glow for 2-3 seconds, then gracefully fades back to calm.
- **Never more than one glowing element per viewport section at rest.**
- **Glow is not decoration.** It is feedback. If the user didn't do something to earn it, it shouldn't glow.

### Background Effects

| Utility | Description | Usage |
|---------|-------------|-------|
| `bg-monarch-radial` | Highly subdued, slow-moving atmospheric background featuring radial gradients (indigo and purple at 3-5% opacity). Animation: 30s infinite linear flow. | Global page background. Maintains 95% visual calm. |
| `bg-noise` | Subtle CSS noise overlay (`opacity-[0.015]`, `pointer-events-none`, fixed position). | Adds physical texture to the dark background. Lower opacity than typical — barely perceptible. |

### Background Rules
- `bg-monarch-radial` is the **only** animated background. No additional moving elements at rest.
- `bg-noise` is a fixed, `pointer-events-none` pseudo-element. Never attach noise to scrolling containers.
- When `prefers-reduced-motion` is active, `bg-monarch-radial` pauses and holds a static frame.
- The background should feel like a living atmosphere, not a wallpaper. Subtlety is everything.

---

## 5. Core Components

### 5.1 LevelProgress

Reusable Level and XP UI component.

**Props:**
- `level: number` — Current player level
- `currentXP: number` — Current XP amount
- `nextLevelXP: number` — XP required for next level
- `rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S'` — Current rank

**Visual Structure:**
1. **Level Number** — `text-hero` (Cinzel, massive, `text-glow-monarch` on level-up only)
2. **Rank Badge** — `RankBadge` component (see 5.2)
3. **XP Bar** — Thin progress bar (`h-1.5`, `rounded-full`, `--depth` track, `--monarch` fill with `box-glow-monarch` on completion)
4. **XP Text** — `text-caption` (Montserrat, `--silver`): "{currentXP} / {nextLevelXP} XP"

**States:**
- **Rest:** Calm, no glow. XP bar at current fill. Level number is solid `--moonlight`.
- **XP Gain:** XP bar animates fill over 600ms (`cubic-bezier(0.32, 0.72, 0, 1)`). Subtle `box-glow-monarch` pulse on the bar for 800ms.
- **Level Up:** Cinematic sequence — level number scales up (`scale-110` → `scale-100`), `text-glow-monarch` intensifies, screen briefly flashes with `--monarch` at 10% opacity, subtle particle burst (dark-themed, not confetti — think embers, not celebration).

### 5.2 RankBadge

Typography and accent-driven rank visualizer.

**Ranks:** E → D → C → B → A → S

**Visual:**
- Single letter in Cinzel, `text-display` size
- Background: `glass` container with rank-specific tint
  - E: `--ash` (no glow, `surface` background)
  - D: `--silver` (no glow, `surface` background)
  - C: `--amber` (subtle glow, `glass` background)
  - B: `--monarch` (`text-glow-monarch`, `glass` background)
  - A: `--violet` (`text-glow-violet`, `glass-strong` background)
  - S: `--soul` (`text-glow-soul`, strongest glow, `glass-strong` background with subtle gradient)
- Container: `rounded-lg`, `px-4 py-2`

**Animation:** Rank change triggers a brief scale pulse (`scale-105` → `scale-100` over 300ms) with the new rank's glow color.

### 5.3 HabitCard (Quest Card)

Reusable daily quest item.

**Props:**
- `title: string` — Habit/quest name
- `description?: string` — Optional description
- `xpReward: number` — XP gained on completion
- `completed: boolean` — Completion state
- `streak?: number` — Current streak count
- `category?: string` — Quest category (e.g., "Fitness", "Mind", "Skill")

**Visual Structure:**
1. **Container:** `surface` or `glass` (depending on context). `rounded-xl`, `p-5`. Double-bezel pattern for featured/important quests.
2. **Category Tag:** `text-micro`, `uppercase`, `tracking-[0.15em]`, category color (subtle). Positioned top-left.
3. **Title:** `text-headline` (Montserrat, 600). Color: `--moonlight`.
4. **Description:** `text-body` (Montserrat, 400). Color: `--silver`. Max 2 lines. Truncated with ellipsis.
5. **XP Reward:** Small pill, `text-micro`, `glass` background, `--monarch` text. Format: "+{xpReward} XP". Positioned bottom-left.
6. **Streak Indicator:** If `streak > 0`, small flame icon + number. Color: `--amber` if `streak < 7`, `--ember` if `streak >= 7` (intense streak). Positioned bottom-right.
7. **Checkbox / Action:** Right-aligned. Custom checkbox with `--monarch` fill and `box-glow-monarch` on check. Not a default browser checkbox — a designed toggle.

**States:**
- **Rest:** Calm, no glow. Clean surface. Border is `rgba(255,255,255,0.06)`.
- **Hover:** Subtle `border-hover` color shift. Cursor pointer. `translate-y-[-2px]` lift over 200ms. Shadow deepens slightly.
- **Active / Press:** `scale-[0.98]` to simulate physical pressing.
- **Completed:** Title gets `line-through` + `--ash`. Card gets subtle `box-glow-success` for 2 seconds, then fades to a calm completed state (slightly desaturated). XP pill pulses once.
- **Completion Animation:** Checkbox fills with `--monarch`, brief `box-glow-monarch` pulse on the card (400ms), XP number counts up with `ease-bounce`, streak counter increments with a micro-bounce (300ms).

### 5.4 Navigation (Floating Island Nav)

**Structure:**
- Floating glass pill, detached from the top (`mt-6`, `mx-auto`, `w-max`, `rounded-full`).
- NOT edge-to-edge sticky. It floats in the atmosphere.
- Height: ≤ 48px.
- Background: `glass` with `backdrop-blur-xl`.
- Items: Montserrat 500, `text-caption`, `--silver`. Active item: `--moonlight` with subtle `text-glow-monarch`.
- Logo: Left side of the pill, `h-6`. Not a separate element — integrated into the pill.

**Mobile:**
- Collapses to hamburger. Hamburger morphs to X with fluid rotation (not instant disappearance).
- Menu opens as full-screen overlay with `backdrop-blur-3xl bg-background/95`.
- Links stagger-fade in (`translate-y-8 opacity-0` → `translate-y-0 opacity-100`, staggered 80ms per item).
- Menu items are large, cinematic — `text-display` size, centered.

### 5.5 Button System

**Primary Button:**
- Background: `--monarch`
- Text: White, Montserrat 600, `text-caption`
- Padding: `px-6 py-3`
- Radius: `rounded-full` (pill shape)
- Hover: `box-glow-monarch`, `scale-[0.98]` on active
- Transition: `all 300ms cubic-bezier(0.32, 0.72, 0, 1)`

**Secondary Button:**
- Background: `transparent`
- Border: `1px solid rgba(255,255,255,0.06)-hover`
- Text: `--moonlight`, Montserrat 500
- Hover: Background shifts to `--depth-elevated`, border to `--monarch` at 30% opacity

**Ghost Button:**
- Background: `transparent`
- Text: `--silver`
- Hover: Text becomes `--moonlight`, subtle `translate-x-1` on trailing icon

**Button-in-Button Trailing Icon:**
- If a button has an arrow or icon, it NEVER sits naked next to the text.
- It must be nested inside its own circular wrapper (`w-7 h-7 rounded-full bg-white/10 flex items-center justify-center`) placed flush with the button's right inner padding.
- On hover, the inner icon circle translates diagonally (`group-hover:translate-x-1 group-hover:-translate-y-[1px]`) and scales up slightly (`scale-105`).

**Button Rules:**
- **No two buttons with the same intent** on the same page.
- **CTA labels never wrap** to 2+ lines at desktop.
- **Minimum touch target:** 44x44px on all interactive elements.

---

## 6. Motion & Animation System

### Philosophy
Every animation must be justifiable in one sentence: it communicates hierarchy, storytelling, feedback, or a state transition. No animation for show.

The motion language of Shadow Level is **heavy and deliberate** — like a vault door closing, not a butterfly fluttering. Mass matters. Things accelerate slowly and decelerate smoothly.

### Easing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `ease-smooth` | `cubic-bezier(0.32, 0.72, 0, 1)` | Default UI transitions, hovers, state changes |
| `ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Micro-bounce for achievements, streak increments |
| `ease-dramatic` | `cubic-bezier(0.16, 1, 0.3, 1)` | Level-up reveals, major transitions |
| `ease-out-expo` | `cubic-bezier(0.19, 1, 0.22, 1)` | Exit animations, dismissals |
| `ease-atmospheric` | `cubic-bezier(0.4, 0, 0.2, 1)` | Background animations, slow ambient motion |

### Animation Patterns

| Pattern | Trigger | Duration | Easing | Properties |
|---------|---------|----------|--------|------------|
| **Fade Up** | Scroll into view | 800ms | `ease-smooth` | `translate-y-6 → 0`, `opacity-0 → 1`, `blur-sm → blur-0` |
| **Hover Lift** | Mouse enter | 200ms | `ease-smooth` | `translate-y-0 → -2px`, border color shift |
| **Press Scale** | Active / click | 100ms | `ease-smooth` | `scale-100 → scale-[0.98]` |
| **XP Fill** | XP gain | 600ms | `ease-smooth` | Width animation on progress bar |
| **Level Up Pulse** | Level increase | 1200ms | `ease-dramatic` | Scale + glow intensify + flash |
| **Streak Bounce** | Streak increment | 400ms | `ease-bounce` | Scale bounce on streak number |
| **Card Complete** | Habit checked | 500ms | `ease-smooth` | Checkbox fill + card glow + line-through |
| **Nav Stagger** | Mobile menu open | 400ms | `ease-smooth` | Staggered 80ms per link |
| **Background Flow** | Continuous | 30s | `ease-atmospheric` | Slow radial gradient position shift |
| **Glow Pulse** | Achievement | 2000ms | `ease-dramatic` | Glow opacity 0 → 1 → 0.3 |

### Scroll Behavior
- Use `IntersectionObserver` or Framer Motion `whileInView` for scroll reveals.
- **Never** use `window.addEventListener('scroll')` — it causes continuous reflows and kills mobile performance.
- Elements never appear statically on load. Gentle fade-up as they enter viewport.
- Stagger delay between sibling elements: 100ms. Never more than 150ms — it feels slow, not dramatic.

### GPU-Safe Animation Rules
- Animate **only** `transform` and `opacity`. Never animate `top`, `left`, `width`, `height`, or `margin`.
- Use `will-change: transform` sparingly and only on elements actively animating.
- `backdrop-blur` only on fixed or sticky elements (navbar, overlays). **Never** on scrolling containers or large content areas.
- **No blur on hover.** Blur is expensive. Use opacity and scale shifts instead.

### Reduced Motion
- When `prefers-reduced-motion` is active:
  - All continuous animations pause (`bg-monarch-radial` holds static frame).
  - All glow effects are disabled.
  - Transitions reduce to instant or 100ms fade.
  - Level-up celebration reduces to a simple color flash (no particles, no scale).
  - Scroll reveals become instant (no fade-up delay).
  - Stagger delays become 0ms.

---

## 7. Page Layouts

### 7.1 Dashboard (Main App)

**Structure:**
1. **Floating Island Nav** — Top, centered, glass pill. Logo + nav items + user avatar.
2. **Hero Stats Bar** — Full width, `py-16` to `py-24`.
   - Left: LevelProgress (massive level number + XP bar)
   - Right: RankBadge + Streak counter + Daily completion rate
   - Layout: Asymmetric split. LevelProgress takes 60% width, stats take 40%.
3. **Daily Quests Section** — `py-16`.
   - Section header: Eyebrow "Today's Quests" + Headline "Complete your dailies"
   - Grid: 1 column mobile, 2 columns tablet, 3 columns desktop. `gap-6`.
   - HabitCard components.
   - If no quests: Empty state with subtle illustration + "No quests today. Rest is also progress."
4. **Stats Overview** — `py-16`, `surface` background.
   - Weekly progress chart, category breakdown, XP history.
   - Charts: Minimal, dark-themed. No grid lines unless necessary. Axis labels in `--ash`.
5. **Achievements** — `py-16`.
   - Grid of achievement badges (locked = grayscale + muted, unlocked = full color + glow).
   - Locked badges: `--ash`, no glow, `surface` background.
   - Unlocked badges: Full color, subtle glow, `glass` background.

### 7.2 Level-Up Screen (Cinematic Overlay)

**Trigger:** Player reaches new level.

**Structure:**
1. **Full-screen overlay** — `fixed inset-0`, `bg-background/95`, `backdrop-blur-2xl`.
2. **Centered content** — Flex column, centered.
3. **"LEVEL UP" text** — Cinzel, `text-hero`, `text-glow-monarch`, animates in with dramatic easing.
4. **New level number** — Massive, scales from `scale-150 opacity-0` to `scale-100 opacity-100`.
5. **Rank badge** — If rank changed, animates in with color transition.
6. **XP overflow** — "+{overflowXP} Bonus XP" in `text-glow-violet`.
7. **Dismiss** — Primary button "Continue" or auto-dismiss after 4 seconds.

**Animation Sequence:**
1. Overlay fades in (300ms)
2. "LEVEL UP" text slides up + fades (400ms, delay 200ms)
3. Level number scales in (600ms, delay 500ms)
4. Rank badge fades in (300ms, delay 900ms)
5. Bonus XP pulses (400ms, delay 1100ms)
6. Continue button fades in (300ms, delay 1400ms)

**Total sequence:** ~2 seconds of pure cinematic intensity. Then back to calm.

### 7.3 Auth Screens (Login / Register)

**Structure:**
1. **Split screen:** Left 50% = atmospheric background with subtle `bg-monarch-radial` + logo centered. Right 50% = auth form.
2. **Form container:** `glass-strong`, `rounded-2xl`, `p-8`, centered vertically.
3. **Form fields:** Double-bezel pattern. Input outer shell + inner core.
4. **Submit button:** Primary button, full width.
5. **Mobile:** Stack vertically. Background becomes full-screen, form overlays with `glass-strong`.

---

## 8. Accessibility

### Motion
- `prefers-reduced-motion` fully respected (see Section 6).
- Decorative glows and continuous background animations disabled when active.

### Focus & Interaction
- Visible focus rings on all interactive elements. Use `ring-2 ring-primary ring-offset-2 ring-offset-background`.
- All interactive Radix UI primitives have visible focus states.
- Touch targets minimum 44x44px.

### Contrast
- All text meets WCAG AA (4.5:1) against its background.
- Form inputs, placeholders, focus rings, labels all pass WCAG AA.

### Screen Readers
- Progress bars use `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- Rank badges use `aria-label="Rank: {rank}"`.
- HabitCards use `aria-pressed` for completion state.
- Level-up overlay traps focus and announces via `aria-live="polite"`.
- Empty states announce their message via `aria-live="polite"`.

---

## 9. Anti-Patterns (Banned)

These patterns are **strictly forbidden** in Shadow Level. They are the signatures of generic AI-generated design.

### Typography Tells
- **No em-dashes (`—`) anywhere.** Zero. Use periods, commas, or line breaks.
- **No en-dashes (`–`) as separators.**
- **No section-number eyebrows.** ("01 / Quests", "02 / Stats") — banned. Use plain language.
- **No decorative middle-dots (`·`) as default separators.** Maximum 1 per line in metadata strips.
- **No vertical rotated text.**
- **No crosshair / hairline grid lines as decoration.**
- **No broken-and-italicized headlines** as a default "design move."

### Visual Tells
- **No Inter, Roboto, Arial, Open Sans, or Helvetica.** Cinzel + Montserrat only.
- **No generic 1px solid gray borders.** Use `rgba(255,255,255,0.06)` (subtle, tinted hairlines).
- **No harsh drop shadows** (`shadow-md`, `rgba(0,0,0,0.3)`). Use controlled glows only.
- **No cards nested inside cards.** One surface layer per viewport.
- **No decorative colored status dots** on every list item. Only for real semantic state, and max one per section.
- **No fake product UI** (fake task lists, fake dashboards built from styled divs) in marketing.
- **No version labels** ("v1.0", "BETA") in the app UI.
- **No "Quietly trusted by"** social proof headers.
- **No locale/time/weather strips** ("LIS 14:23 · 18°C") unless genuinely relevant.
- **No pills/labels/tags overlaid on images.**
- **No photo-credit captions as decoration.**
- **No decoration text strip at hero bottom** ("BRAND. MOTION. SPATIAL.")
- **No floating top-right sub-text** in section headings.
- **No scoring/progress bars with filled background tracks** as comparison visuals.

### Layout Tells
- **No edge-to-edge sticky navbars glued to the top.** Floating island nav only.
- **No symmetrical 3-column Bootstrap-style grids** without massive whitespace gaps.
- **No `border-t` + `border-b` on every row** of long lists. Pick one separator style.
- **No floating top-right sub-text** in section headings.
- **No scroll cues** ("Scroll", "↓ scroll", animated mouse-wheel icons).
- **No split-header pattern** (left big headline + right small explainer paragraph). Use vertical stack or true two-column.
- **No zigzag alternation** for 3+ consecutive sections. Vary layouts.

### Motion Tells
- **No `linear` or `ease-in-out` transitions.** Always use custom cubic-bezier.
- **No bounce/elastic easing** (feels dated). Use `ease-bounce` token only for micro-interactions.
- **No `window.addEventListener('scroll')`.** Use IntersectionObserver or Framer Motion.
- **Never mix GSAP / Three.js with Motion** in the same component tree.
- **No blur on hover.** Expensive and unnecessary.

### Color Tells
- **No purple-to-blue gradients as decoration.** Gradients are reserved for `glass-strong` only.
- **No gray text on colored backgrounds.**
- **No pure black or pure gray.** Always tint.
- **No more than 10% accent color** in any viewport.

---

## 10. Asset Guidelines

### Icons
- **Library:** Phosphor Icons (light stroke weight) or Tabler Icons.
- **Never** use FontAwesome, Material Icons, or thick-stroked Lucide defaults.
- Icon size: `16px` for inline, `20px` for buttons, `24px` for standalone.
- Icon color: Inherits text color or uses semantic color (primary, success, warning, danger).
- **Icon stroke weight:** Always light (Phosphor `thin` or `light`). Never bold or filled by default.

### Images
- **No broken Unsplash links.** Use real assets, generated images, or `https://picsum.photos/seed/{descriptive-string}/{w}/{h}` for placeholders.
- **No div-based fake screenshots.**
- Avatar images: `rounded-full`, subtle `ring-2 ring-border`.
- Achievement badge images: `rounded-xl`, `glass` container.
- **Image treatment:** Dark images should feel like they belong in the atmosphere. If an image is too bright, apply a subtle dark overlay (`bg-black/30`) or desaturate slightly.

### Logo Usage
- The Shadow Level logo (provided) uses Cinzel-style letterforms with shadow/purple theming.
- Logo placement: Integrated into the floating nav pill, or centered on auth screens.
- Logo size: `h-6` in nav, `h-12` in auth/landing.
- Logo color: Full color on dark backgrounds. White monochrome if needed on lighter surfaces.
- **Never distort, stretch, or recolor the logo** outside of the approved monochrome variant.

---

## 11. Pre-Flight Checklist

Before shipping any UI, verify every item:

- [ ] **Brief inference declared** — This is a gamified habit tracker, dark RPG aesthetic.
- [ ] **Dial values explicit** — Variance: 7, Motion: 6, Density: 4.
- [ ] **ZERO em-dashes (`—`) anywhere** on the page.
- [ ] **Theme Lock** — Dark mode only. No section flips.
- [ ] **Color Consistency** — One accent system (Indigo primary, Purple secondary). No third accent.
- [ ] **Shape Consistency** — One radius system applied consistently.
- [ ] **Button Contrast** — Every CTA text readable against background (WCAG AA 4.5:1).
- [ ] **CTA Button Wrap** — No CTA label wraps to 2+ lines at desktop.
- [ ] **Form Contrast** — Inputs, placeholders, focus rings all pass WCAG AA.
- [ ] **Hero discipline** — Headline ≤ 2 lines, subtext ≤ 20 words, CTA visible without scroll.
- [ ] **Hero top padding** — Max `pt-24`, content doesn't float mid-viewport.
- [ ] **Eyebrow count** — ≤ 1 per section. Max `ceil(sectionCount / 3)` across page.
- [ ] **No duplicate CTA intent** — No two buttons doing the same thing.
- [ ] **Motion motivated** — Every animation justifiable in one sentence.
- [ ] **Navigation on ONE line** — Height ≤ 56px at desktop.
- [ ] **Real images used** — No div-based fake UI, no hand-rolled decorative SVGs.
- [ ] **No decorative dots** — Zero by default, only for real semantic state.
- [ ] **No `border-t` + `border-b`** on every row of lists.
- [ ] **Content density sane** — No 20-row data tables without justification.
- [ ] **Motion claimed = motion shown** — If Motion Intensity > 4, page actually animates.
- [ ] **GPU-safe** — Only `transform` and `opacity` animated. No layout-triggering properties.
- [ ] **Reduced motion** — Wrapped for all animations > intensity 3.
- [ ] **Mobile collapse** — `w-full`, `px-4`, single-column below 768px.
- [ ] **Viewport stability** — `min-h-[100dvh]`, never `h-screen`.
- [ ] **Icons from allowed library** — Phosphor / Tabler only.
- [ ] **No AI Tells** — No Inter, no purple gradients, no nested cards, no generic patterns.
- [ ] **Core Web Vitals plausible** — LCP < 2.5s, INP < 200ms, CLS < 0.1.
- [ ] **Double-bezel on premium cards** — Outer shell + inner core with calculated radius.
- [ ] **Glow discipline** — No more than one glowing element per section at rest.
- [ ] **Cinzel rarity** — Cinzel used only for brand moments, never for UI chrome.
- [ ] **Atmospheric background** — `bg-monarch-radial` present and subtle.
- [ ] **Noise texture** — `bg-noise` at 0.015 opacity, fixed, pointer-events-none.
- [ ] **Button-in-button icons** — Trailing icons nested in circular wrappers, not naked.
- [ ] **Z-axis clarity** — Every element has unambiguous elevation.

---

## 12. File Structure Reference

```
src/
├── styles.css              # CSS variables, Tailwind v4 theme, custom utilities
├── components/
│   ├── ui/                 # Primitive components (Button, Input, Badge)
│   ├── LevelProgress.tsx   # Level + XP display component
│   ├── RankBadge.tsx       # Rank visualizer (E-S)
│   ├── HabitCard.tsx       # Daily quest card
│   ├── FloatingNav.tsx     # Floating island navigation
│   ├── LevelUpOverlay.tsx  # Cinematic level-up screen
│   ├── GlassSurface.tsx    # Reusable glass/surface container
│   └── DoubleBezel.tsx     # Double-bezel wrapper component
├── hooks/
│   ├── useReducedMotion.ts # prefers-reduced-motion hook
│   └── useScrollReveal.ts  # IntersectionObserver scroll reveal
├── lib/
│   ├── animations.ts       # Shared animation constants (easing, durations)
│   └── colors.ts           # Color token utilities
└── assets/
    ├── logo.svg            # Shadow Level logo
    └── noise.png           # Subtle noise texture (tiling)
```

---

## 13. Changelog

### v3.0 (2026-08-12) — The 10/10 Release
- **Added:** "The Expensive Difference" philosophy section — what separates 7/10 from 10/10 dark UIs.
- **Added:** Double-Bezel (Doppelrand) pattern specification with exact CSS values.
- **Added:** Glow Discipline rules — the most critical addition for preventing visual clutter.
- **Added:** Atmospheric easing token (`ease-atmospheric`) for background animations.
- **Added:** Z-axis discipline — explicit elevation planes.
- **Added:** Auth screen layout specification.
- **Added:** Empty state guidance for quests.
- **Added:** Noise texture at reduced opacity (0.015 vs typical 0.03) for subtlety.
- **Added:** Cinzel rarity rule — "Its rarity is its power."
- **Added:** 60-30-10 color rule for viewport color distribution.
- **Added:** Icon stroke weight guidance (always light).
- **Added:** Image treatment rules for dark UI cohesion.
- **Added:** 5 new pre-flight checklist items (Double-bezel, Glow discipline, Cinzel rarity, Atmospheric background, Noise texture, Button-in-button, Z-axis clarity).
- **Refined:** Navigation height reduced from 80px to 56px for elegance.
- **Refined:** Hero padding increased to `py-32` for cinematic breathing room.
- **Refined:** XP bar height reduced to `h-1.5` for surgical precision.
- **Refined:** Background noise opacity reduced to 0.015 for near-invisibility.
- **Refined:** Stagger delay cap at 150ms to prevent sluggishness.
- **Refined:** Level-up particles described as "embers, not confetti" for tonal consistency.
- **Fixed:** All remaining em-dash references removed.

### v2.0 (2026-08-12)
- **Added:** Comprehensive anti-patterns section (Section 9) based on taste-skill, impeccable, and ui-ux-pro-max-skill references.
- **Added:** Pre-flight checklist (Section 11) with 30+ verification items.
- **Added:** Motion system with easing tokens and GPU-safe animation rules.
- **Added:** Button-in-Button trailing icon pattern.
- **Added:** Floating island nav specification with mobile hamburger morph.
- **Added:** Level-up cinematic overlay specification with animation sequence.
- **Added:** Asset guidelines (icons, images, logo usage).
- **Added:** File structure reference.
- **Refined:** Color system with explicit glow tokens and contrast rules.
- **Refined:** Typography scale with clamp() for responsive fluid sizing.
- **Refined:** Spacing system with explicit tokens and layout rules.
- **Refined:** Glassmorphism rules — never nest glass inside glass.
- **Fixed:** Removed all em-dash usage. Replaced with periods and line breaks.
- **Fixed:** Added explicit `prefers-reduced-motion` handling throughout.
- **Fixed:** Added WCAG AA contrast requirements for all text and form elements.
