import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Gift, Lock, Plus, Trash2 } from "lucide-react";
import { getRewards, createReward, purchaseReward, deleteReward, type RewardRow } from "@/lib/local-db";
import { useAppStore } from "@/lib/store";
import { applyExpDelta } from "@/lib/profile";
import { RequireAuth } from "@/components/RequireAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/rewards")({
  component: () => (
    <RequireAuth>
      <Rewards />
    </RequireAuth>
  ),
});

function Rewards() {
  const profile = useAppStore((s) => s.profile)!;
  const setProfile = useAppStore((s) => s.setProfile);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", cost: 100 });
  const [tick, setTick] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const rewards = getRewards(profile.id);

  function create() {
    if (!form.name.trim() || form.cost < 1) return toast.error("Invalid reward");
    createReward({ ...form, user_id: profile.id, description: form.description || null });
    setForm({ name: "", description: "", cost: 100 });
    setShowForm(false);
    toast.success("Reward added");
    setTick((t) => t + 1);
  }

  function purchase(r: RewardRow) {
    if (r.is_purchased) return;
    if (profile.total_exp < r.cost) return toast.error("Not enough EXP");
    if (!confirm(`Spend ${r.cost} EXP on "${r.name}"? This cannot be refunded.`)) return;
    purchaseReward(r.id);
    const updated = applyExpDelta(profile, -r.cost);
    setProfile(updated);
    toast.success(`Unlocked: ${r.name}`);
    setTick((t) => t + 1);
  }

  function remove(id: string) {
    if (!confirm("Remove this reward?")) return;
    deleteReward(id);
    setTick((t) => t + 1);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-glow-accent text-accent">Reward Shop</h1>
          <p className="text-sm text-muted-foreground">
            Balance: <span className="text-primary font-display">{profile.total_exp} EXP</span>
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-accent text-accent-foreground">
          <Plus className="mr-1 h-4 w-4" /> New Reward
        </Button>
      </div>

      {showForm && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          className="glass-strong p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="One episode of anime" />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div>
              <Label>EXP Cost</Label>
              <Input type="number" min={1} value={form.cost} onChange={(e) => setForm({ ...form, cost: parseInt(e.target.value) || 100 })} />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={create} className="bg-primary text-primary-foreground">Create</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </motion.div>
      )}

      {rewards.length === 0 ? (
        <div className="glass p-12 text-center">
          <Gift className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-2 text-muted-foreground">No rewards yet. Motivate yourself.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rewards.map((r) => {
            const affordable = profile.total_exp >= r.cost;
            return (
              <motion.div
                key={r.id}
                whileHover={shouldReduceMotion ? {} : { scale: r.is_purchased ? 1 : 1.02 }}
                className={`glass p-5 relative ${r.is_purchased ? "opacity-70" : ""}`}
              >
                {r.is_purchased && (
                  <span className="absolute right-3 top-3 rounded-full bg-emerald-glow/20 px-2 py-0.5 text-[10px] uppercase text-emerald-glow border border-emerald-glow/30">
                    <Check className="inline h-3 w-3" /> Purchased
                  </span>
                )}
                <Gift className="h-6 w-6 text-accent" />
                <h3 className="mt-3 font-display text-lg">{r.name}</h3>
                {r.description && <p className="mt-1 text-xs text-muted-foreground">{r.description}</p>}
                <div className="mt-4 flex items-center justify-between">
                  <div className="font-display text-primary text-glow-primary">{r.cost} EXP</div>
                  <div className="flex gap-1">
                    {!r.is_purchased && (
                      <Button
                        size="sm"
                        disabled={!affordable}
                        onClick={() => purchase(r)}
                        className={affordable ? "bg-primary text-primary-foreground" : ""}
                      >
                        {affordable ? "Redeem" : <><Lock className="mr-1 h-3 w-3" /> Locked</>}
                      </Button>
                    )}
                    <Button size="icon" variant="ghost" onClick={() => remove(r.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
