import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import storage from "@/utils/storage";
import UserService from "@/services/user/user.service";
import DashboardService from "@/services/dashboard/dashboard.service";
import Sidebar from "@/components/dashboard/layout/sidebar";
import RightSidebar from "@/components/dashboard/layout/rightsidebar";
import MiddleContent from "@/components/dashboard/layout/middle";
import { Search } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  beforeLoad: () => {
    const token = storage.getItem("token");
    if (!token) throw redirect({ to: "/login" });
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
  avatarLetter?: string;
};

type ApiUser = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

type DashboardSummary = {
  timeThisWeekMin?: number;
  completed?: number;
  accuracyPercent?: number;
  weeklyMinutes?: number;
  quizzesCompleted?: number;
  accuracy?: number;
};

type Stats = {
  timeThisWeekMin: number;
  completed: number;
  accuracyPercent: number;
};

type ContinueItem = {
  quizId: string;
  title: string;
  category: string;
  progressPercent: number;
};

type RecentAttempt = {
  id: string;
  quizId: string;
  title: string;
  scorePercent: number;
  timeText: string;
};

type WeeklyGoal = {
  targetMinutes: number;
  currentMinutes: number;
};

function RouteComponent() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [stats, setStats] = useState<Stats>({
    timeThisWeekMin: 0,
    completed: 0,
    accuracyPercent: 0,
  });

  const continueItem: ContinueItem | null = {
    quizId: "quiz_grammar_ps_pc",
    title: "Present Simple vs Present Continuous",
    category: "Grammar",
    progressPercent: 45,
  };

  const recent: RecentAttempt[] = [
    {
      id: "attempt_1",
      quizId: "quiz_vocab_travel",
      title: "Travel Vocabulary: Airports & Flights",
      scorePercent: 82,
      timeText: "2 hours ago",
    },
    {
      id: "attempt_2",
      quizId: "quiz_listening_daily",
      title: "Daily Conversations – Listening Practice",
      scorePercent: 74,
      timeText: "Yesterday",
    },
    {
      id: "attempt_3",
      quizId: "quiz_grammar_tenses",
      title: "Past Simple vs Past Continuous",
      scorePercent: 91,
      timeText: "3 days ago",
    },
  ];

  const weeklyGoal: WeeklyGoal = useMemo(
    () => ({
      targetMinutes: 120,
      currentMinutes: stats.timeThisWeekMin,
    }),
    [stats.timeThisWeekMin],
  );

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [profileRes, summary] = await Promise.all([
          UserService.getUserProfile(),
          DashboardService.getSummary(),
        ]);

        const p = (profileRes?.data ?? {}) as ApiUser;

        setUser({
          firstName: p.firstName ?? "User",
          lastName: p.lastName ?? "",
          email: p.email ?? "user@example.com",
          avatarLetter: (p.firstName ?? "U").charAt(0).toUpperCase(),
        });

        const s = (summary ?? {}) as DashboardSummary;

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
              avatarLetter: "U",
            },
        );

        setStats({
          timeThisWeekMin: 0,
          completed: 0,
          accuracyPercent: 0,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

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
