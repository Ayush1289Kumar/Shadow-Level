import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, ListChecks, BarChart3, Gift, User, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";

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

  async function signOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/auth" });
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-60 flex-col gap-2 border-r border-white/5 bg-black/30 p-4 backdrop-blur-xl z-30">
        <Link to="/dashboard" className="mb-4 flex items-center gap-2 px-2">
          <img src="/logo.png" alt="Shadow Monarch Logo" className="h-9 w-9 object-contain" />
          <span className="font-display text-sm font-bold text-glow-primary whitespace-nowrap overflow-hidden text-ellipsis">SHADOW MONARCH</span>
        </Link>
        {items.map((it) => {
          const Icon = it.icon;
          const active = pathname === it.to || pathname.startsWith(it.to + "/");
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                active
                  ? "bg-primary/10 text-primary text-glow-primary"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {it.label}
            </Link>
          );
        })}
        <div className="mt-auto">
          {profile && (
            <div className="mb-2 rounded-lg glass p-3 text-xs">
              <div className="font-display text-primary">{profile.username}</div>
              <div className="text-muted-foreground">Lv. {profile.level} · {profile.total_exp} EXP</div>
            </div>
          )}
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex justify-around border-t border-white/5 bg-black/70 backdrop-blur-xl py-2">
        {items.map((it) => {
          const Icon = it.icon;
          const active = pathname === it.to || pathname.startsWith(it.to + "/");
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              {it.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
