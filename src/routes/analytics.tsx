import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useAppStore } from "@/lib/store";
import { useHabitLogsSince } from "@/hooks/queries";
import { STRINGS } from "@/lib/strings";
import { RequireAuth } from "@/components/RequireAuth";

export const Route = createFileRoute("/analytics")({
  component: () => (
    <RequireAuth>
      <Analytics />
    </RequireAuth>
  ),
});

function Analytics() {
  const profile = useAppStore((s) => s.profile)!;

  const from = new Date();
  from.setDate(from.getDate() - 90);
  const sinceDate = from.toISOString().slice(0, 10);

  const { data: logs = [] } = useHabitLogsSince(profile.id, sinceDate);

  // 7-day bar
  const week: { day: string; exp: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const exp = logs
      .filter((l) => l.completed_at === key)
      .reduce((a, b) => a + b.exp_earned, 0);
    week.push({ day: d.toLocaleDateString(undefined, { weekday: "short" }), exp });
  }

  // Pie
  const positive = logs.filter((l) => l.exp_earned > 0).length;
  const negative = logs.filter((l) => l.exp_earned < 0).length;
  const pie = [
    { name: "Positive", value: positive, color: "#00E5FF" },
    { name: "Negative", value: negative, color: "#FF003C" },
  ];

  // Heatmap 90 days
  const heat: { date: string; count: number }[] = [];
  for (let i = 89; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const count = logs.filter((l) => l.completed_at === key && l.exp_earned > 0).length;
    heat.push({ date: key, count });
  }
  const max = Math.max(1, ...heat.map((h) => h.count));

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-glow-mana-bright text-mana-bright">
          {STRINGS.analytics.page_title}
        </h1>
        <p className="text-sm text-muted-foreground">{STRINGS.analytics.page_subtitle}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass p-6">
          <h2 className="mb-4 font-display text-lg">{STRINGS.analytics.weekly_chart_title}</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={week}>
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "#08080D",
                  border: "1px solid rgba(0,229,255,0.2)",
                  borderRadius: 8,
                }}
              />
              <Bar dataKey="exp" fill="#00E5FF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass p-6">
          <h2 className="mb-4 font-display text-lg">{STRINGS.analytics.pie_chart_title}</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pie} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
                {pie.map((p) => (
                  <Cell key={p.name} fill={p.color} />
                ))}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "#08080D",
                  border: "1px solid rgba(0,229,255,0.2)",
                  borderRadius: 8,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass p-6">
        <h2 className="mb-4 font-display text-lg">{STRINGS.analytics.heatmap_title}</h2>
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: "repeat(15, minmax(0, 1fr))" }}
        >
          {heat.map((h) => {
            const intensity = h.count / max;
            const bg =
              h.count === 0
                ? "rgba(255,255,255,0.04)"
                : `rgba(0, 229, 255, ${0.25 + intensity * 0.75})`;
            return (
              <div
                key={h.date}
                title={`${h.date}: ${h.count} completions`}
                className="aspect-square rounded-sm border border-white/5"
                style={{ background: bg }}
              />
            );
          })}
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          {[0.1, 0.3, 0.5, 0.75, 1].map((v) => (
            <div
              key={v}
              className="h-3 w-3 rounded-sm"
              style={{ background: `rgba(0,229,255,${v})` }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
