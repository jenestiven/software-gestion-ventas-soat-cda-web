import { AppRoute } from "@/types/types";
import { DollarOutlined, FundViewOutlined } from "@ant-design/icons";

export const asesorNavRoutes: AppRoute[] = [
  {
    path: "sells",
    handle: {
      title: "Modulo de ventas",
      navIcon: DollarOutlined,
      isChildren: false,
    },
  },
];

export const adminNavRoutes: AppRoute[] = [
  {
    path: "dashboard",
    handle: {
      title: "Tablero de control",
      navIcon: FundViewOutlined,
      isChildren: false,
    },
  },
];
