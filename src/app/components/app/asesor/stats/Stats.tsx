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

const { Title, Text } = Typography;

type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: number;
  growth: number;
};

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, growth }) => (
  <article className="asesor-stat-card">
    <span className="flex items-center justify-between w-full">
      {icon}
      <Title level={3} style={{ margin: 0 }}>
        ${Number(value).toLocaleString()}
      </Title>
    </span>
    <span className="flex items-center justify-between w-full">
      <Text type="secondary">{title}</Text>
      <Text
        className={`stat-growth ${growth < 0 ? "negative" : ""}`}
        type="secondary"
      >
        {growth}%
      </Text>
    </span>
  </article>
);

export default function Stats({
  totalSalesValue = 0,
  totalCommission = 0,
  totalUtility = 0,
  netEarnings = 0,
  salesGrowth = 0,
  commissionGrowth = 0,
  utilityGrowth = 0,
  earningsGrowth = 0,
}: AsesorStats) {
  const stats: StatCardProps[] = [
    {
      icon: <ShoppingOutlined className="icon sell" />,
      title: "Total en ventas",
      value: totalSalesValue,
      growth: salesGrowth,
    },
    {
      icon: <DollarOutlined className="icon comision" />,
      title: "Total en comisión",
      value: totalCommission,
      growth: commissionGrowth,
    },
    {
      icon: <PieChartOutlined className="icon utility" />,
      title: "Total en utilidad del asesor",
      value: totalUtility,
      growth: utilityGrowth,
    },
    {
      icon: <RiseOutlined className="icon earning" />,
      title: "Ganancia neta del asesor",
      value: netEarnings,
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
