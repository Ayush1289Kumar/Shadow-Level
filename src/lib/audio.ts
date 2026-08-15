import { useAppStore } from "@/lib/store";

/**
 * Audio categories for volume mixing.
 */
export type AudioCategory = "sfx" | "ui" | "ambient" | "voice";

/**
 * Every sound key referenced across the app.
 * The path map drives both preloading & real-file override.
 */
export type SoundKey =
  | "arise"
  | "levelUp"
  | "levelUpCinematic"
  | "habitComplete"
  | "questAccept"
  | "rewardClaim"
  | "buttonClick"
  | "hover"
  | "error"
  | "success"
  | "shadowExtract"
  | "dungeonEnter"
  | "rankUp"
  | "streak"
  | "navSwitch"
  | "modalOpen"
  | "modalClose"
  | "jinwooArise"
  // Spec Triggers:
  | "systemAlert"
  | "gateOpen"
  | "skillUse"
  | "shadowArmy"
  | "dungeonClear"
  | "manaFill"
  | "uiHover"
  | "notification";

interface SoundSpec {
  path: string;
  category: AudioCategory;
  volume: number;
  cooldown: number;
}

const SOUND_SPECS: Record<SoundKey, SoundSpec> = {
  arise: { path: "/audio/sfx/arise.mp3", category: "sfx", volume: 0.85, cooldown: 3000 },
  levelUp: { path: "/audio/sfx/level-up.mp3", category: "sfx", volume: 0.85, cooldown: 3000 },
  levelUpCinematic: { path: "/audio/ambient/level-up-cinematic.mp3", category: "ambient", volume: 0.7, cooldown: 5000 },
  habitComplete: { path: "/audio/sfx/habit-complete.mp3", category: "sfx", volume: 0.7, cooldown: 1000 },
  questAccept: { path: "/audio/sfx/quest-accept.mp3", category: "sfx", volume: 0.6, cooldown: 1000 },
  rewardClaim: { path: "/audio/sfx/reward-claim.mp3", category: "sfx", volume: 0.7, cooldown: 1500 },
  buttonClick: { path: "/audio/sfx/button-click.mp3", category: "ui", volume: 0.4, cooldown: 250 },
  hover: { path: "/audio/sfx/hover.mp3", category: "ui", volume: 0.25, cooldown: 400 },
  error: { path: "/audio/sfx/error.mp3", category: "ui", volume: 1.0, cooldown: 500 },
  success: { path: "/audio/sfx/success.mp3", category: "ui", volume: 0.5, cooldown: 500 },
  shadowExtract: { path: "/audio/sfx/shadow-extract.mp3", category: "sfx", volume: 0.9, cooldown: 3000 },
  dungeonEnter: { path: "/audio/sfx/dungeon-enter.mp3", category: "sfx", volume: 0.8, cooldown: 3000 },
  rankUp: { path: "/audio/sfx/rank-up.mp3", category: "sfx", volume: 0.8, cooldown: 4000 },
  streak: { path: "/audio/sfx/streak.mp3", category: "sfx", volume: 0.75, cooldown: 2000 },
  navSwitch: { path: "/audio/sfx/ui/nav-switch.mp3", category: "ui", volume: 0.35, cooldown: 350 },
  modalOpen: { path: "/audio/sfx/ui/modal-open.mp3", category: "ui", volume: 0.4, cooldown: 500 },
  modalClose: { path: "/audio/sfx/ui/modal-close.mp3", category: "ui", volume: 0.35, cooldown: 500 },
  jinwooArise: { path: "/audio/voice/jinwoo-arise.mp3", category: "voice", volume: 0.95, cooldown: 5000 },
  
  // Mappings to existing audio resources:
  systemAlert: { path: "/audio/sfx/dungeon-enter.mp3", category: "sfx", volume: 0.8, cooldown: 3000 },
  gateOpen: { path: "/audio/sfx/ui/modal-open.mp3", category: "ui", volume: 0.4, cooldown: 500 },
  skillUse: { path: "/audio/sfx/button-click.mp3", category: "ui", volume: 0.4, cooldown: 250 },
  shadowArmy: { path: "/audio/sfx/shadow-extract.mp3", category: "sfx", volume: 0.9, cooldown: 3000 },
  dungeonClear: { path: "/audio/sfx/success.mp3", category: "sfx", volume: 0.8, cooldown: 3000 },
  manaFill: { path: "/audio/sfx/streak.mp3", category: "ui", volume: 0.6, cooldown: 500 },
  uiHover: { path: "/audio/sfx/hover.mp3", category: "ui", volume: 0.15, cooldown: 50 }, // 50ms hover cooldown per spec!
  notification: { path: "/audio/sfx/quest-accept.mp3", category: "ui", volume: 0.4, cooldown: 500 },
};

const BASE_URL = import.meta.env.BASE_URL || "/";

function assetUrl(path: string): string {
  return path.startsWith("/") ? `${BASE_URL.replace(/\/$/, "")}${path}` : path;
}

// ---------------------------------------------------------------------------
// Shared AudioContext singleton — created once, reused forever.
// Creating a new AudioContext per sound is the #1 cause of silent audio on
// Chrome / Edge because each new context starts in "suspended" state and
// the browser throttles rapid-context creation.
// ---------------------------------------------------------------------------
let _sharedCtx: AudioContext | null = null;

function getSharedAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (_sharedCtx) {
    if (_sharedCtx.state === "suspended") void _sharedCtx.resume();
    return _sharedCtx;
  }
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  _sharedCtx = new Ctx();
  return _sharedCtx;
}

/**
 * Synthesizes brand-appropriate placeholder sounds via the Web Audio API
 * whenever a real audio file is missing. Real files in /public/audio
 * automatically take precedence (see SoundManager).
 */
class WebAudioPlaceholder {
  private static tone(
    freq: number,
    type: OscillatorType,
    duration: number,
    volume: number,
    delay = 0,
    endFreq?: number,
  ) {
    const ctx = getSharedAudioContext();
    if (!ctx) return;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (endFreq !== undefined) {
      osc.frequency.exponentialRampToValueAtTime(endFreq, t0 + duration);
    }
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.05);
  }

  private static noise(
    duration: number,
    volume: number,
    lowpassFrom: number,
    lowpassTo: number,
    delay = 0,
  ) {
    const ctx = getSharedAudioContext();
    if (!ctx) return;
    const t0 = ctx.currentTime + delay;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(lowpassFrom, t0);
    filter.frequency.exponentialRampToValueAtTime(lowpassTo, t0 + duration);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start(t0);
    src.stop(t0 + duration + 0.05);
  }

  static synthesize(key: SoundKey): void {
    switch (key) {
      case "arise":
      case "jinwooArise": {
        this.tone(60, "sawtooth", 1.2, 0.4, 0, 45);
        this.tone(90, "triangle", 1.4, 0.45, 0.05, 70);
        this.noise(1.2, 0.12, 800, 150);
        break;
      }
      case "levelUp": {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
          this.tone(f, "sine", 0.6, 0.25, i * 0.12),
        );
        this.tone(1046.5, "triangle", 1.0, 0.2, 0.55);
        break;
      }
      case "levelUpCinematic": {
        [220, 277.18, 329.63, 440].forEach((f, i) =>
          this.tone(f, "triangle", 1.4, 0.12, i * 0.2),
        );
        break;
      }
      case "habitComplete": {
        this.tone(880, "sine", 0.3, 0.3);
        this.tone(1174.66, "sine", 0.5, 0.25, 0.05);
        break;
      }
      case "streak": {
        [523.25, 659.25, 783.99].forEach((f, i) =>
          this.tone(f, "sine", 0.35, 0.22, i * 0.09),
        );
        break;
      }
      case "questAccept":
      case "rewardClaim": {
        [659.25, 880, 1046.5].forEach((f, i) =>
          this.tone(f, "sine", 0.25, 0.2, i * 0.06),
        );
        break;
      }
      case "rankUp": {
        [392, 523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
          this.tone(f, "triangle", 0.5, 0.25, i * 0.1),
        );
        break;
      }
      case "buttonClick":
      case "success": {
        this.tone(700, "sine", 0.1, 0.15, 0, 900);
        break;
      }
      case "hover": {
        this.noise(0.25, 0.1, 800, 400);
        break;
      }
      case "dungeonEnter": {
        this.noise(0.9, 0.2, 1200, 100);
        break;
      }
      case "navSwitch": {
        this.noise(0.35, 0.12, 800, 100);
        break;
      }
      case "shadowExtract": {
        this.tone(110, "sine", 0.8, 0.25, 0, 220);
        this.noise(0.6, 0.15, 600, 100);
        break;
      }
      case "error": {
        // Deep sub-bass drop (from 90Hz down to 30Hz) for danger weight
        this.tone(90, "sawtooth", 0.8, 0.65, 0, 30);
        // Discordant alarm frequency layer
        this.tone(140, "sawtooth", 0.6, 0.45, 0.05, 130);
        // Noise splash for impact texture
        this.noise(0.5, 0.18, 600, 150);
        break;
      }
      case "modalOpen": {
        this.tone(500, "sine", 0.2, 0.15, 0, 800);
        break;
      }
      case "modalClose": {
        this.tone(700, "sine", 0.2, 0.15, 0, 450);
        break;
      }
      
      // Synthesizers matching aliases
      case "systemAlert": {
        this.noise(0.9, 0.2, 1200, 100);
        break;
      }
      case "gateOpen": {
        this.tone(500, "sine", 0.2, 0.15, 0, 800);
        break;
      }
      case "skillUse": {
        this.tone(700, "sine", 0.1, 0.15, 0, 900);
        break;
      }
      case "shadowArmy": {
        this.tone(110, "sine", 0.8, 0.25, 0, 220);
        this.noise(0.6, 0.15, 600, 100);
        break;
      }
      case "dungeonClear": {
        this.tone(700, "sine", 0.1, 0.15, 0, 900);
        break;
      }
      case "manaFill": {
        [523.25, 659.25, 783.99].forEach((f, i) =>
          this.tone(f, "sine", 0.35, 0.22, i * 0.09),
        );
        break;
      }
      case "uiHover": {
        this.noise(0.25, 0.1, 800, 400);
        break;
      }
      case "notification": {
        [659.25, 880, 1046.5].forEach((f, i) =>
          this.tone(f, "sine", 0.25, 0.2, i * 0.06),
        );
        break;
      }
      default:
        break;
    }
  }
}

/** Lightweight playback state used by the UI (e.g. settings screen). */
export interface AudioSettingsState {
  muted: boolean;
  masterVolume: number;
  volumes: Record<AudioCategory, number>;
}

class SoundManager {
  private muted = false;
  private reducedMotion = false;
  private masterVolume = 1;
  private volumes: Record<AudioCategory, number> = {
    sfx: 1,
    ui: 1,
    ambient: 1,
    voice: 1,
  };
  private lastPlayed: Record<string, number> = {};
  // Decoded AudioBuffers — Web Audio path avoids HTMLAudioElement autoplay
  // restrictions in Chrome/Edge and enables true concurrent playback.
  private bufferCache: Map<string, AudioBuffer> = new Map();
  private available: Set<string> = new Set();
  private initialised = false;
  private userUnlocked = false;

  init() {
    if (this.initialised) return;
    this.initialised = true;
    this.setupUnlockListeners();

    // Mark all spec files as available by default to play premium MP3 files
    (Object.keys(SOUND_SPECS) as SoundKey[]).forEach((k) => {
      this.available.add(k);
    });
  }

  private setupUnlockListeners() {
    if (typeof window === "undefined") return;

    const unlock = async () => {
      if (this.userUnlocked) return;
      this.userUnlocked = true;

      // Resume the shared AudioContext (required by Chrome/Edge autoplay policy).
      const ctx = getSharedAudioContext();
      if (ctx && ctx.state === "suspended") {
        try { await ctx.resume(); } catch { /* ignore */ }
      }

      // Also unlock HTMLAudioElement path with a silent data-URI buffer.
      try {
        const silent = new Audio(
          "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAAA",
        );
        silent.volume = 0.001;
        await silent.play().catch(() => {});
      } catch { /* ignore */ }

      // Preload frequent UI sounds now that context is unlocked.
      this.preload(["buttonClick", "hover", "navSwitch", "modalOpen", "modalClose"]);
    };

    const opts: AddEventListenerOptions = { passive: true, once: true };
    window.addEventListener("click", unlock, opts);
    window.addEventListener("keydown", unlock, opts);
    window.addEventListener("touchstart", unlock, opts);
    window.addEventListener("pointerdown", unlock, opts);
  }

  setMuted(muted: boolean) {
    this.muted = muted;
  }

  setReducedMotion(reduced: boolean) {
    this.reducedMotion = reduced;
  }

  setMasterVolume(v: number) {
    this.masterVolume = v;
  }

  setVolumes(volumes: Partial<Record<AudioCategory, number>>) {
    (Object.keys(volumes) as AudioCategory[]).forEach((k) => {
      if (typeof volumes[k] === "number") this.volumes[k] = volumes[k]!;
    });
  }

  apply(settings: AudioSettingsState) {
    this.muted = settings.muted;
    this.masterVolume = settings.masterVolume;
    this.volumes = { ...settings.volumes };
    this.reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  play(key: SoundKey) {
    if (this.muted) return;

    const spec = SOUND_SPECS[key];
    const volume = spec.volume * this.volumes[spec.category] * this.masterVolume;
    if (volume <= 0.0001) return;

    // Cooldown gating to prevent spam.
    const now = performance.now();
    const last = this.lastPlayed[key] ?? 0;
    if (now - last < spec.cooldown) return;
    this.lastPlayed[key] = now;

    if (this.available.has(key)) {
      this.playFile(key, volume);
      if (key === "error") {
        WebAudioPlaceholder.synthesize("error");
      }
    } else {
      // File not confirmed yet (HEAD still in-flight) or missing → synthesize.
      WebAudioPlaceholder.synthesize(key);
    }
  }

  /**
   * Plays a file-backed sound using the Web Audio API (AudioBuffer path).
   * This avoids the HTMLAudioElement.play() autoplay-policy block in Chrome/Edge
   * and allows true concurrent playback without needing Audio.cloneNode().
   */
  private playFile(key: SoundKey, volume: number) {
    const url = assetUrl(SOUND_SPECS[key].path);
    const ctx = getSharedAudioContext();

    if (!ctx) {
      // Absolute fallback for very old browsers.
      try {
        const el = new Audio(url);
        el.volume = Math.min(1, volume);
        void el.play().catch(() => {});
      } catch { /* ignore */ }
      return;
    }

    const cached = this.bufferCache.get(url);
    if (cached) {
      this.dispatchBuffer(ctx, cached, volume);
      return;
    }

    // Fetch + decode on first use, then cache the decoded buffer.
    void fetch(url)
      .then((r) => r.arrayBuffer())
      .then((ab) => ctx.decodeAudioData(ab))
      .then((buf) => {
        this.bufferCache.set(url, buf);
        this.dispatchBuffer(ctx, buf, volume);
      })
      .catch(() => {
        // Corrupted file — fall back to synthesizer.
        WebAudioPlaceholder.synthesize(key);
      });
  }

  private dispatchBuffer(ctx: AudioContext, buffer: AudioBuffer, volume: number) {
    const play = () => {
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(Math.min(1, volume), ctx.currentTime);
      source.connect(gain);
      gain.connect(ctx.destination);
      source.start(ctx.currentTime);
    };

    if (ctx.state === "suspended") {
      void ctx.resume().then(play);
    } else {
      play();
    }
  }

  /** Preload critical files into the AudioBuffer cache. */
  preload(keys: SoundKey[]) {
    const ctx = getSharedAudioContext();
    if (!ctx) return;

    keys.forEach((k) => {
      if (!this.available.has(k)) return;
      const url = assetUrl(SOUND_SPECS[k].path);
      if (this.bufferCache.has(url)) return;

      void fetch(url)
        .then((r) => r.arrayBuffer())
        .then((ab) => ctx.decodeAudioData(ab))
        .then((buf) => this.bufferCache.set(url, buf))
        .catch(() => { /* ignore preload errors */ });
    });
  }
}

/** Singleton instance. */
export const sound = new SoundManager();

/**
 * Keeps the sound manager in sync with the persisted Zustand store.
 * Mount <AudioBridge /> once in main.tsx.
 */
export function AudioBridge() {
  const audio = useAppStore((s) => s.audio);
  sound.apply(audio);
  return null;
}

/** Convenience wrapper used throughout the app. */
export function playSound(key: SoundKey) {
  sound.play(key);
}