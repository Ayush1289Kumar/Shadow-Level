# Shadow Level Design System

This document outlines the core design principles, typography, color palette, and custom utility classes used throughout the **Shadow Level** project. It serves as a single source of truth for the project's aesthetics.

## Design Philosophy
**Shadow Level** is a gamified habit tracker inspired by Solo Leveling and RPG aesthetics. The design is intended to feel **premium, dark, and dynamic**, turning the discipline of habit building into an engaging stat sheet.

### Key Pillars
- **Dark & Atmospheric**: A predominantly dark mode design with deep blacks and subtle glowing highlights.
- **Glassmorphism**: Extensive use of blurred, translucent backgrounds to give a modern, layered depth to the UI.
- **RPG Elements**: Vibrant, neon-like accents (Electric Blue, Shadow Purple, Blood Red) reminiscent of gaming UI and skill effects.
- **Dynamic**: Animated, flowing gradients that make the app feel alive and responsive.

## Typography
The project relies on two Google Fonts to establish its premium, RPG feel:

- **Headings & Display (`font-display`)**: `Cinzel`
  - Used for titles, levels, and major headers. It provides a cinematic, epic, and gaming-inspired look.
- **Body & UI (`font-sans`)**: `Montserrat`
  - Used for standard text, descriptions, and UI elements. Clean, modern, and highly legible against dark backgrounds.

## Color Palette
The color variables are defined in `src/styles.css` using Tailwind's theme integration and CSS variables.

| Role | Color | CSS Variable | Hex/Value |
| --- | --- | --- | --- |
| **Background** | Deep Black | `--background` | `#000000` |
| **Primary** | Electric Blue | `--primary` | `#3b82f6` |
| **Accent** | Shadow Purple | `--accent` | `#a855f7` |
| **Destructive** | Blood Red | `--destructive` | `#dc2626` |
| **Secondary** | Deep Indigo | `--secondary` | `#1e1b4b` |
| **Muted** | Dark Slate | `--muted` | `#0f172a` |

*Glow Effects* are also defined for these colors to emphasize interactive or important elements (e.g., `--color-primary-glow: #3b82f6;`).

## Custom Utilities & Components
The following custom utilities are defined in `styles.css` and are crucial to the aesthetic:

### Glassmorphism
- `glass`: A standard blurred background with slight transparency. Use for standard cards, floating elements, or dropdowns.
- `glass-strong`: A stronger glass effect featuring a linear gradient from Electric Blue to Shadow Purple. Use for featured elements, level-up notifications, or premium UI cards.

### Glow Effects
- `text-glow-primary`: Adds an Electric Blue glowing shadow to text.
- `text-glow-accent`: Adds a Shadow Purple glowing shadow to text.

### Backgrounds
- `bg-monarch-radial`: A highly complex, animated background featuring a mix of radial and conic gradients (Red, Blue, Purple). It flows continuously over 20 seconds. This is the primary background for the application body.

## Layout & Components (Tailwind & Radix)
- **Radix UI**: The project utilizes Radix UI primitives (Accordion, Dialog, Select, Slider, etc.) for accessible, unstyled components.
- **Radius**: A slightly rounded look is used (`--radius: 0.9rem`).
- **Borders**: Borders are typically translucent versions of the primary color (`rgba(59, 130, 246, 0.2)`).

## Changing the Design
When you want to overhaul or adjust the design, follow these steps:
1. **Colors**: Modify the root CSS variables in `src/styles.css`.
2. **Typography**: Update the Google Fonts link in `index.html` and change the `--font-display` and `--font-sans` variables in `src/styles.css`.
3. **Backgrounds**: Adjust the `bg-monarch-radial` utility in `src/styles.css` if you want a different animation or static background.
4. **Component Styling**: Since Radix UI is unstyled, most component-specific visual changes (paddings, colors, borders) will be done via Tailwind utility classes directly in the React components (`src/components/`).
