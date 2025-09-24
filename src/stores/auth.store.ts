import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  activeTokenCount: number;
  isAuthenticated: boolean;
  token: string;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setToken: (token: string) => void;
  setActiveTokenCount: (activeTokenCount: number) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      activeTokenCount: 0,
      token: "",
      setIsAuthenticated: (isAuthenticated) => {
        set(() => ({ isAuthenticated: isAuthenticated }));
      },
      setToken: (token) => {
        set(() => ({ token: token }));
      },
      setActiveTokenCount: (activeTokenCount: number) => {
        set(() => ({ activeTokenCount: activeTokenCount }));
      },
    }),
    {
      name: "authStore",
    },
  ),
);
