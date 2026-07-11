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
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [leveledUpTo, setLeveledUpTo] = useState(profile.level);

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

  const { data: yesterdayLogs = [] } = useQuery({
    queryKey: ["logs", profile.id, "yesterday"],
    queryFn: async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().slice(0, 10);
      const { data, error } = await supabase
        .from("habit_logs")
        .select("*")
        .eq("user_id", profile.id)
        .eq("completed_at", yesterdayStr);
      if (error) throw error;
      return data as { id: string; habit_id: string; exp_earned: number }[];
    },
  });

  const doneMap = new Map(todayLogs.map((l) => [l.habit_id, l]));
  
  const positiveHabitsCount = habits.filter(h => h.habit_type === "positive").length;
  const yesterdayPositiveCount = yesterdayLogs.filter(l => l.exp_earned > 0).length;
  
  // Penalty Zone Logic: If they had active habits, and yesterday they completed LESS than their total positive habits, they failed the Daily Quest.
  // We only trigger this if they have at least one positive habit, and we use a local storage flag to only show it once per day.
  const [showPenaltyZone, setShowPenaltyZone] = useState(false);

  useEffect(() => {
    // Only evaluate if they actually have positive habits to complete.
    if (positiveHabitsCount > 0) { 
        const penaltyKey = `penalty_checked_${today()}`;
        // Must complete at least 75% of daily quests to avoid the penalty zone
        const requiredCompletions = Math.ceil(positiveHabitsCount * 0.75);
        
        // If they checked the app yesterday but didn't meet the 75% quota (or didn't check it at all)
        if (yesterdayPositiveCount < requiredCompletions && !localStorage.getItem(penaltyKey)) {
            setShowPenaltyZone(true);
            localStorage.setItem(penaltyKey, "true");
        }
    }
  }, [positiveHabitsCount, yesterdayPositiveCount]);

  useEffect(() => {
    if (profile.level > prevLevel) {
      setLeveledUpTo(profile.level);
      setShowLevelUp(true);
      toast.success(`[NOTICE] LEVEL UP: LV. ${profile.level}`);
      setTimeout(() => setShowLevelUp(false), 4000);
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
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <motion.div
              initial={{ scale: 0.8, filter: "blur(10px)" }}
              animate={{ scale: 1, filter: "blur(0px)" }}
              exit={{ scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
              className="text-center relative"
            >
              <div className="text-sm md:text-xl uppercase tracking-[0.5em] text-primary mb-4 font-mono animate-pulse">System Alert</div>
              <h1 className="font-display text-6xl md:text-8xl font-bold text-glow-primary text-primary mb-4 uppercase">Arise</h1>
              <div className="text-2xl md:text-4xl text-white font-display">Level {leveledUpTo} Reached</div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] -z-10 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.3)_0%,transparent_70%)] rounded-full blur-2xl" />
            </motion.div>
          </motion.div>
        )}

        {showPenaltyZone && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md px-4 text-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
          >
            <motion.div
              className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.2)_0%,transparent_70%)]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }}
              className="glass border-destructive/50 shadow-[0_0_50px_rgba(220,38,38,0.3)] max-w-lg p-8 relative overflow-hidden"
            >
              <div className="text-destructive font-mono text-xl tracking-[0.3em] mb-2 uppercase animate-pulse">[Warning]</div>
              <h2 className="font-display text-4xl text-white mb-6 uppercase tracking-wider">The Penalty Zone</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                You failed to complete at least 75% of your Daily Quests yesterday. The System has determined your lack of discipline requires a penalty.
              </p>
              
              <div className="bg-destructive/10 border border-destructive/30 p-4 rounded-md mb-8 text-left">
                <p className="text-destructive font-mono text-sm uppercase">Penalty Requirement:</p>
                <p className="text-white mt-1">{localStorage.getItem("shadow_penalty") || "Complete 100 Pushups immediately to escape."}</p>
              </div>

              <Button 
                onClick={() => setShowPenaltyZone(false)}
                className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/80 font-display text-xl h-14"
              >
                I Have Paid the Penalty
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong p-6"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
              <AvatarImage src={profile.avatar_url ?? undefined} />
              <AvatarFallback className="bg-primary/20 text-primary font-display">
                {(profile.username ?? "P").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Shadow Hunter</div>
              <h1 className="font-display text-2xl font-bold text-glow-primary text-primary">
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
                        positive ? "text-primary text-glow-primary" : "text-destructive"
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
      
      {/* Stat Points & Shadows (Solo Leveling Mechanics) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatAllocation profile={profile} />
        <ShadowArmy profile={profile} />
      </div>

      {/* Weekly Dungeon Raid */}
      <DungeonRaid profile={profile} />
    </div>
  );
}

function StatAllocation({ profile }: { profile: any }) {
  const totalAvailable = (profile.level - 1) * 5;
  const storageKey = `stats_${profile.id}`;
  
  const [stats, setStats] = useState({ strength: 10, agility: 10, intelligence: 10 });
  
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setStats(JSON.parse(saved));
  }, [storageKey]);

  const allocated = (stats.strength - 10) + (stats.agility - 10) + (stats.intelligence - 10);
  const unallocated = totalAvailable - allocated;

  const allocate = (stat: keyof typeof stats) => {
    if (unallocated > 0) {
      const newStats = { ...stats, [stat]: stats[stat] + 1 };
      setStats(newStats);
      localStorage.setItem(storageKey, JSON.stringify(newStats));
    }
  };

  return (
    <div className="glass p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl text-primary text-glow-primary uppercase tracking-widest">Status</h2>
        <div className="text-sm font-mono text-muted-foreground">Points: <span className="text-primary">{unallocated}</span></div>
      </div>
      <div className="space-y-4">
        {[
          { key: "strength", label: "Strength" },
          { key: "agility", label: "Agility" },
          { key: "intelligence", label: "Intelligence" }
        ].map((s) => (
          <div key={s.key} className="flex items-center justify-between">
            <div className="font-mono text-sm uppercase text-muted-foreground">{s.label}</div>
            <div className="flex items-center gap-4">
              <div className="font-display text-xl">{stats[s.key as keyof typeof stats]}</div>
              <Button 
                size="sm" 
                variant="outline" 
                className="h-8 w-8 p-0 border-primary/20 text-primary hover:bg-primary/20"
                disabled={unallocated <= 0}
                onClick={() => allocate(s.key as keyof typeof stats)}
              >
                +
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShadowArmy({ profile }: { profile: any }) {
  const shadows = [
    { name: "Igris", unlockAt: 5, buff: "+5% EXP", color: "text-rose-glow" },
    { name: "Tank", unlockAt: 15, buff: "Dungeon Pass", color: "text-emerald-glow" },
    { name: "Beru", unlockAt: 30, buff: "+20% EXP", color: "text-purple-glow" },
  ];

  return (
    <div className="glass p-6">
      <h2 className="font-display text-xl text-accent text-glow-accent uppercase tracking-widest mb-6">Shadow Army</h2>
      <div className="space-y-4">
        {shadows.map(s => {
          const unlocked = profile.level >= s.unlockAt;
          return (
            <div key={s.name} className={`flex items-center justify-between border-b border-white/5 pb-2 ${unlocked ? "opacity-100" : "opacity-30 grayscale"}`}>
              <div>
                <div className={`font-display text-lg ${unlocked ? s.color : "text-muted-foreground"}`}>{unlocked ? s.name : "???"}</div>
                <div className="text-xs text-muted-foreground font-mono">{s.buff}</div>
              </div>
              {!unlocked && <div className="text-xs font-mono">Unlocks Lv.{s.unlockAt}</div>}
              {unlocked && <div className="text-xs font-mono text-primary uppercase animate-pulse">Extracted</div>}
            </div>
          )
        })}
      </div>
    </div>
  );
}

function DungeonRaid({ profile }: { profile: any }) {
  // Weekly Dungeon rank derived from current streak
  let rank = "E-Rank";
  let color = "text-muted-foreground";
  
  if (profile.current_streak >= 3) { rank = "D-Rank"; color = "text-blue-400"; }
  if (profile.current_streak >= 7) { rank = "C-Rank"; color = "text-emerald-400"; }
  if (profile.current_streak >= 14) { rank = "B-Rank"; color = "text-purple-400"; }
  if (profile.current_streak >= 30) { rank = "A-Rank"; color = "text-rose-500"; }
  if (profile.current_streak >= 90) { rank = "S-Rank"; color = "text-yellow-500 text-glow-amber"; }

  return (
    <div className="glass-strong p-6 text-center border-t-2 border-t-primary/20">
      <div className="uppercase tracking-[0.3em] text-xs text-muted-foreground font-mono mb-2">Current Dungeon Raid</div>
      <div className={`font-display text-5xl font-bold uppercase ${color} mb-2`}>{rank} Gate</div>
      <p className="text-sm text-muted-foreground">Maintain your streak to clear higher ranked dungeons.</p>
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
