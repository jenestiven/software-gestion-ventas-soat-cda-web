"use client";

import React, { useEffect } from "react";
import { Table, Typography } from "antd";
import useStore from "@/store";
import { SalesByPlaceData } from "@/types/types";
//import "@/app/admin/page.css";

const { Title } = Typography;

type Props = {
  dataSource: SalesByPlaceData[];
};

export default function SalesByPlaceTableClient({ dataSource }: Props) {
  const { setDataForDashboard } = useStore();

  const betterPlace = dataSource.reduce<SalesByPlaceData | null>(
    (max, item) => (item.sales_quantity > (max?.sales_quantity ?? 0) ? item : max),
    null
  );    

  useEffect(() => {
    if (betterPlace) {
      setDataForDashboard({
        betterPlaceName: betterPlace?.place_name ?? "",
        salesCount: betterPlace?.sales_quantity ?? 0,
        totalProfit: dataSource.reduce((acc, item) => acc + item.sales_profit, 0),
        cash_profit: dataSource.reduce((acc, item) => acc + item.cash_profit, 0),
        credit_profit: dataSource.reduce((acc, item) => acc + item.credit_profit, 0),
      });
    }
  }, [betterPlace]); //eslint-disable-line react-hooks/exhaustive-deps

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
          <span>${item.sales_amount.toLocaleString("es-CO")}</span>
        </div>
      ),
    },
     {
      title: "Utilidad",
      dataIndex: "",
      key: "profit",
      render: (item: { sales_profit: number }) => (
        <div className="flex items-center justify-between gap-4">
          <span>
           ${item.sales_profit.toLocaleString("es-CO")}
          </span>
        </div>
      ),
    }
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
        rowKey="place_name"
      />
    </div>
  );
}
