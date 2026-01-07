'use client';

import React, { useEffect, useState } from 'react';
import SalesByPayMethodClient from './SalesByPayMethodClient';
import { SalesByPayMethodData } from '@/types/types';
import { Skeleton } from '@/app/admin/page';

type Props = {
  dateRange: any;
};

export default function SalesByPayMethod({ dateRange }: Props) {
  const [salesByPayMethod, setSalesByPayMethod] = useState<
    SalesByPayMethodData[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let url = '/api/sales-by-pay-method';
    if (dateRange && dateRange[0] && dateRange[1]) {
      const [startDate, endDate] = dateRange;
      const query = new URLSearchParams({
        year: startDate.year().toString(),
        month: (startDate.month() + 1).toString(),
        endYear: endDate.year().toString(),
        endMonth: (endDate.month() + 1).toString(),
      });
      url = `${url}?${query}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSalesByPayMethod(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dateRange]);

  useEffect(() => {
    setLoading(true);
    fetch('/api/sales-by-pay-method')
      .then((res) => res.json())
      .then((data) => {
        setSalesByPayMethod(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  return <SalesByPayMethodClient dataSource={salesByPayMethod} />;
}