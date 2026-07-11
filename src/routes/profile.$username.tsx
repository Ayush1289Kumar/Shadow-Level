import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Flame, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExpBar } from "@/components/ExpBar";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/profile/$username")({
  ssr: false,
  component: PublicProfile,
});

function PublicProfile() {
  const { username } = Route.useParams();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["public-profile", username],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url, total_exp, level, current_streak, longest_streak")
        .eq("username", username)
        .maybeSingle();
      if (error) throw error;
      if (!data) throw notFound();
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-monarch-radial">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-monarch-radial px-4">
        <div className="glass p-8 text-center">
          <h1 className="font-display text-2xl">Hunter not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            No hunter goes by "{username}".
          </p>
          <Link to="/" className="mt-4 inline-block text-primary underline">
            Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-monarch-radial px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-xl"
      >
        <div className="glass-strong p-8 text-center">
          <Avatar className="mx-auto h-28 w-28 border-2 border-primary/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
            <AvatarImage src={profile.avatar_url ?? undefined} />
            <AvatarFallback className="bg-primary/20 text-primary font-display text-2xl">
              {(profile.username ?? "P").slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
            Shadow Hunter
          </div>
          <h1 className="font-display text-3xl text-glow-primary text-primary">
            {profile.username}
          </h1>
          <div className="mt-1 text-sm text-muted-foreground">
            Lv. {profile.level} · {(profile.total_exp ?? 0).toLocaleString()} EXP
          </div>
          <div className="mt-6">
            <ExpBar totalExp={profile.total_exp ?? 0} />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="glass p-4">
              <Flame className="mx-auto h-5 w-5 text-rose-glow" />
              <div className="mt-1 font-display text-xl">{profile.current_streak}</div>
              <div className="text-[10px] uppercase text-muted-foreground">Current Streak</div>
            </div>
            <div className="glass p-4">
              <Trophy className="mx-auto h-5 w-5 text-emerald-glow" />
              <div className="mt-1 font-display text-xl">{profile.longest_streak}</div>
              <div className="text-[10px] uppercase text-muted-foreground">Longest Streak</div>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-muted-foreground">
          Powered by{" "}
          <Link to="/" className="text-primary underline">
            Shadow Monarch
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
