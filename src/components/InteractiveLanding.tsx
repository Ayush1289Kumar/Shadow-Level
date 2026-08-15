import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAppStore } from "@/lib/store";
import { playSound } from "@/lib/audio";
import { Button } from "@/components/ui/button";
import * as THREE from "three";
import {
  Sword, Shield, Activity, Star, Zap, Volume2, VolumeX, ArrowDown, ChevronRight,
  Menu, X, Sparkles, Trophy, Check, ArrowRight
} from "lucide-react";

// --- CINEMATIC LOADER ---
function CinematicLoader({ onComplete, ready }: { onComplete: () => void; ready: boolean }) {
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState("Scanning...");

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 95 && !ready) {
          return 95; // Hold at 95% until frames are preloaded
        }
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [ready]);

  useEffect(() => {
    if (percent === 20) setStatus("Loading Assets...");
    if (percent === 55) setStatus("Establishing Connection...");
    if (percent === 85) setStatus("Syncing Player Data...");
    if (percent === 95 && !ready) setStatus("Preloading Portal Frames...");
    if (percent === 100) {
      setStatus("Ready");
      setTimeout(() => {
        playSound("systemAlert");
      }, 200);

      setTimeout(() => {
        onComplete();
      }, 700);
    }
  }, [percent, onComplete, ready]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ scale: 1.05, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-void"
    >
      <div className="w-full max-w-md px-6 text-center">
        <motion.h2
          animate={{ opacity: [1, 0.4, 1, 0.8, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="font-display text-3xl font-bold tracking-widest text-[#06B6D4] text-glow-mana uppercase"
        >
          System Initializing
        </motion.h2>

        <p className="mt-2 text-xs font-mono text-ash uppercase tracking-widest">
          {status}
        </p>

        <div className="relative mt-8 h-1 w-full bg-abyss rounded-full overflow-hidden border border-mist">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${percent}%` }}
            transition={{ ease: "easeOut", duration: 0.1 }}
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_8px_#06B6D4]"
          />
        </div>

        <span className="mt-2 inline-block font-mono text-sm text-[#06B6D4] text-glow-mana">
          {percent}%
        </span>
      </div>
    </motion.div>
  );
}

// --- SCROLL SCRUBBED CANVAS GATE / PORTAL ---
function ScrollScrubGate({ ariseBurstTrigger, onPreloadComplete }: { ariseBurstTrigger: number; onPreloadComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const scrollProgress = useRef(0);
  const currentFrameRef = useRef(0);
  const ariseActiveRef = useRef(false);
  const ariseFrameRef = useRef(0);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Preload and pre-decode all 100 frames
  useEffect(() => {
    let loadedCount = 0;
    const totalFrames = 100;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/frames/frame_${frameNum}.jpg`;

      const handleLoad = () => {
        // Trigger pre-decoding to ensure zero jank during scroll-scrubbing
        img.decode().then(() => {
          loadedCount++;
          if (loadedCount === totalFrames) {
            imagesRef.current = images;
            onPreloadComplete();
          }
        }).catch(() => {
          loadedCount++;
          if (loadedCount === totalFrames) {
            imagesRef.current = images;
            onPreloadComplete();
          }
        });
      };

      img.onload = handleLoad;
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          imagesRef.current = images;
          onPreloadComplete();
        }
      };
      images.push(img);
    }
  }, [onPreloadComplete]);

  // Track mouse for 3D parallax tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = ((e.clientX / window.innerWidth) - 0.5) * 35;
      mouse.current.targetY = -((e.clientY / window.innerHeight) - 0.5) * 35;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (ariseActiveRef.current) return;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      scrollProgress.current = progress;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Render loop
  useEffect(() => {
    let animationId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawCoverImage = (img: HTMLImageElement) => {
      if (!ctx || !canvas) return;
      // Removed clearRect to prevent visual flashing between frames

      const imgWidth = img.naturalWidth || 3840;
      const imgHeight = img.naturalHeight || 2160;
      const imgAspect = imgWidth / imgHeight;
      const canvasAspect = canvas.width / canvas.height;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasAspect > imgAspect) {
        drawHeight = canvas.width / imgAspect;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgAspect;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const render = () => {
      // Lerp mouse coordinates
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

      if (canvas) {
        canvas.style.transform = `perspective(1000px) rotateX(${mouse.current.y * 0.3}deg) rotateY(${mouse.current.x * 0.3}deg) scale(1.03)`;
      }

      if (imagesRef.current.length === 100) {
        let frameIndex = 0;

        if (ariseActiveRef.current) {
          ariseFrameRef.current += 1.5; // Fast forward through portal entry
          frameIndex = Math.min(99, Math.floor(ariseFrameRef.current));
        } else {
          frameIndex = Math.floor(scrollProgress.current * 99);
          frameIndex = Math.max(0, Math.min(99, frameIndex));
          ariseFrameRef.current = frameIndex;
        }

        currentFrameRef.current = frameIndex;
        const img = imagesRef.current[frameIndex];
        if (img && img.complete) {
          drawCoverImage(img);
        }
      }

      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Handle Arise portal warp activation
  useEffect(() => {
    if (ariseBurstTrigger === 0) return;
    ariseActiveRef.current = true;
  }, [ariseBurstTrigger]);

  return (
    <div className="fixed inset-0 z-0 bg-void pointer-events-none flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full transition-transform duration-100 ease-out will-change-transform opacity-75"
        style={{ filter: "brightness(0.85) contrast(1.1) saturate(1.2)" }}
      />
      {/* Dark overlay gradients for dramatic effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/50 via-transparent to-void/50 pointer-events-none" />
    </div>
  );
}

// --- CUSTOM CURSOR SYSTEM ---
interface CursorRipple {
  id: number;
  x: number;
  y: number;
}

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hoverState, setHoverState] = useState<"default" | "hover" | "view">("default");
  const [ripples, setRipples] = useState<CursorRipple[]>([]);
  const ringX = useSpring(-100, { damping: 30, stiffness: 200 });
  const ringY = useSpring(-100, { damping: 30, stiffness: 200 });
  const hoveredElementRef = useRef<Element | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      ringX.set(e.clientX - 16);
      ringY.set(e.clientY - 16);

      const target = e.target as HTMLElement;
      const hoverEl = target.closest("a, button, [role='button'], [data-cursor='hover'], [data-cursor='view']");
      
      let nextState: "default" | "hover" | "view" = "default";
      if (hoverEl) {
        if (hoverEl.getAttribute("data-cursor") === "view") {
          nextState = "view";
        } else {
          nextState = "hover";
        }
      }

      if (hoverEl !== hoveredElementRef.current) {
        if (hoverEl) {
          playSound("uiHover");
        }
        hoveredElementRef.current = hoverEl;
        setHoverState(nextState);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      playSound("skillUse");
      setRipples((prev) => [...prev, { id: Date.now(), x: e.clientX, y: e.clientY }]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [ringX, ringY]);

  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  return (
    <>
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hoverState === "hover" ? 48 : hoverState === "view" ? 64 : 32,
          height: hoverState === "hover" ? 48 : hoverState === "view" ? 64 : 32,
          borderColor: hoverState === "view" ? "#06B6D4" : "#3B82F6"
        }}
        className="pointer-events-none fixed left-0 top-0 z-[10000] rounded-full border-[1.5px] bg-transparent opacity-60 mix-blend-difference"
      >
        {hoverState === "view" && (
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[8px] font-bold text-[#06B6D4] uppercase">
            View
          </span>
        )}
      </motion.div>

      <div
        style={{ left: position.x - 3, top: position.y - 3 }}
        className="pointer-events-none fixed z-[10000] h-1.5 w-1.5 rounded-full bg-mana-bright mix-blend-difference"
      />

      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ x: ripple.x - 16, y: ripple.y - 16, scale: 0.5, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="pointer-events-none fixed z-[10000] h-8 w-8 rounded-full border border-mana-bright opacity-0"
        />
      ))}
    </>
  );
}

// --- TEXT SCRAMBLE COMPONENT (Slow) ---
// Hacker-decrypt effect: characters resolve one-by-one from random glyphs.
// Tick: 50ms, step: 1/6 per tick → each char locks in over ~300ms.
function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "█▓▒░#@%&<>[]{}*+=_";

  useEffect(() => {
    let timeoutId: number;
    let intervalId: number;

    timeoutId = window.setTimeout(() => {
      let iteration = 0;

      intervalId = window.setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(intervalId);
          setDisplayText(text);
        }

        iteration += 1 / 4; // 2× slower than original
      }, 40); // 40ms tick (was 30ms)
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay]);

  return <span>{displayText}</span>;
}

// --- MAGNETIC BUTTON WRAPPER ---
function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = el.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 80) {
      const pullX = (dx / 80) * 12;
      const pullY = (dy / 80) * 12;
      setPosition({ x: pullX, y: pullY });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

// --- MAIN LANDING VIEW ---
export function InteractiveLanding() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [framesLoaded, setFramesLoaded] = useState(false);
  const [ariseBurstTrigger, setAriseBurstTrigger] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [muted, setMuted] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wipeActive, setWipeActive] = useState(false);
  const navigate = useNavigate();
  const userId = useAppStore((s) => s.userId);

  const { scrollY } = useScroll();
  const navBgOpacity = useTransform(scrollY, [0, 80], [0, 0.8]);
  const heroParallaxBg = useTransform(scrollY, [0, 500], [0, 150]);
  const heroParallaxText = useTransform(scrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);



  useEffect(() => {
    localStorage.setItem("shadow_muted", String(muted));
    const audioState = useAppStore.getState().audio;
    useAppStore.setState({
      audio: {
        ...audioState,
        muted
      }
    });
  }, [muted]);

  const handleNavigationWithTransition = (to: string) => {
    playSound("arise");
    setAriseBurstTrigger((prev) => prev + 1);
    setIsTransitioning(true); // Fade out front page elements

    setTimeout(() => {
      navigate({ to });
    }, 1200);
  };

  const handleAriseClick = () => {
    handleNavigationWithTransition(userId ? "/dashboard" : "/auth");
  };

  const handleNavLinkHover = () => {
    playSound("uiHover");
  };

  const handleToggleBilling = () => {
    playSound("skillUse");
    setIsAnnual(!isAnnual);
  };

  return (
    <div className="relative min-h-screen bg-void text-moonlight overflow-x-hidden selection:bg-mana selection:text-moonlight">
      {/* Cinematic Loading Overlay */}
      <AnimatePresence>
        {!loadingComplete && (
          <CinematicLoader onComplete={() => setLoadingComplete(true)} ready={framesLoaded} />
        )}
      </AnimatePresence>

      {/* Screen Wipes between chapters */}
      <AnimatePresence>
        {wipeActive && (
          <motion.div
            initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
            animate={{
              clipPath: [
                "polygon(0 0, 0 0, 0 100%, 0 100%)",
                "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
              ]
            }}
            exit={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[98] bg-void pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Scroll Scrub Gate Portal Background */}
      <ScrollScrubGate ariseBurstTrigger={ariseBurstTrigger} onPreloadComplete={() => setFramesLoaded(true)} />

      {/* Custom Cursor System */}
      <CustomCursor />

      <motion.div
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className={isTransitioning ? "pointer-events-none" : ""}
      >

        {/* Floating Mute Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setMuted(!muted)}
          className="fixed bottom-6 left-6 z-[999] flex h-10 w-10 items-center justify-center rounded-full bg-shade/80 backdrop-blur border border-mist shadow-lg text-glow-mana"
          title="Sound On/Off"
        >
          {muted ? <VolumeX className="h-5 w-5 text-penalty" /> : <Volume2 className="h-5 w-5 text-mana" />}
        </motion.button>

        {/* --- NAVBAR --- */}
        <motion.header
          style={{ backgroundColor: `rgba(13, 13, 20, ${navBgOpacity})` }}
          className="fixed left-0 top-0 z-[99] w-full border-b border-mist/20 backdrop-blur-sm transition-all duration-300"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link
              to="/"
              onClick={() => playSound("gateOpen")}
              className="flex items-center gap-2 font-display text-xl font-bold tracking-wider text-glow-mana text-mana uppercase"
            >
              <Sword className="h-5 w-5" />
              Shadow Level
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-8 md:flex">
              {["features", "stats"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onMouseEnter={handleNavLinkHover}
                  className="relative text-sm uppercase tracking-wider text-silver hover:text-moonlight transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
              {userId ? (
                <Button
                  onClick={() => handleNavigationWithTransition("/dashboard")}
                  className="bg-gradient-to-r from-mana to-mana-bright text-moonlight font-bold uppercase rounded-xl shadow-lg hover:shadow-mana/20 border-0"
                >
                  Enter System
                </Button>
              ) : (
                <Button
                  onClick={() => handleNavigationWithTransition("/auth")}
                  className="bg-transparent hover:bg-abyss border border-mist text-silver font-bold uppercase rounded-xl"
                >
                  Sign In
                </Button>
              )}
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => {
                playSound("gateOpen");
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="flex md:hidden text-silver hover:text-moonlight"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile menu panel */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-abyss border-b border-mist md:hidden"
              >
                <div className="flex flex-col gap-4 px-6 py-6 font-mono text-sm uppercase">
                  {["features", "stats"].map((item) => (
                    <a
                      key={item}
                      href={`#${item}`}
                      onClick={() => {
                        playSound("navSwitch");
                        setMobileMenuOpen(false);
                      }}
                      className="text-silver hover:text-moonlight"
                    >
                      {item}
                    </a>
                  ))}
                  {userId ? (
                    <Button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleNavigationWithTransition("/dashboard");
                      }}
                      className="w-full bg-gradient-to-r from-mana to-mana-bright text-moonlight font-bold uppercase rounded-xl border-0"
                    >
                      Enter System
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleNavigationWithTransition("/auth");
                      }}
                      className="w-full bg-transparent border border-mist text-silver font-bold uppercase rounded-xl"
                    >
                      Sign In
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* --- HERO SECTION --- */}
        <section className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-24 overflow-hidden">
          <motion.div
            style={{ y: heroParallaxBg }}
            className="absolute inset-0 z-0 bg-mana-radial opacity-40 pointer-events-none"
          />

          <motion.div
            style={{ y: heroParallaxText, opacity: heroOpacity }}
            className="relative z-10 max-w-4xl text-center flex flex-col items-center"
          >


            {/* Scramble Text Heading */}
            <h1 className="mt-6 text-hero text-glow-mana-bright uppercase tracking-wider font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-moonlight to-silver">
              {loadingComplete ? <ScrambleText text="Arise, Hunter" delay={0.3} /> : <span className="opacity-0">Arise, Hunter</span>}
            </h1>

            <p className="mt-6 max-w-xl text-body text-silver">
              A fan-made daily habit and quest tracker inspired by Solo Leveling. Complete real-life tasks, build streaks, level up your stats, and summon your shadow army. Built for fun and gamified productivity.
            </p>

            {/* Magnetic CTA button wrapper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.3, duration: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Magnetic>
                <Button
                  onClick={handleAriseClick}
                  className="group relative h-14 px-8 bg-gradient-to-r from-mana to-mana-bright text-moonlight font-bold uppercase rounded-xl shadow-[0_0_24px_var(--glow-mana)] border border-mana/20 hover:shadow-[0_0_36px_var(--glow-mana)] transition-all duration-300"
                >
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Magnetic>

              <a href="#features">
                <Button className="h-14 px-8 bg-transparent hover:bg-abyss border border-mist text-silver font-bold uppercase rounded-xl">
                  Explore Features
                </Button>
              </a>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="mt-16 text-ash flex flex-col items-center gap-1 text-xs uppercase font-mono tracking-widest"
            >
              <span>Scroll to Enter Dungeon</span>
              <ArrowDown className="h-4 w-4 text-mana" />
            </motion.div>
          </motion.div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section id="features" className="relative z-10 py-24 border-t border-mist/20 bg-transparent px-6">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-display text-glow-mana text-moonlight uppercase">
                System Features
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-silver">
                Gamify your productivity. This personal side-project lets you extract shadow soldiers from completed habits and view your status parameters.
              </p>
            </motion.div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <Sword className="h-6 w-6 text-mana" />,
                  title: "Quest Board",
                  desc: "Receive daily habits and quests. Claim experience points and upgrade your level."
                },
                {
                  icon: <Shield className="h-6 w-6 text-mana-light" />,
                  title: "Shadow Extraction",
                  desc: "Extract souls from completed tasks to form your shadow army. Stagger list cards to fight dungeon blocks."
                },
                {
                  icon: <Activity className="h-6 w-6 text-mana-bright" />,
                  title: "Status Monitor",
                  desc: "Detailed monitors for Strength, Agility, and Intelligence parameters. Fulfill conditions to unlock level achievements."
                }
              ].map((feat, idx) => (
                <motion.div
                  key={idx}
                  data-cursor="hover"
                  initial={{ opacity: 0, y: 50, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-depth/80 border border-mist/40 backdrop-blur-md p-8 relative overflow-hidden group hover:border-mana/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300 rounded-2xl"
                >
                  <div className="rounded-xl bg-depth/40 p-3 w-fit border border-mana/20 group-hover:bg-mana/10 transition-colors duration-300">
                    {feat.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-bold uppercase text-moonlight">{feat.title}</h3>
                  <p className="mt-3 text-sm text-silver leading-relaxed">{feat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- STATS STATUS WINDOW SECTION --- */}
        <section id="stats" className="relative z-10 py-24 px-6 border-t border-mist/20">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              data-cursor="hover"
              onViewportEnter={() => playSound("rankUp")}
              transition={{ duration: 0.6 }}
              className="relative bg-abyss/85 border border-mana/20 backdrop-blur-md rounded-3xl p-8 md:p-12 box-glow-mana"
            >
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,24,0)_95%,rgba(6,182,212,0.08)_95%)] bg-[size:100%_24px] pointer-events-none opacity-40 rounded-3xl" />

              <div className="flex justify-between items-center border-b border-mana/30 pb-6 font-mono">
                <span className="text-mana text-glow-mana text-xl tracking-widest uppercase font-bold">[ STATUS WINDOW ]</span>
                <span className="text-mana-bright font-bold border border-mana-bright/30 bg-mana/10 px-3 py-1 text-xs rounded uppercase font-sans">S-Rank Hunter</span>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm font-mono mb-2">
                      <span className="text-silver uppercase">Strength</span>
                      <span className="text-mana font-bold">120 / 150</span>
                    </div>
                    <div className="h-2 w-full bg-abyss rounded-full overflow-hidden border border-mist">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "80%" }}
                        viewport={{ once: false }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-mana to-mana-bright"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm font-mono mb-2">
                      <span className="text-silver uppercase">Agility</span>
                      <span className="text-mana font-bold">95 / 150</span>
                    </div>
                    <div className="h-2 w-full bg-abyss rounded-full overflow-hidden border border-mist">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "63.3%" }}
                        viewport={{ once: false }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-mana to-mana-bright"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm font-mono mb-2">
                      <span className="text-silver uppercase">Intelligence</span>
                      <span className="text-mana font-bold">142 / 150</span>
                    </div>
                    <div className="h-2 w-full bg-abyss rounded-full overflow-hidden border border-mist">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "94.6%" }}
                        viewport={{ once: false }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-mana to-mana-bright"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-mana/20 pt-8 md:pt-0 md:pl-12">
                  <Trophy className="h-16 w-16 text-mana-bright mb-4 animate-bounce text-glow-mana-bright" />
                  <span className="font-mono text-xs uppercase text-ash">Total Level</span>
                  <span className="text-5xl font-extrabold text-white tracking-widest mt-1">99</span>
                  <span className="text-xs text-mana mt-2 uppercase font-mono tracking-wider">Shadow Army Command Active</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>



        {/* --- FOOTER & EASTER EGG --- */}
        <footer className="border-t border-mist/20 bg-void py-12 px-6 relative z-10 overflow-hidden">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 font-display text-lg font-bold tracking-wider text-mana uppercase">
              <Sword className="h-5 w-5" />
              Shadow Level
            </div>

            <p className="text-xs text-ash font-mono">
              &copy; {new Date().getFullYear()} Shadow Level. System Authorization Required.
            </p>

            <div className="flex gap-4 font-mono text-xs uppercase text-slate-500">
              <a href="#" className="hover:text-moonlight transition-colors">Twitter</a>
              <a href="#" className="hover:text-moonlight transition-colors">Discord</a>
              <a href="#" className="hover:text-moonlight transition-colors">GitHub</a>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                playSound("jinwooArise");
                setAriseBurstTrigger((prev) => prev + 1);
              }}
              className="text-[9px] font-mono text-ash/30 hover:text-mana/30 transition-colors uppercase tracking-widest cursor-pointer"
            >
              [ ARISE SYSTEM CONTROLLER ]
            </button>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
