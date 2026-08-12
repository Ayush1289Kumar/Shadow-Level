import { levelProgress } from "@/lib/leveling";
import { ExpBar } from "./ExpBar";
import { RankBadge } from "./RankBadge";

export function LevelProgress({ totalExp, rank }: { totalExp: number, rank?: string }) {
  const lp = levelProgress(totalExp);

  return (
    <div className="glass-strong p-6 md:p-8 w-full flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-between relative overflow-hidden group">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-mana/10 to-transparent opacity-50 pointer-events-none" />

      <div className="flex items-center gap-6 relative z-10">
        <div className="flex flex-col">
          <span className="text-micro text-mana-dark font-bold uppercase tracking-[0.3em]">
            SYSTEM
          </span>
          <div className="text-hero text-moonlight transition-all duration-300 text-glow-mana">
            LEVEL {lp.level}
          </div>
        </div>
      </div>
      
      <div className="flex-1 w-full max-w-xl mt-4 md:mt-0">
        <ExpBar totalExp={totalExp} />
      </div>

      {rank && (
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="text-right flex flex-col justify-center">
            <span className="text-micro uppercase text-ash tracking-widest">Rank</span>
          </div>
          <RankBadge rank={rank} />
        </div>
      )}
    </div>
  );
}
