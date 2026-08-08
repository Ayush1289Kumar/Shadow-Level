import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createAccount, loginAccount, setSession } from "@/lib/local-db";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Sword } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userId = useAppStore((s) => s.userId);
  const setUserId = useAppStore((s) => s.setUserId);
  const setProfile = useAppStore((s) => s.setProfile);

  useEffect(() => {
    if (userId) navigate({ to: "/dashboard", replace: true });
  }, [userId, navigate]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const profile = createAccount(email, password);
        setSession(profile.id);
        setUserId(profile.id);
        setProfile(profile);
        toast.success("Account created. Welcome, hunter.");
      } else {
        const profile = loginAccount(email, password);
        setSession(profile.id);
        setUserId(profile.id);
        setProfile(profile);
        toast.success("Welcome back, hunter.");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-monarch-radial px-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-strong w-full max-w-md p-8"
      >
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <div className="rounded-xl bg-gradient-to-br from-primary to-accent p-3 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
            <Sword className="h-6 w-6 text-black" />
          </div>
          <h1 className="font-display text-3xl font-bold text-glow-primary text-primary">
            SHADOW MONARCH
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "login" ? "Return to the shadow army." : "Awaken your power."}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hunter@shadow.army"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {mode === "login" ? "Enter the Realm" : "Awaken"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "login" ? "No account?" : "Already a hunter?"}{" "}
          <button
            className="text-primary underline-offset-4 hover:underline"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
