import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AudioCategory } from "./audio";

export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  total_exp: number;
  level: number;
  current_streak: number;
  longest_streak: number;
  exp_to_next_level: number;
}

export interface AudioSettings {
  muted: boolean;
  masterVolume: number;
  volumes: Record<AudioCategory, number>;
}

interface AppState {
  /** True once we've checked localStorage for an existing session */
  sessionLoaded: boolean;
  /** The logged-in user's ID (null = not logged in) */
  userId: string | null;
  /** Loaded profile data */
  profile: Profile | null;
  /** Audio settings (master mute + per-category volumes) */
  audio: AudioSettings;
  setSessionLoaded: () => void;
  setUserId: (id: string | null) => void;
  setProfile: (p: Profile | null) => void;
  signOut: () => void;
  setAudioMuted: (muted: boolean) => void;
  setAudioMasterVolume: (v: number) => void;
  setAudioCategoryVolume: (category: AudioCategory, v: number) => void;
}

const DEFAULT_AUDIO: AudioSettings = {
  muted: false,
  masterVolume: 1,
  volumes: {
    sfx: 1,
    ui: 1,
    ambient: 1,
    voice: 1,
  },
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sessionLoaded: false,
      userId: null,
      profile: null,
      audio: DEFAULT_AUDIO,
      setSessionLoaded: () => set({ sessionLoaded: true }),
      setUserId: (userId) => set({ userId }),
      setProfile: (profile) => set({ profile }),
      signOut: () => set({ userId: null, profile: null }),
      setAudioMuted: (muted) =>
        set((state) => ({ audio: { ...state.audio, muted } })),
      setAudioMasterVolume: (masterVolume) =>
        set((state) => ({ audio: { ...state.audio, masterVolume } })),
      setAudioCategoryVolume: (category, v) =>
        set((state) => ({
          audio: {
            ...state.audio,
            volumes: { ...state.audio.volumes, [category]: v },
          },
        })),
    }),
    {
      name: "shadow-level-store",
      partialize: (state) => ({
        audio: state.audio,
      }),
    },
  ),
);