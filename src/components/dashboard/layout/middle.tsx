import React, { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  Target,
  Flame,
  CheckCircle2,
  BarChart3,
} from "lucide-react";

import type { DashboardWeekly } from "@/services/dashboard/dashboard.service";

export type ContinueItem = {
  quizId: string;
  attemptId: string;
  title: string;
  category: string;
  progressPercent: number;
};

export type Stats = {
  timeThisWeekMin: number;
  completed: number;
  accuracyPercent: number; // 0-100
};

export type RecentAttempt = {
  id: string;
  quizId: string;
  title: string;
  scorePercent: number; // 0-100
  timeText: string; // "2h ago" / "Yesterday"
};

export default function MiddleContent({
  stats,
  continueItem,
  recent,
  weeklyGoal,
  weekly,
}: {
  stats: Stats;
  continueItem: ContinueItem | null;
  recent: RecentAttempt[];
  weeklyGoal: { targetMinutes: number; currentMinutes: number };
  weekly: DashboardWeekly | null;
}) {
  // Sparkline series (fallback nếu API chưa có)
  const timeSeries = weekly?.sparklines?.minutes ?? [];
  const completedSeries = weekly?.sparklines?.completed ?? [];
  const accuracySeries = weekly?.sparklines?.accuracy ?? [];

  // Weekly goal hiển thị theo props
  const goalForUI = useMemo(
    () => ({
      targetMinutes: weeklyGoal.targetMinutes,
      currentMinutes: weeklyGoal.currentMinutes,
    }),
    [weeklyGoal],
  );

  return (
    <section className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-6 max-w-[1100px] mx-auto w-full">
      <ContinueHero item={continueItem} />

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCardSpark
          title="Time"
          value={`${stats.timeThisWeekMin} min`}
          hint="This week"
          icon={<Clock size={16} />}
          series={timeSeries}
        />
        <StatCardSpark
          title="Completed"
          value={`${stats.completed}`}
          hint="Quizzes finished"
          icon={<CheckCircle2 size={16} />}
          series={completedSeries}
        />
        <StatCardSpark
          title="Accuracy"
          value={`${stats.accuracyPercent}%`}
          hint="Avg score"
          icon={<BarChart3 size={16} />}
          series={accuracySeries}
        />
      </div>

      {/* Recent + right column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RecentActivityPro items={recent} />
        </div>
        <div className="lg:col-span-1 space-y-4">
          <WeeklyGoalRing goal={goalForUI} />
          <QuickActions />
        </div>
      </div>
    </section>
  );
}

/* ===================== UI atoms ===================== */
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-md transition">
      {children}
    </div>
  );
}

/* ===================== HERO ===================== */
function ContinueHero({ item }: { item: ContinueItem | null }) {
  if (!item) {
    return (
      <div className="rounded-3xl p-[1px] bg-gradient-to-r from-indigo-200/80 via-sky-200/60 to-purple-200/70 shadow-sm">
        <div className="rounded-3xl bg-white/90 border border-white/40 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
                <Flame size={14} />
                Ready to practice
              </div>

              <h2 className="text-xl font-black text-slate-900 mt-3">
                Start a new practice session
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                We’ll personalize quizzes based on your level and performance.
              </p>
            </div>

            <Link
              to="/"
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-semibold shadow-sm hover:opacity-95"
            >
              New Practice <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl p-[1px] bg-gradient-to-r from-indigo-200/80 via-sky-200/60 to-purple-200/70 shadow-sm">
      <div className="rounded-3xl bg-white/90 border border-white/40 p-6">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-900 text-white">
                Continue
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
                {item.category}
              </span>
              <span className="text-xs font-bold text-slate-500">
                {item.progressPercent}% done
              </span>
            </div>

            <h2 className="text-xl font-black text-slate-900 mt-3 line-clamp-1">
              {item.title}
            </h2>

            <div className="mt-4">
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${item.progressPercent}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Pick up where you left off.
              </p>
            </div>
          </div>

          <Link
            to="/quiz/$quizId/$attemptId"
            params={{
              quizId: item.quizId,
              attemptId: item.attemptId,
            }}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white font-semibold shadow-sm hover:opacity-95"
          >
            Continue <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ===================== STATS with Sparkline ===================== */
function StatCardSpark({
  title,
  value,
  hint,
  icon,
  series,
}: {
  title: string;
  value: string;
  hint: string;
  icon: React.ReactNode;
  series: number[];
}) {
  const safeSeries = series?.length ? series : [0, 0, 0, 0, 0, 0, 0];
  const d = sparkPath(safeSeries, 140, 38, 5);

  return (
    <Card>
      <div className="p-5 flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-slate-500">{title}</div>
          <div className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
            {value}
          </div>
          <div className="text-xs text-slate-500 mt-1">{hint}</div>
        </div>

        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-50 to-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-700">
          {icon}
        </div>
      </div>

      <div className="px-5 pb-5">
        <div className="rounded-xl bg-slate-50/70 border border-slate-200/60 p-3">
          <svg width="140" height="38" viewBox="0 0 140 38" className="block">
            <path
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-primary"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Card>
  );
}

function sparkPath(values: number[], w: number, h: number, pad: number) {
  if (!values || values.length === 0) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const step = (w - pad * 2) / (values.length - 1 || 1);

  return values
    .map((v, i) => {
      const x = pad + i * step;
      const y = pad + (h - pad * 2) * (1 - (v - min) / span);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

/* ===================== RECENT activity pro ===================== */
function RecentActivityPro({ items }: { items: RecentAttempt[] }) {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-sm font-black text-slate-900">
              Recent activity
            </h3>
            <p className="text-xs text-slate-500 mt-1">Your latest attempts</p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline shrink-0"
          >
            View all{" "}
            <span aria-hidden className="text-slate-400">
              →
            </span>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-2xl bg-white border border-slate-200/70 flex items-center justify-center">
                <Clock size={18} className="text-slate-500" />
              </div>

              <div className="min-w-0">
                <div className="text-sm font-bold text-slate-800">
                  No recent attempts yet
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Start a quiz and your activity will show up here.
                </div>

                <div className="mt-4">
                  <Link
                    to="/quiz"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:border-primary-200 hover:text-primary transition"
                  >
                    Explore quizzes <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {items.map((x) => {
              const tone = scoreTone(x.scorePercent);
              const isInProgress = x.scorePercent === 0; // (tạm) nếu bạn chưa có status

              return (
                <div
                  key={x.id}
                  className="group rounded-2xl border border-slate-200/60 bg-slate-50/60 hover:bg-white hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between gap-4 p-4">
                    <div className="min-w-0 flex items-start gap-3">
                      <div className="mt-1 flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${tone.dot}`}
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="font-black text-slate-900 line-clamp-1 group-hover:text-primary transition-colors">
                          {x.title}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                          <Clock size={12} />
                          <span>{x.timeText}</span>
                          <span className="text-slate-300">•</span>
                          <span className="font-semibold text-slate-500">
                            {isInProgress ? "In progress" : "Completed"}
                          </span>
                        </div>

                        <div className="mt-2 h-1.5 w-full max-w-[360px] rounded-full bg-slate-200/70 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${tone.bar}`}
                            style={{
                              width: `${Math.max(3, Math.min(100, x.scorePercent))}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full ${tone.badge}`}
                        title={isInProgress ? "Progress" : "Score"}
                      >
                        {isInProgress ? "Progress" : "Score"}
                        <span className="opacity-80">·</span>
                        {x.scorePercent}%
                      </span>

                      {isInProgress ? (
                        <Link
                          to="/quiz/$quizId/$attemptId"
                          params={{
                            quizId: x.quizId,
                            attemptId: x.id,
                          }}
                          className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-md"
                        >
                          Continue
                        </Link>
                      ) : (
                        <Link
                          to="/quiz/$quizId"
                          params={{
                            quizId: x.quizId,
                          }}
                          className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-md"
                        >
                          Review
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
}

function scoreTone(score: number) {
  if (score >= 80)
    return {
      dot: "bg-success",
      badge: "bg-success/10 text-success",
      bar: "bg-success",
    };
  if (score >= 60)
    return {
      dot: "bg-secondary",
      badge: "bg-secondary/10 text-secondary-700",
      bar: "bg-secondary",
    };
  return {
    dot: "bg-quaternary",
    badge: "bg-quaternary/10 text-quaternary",
    bar: "bg-quaternary",
  };
}

/* ===================== WEEKLY goal ring ===================== */
function WeeklyGoalRing({
  goal,
}: {
  goal: { targetMinutes: number; currentMinutes: number };
}) {
  const pct =
    goal.targetMinutes <= 0
      ? 0
      : Math.min(
          100,
          Math.round((goal.currentMinutes / goal.targetMinutes) * 100),
        );

  const r = 18;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;

  return (
    <Card>
      <div className="p-6 flex items-center gap-4">
        <div className="relative w-14 h-14">
          <svg width="56" height="56" viewBox="0 0 56 56" className="block">
            <circle
              cx="28"
              cy="28"
              r={r}
              strokeWidth="6"
              className="text-slate-100"
              stroke="currentColor"
              fill="none"
            />
            <circle
              cx="28"
              cy="28"
              r={r}
              strokeWidth="6"
              stroke="currentColor"
              fill="none"
              strokeDasharray={`${dash} ${c - dash}`}
              strokeLinecap="round"
              className="text-primary"
              transform="rotate(-90 28 28)"
            />
          </svg>

          <div className="absolute inset-0 grid place-items-center">
            <span className="text-xs font-black text-slate-900">{pct}%</span>
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-50 to-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-700">
              <Target size={16} />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800">Weekly goal</h3>
              <p className="text-xs text-slate-500">
                {goal.currentMinutes}/{goal.targetMinutes} min
              </p>
            </div>
          </div>

          <div className="mt-3 h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Keep going to hit your target.
          </p>
        </div>
      </div>
    </Card>
  );
}

/* ===================== QUICK actions ===================== */
function QuickActions() {
  return (
    <Card>
      <div className="p-6 py-8">
        <h3 className="text-sm font-black text-slate-800">Quick actions</h3>

        <div className="mt-4 flex flex-col gap-2">
          <Link
            to="/"
            className="w-full text-center py-3 rounded-2xl bg-primary text-white font-semibold shadow-sm hover:opacity-95"
          >
            New Practice
          </Link>
          <Link
            to="/"
            className="w-full text-center py-3 rounded-2xl bg-white border border-slate-200/60 font-semibold text-slate-700 hover:border-primary-200 hover:text-primary transition"
          >
            Browse Library
          </Link>
        </div>
      </div>
    </Card>
  );
}
