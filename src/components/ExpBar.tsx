import { motion } from "framer-motion";
import { levelProgress } from "@/lib/leveling";

export function ExpBar({ totalExp }: { totalExp: number }) {
  const lp = levelProgress(totalExp);
  
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-end font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <span>{lp.intoLevel} / {lp.span} XP</span>
        <span className="text-right">{lp.toNext} XP to next level</span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-surface border border-border">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${lp.pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-accent to-primary"
        />
      </div>
    </div>
  );
}
