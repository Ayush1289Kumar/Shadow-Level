import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";

interface Habit {
  id: string;
  name: string;
  description: string | null;
  exp_value: number;
  habit_type: string;
  is_active: boolean;
}

interface HabitCardProps {
  habit: Habit;
  done: boolean;
  busy: boolean;
  shouldReduceMotion: boolean;
  onToggle: (habit: Habit) => void;
}

export function HabitCard({ habit, done, busy, shouldReduceMotion, onToggle }: HabitCardProps) {
  const positive = habit.habit_type === "positive";

  return (
    <motion.li
      layout={!shouldReduceMotion}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={shouldReduceMotion ? {} : { y: -2 }}
      className={`group flex items-center gap-4 rounded-xl border p-4 transition-all duration-200 ${
        done
          ? positive
            ? "border-success/40 bg-success/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
            : "border-danger/40 bg-danger/5 shadow-[0_0_15px_rgba(220,38,38,0.1)]"
          : "border-border bg-surface hover:bg-surface-hover hover:border-border-strong hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
      }`}
    >
      <Checkbox
        checked={done}
        disabled={busy}
        onCheckedChange={() => onToggle(habit)}
        className={
          positive
            ? "data-[state=checked]:bg-success data-[state=checked]:border-success"
            : "data-[state=checked]:bg-danger data-[state=checked]:border-danger"
        }
      />
      <div className="flex-1">
        <div className={`font-medium transition-colors ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>
          {habit.name}
        </div>
        {habit.description && (
          <div className="text-xs text-muted-foreground mt-1 line-clamp-1">{habit.description}</div>
        )}
      </div>
      <div
        className={`font-display text-sm tracking-widest ${
          positive ? "text-primary group-hover:text-glow-primary" : "text-danger"
        }`}
      >
        {positive ? "+" : "−"}
        {habit.exp_value ?? 10} XP
      </div>
    </motion.li>
  );
}
