# Task: Implement a Scroll‑Scrubbed Video Hero Section for Shadow Level

## Context
I have a video file located at:
`public/videos/hero_sequence.mp4`  
(If the path differs, update accordingly.)

This video contains a cinematic character sequence (e.g., the Solo Leveling‑style dungeon gate or character intro). I want to use it as the centerpiece of a new hero section, placed **before** the dashboard route, so that when users land on the app they see this immersive, scroll‑driven experience.

The hero section must:
- Extract frames from the video using **FFmpeg** (I already have FFmpeg installed).
- Display those frames on an HTML5 Canvas, scrubbing through them based on the user’s scroll progress.
- Overlay dynamic, real‑time stats from the user’s profile (level, XP, streak, rank, completed habits, reward points, etc.) that fade/translate in sync with specific scroll positions.
- Be fully responsive and performant (preload frames, use `requestAnimationFrame`, etc.).
- Integrate seamlessly with the existing React + TanStack Router + Zustand setup.

## Step‑by‑Step Instructions

### 1. Frame Extraction (FFmpeg)
- Use FFmpeg to extract frames from `public/videos/hero_sequence.mp4` into `public/frames/hero/` with a naming pattern like `frame_%03d.jpg`.
- Use a reasonable frame rate (e.g., 24 fps) to keep the total frame count manageable (aim for ~100‑150 frames for smooth scrolling).
- Example command:
  ```bash
  ffmpeg -i public/videos/hero_sequence.mp4 -vf "fps=24,scale=1920:-1" public/frames/hero/frame_%03d.jpg
Ensure the frames are preloaded or lazy‑loaded when the component mounts.

2. Create the Hero Component
Create a new file: src/components/HeroSection.tsx.

It should:

Use a useRef for the canvas.

Load the frame images (e.g., via Image objects or fetch).

Listen to scroll events (or use useScroll from framer-motion) to compute a progress value (0‑1).

Draw the corresponding frame on the canvas based on progress.

Reference: You can reuse the logic from src/components/InteractiveLanding.tsx (the ScrollScrubGate function) as a template.

3. Stats Overlay
Position the stats over the canvas using absolute positioned HTML elements (divs with Tailwind classes).

The stats to display:

Level (from useProfile())

XP / Total XP (and progress to next level)

Current Streak

Rank (e.g., “Shadow Recruit” → “Dungeon Master”)

Habits Completed Today

Reward Points (from useRewards())

Each stat should appear at a different scroll threshold:

0‑20%: Level & XP fade in.

20‑40%: Streak & Rank appear.

40‑60%: Habits completed today.

60‑80%: Reward points.

80‑100%: A final summary card.

Use framer-motion or CSS transitions with opacity and transform based on the same scroll progress.

4. Integration with Routing
Place the new <HeroSection /> component before the dashboard route. You can either:

Add it to the existing dashboard route (above the current dashboard content) so that users see it first when they log in.

Or create a separate landing page route (/hero) that redirects to dashboard after scrolling to the bottom (but the simpler approach is to prepend it to the dashboard).

5. Performance & Best Practices
Use useMemo and useCallback where necessary.

Preload all frame images in a useEffect after mount.

Use will-change: transform on the canvas.

Dispose of images and cancel animation frames on unmount.

6. Code Structure
The component should fetch profile and habit data via the existing hooks (useProfile, useHabits, useRewards).

Use the useAppStore for global audio settings (if needed for background audio).

Deliverable
A fully functional hero section that replaces the current blank landing or sits before the dashboard.

The video frames are extracted and used as a scroll‑scrubbed animation.

All stats are displayed accurately and update reactively.

Clean, well‑commented code following the project’s existing style.

Additional Notes
The video file might be large; consider using a compressed version or resizing frames to reduce load.

If FFmpeg is not installed, I can install it via apt-get install ffmpeg (on Ubuntu) or brew install ffmpeg (macOS) – but assume it’s already available.

You can test the scroll scrub with a mock array of frames first if the extraction takes time.

The existing InteractiveLanding.tsx already has a ScrollScrubGate that uses canvas – you can copy that component and adapt it.