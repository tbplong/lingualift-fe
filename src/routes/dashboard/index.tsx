import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import storage from "@/utils/storage";
import {
  LayoutDashboard,
  PlusCircle,
  Library,
  User,
  LogOut,
  Trophy,
  Target,
  Zap,
  Flame,
  TrendingUp,
} from "lucide-react"; // Import Icons

interface StatCardProps {
  title: string;
  value: string | number | undefined; // Chấp nhận chuỗi, số hoặc undefined (lúc chưa load data)
  icon: string; // Kiểu chuẩn cho mọi thành phần render được (Icon, div, svg...)
  bgIcon: string; // Class CSS (ví dụ: "bg-blue-100")
  trend?: string; // Dấu ? nghĩa là Optional (có cũng được, không có cũng không sao)
  subtext?: string; // Optional
}

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
            {/* Logo text gradients */}
            <h1 className="text-4xl font-black bg-gradient-to-r from-primary-200 to-primary bg-clip-text text-transparent lg:block pb-1">
              Lingualift
            </h1>
            <span className="lg:hidden text-3xl font-black text-indigo-600">
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
        {/* Decorative Background Blob */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none"></div>

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 p-6 lg:p-10 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex justify-between items-end relative z-10">
            <div>
              <p className="text-slate-500 font-medium text-sm mb-1">
                {new Date().toDateString()}
              </p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800">
                Hello,{" "}
                <span className="text-primary bg-clip-text">
                  {user?.firstName}!
                </span>
              </h2>
            </div>
          </header>

          {/* Stats Grid - Using "Bento Box" style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Quiz Done"
              value={user?.xp}
              icon={<Zap size={24} className="text-blue-500" />}
              bgIcon="bg-blue-100"
              subtext="+12% this week"
            />
            <StatCard
              title="Average Score"
              value="85%"
              icon={<Target size={24} className="text-emerald-500" />}
              bgIcon="bg-emerald-100"
              trend="Consistent"
            />
            <StatCard
              title="Current Level"
              value={user?.level}
              icon={<Trophy size={24} className="text-indigo-500" />}
              bgIcon="bg-indigo-100"
              subtext="Intermediate"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3  gap-6">
            {/* Left Column (Chart & History) */}
            <div className="xl:col-span-3 space-y-6">
              <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
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
                      <div className="relative w-full bg-slate-100 rounded-2xl flex-1 flex items-end  border border-transparent group-hover:border-slate-200 transition-all duration-300">
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

        <aside className="w-80 hidden xl:flex flex-col bg-white border-l border-slate-200 p-6 overflow-y-auto gap-8 z-10">
          <div className="text-center mt-4">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full  text-primary flex items-center justify-center text-3xl font-black border-4 border-white shadow-xl mx-auto mb-4">
                {user?.avatarLetter}
              </div>
              <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
            </div>
            <h4 className="text-xl font-bold text-slate-800">
              {user?.firstName} {user?.lastName}
            </h4>
            <p className="text-slate-400 text-sm">{user?.email}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100 hover:border-indigo-100 transition-colors">
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">
                Rank
              </p>
              <p className="text-xl font-black text-slate-800">#{user?.rank}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100 hover:border-indigo-100 transition-colors">
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">
                QUIZ
              </p>
              <p className="text-xl font-black text-indigo-600">{user?.xp}</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-200 to-primary p-6 text-white shadow-lg shadow-indigo-200 transform transition hover:scale-[1.02] cursor-default">
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white opacity-10 blur-2xl"></div>
            <div className="absolute -left-6 bottom-0 h-24 w-24 rounded-full bg-orange-400 opacity-20 blur-xl"></div>

            <div className="relative z-10 flex items-center justify-between mb-4">
              <div>
                <p className="text-indigo-100 text-sm font-medium">
                  Daily Streak
                </p>
                <h2 className="text-4xl font-black">
                  {user?.streak}{" "}
                  <span className="text-lg font-medium opacity-80">Days</span>
                </h2>
              </div>
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <Flame
                  size={28}
                  className="text-orange-300"
                  fill="currentColor"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-between gap-1">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className={`h-1.5 w-full rounded-full transition-all ${i < 4 ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]" : "bg-black/20"}`}
                  ></div>
                  <span className="text-[10px] font-bold opacity-70">
                    {day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action or Quote */}
          <div className=" p-5 border rounded-2xl shadow-lg border-indigo-100">
            <h5 className="font-bold text-primary mb-1">Did you know?</h5>
            <p className="text-sm leading-relaxed">
              Learning for 15 minutes a day is better than once a week for 2
              hours.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}

// 1. Sidebar Item
const NavItem = ({
  to,
  icon,
  label,
  active = false,
}: {
  to: string;
  icon: string;
  label: string;
  active?: boolean;
}) => (
  <Link
    to={to}
    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 group
            ${
              active
                ? "bg-primary text-white shadow-lg shadow-indigo-200"
                : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
            }`}
  >
    <span
      className={`${active ? "text-white" : "text-slate-400 group-hover:text-indigo-600"}`}
    >
      {icon}
    </span>
    <span className="font-semibold hidden lg:block">{label}</span>
  </Link>
);

const StatCard = ({
  title,
  value,
  icon,
  bgIcon,
  trend,
  subtext,
}: StatCardProps) => (
  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${bgIcon}`}
      >
        {icon}
      </div>
      {trend && (
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
          {trend}
        </span>
      )}
      {subtext && (
        <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
          {subtext}
        </span>
      )}
    </div>
    <div>
      <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-black text-slate-800">{value}</h3>
    </div>
  </div>
);
