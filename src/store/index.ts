import { create } from "zustand";
import { CustomUser } from "@/types/types";

interface UserState {
  user: CustomUser | null;
  isAuthenticated: boolean;
  setUser: (user: CustomUser) => void;
  clearUser: () => void;
  initializeUser: () => void;
}

const useStore = create<UserState>((set, get) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });

    if (typeof window !== "undefined") {
      const domain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN;
      let cookieString = `user=${encodeURIComponent(
        JSON.stringify(user)
      )}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;

      if (domain && domain !== "localhost") {
        cookieString += `; domain=${domain}; Secure`;
      }

      document.cookie = cookieString;
    }
  },

  clearUser: () => {
    set({ user: null, isAuthenticated: false });
    if (typeof window !== "undefined") {
      const domain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN;
      let cookieString = "user=; path=/; max-age=0; SameSite=Lax";

      if (domain && domain !== "localhost") {
        cookieString += "; Secure";
      }
      document.cookie = cookieString;
    }
  },

  initializeUser: () => {
    if (get().user) return;

    if (typeof window !== "undefined") {
      const userCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user="));

      if (userCookie) {
        try {
          const parsedUser = JSON.parse(
            decodeURIComponent(userCookie.split("=")[1])
          ) as CustomUser;
          set({ user: parsedUser, isAuthenticated: true });
        } catch (error) {
          console.error("Error parsing user cookie:", error);
          document.cookie = "user=; path=/; max-age=0";
        }
      }
    }
  },
}));

export default useStore;
