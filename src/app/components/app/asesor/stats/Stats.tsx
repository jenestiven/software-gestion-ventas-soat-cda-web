"use client";

import {
  DollarOutlined,
  PieChartOutlined,
  RiseOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";
import { AsesorStats } from "@/types/types";
import "@/app/asesor/page.css";

const { Title, Text } = Typography;

type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  growth?: number;
};

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, growth }) => (
  <article className="asesor-stat-card">
    <span className="flex items-center justify-between w-full">
      {icon}
      <Title level={3} style={{ margin: 0 }}>
        {value}
      </Title>
    </span>
    <span className="flex items-center justify-between w-full">
      <Text type="secondary">{title}</Text>
      <Text
        className={`stat-growth ${growth && growth < 0 ? "negative" : ""}`}
        type="secondary"
      >
        {growth ? growth.toFixed(0) + "%" : null}
      </Text>
    </span>
  </article>
);

export default function Stats({
  totalSalesValue = 0,
  netEarnings = 0,
  salesGrowth = 0,
  salesQuantity = 0,
  earningsGrowth = 0,
  mainProfit = 0,
}: AsesorStats) {
  const stats: StatCardProps[] = [
    {
      icon: <PieChartOutlined className="icon utility" />,
      title: "Cantidad de ventas del mes",
      value: `${salesQuantity}`,
    },
    {
      icon: <ShoppingOutlined className="icon sell" />,
      title: "Total en ventas del mes",
      value: `$${Number(totalSalesValue).toLocaleString("es-CO", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`,
      growth: salesGrowth,
    },
    {
      icon: <RiseOutlined className="icon earning" />,
      title: "Ganancias en el mes",
      value: `$${Number(netEarnings === 0 && totalSalesValue > 0 ? mainProfit: netEarnings).toLocaleString("es-CO", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`,
      growth: earningsGrowth,
    },
  ];

  return (
    <>
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </>
  );
}
