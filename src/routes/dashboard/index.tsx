import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import UserService from "@/services/user/user.service";
import DashboardService, {
  type DashboardWeekly,
} from "@/services/dashboard/dashboard.service";
import Sidebar from "@/components/dashboard/layout/sidebar";
import RightSidebar from "@/components/dashboard/layout/rightsidebar";
import MiddleContent from "@/components/dashboard/layout/middle";
import { Search } from "lucide-react";
import { loadPickup, calcProgressPercent } from "@/utils/pickup";
import { loadRecent } from "@/utils/recent";

export const Route = createFileRoute("/dashboard/")({
  beforeLoad: ({ context }) => {
    if (!context.authContext.isAuthenticated) {
      throw redirect({ to: "/login", search: { next: location.href } });
    }
  },
  component: RouteComponent,
});

const recommendedQuizzes = [
  {
    id: "quiz_grammar_ps_pc",
    title: "Present Simple vs Present Continuous",
    category: "Grammar",
    time: "8 min",
    color: "bg-indigo-50 text-indigo-700",
    rating: 4.8,
  },
  {
    id: "quiz_vocab_travel",
    title: "Travel Vocabulary: Airports & Flights",
    category: "Vocabulary",
    time: "6 min",
    color: "bg-emerald-50 text-emerald-700",
    rating: 4.6,
  },
  {
    id: "quiz_listening_daily",
    title: "Daily Conversations – Listening Practice",
    category: "Listening",
    time: "10 min",
    color: "bg-amber-50 text-amber-700",
    rating: 4.7,
  },
];

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  level: string;
  xp: number;
  rank: number;
  streak: number;
  avatarLetter: string;
};

type ApiUser = {
  _id?: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  level?: string;
  xp?: number;
  rank?: number;
  streak?: number;
};

type DashboardSummary = {
  timeThisWeekMin?: number;
  completed?: number;
  accuracyPercent?: number;

  weeklyMinutes?: number;
  quizzesCompleted?: number;
  accuracy?: number;
};

export type RecentAttempt = {
  id: string;
  quizId: string;
  title: string;
  scorePercent: number;
  timeText: string;
};

export type Stats = {
  timeThisWeekMin: number;
  completed: number;
  accuracyPercent: number;
};

export type ContinueItem = {
  quizId: string;
  attemptId: string;
  title: string;
  category: string;
  progressPercent: number;
};

type WeeklyGoal = {
  targetMinutes: number;
  currentMinutes: number;
};

function RouteComponent() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ userKey ổn định để loadRecent/loadPickup
  const [userKey, setUserKey] = useState<string | null>(null);

  const [stats, setStats] = useState<Stats>({
    timeThisWeekMin: 0,
    completed: 0,
    accuracyPercent: 0,
  });

  const [continueItem, setContinueItem] = useState<ContinueItem | null>(null);
  const [recent, setRecent] = useState<RecentAttempt[]>([]);

  const weeklyGoal: WeeklyGoal = useMemo(
    () => ({
      targetMinutes: 120,
      currentMinutes: stats.timeThisWeekMin,
    }),
    [stats.timeThisWeekMin],
  );

  useEffect(() => {
    let mounted = true;

    const fetchDashboard = async () => {
      try {
        setIsLoading(true);

        const [profileRes, summaryRes, weeklyRes] = await Promise.all([
          UserService.getUserProfile(),
          DashboardService.getSummary(),
          DashboardService.getWeekly(),
        ]);

        if (!mounted) return;

        // ----- user -----
        const p = (profileRes?.data ?? {}) as ApiUser;

        setUser({
          firstName: p.firstName ?? "User",
          lastName: p.lastName ?? "",
          email: p.email ?? "user@example.com",
          level: p.level ?? "A0",
          xp: p.xp ?? 0,
          rank: p.rank ?? 999,
          streak: p.streak ?? 0,
          avatarLetter: (p.firstName ?? "U").charAt(0).toUpperCase(),
        });

        const key = String(p._id ?? p.id ?? p.email ?? "");
        setUserKey(key || null);

        // ----- weekly -----
        setWeekly((weeklyRes ?? null) as DashboardWeekly | null);

        // ----- pickup + recent từ localStorage -----
        if (key) {
          const pickup = loadPickup(key);
          setContinueItem(
            pickup
              ? {
                  quizId: pickup.quizId,
                  attemptId: pickup.attemptId,
                  title: pickup.title,
                  category: pickup.category ?? "Quiz",
                  progressPercent: calcProgressPercent(
                    pickup.answeredCount,
                    pickup.questionsNo,
                  ),
                }
              : null,
          );

          const recentItems = loadRecent(key).map((x) => ({
            id: x.id,
            quizId: x.quizId,
            title: x.title,
            scorePercent: x.scorePercent,
            timeText: x.timeText ?? "",
          }));
          setRecent(recentItems);
        }

        // ----- stats -----
        const s = (summaryRes ?? {}) as DashboardSummary;
        setStats({
          timeThisWeekMin: s.timeThisWeekMin ?? s.weeklyMinutes ?? 0,
          completed: s.completed ?? s.quizzesCompleted ?? 0,
          accuracyPercent: s.accuracyPercent ?? s.accuracy ?? 0,
        });
      } catch (error) {
        console.error("Failed to load dashboard", error);

        setUser(
          (prev) =>
            prev ?? {
              firstName: "User",
              lastName: "",
              email: "user@example.com",
              level: "A0",
              xp: 0,
              rank: 999,
              streak: 0,
              avatarLetter: "U",
            },
        );

        setStats({
          timeThisWeekMin: 0,
          completed: 0,
          accuracyPercent: 0,
        });

        setWeekly(null);
        setContinueItem(null);
        setRecent([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchDashboard();
    return () => {
      mounted = false;
    };
  }, []);

  // ✅ Khi alt-tab / đổi tab trình duyệt quay lại: reload recent (đúng key)
  useEffect(() => {
    const onFocus = () => {
      if (!userKey) return;
      const recentItems = loadRecent(userKey).map((x) => ({
        id: x.id,
        quizId: x.quizId,
        title: x.title,
        scorePercent: x.scorePercent,
        timeText: x.timeText ?? "",
      }));
      setRecent(recentItems);
    };

    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [userKey]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="h-12 w-12 animate-spin rounded-full border-b-4 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-b from-indigo-50/60 via-slate-50 to-slate-50 font-sans text-slate-800">
      <Sidebar />

      <main className="relative flex flex-1 overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 h-64 w-full bg-gradient-to-b from-indigo-50/50 to-transparent" />

        <div className="flex flex-1 flex-col gap-8 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200 lg:p-10">
          <header className="relative z-10 mb-2 flex items-center justify-center">
            <div className="group relative w-full max-w-2xl">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
                <Search className="h-5 w-5 text-slate-400 transition-colors group-focus-within:text-primary" />
              </div>

              <input
                type="text"
                className="block w-full rounded-2xl border border-slate-200 bg-white py-4 pl-14 pr-14 font-medium text-slate-700 placeholder-slate-400 shadow-sm transition-all duration-300 hover:shadow-md focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-200"
                placeholder="Search for quizzes, vocabulary, or grammar..."
              />

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <kbd className="hidden items-center rounded border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-bold text-slate-400 sm:inline-flex">
                  CTRL K
                </kbd>
              </div>
            </div>
          </header>

          <MiddleContent
            stats={stats}
            continueItem={continueItem}
            recent={recent}
            weeklyGoal={weeklyGoal}
            seedKey={userKey ?? "guest"}
          />
        </div>

        <RightSidebar
          user={user}
          recommended={recommendedQuizzes}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}
