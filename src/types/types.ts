export type CustomUser = {
  uid: string;
  email: string | null;
  name: string;
  thumbnail: string;
  role: "admin" | "asesor";
  sales_place: string;
  sales_place_id: string;
  main_place: boolean;
};

// Unión discriminada para el objeto Sale
export type CashSale = {
  date: string; // ISO string
  seller: CustomUser;
  client_name: string;
  client_id: string;
  plate: string;
  vehicle_type: string;
  soat_value: number;
  soat_state: "pending" | "delivered";
  soat_payed: boolean;
  remarks?: string;
  transfer_proof?: string;
  payment_method_name: string;
  payment_method_id: "cash";
  cash_value_payed?: number;
  sale_summary: {
    fixed_commission: number;
    profit: number;
    total: number;
    place_total_gains: number;
  };
};

export type AddiSale = {
  date: string; // ISO string
  seller: CustomUser;
  client_name: string;
  client_id: string;
  plate: string;
  vehicle_type: string;
  soat_value: number;
  soat_state: "pending" | "delivered";
  soat_payed: boolean;
  remarks?: string;
  payment_method_name: string;
  payment_method_id: "addi";
  financed_amount: number;
  invoice_number: string;
  invoice_file?: string;
  sale_summary: {
    fixed_commission: number;
    addi_commission: number;
    partners_commission: number;
    profit: number;
    gross_profit: number;
    value_to_deposit: number;
    total: number;
    place_total_gains: number;
  };
};

export type SistecreditoSale = {
  date: string; // ISO string
  seller: CustomUser;
  client_name: string;
  client_id: string;
  plate: string;
  vehicle_type: string;
  soat_value: number;
  soat_state: "pending" | "delivered";
  soat_payed: boolean;
  remarks?: string;
  payment_method_name: string;
  payment_method_id: "sistecredito";
  financed_amount: number;
  pagare_number: string;
  pagare_file?: string;
  sis_status: boolean;
  sale_summary: {
    fixed_commission: number;
    sistecredito_commission: number;
    partners_commission: number;
    profit: number;
    gross_profit: number;
    value_to_deposit: number;
    total: number;
    place_total_gains: number;
  };
};

export type BrillaSale = {
  date: string; // ISO string
  seller: CustomUser;
  client_name: string;
  client_id: string;
  plate: string;
  vehicle_type: string;
  soat_value: number;
  soat_state: "pending" | "delivered";
  soat_payed: boolean;
  remarks?: string;
  payment_method_name: string;
  payment_method_id: "brilla";
  financed_amount: number;
  brilla_contract_number: string;
  contract_file?: string;
  proceedings?: number;
  brilla_payed: boolean;
  sale_summary: {
    fixed_commission: number;
    partners_commission: number;
    profit: number;
    gross_profit: number;
    total: number;
    place_total_gains: number;
  };
};

export type DataphoneSale = {
  date: string; // ISO string
  seller: CustomUser;
  client_name: string;
  client_id: string;
  plate: string;
  vehicle_type: string;
  soat_value: number;
  soat_state: "pending" | "delivered";
  soat_payed: boolean;
  remarks?: string;
  payment_method_name: string;
  payment_method_id: "dataphone";
  cash_value_payed: number;
  credit_type: string;
  sale_summary: {
    datafono_commission: number;
    client_commission: number;
    fixed_commission: number;
    reteica: number;
    profit: number;
    place_profit?: number;
    total_to_pay: number;
    bold_deposit_value: number;
    total_cost_transfer: number;
    place_total_gains?: number;
  };
};

export type SaleCreation =
  | CashSale
  | AddiSale
  | SistecreditoSale
  | BrillaSale
  | DataphoneSale;

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
  fixedCost?: {
    base_value_type: "fixed" | "dynamic";
    base_value?: number;
    base_value_gt_1m?: number;
    base_value_lt_1m?: number;
    can_add_profit: boolean;
    place_profit?: number;
    is_active: boolean;
    transfer_method?: {
      name: string;
      is_exempt: boolean;
    }[];
  };
}

export interface Sell {
  id: string;
  date: string;
  client: string;
  vehicle_license_plate: string;
  vehicle_type: string;
  soat_value: number;
  total_value: number; 
  payment_method: string;
  doc_state: string;
  fixed_commission?: number; 
  profit?: number; 
  place_profit?: number;
  asesor_sale_commission?: number; 
}
export interface AsesorStats {
  totalSalesValue: number;
  netEarnings: number;
  salesGrowth: number;
  salesQuantity: number;
  earningsGrowth: number;
};
export interface Sale {
  id: string;
  created_at: string;
  payment_method_id: string;
  payment_method_name: string;
  client_data: { client_name: string; client_id: string };
  vehicle_data: {
    vehicle_type_id: string;
    vehicle_plate: string;
  };
  sale_place: { place_name: string; place_id: string };
  asesor_data: { name: string; thumnail: string, uid: string };
  paid_in_cash_value: number;
  financed_amount?: number;
  brilla_contract_number?: string;
  credit_card_type?: string;
  invoice_number?: string;
  pagare_number?: string;
  invoice_file?: string;
  pagare_file?: string;
  contract_file?: string;
  transfer_proof?: string;
  sale_sumary: {
    total_payed: number;
    client_commission?: number;
    fixed_comission?: number;
    profit: number;
    soat_value: number;
    bold_to_be_deposited_value: number;
    datafono_commission?: number;
    datafono_value: number;
    reteica: number;
    total_to_tranfer_costs: number;
    gross_profit: number;
    value_to_be_deposited: number;
    addi_commission?: number;
    partners_commission?: number;
    sistecredito_commission?: number;
    place_profit?: number;
    place_total_gains?: number;
  };
  receipt_required: boolean;
  receipt_status: "delivered" | "pending" | null;
  remarks: string;
  receipts?: {
    id: string;
    uploaded_at: string;
    receipt_url: string;
    receipt_type: "brilla-contract" | "pagare" | "invoice";
  }[];
  conciliation_status?: "conciliated" | "pending";
}

export interface PlacesDataType {
  id: string;
  place_name: string;
  place_address: string;
  main_place?: boolean;
  asesors_number?: number;
  created_at?: string;
  updated_at?: string;
  fixed_costs?: {
    [key: string]: {
      base_value_type: "fixed" | "dynamic";
      base_value?: number;
      base_value_gt_1m?: number;
      base_value_lt_1m?: number;
      can_add_profit: boolean;
      place_profit?: number;
      is_active: boolean;
      transfer_method?: {
        name: string;
        is_exempt: boolean;
      }[];
    };
  };
}

export interface PlacesDataTypeFromDb {
  place_name: string;
  place_address: string;
  asesor_sale_commission: number;
  can_add_profit: boolean;
  created_at?: string;
  updated_at?: string;
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

export interface DbUser {
  uid: string;
  email: string;
  name: string;
  tel: string;
  role: string;
  active: boolean;
  sales_place?: string | null;
  thumbnail?: string | null;
  created_at?: string;
}

export interface UserForUpdate {
  uid: string;
  name: string;
  tel: string;
  role: string;
  sales_place?: string | null;
  file?: string | null;
}

export interface DbSalesPlace {
  id: string;
  name: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface SalesByPayMethodData {
  id: string;
  pay_method: string;
  sales_quantity: number;
  sales_amount: number;
  growth: number;
}

export interface BetterSeller {
  id: string;
  name: string;
  photo: string;
  sells: number;
  amount: number;
  growth: number;
  place: string;
}

export interface SalesByPlaceData {
  id: string;
  place_name: string;
  sales_quantity: number;
  sales_amount: number;
  sales_profit: number;
  growth: number;
}

export interface SalesForMonthsData {
  month: string;
  sales_quantity: number;
  sales_amount: number;
}

export interface SalesForMonthsResponse {
  monthsData: SalesForMonthsData[];
  growth: number;
}

/**
 * Define la estructura para una categoría específica de vehículo.
 */
export interface Category {
  code: string;
  type: string;
  premium: number;
  'contribution_52%': number;
  runt_fee: number;
  total_to_pay: number;
}

/**
 * Define la estructura para una clase de vehículo, que contiene múltiples categorías.
 */
export interface VehicleClass {
  id: string;
  vehicle_class: string;
  fixed_payment_commission?: number;
  categories: Category[];
}

/**
 * Define el tipo para el arreglo completo de tarifas de vehículos.
 */
export type Tariff = VehicleClass[];