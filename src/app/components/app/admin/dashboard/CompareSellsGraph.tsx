'use client';

import React, { useEffect, useState } from 'react';
import CompareSellsGraphClient from './CompareSellsGraphClient';
import { SalesForMonthsData } from '@/types/types';
import { Skeleton } from '@/app/admin/page';

type Props = {
  dateRange: any; // Keep for now, might be needed for future filtering
};

export default function CompareSellsGraph({ dateRange }: Props) {
  const [salesData, setSalesData] = useState<Record<
    string,
    SalesForMonthsData[]
  > | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/sales-by-year')
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