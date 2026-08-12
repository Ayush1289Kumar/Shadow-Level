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
      className={`group flex items-center gap-4 rounded-xl border p-5 transition-all duration-200 cursor-pointer ${
        done
          ? "border-mist bg-depth shadow-[0_0_24px_var(--glow-soul)]"
          : "border-mist bg-depth hover:border-[rgba(255,255,255,0.1)] hover:bg-shade hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
      }`}
      onClick={() => {
        if (!busy) onToggle(habit);
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex-1">
        <div className="text-micro uppercase tracking-[0.15em] text-silver mb-1">
          {habit.habit_type}
        </div>
        <div className={`text-headline transition-colors ${done ? "line-through text-ash" : "text-moonlight"}`}>
          {habit.name}
        </div>
        {habit.description && (
          <div className="text-body text-silver mt-1 line-clamp-2">{habit.description}</div>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center px-2 py-1 rounded glass text-micro text-monarch font-semibold">
          {positive ? "+" : "−"}
          {habit.exp_value ?? 10} XP
        </div>

        <Checkbox
          checked={done}
          disabled={busy}
          onCheckedChange={() => onToggle(habit)}
          onClick={(e) => e.stopPropagation()}
          className={`h-6 w-6 rounded-[4px] transition-all duration-300 ${
            done
              ? "bg-monarch border-monarch box-glow-monarch text-moonlight"
              : "border-mist bg-transparent data-[state=checked]:bg-monarch data-[state=checked]:border-monarch"
          }`}
        />
      </div>
    </motion.li>
  );
}
