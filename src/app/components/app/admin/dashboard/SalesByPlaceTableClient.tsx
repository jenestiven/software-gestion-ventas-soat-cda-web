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



  const columns = [
    {
      title: 'Sede',
      dataIndex: 'place_name',
      key: 'place_name',
    },
    {
      title: 'Ventas',
      dataIndex: 'sales_quantity',
      key: 'sales_quantity',
    },
    {
      title: 'Monto',
      dataIndex: 'sales_amount',
      key: 'sales_amount',
      render: (amount: number) => (
        <div className="flex items-center justify-between gap-4">
          <span>${amount.toLocaleString('es-CO')}</span>
        </div>
      ),
    },
    {
      title: 'Utilidad',
      dataIndex: 'sales_profit',
      key: 'sales_profit',
      render: (profit: number) => (
        <div className="flex items-center justify-between gap-4">
          <span>${profit.toLocaleString('es-CO')}</span>
        </div>
      ),
    },
  ];

  const summary = (pageData: readonly SalesByPlaceData[]) => {
    const totalAmount = dataSource.reduce((sum, item) => sum + item.sales_amount, 0);
    const totalProfit = dataSource.reduce((sum, item) => sum + item.sales_profit, 0);

    return (
      <Table.Summary.Row>
        <Table.Summary.Cell index={0} colSpan={2}>
          <strong>Total</strong>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={2}>
          <strong>${totalAmount.toLocaleString('es-CO')}</strong>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={3}>
          <strong>${totalProfit.toLocaleString('es-CO')}</strong>
        </Table.Summary.Cell>
      </Table.Summary.Row>
    );
  };

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
        summary={summary}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
}
