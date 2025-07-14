export interface CustomUser {
  uid?: string;
  email: string | null;
  name?: string;
  thumbnail?: string | null;
  role?: string;
  sales_place?: string;
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

export interface Sale {
  id: string;
  created_at: string;
  payment_method_id: string;
  payment_method_name: string;
  client_data: { client_name: string; client_id: string };
  vehicle_data: {
    vehicle_type_name: string;
    vehicle_type_id: string;
    vehicle_plate: string;
  };
  sale_place: { place_name: string };
  asesor_data: { name: string; thumnail: string };
  paid_in_cash_value: number;
  sale_sumary: {
    total_payed: number;
    fixed_comission: number;
    profit: number;
    soat_value: number;
    asesor_sale_commission: number;
    bold_to_be_deposited_value: number;
    datafono_commission: number;
    datafono_value: number;
    reteica: number;
    total_to_tranfer_costs: number;
    gross_profit: number;
    value_to_be_deposited: number;
  };
  receipt_required: boolean;
  receipt_status: "delivered" | "pending" | null;
  remarks: string;
  receipts: [
    {
      id: string;
      uploaded_at: string;
      receipt_url: string;
      receipt_type: "brilla-contract" | "pagare" | "invoice";
    }
  ];
}

export interface PlacesDataType {
  key: React.Key;
  place_name: string;
  place_address: string;
  asesors_number: number;
  active: boolean;
}

export interface UserDataType {
  key: React.Key;
  name: string;
  thumbnail: string;
  tel: string;
  email: string;
  role: string;
  active: boolean;
}

export interface UserForCreate {
  email: string;
  name: string;
  tel: string;
  rol: string;
  cc: string;
  sales_place?: string | null;
  file?: string | null;
}