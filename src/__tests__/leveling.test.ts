// ─────────────────────────────────────────────────────────────────────────────
// leveling.test.ts — Unit tests for the Shadow Level leveling system
// ─────────────────────────────────────────────────────────────────────────────
import { describe, it, expect } from "vitest";
import { computeLevel, expForLevel, expForNextLevel, levelProgress } from "@/lib/leveling";

describe("Leveling System — The Path of the Shadow Monarch", () => {
  describe("computeLevel()", () => {
    it("grants Level 1 at 0 EXP — the Weakest Hunter", () => {
      expect(computeLevel(0)).toBe(1);
    });

    it("grants Level 1 at 99 EXP — still unawakened", () => {
      expect(computeLevel(99)).toBe(1);
    });

    it("grants Level 2 at exactly 100 EXP — first awakening", () => {
      expect(computeLevel(100)).toBe(2);
    });

    it("grants Level 5 at 1600 EXP — D-Rank potential", () => {
      expect(computeLevel(1600)).toBe(5);
    });

    it("grants Level 10 at 8100 EXP — C-Rank gate cleared", () => {
      expect(computeLevel(8100)).toBe(10);
    });

    it("grants Level 50 at 240100 EXP — approaching Monarch", () => {
      expect(computeLevel(240100)).toBe(50);
    });

    it("never returns below 1 for negative EXP (safety guard)", () => {
      expect(computeLevel(-100)).toBe(1);
    });

    it("is consistent with expForLevel() — level matches its required EXP", () => {
      for (const level of [1, 2, 5, 10, 20, 50]) {
        const exp = expForLevel(level);
        expect(computeLevel(exp)).toBe(level);
      }
    });
  });

  describe("expForLevel()", () => {
    it("Level 1 requires 0 EXP — the starting point", () => {
      expect(expForLevel(1)).toBe(0);
    });

    it("Level 2 requires 100 EXP", () => {
      expect(expForLevel(2)).toBe(100);
    });

    it("Level 5 requires 1600 EXP", () => {
      expect(expForLevel(5)).toBe(1600);
    });

    it("Level 10 requires 8100 EXP", () => {
      expect(expForLevel(10)).toBe(8100);
    });

    it("follows (level-1)^2 * 100 formula", () => {
      for (const level of [1, 2, 3, 10, 25]) {
        expect(expForLevel(level)).toBe(Math.pow(level - 1, 2) * 100);
      }
    });
  });

  describe("expForNextLevel()", () => {
    it("next level from 1 is 100 EXP", () => {
      expect(expForNextLevel(1)).toBe(100);
    });

    it("next level from 2 is 400 EXP", () => {
      expect(expForNextLevel(2)).toBe(400);
    });

    it("expForNextLevel(n) equals expForLevel(n+1)", () => {
      for (const level of [1, 2, 5, 10]) {
        expect(expForNextLevel(level)).toBe(expForLevel(level + 1));
      }
    });
  });

  describe("levelProgress()", () => {
    it("returns 0% progress at Level 1 with 0 EXP", () => {
      const p = levelProgress(0);
      expect(p.level).toBe(1);
      expect(p.pct).toBe(0);
      expect(p.intoLevel).toBe(0);
    });

    it("returns 50% progress halfway through a level", () => {
      // Level 2 spans 100–400 EXP (span=300). Halfway = 250 EXP total.
      const p = levelProgress(250);
      expect(p.level).toBe(2);
      expect(p.pct).toBeCloseTo(50, 0);
    });

    it("returns 100% (capped) at exactly the next level threshold", () => {
      // 400 EXP = start of Level 3, which means 100% through Level 2
      const p = levelProgress(400);
      expect(p.level).toBe(3);
      expect(p.pct).toBe(0); // Now at start of Level 3
    });

    it("pct is always between 0 and 100", () => {
      for (const exp of [0, 50, 100, 500, 10000, 250000]) {
        const p = levelProgress(exp);
        expect(p.pct).toBeGreaterThanOrEqual(0);
        expect(p.pct).toBeLessThanOrEqual(100);
      }
    });

    it("toNext + intoLevel equals span (EXP within the level)", () => {
      for (const exp of [0, 150, 500, 5000]) {
        const p = levelProgress(exp);
        expect(p.intoLevel + p.toNext).toBe(p.span);
      }
    });
  });
});
