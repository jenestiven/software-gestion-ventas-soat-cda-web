'use client';

import React, { useEffect, useState } from 'react';
import CompareSellsGraphClient from './CompareSellsGraphClient';
import { SalesForMonthsResponse } from '@/types/types';
import { Skeleton } from '@/app/admin/page';

type Props = {
  dateRange: any;
};

export default function CompareSellsGraph({ dateRange }: Props) {
  const [salesData, setSalesData] = useState<SalesForMonthsResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let url = '/api/sales-for-months';
    if (dateRange && dateRange[1]) {
      const endDate = dateRange[1];
      const query = new URLSearchParams({
        year: endDate.year().toString(),
        month: (endDate.month() + 1).toString(),
      });
      url = `${url}?${query}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSalesData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dateRange]);

  useEffect(() => {
    setLoading(true);
    fetch('/api/sales-for-months')
      .then((res) => res.json())
      .then((data) => {
        setSalesData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading || !salesData) {
    return <Skeleton />;
  }

  return <CompareSellsGraphClient salesData={salesData} />;
}