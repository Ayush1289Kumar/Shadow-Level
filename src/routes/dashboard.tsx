import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import confetti from "canvas-confetti";
import { Flame, Plus, Sparkles, TrendingUp, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAppStore } from "@/lib/store";
import { applyExpDelta, updateStreak } from "@/lib/profile";
import { RequireAuth } from "@/components/RequireAuth";
import { ExpBar } from "@/components/ExpBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({
  ssr: false,
  component: () => (
    <RequireAuth>
      <Dashboard />
    </RequireAuth>
  ),
});

interface Habit {
  id: string;
  name: string;
  description: string | null;
  exp_value: number | null;
  habit_type: string;
  is_active: boolean | null;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function Dashboard() {
  const profile = useAppStore((s) => s.profile)!;
  const setProfile = useAppStore((s) => s.setProfile);
  const qc = useQueryClient();
  const [busy, setBusy] = useState<string | null>(null);
  const [prevLevel, setPrevLevel] = useState(profile.level);

  const { data: habits = [] } = useQuery({
    queryKey: ["habits", profile.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("habits")
        .select("*")
        .eq("user_id", profile.id)
        .eq("is_active", true)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as Habit[];
    },
  });

  const { data: todayLogs = [] } = useQuery({
    queryKey: ["logs", profile.id, today()],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("habit_logs")
        .select("*")
        .eq("user_id", profile.id)
        .eq("completed_at", today());
      if (error) throw error;
      return data as { id: string; habit_id: string; exp_earned: number }[];
    },
  });

  const doneMap = new Map(todayLogs.map((l) => [l.habit_id, l]));

  useEffect(() => {
    if (profile.level > prevLevel) {
      confetti({
        particleCount: 180,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#00e5ff", "#a855f7", "#10b981", "#f43f5e"],
      });
      toast.success(`⚡ LEVEL UP! You are now Lv. ${profile.level}`);
    }
    setPrevLevel(profile.level);
  }, [profile.level, prevLevel]);

  async function toggle(habit: Habit) {
    if (busy) return;
    setBusy(habit.id);
    try {
      const existing = doneMap.get(habit.id);
      const exp = habit.exp_value ?? 10;
      const isPositive = habit.habit_type === "positive";
      if (existing) {
        // undo
        const { error } = await supabase.from("habit_logs").delete().eq("id", existing.id);
        if (error) throw error;
        // refund: positive removed => -exp, negative removed => +exp
        const delta = isPositive ? -exp : exp;
        const updated = await applyExpDelta(profile, delta);
        const withStreak = await updateStreak(updated);
        setProfile(withStreak);
      } else {
        const gained = isPositive ? exp : -exp;
        const { error } = await supabase.from("habit_logs").insert({
          habit_id: habit.id,
          user_id: profile.id,
          completed_at: today(),
          exp_earned: gained,
        });
        if (error) throw error;
        const updated = await applyExpDelta(profile, gained);
        const withStreak = await updateStreak(updated);
        setProfile(withStreak);
        if (isPositive) toast.success(`+${exp} EXP · ${habit.name}`);
        else toast.error(`-${exp} EXP · ${habit.name}`);
      }
      qc.invalidateQueries({ queryKey: ["logs", profile.id, today()] });
      qc.invalidateQueries({ queryKey: ["analytics", profile.id] });
    } catch (e: any) {
      toast.error(e.message ?? "Failed");
    } finally {
      setBusy(null);
    }
  }

  const positiveDoneToday = todayLogs.filter((l) => l.exp_earned > 0).length;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong p-6"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/50 shadow-[0_0_20px_rgba(0,229,255,0.4)]">
              <AvatarImage src={profile.avatar_url ?? undefined} />
              <AvatarFallback className="bg-primary/20 text-primary font-display">
                {(profile.username ?? "P").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Shadow Hunter</div>
              <h1 className="font-display text-2xl font-bold text-glow-cyan text-primary">
                {profile.username}
              </h1>
              <div className="text-sm text-muted-foreground">
                {profile.total_exp.toLocaleString()} Total EXP
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="glass px-4 py-2 text-center">
              <Flame className="mx-auto h-5 w-5 text-rose-glow" />
              <div className="font-display text-lg">{profile.current_streak}</div>
              <div className="text-[10px] uppercase text-muted-foreground">Streak</div>
            </div>
            <div className="glass px-4 py-2 text-center">
              <Trophy className="mx-auto h-5 w-5 text-emerald-glow" />
              <div className="font-display text-lg">{profile.longest_streak}</div>
              <div className="text-[10px] uppercase text-muted-foreground">Best</div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <ExpBar totalExp={profile.total_exp} />
        </div>
      </motion.div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Today Done" value={positiveDoneToday} icon={<Sparkles className="h-4 w-4" />} tone="cyan" />
        <StatCard label="Active Habits" value={habits.length} icon={<TrendingUp className="h-4 w-4" />} tone="purple" />
        <StatCard label="Current Streak" value={`${profile.current_streak}d`} icon={<Flame className="h-4 w-4" />} tone="rose" />
        <StatCard label="Level" value={profile.level} icon={<Trophy className="h-4 w-4" />} tone="emerald" />
      </div>

      {/* Habits list */}
      <div className="glass p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl">Today's Quests</h2>
          <Link to="/habits">
            <Button size="sm" variant="outline" className="border-white/10">
              <Plus className="mr-1 h-4 w-4" /> Manage
            </Button>
          </Link>
        </div>

        {habits.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No quests yet. Forge your first habit.</p>
            <Link to="/habits">
              <Button className="mt-4 bg-primary text-primary-foreground">Create Habit</Button>
            </Link>
          </div>
        ) : (
          <ul className="space-y-2">
            <AnimatePresence>
              {habits.map((h) => {
                const done = doneMap.has(h.id);
                const positive = h.habit_type === "positive";
                return (
                  <motion.li
                    key={h.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ scale: 1.01 }}
                    className={`flex items-center gap-4 rounded-xl border p-4 transition ${
                      done
                        ? positive
                          ? "border-primary/40 bg-primary/5"
                          : "border-destructive/40 bg-destructive/5"
                        : "border-white/5 bg-white/[0.02] hover:bg-white/5"
                    }`}
                  >
                    <Checkbox
                      checked={done}
                      disabled={busy === h.id}
                      onCheckedChange={() => toggle(h)}
                      className={
                        positive
                          ? "data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          : "data-[state=checked]:bg-destructive data-[state=checked]:border-destructive"
                      }
                    />
                    <div className="flex-1">
                      <div className={`font-medium ${done ? "line-through text-muted-foreground" : ""}`}>
                        {h.name}
                      </div>
                      {h.description && (
                        <div className="text-xs text-muted-foreground">{h.description}</div>
                      )}
                    </div>
                    <div
                      className={`font-display text-sm ${
                        positive ? "text-primary text-glow-cyan" : "text-destructive"
                      }`}
                    >
                      {positive ? "+" : "−"}
                      {h.exp_value ?? 10} EXP
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  tone: "cyan" | "purple" | "emerald" | "rose";
}) {
  const colors: Record<string, string> = {
    cyan: "text-primary",
    purple: "text-accent",
    emerald: "text-emerald-glow",
    rose: "text-rose-glow",
  };
  return (
    <motion.div whileHover={{ y: -2 }} className="glass p-4">
      <div className={`mb-1 flex items-center gap-1 text-xs uppercase tracking-wider ${colors[tone]}`}>
        {icon} {label}
      </div>
      <div className="font-display text-2xl">{value}</div>
    </motion.div>
  );
}
