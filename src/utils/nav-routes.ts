import { AppRoute } from "@/types/types";
import {
  DollarOutlined,
  FundViewOutlined,
  ReconciliationOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const asesorNavRoutes: AppRoute[] = [
  {
    path: "asesor",
    handle: {
      title: "Modulo de ventas",
      navIcon: DollarOutlined,
    },
  },
];

export const adminNavRoutes: AppRoute[] = [
  {
    path: "admin",
    handle: {
      title: "Tablero de control",
      navIcon: FundViewOutlined,
    },
  },
  {
    path: "admin/managment",
    handle: {
      title: "Gestión de ventas",
      navIcon: DollarOutlined,
    },
  },
  {
    path: "admin/users",
    handle: {
      title: "Usuarios",
      navIcon: UserOutlined,
    },
  },
  {
    path: "admin/reports",
    handle: {
      title: "Reportes",
      navIcon: ReconciliationOutlined,
    },
  },
];
