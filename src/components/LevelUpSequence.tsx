import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { CyberGlitchText } from "./ui/cyber-glitch-text";
import { MorphText } from "./ui/morph-text";

export function LevelUpSequence({
  leveledUpTo,
}: {
  leveledUpTo: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [stage, setStage] = useState<"alert" | "beam" | "arise">("alert");

  useEffect(() => {
    // Stage 1: Alert (0 - 2.5s)
    const t1 = setTimeout(() => setStage("beam"), 2500);
    // Stage 2: Beam & Arise (2.5s - 8s)
    const t2 = setTimeout(() => setStage("arise"), 2800);
    
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
              exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
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

        {/* Stage 2: Light Beam Reveal */}
        {stage === "beam" && !shouldReduceMotion && (
          <div
            className="absolute top-1/2 left-1/2 w-1 h-[200vh] bg-mana -translate-x-1/2 -translate-y-1/2 blur-[2px]"
            style={{ animation: "lightBeam 0.6s ease-out forwards" }}
          />
        )}

        {/* Stage 3: Arise */}
        <AnimatePresence>
          {(stage === "beam" || stage === "arise") && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.9, opacity: 0 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="text-center relative z-10"
            >
              <MorphText 
                words={["ARISE"]} 
                interval={2500} 
                subtext={`Level ${leveledUpTo} Reached`}
                className="text-mana"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 3: Particles & Aura */}
        {(stage === "beam" || stage === "arise") && (
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
