export type CustomUser = {
  uid: string;
  email: string | null;
  name: string;
  thumbnail: string;
  role: "admin" | "asesor";
  sales_place: string;
  sales_place_id: string;
  sale_data: {
    asesor_sale_commission: number;
    can_add_profit: boolean;
  };
};

// Tipos para los detalles de cada método de pago
export type CashPaymentDetails = {
  cash_value_payed: number;
  sale_summary: {
    fixed_commission: number;
    profit: number;
    total_to_pay: number;
  };
};

export type AddiPaymentDetails = {
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
    total_to_pay: number;
  };
};

export type SistecreditoPaymentDetails = {
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
    total_to_pay: number;
  };
};

export type BrillaPaymentDetails = {
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
    total_to_pay: number;
  };
};

export type CreditCardPaymentDetails = {
  cash_value_payed: number;
  credit_type: string;
  sale_summary: {
    datafono_commission: number;
    client_commission: number;
    fixed_commission: number;
    reteica: number;
    profit: number;
    total_to_pay: number;
    bold_deposit_value: number;
    total_cost_transfer: number;
  };
};

// Unión discriminada para el objeto Sale
export type SaleCreation = {
  seller: CustomUser;
  client_name: string;
  client_id: string;
  plate: string;
  vehicle_type: string;
  soat_value: number;
  soat_state: "pending" | "delivered";
  soat_payed: boolean;
  date: string; // ISO string
  remarks?: string;
  payment_method_name: string;
} & (
  | { payment_method_id: "cash"; payment_details: CashPaymentDetails }
  | { payment_method_id: "addi"; payment_details: AddiPaymentDetails }
  | { payment_method_id: "sistecredito"; payment_details: SistecreditoPaymentDetails }
  | { payment_method_id: "brilla"; payment_details: BrillaPaymentDetails }
  | { payment_method_id: "credit_card"; payment_details: CreditCardPaymentDetails }
);


// Este tipo representa una venta ya creada, incluyendo el id del servidor
export type SaleWithId = SaleCreation & {
  id: string;
};

// Tipo de entrada para la función de transformación (acepta todos los campos)
export type RawSaleData = Omit<
  Sale,
  "id" | "payment_method" | "payment_details"
> &
  Partial<AddiPaymentDetails> &
  Partial<SistecreditoPaymentDetails> &
  Partial<BrillaPaymentDetails> &
  Partial<CreditCardPaymentDetails> &
  Partial<CashPaymentDetails> & {
    sale_summary?: any; // Para capturar los resúmenes anidados
  };

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
    vehicle_type_id: string;
    vehicle_plate: string;
  };
  sale_place: { place_name: string; place_id: string };
  asesor_data: { name: string; thumnail: string };
  paid_in_cash_value: number;
  sale_sumary: {
    total_payed: number;
    client_commission?: number;
    fixed_comission?: number;
    profit: number;
    soat_value: number;
    asesor_sale_commission: number;
    bold_to_be_deposited_value: number;
    datafono_commission?: number;
    datafono_value: number;
    reteica: number;
    total_to_tranfer_costs: number;
    gross_profit: number;
    value_to_be_deposited: number;
  };
  receipt_required: boolean;
  receipt_status: "delivered" | "pending" | null;
  remarks: string;
  receipts: {
    id: string;
    uploaded_at: string;
    receipt_url: string;
    receipt_type: "brilla-contract" | "pagare" | "invoice";
  }[];
}

export interface PlacesDataType {
  id: string;
  place_name: string;
  place_address: string;
  asesors_number?: number;
  asesor_sale_commission: number;
  can_add_profit: boolean;
  created_at?: string;
  updated_at?: string;
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
