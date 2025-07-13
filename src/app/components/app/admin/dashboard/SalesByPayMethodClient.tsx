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
      title: "Método",
      dataIndex: "pay_method",
      key: "pay_method",
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
    }
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
