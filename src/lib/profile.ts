import { supabase } from "@/integrations/supabase/client";
import { levelProgress } from "./leveling";
import type { Profile } from "./store";

export async function ensureProfile(userId: string): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  if (data) return data as Profile;

  const username = "Player_" + Math.random().toString(36).slice(2, 8);
  const { data: created, error: insErr } = await supabase
    .from("profiles")
    .insert({ id: userId, username, total_exp: 0, level: 1 })
    .select("*")
    .single();
  if (insErr) throw insErr;
  return created as Profile;
}

export async function applyExpDelta(
  profile: Profile,
  delta: number,
): Promise<Profile> {
  const newExp = Math.max(0, (profile.total_exp || 0) + delta);
  const lp = levelProgress(newExp);
  const { data, error } = await supabase
    .from("profiles")
    .update({
      total_exp: newExp,
      level: lp.level,
      exp_to_next_level: lp.toNext,
    })
    .eq("id", profile.id)
    .select("*")
    .single();
  if (error) throw error;
  return data as Profile;
}

export async function updateStreak(profile: Profile): Promise<Profile> {
  // Compute streak from habit_logs (positive habit completions)
  const { data: logs, error } = await supabase
    .from("habit_logs")
    .select("completed_at, habits!inner(habit_type)")
    .eq("user_id", profile.id)
    .eq("habits.habit_type", "positive")
    .order("completed_at", { ascending: false })
    .limit(400);
  if (error) throw error;

  const days = new Set<string>();
  (logs || []).forEach((l: any) => l.completed_at && days.add(l.completed_at));

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
  const { data, error: uerr } = await supabase
    .from("profiles")
    .update({ current_streak: streak, longest_streak: longest })
    .eq("id", profile.id)
    .select("*")
    .single();
  if (uerr) throw uerr;
  return data as Profile;
}
