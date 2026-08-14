# Implementation Plan — Gemini AI Frame-Scrubbed Dungeon Gate

We will use **Google Gemini Imagen** to generate a 100-frame cinematic opening sequence showing a dungeon gate from far away zooming into the vortex core. These AI-generated frames are then used as keyframes for an **Apple-style scroll-scrubbed canvas** where the user scrolls to "enter" the dungeon.

---

## Visual Direction

The 3 key frames below define the camera trajectory:

![Frame 1 — Distant View](C:/Users/Ayush Kumar/.gemini/antigravity-ide/brain/93e5c557-b325-40d5-bafe-3aef0a54a438/dungeon_gate_frame_1_1786734177937.jpg)
![Frame 50 — Mid Approach](C:/Users/Ayush Kumar/.gemini/antigravity-ide/brain/93e5c557-b325-40d5-bafe-3aef0a54a438/dungeon_gate_frame_mid_1786734201691.jpg)
![Frame 100 — Portal Entry](C:/Users/Ayush Kumar/.gemini/antigravity-ide/brain/93e5c557-b325-40d5-bafe-3aef0a54a438/dungeon_gate_frame_entry_1786734216089.jpg)

> [!IMPORTANT]
> We have only 3 keyframes generated so far. The full pipeline will generate all 100 using a Node.js script with the `@google/genai` SDK and prompt interpolation.

---

## Phase 1 — AI Frame Generation (Node.js script)

### [NEW] `scripts/generate-frames.mjs`
A one-time Node script you run locally with your `GEMINI_API_KEY`:
- Generates 100 frames via `gemini-2.0-flash-preview-image-generation` using prompt interpolation — starts at "distant gate in void" and progresses to "full portal immersion".
- Writes each frame to `public/frames/frame_XXX.jpg`.
- Throttles to 5 req/sec to stay within rate limits.
- Accepts `--start` and `--end` flags to resume partial runs.

**Prompts architecture:**
| Frame range | Camera position | Key visual |
|---|---|---|
| 001–025 | Far — gate is small circle in black void | Dark mist, god rays, rune glow |
| 026–050 | Approaching — gate fills 50% frame | Shadow tendrils, rune detail |
| 051–075 | Close — gate fills 80% frame, rim visible | Overwhelming vortex, shadow wisps |
| 076–100 | Inside — full vortex immersion | Rune streaks, blinding core, pure energy |

---

## Phase 2 — Canvas Scroll Scrubber

### [MODIFY] [`InteractiveLanding.tsx`](file:///d:/Vibe%20Coding/Projects/Shadow-Level/src/components/InteractiveLanding.tsx)

Replace `ThreeDungeonGate` with `<ScrollScrubGate />`:
- Mounts a `position:sticky; height:100vh` canvas inside a tall `350vh` scroll container — **exactly how your portfolio does it**.
- Preloads all 100 frames as `Image` objects on mount.
- Uses `window.scrollY` + container offset to compute `frameIndex = Math.floor(progress * 99)`.
- `requestAnimationFrame` loop draws the current frame onto the canvas.
- Text overlays (Hero title, "Arise Hunter", CTAs) fade in/out at scroll checkpoints using `IntersectionObserver`.
- Mouse parallax tilts the canvas via `CSS transform: perspective(900px) rotateX() rotateY()`.

---

## Phase 3 — Documentation & Graph Update

### [MODIFY] `docs/aren_interactive.md`
- Add new section documenting the Imagen frame generation pipeline and frame naming conventions.

### Run `graphify update .` after all code changes.

---

## Verification Plan

### Automated
- `npm run build` must exit 0.

### Manual
- Run `node scripts/generate-frames.mjs` (requires `GEMINI_API_KEY` env var).
- Verify frames appear in `public/frames/`.
- Open `localhost:5173`, confirm scroll scrubbing through dungeon gate works.

---

## Open Questions

> [!IMPORTANT]
> **Do you have a Gemini API key ready to provide?** The frame generation script needs `GEMINI_API_KEY` set in your `.env` file to call the Imagen API. Without it, we can still implement the canvas scrubber using the 3 existing keyframes as a demo, and you can run the full frame generation later.
