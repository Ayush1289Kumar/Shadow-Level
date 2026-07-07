import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAppStore } from "@/lib/store";
import { ensureProfile } from "@/lib/profile";
import { AppNav } from "./AppNav";
import { Loader2 } from "lucide-react";

export function RequireAuth({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const session = useAppStore((s) => s.session);
  const sessionLoaded = useAppStore((s) => s.sessionLoaded);
  const profile = useAppStore((s) => s.profile);
  const setProfile = useAppStore((s) => s.setProfile);

  useEffect(() => {
    if (!sessionLoaded) return;
    if (!session) {
      navigate({ to: "/auth", replace: true });
      return;
    }
    if (!profile) {
      let cancelled = false;
      ensureProfile(session.user.id)
        .then((p) => !cancelled && setProfile(p))
        .catch((e) => console.error(e));
      return () => {
        cancelled = true;
      };
    }
  }, [session, sessionLoaded, profile, navigate, setProfile]);

  if (!sessionLoaded || !session || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-monarch-radial">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-monarch-radial">
      <AppNav />
      <main className="md:ml-60 pb-24 md:pb-6 px-4 md:px-8 py-6">{children}</main>
    </div>
  );
}
