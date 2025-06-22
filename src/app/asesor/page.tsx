"use client";

import React, { Suspense, useState } from "react";
import { Button, Typography } from "antd";
import {
  DollarOutlined,
  PieChartOutlined,
  PlusOutlined,
  RiseOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import PaymentTypesChosser from "@/app/components/app/asesor/modal/PaymentTypesChosser";
import "./page.css";

// 🧠 Importa el componente Server de forma dinámica si deseas SSR
import AsesorSellsTableServer from "@/app/components/app/asesor/table/AsesorSellsTable";

const { Title, Text } = Typography;

type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  growth: string;
};

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, growth }) => (
  <article className="asesor-stat-card">
    {icon}
    <span>
      <Text type="secondary">{title}</Text>
      <Text
        className={`stat-growth ${growth.startsWith("-") ? "negative" : ""}`}
        type="secondary"
      >
        {growth}%
      </Text>
    </span>
    <Title level={3} style={{ margin: 0 }}>
      ${Number(value).toLocaleString()}
    </Title>
  </article>
);

const stats = [
  {
    icon: <ShoppingOutlined className="icon sell" />,
    title: "Total en ventas",
    value: "8220000",
    growth: "+25",
  },
  {
    icon: <DollarOutlined className="icon comision" />,
    title: "Total en comisión",
    value: "1000000",
    growth: "-12",
  },
  {
    icon: <PieChartOutlined className="icon utility" />,
    title: "Total en utilidad del asesor",
    value: "570000",
    growth: "+23",
  },
  {
    icon: <RiseOutlined className="icon earning" />,
    title: "Ganancia neta del asesor",
    value: "1570000",
    growth: "+60",
  },
];

export default function Page() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="asesor-page">
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}

      <section className="asesor-table">
        <Title level={5}>Ventas actuales</Title>

        {/* ✅ Suspense compatible con componentes server-side */}
        <Suspense fallback={<Text type="secondary">Cargando ventas...</Text>}>
          <AsesorSellsTableServer />
        </Suspense>

        <Button
          onClick={() => setOpenModal(true)}
          type="primary"
          icon={<PlusOutlined />}
        >
          Nueva venta
        </Button>
      </section>

      <PaymentTypesChosser
        openModal={openModal}
        onCancel={() => setOpenModal(false)}
      />
    </div>
  );
}
