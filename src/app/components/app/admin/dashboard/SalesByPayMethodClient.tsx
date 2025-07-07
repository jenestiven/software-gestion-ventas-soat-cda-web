"use client";

import React from "react";
import { Table, Typography } from "antd";
import "@/app/admin/page.css";

const { Title } = Typography;

type Props = {
  dataSource: any[];
};

export default function SalesByPayMethodClient({ dataSource }: Props) {
  const columns = [
    {
      title: "Método de pago",
      dataIndex: "pay_method",
      key: "pay_method",
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
        <span style={{ color: growth > 0 ? "green" : "red" }}>
          {growth}%
        </span>
      ),
    },
  ];

  return (
    <div className="by-pay-method table-card shadow bg-white rounded-lg">
      <Title level={5} style={{ margin: 0 }}>
        Ventas por método de pago
      </Title>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
}
