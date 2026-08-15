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

  // Opacity / translate transforms per stats block
  const fadeLevelX = useTransform(progress, [0, 0.1, 0.2, 0.24], [0, 1, 1, 0]);
  const fadeLevelY = useTransform(progress, [0, 0.1, 0.2, 0.24], [40, 0, 0, -40]);
  const fadeStreakX = useTransform(progress, [0.2, 0.3, 0.42, 0.46], [0, 1, 1, 0]);
  const fadeStreakY = useTransform(progress, [0.2, 0.3, 0.42, 0.46], [40, 0, 0, -40]);
  const fadeHabitsX = useTransform(progress, [0.4, 0.5, 0.62, 0.66], [0, 1, 1, 0]);
  const fadeHabitsY = useTransform(progress, [0.4, 0.5, 0.62, 0.66], [40, 0, 0, -40]);
  const fadeRewardsX = useTransform(progress, [0.6, 0.7, 0.82, 0.86], [0, 1, 1, 0]);
  const fadeRewardsY = useTransform(progress, [0.6, 0.7, 0.82, 0.86], [40, 0, 0, -40]);
  const fadeSummaryX = useTransform(progress, [0.82, 0.9], [0, 1]);

  // ── Canvas + frame preloading ──────────────────────
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(0);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Preload all frames once on mount
  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i).padStart(3, "0");
      img.src = `/frames/hero/frame_${num}.jpg`;
      img.onload = () => {
        img
          .decode()
          .then(() => {
            if (!cancelled && ++loaded === TOTAL_FRAMES) {
              imagesRef.current = images;
            }
          })
          .catch(() => {
            if (!cancelled && ++loaded === TOTAL_FRAMES) {
              imagesRef.current = images;
            }
          });
      };
      img.onerror = () => {
        if (!cancelled && ++loaded === TOTAL_FRAMES) {
          imagesRef.current = images;
        }
      };
      images.push(img);
    }

    return () => {
      cancelled = true;
      imagesRef.current = [];
    };
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth - 0.5) * 25;
      mouse.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 25;
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  // Render loop — draw frame based on progress
  useEffect(() => {
    let raf: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawCover = (img: HTMLImageElement) => {
      const iw = img.naturalWidth || 1920;
      const ih = img.naturalHeight || 1080;
      const iA = iw / ih;
      const cA = canvas.width / canvas.height;
      let w = canvas.width;
      let h = canvas.height;
      let x = 0;
      let y = 0;
      if (cA > iA) {
        h = canvas.width / iA;
        y = (canvas.height - h) / 2;
      } else {
        w = canvas.height * iA;
        x = (canvas.width - w) / 2;
      }
      ctx.drawImage(img, x, y, w, h);
    };

    const loop = () => {
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;
      if (canvas) {
        canvas.style.transform = `perspective(1000px) rotateX(${mouse.current.y * 0.25}deg) rotateY(${mouse.current.x * 0.25}deg) scale(1.04)`;
      }

      const frames = imagesRef.current;
      if (frames.length === TOTAL_FRAMES) {
        const p = progress.get();
        const idx = Math.max(
          0,
          Math.min(TOTAL_FRAMES - 1, Math.floor(p * (TOTAL_FRAMES - 1))),
        );
        if (idx !== currentFrame.current) {
          currentFrame.current = idx;
          const img = frames[idx];
          if (img && img.complete) drawCover(img);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [progress]);

  return (
    <section ref={scrollRef} className="relative h-[400vh] bg-void">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full will-change-transform" style={{ filter: "brightness(0.82) contrast(1.12) saturate(1.25)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/45 via-transparent to-void/45 pointer-events-none" />

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground pointer-events-none" style={{ opacity: useTransform(progress, [0, 0.12], [1, 0]) }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em]">Scroll to Awaken</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ArrowDown className="h-5 w-5 text-mana" />
          </motion.div>
        </motion.div>

        {/* 1) LEVEL + XP */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ opacity: fadeLevelX }}>
          <motion.div style={{ y: fadeLevelY }} className="text-center">
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
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ opacity: fadeStreakX }}>
          <motion.div style={{ y: fadeStreakY }} className="flex items-center gap-10 md:gap-16">
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
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ opacity: fadeHabitsX }}>
          <motion.div style={{ y: fadeHabitsY }} className="flex items-center gap-10 md:gap-16">
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
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ opacity: fadeRewardsX }}>
          <motion.div style={{ y: fadeRewardsY }} className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-warning/40 bg-abyss/60">
              <Coins className="h-8 w-8 text-warning" />
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Reward Points · Shadow Treasury</div>
            <div className="font-display text-6xl md:text-7xl font-bold text-warning mt-3">{totalExp.toLocaleString()}</div>
            <div className="font-mono text-xs text-ash mt-2">Spendable EXP on the Shadow Treasury</div>
          </motion.div>
        </motion.div>

        {/* 5) FINAL SUMMARY CARD */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none" style={{ opacity: fadeSummaryX }}>
          <motion.div initial={{ y: 40 }} style={{ y: useTransform(progress, [0.82, 0.95], [40, 0]) }} className="glass-strong max-w-lg w-full p-10 text-center border-t-2 border-t-mana/30">
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
