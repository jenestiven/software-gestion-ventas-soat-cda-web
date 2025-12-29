"use client";

import React from "react";
import {
  DollarOutlined,
  PieChartOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import useStore from "@/store";
import Logo from "@/images/logo.png";

type Props = {};

const { Title, Text } = Typography;

export default function SellsCardSection({}: Props) {
  const data = useStore((state) => state.dataForDashboard);

  return (
    <>
      <article className="stat-1 admin-stat-card">
        <span className="flex items-center justify-between w-full">
          <PieChartOutlined className="icon utility" />
          <Title level={3} style={{ margin: 0 }}>
            {data.totalSalesCount}
          </Title>
        </span>
        <span className="flex items-center justify-between w-full">
          <Text type="secondary">Cantidad de ventas</Text>
        </span>
      </article>
      <article className="stat-2 admin-stat-card">
        <span className="flex items-center justify-between w-full">
          <DollarOutlined className="icon earning" />
          <Title level={3} style={{ margin: 0 }}>
            {data.totalSalesAmount.toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              roundingPriority: "morePrecision",
            })}
          </Title>
        </span>
        <span className="flex items-center justify-between w-full">
          <Text type="secondary">Total en ventas</Text>
          <Text
            className={`stat-growth ${data.amountGrowth < 0 ? "negative" : ""}`}
            type="secondary"
          >
            {data.amountGrowth.toFixed(0)}%
          </Text>
        </span>
      </article>
      <article className="stat-3 admin-stat-card">
        <span className="flex items-center justify-between w-full">
          <div className="flex flex-col items-center">
            <RiseOutlined className="icon earning" />
            <Text type="secondary">Utilidad</Text>
          </div>
          <span className="flex flex-col items-end">
            <Text type="secondary">General</Text>{" "}
            <Title level={3} style={{ margin: 0 }}>
              {data.totalProfit.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                roundingPriority: "morePrecision",
              })}
            </Title>
            <Text type="secondary">Crédito</Text>{" "}
            <Title level={3} style={{ margin: 0 }}>
              {data.credit_profit.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                roundingPriority: "morePrecision",
              })}
            </Title>
            <Text type="secondary">Efectivo</Text>{" "}
            <Title level={3} style={{ margin: 0 }}>
              {data.cash_profit.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                roundingPriority: "morePrecision",
              })}
            </Title>
          </span>
        </span>
      </article>
      <div className="flex gap-5">
        <article
          className="stat-4 flex flex-col items-center justify-center bg-white p-5 rounded-lg shadow w-6/12"
          style={{
            backgroundImage: `url(${data.betterSellerImage ?? Logo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span className="flex flex-col items-center bg-white/80 rounded p-2">
            <Text strong>{data.betterSellerName.toUpperCase()}</Text>
            <Text type="secondary" className="text-xs mt-1">
              Mejor vendedor
            </Text>
          </span>
        </article>
        <article className="stat-4 flex flex-col items-center justify-center bg-white p-5 rounded-lg shadow w-6/12">
          <span className="flex flex-col items-center text-center">
            <Text strong>{data.betterPlaceName}</Text>
            <Text type="secondary" className="text-xs mt-1">
              Sede con más ventas
            </Text>
            <Title level={3} className="m-0">
              {data.salesCount}
            </Title>
          </span>
        </article>
      </div>
    </>
  );
}
