"use client";

import React from "react";
import { DollarOutlined, PieChartOutlined } from "@ant-design/icons";
import { DatePicker, Divider, Typography } from "antd";
import "@/app/admin/page.css"; 
import "@/app/asesor/page.css";

type Props = {};

const { Title, Text } = Typography;

export default function SellsCardSection({}: Props) {
  return (
    <section className="sell-card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <article className="asesor-stat-card">
        <PieChartOutlined className="icon utility" />
        <span>
          <Text type="secondary">Cantidad de ventas</Text>
          <Text className="stat-growth negative" type="secondary">
            -15%
          </Text>
        </span>
        <Title level={3} style={{ margin: 0 }}>
          500
        </Title>
      </article>
      <article className="asesor-stat-card">
        <DollarOutlined className="icon earning" />
        <span>
          <Text type="secondary">Total en ventas</Text>
          <Text className="stat-growth" type="secondary">
            +25%
          </Text>
        </span>
        <Title level={3} style={{ margin: 0 }}>
          $ 2900000
        </Title>
      </article>
      <article className="asesor-stat-card">
        <span className="flex items-center justify-between w-64">
        <Text type="secondary">Filtrar por mes</Text>
        <DatePicker placeholder="Seleccionar mes" picker="month" />
        </span>
        <Divider />
        <Text type="secondary">Periodo</Text>
        <Title level={3} style={{ margin: 0 }}>
          Ultimos 4 meses
        </Title>
      </article>
    </section>
  );
}
