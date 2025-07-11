"use client";

import React from "react";
import { DollarOutlined, PieChartOutlined } from "@ant-design/icons";
import { DatePicker, Divider, Typography } from "antd";
import "@/app/admin/page.css";

type Props = {};

const { Title, Text } = Typography;

export default function SellsCardSection({}: Props) {
  return (
    <>
      <article className="stat-1 admin-stat-card">
        <span className="flex items-center justify-between w-full">
          <PieChartOutlined className="icon utility" />
          <Title level={3} style={{ margin: 0 }}>
            500
          </Title>
        </span>
        <span className="flex items-center justify-between w-full">
          <Text type="secondary">Cantidad de ventas</Text>
          <Text className="stat-growth negative" type="secondary">
            -15%
          </Text>
        </span>
      </article>
      <article className="stat-2 admin-stat-card">
        <span className="flex items-center justify-between w-full">
          <DollarOutlined className="icon earning" />
          <Title level={3} style={{ margin: 0 }}>
            $ 2900000
          </Title>
        </span>
        <span className="flex items-center justify-between w-full">
          <Text type="secondary">Total en ventas</Text>
          <Text className="stat-growth" type="secondary">
            +25%
          </Text>
        </span>
      </article>
      <article className="stat-3 flex items-center justify-between bg-white p-5 rounded-lg shadow">
        <span className="flex flex-col items-start justify-between w-full pl-2">
          <Text type="secondary">Filtrar por mes</Text>
          <DatePicker placeholder="Seleccionar mes" picker="month" />
        </span>
        <Divider type="vertical" />
        <span className="flex flex-col items-start justify-between w-full pl-4">
          <Text type="secondary">Periodo</Text>
          <Title level={3} style={{ margin: 0 }}>
            Ultimos 4 meses
          </Title>
        </span>
      </article>
    </>
  );
}
