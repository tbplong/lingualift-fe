import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import storage from "@/utils/storage";
import { ReactNode } from "react";
import {
  LayoutDashboard,
  PlusCircle,
  Library,
  User,
  LogOut,
  Trophy,
  Target,
  Zap,
  TrendingUp,
  Search,
  PlayCircle, // Thêm icon này
  Clock, // Thêm icon này
  Star, // Thêm icon này
} from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  beforeLoad: async () => {
    const token = storage.getItem("accessToken");
    if (!token) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  level: string;
  xp: number;
  rank: number;
  streak: number;
  avatarLetter: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  level: string;
  xp: number;
  rank: number;
  streak: number;
  avatarLetter: string;
}

// Dữ liệu giả lập cho Recommended Quizzes
const recommendedQuizzes = [
  {
    id: 1,
    title: "Past Perfect Tense",
    category: "Grammar",
    level: "Hard",
    time: "15 min",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 2,
    title: "Business Vocabulary",
    category: "Vocabulary",
    level: "Medium",
    time: "10 min",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    title: "Daily Conversation",
    category: "Speaking",
    level: "Easy",
    time: "5 min",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 4,
    title: "Present Perfect Tense",
    category: "Grammar",
    level: "Hard",
    time: "15 min",
    color: "bg-orange-100 text-orange-600",
  },
];

function RouteComponent() {
  const activityData = [40, 70, 30, 85, 50, 90, 60];
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = storage.getItem("accessToken");
        // Giả lập call API
        const response = await axios.get("http://localhost:3001/v1/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            fingerprint: `test-fingerprint-123456`,
          },
        });

        const data = response.data;
        setUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          level: data.level || "A0",
          xp: data.xp || 0,
          rank: data.rank || 999,
          streak: data.streak || 0,
          avatarLetter: (data.firstName || "U").charAt(0).toUpperCase(),
        });
      } catch (error) {
        console.error("Failed to load profile", error);
        setUser({
          firstName: "Huy",
          lastName: "Nguyen",
          email: "huy@example.com",
          level: "B2",
          xp: 0,
          rank: 15,
          streak: 12,
          avatarLetter: "H",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 flex flex-col justify-between z-20 transition-all duration-300">
        <div>
          <div className="h-24 flex items-center justify-center lg:justify-start lg:px-8">
            <h1 className="text-4xl font-black bg-gradient-to-r from-primary-200 to-primary bg-clip-text text-transparent lg:block pb-1">
              Lingualift
            </h1>
            <span className="lg:hidden text-3xl font-black text-primary">
              L.
            </span>
          </div>

          <nav className="px-3 lg:px-4 space-y-2 mt-4">
            <NavItem
              to="/dashboard"
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              active
            />
            <NavItem
              to="/practice"
              icon={<PlusCircle size={20} />}
              label="New Practice"
            />
            <NavItem
              to="/library"
              icon={<Library size={20} />}
              label="Quiz Library"
            />
            <NavItem to="/profile" icon={<User size={20} />} label="Profile" />
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100 mb-4">
          <button
            onClick={() => toast.info("Logging out...")}
            className="w-full flex items-center justify-center lg:justify-start gap-3 py-3 px-4 text-slate-500 font-medium rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut size={20} />
            <span className="hidden lg:block">Log Out</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none"></div>

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 p-6 lg:p-10 flex flex-col gap-8">
          {/* Header Section: Search Bar */}
          <header className="flex justify-center items-center relative z-10 mb-2">
            <div className="relative w-full max-w-2xl group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
              </div>

              <input
                type="text"
                className="block w-full pl-14 pr-14 py-4 bg-white border border-slate-200 rounded-2xl text-slate-700 placeholder-slate-400 
                focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary
                shadow-sm hover:shadow-md transition-all duration-300 font-medium"
                placeholder="Search for quizzes, vocabulary, or grammar..."
              />

              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-flex items-center border border-slate-200 rounded px-2 py-1 text-[10px] font-bold text-slate-400 bg-slate-50">
                  CTRL K
                </kbd>
              </div>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CircularStatCard
              title="Daily Goal"
              displayValue={`${user?.xp || 0} XP`}
              subtext="/ 2000 Quizes"
              percentage={((user?.xp || 0) / 2000) * 100}
              icon={
                <Zap size={22} className="text-white" fill="currentColor" />
              }
            />

            <CircularStatCard
              title="Average Score"
              displayValue="85%"
              subtext="Consistent"
              percentage={85}
              icon={<Target size={22} className="text-white" />}
            />

            <CircularStatCard
              title="Current Level"
              displayValue={user?.level || "A0"}
              subtext="Intermediate"
              percentage={65}
              icon={<Trophy size={22} className="text-white" />}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column (Chart & History) */}
            <div className="xl:col-span-3 space-y-6">
              <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-50 rounded-lg text-primary">
                      <TrendingUp size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">
                      Learning Activity
                    </h3>
                  </div>
                  <select className="text-sm bg-slate-50 border-none rounded-lg px-3 py-2 font-medium text-slate-600 focus:ring-2 focus:ring-indigo-100 outline-none cursor-pointer hover:bg-slate-100 transition">
                    <option>This Week</option>
                    <option>Last Week</option>
                  </select>
                </div>

                <div className="flex items-end justify-between h-88 px-2 gap-3 lg:gap-5">
                  {activityData.map((height, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-end gap-3 w-full h-[80%] group cursor-pointer"
                    >
                      <div className="relative w-full bg-slate-100 rounded-2xl flex-1 flex items-end border border-transparent group-hover:border-slate-200 transition-all duration-300">
                        <div
                          className="w-full bg-gradient-to-t from-primary-200 to-primary rounded-2xl relative transition-all duration-700 ease-out 
                          group-hover:to-primary-600 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] group-hover:-translate-y-1"
                          style={{ height: `${height}%` }}
                        >
                          <div className="absolute top-0 left-0 w-full h-1 bg-white/30 rounded-t-2xl"></div>
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 pointer-events-none whitespace-nowrap shadow-xl z-10">
                            {height} mins
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                          </div>
                        </div>
                      </div>

                      <span className="text-xs font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">
                        {["M", "T", "W", "T", "F", "S", "S"][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <aside className="w-70 hidden xl:flex flex-col bg-white border-l border-slate-200 h-full overflow-y-auto z-10">
          {/* 1. User Profile Section */}
          <div className="p-6 flex flex-col items-center border-b border-slate-100">
            <div className="relative mb-3">
              <div className="w-24 h-24 rounded-full bg-indigo-50 flex items-center justify-center text-3xl font-black text-primary border-4 border-white shadow-xl shadow-indigo-100">
                {user?.avatarLetter}
              </div>
              <div
                className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white"
                title="Online"
              ></div>
            </div>

            <h4 className="text-xl font-bold text-slate-800">
              {user?.firstName} {user?.lastName}
            </h4>
            <p className="text-slate-400 text-sm font-medium mb-4">
              {user?.email}
            </p>
          </div>

          {/* 2. RECOMMENDED QUIZZES (New Section) */}
          <div className="p-6 flex-1 bg-slate-50/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800">Recommended</h3>
              <Link
                to="/library"
                className="text-xs font-bold text-primary hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {recommendedQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                >
                  {/* Decorative blur */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-bl-full -mr-8 -mt-8 z-0"></div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg ${quiz.color}`}
                      >
                        {quiz.category}
                      </span>
                      <div className="flex items-center text-amber-400">
                        <Star size={12} fill="currentColor" />
                        <span className="text-xs font-bold text-slate-400 ml-1">
                          4.8
                        </span>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-slate-700 mb-3 group-hover:text-primary transition-colors line-clamp-1">
                      {quiz.title}
                    </h4>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-slate-400">
                        <Clock size={12} />
                        <span className="text-xs font-medium">{quiz.time}</span>
                      </div>

                      <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <PlayCircle
                          size={18}
                          fill="currentColor"
                          className="opacity-100"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

// Sidebar Item
const NavItem = ({
  to,
  icon,
  label,
  active = false,
}: {
  to: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
}) => (
  <Link
    to={to}
    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 group
            ${
              active
                ? "bg-primary text-white shadow-lg shadow-indigo-200"
                : "text-slate-500 hover:bg-slate-50 hover:text-primary"
            }`}
  >
    <span
      className={`${active ? "text-white" : "text-slate-400 group-hover:text-primary"}`}
    >
      {icon}
    </span>
    <span className="font-semibold hidden lg:block">{label}</span>
  </Link>
);

const CircularStatCard = ({
  title,
  displayValue,
  subtext,
  percentage,
  icon,
}: {
  title: string;
  displayValue: string | number;
  subtext?: string;
  percentage: number;
  icon: ReactNode;
}) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const safePercentage = Math.min(Math.max(percentage, 0), 100);
  const strokeDashoffset =
    circumference - (safePercentage / 100) * circumference;

  const gradientId = `grad-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100 flex items-center justify-between relative overflow-hidden group hover:shadow-lg hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300">
      <div className="z-10 relative">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-md shadow-indigo-200/50 bg-gradient-to-br from-primary-200 to-primary text-white transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
          {title}
        </p>
        <h3 className="text-2xl font-black bg-gradient-to-r from-primary-200 to-primary bg-clip-text text-transparent tracking-tight">
          {displayValue}
        </h3>
        {subtext && (
          <p className="text-[10px] font-semibold text-slate-400 bg-slate-50 inline-block px-1.5 py-0.5 rounded-md mt-1 border border-slate-100">
            {subtext}
          </p>
        )}
      </div>
      <div className="relative flex items-center justify-center">
        <svg className="transform -rotate-90 w-24 h-24 drop-shadow-sm">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#6c89f3" />
            </linearGradient>
          </defs>
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-indigo-50"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-xs font-black text-slate-300">
            {Math.round(safePercentage)}%
          </span>
        </div>
      </div>
    </div>
  );
};
