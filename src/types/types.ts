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

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  isActive: boolean;
}

export interface Sell {
  id: string;
  date: string;
  client: string;
  vehicle_license_plate: string;
  vehicle_type: string;
  soat_value: number;
  payment_method: string;
  doc_state: string;
}

