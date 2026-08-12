import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { getSession } from "@/lib/local-db";
import { ensureProfile } from "@/lib/profile";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const sessionLoaded = useAppStore((s) => s.sessionLoaded);
  const userId = useAppStore((s) => s.userId);
  const setUserId = useAppStore((s) => s.setUserId);
  const setProfile = useAppStore((s) => s.setProfile);
  const setSessionLoaded = useAppStore((s) => s.setSessionLoaded);

  useEffect(() => {
    // Check localStorage for existing session
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
    navigate({ to: userId ? "/dashboard" : "/auth", replace: true });
  }, [userId, sessionLoaded, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-monarch-radial">
      <div className="text-center">
        <h1 className="font-display text-5xl font-bold text-glow-primary text-primary">SHADOW LEVEL</h1>
        <p className="mt-2 text-muted-foreground">Arise.</p>
        <Loader2 className="mx-auto mt-6 h-6 w-6 animate-spin text-primary" />
      </div>
    </div>
  );
}
