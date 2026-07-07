import { motion } from "framer-motion";
import { levelProgress } from "@/lib/leveling";

export function ExpBar({ totalExp }: { totalExp: number }) {
  const lp = levelProgress(totalExp);
  return (
    <div className="w-full">
      <div className="mb-1 flex justify-between text-xs text-muted-foreground">
        <span className="font-display">Lv. {lp.level}</span>
        <span>
          {lp.intoLevel} / {lp.span} EXP
        </span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/5 border border-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${lp.pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary shadow-[0_0_20px_rgba(0,229,255,0.6)]"
        />
      </div>
      <div className="mt-1 text-right text-[10px] text-muted-foreground">
        {lp.toNext} EXP to Lv. {lp.level + 1}
      </div>
    </div>
  );
}
