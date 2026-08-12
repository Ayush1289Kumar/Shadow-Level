import { levelProgress } from "@/lib/leveling";
import { ExpBar } from "./ExpBar";
import { RankBadge } from "./RankBadge";
import { motion } from "framer-motion";

export function LevelProgress({ totalExp, rank }: { totalExp: number, rank?: string }) {
  const lp = levelProgress(totalExp);

  return (
    <div className="glass-strong p-6 w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
              Current Status
            </span>
            <div className="font-display text-4xl text-primary text-glow-primary">
              LEVEL {lp.level}
            </div>
          </div>
        </div>
        {rank && (
          <div className="flex items-center gap-3">
            <div className="text-right flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Rank</span>
            </div>
            <RankBadge rank={rank} />
          </div>
        )}
      </div>

      <div className="mt-2">
        <ExpBar totalExp={totalExp} />
      </div>
    </div>
  );
}
