import { create } from "zustand";

type AuthModal = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

type AuthModalStore = {
  authModal: AuthModal;
  setAuthModal: ({ open, close, isOpen }: AuthModal) => void;
};

export const useAuthModalStore = create<AuthModalStore>((set) => ({
  authModal: {
    open: () => {},
    close: () => {},
    isOpen: false,
  },
  setAuthModal: ({ open, close, isOpen }) =>
    set(() => ({
      authModal: {
        open,
        close,
        isOpen,
      },
    })),
}));
