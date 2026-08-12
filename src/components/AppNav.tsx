import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, ListChecks, BarChart3, Gift, User, LogOut, Menu, X } from "lucide-react";
import { clearSession } from "@/lib/local-db";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/habits", label: "Habits", icon: ListChecks },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/rewards", label: "Rewards", icon: Gift },
  { to: "/me", label: "Profile", icon: User },
] as const;

export function AppNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const profile = useAppStore((s) => s.profile);
  const signOut = useAppStore((s) => s.signOut);
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleSignOut() {
    clearSession();
    signOut();
    toast.success("Signed out");
    navigate({ to: "/auth" });
  }

  return (
    <>
      {/* Floating Sidebar (Desktop) / Bottom Dock (Mobile) */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-6 md:-translate-x-0 md:top-1/2 md:-translate-y-1/2 md:bottom-auto z-40 pointer-events-none transition-all duration-500">
        <div className="glass-strong rounded-full md:rounded-3xl flex flex-row md:flex-col items-center justify-center gap-2 p-2 pointer-events-auto shadow-[0_4px_32px_rgba(0,0,0,0.5)] border-mana/20">
          
          <Link to="/dashboard" className="hidden md:flex items-center justify-center w-12 h-12 mb-2 rounded-2xl hover:bg-white/5 transition-colors group">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" className="h-7 w-7 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_var(--glow-mana-bright)]" />
          </Link>
          
          <div className="flex md:flex-col items-center gap-1 md:gap-2">
            {items.map((it) => {
              const active = pathname === it.to || pathname.startsWith(it.to + "/");
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  title={it.label}
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 relative group ${
                    active
                      ? "text-mana-bright bg-mana-bright/10 box-glow-mana"
                      : "text-silver hover:text-moonlight hover:bg-white/10"
                  }`}
                >
                  <it.icon className="w-5 h-5" />
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 border border-mana-bright rounded-full pointer-events-none"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {/* Tooltip for desktop */}
                  <span className="absolute left-16 px-3 py-1.5 rounded-md glass text-micro tracking-widest uppercase text-moonlight opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 pointer-events-none hidden md:block whitespace-nowrap">
                    {it.label}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="w-px h-8 md:w-8 md:h-px bg-mist/50 my-1 mx-2 md:mx-0 md:my-2" />

          <button
            onClick={handleSignOut}
            className="flex items-center justify-center w-12 h-12 rounded-full text-silver hover:text-penalty hover:bg-penalty/10 transition-all duration-300 relative group"
            title="Sign Out"
          >
            <LogOut className="h-5 w-5" />
            <span className="absolute left-16 px-3 py-1.5 rounded-md glass text-micro tracking-widest uppercase text-penalty opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 pointer-events-none hidden md:block whitespace-nowrap">
              Sign Out
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
