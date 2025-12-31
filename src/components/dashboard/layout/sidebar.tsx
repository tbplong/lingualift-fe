// src/components/layout/Sidebar.tsx
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { ReactNode } from "react";
import { toast } from "react-toastify";
import {
  LayoutDashboard,
  PlusCircle,
  Library,
  User,
  LogOut,
} from "lucide-react";

import storage from "@/utils/storage";
import AuthService from "@/services/auth/auth.service";

export default function Sidebar() {
  const navigate = useNavigate();
  const pathname = useRouterState().location.pathname;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      toast.success("Logged out");
    } catch (err) {
      console.error(err);
      toast.info("Logged out");
    } finally {
      storage.removeItem("token");
      navigate({ to: "/login", replace: true });
    }
  };

  return (
    <aside className="w-20 lg:w-64 xl:w-72 bg-white border-r border-slate-200 flex flex-col justify-between z-20 transition-all duration-300">
      {/* ========== TOP ========== */}
      <div>
        {/* Logo */}
        <div
          onClick={() => {
            navigate({ to: "/" });
          }}
          className="h-24 flex items-center justify-center lg:justify-start lg:px-8"
        >
          <h1 className="hidden lg:block text-3xl font-black bg-gradient-to-r from-primary-200 to-primary bg-clip-text text-transparent">
            Lingualift
          </h1>
          <span className="lg:hidden text-3xl font-black text-primary">L.</span>
        </div>

        {/* Menu */}
        <nav className="px-3 lg:px-4 space-y-2 mt-4">
          <NavItem
            to="/dashboard"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={pathname === "/dashboard"}
          />

          <NavItem
            to="/practice"
            icon={<PlusCircle size={20} />}
            label="New Practice"
            active={pathname.startsWith("/practice")}
          />

          <NavItem
            to="/library"
            icon={<Library size={20} />}
            label="Quiz Library"
            active={pathname.startsWith("/library")}
          />

          <NavItem
            to="/profile"
            icon={<User size={20} />}
            label="Profile"
            active={pathname.startsWith("/profile")}
          />
        </nav>
      </div>

      {/* ========== BOTTOM ========== */}
      <div className="p-4 border-t border-slate-100 mb-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center lg:justify-start gap-3 py-3 px-4
          text-slate-500 font-medium rounded-xl
          hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <LogOut size={20} />
          <span className="hidden lg:block">Log Out</span>
        </button>
      </div>
    </aside>
  );
}

/* ================== NavItem ================== */
function NavItem({
  to,
  icon,
  label,
  active,
}: {
  to: string;
  icon: ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group
        ${
          active
            ? "bg-primary text-white shadow-lg shadow-indigo-200"
            : "text-slate-500 hover:bg-slate-50 hover:text-primary"
        }`}
    >
      <span
        className={`${
          active ? "text-white" : "text-slate-400 group-hover:text-primary"
        }`}
      >
        {icon}
      </span>

      <span className="font-semibold hidden lg:block">{label}</span>
    </Link>
  );
}
