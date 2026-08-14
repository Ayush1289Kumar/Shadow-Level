# ⚔️ Shadow Level — RPG Habit Tracker

**Shadow Level** is a gamified habit tracker inspired by the _Solo Leveling_ anime/manhwa. It transforms your daily routines into a cinematic RPG experience — completing habits earns EXP, levels you up, builds your shadow army, and unlocks rewards.

[![Live Demo](https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://shadow-level-alpha.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-97.9%25-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **🌐 Live Demo**: [https://shadow-level-alpha.vercel.app/](https://shadow-level-alpha.vercel.app/)

---

## ✨ Features

- **🎮 RPG Progression** — Earn EXP, level up, allocate stats, and climb from E-Rank to S-Rank Hunter based on streaks.
- **🎨 Multi-Theme Support** — 4 distinct palettes: Shadow Level (default), Mystic Nebula, Crimson Moon, and Deep Forest. All CSS-variable driven.
- **✅ Habit Tracking** — Create **Positive** habits (gain EXP) and **Negative** habits (lose EXP) with real-time updates.
- **🔥 Streak System** — Daily streak tracking with rank promotions at key milestones.
- **⚠️ Penalty Zone** — Fail to complete 75% of daily habits? Face a custom penalty you define yourself.
- **🎁 Reward Shop** — Spend EXP on self-defined rewards. Purchases are permanent — no refunds!
- **👤 Shareable Profile** — Public profile card at `/profile/[username]` with level, rank, EXP, streak, and avatar.
- **🖼️ Custom Avatar** — Upload a character image stored as a data URL in localStorage.
- **🔊 Cinematic Audio System** — Web Audio API engine with per-category volume mixing, cooldown gating, decoded AudioBuffer playback (bypasses Chrome/Edge autoplay restrictions), and synthesizer fallbacks when audio files are absent.
- **🌐 Interactive Landing Page** — Cinematic loader, Three.js 3D dungeon gate portal, custom cursor, scroll-driven parallax, magnetic CTA buttons, slow scramble text animation, and section-locked audio.
- **📱 Fully Responsive** — Desktop sidebar/top nav + mobile bottom navigation with layout toggle.
- **🔐 Privacy-First Auth** — Local email/password auth using `localStorage` + client-side SHA-256 hashing. No external server, no cookies, no tokens.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Frontend Framework** | React 19 + TypeScript |
| **Routing** | TanStack Router (file-based) |
| **State Management** | Zustand |
| **Styling** | Tailwind CSS 4 + shadcn/ui |
| **Animations / Scroll** | Framer Motion + Lenis Smooth Scroll |
| **3D Graphics** | Three.js (landing page portal) |
| **Notifications** | Sonner (Cyber Glitch Theme) |
| **Audio Engine** | Web Audio API + HTML5 Audio fallback (`src/lib/audio.ts`) |
| **Data Storage** | localStorage (`src/lib/local-db.ts`) — no backend |
| **Build Tool** | Vite |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
Shadow-Level/
├── public/
│   ├── audio/
│   │   ├── sfx/           # Sound effects (arise, level-up, habit-complete…)
│   │   │   └── ui/        # UI sounds (nav-switch, modal-open, modal-close)
│   │   ├── ambient/       # Ambient/cinematic tracks
│   │   └── voice/         # Voice clips (jinwoo-arise)
│   └── frames/            # Animation frame assets
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui primitives
│   │   ├── InteractiveLanding.tsx # Cinematic landing page (Three.js, parallax, scramble text)
│   │   ├── AppNav.tsx             # Sidebar + mobile nav with layout toggle
│   │   ├── ExpBar.tsx             # Gradient EXP progress bar
│   │   ├── HabitCard.tsx          # Quest card with hover glow
│   │   ├── LevelProgress.tsx      # Level / Rank / EXP display
│   │   ├── LevelUpSequence.tsx    # Cinematic level-up overlay
│   │   ├── RankBadge.tsx          # E → S rank visualizer
│   │   ├── RequireAuth.tsx        # Protected route wrapper
│   │   └── ThemeProvider.tsx      # CSS-variable theme injection
│   ├── lib/
│   │   ├── audio.ts       # Audio Manager (Web Audio API, buffer cache, synthesizer)
│   │   ├── local-db.ts    # All CRUD (profiles, habits, logs, rewards)
│   │   ├── store.ts       # Zustand global state
│   │   ├── leveling.ts    # EXP/level formulas
│   │   ├── profile.ts     # EXP delta & streak computation
│   │   └── strings.ts     # All UI copy strings
│   ├── routes/
│   │   ├── __root.tsx     # Root layout
│   │   ├── index.tsx      # Landing page (renders InteractiveLanding)
│   │   ├── auth.tsx       # Login / Sign-up
│   │   ├── dashboard.tsx  # Main dashboard
│   │   ├── habits.tsx     # Habit CRUD
│   │   ├── rewards.tsx    # Reward shop
│   │   ├── me.tsx         # Personal profile & settings
│   │   └── profile.$username.tsx  # Public profile card
│   ├── hooks/
│   │   └── queries.ts     # Data-fetching hooks
│   ├── styles.css         # Global CSS variables, themes, utilities
│   └── main.tsx           # App entry point
├── docs/                  # Project documentation
├── .agents/               # Agent workflows & rules
├── vite.config.ts
├── tsconfig.json
└── vercel.json            # SPA routing config
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm

### 1. Clone the Repository
```bash
git clone https://github.com/Ayush1289Kumar/Shadow-Level.git
cd Shadow-Level
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
The app will be available at **http://localhost:5173**.

> No environment variables or external services required — everything runs in the browser.

---

## 🔊 Audio System

Shadow Level ships a custom audio engine at [`src/lib/audio.ts`](src/lib/audio.ts):

- **Shared AudioContext singleton** — One context reused for all sounds; eliminates Chrome/Edge "suspended" state bugs from creating new contexts per sound.
- **Web Audio API buffer playback** — Files are `fetch`-decoded into `AudioBuffer` and played via `BufferSourceNode`, bypassing `HTMLAudioElement.play()` autoplay restrictions.
- **Per-category volume mixing** — `sfx`, `ui`, `ambient`, `voice` channels each have independent volume controls.
- **Cooldown gating** — Prevents the same sound from spamming (configurable per key).
- **Synthesizer fallback** — If a real MP3 is missing, a matching synthesized sound plays via the Web Audio API oscillators/noise.
- **Custom overrides** — Drop any MP3 into `public/audio/sfx/` (e.g. `rank-up.mp3`) and it automatically takes precedence over the synthesizer.

---

## 🎮 Game Mechanics

### EXP & Leveling
- Positive habits → Earn EXP when checked
- Negative habits → Lose EXP when checked (punishment)
- **Level formula**: `Level = floor(sqrt(total_exp / 100)) + 1`
- Level-up triggers the cinematic **ARISE** sequence

### Streak System
- Complete at least one positive habit daily to maintain your streak
- Missing a day resets your streak to 0
- Streak milestones unlock Rank promotions (E → D → C → B → A → S)

### Penalty Zone
- Complete fewer than 75% of your daily habits → enter Penalty Zone the next day
- Must complete a custom penalty you define in Profile Settings to proceed
- Inspired by the System's punishments from Solo Leveling

### Reward Shop
- Spend EXP to purchase self-defined rewards
- No refunds — purchases are permanent and displayed with a badge

---

## 🚢 Deployment

The live application is deployed to Vercel:
👉 **https://shadow-level-alpha.vercel.app/**

### Deploy to Vercel
1. Push your code to GitHub
2. Import the repository at [vercel.com](https://vercel.com)
3. No environment variables needed — it's a fully client-side app
4. Deploy!

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by the *Solo Leveling* anime and manhwa by Chugong
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- 3D graphics via [Three.js](https://threejs.org/)
- Smooth scrolling by [Lenis](https://lenis.darkroom.engineering/)

Made with ❤️ by Ayush Kumar
