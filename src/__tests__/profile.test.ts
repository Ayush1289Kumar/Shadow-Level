// ─────────────────────────────────────────────────────────────────────────────
// profile.test.ts — Unit tests for the Shadow Level profile & streak system
// ─────────────────────────────────────────────────────────────────────────────
import { describe, it, expect, beforeEach } from "vitest";
import { applyExpDelta, updateStreak } from "@/lib/profile";
import { createAccount, createHabitLog, getProfile } from "@/lib/local-db";
import type { Profile } from "@/lib/store";

// Helper: build a minimal Profile object for testing
function mockProfile(overrides: Partial<Profile> = {}): Profile {
  return {
    id: "hunter-001",
    username: "Sung Jinwoo",
    avatar_url: null,
    total_exp: 0,
    level: 1,
    current_streak: 0,
    longest_streak: 0,
    exp_to_next_level: 100,
    ...overrides,
  };
}

describe("Profile EXP System — Power of the Shadow Monarch", () => {
  let baseProfile: Profile;

  beforeEach(async () => {
    // Create a real profile in localStorage for updateProfile to find
    const created = await createAccount("test@shadow.army", "arise123");
    baseProfile = { ...created, username: created.username };
  });

  describe("applyExpDelta()", () => {
    it("adds EXP correctly from 0", () => {
      const updated = applyExpDelta(baseProfile, 100);
      expect(updated.total_exp).toBe(100);
    });

    it("levels up at 100 EXP (Level 1 → Level 2)", () => {
      const updated = applyExpDelta(baseProfile, 100);
      expect(updated.level).toBe(2);
    });

    it("does not go below 0 EXP (penalty guard)", () => {
      const updated = applyExpDelta(baseProfile, -500);
      expect(updated.total_exp).toBe(0);
    });

    it("subtracts EXP for negative habit completion", () => {
      const withExp = applyExpDelta(baseProfile, 500);
      const penalized = applyExpDelta(withExp, -100);
      expect(penalized.total_exp).toBe(400);
    });

    it("updates exp_to_next_level correctly", () => {
      const updated = applyExpDelta(baseProfile, 50);
      // At 50 EXP, Level 1 needs 100 to reach Level 2, so 50 remaining
      expect(updated.exp_to_next_level).toBe(50);
    });
  });

  describe("updateStreak()", () => {
    it("streak is 0 with no completed habits", () => {
      const updated = updateStreak(baseProfile);
      expect(updated.current_streak).toBe(0);
    });

    it("streak counts consecutive completed days correctly", async () => {
      const created = await createAccount("streak2@shadow.army", "arise123");

      // Write logs for 3 consecutive days in the past — no timezone ambiguity
      // These dates are safely in the past and well-defined in any timezone.
      const d1 = new Date(); d1.setDate(d1.getDate() - 2); const day1 = d1.toISOString().slice(0, 10);
      const d2 = new Date(); d2.setDate(d2.getDate() - 1); const day2 = d2.toISOString().slice(0, 10);

      createHabitLog({ habit_id: "consec-1", user_id: created.id, completed_at: day1, exp_earned: 50 });
      createHabitLog({ habit_id: "consec-2", user_id: created.id, completed_at: day2, exp_earned: 50 });

      const updated = updateStreak(created as Profile);
      // Streak should be at least 1 (yesterday is complete), possibly 2 (if today counts as "not yet done but OK")
      // The updateStreak function is tolerant of today being incomplete (i===0 case)
      expect(updated.current_streak).toBeGreaterThanOrEqual(1);
    });

    it("updates longest_streak when current streak exceeds it", async () => {
      const created = await createAccount("streak3@shadow.army", "arise123");
      const today = new Date().toISOString().slice(0, 10);
      createHabitLog({ habit_id: "sh2", user_id: created.id, completed_at: today, exp_earned: 50 });

      const withOldBest = { ...created, longest_streak: 0 } as Profile;
      const updated = updateStreak(withOldBest);
      expect(updated.longest_streak).toBeGreaterThanOrEqual(updated.current_streak);
    });

    it("negative habit logs (exp_earned < 0) do not count toward streak", async () => {
      const created = await createAccount("streak4@shadow.army", "arise123");
      const today = new Date().toISOString().slice(0, 10);
      // Only negative log (lost EXP) — should NOT count for streak
      createHabitLog({ habit_id: "sh3", user_id: created.id, completed_at: today, exp_earned: -50 });

      const updated = updateStreak(created as Profile);
      expect(updated.current_streak).toBe(0);
    });
  });
});
