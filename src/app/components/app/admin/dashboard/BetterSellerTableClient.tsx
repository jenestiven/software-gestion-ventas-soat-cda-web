'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Table, Typography } from 'antd';
import '@/app/admin/page.css';

const { Title } = Typography;

type Props = {
  dataSource: any[];
  dateRange: any;
};

export default function BetterSellerTableClient({
  dataSource,
  dateRange,
}: Props) {
  const [sellersData, setSellersData] = useState(dataSource);
  const [loading, setLoading] = useState(true); // Start with loading true

  useEffect(() => {
    console.log('Rango de fechas recibido:', dateRange);
    setLoading(true);
    let year, month, endYear, endMonth;

    if (dateRange && dateRange[0] && dateRange[1]) {
      const [startDate, endDate] = dateRange;
      year = startDate?.year();
      month = startDate?.month() + 1;
      endYear = endDate?.year();
      endMonth = endDate?.month() + 1;
    }

    const query = new URLSearchParams({
      ...(year && { year: year.toString() }),
      ...(month && { month: month.toString() }),
      ...(endYear && { endYear: endYear.toString() }),
      ...(endMonth && { endMonth: endMonth.toString() }),
    });

    fetch(`/api/better-sellers?${query}`)
      .then((res) => res.json())
      .then((data) => {
        setSellersData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dateRange]);

  // Effect to fetch initial data
  useEffect(() => {
    setLoading(true);
    fetch('/api/better-sellers')
      .then((res) => res.json())
      .then((data) => {
        setSellersData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: 'Asesor',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={record.photo} style={{ marginRight: 8 }}>
            {record.photo ? '' : text.charAt(0).toUpperCase()}
          </Avatar>
          {text}
        </div>
      ),
    },
    {
      title: 'Ventas',
      dataIndex: 'sells',
      key: 'sells',
    },
    {
      title: 'Sede',
      dataIndex: 'place',
      key: 'place',
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
      key: 'amount',
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

  const summary = () => {
    const totalAmount = sellersData.reduce((sum, item) => sum + item.amount, 0);
    const totalProfit = sellersData.reduce((sum, item) => sum + item.profit, 0);

    return (
      <Table.Summary.Row>
        <Table.Summary.Cell index={0} colSpan={3}>
          <strong>Total</strong>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={3}>
          <strong>${totalAmount.toLocaleString('es-CO')}</strong>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={4}>
          <strong>${totalProfit.toLocaleString('es-CO')}</strong>
        </Table.Summary.Cell>
      </Table.Summary.Row>
    );
  };

  return (
    <div className="better-seller table-card shadow bg-white rounded-lg">
      <Title level={5} style={{ margin: 0 }}>
        Mejores vendedores
      </Title>
      <Table
        dataSource={sellersData}
        columns={columns}
        pagination={{ pageSize: 3 }}
        rowKey={(record) => record.id || record.name}
        loading={loading}
        summary={summary}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
}
