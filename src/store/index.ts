import { create } from "zustand";
import { CustomUser, PlacesDataType } from "@/types/types";

interface UserState {
  user: CustomUser | null;
  isAuthenticated: boolean;
  headerTitle: string;
  salesPlaces: PlacesDataType[];
  dataForDashboard: {
    betterSellerName: string;
    betterSellerImage: string;
    betterPlaceName: string;
    salesCount: number;
    totalSalesCount: number;
    totalProfit: number;
    cash_profit: number;
    credit_profit: number;
    totalSalesAmount: number;
    amountGrowth: number;
    salesGrowth: number;
  };
  setUser: (user: CustomUser) => void;
  clearUser: () => void;
  initializeUser: () => void;
  setTitle: (title: string) => void;
  setSalesPlaces: (places: PlacesDataType[]) => void;
  setDataForDashboard: (data: {
    betterSellerName?: string;
    betterSellerImage?: string;
    betterPlaceName?: string;
    salesCount?: number;
    totalProfit?: number;
    cash_profit?: number;
    credit_profit?: number;
    totalSalesCount?: number;
    totalSalesAmount?: number;
    amountGrowth?: number;
    salesGrowth?: number;
  }) => void;
}

const initialState = {
  user: null,
  isAuthenticated: false,
  headerTitle: "",
  salesPlaces: [],
  dataForDashboard: {
    betterSellerName: "",
    betterSellerImage: "",
    totalProfit: 0,
    cash_profit: 0,
    credit_profit: 0,
    betterPlaceName: "",
    salesCount: 0,
    totalSalesCount: 0,
    totalSalesAmount: 0,
    amountGrowth: 0,
    salesGrowth: 0,
  },
};

// Initialize salesPlaces from localStorage
if (typeof window !== "undefined") {
  const storedSalesPlaces = localStorage.getItem("salesPlaces");
  if (storedSalesPlaces) {
    try {
      initialState.salesPlaces = JSON.parse(storedSalesPlaces);
    } catch (error) {
      console.error("Error parsing salesPlaces from localStorage:", error);
    }
  }
}
const useStore = create<UserState>((set, get) => ({
  ...initialState,

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

  setTitle: (title: string) => {
    set({ headerTitle: title });
    if (typeof window !== "undefined") {
      localStorage.setItem("headerTitle", title);
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

  setSalesPlaces: (places: PlacesDataType[]) => {
    set({ salesPlaces: places });
    if (typeof window !== "undefined") {
      localStorage.setItem("salesPlaces", JSON.stringify(places));
    }
  },

  setDataForDashboard: (data: {
    betterSellerName?: string;
    betterSellerImage?: string;
    betterPlaceName?: string;
    salesCount?: number;
    totalSalesCount?: number;
    totalProfit?: number;
    totalSalesAmount?: number;
    amountGrowth?: number;
    salesGrowth?: number;
  }) => {
    set({ dataForDashboard: { ...get().dataForDashboard, ...data } });
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
