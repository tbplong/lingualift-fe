import {
  createFileRoute,
  redirect,
  useRouterState,
} from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import UserService from "@/services/user/user.service";
import Sidebar from "@/components/dashboard/layout/sidebar";
import RightSidebar from "@/components/dashboard/layout/rightsidebar";
import MiddleContent from "@/components/dashboard/layout/middle";
import { Search } from "lucide-react";
import { loadPickup, calcProgressPercent } from "@/utils/pickup";
import { loadRecent } from "@/utils/recent";
import { loadLocalStats } from "@/utils/dashboardStats"; // ✅ IMPORT MỚI

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
  const [userId, setUserId] = useState<string | null>(null);

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

  const locationHref = useRouterState({ select: (s) => s.location.href });

  // --- LOGIC LOAD DỮ LIỆU LOCAL ---

  const mapRecent = (id: string): RecentAttempt[] =>
    loadRecent(id).map((x) => ({
      id: x.id,
      quizId: x.quizId,
      title: x.title,
      scorePercent: x.scorePercent,
      timeText: x.timeText ?? "",
    }));

  const reloadLocal = useCallback((id: string) => {
    // 1. Load Recent (Lịch sử làm bài)
    setRecent(mapRecent(id));

    // 2. Load Pickup (Bài đang làm dở)
    const pickup = loadPickup(id);
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
  }, []);

  // ✅ Hàm mới: Load 3 chỉ số Stats từ LocalStorage
  const reloadStats = useCallback((id: string) => {
    const localStats = loadLocalStats(id);
    setStats({
      timeThisWeekMin: localStats.timeThisWeekMin,
      completed: localStats.completed,
      accuracyPercent: localStats.accuracyPercent,
    });
  }, []);

  // --- INITIAL LOAD ---
  useEffect(() => {
    let mounted = true;

    const fetchDashboard = async () => {
      try {
        setIsLoading(true);

        // Chỉ gọi UserProfile để lấy ID, không gọi Summary API nữa
        const profileRes = await UserService.getUserProfile();

        if (!mounted) return;

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

        const id = String(p._id ?? p.id ?? "");
        setUserId(id || null);

        // ✅ Load dữ liệu từ LocalStorage ngay lần đầu
        if (id) {
          reloadLocal(id);
          reloadStats(id); // <--- QUAN TRỌNG
        } else {
          setRecent([]);
          setContinueItem(null);
          setStats({ timeThisWeekMin: 0, completed: 0, accuracyPercent: 0 });
        }
      } catch (error) {
        console.error("Failed to load dashboard user", error);
        // Fallback user ảo nếu lỗi mạng
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
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchDashboard();
    return () => {
      mounted = false;
    };
  }, []);

  // --- EVENT LISTENERS (Tự động cập nhật khi làm xong bài) ---
  useEffect(() => {
    if (!userId) return;

    // Hàm xử lý chung: reload mọi thứ
    const handleDataChange = () => {
      reloadLocal(userId);
      reloadStats(userId);
    };

    // 1. Khi route thay đổi (quay lại từ trang làm bài)
    handleDataChange();

    // 2. Lắng nghe sự kiện tùy chỉnh
    window.addEventListener("recent:changed", handleDataChange);
    window.addEventListener("stats:changed", handleDataChange); // ✅ Sự kiện mới từ Bước 1

    // 3. Lắng nghe khi tab được focus lại
    const onFocus = () => handleDataChange();
    const onVis = () => {
      if (document.visibilityState === "visible") handleDataChange();
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("recent:changed", handleDataChange);
      window.removeEventListener("stats:changed", handleDataChange);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [userId, locationHref]);

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
            weekly={null}
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
