//user types
export interface CustomUser {
  uid?: string;
  email: string | null;
  name?: string;
  thumbnail?: string | null;
  role?: string;
}

export interface UserState {
  user: CustomUser | null;
  isAuthenticated: boolean;
  setUser: (user: CustomUser) => void;
  clearUser: () => void;
  initializeUser: () => void;
}

export interface AppRoute {
  path: string;
  handle?: {
    title?: string;
    navIcon?: React.ComponentType<{ className?: string }>;
    isChildren?: boolean;
  };
  children?: AppRoute[];
}