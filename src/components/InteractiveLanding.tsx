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
function CinematicLoader({ onComplete }: { onComplete: () => void }) {
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState("Scanning...");

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (percent === 20) setStatus("Loading Assets...");
    if (percent === 55) setStatus("Establishing Connection...");
    if (percent === 85) setStatus("Syncing Player Data...");
    if (percent === 100) {
      setStatus("Ready");
      setTimeout(() => {
        playSound("systemAlert");
      }, 200);
      
      setTimeout(() => {
        onComplete();
      }, 700);
    }
  }, [percent, onComplete]);

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

// --- THREE.JS 3D DUNGEON GATE / PORTAL ---
function ThreeDungeonGate({ ariseBurstTrigger }: { ariseBurstTrigger: number }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const zoomActive = useRef(false);
  const zoomProgress = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // WebGL Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 45;

    // Create 3D gate rings
    const group = new THREE.Group();
    scene.add(group);

    const matOuter = new THREE.MeshBasicMaterial({ color: 0x06B6D4, wireframe: true });
    const matMiddle = new THREE.MeshBasicMaterial({ color: 0x3B82F6, wireframe: true });
    const matInner = new THREE.MeshBasicMaterial({ color: 0xFBBF24, wireframe: true });

    const ringOuter = new THREE.Mesh(new THREE.TorusGeometry(14, 1.2, 16, 100), matOuter);
    const ringMiddle = new THREE.Mesh(new THREE.TorusGeometry(10.5, 0.9, 12, 80), matMiddle);
    const ringInner = new THREE.Mesh(new THREE.TorusGeometry(7, 0.6, 10, 60), matInner);

    group.add(ringOuter);
    group.add(ringMiddle);
    group.add(ringInner);

    // Mouse movement listener
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = ((e.clientX / window.innerWidth) - 0.5) * 40;
      mouse.current.targetY = -((e.clientY / window.innerHeight) - 0.5) * 40;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Scroll parallax depth zoom
    const handleScroll = () => {
      const scrollRatio = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);
      // Zoom camera in slightly as user scrolls
      camera.position.z = 45 - scrollRatio * 20;
    };
    window.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      const delta = clock.getDelta();

      // Lerp mouse coordinate coordinates
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

      // Spin rings at different velocities
      const speedMult = zoomActive.current ? 12 : 1;
      
      ringOuter.rotation.y += 0.4 * delta * speedMult;
      ringOuter.rotation.z += 0.2 * delta * speedMult;

      ringMiddle.rotation.x += 0.6 * delta * speedMult;
      ringMiddle.rotation.y += 0.3 * delta * speedMult;

      ringInner.rotation.x += 0.8 * delta * speedMult;
      ringInner.rotation.z += 0.4 * delta * speedMult;

      // Handle Arise zoom camera warp
      if (zoomActive.current) {
        zoomProgress.current += delta * 0.8;
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 2, zoomProgress.current);
        group.scale.setScalar(THREE.MathUtils.lerp(1, 2.5, zoomProgress.current));
      }

      // Dynamic tilt group
      group.rotation.x = mouse.current.y * 0.015;
      group.rotation.y = mouse.current.x * 0.015;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (ariseBurstTrigger === 0) return;
    zoomProgress.current = 0;
    zoomActive.current = true;
  }, [ariseBurstTrigger]);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 bg-transparent flex items-center justify-center" />;
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      ringX.set(e.clientX - 16);
      ringY.set(e.clientY - 16);

      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button']")) {
        setHoverState("hover");
      } else if (target.closest("[data-cursor='view']")) {
        setHoverState("view");
      } else {
        setHoverState("default");
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
          borderColor: hoverState === "view" ? "#06B6D4" : "#FBBF24"
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
        className="pointer-events-none fixed z-[10000] h-1.5 w-1.5 rounded-full bg-[#FBBF24] mix-blend-difference"
      />

      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ x: ripple.x - 16, y: ripple.y - 16, scale: 0.5, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="pointer-events-none fixed z-[10000] h-8 w-8 rounded-full border border-[#FBBF24] opacity-0"
        />
      ))}
    </>
  );
}

// --- TEXT SCRAMBLE COMPONENT ---
function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "█▓▒░#@%&<>[]{}*+=_";

  useEffect(() => {
    let timeoutId: number;
    let intervalId: number;
    
    timeoutId = window.setTimeout(() => {
      playSound("systemAlert");
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
        
        iteration += 1 / 3;
      }, 30);
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
  const [ariseBurstTrigger, setAriseBurstTrigger] = useState(0);
  const [muted, setMuted] = useState(() => {
    return localStorage.getItem("shadow_muted") === "true";
  });
  const [isAnnual, setIsAnnual] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wipeActive, setWipeActive] = useState(false);
  const navigate = useNavigate();
  const userId = useAppStore((s) => s.userId);

  const { scrollY } = useScroll();
  const navBgOpacity = useTransform(scrollY, [0, 80], [0, 0.8]);
  const heroParallaxBg = useTransform(scrollY, [0, 500], [0, 150]);
  const heroParallaxText = useTransform(scrollY, [0, 500], [0, 400]);

  useEffect(() => {
    let lastSection = 0;
    const handleScroll = () => {
      const currentSection = Math.floor(window.scrollY / (window.innerHeight * 0.8));
      if (currentSection !== lastSection) {
        lastSection = currentSection;
        playSound("gateOpen");
        setWipeActive(true);
        const timer = setTimeout(() => setWipeActive(false), 800);
        return () => clearTimeout(timer);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleAriseClick = () => {
    playSound("arise");
    setAriseBurstTrigger((prev) => prev + 1);
    
    setTimeout(() => {
      if (userId) {
        navigate({ to: "/dashboard" });
      } else {
        navigate({ to: "/auth" });
      }
    }, 1200);
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
          <CinematicLoader onComplete={() => setLoadingComplete(true)} />
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

      {/* 3D Gate Portal Background */}
      <ThreeDungeonGate ariseBurstTrigger={ariseBurstTrigger} />

      {/* Custom Cursor System */}
      <CustomCursor />

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
            {["features", "stats", "pricing", "testimonials"].map((item) => (
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
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-mana to-mana-bright text-moonlight font-bold uppercase rounded-xl shadow-lg hover:shadow-mana/20 border-0">
                  Enter System
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button className="bg-transparent hover:bg-abyss border border-mist text-silver font-bold uppercase rounded-xl">
                  Sign In
                </Button>
              </Link>
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
                {["features", "stats", "pricing", "testimonials"].map((item) => (
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
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-mana to-mana-bright text-moonlight font-bold uppercase rounded-xl border-0">
                      Enter System
                    </Button>
                  </Link>
                ) : (
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-transparent border border-mist text-silver font-bold uppercase rounded-xl">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* --- HERO SECTION --- */}
      <section className="relative flex min-h-screen items-center justify-center px-6 pt-24 overflow-hidden">
        <motion.div
          style={{ y: heroParallaxBg }}
          className="absolute inset-0 z-0 bg-mana-radial opacity-40 pointer-events-none"
        />

        <motion.div
          style={{ y: heroParallaxText }}
          className="relative z-10 max-w-4xl text-center flex flex-col items-center"
        >
          {/* Monospace update badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.4 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-mana/30 bg-depth/40 px-3 py-1 font-mono text-xs font-bold text-mana uppercase tracking-widest"
          >
            <Sparkles className="h-3 w-3" />
            System Version 2.0 Installed
          </motion.div>

          {/* Scramble Text Heading */}
          <h1 className="mt-6 text-hero text-glow-mana-bright uppercase tracking-wider font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
            {loadingComplete ? <ScrambleText text="Arise, Hunter" delay={0.2} /> : "Arise, Hunter"}
          </h1>

          <p className="mt-6 max-w-xl text-body text-silver">
            The world's first daily quest tracker inspired by Solo Leveling. Complete tasks, build streaks, level up your stats, and build your shadow army.
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
                className="group relative h-14 px-8 bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] text-black font-bold uppercase rounded-xl text-glow-mana shadow-[0_0_20px_rgba(251,191,36,0.3)] border border-amber-400/20"
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
      <section id="features" className="relative py-24 border-t border-mist/20 bg-void/60 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-display text-glow-mana uppercase">
              <ScrambleText text="System Features" delay={0.1} />
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-silver">
              Unlock unique skills and power levels. The shadow army executes tasks according to your status parameters.
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
                icon: <Shield className="h-6 w-6 text-amber-400" />,
                title: "Shadow Extraction",
                desc: "Extract souls from completed tasks to form your shadow army. Stagger list cards to fight dungeon blocks."
              },
              {
                icon: <Activity className="h-6 w-6 text-emerald-400" />,
                title: "Status Monitor",
                desc: "Detailed monitors for Strength, Agility, and Intelligence parameters. Fulfill conditions to unlock level achievements."
              }
            ].map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="surface p-8 relative overflow-hidden group border border-mist/40 bg-depth/40 backdrop-blur hover:border-mana/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300"
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
      <section id="stats" className="relative py-24 px-6 border-t border-mist/20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            onViewportEnter={() => playSound("rankUp")}
            transition={{ duration: 0.6 }}
            className="relative border border-mana/30 rounded-3xl p-8 md:p-12 bg-abyss/90 box-glow-mana"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,24,0)_95%,rgba(6,182,212,0.08)_95%)] bg-[size:100%_24px] pointer-events-none opacity-40 rounded-3xl" />

            <div className="flex justify-between items-center border-b border-cyan-500/30 pb-6 font-mono">
              <span className="text-mana text-glow-mana text-xl tracking-widest uppercase font-bold">[ STATUS WINDOW ]</span>
              <span className="text-amber font-bold border border-amber/30 bg-amber-dark/10 px-3 py-1 text-xs rounded uppercase font-sans">S-Rank Hunter</span>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-mono mb-2">
                    <span className="text-silver uppercase">Strength</span>
                    <span className="text-mana font-bold">120 / 150</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "80%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-mono mb-2">
                    <span className="text-silver uppercase">Agility</span>
                    <span className="text-mana font-bold">95 / 150</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "63.3%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-mono mb-2">
                    <span className="text-silver uppercase">Intelligence</span>
                    <span className="text-mana font-bold">142 / 150</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "94.6%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-cyan-500/20 pt-8 md:pt-0 md:pl-12">
                <Trophy className="h-16 w-16 text-amber-400 mb-4 animate-bounce text-glow-mana" />
                <span className="font-mono text-xs uppercase text-ash">Total Level</span>
                <span className="text-5xl font-extrabold text-white tracking-widest mt-1">99</span>
                <span className="text-xs text-mana mt-2 uppercase font-mono tracking-wider">Shadow Army Command Active</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="relative py-24 px-6 border-t border-mist/20 bg-void/40">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-display text-glow-mana uppercase">Select Level Plan</h2>
            <p className="mt-4 text-silver">Unlock shadow summons and S-Rank parameter tracking capabilities.</p>

            <div className="mt-8 flex justify-center items-center gap-4">
              <span className={`text-sm ${!isAnnual ? "text-cyan-400 font-bold" : "text-slate-500"}`}>Monthly</span>
              <button
                onClick={handleToggleBilling}
                className="relative h-6 w-12 rounded-full bg-shade border border-mist transition-colors"
              >
                <motion.div
                  animate={{ x: isAnnual ? 24 : 2 }}
                  className="h-4.5 w-4.5 rounded-full bg-cyan-400 shadow shadow-cyan-500/50"
                />
              </button>
              <span className={`text-sm ${isAnnual ? "text-cyan-400 font-bold" : "text-slate-500"}`}>
                Annual <span className="text-xs text-emerald-400 font-mono font-bold bg-emerald-950/20 border border-emerald-500/30 px-1.5 py-0.5 rounded ml-1">Save 20%</span>
              </span>
            </div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
            {/* Free Plan */}
            <motion.div
              whileHover={{ y: -4 }}
              className="surface p-8 border border-mist/40 bg-depth/20 backdrop-blur rounded-2xl flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs uppercase text-slate-500">Rank E Hunter</span>
                <h3 className="text-2xl font-bold uppercase text-moonlight mt-2">D-Class Free</h3>
                <p className="mt-4 text-4xl font-extrabold">$0</p>
                <ul className="mt-8 space-y-4 text-sm text-slate-400">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-cyan-400" />
                    <span>Daily Quest Board (5 Quests)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-cyan-400" />
                    <span>Basic level parameter tracker</span>
                  </li>
                </ul>
              </div>
              <Button
                onClick={handleAriseClick}
                className="mt-8 w-full bg-transparent hover:bg-abyss border border-mist uppercase font-bold"
              >
                Begin Quest
              </Button>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              whileHover={{ y: -4 }}
              className="relative p-8 border border-mana/40 bg-depth/60 backdrop-blur rounded-2xl flex flex-col justify-between shadow-[0_0_35px_rgba(6,182,212,0.1)]"
            >
              <div className="absolute -top-3 right-6 rounded-full bg-mana text-moonlight px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider">
                Recommended
              </div>

              <div>
                <span className="font-mono text-xs uppercase text-cyan-400">Rank S Monarch</span>
                <h3 className="text-2xl font-bold uppercase text-glow-mana text-moonlight mt-2">Shadow Lord Pro</h3>
                <p className="mt-4 text-4xl font-extrabold">
                  {isAnnual ? "$8/mo" : "$10/mo"}
                </p>
                <ul className="mt-8 space-y-4 text-sm text-slate-400">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-cyan-400" />
                    <span>Unlimited Summons & Quests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-cyan-400" />
                    <span>Shadow Army Extraction (Custom Avatars)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-mana" />
                    <span>S-Rank Premium Fanfare loops & SFX pack</span>
                  </li>
                </ul>
              </div>
              <Button
                onClick={handleAriseClick}
                className="mt-8 w-full bg-gradient-to-r from-mana to-mana-bright text-moonlight font-bold uppercase rounded-xl border-0"
              >
                Extract Shadow
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section id="testimonials" className="relative py-24 border-t border-mist/20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-display text-glow-mana uppercase">Monarch Testimonials</h2>
        </div>

        {/* Marquee Row */}
        <div className="mt-16 flex flex-col gap-6 w-full">
          <div className="relative flex overflow-hidden select-none w-full [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <div className="flex gap-6 animate-marquee shrink-0 hover:[animation-play-state:paused] whitespace-nowrap">
              {[
                { name: "Jin-Woo", role: "Monarch", quote: "The status indicators and XP bars are completely flawless." },
                { name: "Cha Hae-In", role: "S-Rank Hunter", quote: "Highly immersive soundscape, custom actions make productivity feel like real battles." },
                { name: "Woo Jin-Chul", role: "Chairman Association", quote: "A masterpiece of UX choreography. Every animation feels calculated and earned." },
                { name: "Yoo Jin-Ho", role: "Guild Master", quote: "The interface makes daily quest tracking look like a true leveling status screen." }
              ].map((test, idx) => (
                <div
                  key={idx}
                  className="w-[300px] inline-block border border-mist/40 bg-depth/30 backdrop-blur rounded-2xl p-6 whitespace-normal"
                >
                  <p className="text-sm text-silver italic">"{test.quote}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-depth flex items-center justify-center font-bold text-mana border border-mana/20 text-xs">
                      {test.name[0]}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-moonlight">{test.name}</p>
                      <p className="text-[10px] text-ash uppercase">{test.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-6 aria-hidden:true animate-marquee shrink-0 hover:[animation-play-state:paused] whitespace-nowrap">
              {[
                { name: "Jin-Woo", role: "Monarch", quote: "The status indicators and XP bars are completely flawless." },
                { name: "Cha Hae-In", role: "S-Rank Hunter", quote: "Highly immersive soundscape, custom actions make productivity feel like real battles." },
                { name: "Woo Jin-Chul", role: "Chairman Association", quote: "A masterpiece of UX choreography. Every animation feels calculated and earned." },
                { name: "Yoo Jin-Ho", role: "Guild Master", quote: "The interface makes daily quest tracking look like a true leveling status screen." }
              ].map((test, idx) => (
                <div
                  key={idx + 4}
                  className="w-[300px] inline-block border border-mist/40 bg-depth/30 backdrop-blur rounded-2xl p-6 whitespace-normal"
                >
                  <p className="text-sm text-silver italic">"{test.quote}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-depth flex items-center justify-center font-bold text-mana border border-mana/20 text-xs">
                      {test.name[0]}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-moonlight">{test.name}</p>
                      <p className="text-[10px] text-ash uppercase">{test.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER & EASTER EGG --- */}
      <footer className="border-t border-mist/20 bg-void py-12 px-6 relative overflow-hidden">
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
    </div>
  );
}
