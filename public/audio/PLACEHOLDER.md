# Audio Assets — Drop Real Files Here

This folder is where your Solo Leveling SFX pack goes. The app already plays
**procedurally-generated placeholder tones** via the Web Audio API for every
sound, so everything works out of the box. Dropping a real file here (with the
exact filename below) **automatically overrides** the placeholder for that sound
— no code changes needed.

## Folder layout

```
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
│   ├── dashboard-loop.mp3         # (optional) dark ambient loop
│   └── level-up-cinematic.mp3     # cinematic swell during LevelUpSequence
└── voice/
    └── jinwoo-arise.mp3           # Sung Jin-Woo "Arise" (dub preferred)
```

## Rules / tips

- **Exact filenames matter.** The app probes these paths (e.g.
  `/audio/sfx/arise.mp3`) and plays the real file if it exists, otherwise it
  synthesizes the placeholder.
- **MP3 is recommended**, but WAV/OGG also work — just rename the file to
  match the exact `.mp3` path above (the probe checks file availability, not
  extension strictly).
- **Quality over quantity.** Per the spec, use short, punchy, high-quality clips.
  UI sounds should be quieter than the cinematic ones — the volume table in
  `src/lib/audio.ts` already handles levels.
- **Keep filenames lowercase** to match the paths exactly (deploy servers are
  case-sensitive).

See `docs/grok.md` for the full audio & animation specification.