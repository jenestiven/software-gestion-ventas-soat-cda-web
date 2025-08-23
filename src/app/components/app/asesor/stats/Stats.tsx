"use client";

import "@/app/asesor/page.css";
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
  value: string;
  growth: number;
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
        className={`stat-growth ${growth < 0 ? "negative" : ""}`}
        type="secondary"
      >
        {growth.toFixed(0)}%
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
      value: `$${Number(totalSalesValue).toLocaleString()}`,
      growth: salesGrowth,
    },
    {
      icon: <PieChartOutlined className="icon utility" />,
      title: "Cantidad de ventas",
      value: "4",
      growth: utilityGrowth,
    },
    {
      icon: <RiseOutlined className="icon earning" />,
      title: "Ganancias",
      value: `$${Number(netEarnings).toLocaleString()}`,
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
