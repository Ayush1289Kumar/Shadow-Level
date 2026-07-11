import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const session = useAppStore((s) => s.session);
  const sessionLoaded = useAppStore((s) => s.sessionLoaded);

  useEffect(() => {
    if (!sessionLoaded) return;
    navigate({ to: session ? "/dashboard" : "/auth", replace: true });
  }, [session, sessionLoaded, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-monarch-radial">
      <div className="text-center">
        <h1 className="font-display text-5xl font-bold text-glow-primary text-primary">SHADOW MONARCH</h1>
        <p className="mt-2 text-muted-foreground">Arise.</p>
        <Loader2 className="mx-auto mt-6 h-6 w-6 animate-spin text-primary" />
      </div>
    </div>
  );
}
