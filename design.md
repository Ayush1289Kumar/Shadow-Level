# Shadow Level Design System

This document outlines the core design principles, typography, semantic color palette, and custom utility classes used throughout the **Shadow Level** project. It serves as a single source of truth for the project's premium, RPG-inspired aesthetics.

## Design Philosophy
**Shadow Level** is a gamified habit tracker inspired by RPG progression systems. The design is intended to feel **premium, dark, and system-like**, turning the discipline of habit building into an engaging personal progression interface. 
* **95% visual calm + 5% visual intensity**: The interface focuses on hierarchy and readability. The intensity appears primarily when the user accomplishes something meaningful.

### Key Pillars
- **Dark & Atmospheric**: A predominantly dark mode design with deep blacks, very dark indigos, and subtle glowing highlights.
- **Glassmorphism**: Selective use of blurred, translucent backgrounds to give a modern, layered depth to the UI without overwhelming nested containers.
- **Strict Hierarchy**: Priority is placed on Level, XP, Daily Progress, and Streaks.
- **Meaningful Animation**: Animations communicate state changes and achievements (micro-interactions for hover, stronger animations for level-ups).
- **RPG Elements**: Terminology (Quest, XP, Rank) and visual rewards (subtle glows, progress bars) rather than cartoonish game clones.

## Typography
The project relies on two Google Fonts with strict responsibilities:

- **Headings & Display (`font-display`)**: `Cinzel`
  - *Usage*: Shadow Level branding, major level numbers, ranks, major achievement titles, and cinematic headers. Not for general UI.
- **Body & UI (`font-sans`)**: `Montserrat`
  - *Usage*: Navigation, buttons, labels, habit names, stats, and metadata. Clean, modern, and highly legible against dark backgrounds.

## Semantic Color Palette
The color variables are defined in `src/styles.css` using Tailwind v4's theme integration and semantic CSS variables.

| Role | Color / Purpose | CSS Variable | 
| --- | --- | --- |
| **Background** | Deep Black / Atmospheric | `--background` |
| **Surface** | Dark data containers | `--surface` |
| **Text Primary** | High-priority text | `--text-primary` |
| **Primary** | Electric Blue (Brand/Action) | `--primary` |
| **Accent** | Shadow Purple (Secondary) | `--accent` |
| **Success** | Emerald (Completed habits) | `--success` |
| **Danger** | Blood Red (Warnings/Failures) | `--danger` |
| **Warning** | Amber (Alerts) | `--warning` |

*Glow Effects* are also defined for these colors to emphasize interactive or important elements (e.g., `--color-glow-primary`). Blood Red (`--danger`) is strictly used for negative changes and failed states, not as a general brand accent.

## Custom Utilities & Components
The following custom utilities are defined in `styles.css` and are crucial to the aesthetic:

### Glassmorphism Surfaces
- `surface`: Solid, dark surface for dense data, lists, and forms.
- `glass`: A standard blurred background. Used for cards, floating navigation, and secondary panels.
- `glass-strong`: A stronger glass effect featuring a linear gradient from Electric Blue to Shadow Purple. Used *only* for featured content, level-up notifications, and major achievements.

### Glow Effects
- `text-glow-primary`, `text-glow-accent`, `text-glow-danger`, `text-glow-success`: Adds controlled glowing shadows to text for important progression moments.

### Backgrounds
- `bg-monarch-radial`: A highly subdued, slow-moving atmospheric background featuring a mix of radial gradients. It flows continuously over 30 seconds, maintaining 95% visual calm.

## Spacing and Radius System
- **Border Radius**: Uses a dedicated scale (from `--radius-sm` to `--radius-full`) to give elements slightly sharp, sophisticated edges rather than generic rounded looks.
- **Spacing**: Strictly relies on standard numeric scales (4px, 8px, 16px, 24px) avoiding random values like 13px or 17px.

## Core Components
- **LevelProgress**: Reusable Level and XP UI component, displaying Current Level, XP to next, and Rank.
- **RankBadge**: Typography and accent-driven rank visualizer (E, D, C, B, A, S).
- **HabitCard**: Reusable daily quest item. Features clear hover/active states, and transitions to a subtle success glow upon completion.

## Accessibility
- Reduced motion support is fully implemented. Decorative glows and continuous background animations are disabled when `prefers-reduced-motion` is active.
- Visible focus rings are utilized across all interactive Radix UI primitives.
