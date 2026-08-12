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
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.01 }}
      className={`group flex items-center gap-4 p-5 transition-all duration-300 cursor-pointer relative overflow-hidden ${
        done
          ? positive 
            ? "glass-strong border-mana/50 box-glow-mana" 
            : "glass-strong border-penalty/50 box-glow-penalty"
          : "glass border-mist hover:border-mana/30 hover:bg-shade/50"
      }`}
      onClick={() => {
        if (!busy) onToggle(habit);
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex-1 relative z-10">
        <div className={`text-micro uppercase tracking-[0.2em] mb-1 font-bold ${positive ? "text-mana-light" : "text-penalty-dark"}`}>
          {habit.habit_type}
        </div>
        <div className={`text-headline transition-colors ${done ? "line-through text-ash opacity-50" : "text-moonlight text-glow-mana-bright"}`}>
          {habit.name}
        </div>
        {habit.description && (
          <div className="text-body text-silver mt-1 line-clamp-2">{habit.description}</div>
        )}
      </div>
      
      <div className="flex items-center gap-4 relative z-10">
        <div className={`flex items-center justify-center px-3 py-1 rounded glass text-micro font-bold tracking-wider ${positive ? "text-mana text-glow-mana" : "text-penalty text-glow-penalty"}`}>
          {positive ? "+" : "−"}
          {habit.exp_value ?? 10} XP
        </div>

        <Checkbox
          checked={done}
          disabled={busy}
          onCheckedChange={() => onToggle(habit)}
          onClick={(e) => e.stopPropagation()}
          className={`h-6 w-6 rounded-[4px] transition-all duration-300 border-2 ${
            done
              ? positive
                ? "bg-mana border-mana box-glow-mana text-abyss"
                : "bg-penalty border-penalty box-glow-penalty text-moonlight"
              : positive 
                ? "border-mist bg-transparent data-[state=checked]:bg-mana data-[state=checked]:border-mana"
                : "border-mist bg-transparent data-[state=checked]:bg-penalty data-[state=checked]:border-penalty"
          }`}
        />
      </div>
      
      {/* Decorative gradient overlay */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
        positive ? "bg-gradient-to-r from-transparent via-mana/5 to-transparent" : "bg-gradient-to-r from-transparent via-penalty/5 to-transparent"
      }`} />
    </motion.li>
  );
}
