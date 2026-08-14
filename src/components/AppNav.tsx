import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, ListChecks, BarChart3, Gift, User, LogOut, PanelTop, PanelLeft } from "lucide-react";
import { clearSession } from "@/lib/local-db";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { playSound } from "@/lib/audio";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/habits", label: "Habits", icon: ListChecks },
  { to: "/rewards", label: "Rewards", icon: Gift },
  { to: "/me", label: "Profile", icon: User },
] as const;

export function AppNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const profile = useAppStore((s) => s.profile);
  const signOut = useAppStore((s) => s.signOut);
  const shouldReduceMotion = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navPos, setNavPos] = useState<"left" | "top">("left");

  useEffect(() => {
    setNavPos((localStorage.getItem("nav-position") as "left" | "top") || "left");
  }, []);

  // Play a short swipe when switching between nav tabs.
  const prevPath = useRef(pathname);
  useEffect(() => {
    if (prevPath.current !== pathname) {
      playSound("navSwitch");
    }
    prevPath.current = pathname;
  }, [pathname]);

  function handleSignOut() {
    playSound("buttonClick");
    clearSession();
    signOut();
    toast.success("Signed out");
    navigate({ to: "/auth" });
  }

  function toggleNavPos() {
    playSound("navSwitch");
    const newPos = navPos === "left" ? "top" : "left";
    setNavPos(newPos);
    localStorage.setItem("nav-position", newPos);
  }

  const navClasses = navPos === "left"
    ? "fixed bottom-6 left-1/2 -translate-x-1/2 md:left-6 md:-translate-x-0 md:top-1/2 md:-translate-y-1/2 md:bottom-auto z-40 pointer-events-none transition-all duration-500"
    : "fixed bottom-6 left-1/2 -translate-x-1/2 md:top-6 md:left-1/2 md:-translate-x-1/2 md:bottom-auto md:translate-y-0 z-40 pointer-events-none transition-all duration-500";

  const innerClasses = navPos === "left"
    ? "glass-strong rounded-full md:rounded-3xl flex flex-row md:flex-col items-center justify-center gap-1 md:gap-2 p-2 pointer-events-auto shadow-[0_4px_32px_rgba(0,0,0,0.5)] border-mana/20"
    : "glass-strong rounded-full flex flex-row items-center justify-center gap-1 md:gap-2 p-2 pointer-events-auto shadow-[0_4px_32px_rgba(0,0,0,0.5)] border-mana/20";

  const dividerClasses = navPos === "left"
    ? "w-px h-8 md:w-8 md:h-px bg-mist/50 my-1 mx-2 md:mx-0 md:my-1"
    : "w-px h-8 bg-mist/50 my-1 mx-2 md:mx-1 md:my-0";

  const tooltipClasses = navPos === "left"
    ? "absolute left-14 px-3 py-1.5 rounded-md glass text-micro tracking-widest uppercase text-moonlight opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 pointer-events-none hidden md:block whitespace-nowrap z-50"
    : "absolute top-14 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-md glass text-micro tracking-widest uppercase text-moonlight opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-none hidden md:block whitespace-nowrap z-50";

  return (
    <>
      <nav className={navClasses}>
        <div className={innerClasses}>

          <Link to="/dashboard" className={`hidden md:flex items-center justify-center w-12 h-12 md:w-10 md:h-10 ${navPos === "left" ? "mb-1" : "mr-1"} rounded-2xl hover:bg-white/5 transition-colors group`}>
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" className="h-6 w-6 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_var(--glow-mana-bright)]" />
          </Link>

          {items.map((it) => {
            const active = pathname === it.to || pathname.startsWith(it.to + "/");
            return (
              <Link
                key={it.to}
                to={it.to}
                title={it.label}
                onMouseEnter={() => {
                  if (!shouldReduceMotion && !active) playSound("hover");
                }}
                className={`flex items-center justify-center w-12 h-12 md:w-10 md:h-10 rounded-full transition-all duration-300 relative group ${active
                  ? "text-mana-bright bg-mana-bright/10 box-glow-mana"
                  : "text-silver hover:text-moonlight hover:bg-white/10"
                  }`}
              >
                <it.icon className="w-5 h-5 md:w-4 md:h-4" />
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 border border-mana-bright rounded-full pointer-events-none"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className={tooltipClasses}>
                  {it.label}
                </span>
              </Link>
            );
          })}

          <div className={dividerClasses} />

          <button
            onClick={toggleNavPos}
            className="hidden md:flex items-center justify-center w-12 h-12 md:w-10 md:h-10 rounded-full text-silver hover:text-mana hover:bg-mana/10 transition-all duration-300 relative group"
            title="Toggle Layout"
          >
            {navPos === "left" ? <PanelTop className="h-5 w-5 md:w-4 md:h-4" /> : <PanelLeft className="h-5 w-5 md:w-4 md:h-4" />}
            <span className={tooltipClasses}>
              Layout
            </span>
          </button>

          <ThemeSwitcher />

          <button
            onClick={handleSignOut}
            className="flex items-center justify-center w-12 h-12 md:w-10 md:h-10 rounded-full text-silver hover:text-penalty hover:bg-penalty/10 transition-all duration-300 relative group"
            title="Sign Out"
          >
            <LogOut className="h-5 w-5 md:w-4 md:h-4" />
            <span className={tooltipClasses}>
              Sign Out
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
