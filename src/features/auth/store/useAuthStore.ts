import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/shared/types/user";
import { destroyCookie, setCookie } from "nookies";

interface AuthStore { 
    token: string | null;
    user: User | null;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
        token: null,
        user: null,
        setToken: (token) => {
            setCookie(null, "accessToken", token, {
                maxAge: 7 * 24 * 60 * 60,
                path: "/",
            });
            set({ token });
        },
        setUser: (user) => set({ user }),
        logout: () => {
            destroyCookie(null, "accessToken");
            set({ token: null, user: null });
        },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token, user: state.user })
    }
  )
);
