"use client";

import React from "react";
import { Table, Typography } from "antd";
import "@/app/admin/page.css";

const { Title } = Typography;

type Props = {
  dataSource: any[];
};

export default function SalesByPlaceTableClient({ dataSource }: Props) {
  const columns = [
    {
      title: "Sede",
      dataIndex: "place_name",
      key: "place_name",
    },
    {
      title: "No. de ventas",
      dataIndex: "sales_quantity",
      key: "sales_quantity",
    },
    {
      title: "Monto",
      dataIndex: "sales_amount",
      key: "sales_amount",
    },
    {
      title: "Crecimiento",
      dataIndex: "growth",
      key: "growth",
      render: (growth: number) => (
        <span style={{ color: growth > 0 ? "green" : "red" }}>{growth}%</span>
      ),
    },
  ];

  return (
    <div className="by-place table-card shadow bg-white rounded-lg p-4">
      <Title level={5} style={{ margin: 0 }}>
        Ventas por sede
      </Title>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
