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
      title: "Ventas",
      dataIndex: "sales_quantity",
      key: "sales_quantity",
    },
    {
      title: "Monto",
      dataIndex: "",
      key: "sales_amount",
      render: (item: { sales_amount: number; growth: number }) => (
        <div className="flex items-center justify-between gap-4">
          <span>${item.sales_amount.toLocaleString()}</span>
          <span style={{ color: item.growth > 0 ? "green" : "red" }}>
            {item.growth}%
          </span>
        </div>
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
