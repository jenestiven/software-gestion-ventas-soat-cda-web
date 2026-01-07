"use client";

import React from "react";
import { Table, Typography } from "antd";
import "@/app/admin/page.css";
import { SalesByPayMethodData } from "@/types/types";

const { Title } = Typography;

type Props = {
  dataSource: SalesByPayMethodData[];
};

export default function SalesByPayMethodClient({ dataSource }: Props) {
  const columns = [
    {
      title: 'Método',
      dataIndex: 'pay_method',
      key: 'pay_method',
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
      dataIndex: 'profit',
      key: 'profit',
      render: (profit: number) => (
        <div className="flex items-center justify-between gap-4">
          <span>${profit.toLocaleString('es-CO')}</span>
        </div>
      ),
    },
  ];

  const summary = (pageData: readonly SalesByPayMethodData[]) => {
    const totalAmount = dataSource.reduce((sum, item) => sum + item.sales_amount, 0);
    const totalProfit = dataSource.reduce((sum, item) => sum + item.profit, 0);

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
    <div className="by-pay-method table-card shadow bg-white rounded-lg">
      <Title level={5} style={{ margin: 0 }}>
        Ventas por método de pago
      </Title>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey="pay_method"
        summary={summary}
      />
    </div>
  );
}
