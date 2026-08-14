import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { getSession } from "@/lib/local-db";
import { ensureProfile } from "@/lib/profile";
import { InteractiveLanding } from "@/components/InteractiveLanding";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const sessionLoaded = useAppStore((s) => s.sessionLoaded);
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

  return <InteractiveLanding />;
}
