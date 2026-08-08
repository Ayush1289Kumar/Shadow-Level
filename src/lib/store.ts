import { create } from "zustand";

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

interface AppState {
  /** True once we've checked localStorage for an existing session */
  sessionLoaded: boolean;
  /** The logged-in user's ID (null = not logged in) */
  userId: string | null;
  /** Loaded profile data */
  profile: Profile | null;
  setSessionLoaded: () => void;
  setUserId: (id: string | null) => void;
  setProfile: (p: Profile | null) => void;
  signOut: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  sessionLoaded: false,
  userId: null,
  profile: null,
  setSessionLoaded: () => set({ sessionLoaded: true }),
  setUserId: (userId) => set({ userId }),
  setProfile: (profile) => set({ profile }),
  signOut: () => set({ userId: null, profile: null }),
}));
