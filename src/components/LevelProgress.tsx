import { levelProgress } from "@/lib/leveling";
import { ExpBar } from "./ExpBar";
import { RankBadge } from "./RankBadge";

export function LevelProgress({ totalExp, rank }: { totalExp: number, rank?: string }) {
  const lp = levelProgress(totalExp);

  return (
    <div className="glass p-6 md:p-8 w-full flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <span className="text-micro text-ash uppercase tracking-widest">
            Current Status
          </span>
          <div className="text-hero text-moonlight transition-all duration-300">
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
