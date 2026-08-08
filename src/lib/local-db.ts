// ─────────────────────────────────────────────────────────────
// local-db.ts — localStorage-backed CRUD engine for Shadow Level
// Replaces all Supabase database calls with client-side persistence.
// ─────────────────────────────────────────────────────────────

function generateId(): string {
  return crypto.randomUUID();
}

function read<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// ── Profiles ──────────────────────────────────────────────────

export interface ProfileRow {
  id: string;
  username: string | null;
  avatar_url: string | null;
  total_exp: number;
  level: number;
  current_streak: number;
  longest_streak: number;
  exp_to_next_level: number;
  updated_at: string;
}

const PROFILES_KEY = "shadow_profiles";
const SESSION_KEY = "shadow_session"; // stores { userId }

export function getSession(): { userId: string } | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setSession(userId: string): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ userId }));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function getAllProfiles(): ProfileRow[] {
  return read<ProfileRow>(PROFILES_KEY);
}

export function getProfile(id: string): ProfileRow | null {
  return getAllProfiles().find((p) => p.id === id) ?? null;
}

export function getProfileByUsername(username: string): ProfileRow | null {
  return getAllProfiles().find((p) => p.username === username) ?? null;
}

export function getProfileByEmail(email: string): { profile: ProfileRow; email: string } | null {
  const accounts = read<{ email: string; password: string; profileId: string }>("shadow_accounts");
  const account = accounts.find((a) => a.email === email);
  if (!account) return null;
  const profile = getProfile(account.profileId);
  if (!profile) return null;
  return { profile, email: account.email };
}

export function createAccount(email: string, password: string): ProfileRow {
  const accounts = read<{ email: string; password: string; profileId: string }>("shadow_accounts");
  if (accounts.find((a) => a.email === email)) {
    throw new Error("An account with this email already exists.");
  }

  const id = generateId();
  const username = "Player_" + Math.random().toString(36).slice(2, 8);
  const profile: ProfileRow = {
    id,
    username,
    avatar_url: null,
    total_exp: 0,
    level: 1,
    current_streak: 0,
    longest_streak: 0,
    exp_to_next_level: 100,
    updated_at: new Date().toISOString(),
  };

  const profiles = getAllProfiles();
  profiles.push(profile);
  write(PROFILES_KEY, profiles);

  accounts.push({ email, password, profileId: id });
  write("shadow_accounts", accounts);

  return profile;
}

export function loginAccount(email: string, password: string): ProfileRow {
  const accounts = read<{ email: string; password: string; profileId: string }>("shadow_accounts");
  const account = accounts.find((a) => a.email === email);
  if (!account) throw new Error("No account found with this email.");
  if (account.password !== password) throw new Error("Invalid password.");
  const profile = getProfile(account.profileId);
  if (!profile) throw new Error("Profile not found.");
  return profile;
}

export function updateProfile(id: string, updates: Partial<ProfileRow>): ProfileRow {
  const profiles = getAllProfiles();
  const idx = profiles.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Profile not found");
  profiles[idx] = { ...profiles[idx], ...updates, updated_at: new Date().toISOString() };
  write(PROFILES_KEY, profiles);
  return profiles[idx];
}

// ── Habits ────────────────────────────────────────────────────

export interface HabitRow {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  habit_type: "positive" | "negative";
  exp_value: number;
  frequency: string;
  is_active: boolean;
  created_at: string;
}

const HABITS_KEY = "shadow_habits";

export function getHabits(userId: string, activeOnly = false): HabitRow[] {
  const all = read<HabitRow>(HABITS_KEY).filter((h) => h.user_id === userId);
  if (activeOnly) return all.filter((h) => h.is_active);
  return all;
}

export function createHabit(data: Omit<HabitRow, "id" | "created_at">): HabitRow {
  const habits = read<HabitRow>(HABITS_KEY);
  const habit: HabitRow = {
    ...data,
    id: generateId(),
    created_at: new Date().toISOString(),
  };
  habits.push(habit);
  write(HABITS_KEY, habits);
  return habit;
}

export function updateHabit(id: string, updates: Partial<HabitRow>): HabitRow {
  const habits = read<HabitRow>(HABITS_KEY);
  const idx = habits.findIndex((h) => h.id === id);
  if (idx === -1) throw new Error("Habit not found");
  habits[idx] = { ...habits[idx], ...updates };
  write(HABITS_KEY, habits);
  return habits[idx];
}

export function deleteHabit(id: string): void {
  const habits = read<HabitRow>(HABITS_KEY).filter((h) => h.id !== id);
  write(HABITS_KEY, habits);
}

// ── Habit Logs ────────────────────────────────────────────────

export interface HabitLogRow {
  id: string;
  habit_id: string;
  user_id: string;
  completed_at: string; // YYYY-MM-DD
  exp_earned: number;
}

const LOGS_KEY = "shadow_habit_logs";

export function getHabitLogs(userId: string): HabitLogRow[] {
  return read<HabitLogRow>(LOGS_KEY).filter((l) => l.user_id === userId);
}

export function getHabitLogsByDate(userId: string, date: string): HabitLogRow[] {
  return getHabitLogs(userId).filter((l) => l.completed_at === date);
}

export function getHabitLogsSince(userId: string, sinceDate: string): HabitLogRow[] {
  return getHabitLogs(userId).filter((l) => l.completed_at >= sinceDate);
}

export function createHabitLog(data: Omit<HabitLogRow, "id">): HabitLogRow {
  const logs = read<HabitLogRow>(LOGS_KEY);
  // Prevent duplicate (same habit + date)
  if (logs.find((l) => l.habit_id === data.habit_id && l.completed_at === data.completed_at)) {
    throw new Error("Already logged for today");
  }
  const log: HabitLogRow = { ...data, id: generateId() };
  logs.push(log);
  write(LOGS_KEY, logs);
  return log;
}

export function deleteHabitLog(id: string): void {
  const logs = read<HabitLogRow>(LOGS_KEY).filter((l) => l.id !== id);
  write(LOGS_KEY, logs);
}

// ── Rewards ───────────────────────────────────────────────────

export interface RewardRow {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  cost: number;
  is_purchased: boolean;
  purchased_at: string | null;
  created_at: string;
}

const REWARDS_KEY = "shadow_rewards";

export function getRewards(userId: string): RewardRow[] {
  return read<RewardRow>(REWARDS_KEY)
    .filter((r) => r.user_id === userId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function createReward(data: Omit<RewardRow, "id" | "created_at" | "is_purchased" | "purchased_at">): RewardRow {
  const rewards = read<RewardRow>(REWARDS_KEY);
  const reward: RewardRow = {
    ...data,
    id: generateId(),
    is_purchased: false,
    purchased_at: null,
    created_at: new Date().toISOString(),
  };
  rewards.push(reward);
  write(REWARDS_KEY, rewards);
  return reward;
}

export function purchaseReward(id: string): RewardRow {
  const rewards = read<RewardRow>(REWARDS_KEY);
  const idx = rewards.findIndex((r) => r.id === id);
  if (idx === -1) throw new Error("Reward not found");
  rewards[idx] = { ...rewards[idx], is_purchased: true, purchased_at: new Date().toISOString() };
  write(REWARDS_KEY, rewards);
  return rewards[idx];
}

export function deleteReward(id: string): void {
  const rewards = read<RewardRow>(REWARDS_KEY).filter((r) => r.id !== id);
  write(REWARDS_KEY, rewards);
}
