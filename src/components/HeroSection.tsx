import React, { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowDown,
  Flame,
  Sparkles,
  Trophy,
  Coins,
  Shield,
  Zap,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useHabits, useHabitLogsByDate } from "@/hooks/queries";
import { levelProgress } from "@/lib/leveling";
import { STRINGS } from "@/lib/strings";
import { sound } from "@/lib/audio";

// Scroll-scrubbed cinematic hero using frames from public/Hero/vid.mp4
const TOTAL_FRAMES = 120; // must match extracted frame count

function rankForStreak(streak: number): string {
  if (streak >= 90) return "S";
  if (streak >= 30) return "A";
  if (streak >= 14) return "B";
  if (streak >= 7) return "C";
  if (streak >= 3) return "D";
  return "E";
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function HeroSection() {
  const profile = useAppStore((s) => s.profile);
  const userId = useAppStore((s) => s.userId);
  const { data: habits = [] } = useHabits(userId, true);
  const { data: todayLogs = [] } = useHabitLogsByDate(userId, today());

  const activeHabitCount = habits.length;
  const doneToday = todayLogs.filter(
    (l: { exp_earned: number }) => l.exp_earned > 0,
  ).length;

  const level = profile?.level ?? 1;
  const totalExp = profile?.total_exp ?? 0;
  const streak = profile?.current_streak ?? 0;
  const longestStreak = profile?.longest_streak ?? 0;
  const rank = rankForStreak(streak);
  const rankLabel = STRINGS.ranks[rank] ?? `${rank}-Rank`;
  const lp = levelProgress(totalExp);

  // ── Scroll progress (0 → 1 over the 400vh hero) ────
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.5,
  });

  // ── Dynamic multi-axis entrances per stats block ──
  // Each block flies in from a distinct direction with its own rotation
  // path, then hands off on a different axis — kinetic, layered motion.
  // Level + XP: rises up from the bottom (awakening) with a sway + blur-focus
  const fadeLevel = useTransform(progress, [0, 0.1, 0.2, 0.24], [0, 1, 1, 0]);
  const levelY = useTransform(progress, [0, 0.12, 0.2, 0.24], [160, 0, 0, -120]);
  const levelX = useTransform(progress, [0, 0.1], [30, 0]);
  const levelRotate = useTransform(progress, [0, 0.14], [-12, 0]);
  const scaleLevel = useTransform(progress, [0, 0.1, 0.2, 0.24], [0.7, 1, 1.05, 1.1]);
  const blurLevel = useTransform(progress, [0, 0.1, 0.2, 0.24], [10, 0, 0, 6]);
  // Streak + Rank: slides in hard from the left, tilted
  const fadeStreak = useTransform(progress, [0.2, 0.3, 0.42, 0.46], [0, 1, 1, 0]);
  const streakX = useTransform(progress, [0.2, 0.32, 0.42, 0.46], [-360, 0, 0, 320]);
  const streakY = useTransform(progress, [0.2, 0.32], [40, 0]);
  const streakRotate = useTransform(progress, [0.2, 0.34], [-14, 0]);
  const scaleStreak = useTransform(progress, [0.2, 0.3, 0.42, 0.46], [0.8, 1, 1.05, 1.1]);
  const blurStreak = useTransform(progress, [0.2, 0.3, 0.42, 0.46], [10, 0, 0, 6]);
  // Habits: slides in from the left, tilted, and exits to the right
  const fadeHabits = useTransform(progress, [0.4, 0.5, 0.62, 0.66], [0, 1, 1, 0]);
  const habitsX = useTransform(progress, [0.4, 0.52, 0.62, 0.66], [-380, 0, 0, 340]);
  const habitsY = useTransform(progress, [0.4, 0.52], [-40, 0]);
  const habitsRotate = useTransform(progress, [0.4, 0.54], [-14, 0]);
  const scaleHabits = useTransform(progress, [0.4, 0.5, 0.62, 0.66], [0.8, 1, 1.05, 1.1]);
  const blurHabits = useTransform(progress, [0.4, 0.5, 0.62, 0.66], [10, 0, 0, 6]);
  // Rewards: shoots up from the bottom with an overshoot
  const fadeRewards = useTransform(progress, [0.6, 0.7, 0.82, 0.86], [0, 1, 1, 0]);
  const rewardsY = useTransform(progress, [0.6, 0.72, 0.82, 0.86], [180, 0, 0, -140]);
  const rewardsRotate = useTransform(progress, [0.6, 0.74], [-12, 0]);
  const scaleRewards = useTransform(progress, [0.6, 0.7, 0.82, 0.86], [0.8, 1, 1.05, 1.1]);
  const blurRewards = useTransform(progress, [0.6, 0.7, 0.82, 0.86], [10, 0, 0, 6]);
  // Summary: sweeps in diagonally (bottom-right → center)
  const fadeSummary = useTransform(progress, [0.82, 0.9], [0, 1]);
  const summaryX = useTransform(progress, [0.82, 0.92], [240, 0]);
  const summaryY = useTransform(progress, [0.82, 0.92], [90, 0]);
  const summaryRotate = useTransform(progress, [0.82, 0.92], [9, 0]);
  const scaleSummary = useTransform(progress, [0.82, 0.9], [0.7, 1]);
  const blurSummary = useTransform(progress, [0.82, 0.88], [10, 0]);
  const filterLevel = useTransform(blurLevel, (v) => `blur(${v}px)`);
  const filterStreak = useTransform(blurStreak, (v) => `blur(${v}px)`);
  const filterHabits = useTransform(blurHabits, (v) => `blur(${v}px)`);
  const filterRewards = useTransform(blurRewards, (v) => `blur(${v}px)`);
  const filterSummary = useTransform(blurSummary, (v) => `blur(${v}px)`);
  // Clean, consistent cinematic filter across all hero frames (no jarring spikes or discoloration)
  const canvasFilter = "brightness(0.92) contrast(1.08) saturate(1.15)";
  // Subtle ambient light shimmer
  const glareX = useTransform(progress, [0, 1], ["-100%", "200%"]);
  const glareOpacity = useTransform(progress, [0, 0.08, 0.92, 1], [0, 0.18, 0.18, 0]);

  // ── Canvas + frame preloading ──────────────────────
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrame = useRef(0);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Preload and pre-decode all frames once on mount
  useEffect(() => {
    let cancelled = false;
    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i).padStart(3, "0");
      img.src = `/frames/hero/frame_${num}.jpg`;
      img.onload = () => {
        img
          .decode()
          .catch(() => {})
          .finally(() => {
            if (!cancelled) {
              images[i - 1] = img;
              imagesRef.current = images;
            }
          });
      };
      img.onerror = () => {
        if (!cancelled) {
          images[i - 1] = img;
          imagesRef.current = images;
        }
      };
    }

    return () => {
      cancelled = true;
      imagesRef.current = [];
    };
  }, []);

  // Mouse parallax (subtle 2D motion, no 3D perspective distortion)
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth - 0.5) * 16;
      mouse.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 16;
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  // Render loop — draw frame based on progress
  useEffect(() => {
    let raf: number;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.max(320, Math.floor(rect.width));
      const targetH = Math.max(180, Math.floor(rect.height));

      canvas.width = Math.floor(targetW * dpr);
      canvas.height = Math.floor(targetH * dpr);
      canvas.style.width = `${targetW}px`;
      canvas.style.height = `${targetH}px`;
    };

    updateSize();

    const ro = new ResizeObserver(() => {
      updateSize();
    });
    ro.observe(container);
    window.addEventListener("resize", updateSize);

    const drawCover = (img: HTMLImageElement) => {
      const iw = img.naturalWidth || 1280;
      const ih = img.naturalHeight || 720;
      const iA = iw / ih;
      const cA = canvas.width / canvas.height;
      let w = canvas.width;
      let h = canvas.height;
      if (cA > iA) {
        h = canvas.width / iA;
      } else {
        w = canvas.height * iA;
      }
      // Clean 1.01 bleed factor to prevent sub-pixel seams
      w *= 1.01;
      h *= 1.01;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, cx - w / 2, cy - h / 2, w, h);
    };

    const loop = () => {
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;
      if (canvas) {
        canvas.style.transform = `translate3d(${mouse.current.x * 0.35}px, ${-mouse.current.y * 0.35}px, 0) scale(1.02)`;
      }

      const frames = imagesRef.current;
      if (frames.length > 0) {
        const p = progress.get();
        const clampedP = Math.max(0, Math.min(1, p));
        const idx = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(clampedP * (TOTAL_FRAMES - 1)),
        );
        currentFrame.current = idx;
        
        // Find nearest loaded frame if current frame is still loading
        let img = frames[idx];
        if (!img || !img.complete || img.naturalWidth === 0) {
          for (let d = 1; d < TOTAL_FRAMES; d++) {
            const before = frames[idx - d];
            if (before && before.complete && before.naturalWidth > 0) {
              img = before;
              break;
            }
            const after = frames[idx + d];
            if (after && after.complete && after.naturalWidth > 0) {
              img = after;
              break;
            }
          }
        }

        if (img && img.complete && img.naturalWidth > 0) {
          drawCover(img);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateSize);
      cancelAnimationFrame(raf);
    };
  }, [progress]);

  // ── Solo Leveling gamified sound cues when overlays appear ──
  useEffect(() => {
    sound.preload(["systemAlert", "streak", "questAccept", "rewardClaim", "arise"]);
    let lastSection = -1;

    const unsubscribe = progress.on("change", (p) => {
      // Ignore top resting position
      if (p < 0.05) {
        lastSection = -1;
        return;
      }

      let activeSection = -1;
      if (p >= 0.08 && p <= 0.23) {
        activeSection = 0; // Level & System Status
      } else if (p >= 0.28 && p <= 0.44) {
        activeSection = 1; // Streak & Hunter Rank
      } else if (p >= 0.48 && p <= 0.64) {
        activeSection = 2; // Quests Completed Today
      } else if (p >= 0.68 && p <= 0.84) {
        activeSection = 3; // Shadow Treasury
      } else if (p >= 0.87) {
        activeSection = 4; // Final Awakened Summary
      }

      if (activeSection !== -1 && activeSection !== lastSection) {
        lastSection = activeSection;
        switch (activeSection) {
          case 0:
            sound.play("systemAlert"); // Solo Leveling System Status window pop
            break;
          case 1:
            sound.play("streak"); // Hunter Rank & streak resonance
            break;
          case 2:
            sound.play("questAccept"); // Solo Leveling Daily Quest announcement
            break;
          case 3:
            sound.play("rewardClaim"); // Shadow Treasury crystal sound
            break;
          case 4:
            sound.play("arise"); // Solo Leveling Arise Awakening chime
            break;
          default:
            sound.play("systemAlert");
            break;
        }
      } else if (activeSection === -1) {
        // Reset when user travels in between overlay threshold bands
        const inBetween =
          (p > 0.23 && p < 0.28) ||
          (p > 0.44 && p < 0.48) ||
          (p > 0.64 && p < 0.68) ||
          (p > 0.84 && p < 0.87);
        if (inBetween) {
          lastSection = -1;
        }
      }
    });

    return () => unsubscribe();
  }, [progress]);

  return (
    <section ref={scrollRef} className="relative h-[400vh] bg-void">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* CSS container constraint and aspect-ratio enforcement */}
        <div
          ref={containerRef}
          className="relative w-full h-full max-w-[1920px] max-h-screen aspect-[16/9] mx-auto flex items-center justify-center overflow-hidden"
        >
          <motion.canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full aspect-[16/9] object-cover will-change-transform"
            style={{ filter: canvasFilter }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/70 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-void/50 via-transparent to-void/50 pointer-events-none" />

          {/* Sweeping light glare that travels across the frame with scroll */}
          <motion.div
            className="absolute top-0 bottom-0 w-1/4 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent blur-2xl"
            style={{ left: glareX, opacity: glareOpacity }}
          />
        </div>

        {/* Ambient edge vignette integration */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(8,8,13,0.85)]" />

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground pointer-events-none" style={{ opacity: useTransform(progress, [0, 0.12], [1, 0]) }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em]">Scroll to Awaken</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ArrowDown className="h-5 w-5 text-mana" />
          </motion.div>
        </motion.div>

        {/* 1) LEVEL + XP */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ opacity: fadeLevel }}>
          <motion.div style={{ x: levelX, y: levelY, rotate: levelRotate, scale: scaleLevel, filter: filterLevel }} className="text-center">
            <div className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">System Status</div>
            <div className="font-display text-6xl md:text-7xl font-bold text-moonlight text-glow-mana mt-3">LEVEL {level}</div>
            <div className="mt-6 flex items-center gap-3 font-mono text-sm text-ash">
              <Trophy className="h-4 w-4 text-warning" />
              <span>{totalExp.toLocaleString()} XP · <span className="text-mana">{lp.toNext} XP to next</span></span>
            </div>
            <div className="mt-4 h-2 w-64 md:w-96 rounded-full bg-mist border border-shade overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-mana-dark to-mana" style={{ width: `${lp.pct}%` }} />
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ash">{lp.pct.toFixed(0)}% of Level {level + 1}</div>
          </motion.div>
        </motion.div>

        {/* 2) STREAK + RANK */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ opacity: fadeStreak }}>
          <motion.div style={{ x: streakX, y: streakY, rotate: streakRotate, scale: scaleStreak, filter: filterStreak }} className="flex items-center gap-10 md:gap-16">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-penalty/40 bg-abyss/60">
                <Flame className="h-8 w-8 text-danger" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Current Streak</div>
              <div className="font-display text-4xl md:text-5xl font-bold text-moonlight mt-2">{streak}<span className="text-mana">d</span></div>
              <div className="font-mono text-xs text-ash mt-1">Longest: {longestStreak}d</div>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-mana/40 bg-abyss/60">
                <Shield className="h-8 w-8 text-mana" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Hunter Rank</div>
              <div className="font-display text-4xl md:text-5xl font-bold text-mana text-glow-mana mt-2">{rankLabel}</div>
              <div className="font-mono text-xs text-ash mt-1">{rank === "E" ? "Every legend starts at E" : `Cleared ${rank}-Gate`}</div>
            </div>
          </motion.div>
        </motion.div>

        {/* 3) HABITS DONE TODAY + ACTIVE */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ opacity: fadeHabits }}>
          <motion.div style={{ x: habitsX, y: habitsY, rotate: habitsRotate, scale: scaleHabits, filter: filterHabits }} className="flex items-center gap-10 md:gap-16">
            <div className="glass px-10 py-8 text-center border border-mana/20">
              <Sparkles className="mx-auto mb-3 h-8 w-8 text-mana" />
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Quests Completed Today</div>
              <div className="font-display text-5xl md:text-6xl font-bold text-moonlight mt-3">{doneToday}</div>
            </div>
            <div className="glass px-10 py-8 text-center border border-mana/20">
              <Shield className="mx-auto mb-3 h-8 w-8 text-mana-bright" />
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Active Dungeons</div>
              <div className="font-display text-5xl md:text-6xl font-bold text-moonlight mt-3">{activeHabitCount}</div>
            </div>
          </motion.div>
        </motion.div>

        {/* 4) REWARD POINTS */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ opacity: fadeRewards }}>
          <motion.div style={{ y: rewardsY, rotate: rewardsRotate, scale: scaleRewards, filter: filterRewards }} className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-warning/40 bg-abyss/60">
              <Coins className="h-8 w-8 text-warning" />
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Reward Points · Shadow Treasury</div>
            <div className="font-display text-6xl md:text-7xl font-bold text-warning mt-3">{totalExp.toLocaleString()}</div>
            <div className="font-mono text-xs text-ash mt-2">Spendable EXP on the Shadow Treasury</div>
          </motion.div>
        </motion.div>

        {/* 5) FINAL SUMMARY CARD */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none" style={{ opacity: fadeSummary }}>
          <motion.div style={{ x: summaryX, y: summaryY, rotate: summaryRotate, scale: scaleSummary, filter: filterSummary }} className="glass-strong max-w-lg w-full p-10 text-center border-t-2 border-t-mana/30">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-mana mb-2">[ System Notification ]</div>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-moonlight uppercase tracking-wider text-glow-mana">Shadow Level Awakened</h3>
            <p className="mt-4 text-muted-foreground text-sm">
              You are a <span className="text-mana font-semibold">{rankLabel}</span> Hunter at{" "}
              <span className="text-mana font-semibold">Level {level}</span> with a{" "}
              <span className="text-mana font-semibold">{streak}-day</span> streak. Claim today's quests to rise further.
            </p>
            <div className="mt-6 flex items-center justify-center gap-6 font-mono text-xs text-ash">
              <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-mana" /> {activeHabitCount} Forged</span>
              <span className="flex items-center gap-1"><Trophy className="h-3.5 w-3.5 text-warning" /> {doneToday} Done</span>
              <span className="flex items-center gap-1"><Coins className="h-3.5 w-3.5 text-warning" /> {totalExp.toLocaleString()} XP</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
