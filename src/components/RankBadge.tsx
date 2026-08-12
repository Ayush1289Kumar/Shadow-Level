import { motion } from "framer-motion";

export function RankBadge({ rank }: { rank: string }) {
  const rankColors: Record<string, string> = {
    E: "text-muted-foreground border-white/10",
    D: "text-info border-info/30 bg-info/5",
    C: "text-success border-success/30 bg-success/5",
    B: "text-accent border-accent/30 bg-accent/5",
    A: "text-danger border-danger/30 bg-danger/5",
    S: "text-warning border-warning/50 bg-warning/10 text-glow-accent",
  };

  const colorClass = rankColors[rank] || rankColors["E"];

  return (
    <motion.div 
      className={`inline-flex items-center justify-center w-12 h-12 rounded-lg border ${colorClass}`}
      whileHover={{ scale: 1.05 }}
    >
      <span className="font-display text-2xl font-bold">{rank}</span>
    </motion.div>
  );
}
