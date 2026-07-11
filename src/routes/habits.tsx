import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Pencil, Save, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAppStore } from "@/lib/store";
import { RequireAuth } from "@/components/RequireAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/habits")({
  ssr: false,
  component: () => (
    <RequireAuth>
      <HabitsPage />
    </RequireAuth>
  ),
});

interface Habit {
  id: string;
  name: string;
  description: string | null;
  exp_value: number | null;
  frequency: string | null;
  habit_type: string;
  is_active: boolean | null;
}

const empty = {
  name: "",
  description: "",
  exp_value: 10,
  frequency: "daily",
  habit_type: "positive",
};

function HabitsPage() {
  const profile = useAppStore((s) => s.profile)!;
  const qc = useQueryClient();
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: habits = [], isLoading } = useQuery({
    queryKey: ["habits", profile.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("habits")
        .select("*")
        .eq("user_id", profile.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Habit[];
    },
  });

  async function save() {
    if (!form.name.trim()) return toast.error("Name required");
    try {
      if (editing) {
        const { error } = await supabase
          .from("habits")
          .update({ ...form })
          .eq("id", editing);
        if (error) throw error;
        toast.success("Habit updated");
      } else {
        const { error } = await supabase
          .from("habits")
          .insert({ ...form, user_id: profile.id, is_active: true });
        if (error) throw error;
        toast.success("Habit forged");
      }
      setForm(empty);
      setEditing(null);
      setShowForm(false);
      qc.invalidateQueries({ queryKey: ["habits", profile.id] });
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this habit? Its logs will remain.")) return;
    const { error } = await supabase.from("habits").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Habit removed");
    qc.invalidateQueries({ queryKey: ["habits", profile.id] });
  }

  function edit(h: Habit) {
    setEditing(h.id);
    setForm({
      name: h.name,
      description: h.description ?? "",
      exp_value: h.exp_value ?? 10,
      frequency: h.frequency ?? "daily",
      habit_type: h.habit_type,
    });
    setShowForm(true);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-glow-primary text-primary">Habit Forge</h1>
          <p className="text-sm text-muted-foreground">Design your daily quests.</p>
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setForm(empty);
            setShowForm(true);
          }}
          className="bg-primary text-primary-foreground"
        >
          <Plus className="mr-1 h-4 w-4" /> New Habit
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-strong overflow-hidden p-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Morning training"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="100 pushups, 100 situps, 10km run..."
                />
              </div>
              <div>
                <Label>EXP Value</Label>
                <Input
                  type="number"
                  min={1}
                  max={1000}
                  value={form.exp_value}
                  onChange={(e) => setForm({ ...form, exp_value: parseInt(e.target.value) || 10 })}
                />
              </div>
              <div>
                <Label>Frequency</Label>
                <Select value={form.frequency} onValueChange={(v) => setForm({ ...form, frequency: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label>Type</Label>
                <Select value={form.habit_type} onValueChange={(v) => setForm({ ...form, habit_type: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive">Positive (gain EXP)</SelectItem>
                    <SelectItem value="negative">Negative (lose EXP)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button onClick={save} className="bg-primary text-primary-foreground">
                <Save className="mr-1 h-4 w-4" /> {editing ? "Save" : "Create"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                  setForm(empty);
                }}
              >
                <X className="mr-1 h-4 w-4" /> Cancel
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="py-12 text-center text-muted-foreground">Loading...</div>
      ) : habits.length === 0 ? (
        <div className="glass p-12 text-center">
          <p className="text-muted-foreground">No habits yet.</p>
        </div>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {habits.map((h) => {
            const positive = h.habit_type === "positive";
            return (
              <motion.li
                key={h.id}
                layout
                whileHover={{ scale: 1.01 }}
                className={`glass p-4 ${
                  positive ? "border-l-2 border-l-primary" : "border-l-2 border-l-destructive"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-medium">{h.name}</div>
                    {h.description && (
                      <div className="mt-1 text-xs text-muted-foreground">{h.description}</div>
                    )}
                    <div className="mt-2 flex gap-2 text-[10px] uppercase text-muted-foreground">
                      <span className={positive ? "text-primary" : "text-destructive"}>
                        {positive ? "+" : "−"}
                        {h.exp_value} EXP
                      </span>
                      <span>· {h.frequency}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => edit(h)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => remove(h.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
