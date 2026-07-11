import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAppStore } from "@/lib/store";
import { RequireAuth } from "@/components/RequireAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExpBar } from "@/components/ExpBar";
import { toast } from "sonner";

export const Route = createFileRoute("/me")({
  ssr: false,
  component: () => (
    <RequireAuth>
      <MePage />
    </RequireAuth>
  ),
});

function MePage() {
  const profile = useAppStore((s) => s.profile)!;
  const setProfile = useAppStore((s) => s.setProfile);
  const [username, setUsername] = useState(profile.username ?? "");
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [penaltyText, setPenaltyText] = useState(() => 
    typeof window !== "undefined" ? localStorage.getItem("shadow_penalty") || "Complete 100 Pushups immediately to escape." : ""
  );

  const publicUrl =
    typeof window !== "undefined" && profile.username
      ? `${window.location.origin}/profile/${profile.username}`
      : "";

  async function saveUsername() {
    if (!username.trim()) return;
    setSaving(true);
    const { data, error } = await supabase
      .from("profiles")
      .update({ username: username.trim() })
      .eq("id", profile.id)
      .select("*")
      .single();
    setSaving(false);
    if (error) return toast.error(error.message);
    setProfile(data as any);
    toast.success("Username updated");
  }

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error("Max 5MB");
    const ext = file.name.split(".").pop();
    const path = `${profile.id}/avatar.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true, contentType: file.type });
    if (upErr) return toast.error(upErr.message);
    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    const url = data.publicUrl + `?v=${Date.now()}`;
    const { data: updated, error } = await supabase
      .from("profiles")
      .update({ avatar_url: url })
      .eq("id", profile.id)
      .select("*")
      .single();
    if (error) return toast.error(error.message);
    setProfile(updated as any);
    toast.success("Avatar updated");
  }

  async function removeAvatar() {
    setSaving(true);
    const { data: updated, error } = await supabase
      .from("profiles")
      .update({ avatar_url: null })
      .eq("id", profile.id)
      .select("*")
      .single();
    setSaving(false);
    if (error) return toast.error(error.message);
    setProfile(updated as any);
    toast.success("Avatar removed");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-strong p-6">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="relative">
            <Avatar className="h-24 w-24 border-2 border-primary/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
              <AvatarImage src={profile.avatar_url ?? undefined} />
              <AvatarFallback className="bg-primary/20 text-primary font-display text-xl">
                {(profile.username ?? "P").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute -bottom-1 -right-1 rounded-full bg-primary p-2 text-primary-foreground shadow-lg"
            >
              <Upload className="h-3 w-3" />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={upload} />
          </div>
          <div className="flex-1 w-full">
            <Label>Username</Label>
            <div className="mt-1 flex gap-2">
              <Input value={username} onChange={(e) => setUsername(e.target.value)} />
              <Button onClick={saveUsername} disabled={saving} className="bg-primary text-primary-foreground">
                Save
              </Button>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Avatar max 5MB.</span>
              {profile.avatar_url && (
                <Button onClick={removeAvatar} disabled={saving} variant="outline" size="sm" className="text-destructive border-destructive/20 hover:bg-destructive/10 h-7 text-xs">
                  Remove Avatar
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <ExpBar totalExp={profile.total_exp} />
        </div>
      </motion.div>

      <div className="glass p-6">
        <h2 className="font-display text-lg">Public Profile</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Share your hunter card with anyone.
        </p>
        <div className="mt-3 flex gap-2">
          <Input readOnly value={publicUrl} />
          <Button
            onClick={() => {
              navigator.clipboard.writeText(publicUrl);
              toast.success("Link copied");
            }}
            variant="outline"
          >
            <Copy className="mr-1 h-4 w-4" /> Copy
          </Button>
        </div>
      </div>

      <div className="glass p-6">
        <h2 className="font-display text-lg text-destructive">Penalty Configuration</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Set the penalty you must pay if you fail your Daily Quests.
        </p>
        <div className="mt-3 flex gap-2">
          <Input 
            value={penaltyText} 
            onChange={(e) => setPenaltyText(e.target.value)} 
            placeholder="e.g. Complete 100 Pushups" 
          />
          <Button
            onClick={() => {
              localStorage.setItem("shadow_penalty", penaltyText);
              toast.success("Penalty updated");
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
          >
            Save
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Complete 100 Pushups", "Run 5km", "5-minute Cold Shower", "No social media for 24h", "Read 20 pages of a book"].map(p => (
            <button
              key={p}
              onClick={() => setPenaltyText(p)}
              className="text-xs border border-destructive/30 rounded-full px-3 py-1 text-destructive hover:bg-destructive/10 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Level" value={profile.level} />
        <Stat label="Total EXP" value={profile.total_exp.toLocaleString()} />
        <Stat label="Streak" value={`${profile.current_streak}d`} />
        <Stat label="Best" value={`${profile.longest_streak}d`} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="glass p-4 text-center">
      <div className="text-[10px] uppercase text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-2xl text-glow-primary text-primary">{value}</div>
    </div>
  );
}
