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
      {/* Floating Island Nav (Desktop & Base Mobile Pill) */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex justify-center mt-6 pointer-events-none px-4">
        <div className="glass rounded-full h-12 flex items-center px-2 pointer-events-auto shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          <Link to="/dashboard" className="flex items-center gap-2 pl-2 pr-4" onClick={() => setMobileOpen(false)}>
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Shadow Level Logo" className="h-6 w-6 object-contain" />
            <span className="font-display text-sm font-bold text-moonlight hidden md:block">SHADOW LEVEL</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1 border-l border-mist pl-2">
            {items.map((it) => {
              const active = pathname === it.to || pathname.startsWith(it.to + "/");
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className={`flex items-center rounded-full px-4 py-1.5 text-caption transition-all duration-300 ${
                    active
                      ? "text-moonlight text-glow-monarch bg-white/5"
                      : "text-silver hover:text-moonlight hover:bg-white/5"
                  }`}
                >
                  {it.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center border-l border-mist ml-2 pl-2 pr-1">
            <button
              onClick={handleSignOut}
              className="p-2 rounded-full text-silver hover:text-ember transition-colors"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>

          <div className="flex md:hidden items-center border-l border-mist ml-2 pl-2 pr-1">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-full text-moonlight transition-all duration-300"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.2, duration: 0.2 } }}
            className="fixed inset-0 z-30 bg-abyss/95 backdrop-blur-3xl flex flex-col justify-center px-6"
          >
            <div className="flex flex-col gap-6">
              {items.map((it, i) => {
                const active = pathname === it.to || pathname.startsWith(it.to + "/");
                return (
                  <motion.div
                    key={it.to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                    transition={{ delay: i * 0.08, duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  >
                    <Link
                      to={it.to}
                      onClick={() => setMobileOpen(false)}
                      className={`block text-center text-display transition-colors ${
                        active ? "text-monarch text-glow-monarch" : "text-moonlight"
                      }`}
                    >
                      {it.label}
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: items.length * 0.08, duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className="mt-8 flex justify-center"
              >
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleSignOut();
                  }}
                  className="flex items-center gap-3 text-headline text-ember"
                >
                  <LogOut className="h-6 w-6" /> Sign Out
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
