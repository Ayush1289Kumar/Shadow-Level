// ─────────────────────────────────────────────────────────────────────────────
// local-db.test.ts — Unit tests for the Shadow Level data layer
// ─────────────────────────────────────────────────────────────────────────────
import { describe, it, expect, beforeEach } from "vitest";
import {
  createAccount,
  loginAccount,
  getProfile,
  createHabit,
  getHabits,
  createHabitLog,
  getHabitLogs,
  getRewards,
  createReward,
} from "@/lib/local-db";

// ── Accounts & Auth ───────────────────────────────────────────────────────────

describe("Shadow Accounts — Authentication & Password Security", () => {
  it("createAccount() creates a profile and returns it", async () => {
    const profile = await createAccount("hunter@shadow.army", "arise123");
    expect(profile).toBeDefined();
    expect(profile.id).toBeTruthy();
    expect(profile.level).toBe(1);
    expect(profile.total_exp).toBe(0);
  });

  it("createAccount() stores a hashed password (never plaintext)", async () => {
    await createAccount("monarch@shadow.army", "password123");
    const raw = localStorage.getItem("shadow_accounts");
    const accounts = JSON.parse(raw!);
    expect(accounts[0].hashed).toBe(true);
    // The stored password should NOT equal the original
    expect(accounts[0].password).not.toBe("password123");
  });

  it("createAccount() throws on duplicate email", async () => {
    await createAccount("dupe@shadow.army", "arise123");
    await expect(createAccount("dupe@shadow.army", "other")).rejects.toThrow();
  });

  it("loginAccount() succeeds with correct password", async () => {
    await createAccount("login@shadow.army", "correctPass");
    const profile = await loginAccount("login@shadow.army", "correctPass");
    expect(profile).toBeDefined();
    expect(profile.id).toBeTruthy();
  });

  it("loginAccount() throws on wrong password", async () => {
    await createAccount("wrong@shadow.army", "realPassword");
    await expect(loginAccount("wrong@shadow.army", "wrongPassword")).rejects.toThrow(
      "Invalid password",
    );
  });

  it("loginAccount() throws on unknown email", async () => {
    await expect(loginAccount("ghost@shadow.army", "any")).rejects.toThrow(
      "No account found",
    );
  });

  it("Strategy A: loginAccount() auto-upgrades a legacy plaintext account", async () => {
    // Manually write a legacy account (hashed: false / undefined)
    const accounts = [{ email: "legacy@shadow.army", password: "oldpass", profileId: "test-id", hashed: false }];
    const profiles = [{ id: "test-id", username: "OldHunter", avatar_url: null, total_exp: 0, level: 1, current_streak: 0, longest_streak: 0, exp_to_next_level: 100, updated_at: new Date().toISOString() }];
    localStorage.setItem("shadow_accounts", JSON.stringify(accounts));
    localStorage.setItem("shadow_profiles", JSON.stringify(profiles));

    // Login should succeed and auto-upgrade
    const profile = await loginAccount("legacy@shadow.army", "oldpass");
    expect(profile.id).toBe("test-id");

    // Now verify the account was upgraded
    const updatedAccounts = JSON.parse(localStorage.getItem("shadow_accounts")!);
    expect(updatedAccounts[0].hashed).toBe(true);
    expect(updatedAccounts[0].password).not.toBe("oldpass");
  });
});

// ── Habits ────────────────────────────────────────────────────────────────────

describe("Shadow Quests — Habit CRUD", () => {
  const userId = "user-123";

  it("createHabit() creates and returns a habit", () => {
    const habit = createHabit({
      user_id: userId,
      name: "Morning Run",
      description: null,
      habit_type: "positive",
      exp_value: 50,
      frequency: "daily",
      is_active: true,
    });
    expect(habit.id).toBeTruthy();
    expect(habit.name).toBe("Morning Run");
    expect(habit.exp_value).toBe(50);
  });

  it("getHabits() returns only habits for the given user", () => {
    createHabit({ user_id: userId, name: "Push-ups", description: null, habit_type: "positive", exp_value: 10, frequency: "daily", is_active: true });
    createHabit({ user_id: "other-user", name: "Other", description: null, habit_type: "positive", exp_value: 5, frequency: "daily", is_active: true });

    const habits = getHabits(userId);
    expect(habits.length).toBe(1);
    expect(habits[0].name).toBe("Push-ups");
  });

  it("getHabits(activeOnly=true) filters inactive habits", () => {
    createHabit({ user_id: userId, name: "Active", description: null, habit_type: "positive", exp_value: 10, frequency: "daily", is_active: true });
    createHabit({ user_id: userId, name: "Inactive", description: null, habit_type: "positive", exp_value: 5, frequency: "daily", is_active: false });

    const active = getHabits(userId, true);
    expect(active.length).toBe(1);
    expect(active[0].name).toBe("Active");
  });
});

// ── Habit Logs ────────────────────────────────────────────────────────────────

describe("Quest Logs — Completion Tracking", () => {
  const userId = "user-456";

  it("createHabitLog() creates a log entry", () => {
    const log = createHabitLog({ habit_id: "habit-1", user_id: userId, completed_at: "2026-01-01", exp_earned: 50 });
    expect(log.id).toBeTruthy();
    expect(log.exp_earned).toBe(50);
  });

  it("createHabitLog() prevents duplicate logs for the same habit+date", () => {
    createHabitLog({ habit_id: "habit-2", user_id: userId, completed_at: "2026-01-01", exp_earned: 50 });
    expect(() =>
      createHabitLog({ habit_id: "habit-2", user_id: userId, completed_at: "2026-01-01", exp_earned: 50 }),
    ).toThrow("Already logged for today");
  });

  it("getHabitLogs() returns only logs for the given user", () => {
    createHabitLog({ habit_id: "iso-habit-a", user_id: userId, completed_at: "2025-06-15", exp_earned: 10 });
    createHabitLog({ habit_id: "iso-habit-b", user_id: "other-user", completed_at: "2025-06-15", exp_earned: 10 });

    const logs = getHabitLogs(userId);
    expect(logs.length).toBe(1);
    expect(logs[0].habit_id).toBe("iso-habit-a");
  });
});

// ── Rewards ───────────────────────────────────────────────────────────────────

describe("Shadow Treasury — Rewards", () => {
  const userId = "user-789";

  it("createReward() creates and returns a reward", () => {
    const reward = createReward({ user_id: userId, name: "Gaming Session", description: null, cost: 500 });
    expect(reward.id).toBeTruthy();
    expect(reward.is_purchased).toBe(false);
    expect(reward.cost).toBe(500);
  });

  it("getRewards() returns only rewards for the given user", () => {
    createReward({ user_id: userId, name: "My Reward", description: null, cost: 100 });
    createReward({ user_id: "other", name: "Other Reward", description: null, cost: 200 });

    const rewards = getRewards(userId);
    expect(rewards.length).toBe(1);
    expect(rewards[0].name).toBe("My Reward");
  });
});
