"use client";

import React from "react";
import { Avatar, Table, Typography } from "antd";
import "@/app/admin/page.css";

const { Title } = Typography;

type Props = {
  dataSource: any[];
};

export default function BetterSellerTableClient({ dataSource }: Props) {
  const columns = [
    {
      title: "Asesor",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={record.photo} style={{ marginRight: 8 }} />
          {text}
        </div>
      ),
    },
    {
      title: "No. de ventas",
      dataIndex: "sells",
      key: "sells",
    },
    {
      title: "Monto",
      dataIndex: "amount",
      key: "amount",
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
    <div className="better-seller table-card shadow bg-white rounded-lg">
      <Title level={5} style={{ margin: 0 }}>
        Mejores vendedores
      </Title>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
}
