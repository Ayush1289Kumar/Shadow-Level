import { motion } from "framer-motion";

export function RankBadge({ rank }: { rank: string }) {
  const rankStyles: Record<string, string> = {
    E: "text-ash bg-surface",
    D: "text-silver bg-surface",
    C: "text-amber glass",
    B: "text-monarch glass text-glow-monarch",
    A: "text-violet glass-strong text-glow-violet",
    S: "text-soul glass-strong text-glow-soul",
  };

  const styleClass = rankStyles[rank] || rankStyles["E"];

  return (
    <motion.div 
      className={`inline-flex items-center justify-center px-4 py-2 rounded-lg ${styleClass}`}
      whileHover={{ scale: 1.05 }}
    >
      <span className="text-display leading-none pb-1">{rank}</span>
    </motion.div>
  );
}
