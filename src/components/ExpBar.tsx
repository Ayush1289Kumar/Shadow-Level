import { motion } from "framer-motion";
import { levelProgress } from "@/lib/leveling";

export function ExpBar({ totalExp }: { totalExp: number }) {
  const lp = levelProgress(totalExp);
  
  return (
    <div className="w-full flex flex-col gap-2 relative">
      <div className="flex justify-between items-end font-sans text-caption text-silver">
        <span className="text-mana-light tracking-wider font-semibold">{lp.intoLevel} <span className="text-ash">/ {lp.span} XP</span></span>
        <span className="text-right text-mana-dark tracking-widest text-micro">{lp.toNext} XP TO NEXT LEVEL</span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-void border border-mist shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${lp.pct}%` }}
          transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
          className="h-full rounded-full bg-mana-bright relative shadow-[0_0_16px_var(--glow-mana-bright)]"
        >
          {/* Glowing leading edge tip */}
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-white opacity-50 blur-[2px] rounded-r-full" />
        </motion.div>
      </div>
    </div>
  );
}
