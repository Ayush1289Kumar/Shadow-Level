# Shadow Level — Audio, SFX & Interactive Animation Specification
**Version:** 1.0 | **Theme:** Solo Leveling (Sung Jin-Woo / Arise from the Shadow)  
**Inspiration References:**  
- https://why.zero.university/ (minimal, atmospheric, number-focused, elegant restraint)  
- https://www.zero.university/ (premium dark aesthetic, subtle logo morphs, high-end feel)  
**Core Philosophy:** 95% Visual Calm + 5% Visual Intensity (from existing design system).  
Sounds should feel *expensive*, cinematic, and never spammy. Prefer short, punchy, high-quality clips with proper volume ducking and cooldown.

---

## 1. Audio Architecture & Implementation Rules

### Tech Stack (use what you already have)
- Prefer **Howler.js** or native `Audio` + Web Audio API for precise control.
- Global Audio Manager (create `src/lib/audio.ts` or `src/hooks/useAudio.ts`).
- Features required:
  - Master volume + category volumes (SFX / UI / Ambient / Voice)
  - Mute toggle (persist in Zustand store)
  - Preload critical sounds on app start
  - Respect `prefers-reduced-motion` → reduce or disable non-essential SFX
  - Cooldown system (prevent spam on rapid clicks)
  - Spatial / stereo panning for key moments (optional but cool)

### Folder Structure (recommended)
public/audio/
├── sfx/
│   ├── arise.mp3                  # Classic "Arise" voice + extraction
│   ├── level-up.mp3               # Full level-up fanfare + system sound
│   ├── habit-complete.mp3         # Satisfying quest clear
│   ├── quest-accept.mp3
│   ├── reward-claim.mp3
│   ├── button-click.mp3           # Soft UI click
│   ├── hover.mp3                  # Subtle hover whoosh
│   ├── error.mp3
│   ├── success.mp3
│   ├── shadow-extract.mp3         # Shadow army summon
│   ├── dungeon-enter.mp3
│   ├── rank-up.mp3
│   ├── streak.mp3
│   └── ui/
│       ├── nav-switch.mp3
│       ├── modal-open.mp3
│       └── modal-close.mp3
├── ambient/
│   ├── dashboard-loop.mp3         # Very low volume dark ambient (optional)
│   └── level-up-cinematic.mp3
└── voice/
└── jinwoo-arise.mp3           # Sung Jin-Woo "Arise" (dub preferred)

**Assumption:** You already have the Solo Leveling SFX pack installed. Map the existing files to the names above (or keep original names and alias them).

---

## 2. Sound Mapping — Where & When to Play

### Critical Moments (Highest Priority)

| Trigger                              | Sound File                  | Volume | Notes / Animation Sync |
|--------------------------------------|-----------------------------|--------|------------------------|
| **Level Up** (any level)            | `arise.mp3` + `level-up.mp3`| 0.85   | Play Arise first → then fanfare. Sync with LevelUpSequence cinematic |
| Level Up Sequence starts            | `level-up-cinematic.mp3`    | 0.7    | Ambient swell |
| Shadow Extraction / Shadow Army     | `shadow-extract.mp3` + Arise| 0.9    | When user "raises" a shadow soldier |
| Habit / Quest Completed             | `habit-complete.mp3`        | 0.7    | Satisfying "quest clear" chime + subtle particle burst |
| First habit of the day / Streak     | `streak.mp3`                | 0.75   | Slightly more epic |
| Reward Purchased / Claimed          | `reward-claim.mp3`          | 0.7    | Coin + magical acquire |
| Rank Up (E → D → C etc.)            | `rank-up.mp3`               | 0.8    | Stronger than normal level up |
| Dungeon Raid Start                  | `dungeon-enter.mp3`         | 0.8    | Dark portal whoosh |
| Stat Allocation Confirm             | `success.mp3`               | 0.6    | Soft confirmation |

### UI / Micro-Interactions (Keep Subtle)

| Trigger                    | Sound                  | Volume | Notes |
|---------------------------|------------------------|--------|-------|
| Button primary click      | `button-click.mp3`     | 0.4    | Soft, premium click |
| Secondary / ghost button  | lighter version        | 0.3    | Even softer |
| Hover on important cards  | `hover.mp3`            | 0.25   | Very quiet airy whoosh (only on desktop) |
| Navigation tab switch     | `nav-switch.mp3`       | 0.35   | Short swipe |
| Modal / Sheet open        | `modal-open.mp3`       | 0.4    | Soft rise |
| Modal close               | `modal-close.mp3`      | 0.35   | Soft fall |
| Form success / save       | `success.mp3`          | 0.5    | |
| Error / validation fail   | `error.mp3`            | 0.5    | Soft negative |
| Toggle (switch, checkbox) | very light click       | 0.3    | |

### Ambient (Optional but Atmospheric)
- Dashboard idle: extremely low volume dark ambient loop (fade in after 3s of inactivity).
- Level-up screen: cinematic swell that ducks other sounds.

---

## 3. Interactive Animations & Micro-Interactions

Inspired by zero.university’s restraint + Solo Leveling’s weighty, powerful feel.

### Global Principles
- Use **Framer Motion** (already in the project) + existing `tw-animate-css`.
- Prefer GPU-safe properties (`transform`, `opacity`, `filter`).
- Respect `prefers-reduced-motion`.
- Combine sound + visual for maximum dopamine (but never let sound play without visual feedback).

### Key Animation Specs

1. **LevelUpSequence (Highest Priority)**
   - Full-screen cinematic overlay (already exists).
   - Sequence:
     1. Screen darkens + heavy blur
     2. Arise voice plays + black particles / shadow tendrils rise from bottom
     3. Level number morphs with glitch (use existing CyberGlitchText / MorphText)
     4. Exp bar fills with intense glow + particles
     5. Rank badge appears with impact
     6. Confetti / shadow army silhouettes (canvas-confetti already present)
   - Duration: 3.5–5 seconds total. Allow skip after 1.5s.

2. **HabitCard Completion**
   - Checkbox → satisfying scale + checkmark draw
   - Card briefly glows purple/cyan (brand colors)
   - Subtle particle burst from the card
   - Slight upward float + opacity pulse
   - Sound: `habit-complete.mp3`

3. **Floating Island Navigation (AppNav)**
   - Active tab: soft glow + slight scale
   - Switch: short horizontal swipe animation + `nav-switch.mp3`
   - Hover: gentle lift + soft hover sound

4. **ExpBar / LevelProgress**
   - Fill animation with slight overshoot
   - When near level-up: intensifying glow pulse
   - On level-up: dramatic fill + explosion into LevelUpSequence

5. **Reward Cards / Shop**
   - Hover: double-bezel lift + soft hover sound
   - Purchase: card flies toward inventory / player avatar + claim sound

6. **Stat Allocation**
   - Points flying from available pool into stat bars
   - Confirm: strong success sound + screen flash

7. **Shadow Army / Dungeon Raid**
   - Cards have dark particle trails
   - Summon animation: shadows rise from ground + Arise sound

8. **Global Hover & Focus**
   - Important interactive elements get a soft outer glow (brand purple/cyan)
   - Focus rings must remain accessible

9. **Page Transitions**
   - Soft fade + slight scale or vertical slide (keep under 300ms)
   - Use Lenis smooth scroll (already present)

---

## 4. Implementation Checklist for the Coding Agent

### Phase 1 — Foundation
- [ ] Create `src/lib/audio.ts` (or use-audio hook) with preload, volume control, mute, cooldown
- [ ] Add audio files to `public/audio/` (map existing Solo Leveling assets)
- [ ] Add mute button in settings / profile (persist via Zustand)
- [ ] Respect reduced-motion and mobile (disable hover sounds on touch)

### Phase 2 — Critical Sounds
- [ ] Wire Arise + Level-up into `LevelUpSequence.tsx`
- [ ] Habit complete sound + animation in `HabitCard.tsx`
- [ ] Reward claim sound
- [ ] Rank-up detection + sound

### Phase 3 — Polish & Micro-Interactions
- [ ] Button / nav / modal sounds
- [ ] Hover sounds (desktop only)
- [ ] Ambient layer (optional)
- [ ] Volume ducking during cinematic sequences

### Phase 4 — Quality Pass
- [ ] Test on low-end devices (sounds should not cause jank)
- [ ] Volume balancing (UI sounds quieter than cinematic)
- [ ] No overlapping critical sounds
- [ ] Accessibility: visual feedback always present even if muted

---

## 5. Recommended Sound Character (Solo Leveling DNA)

- **Arise**: Deep, commanding, slightly processed male voice + heavy reverb + low-end impact
- **Level-up**: Orchestral swell + system UI chime + particle whoosh
- **Quest Complete**: Clean, satisfying, slightly magical “ding” with short tail
- **UI clicks**: Soft, expensive, never plastic-sounding
- Overall mix: Dark, cinematic, weighty. Avoid bright anime “sparkle” spam.

---

## 6. Final Notes for the Coding Agent

- Keep the visual language of the existing design system (double-bezel, glow discipline, dark void backgrounds).
- Draw inspiration from zero.university’s *restraint* — fewer, higher-quality interactions beat many noisy ones.
- Every sound must have a matching visual reaction.
- Make the Level-Up moment feel like a *real* Solo Leveling power-up.
- Prioritize mobile performance and battery (don’t keep audio contexts running unnecessarily).

Deliver the implementation in small, reviewable PRs if possible.  
Start with the Audio Manager + LevelUpSequence integration — that delivers the highest “wow” factor immediately.

---

**End of Specification**  
This document is ready to be handed to any coding agent.