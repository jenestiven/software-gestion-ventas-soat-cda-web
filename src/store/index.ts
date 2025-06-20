import { create } from "zustand";
import { CustomUser, UserState } from "@/types/types";

const useStore = create<UserState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
    if (typeof window !== "undefined") {
      document.cookie = `user=${encodeURIComponent(
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.name,
          thumbnail: user.thumbnail,
          role: user.role,
        })
      )}; path=/; max-age=${7 * 24 * 60 * 60}`;
    }
  },
  clearUser: () => {
    set({ user: null, isAuthenticated: false });
    if (typeof window !== "undefined") {
      document.cookie = `user=; path=/; max-age=0`;
    }
  },
  initializeUser: () => {
    if (get().user) return; // Prevent re-initialization if user is already set
    if (typeof window !== "undefined") {
      const userCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user="));
      if (userCookie) {
        try {
          const parsedUser = JSON.parse(
            decodeURIComponent(userCookie.split("=")[1])
          );
          // Simulate a CustomUser object
          const user: CustomUser = {
            ...parsedUser,
            providerId: "",
            emailVerified: false,
            isAnonymous: false,
            metadata: {},
            providerData: [],
            refreshToken: "",
            tenantId: "",
            delete: async () => {},
            reload: async () => {},
            toJSON: () => ({} as any),
          } as CustomUser;
          set({ user, isAuthenticated: true });
        } catch (error) {
          console.error("Error parsing user cookie:", error);
          // Clear the corrupted cookie
          document.cookie = `user=; path=/; max-age=0`;
        }
      }
    }
  },
}));

export default useStore;
