import { create } from "zustand";
import type { Session } from "@supabase/supabase-js";

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
  session: Session | null;
  sessionLoaded: boolean;
  profile: Profile | null;
  setSession: (s: Session | null) => void;
  setProfile: (p: Profile | null) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  session: null,
  sessionLoaded: false,
  profile: null,
  setSession: (session) => {
    const prev = get().session;
    const sameUser = prev?.user?.id && session?.user?.id === prev.user.id;
    set({
      session,
      sessionLoaded: true,
      profile: session ? (sameUser ? get().profile : null) : null,
    });
  },
  setProfile: (profile) => set({ profile }),
}));
