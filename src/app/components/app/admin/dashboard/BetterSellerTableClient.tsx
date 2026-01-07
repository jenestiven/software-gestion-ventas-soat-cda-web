'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Table, Typography } from 'antd';
import useStore from '@/store';
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
  const { setDataForDashboard } = useStore();
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


  const betterSeller = sellersData.reduce(
    (max, item) => (item.sells > (max?.sells ?? 0) ? item : max),
    null
  );



  const columns = [
    {
      title: 'Asesor',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={record.photo} style={{ marginRight: 8 }} />
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
      dataIndex: '',
      key: 'amount',
      render: (item: { amount: number; growth: number }) => (
        <div className="flex items-center justify-between gap-4">
          <span>${item.amount.toLocaleString('es-CO')}</span>
        </div>
      ),
    },
    {
      title: 'Utilidad',
      dataIndex: '',
      key: 'profit',
      render: (item: { profit: number }) => (
        <div className="flex items-center justify-between gap-4">
          <span>${item.profit.toLocaleString('es-CO')}</span>
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
        dataSource={sellersData}
        columns={columns}
        pagination={{ pageSize: 3 }}
        rowKey={(record) => record.id || record.name}
        loading={loading}
      />
    </div>
  );
}
