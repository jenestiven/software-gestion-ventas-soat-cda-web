"use client";

import {
  DollarOutlined,
  PieChartOutlined,
  RiseOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";
type Props = {};

const { Title, Text } = Typography;

type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  growth: string;
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
        className={`stat-growth ${growth.startsWith("-") ? "negative" : ""}`}
        type="secondary"
      >
        {growth}%
      </Text>
    </span>
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

export default function StatHandler({}: Props) {
  return (
    <>
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </>
  );
}
