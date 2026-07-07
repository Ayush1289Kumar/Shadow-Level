export function computeLevel(totalExp: number): number {
  return Math.floor(Math.sqrt(Math.max(0, totalExp) / 100)) + 1;
}

export function expForLevel(level: number): number {
  // exp required to REACH this level (start of level)
  return Math.pow(level - 1, 2) * 100;
}

export function expForNextLevel(level: number): number {
  return Math.pow(level, 2) * 100;
}

export function levelProgress(totalExp: number): {
  level: number;
  currentLevelExp: number;
  nextLevelExp: number;
  intoLevel: number;
  span: number;
  pct: number;
  toNext: number;
} {
  const level = computeLevel(totalExp);
  const currentLevelExp = expForLevel(level);
  const nextLevelExp = expForNextLevel(level);
  const intoLevel = totalExp - currentLevelExp;
  const span = nextLevelExp - currentLevelExp;
  const pct = Math.max(0, Math.min(100, (intoLevel / span) * 100));
  return {
    level,
    currentLevelExp,
    nextLevelExp,
    intoLevel,
    span,
    pct,
    toNext: nextLevelExp - totalExp,
  };
}
