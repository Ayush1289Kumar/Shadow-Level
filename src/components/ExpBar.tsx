import { motion } from "framer-motion";
import { levelProgress } from "@/lib/leveling";

export function ExpBar({ totalExp }: { totalExp: number }) {
  const lp = levelProgress(totalExp);
  
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-end font-sans text-caption text-silver">
        <span>{lp.intoLevel} / {lp.span} XP</span>
        <span className="text-right">{lp.toNext} XP to next level</span>
      </div>
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-depth">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${lp.pct}%` }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="h-full rounded-full bg-monarch relative shadow-[0_0_12px_var(--color-monarch)]"
        />
      </div>
    </div>
  );
}
