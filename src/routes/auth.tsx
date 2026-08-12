import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createAccount, loginAccount, setSession } from "@/lib/local-db";
import { useAppStore } from "@/lib/store";
import { STRINGS } from "@/lib/strings";
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

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const profile = await createAccount(email, password);
        setSession(profile.id);
        setUserId(profile.id);
        setProfile(profile);
        toast.success(STRINGS.auth.toast_signup);
      } else {
        const profile = await loginAccount(email, password);
        setSession(profile.id);
        setUserId(profile.id);
        setProfile(profile);
        toast.success(STRINGS.auth.toast_login);
      }
    } catch (err: any) {
      toast.error(err.message ?? STRINGS.auth.toast_error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-4 relative overflow-hidden">
      {/* Ambient background glows */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mana/10 blur-[100px] rounded-full pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="glass-strong border border-mana/20 w-full max-w-sm p-6 rounded-3xl relative z-10 shadow-[0_8px_32px_rgba(0,0,0,0.8)]"
      >
        <div className="mb-6 flex flex-col items-center gap-1.5 text-center">
          <motion.div 
            initial={{ rotate: -15, scale: 0.5 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="rounded-2xl bg-mana/10 border border-mana/30 p-3 box-glow-mana mb-1"
          >
            <Sword className="h-6 w-6 text-mana-bright drop-shadow-[0_0_8px_var(--glow-mana-bright)]" />
          </motion.div>
          <h1 className="text-3xl font-display font-bold text-mana-bright drop-shadow-[0_0_8px_var(--glow-mana-bright)] uppercase tracking-wider">
            {STRINGS.auth.title}
          </h1>
          <p className="text-silver mt-1 text-xs tracking-wide">
            {mode === "login" ? STRINGS.auth.subtitle_login : STRINGS.auth.subtitle_signup}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-silver uppercase tracking-wider text-[10px] font-bold">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hunter@shadow.army"
              className="h-10 text-sm bg-abyss border-mist focus:border-mana-bright focus:ring-1 focus:ring-mana-bright transition-all duration-300 text-moonlight placeholder:text-ash/50 rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-silver uppercase tracking-wider text-[10px] font-bold">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 text-sm bg-abyss border-mist focus:border-mana-bright focus:ring-1 focus:ring-mana-bright transition-all duration-300 text-moonlight placeholder:text-ash/50 rounded-xl"
            />
          </div>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-mana hover:bg-mana-bright text-moonlight font-bold text-sm tracking-widest uppercase rounded-xl transition-all duration-300 box-glow-mana relative overflow-hidden group border border-mana-light/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              <span className="relative z-10 drop-shadow-md">
                {mode === "login" ? STRINGS.auth.cta_login : STRINGS.auth.cta_signup}
              </span>
            </Button>
          </motion.div>
        </form>

        <div className="mt-6 text-center text-xs text-silver">
          {mode === "login" ? STRINGS.auth.no_account : STRINGS.auth.already_hunter}{" "}
          <button
            className="text-mana-bright font-semibold underline-offset-4 hover:underline transition-all hover:text-white drop-shadow-[0_0_4px_var(--glow-mana-bright)]"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? STRINGS.auth.switch_to_signup : STRINGS.auth.switch_to_login}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
