import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { Flame, Plus, Sparkles, TrendingUp, Trophy } from "lucide-react";
import { useAppStore } from "@/lib/store";
import {
  useHabits,
  useHabitLogsByDate,
  useCompleteHabit,
  useUncompleteHabit,
  qk,
} from "@/hooks/queries";
import { getHabitLogsByDate } from "@/lib/local-db";
import { STRINGS } from "@/lib/strings";
import { RequireAuth } from "@/components/RequireAuth";
import { ExpBar } from "@/components/ExpBar";
import { LevelProgress } from "@/components/LevelProgress";
import { HabitCard } from "@/components/HabitCard";
import { LevelUpSequence } from "@/components/LevelUpSequence";
import { LightLines } from "@/components/ui/light-lines";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({
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
  exp_value: number;
  habit_type: string;
  is_active: boolean;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function Dashboard() {
  const profile = useAppStore((s) => s.profile)!;
  const [busy, setBusy] = useState<string | null>(null);
  const [prevLevel, setPrevLevel] = useState(profile.level);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [leveledUpTo, setLeveledUpTo] = useState(profile.level);
  const [showPenaltyZone, setShowPenaltyZone] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const todayStr = today();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  const { data: habits = [] } = useHabits(profile.id, true);
  const { data: todayLogs = [] } = useHabitLogsByDate(profile.id, todayStr);
  const { data: yesterdayLogs = [] } = useHabitLogsByDate(profile.id, yesterdayStr);

  const completeHabit = useCompleteHabit();
  const uncompleteHabit = useUncompleteHabit();

  const doneMap = new Map(todayLogs.map((l) => [l.habit_id, l]));
  const positiveHabitsCount = (habits as Habit[]).filter((h) => h.habit_type === "positive").length;
  const yesterdayPositiveCount = yesterdayLogs.filter((l) => l.exp_earned > 0).length;
  const positiveDoneToday = todayLogs.filter((l) => l.exp_earned > 0).length;

  useEffect(() => {
    if (positiveHabitsCount > 0) {
      const penaltyKey = `penalty_checked_${todayStr}`;
      const requiredCompletions = Math.ceil(positiveHabitsCount * 0.75);
      if (yesterdayPositiveCount < requiredCompletions && !localStorage.getItem(penaltyKey)) {
        setShowPenaltyZone(true);
        localStorage.setItem(penaltyKey, "true");
      }
    }
  }, [positiveHabitsCount, yesterdayPositiveCount, todayStr]);

  useEffect(() => {
    if (profile.level > prevLevel) {
      setLeveledUpTo(profile.level);
      setShowLevelUp(true);
      toast.dismiss(); // Hide any habit completion toasts during the animation
      setTimeout(() => {
        setShowLevelUp(false);
        toast.success(STRINGS.dashboard.level_up_toast(profile.level));
      }, 8000);
    }
    setPrevLevel(profile.level);
  }, [profile.level, prevLevel]);

  function toggle(habit: Habit) {
    if (busy) return;
    setBusy(habit.id);
    try {
      const existing = doneMap.get(habit.id);
      const exp = habit.exp_value ?? 10;
      const isPositive = habit.habit_type === "positive";

      if (existing) {
        uncompleteHabit.mutate(
          { logId: existing.id, userId: profile.id, date: todayStr, expDelta: exp },
          {
            onSuccess: () => {
              if (isPositive) toast.info(`-${exp} EXP · ${habit.name}`);
            },
            onSettled: () => setBusy(null),
          },
        );
      } else {
        const gained = isPositive ? exp : -exp;
        completeHabit.mutate(
          { habitId: habit.id, userId: profile.id, date: todayStr, expDelta: gained },
          {
            onSuccess: () => {
              const willLevelUp = isPositive && gained >= (profile.exp_to_next_level || 0);
              const showToast = () => {
                if (isPositive) toast.success(`+${exp} EXP · ${habit.name}`);
                else toast.error(`-${exp} EXP · ${habit.name}`);
              };
              
              if (willLevelUp) {
                setTimeout(showToast, 8100);
              } else {
                showToast();
              }
            },
            onError: (e: any) => toast.error(e.message ?? "Failed"),
            onSettled: () => setBusy(null),
          },
        );
      }
    } catch {
      setBusy(null);
    }
  }

  return (
    <>
      <LightLines />
      <div className="mx-auto max-w-5xl space-y-12 relative z-10 pb-24">
        {createPortal(
        <AnimatePresence>
          {showLevelUp && (
          <LevelUpSequence 
            leveledUpTo={leveledUpTo} 
            onComplete={() => setShowLevelUp(false)} 
          />
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
              initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.9, y: 20 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1, y: 0 }}
              className="glass border-destructive/50 shadow-[0_0_50px_rgba(220,38,38,0.3)] max-w-lg p-8 relative overflow-hidden"
            >
              <div className="text-destructive font-mono text-xl tracking-[0.3em] mb-2 uppercase animate-pulse">
                [Warning]
              </div>
              <h2 className="font-display text-4xl text-white mb-6 uppercase tracking-wider">
                The Penalty Zone
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                {STRINGS.dashboard.penalty_desc}
              </p>
              <div className="bg-destructive/10 border border-destructive/30 p-4 rounded-md mb-8 text-left">
                <p className="text-destructive font-mono text-sm uppercase">Penalty Requirement:</p>
                <p className="text-white mt-1">
                  {localStorage.getItem("shadow_penalty") ||
                    "Complete 100 Pushups immediately to escape."}
                </p>
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
      </AnimatePresence>,
      document.body
      )}

      {/* Dashboard Top Section: Level > XP > Streaks */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col lg:flex-row gap-8"
      >
        <div className="flex-1">
          <LevelProgress totalExp={profile.total_exp} rank={
            profile.current_streak >= 90 ? "S" :
            profile.current_streak >= 30 ? "A" :
            profile.current_streak >= 14 ? "B" :
            profile.current_streak >= 7 ? "C" :
            profile.current_streak >= 3 ? "D" : "E"
          } />
        </div>
        <div className="flex flex-col gap-4">
          <div className="glass px-8 py-6 flex items-center justify-between gap-8 h-full">
            <div className="text-center">
              <Flame className="mx-auto h-8 w-8 text-danger mb-2" />
              <div className="font-display text-3xl text-foreground">{profile.current_streak}</div>
              <div className="text-xs uppercase font-mono tracking-wider text-muted-foreground mt-1">
                {STRINGS.dashboard.streak_label}
              </div>
            </div>
            <div className="w-px h-16 bg-border/50"></div>
            <div className="text-center">
              <Trophy className="mx-auto h-8 w-8 text-warning mb-2" />
              <div className="font-display text-3xl text-foreground">{profile.longest_streak}</div>
              <div className="text-xs uppercase font-mono tracking-wider text-muted-foreground mt-1">
                {STRINGS.dashboard.longest_streak_label}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        <StatCard
          label="Today Done"
          value={positiveDoneToday}
          icon={<Sparkles className="h-4 w-4" />}
          tone="cyan"
        />
        <StatCard
          label="Active Habits"
          value={(habits as Habit[]).length}
          icon={<TrendingUp className="h-4 w-4" />}
          tone="cyan"
        />
        <StatCard
          label={STRINGS.dashboard.streak_label}
          value={`${profile.current_streak}d`}
          icon={<Flame className="h-4 w-4" />}
          tone="rose"
        />
        <StatCard
          label="Level"
          value={profile.level}
          icon={<Trophy className="h-4 w-4" />}
          tone="cyan"
        />
      </motion.div>

      {/* Habits list */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass p-8"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl">{STRINGS.dashboard.title}</h2>
          <Link to="/habits">
            <Button size="sm" variant="outline" className="border-white/10">
              <Plus className="mr-1 h-4 w-4" /> Manage
            </Button>
          </Link>
        </div>

        {(habits as Habit[]).length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">{STRINGS.dashboard.empty_desc}</p>
            <Link to="/habits">
              <Button className="mt-4 bg-mana text-abyss hover:bg-mana-bright">
                {STRINGS.dashboard.go_to_forge}
              </Button>
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {(habits as Habit[]).map((h) => (
                <HabitCard 
                  key={h.id}
                  habit={h}
                  done={doneMap.has(h.id)}
                  busy={busy === h.id}
                  shouldReduceMotion={!!shouldReduceMotion}
                  onToggle={toggle}
                />
              ))}
            </AnimatePresence>
          </ul>
        )}
      </motion.div>

      {/* Stat Points & Shadows */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <StatAllocation profile={profile} />
        <ShadowArmy profile={profile} />
      </motion.div>

      {/* Weekly Dungeon Raid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <DungeonRaid profile={profile} />
      </motion.div>
    </div>
    </>
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

  const allocated =
    stats.strength - 10 + (stats.agility - 10) + (stats.intelligence - 10);
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
        <h2 className="font-display text-xl text-primary text-glow-primary uppercase tracking-widest">
          Status
        </h2>
        <div className="text-sm font-mono text-muted-foreground">
          {STRINGS.dashboard.stat_points_label}:{" "}
          <span className="text-primary">{unallocated}</span>
        </div>
      </div>
      <div className="space-y-4">
        {[
          { key: "strength", label: STRINGS.profile.stat_strength },
          { key: "agility", label: STRINGS.profile.stat_agility },
          { key: "intelligence", label: STRINGS.profile.stat_intelligence },
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
    { name: STRINGS.shadows.igris.name, unlockAt: 5, buff: STRINGS.shadows.igris.buff, color: "text-rose-500" },
    { name: STRINGS.shadows.tank.name, unlockAt: 15, buff: STRINGS.shadows.tank.buff, color: "text-emerald-400" },
    { name: STRINGS.shadows.beru.name, unlockAt: 30, buff: STRINGS.shadows.beru.buff, color: "text-purple-400" },
  ];

  return (
    <div className="glass p-6">
      <h2 className="font-display text-xl text-accent text-glow-accent uppercase tracking-widest mb-6">
        {STRINGS.dashboard.shadow_army_title}
      </h2>
      <div className="space-y-4">
        {shadows.map((s) => {
          const unlocked = profile.level >= s.unlockAt;
          return (
            <div
              key={s.name}
              className={`flex items-center justify-between border-b border-white/5 pb-2 ${
                unlocked ? "opacity-100" : "opacity-30 grayscale"
              }`}
            >
              <div>
                <div className={`font-display text-lg ${unlocked ? s.color : "text-muted-foreground"}`}>
                  {unlocked ? s.name : "???"}
                </div>
                <div className="text-xs text-muted-foreground font-mono">{s.buff}</div>
              </div>
              {!unlocked && <div className="text-xs font-mono">Unlocks Lv.{s.unlockAt}</div>}
              {unlocked && (
                <div className="text-xs font-mono text-primary uppercase animate-pulse">
                  Extracted
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DungeonRaid({ profile }: { profile: any }) {
  const streak = profile.current_streak;
  let rank = STRINGS.ranks["E"];
  let color = "text-muted-foreground";

  if (streak >= 3) { rank = STRINGS.ranks["D"]; color = "text-blue-400"; }
  if (streak >= 7) { rank = STRINGS.ranks["C"]; color = "text-emerald-400"; }
  if (streak >= 14) { rank = STRINGS.ranks["B"]; color = "text-purple-400"; }
  if (streak >= 30) { rank = STRINGS.ranks["A"]; color = "text-rose-500"; }
  if (streak >= 90) { rank = STRINGS.ranks["S"]; color = "text-yellow-500 text-glow-amber"; }

  return (
    <div className="glass-strong p-6 text-center border-t-2 border-t-primary/20">
      <div className="uppercase tracking-[0.3em] text-xs text-muted-foreground font-mono mb-2">
        {STRINGS.dashboard.dungeon_rank_title}
      </div>
      <div className={`font-display text-5xl font-bold uppercase ${color} mb-2`}>
        {rank} Gate
      </div>
      <p className="text-sm text-muted-foreground">
        Maintain your streak to clear higher ranked dungeons.
      </p>
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
    cyan: "text-mana",
    purple: "text-mana-bright",
    emerald: "text-success",
    rose: "text-penalty",
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
