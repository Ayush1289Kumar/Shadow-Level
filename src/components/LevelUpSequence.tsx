import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { CyberGlitchText } from "./ui/cyber-glitch-text";

export function LevelUpSequence({
  leveledUpTo,
}: {
  leveledUpTo: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [stage, setStage] = useState<"alert" | "pause" | "arise">("alert");

  useEffect(() => {
    // Stage 1: Alert shows
    const t1 = setTimeout(() => setStage("pause"), 1500);
    // Stage 2: Short suspense gap, then Arise strikes
    const t2 = setTimeout(() => setStage("arise"), 1800);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Stage 1: System Alert Glitch */}
        <AnimatePresence>
          {stage === "alert" && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, scale: 1, animation: "systemGlitch 1s infinite" }
              }
              exit={{ opacity: 0, scale: 1.1, filter: "blur(5px)" }}
              transition={{ duration: 0.2 }}
              className="text-center"
              style={{
                animation: shouldReduceMotion ? "none" : "systemGlitch 1.5s infinite, screenShake 0.4s 0.8s",
              }}
            >
              <CyberGlitchText 
                text="[ SYSTEM ALERT ]" 
                className="text-xl md:text-3xl tracking-[0.5em] mb-4 font-mono font-black text-penalty drop-shadow-[0_0_15px_rgba(255,0,60,0.9)]" 
              />
              <div className="text-sm md:text-lg text-white font-mono tracking-widest uppercase opacity-90">
                Threshold Reached
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 3: Arise */}
        <AnimatePresence>
          {stage === "arise" && (
            <motion.div
              className="text-center relative z-10"
            >
              {/* Shockwave */}
              <motion.div
                initial={{ scale: 0.5, opacity: 1, borderWidth: "8px" }}
                animate={{ scale: 3, opacity: 0, borderWidth: "0px" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-mana w-32 h-32 md:w-64 md:h-64 -z-10 shadow-[0_0_50px_var(--mana)] pointer-events-none"
              />
              
              {/* Main Arise Text */}
              <motion.div
                initial={{ scale: 2.5, opacity: 0, filter: "brightness(2) blur(10px)" }}
                animate={{ scale: 1, opacity: 1, filter: "brightness(1) blur(0px)" }}
                transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
                className="text-7xl md:text-[10rem] font-black text-mana font-display tracking-[0.1em] uppercase leading-none drop-shadow-[0_0_30px_rgba(0,255,255,0.8)]"
              >
                Arise
              </motion.div>

              {/* Subtext */}
              <motion.div
                initial={{ opacity: 0, y: 20, letterSpacing: "0em" }}
                animate={{ opacity: 1, y: 0, letterSpacing: "0.5em" }}
                transition={{ duration: 1, delay: 0.4, ease: "circOut" }}
                className="text-lg md:text-3xl text-white font-mono uppercase mt-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              >
                Level {leveledUpTo} Reached
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 3: Particles & Aura */}
        {stage === "arise" && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw] -z-10 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.15)_0%,transparent_60%)] mix-blend-screen"
            />
            {/* Particles */}
            {!shouldReduceMotion && Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-mana blur-[1px]"
                style={{
                  left: `${50 + (Math.random() - 0.5) * 40}%`,
                  top: `${50 + (Math.random() - 0.5) * 20}%`,
                  animation: `particleFloat ${2 + Math.random() * 2}s ease-out forwards`,
                  animationDelay: `${0.3 + Math.random() * 0.5}s`,
                  opacity: 0,
                }}
              />
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}
