// ─────────────────────────────────────────────────────────────────────────────
// queries.ts — React Query hooks for Shadow Level data layer
// Wraps local-db.ts reads with useQuery for caching + automatic invalidation.
// Query keys use Solo Leveling vocabulary to match the project's theme.
// ─────────────────────────────────────────────────────────────────────────────
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getHabits,
  getHabitLogs,
  getHabitLogsByDate,
  getHabitLogsSince,
  getRewards,
  getProfile,
  createHabit,
  updateHabit,
  deleteHabit,
  createHabitLog,
  deleteHabitLog,
  createReward,
  purchaseReward,
  deleteReward,
  updateProfile,
  type HabitRow,
  type RewardRow,
  type ProfileRow,
} from "@/lib/local-db";
import { useAppStore } from "@/lib/store";
import { applyExpDelta, updateStreak } from "@/lib/profile";

// ── Query Keys ────────────────────────────────────────────────────────────────

export const qk = {
  habits: (userId: string) => ["shadow-quests", userId] as const,
  logs: (userId: string) => ["quest-logs", userId] as const,
  logsByDate: (userId: string, date: string) => ["quest-logs", userId, date] as const,
  logsSince: (userId: string, since: string) => ["quest-logs-since", userId, since] as const,
  rewards: (userId: string) => ["shadow-army-rewards", userId] as const,
  profile: (userId: string) => ["hunter-profile", userId] as const,
} as const;

// ── Profile ───────────────────────────────────────────────────────────────────

export function useProfile(userId: string | null) {
  const setProfile = useAppStore((s) => s.setProfile);
  return useQuery({
    queryKey: qk.profile(userId ?? ""),
    queryFn: () => {
      const p = getProfile(userId!);
      if (p) setProfile(p);
      return p;
    },
    enabled: !!userId,
    staleTime: 1000 * 30, // 30s — profile changes are explicit mutations
  });
}

// ── Habits (Shadow Quests) ────────────────────────────────────────────────────

export function useHabits(userId: string | null, activeOnly = false) {
  return useQuery({
    queryKey: qk.habits(userId ?? ""),
    queryFn: () => getHabits(userId!, activeOnly),
    enabled: !!userId,
    staleTime: 1000 * 10,
  });
}

export function useCreateHabit() {
  const qc = useQueryClient();
  const userId = useAppStore((s) => s.userId);
  return useMutation({
    mutationFn: (data: Omit<HabitRow, "id" | "created_at">) => Promise.resolve(createHabit(data)),
    onSuccess: () => {
      if (userId) qc.invalidateQueries({ queryKey: qk.habits(userId) });
    },
  });
}

export function useUpdateHabit() {
  const qc = useQueryClient();
  const userId = useAppStore((s) => s.userId);
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<HabitRow> }) =>
      Promise.resolve(updateHabit(id, updates)),
    onSuccess: () => {
      if (userId) qc.invalidateQueries({ queryKey: qk.habits(userId) });
    },
  });
}

export function useDeleteHabit() {
  const qc = useQueryClient();
  const userId = useAppStore((s) => s.userId);
  return useMutation({
    mutationFn: (id: string) => Promise.resolve(deleteHabit(id)),
    onSuccess: () => {
      if (userId) qc.invalidateQueries({ queryKey: qk.habits(userId) });
    },
  });
}

// ── Habit Logs (Quest Logs) ───────────────────────────────────────────────────

export function useHabitLogs(userId: string | null) {
  return useQuery({
    queryKey: qk.logs(userId ?? ""),
    queryFn: () => getHabitLogs(userId!),
    enabled: !!userId,
    staleTime: 1000 * 5,
  });
}

export function useHabitLogsByDate(userId: string | null, date: string) {
  return useQuery({
    queryKey: qk.logsByDate(userId ?? "", date),
    queryFn: () => getHabitLogsByDate(userId!, date),
    enabled: !!userId,
    staleTime: 1000 * 5,
  });
}

export function useHabitLogsSince(userId: string | null, since: string) {
  return useQuery({
    queryKey: qk.logsSince(userId ?? "", since),
    queryFn: () => getHabitLogsSince(userId!, since),
    enabled: !!userId,
    staleTime: 1000 * 5,
  });
}

export function useCompleteHabit() {
  const qc = useQueryClient();
  const setProfile = useAppStore((s) => s.setProfile);
  const profile = useAppStore((s) => s.profile);
  return useMutation({
    mutationFn: ({
      habitId,
      userId,
      date,
      expDelta,
    }: {
      habitId: string;
      userId: string;
      date: string;
      expDelta: number;
    }) => Promise.resolve(createHabitLog({ habit_id: habitId, user_id: userId, completed_at: date, exp_earned: expDelta })),
    onSuccess: (_data, variables) => {
      if (profile) {
        const updated = applyExpDelta(profile, variables.expDelta);
        const withStreak = updateStreak(updated);
        setProfile(withStreak);
        qc.invalidateQueries({ queryKey: qk.profile(variables.userId) });
      }
      qc.invalidateQueries({ queryKey: qk.logsByDate(variables.userId, variables.date) });
      qc.invalidateQueries({ queryKey: qk.logs(variables.userId) });
    },
  });
}

export function useUncompleteHabit() {
  const qc = useQueryClient();
  const setProfile = useAppStore((s) => s.setProfile);
  const profile = useAppStore((s) => s.profile);
  return useMutation({
    mutationFn: ({
      logId,
    }: {
      logId: string;
      userId: string;
      date: string;
      expDelta: number;
    }) => {
      deleteHabitLog(logId);
      return Promise.resolve(logId);
    },
    onSuccess: (_data, variables) => {
      if (profile) {
        const updated = applyExpDelta(profile, -variables.expDelta);
        const withStreak = updateStreak(updated);
        setProfile(withStreak);
        qc.invalidateQueries({ queryKey: qk.profile(variables.userId) });
      }
      qc.invalidateQueries({ queryKey: qk.logsByDate(variables.userId, variables.date) });
      qc.invalidateQueries({ queryKey: qk.logs(variables.userId) });
    },
  });
}

// ── Rewards (Shadow Treasury) ─────────────────────────────────────────────────

export function useRewards(userId: string | null) {
  return useQuery({
    queryKey: qk.rewards(userId ?? ""),
    queryFn: () => getRewards(userId!),
    enabled: !!userId,
    staleTime: 1000 * 10,
  });
}

export function useCreateReward() {
  const qc = useQueryClient();
  const userId = useAppStore((s) => s.userId);
  return useMutation({
    mutationFn: (data: Omit<RewardRow, "id" | "created_at" | "is_purchased" | "purchased_at">) =>
      Promise.resolve(createReward(data)),
    onSuccess: () => {
      if (userId) qc.invalidateQueries({ queryKey: qk.rewards(userId) });
    },
  });
}

export function usePurchaseReward() {
  const qc = useQueryClient();
  const setProfile = useAppStore((s) => s.setProfile);
  const profile = useAppStore((s) => s.profile);
  return useMutation({
    mutationFn: ({ rewardId, cost }: { rewardId: string; cost: number }) =>
      Promise.resolve({ result: purchaseReward(rewardId), cost }),
    onSuccess: (_data, variables) => {
      if (profile) {
        const updated = applyExpDelta(profile, -variables.cost);
        setProfile(updated);
        const userId = profile.id;
        qc.invalidateQueries({ queryKey: qk.profile(userId) });
        qc.invalidateQueries({ queryKey: qk.rewards(userId) });
      }
    },
  });
}

export function useDeleteReward() {
  const qc = useQueryClient();
  const userId = useAppStore((s) => s.userId);
  return useMutation({
    mutationFn: (id: string) => Promise.resolve(deleteReward(id)),
    onSuccess: () => {
      if (userId) qc.invalidateQueries({ queryKey: qk.rewards(userId) });
    },
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  const setProfile = useAppStore((s) => s.setProfile);
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<ProfileRow> }) =>
      Promise.resolve(updateProfile(id, updates)),
    onSuccess: (updated) => {
      setProfile(updated as unknown as import("@/lib/store").Profile);
      qc.invalidateQueries({ queryKey: qk.profile(updated.id) });
    },
  });
}
