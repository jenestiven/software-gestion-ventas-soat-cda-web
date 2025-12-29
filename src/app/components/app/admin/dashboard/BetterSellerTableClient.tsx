"use client";

import React, { useEffect } from "react";
import { Avatar, Table, Typography } from "antd";
import useStore from "@/store";
import "@/app/admin/page.css";

const { Title } = Typography;

type Props = {
  dataSource: any[];
};

export default function BetterSellerTableClient({ dataSource }: Props) {
  const { setDataForDashboard } = useStore();
  const betterSeller = dataSource.reduce(
    (max, item) => (item.sells > (max?.sells ?? 0) ? item : max),
    null
  );

  useEffect(() => {
    if (betterSeller) {
      setDataForDashboard({
        betterSellerImage: betterSeller?.photo ?? "",
        betterSellerName: betterSeller?.name ?? "",
      });
    }
  }, [betterSeller]); //eslint-disable-line react-hooks/exhaustive-deps

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
      title: "Ventas",
      dataIndex: "sells",
      key: "sells",
    },
    {
      title: "Sede",
      dataIndex: "place",
      key: "place",
    },
    {
      title: "Monto",
      dataIndex: "",
      key: "amount",
      render: (item: { amount: number; growth: number }) => (
        <div className="flex items-center justify-between gap-4">
          <span>${item.amount.toLocaleString("es-CO")}</span>
        </div>
      ),
    },
    {
      title: "Utilidad",
      dataIndex: "",
      key: "profit",
      render: (item: { profit: number }) => (
        <div className="flex items-center justify-between gap-4">
          <span>${item.profit.toLocaleString("es-CO")}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="better-seller table-card shadow bg-white rounded-lg">
      <Title level={5} style={{ margin: 0 }}>
        Mejores vendedores
      </Title>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 3 }}
        rowKey={(record) => record.id || record.name}
      />
    </div>
  );
}
