import { create } from "zustand";
import { persist } from "zustand/middleware";

import { User } from "@/types";

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  isStudent: boolean;
  lastUpdatedDate: string;
  setIsStudent: (isStudentState: boolean) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        set(() => ({ user: user }));
      },
      isStudent: false,
      lastUpdatedDate: "",
      setIsStudent: (isStudentState) => {
        set(() => ({ isStudent: isStudentState }));
      },
    }),
    {
      name: "userStore",
    },
  ),
);

// Helper to get current user id synchronously from the store
export const getUserId = (): string | null => {
  return useUserStore.getState().user?._id ?? null;
};
