import { getProfile, updateProfile, getHabitLogs } from "./local-db";
import { levelProgress } from "./leveling";
import type { Profile } from "./store";

export function ensureProfile(userId: string): Profile {
  const p = getProfile(userId);
  if (!p) throw new Error("Profile not found");
  return p as Profile;
}

export function applyExpDelta(profile: Profile, delta: number): Profile {
  const newExp = Math.max(0, (profile.total_exp || 0) + delta);
  const lp = levelProgress(newExp);
  const updated = updateProfile(profile.id, {
    total_exp: newExp,
    level: lp.level,
    exp_to_next_level: lp.toNext,
  });
  return updated as Profile;
}

export function updateStreak(profile: Profile): Profile {
  const logs = getHabitLogs(profile.id);
  // Only count positive habit completions for streak
  const positiveLogs = logs.filter((l) => l.exp_earned > 0);

  const days = new Set<string>();
  positiveLogs.forEach((l) => l.completed_at && days.add(l.completed_at));

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < 400; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (days.has(key)) streak++;
    else if (i === 0) continue; // today not done yet is OK
    else break;
  }
  const longest = Math.max(profile.longest_streak || 0, streak);
  const updated = updateProfile(profile.id, {
    current_streak: streak,
    longest_streak: longest,
  });
  return updated as Profile;
}
