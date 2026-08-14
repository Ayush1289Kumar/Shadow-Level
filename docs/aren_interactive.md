# aren_interactive.md

> **Mission:** Transform the website into a living, breathing experience — inspired by `why.zero.university` and `zero.university` — using Solo Leveling SFX, cinematic motion, and scroll-driven choreography. Every interaction should feel earned.

---

## Reference Inspirations

```
zero.university        → Cinematic scroll, particle fields, dramatic reveals
why.zero.university    → Story-driven sections, immersive audio moments,
                         heavy typography animation, section-locked scrolling
```

---

## Part 1 — Sound Architecture

### 1.1 — SFX Inventory Map

> Assign your existing Solo Leveling audio files to these trigger slots.

```
┌─────────────────────────────────────────────────────────────────────┐
│                     SFX TRIGGER MAPPING                             │
├──────────────────────┬──────────────────────────────────────────────┤
│  FILE / SOUND        │  TRIGGER EVENT                               │
├──────────────────────┼──────────────────────────────────────────────┤
│  arise.mp3           │  Hero CTA button click ("Get Started" etc.)  │
│                      │  Major level-up moment on scroll reveal       │
├──────────────────────┼──────────────────────────────────────────────┤
│  system-alert.mp3    │  Page first load (after 1.5s delay)          │
│                      │  "System Notification" style toast appears    │
├──────────────────────┼──────────────────────────────────────────────┤
│  rank-up.mp3         │  Pricing card hover / plan selection         │
│                      │  Achievement badge unlocking animation        │
├──────────────────────┼──────────────────────────────────────────────┤
│  gate-open.mp3       │  Modal / dialog opening                      │
│                      │  Sidebar expanding                            │
├──────────────────────┼──────────────────────────────────────────────┤
│  skill-use.mp3       │  Button clicks (non-CTA, secondary actions)  │
│                      │  Tab switching                                │
├──────────────────────┼──────────────────────────────────────────────┤
│  shadow-army.mp3     │  Staggered list/card section scrolls into    │
│                      │  view (plays once as items march in)         │
├──────────────────────┼──────────────────────────────────────────────┤
│  dungeon-clear.mp3   │  Form submission success                     │
│                      │  Newsletter subscribe confirmed               │
├──────────────────────┼──────────────────────────────────────────────┤
│  mana-fill.mp3       │  Progress bar / skill bar animating          │
│                      │  Loading screen completing                    │
├──────────────────────┼──────────────────────────────────────────────┤
│  ui-hover.mp3        │  Nav link hover (very subtle, low volume)    │
│                      │  Icon hover                                   │
├──────────────────────┼──────────────────────────────────────────────┤
│  notification.mp3    │  Toast / snackbar appearing                  │
│                      │  Tooltip first reveal                         │
└──────────────────────┴──────────────────────────────────────────────┘
```

### 1.2 — Audio Engine Rules

```
┌─────────────────────────────────────────────────────────────────────┐
│                      AUDIO ENGINE SPEC                              │
│                                                                     │
│  Implementation: Howler.js  (cdn or npm install howler)             │
│  Fallback:       Web Audio API                                      │
│                                                                     │
│  GLOBAL RULES:                                                      │
│  ├─ Master volume:    0.6 (never 1.0 — always feels too harsh)     │
│  ├─ SFX volume:       0.4 (subtle, not jarring)                    │
│  ├─ Ambient volume:   0.15 (barely there, felt not heard)          │
│  ├─ Always respect:   user mute preference (localStorage key)       │
│  ├─ Mute toggle:      persistent floating button (bottom-left)      │
│  ├─ First play rule:  NO audio before user first interaction        │
│  │   → Gate everything behind first click/scroll event             │
│  ├─ Debounce hover:   50ms minimum between hover sfx               │
│  └─ Overlap rule:     ui-hover can overlap, arise cannot            │
│                                                                     │
│  MUTE BUTTON ANATOMY:                                               │
│  ├─ Position: fixed, bottom: 24px, left: 24px                      │
│  ├─ Size: 40x40px, radius-full                                      │
│  ├─ Icon: 🔊 / 🔇 with animated sound wave rings when active       │
│  ├─ bg: neutral-900/80, backdrop-blur                               │
│  └─ Tooltip: "Sound On/Off"                                         │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.3 — Ambient Soundscape (Optional Layer)

```
┌─────────────────────────────────────────────────────────────────────┐
│  AMBIENT LAYERS — loop continuously at low volume                   │
│                                                                     │
│  Section: Hero          → dungeon-ambient.mp3 (dark, low hum)      │
│  Section: Features      → cave-wind.mp3 (subtle movement)          │
│  Section: Pricing       → tension-loop.mp3 (slight drama)          │
│  Section: Testimonials  → silence (let content breathe)            │
│  Section: Footer        → fade ambient out completely              │
│                                                                     │
│  Crossfade between sections: 800ms linear fade                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Part 2 — Animation System

### 2.1 — Page Load Sequence

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CINEMATIC LOAD SEQUENCE                          │
│                                                                     │
│  0ms      → Black screen (body bg: #0C0A09)                        │
│  0ms      → "SYSTEM INITIALIZING..." text fades in                 │
│             (Solo Leveling blue glitch font style)                  │
│  300ms    → Loading bar fills from 0% → 100% (mana-fill.mp3)       │
│  800ms    → system-alert.mp3 plays                                  │
│  1000ms   → Screen flashes white briefly (flash keyframe)           │
│  1100ms   → Actual website content fades in from below             │
│  1400ms   → Hero text animates in (see 2.2)                        │
│  1600ms   → Particle field initializes                              │
│                                                                     │
│  Loading screen component:                                          │
│  ├─ Full viewport overlay (z-index: 9999)                          │
│  ├─ Center: Logo + progress bar + status text                      │
│  ├─ Status text cycles: "Scanning..." → "Loading Assets..."        │
│  │                      → "Establishing Connection..." → "Ready"    │
│  └─ Exit: scale(1.1) + opacity(0) over 400ms                       │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 — Hero Section Choreography

```
┌─────────────────────────────────────────────────────────────────────┐
│                     HERO ANIMATION TIMELINE                         │
│                                                                     │
│  Library: GSAP (gsap + ScrollTrigger) — industry standard          │
│                                                                     │
│  t=0ms    → Background particle field: slow upward drift            │
│  t=0ms    → Subtle scanline overlay (CSS animation, opacity 0.03)  │
│  t=1400ms → Badge/eyebrow text: slideUpFade (300ms)                │
│  t=1600ms → H1 Line 1: character-by-character reveal               │
│             (SplitText or manual span wrapping)                     │
│             each char: translateY(20px)→0, opacity 0→1             │
│             stagger: 30ms per character                             │
│  t=1900ms → H1 Line 2: same, stagger 25ms                          │
│  t=2100ms → Subtitle paragraph: fadeIn + slideUp (400ms)           │
│  t=2300ms → CTA buttons: scale(0.9)→1 + fadeIn (300ms)            │
│             arise.mp3 queued, plays ON button click                 │
│  t=2500ms → Scroll indicator: pulse animation begins               │
│                                                                     │
│  HOVER on H1:                                                       │
│  ├─ Each word gets subtle glow: text-shadow amber                   │
│  └─ ui-hover.mp3 on word enter                                      │
│                                                                     │
│  PARALLAX:                                                          │
│  ├─ Background moves at 0.3x scroll speed                           │
│  ├─ Hero text moves at 0.8x scroll speed                           │
│  └─ Foreground elements at 1.0x (natural)                           │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.3 — Scroll-Triggered Reveals

```
┌─────────────────────────────────────────────────────────────────────┐
│                 SCROLL TRIGGER SPECIFICATIONS                        │
│                                                                     │
│  Engine: GSAP ScrollTrigger or Intersection Observer API            │
│                                                                     │
│  TRIGGER DEFAULTS:                                                  │
│  ├─ threshold:  0.15 (fires when 15% visible)                      │
│  ├─ once:       true (don't re-animate on scroll back)             │
│  └─ rootMargin: "0px 0px -60px 0px" (slightly before viewport)    │
│                                                                     │
│  ── PATTERN A: Single Element Reveal ─────────────────────────────│
│  from: { opacity: 0, y: 40 }                                       │
│  to:   { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }    │
│                                                                     │
│  ── PATTERN B: Staggered Grid (cards, features) ──────────────────│
│  from: { opacity: 0, y: 50, scale: 0.96 }                         │
│  to:   { opacity: 1, y: 0, scale: 1, stagger: 0.08, dur: 0.6 }   │
│  SFX:  shadow-army.mp3 plays once on first card trigger            │
│                                                                     │
│  ── PATTERN C: Text Line Reveal (section headings) ───────────────│
│  Split heading into lines                                           │
│  from: { opacity: 0, y: "100%", clipPath: "inset(0 0 100% 0)" }  │
│  to:   { opacity: 1, y: "0%",  clipPath: "inset(0 0 0% 0)" }     │
│  stagger: 0.1s per line, duration: 0.8s                            │
│                                                                     │
│  ── PATTERN D: Counter / Stat Reveal ─────────────────────────────│
│  Numbers count up from 0 to target value                           │
│  Duration: 2000ms, easing: power2.out                              │
│  SFX: mana-fill.mp3 plays during count                             │
│                                                                     │
│  ── PATTERN E: Horizontal Scroll Section ─────────────────────────│
│  Pin section, scroll horizontally through cards                    │
│  (ref: zero.university feature scroll)                              │
│  Cards slide in from right as user scrolls down                    │
│                                                                     │
│  ── PATTERN F: Image / Media Reveal ──────────────────────────────│
│  Container clips from bottom:                                       │
│  clipPath: "inset(100% 0 0 0)" → "inset(0% 0 0 0)"               │
│  Image inside scales: scale(1.1) → scale(1) simultaneously         │
│                                                                     │
│  ── PATTERN G: Section Background Shift ──────────────────────────│
│  As section enters viewport, bg color transitions                   │
│  Driven by ScrollTrigger scrub: true                               │
│  Crossfade ambient audio simultaneously                             │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.4 — Cursor Effects

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CUSTOM CURSOR SYSTEM                             │
│                                                                     │
│  Library: Custom implementation or kursor.js                        │
│                                                                     │
│  DEFAULT CURSOR:                                                    │
│  ├─ Outer ring: 32px circle, border 1.5px amber, opacity 0.6       │
│  ├─ Inner dot:  6px circle, filled amber                           │
│  ├─ Lag:        Outer ring follows with 0.12s lerp delay           │
│  └─ Mix-blend:  difference (inverts on light backgrounds)          │
│                                                                     │
│  HOVER STATES:                                                      │
│  ├─ On links/buttons: outer ring scales to 48px + opacity 1        │
│  ├─ On images:  outer ring becomes "VIEW" text label               │
│  ├─ On drag elements: cursor becomes ↔ icon                        │
│  └─ On video:   cursor becomes ▶ play icon                         │
│                                                                     │
│  CURSOR TRAIL:                                                      │
│  ├─ 6 trailing dots, each smaller and more transparent             │
│  ├─ Fade out over 300ms                                             │
│  └─ Color: amber (matches accent)                                   │
│                                                                     │
│  CLICK EFFECT:                                                      │
│  ├─ Ripple ring expands from click point (scale 1→3, opacity 1→0) │
│  ├─ Duration: 400ms, ease-out                                       │
│  └─ skill-use.mp3 on every click (very low volume: 0.2)           │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.5 — Particle System

```
┌─────────────────────────────────────────────────────────────────────┐
│                     PARTICLE FIELD SPEC                             │
│                                                                     │
│  Library: tsParticles (cdn or npm)                                  │
│  Reference: zero.university hero background                         │
│                                                                     │
│  HERO PARTICLES:                                                    │
│  ├─ Count:      80 (desktop) / 30 (mobile)                         │
│  ├─ Shape:      circle + occasional star                            │
│  ├─ Color:      amber (#FBBF24) at opacity 0.3–0.6                 │
│  ├─ Size:       1–3px random                                        │
│  ├─ Movement:   slow upward drift, slight horizontal wander        │
│  ├─ Speed:      0.3–0.8                                             │
│  ├─ Connect:    lines between nearby particles, opacity 0.08       │
│  ├─ Mouse:      particles repel from cursor (repulse mode)         │
│  └─ Responsive: reduce count by 60% on mobile                      │
│                                                                     │
│  SECTION-SPECIFIC PARTICLES:                                        │
│  ├─ Features section: teal particles (#2DD4BF), floating upward    │
│  ├─ Pricing section:  gold particles, denser, slower               │
│  └─ Footer:           minimal, just 15 ambient dots                 │
│                                                                     │
│  SPECIAL: "ARISE" PARTICLE BURST                                    │
│  ├─ Triggers on hero CTA click                                      │
│  ├─ 200 particles explode outward from button position             │
│  ├─ Colors: amber + white + slight blue                             │
│  ├─ Gravity pulls them down after burst                             │
│  ├─ Duration: 1200ms                                                │
│  └─ arise.mp3 plays simultaneously                                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Part 3 — Section-by-Section Spec

### 3.1 — Navbar

```
┌─────────────────────────────────────────────────────────────────────┐
│                        NAVBAR BEHAVIOR                              │
│                                                                     │
│  SCROLL BEHAVIOR:                                                   │
│  ├─ 0–80px scrolled:     transparent bg, no blur                   │
│  ├─ 80px+ scrolled:      bg: neutral-950/80, backdrop-blur-lg      │
│  │                        border-bottom: 1px border-default        │
│  │                        transition: all 300ms ease               │
│  └─ Scrolling DOWN fast: navbar hides (translateY -100%)           │
│     Scrolling UP:         navbar reappears                          │
│                                                                     │
│  LOGO:                                                              │
│  ├─ Hover: subtle glow pulse (amber, 2s loop)                      │
│  └─ Click: gate-open.mp3 if navigating to new section              │
│                                                                     │
│  NAV LINKS:                                                         │
│  ├─ Hover: underline draws in from left (scaleX 0→1)               │
│  ├─ SFX:   ui-hover.mp3 (volume: 0.25)                             │
│  └─ Active: amber dot indicator below link                          │
│                                                                     │
│  MOBILE MENU:                                                       │
│  ├─ Hamburger → X morphing animation                                │
│  ├─ Menu: full-screen overlay, bg: neutral-950                      │
│  ├─ Links stagger in from bottom (Pattern B)                        │
│  └─ SFX: gate-open.mp3 on open, reverse on close                   │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.2 — Hero Section

```
┌─────────────────────────────────────────────────────────────────────┐
│                        HERO SECTION                                 │
│                                                                     │
│  BACKGROUND:                                                        │
│  ├─ Base: dark (neutral-950)                                        │
│  ├─ Mesh gradient radials (amber + teal, very subtle)              │
│  ├─ Particle field (see 2.5)                                        │
│  ├─ Optional: subtle grid lines (CSS bg-image, opacity 0.03)       │
│  └─ Scanline overlay animation (optional, very subtle)              │
│                                                                     │
│  TYPOGRAPHY:                                                        │
│  ├─ Eyebrow badge: "NEW SEASON / UPDATE" style Solo Leveling badge  │
│  │   → blue glow, monospace font, animate in first                  │
│  ├─ H1: Split into characters, stagger reveal (see 2.2)            │
│  ├─ Accent word: gradient text (amber→teal) + glow on hover        │
│  └─ Subtitle: typewriter effect (optional) or simple fadeIn        │
│                                                                     │
│  CTA BUTTON (Primary):                                              │
│  ├─ onClick: arise.mp3 + particle burst (see 2.5)                  │
│  ├─ Hover: translateY(-2px) + shadow expands + glow                │
│  └─ Pulse ring animation at rest (attention-grabbing)               │
│                                                                     │
│  SCROLL INDICATOR:                                                  │
│  ├─ Animated mouse/arrow icon                                       │
│  ├─ Bounce animation (infinite, subtle)                             │
│  └─ Fades out after user scrolls 100px                             │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.3 — Features / About Section

```
┌─────────────────────────────────────────────────────────────────────┐
│                      FEATURES SECTION                               │
│                                                                     │
│  LAYOUT: Grid of feature cards OR horizontal scroll                │
│                                                                     │
│  SECTION ENTRY:                                                     │
│  ├─ Heading: Pattern C (line-by-line clip reveal)                  │
│  ├─ Cards: Pattern B (stagger, shadow-army.mp3)                    │
│  └─ Section bg shifts to slightly lighter tone                      │
│                                                                     │
│  FEATURE CARDS:                                                     │
│  ├─ At rest: subtle border glow (amber, very dim)                  │
│  ├─ Hover:                                                          │
│  │   ├─ Card lifts: translateY(-4px)                               │
│  │   ├─ Border glow intensifies                                     │
│  │   ├─ Icon animates (rotation, bounce, or glow)                  │
│  │   ├─ Particle trail on mouse move within card                   │
│  │   └─ ui-hover.mp3 (once per card entry)                         │
│  └─ Content: icon → heading → body → link (each on own delay)     │
│                                                                     │
│  ICON ANIMATION:                                                    │
│  ├─ Idle: slow float (translateY -4px → 4px, 3s loop)             │
│  ├─ Hover: spin once or bounce (depends on icon type)              │
│  └─ Reveal: scale(0)→scale(1) with spring easing                   │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.4 — Stats / Achievement Section

```
┌─────────────────────────────────────────────────────────────────────┐
│                    STATS / NUMBERS SECTION                          │
│  (The "Level Up" moment of the page)                                │
│                                                                     │
│  CONCEPT: Styled like a Solo Leveling "Status Window"               │
│  ├─ Semi-transparent dark panel, blue/amber border glow            │
│  ├─ Grid lines in background                                        │
│  ├─ Header: "[ STATUS WINDOW ]" in monospace                       │
│  └─ Stats listed like RPG character sheet                           │
│                                                                     │
│  ON SCROLL INTO VIEW:                                               │
│  ├─ rank-up.mp3 plays                                               │
│  ├─ Panel flickers in (glitch effect, 200ms)                       │
│  ├─ Each stat row reveals with Pattern A (stagger 150ms)           │
│  ├─ Numbers count up (Pattern D) with mana-fill.mp3               │
│  └─ Completion: brief amber flash across the whole panel           │
│                                                                     │
│  PROGRESS BARS (if used):                                           │
│  ├─ Fill from 0%→target on scroll trigger                          │
│  ├─ Color: gradient amber→teal                                      │
│  ├─ Glow on the fill edge                                           │
│  └─ mana-fill.mp3 during fill                                       │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.5 — Pricing Section

```
┌─────────────────────────────────────────────────────────────────────┐
│                       PRICING SECTION                               │
│                                                                     │
│  CARDS:                                                             │
│  ├─ Entry: Pattern B stagger                                        │
│  ├─ Featured/Popular card:                                          │
│  │   ├─ Scale slightly larger (1.03)                               │
│  │   ├─ Glowing border (amber, animated pulse)                     │
│  │   └─ "RECOMMENDED" badge with shimmer animation                  │
│  │                                                                  │
│  ├─ Hover: rank-up.mp3 + card lift + border brightens             │
│  └─ CTA click: arise.mp3 (it's the most important action)          │
│                                                                     │
│  TOGGLE (monthly/annual):                                           │
│  ├─ Smooth price number morph (CountUp animation)                  │
│  ├─ skill-use.mp3 on toggle                                         │
│  └─ "SAVE X%" badge pops in with spring animation                  │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.6 — Testimonials Section

```
┌─────────────────────────────────────────────────────────────────────┐
│                    TESTIMONIALS SECTION                             │
│                                                                     │
│  LAYOUT: Auto-scrolling carousel (pause on hover)                  │
│          OR masonry grid with stagger reveal                        │
│                                                                     │
│  MARQUEE ROW (zero.university style):                               │
│  ├─ Two rows, moving in opposite directions                         │
│  ├─ Speed: 30s per loop                                             │
│  ├─ Pause on hover (entire row pauses)                             │
│  └─ Fade edges: CSS mask-image gradient                             │
│                                                                     │
│  CARD HOVER:                                                        │
│  ├─ Scale: 1.02                                                     │
│  ├─ Shadow intensifies                                               │
│  ├─ ui-hover.mp3 (very subtle)                                      │
│  └─ Avatar: gentle glow ring appears                                │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.7 — Footer

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FOOTER                                      │
│                                                                     │
│  ENTRY: All ambient audio fades out completely                      │
│                                                                     │
│  LOGO: Large, ghost/outline style — fades in last                  │
│                                                                     │
│  LINKS:                                                             │
│  ├─ Hover: underline slide-in + ui-hover.mp3                       │
│  └─ Social icons: rotate 10deg + scale on hover                    │
│                                                                     │
│  EASTER EGG (bottom of page):                                       │
│  ├─ Tiny hidden text or symbol                                      │
│  ├─ Click it: plays arise.mp3 at full volume                        │
│  ├─ Triggers full-screen particle burst                             │
│  └─ Shows "YOU HAVE REACHED THE BOTTOM. ARISE." message            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Part 4 — Special Interaction Patterns

### 4.1 — Glitch Effect

```css
/* Apply to headings or logo for Solo Leveling aesthetic */
@keyframes glitch {
  0%   { clip-path: inset(20% 0 60% 0); transform: translate(-4px, 0); }
  20%  { clip-path: inset(70% 0 5%  0); transform: translate(4px,  0); }
  40%  { clip-path: inset(40% 0 40% 0); transform: translate(-2px, 0); }
  60%  { clip-path: inset(5%  0 70% 0); transform: translate(2px,  0); }
  80%  { clip-path: inset(55% 0 25% 0); transform: translate(-4px, 0); }
  100% { clip-path: inset(0%  0 0%  0); transform: translate(0,    0); }
}

/* Usage: trigger on hover or at specific scroll points */
/* Plays for 300ms then stops — don't loop constantly */
```

### 4.2 — Text Scramble Effect

```
TRIGGER: Section headings as they scroll into view
LIBRARY: Custom JS or textillate.js

BEHAVIOR:
├─ Characters randomize through symbols: █ ▓ ▒ ░ # @ % &
├─ Duration: 600ms total
├─ Each character settles into correct letter sequentially
├─ Easing: characters at start resolve faster than end
└─ SFX: system-alert.mp3 at very low volume during scramble
```

### 4.3 — Magnetic Buttons

```
BEHAVIOR:
├─ CTA buttons attract cursor within 80px radius
├─ Button content moves toward cursor (max 12px offset)
├─ On mouse leave: spring back to center (spring easing)
├─ Implementation: track mousemove, lerp button position
└─ Only apply to PRIMARY CTAs (2-3 max on page)
```

### 4.4 — Scroll Progress Indicator

```
┌─────────────────────────────────────────────────────────────────────┐
│  SCROLL PROGRESS BAR                                                │
│                                                                     │
│  ├─ Position: top of viewport, full width, h: 2px                  │
│  ├─ Color: gradient amber→teal (left to right)                     │
│  ├─ Glow: box-shadow matching color                                 │
│  ├─ Updates: every scroll event (throttled 16ms)                    │
│  └─ Disappears after reaching 100% (fades out in 500ms)            │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.5 — Section Transition Wipes

```
BETWEEN MAJOR SECTIONS:
├─ Diagonal wipe: dark panel slides across at section boundary
├─ Triggered by ScrollTrigger at exact section-end threshold
├─ Duration: 400ms
├─ Acts as visual "chapter break" (ref: why.zero.university)
└─ gate-open.mp3 plays during wipe

IMPLEMENTATION:
├─ Absolutely positioned div over section boundary
├─ clipPath animates: "polygon(0 0,0 0,0 100%,0 100%)"
│                   → "polygon(0 0,100% 0,100% 100%,0 100%)"
│                   → "polygon(100% 0,100% 0,100% 100%,100% 100%)"
└─ Three-phase: in → hold 100ms → out
```

---

## Part 5 — Technical Implementation Stack

```
┌─────────────────────────────────────────────────────────────────────┐
│                    RECOMMENDED LIBRARIES                            │
├──────────────────────────┬──────────────────────────────────────────┤
│  LIBRARY                 │  PURPOSE                                 │
├──────────────────────────┼──────────────────────────────────────────┤
│  GSAP + ScrollTrigger    │  All scroll animations, timelines        │
│  npm install gsap        │  Industry gold standard                  │
├──────────────────────────┼──────────────────────────────────────────┤
│  Howler.js               │  Audio engine, sprite sheets, volume     │
│  npm install howler      │                                          │
├──────────────────────────┼──────────────────────────────────────────┤
│  tsParticles             │  Particle systems, burst effects         │
│  npm install tsparticles │                                          │
├──────────────────────────┼──────────────────────────────────────────┤
│  Lenis                   │  Smooth scroll (replaces native scroll)  │
│  npm install lenis       │  Ref: both zero.university sites use it  │
├──────────────────────────┼──────────────────────────────────────────┤
│  SplitType               │  Split text into chars/words/lines       │
│  npm install split-type  │  Required for char animations            │
├──────────────────────────┼──────────────────────────────────────────┤
│  CountUp.js              │  Animated number counting                │
│  npm install countup.js  │                                          │
└──────────────────────────┴──────────────────────────────────────────┘
```

### 5.1 — Performance Rules

```
┌─────────────────────────────────────────────────────────────────────┐
│                     PERFORMANCE GUARDRAILS                          │
│                                                                     │
│  ├─ All animations use transform + opacity ONLY                    │
│  │   (never animate width, height, top, left, margin)              │
│  ├─ Add will-change: transform to animated elements                │
│  ├─ Particle count caps at 80 desktop / 30 mobile                 │
│  ├─ Disable particles on reduced-motion preference                 │
│  ├─ Audio files: max 200KB each (compress mp3 to 128kbps)         │
│  ├─ Lazy load audio: don't fetch until first interaction           │
│  ├─ Use IntersectionObserver over scroll event listeners           │
│  └─ Test on mid-range Android: if choppy, reduce particle count    │
└─────────────────────────────────────────────────────────────────────┘
```

