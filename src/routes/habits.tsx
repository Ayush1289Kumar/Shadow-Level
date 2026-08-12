import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Trash2, Pencil, Save, X } from "lucide-react";
import { type HabitRow } from "@/lib/local-db";
import { useAppStore } from "@/lib/store";
import {
  useHabits,
  useCreateHabit,
  useUpdateHabit,
  useDeleteHabit,
} from "@/hooks/queries";
import { STRINGS } from "@/lib/strings";
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
  component: () => (
    <RequireAuth>
      <HabitsPage />
    </RequireAuth>
  ),
});

const empty = {
  name: "",
  description: "",
  exp_value: 10,
  frequency: "daily",
  habit_type: "positive",
};

function HabitsPage() {
  const profile = useAppStore((s) => s.profile)!;
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { data: habits = [] } = useHabits(profile.id);
  const createHabit = useCreateHabit();
  const updateHabit = useUpdateHabit();
  const deleteHabit = useDeleteHabit();

  function save() {
    if (!form.name.trim()) return toast.error("Name required");
    const payload = {
      ...form,
      exp_value: form.exp_value,
      habit_type: form.habit_type as "positive" | "negative",
      description: form.description || null,
    };
    if (editing) {
      updateHabit.mutate(
        { id: editing, updates: payload },
        {
          onSuccess: () => {
            toast.success(STRINGS.habits.update_toast);
            setForm(empty);
            setEditing(null);
            setShowForm(false);
          },
          onError: (e: any) => toast.error(e.message),
        },
      );
    } else {
      createHabit.mutate(
        { ...payload, user_id: profile.id, is_active: true, frequency: form.frequency },
        {
          onSuccess: () => {
            toast.success(STRINGS.habits.create_toast);
            setForm(empty);
            setShowForm(false);
          },
          onError: (e: any) => toast.error(e.message),
        },
      );
    }
  }

  function remove(id: string) {
    if (!confirm("Delete this habit? Its logs will remain.")) return;
    deleteHabit.mutate(id, {
      onSuccess: () => toast.success(STRINGS.habits.delete_toast),
    });
  }

  function edit(h: HabitRow) {
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
          <h1 className="font-display text-3xl text-glow-primary text-primary">
            {STRINGS.habits.page_title}
          </h1>
          <p className="text-sm text-muted-foreground">{STRINGS.habits.page_subtitle}</p>
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setForm(empty);
            setShowForm(true);
          }}
          className="bg-primary text-primary-foreground"
        >
          <Plus className="mr-1 h-4 w-4" /> {STRINGS.habits.create_cta}
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            className="glass-strong overflow-hidden p-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label>{STRINGS.habits.name_label}</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Morning training"
                />
              </div>
              <div className="md:col-span-2">
                <Label>{STRINGS.habits.description_label}</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="100 pushups, 100 situps, 10km run..."
                />
              </div>
              <div>
                <Label>{STRINGS.habits.exp_label}</Label>
                <Input
                  type="number"
                  min={1}
                  max={1000}
                  value={form.exp_value}
                  onChange={(e) =>
                    setForm({ ...form, exp_value: parseInt(e.target.value) || 10 })
                  }
                />
              </div>
              <div>
                <Label>{STRINGS.habits.frequency_label}</Label>
                <Select
                  value={form.frequency}
                  onValueChange={(v) => setForm({ ...form, frequency: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">{STRINGS.habits.freq_daily}</SelectItem>
                    <SelectItem value="weekly">{STRINGS.habits.freq_weekly}</SelectItem>
                    <SelectItem value="monthly">{STRINGS.habits.freq_monthly}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label>{STRINGS.habits.type_label}</Label>
                <Select
                  value={form.habit_type}
                  onValueChange={(v) => setForm({ ...form, habit_type: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive">{STRINGS.habits.type_positive}</SelectItem>
                    <SelectItem value="negative">{STRINGS.habits.type_negative}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button onClick={save} className="bg-primary text-primary-foreground">
                <Save className="mr-1 h-4 w-4" />{" "}
                {editing ? STRINGS.habits.save_cta : STRINGS.habits.create_cta}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                  setForm(empty);
                }}
              >
                <X className="mr-1 h-4 w-4" /> {STRINGS.habits.cancel_cta}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {habits.length === 0 ? (
        <div className="glass p-12 text-center">
          <p className="text-muted-foreground">{STRINGS.habits.empty_state}</p>
        </div>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {habits.map((h) => {
            const positive = h.habit_type === "positive";
            return (
              <motion.li
                key={h.id}
                layout={!shouldReduceMotion}
                whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
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
