'use client';

import { Suspense, useState, useEffect } from 'react';
import SellsCardSection from '../components/app/admin/dashboard/SellsCardSection';
import CompareSellsGraph from '../components/app/admin/dashboard/CompareSellsGraph';
import BetterSellerTable from '../components/app/admin/dashboard/BetterSellerTable';
import SalesByPlaceTable from '../components/app/admin/dashboard/SalesByPlaceTable';
import SalesByPayMethod from '../components/app/admin/dashboard/SalesByPayMethod';
import useStore from '@/store';
import { Sale } from '@/types/types';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
import './page.css';

export const dynamic = 'force-dynamic';

type Props = {};

export const Skeleton = () => (
  <div className="w-full h-72 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
    <div className="w-3/4 h-2/3 bg-gray-200 rounded" />
  </div>
);

const HeaderSkeleton = () => (
  <div className="w-full h-16 bg-gray-100 animate-pulse rounded-lg grid grid-cols-4 gap-4">
    <div
      className="col-span-2 flex items-center justify-center"
      style={{ width: '70%' }}
    >
      <div className="w-full h-3 bg-gray-200 rounded" />
    </div>
    <div
      className="col-span-2 flex items-center justify-center"
      style={{ width: '30%' }}
    >
      <div className="w-full h-3 bg-gray-200 rounded" />
    </div>
  </div>
);

export default function AdminHomePage({}: Props) {
  const [dateRange, setDateRange] = useState<[any, any] | null>(null);
  const [allSales, setAllSales] = useState<Sale[]>([]);
  const { setDataForDashboard } = useStore();

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch('/api/sales/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const sales = await response.json();
        setAllSales(sales);
      } catch (error) {
        console.error('Failed to fetch sales:', error);
      }
    };
    fetchSales();
  }, []);

  useEffect(() => {
    let salesToProcess = allSales;
    const now = dayjs();
    const startOfCurrentMonth = now.startOf('month');
    const endOfCurrentMonth = now.endOf('month');

    if (dateRange && dateRange[0] && dateRange[1]) {
      // If a specific date range is selected
      const [startDate, endDate] = dateRange;
      salesToProcess = allSales.filter((sale) => {
        const saleDate = dayjs(sale.created_at);
        // Using isSameOrAfter and isSameOrBefore for inclusive range
        return saleDate.isSameOrAfter(startDate.startOf('day')) && saleDate.isSameOrBefore(endDate.endOf('day'));
      });
    } else {
      // No date range selected, default to current month
      salesToProcess = allSales.filter((sale) => {
        const saleDate = dayjs(sale.created_at);
        return saleDate.isSameOrAfter(startOfCurrentMonth.startOf('day')) && saleDate.isSameOrBefore(endOfCurrentMonth.endOf('day'));
      });
    }

    const totalSalesAmount = salesToProcess.reduce(
      (acc, sale) => acc + sale.sale_sumary.total_payed,
      0
    );
    const totalSalesCount = salesToProcess.length;
    const totalProfit = salesToProcess.reduce(
      (acc, sale) => acc + (sale.sale_sumary.profit || 0),
      0
    );
    const cash_profit = salesToProcess
      .filter(
        (sale) =>
          sale.payment_method_id === 'cash' ||
          sale.payment_method_id === 'dataphone'
      )
      .reduce((acc, sale) => acc + (sale.sale_sumary.profit || 0), 0);

    const credit_profit = salesToProcess
      .filter((sale) =>
        ['sistecredito', 'addi', 'brilla'].includes(sale.payment_method_id)
      )
      .reduce((acc, sale) => acc + (sale.sale_sumary.profit || 0), 0);

    // Logic for better place
    const placeSales: Record<string, { name: string; count: number }> = {};
    salesToProcess.forEach((sale) => {
      const placeId = sale.sale_place.place_id;
      const placeName = sale.sale_place.place_name;
      if (!placeSales[placeId]) {
        placeSales[placeId] = { name: placeName, count: 0 };
      }
      placeSales[placeId].count++;
    });

    const betterPlace = Object.values(placeSales).reduce(
      (max, place) => (place.count > max.count ? place : max),
      { name: '', count: 0 }
    );

    // Logic for better seller
    const asesorSales: Record<
      string,
      { name: string; photo: string; count: number }
    > = {};
    salesToProcess.forEach((sale) => {
      const asesorId = sale.asesor_data.uid;
      const asesorName = sale.asesor_data.name;
      const asesorPhoto = sale.asesor_data.thumnail;
      if (!asesorSales[asesorId]) {
        asesorSales[asesorId] = {
          name: asesorName,
          photo: asesorPhoto,
          count: 0,
        };
      }
      asesorSales[asesorId].count++;
    });

    const betterSeller = Object.values(asesorSales).reduce(
      (max, asesor) => (asesor.count > max.count ? asesor : max),
      { name: '', photo: '', count: 0 }
    );
    
    setDataForDashboard({
      totalSalesAmount,
      totalSalesCount,
      totalProfit,
      cash_profit,
      credit_profit,
      betterPlaceName: betterPlace.name,
      salesCount: betterPlace.count,
      betterSellerName: betterSeller.name,
      betterSellerImage: betterSeller.photo,
    });
  }, [dateRange, allSales, setDataForDashboard]);

  return (
    <div className="admin-home-page">
      <Suspense fallback={<HeaderSkeleton />}>
        <SellsCardSection onDateRangeChange={setDateRange} />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <CompareSellsGraph dateRange={dateRange} />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <BetterSellerTable dateRange={dateRange} />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <SalesByPlaceTable dateRange={dateRange} />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <SalesByPayMethod dateRange={dateRange} />
      </Suspense>
    </div>
  );
}
