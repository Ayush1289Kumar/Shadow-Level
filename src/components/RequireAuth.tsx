import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAppStore } from "@/lib/store";
import { ensureProfile } from "@/lib/profile";
import { getSession } from "@/lib/local-db";
import { AppNav } from "./AppNav";
import { Loader2 } from "lucide-react";

export function RequireAuth({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const sessionLoaded = useAppStore((s) => s.sessionLoaded);
  const userId = useAppStore((s) => s.userId);
  const profile = useAppStore((s) => s.profile);
  const setUserId = useAppStore((s) => s.setUserId);
  const setProfile = useAppStore((s) => s.setProfile);
  const setSessionLoaded = useAppStore((s) => s.setSessionLoaded);

  useEffect(() => {
    // Load session from localStorage on mount
    if (!sessionLoaded) {
      const session = getSession();
      if (session) {
        setUserId(session.userId);
        try {
          const p = ensureProfile(session.userId);
          setProfile(p);
        } catch {
          setUserId(null);
        }
      }
      setSessionLoaded();
    }
  }, [sessionLoaded, setUserId, setProfile, setSessionLoaded]);

  useEffect(() => {
    if (!sessionLoaded) return;
    if (!userId) {
      navigate({ to: "/auth", replace: true });
      return;
    }
    if (!profile) {
      try {
        const p = ensureProfile(userId);
        setProfile(p);
      } catch {
        setUserId(null);
        navigate({ to: "/auth", replace: true });
      }
    }
  }, [userId, sessionLoaded, profile, navigate, setProfile, setUserId]);

  if (!sessionLoaded || !userId || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mana-radial">
        <Loader2 className="h-8 w-8 animate-spin text-mana" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mana-radial">
      <AppNav />
      <main className="pt-8 pb-32 md:pt-12 md:pb-12 md:pl-32 px-4 md:pr-12 max-w-7xl mx-auto w-full">{children}</main>
    </div>
  );
}
