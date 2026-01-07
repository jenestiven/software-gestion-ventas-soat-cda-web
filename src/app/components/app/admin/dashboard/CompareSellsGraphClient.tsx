'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Typography } from 'antd';
import '@/app/admin/page.css';
import { SalesForMonthsData } from '@/types/types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const { Title, Text } = Typography;
interface CompareSellsGraphClientProps {
  salesData: Record<string, SalesForMonthsData[]>;
}

const CompareSellsGraphClient: React.FC<CompareSellsGraphClientProps> = ({
  salesData,
}) => {
  const years = Object.keys(salesData).sort((a, b) => parseInt(a) - parseInt(b));

  if (years.length === 0) {
    return (
      <div className="month-graph bg-white rounded-lg shadow p-4">
        <Title level={4}>Ventas mensuales</Title>
        <p>No hay datos de ventas para mostrar.</p>
      </div>
    );
  }

  // YoY Growth Calculation
  const sortedYears = Object.keys(salesData).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );
  let yoyGrowth: number | null = null;
  if (sortedYears.length >= 2) {
    const currentYear = sortedYears[0];
    const previousYear = sortedYears[1];

    const currentYearTotal = salesData[currentYear].reduce(
      (sum, month) => sum + month.sales_quantity,
      0
    );
    const previousYearTotal = salesData[previousYear].reduce(
      (sum, month) => sum + month.sales_quantity,
      0
    );

    if (previousYearTotal > 0) {
      yoyGrowth =
        ((currentYearTotal - previousYearTotal) / previousYearTotal) * 100;
    } else if (currentYearTotal > 0) {
      yoyGrowth = 100;
    }
  }

  // MoM Growth Calculation
  let momGrowth: number | null = null;
  const allMonthsData = years.flatMap(year => salesData[year]);
  const lastTwoMonthsWithSales = allMonthsData
    .filter(month => month.sales_quantity > 0)
    .slice(-2);

  if (lastTwoMonthsWithSales.length === 2) {
    const currentMonthSales = lastTwoMonthsWithSales[1].sales_quantity;
    const previousMonthSales = lastTwoMonthsWithSales[0].sales_quantity;
    if (previousMonthSales > 0) {
      momGrowth = ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100;
    } else if (currentMonthSales > 0) {
      momGrowth = 100;
    }
  }

  const categories = salesData[years[0]].map((monthData) => monthData.month);

  const series = years.map((year) => ({
    name: year,
    data: salesData[year].map((monthData) => monthData.sales_quantity),
  }));

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      id: 'sales-comparison-chart',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: categories,
    },
    stroke: {
      curve: 'smooth',
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      x: {
        format: 'MMM',
      },
      y: {
        formatter: (value, { seriesIndex, dataPointIndex, w }) => {
          const year = w.globals.seriesNames[seriesIndex];
          const currentMonthData = salesData[year][dataPointIndex];

          let momGrowthHtml = '';
          let previousMonthSalesQuantity = 0;

          const monthNames = [
            'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
            'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
          ];
          const currentMonthIndex = monthNames.indexOf(currentMonthData.month);

          if (currentMonthIndex > 0) {
            // Same year, previous month
            previousMonthSalesQuantity = salesData[year][currentMonthIndex - 1].sales_quantity;
          } else {
            // January, check last month of previous year
            const prevYear = (parseInt(year) - 1).toString();
            if (salesData[prevYear] && salesData[prevYear][11]) { // Month index 11 is December
              previousMonthSalesQuantity = salesData[prevYear][11].sales_quantity;
            }
          }

          if (previousMonthSalesQuantity > 0) {
            const momGrowth = ((currentMonthData.sales_quantity - previousMonthSalesQuantity) / previousMonthSalesQuantity) * 100;
            momGrowthHtml = `
              <div style="color: ${momGrowth >= 0 ? 'green' : 'red'}; margin-top: 5px;">
                ${momGrowth >= 0 ? '▲' : '▼'} ${momGrowth.toFixed(1)}% MoM
              </div>
            `;
          } else if (currentMonthData.sales_quantity > 0) {
            momGrowthHtml = `
              <div style="color: green; margin-top: 5px;">
                ▲ 100.0% MoM (desde 0)
              </div>
            `;
          }


          return `
            <div class="p-2">
              <div><strong>${currentMonthData.month} ${year}</strong></div>
              <div>Cantidad: ${currentMonthData.sales_quantity}</div>
              <div>Monto: $${currentMonthData.sales_amount.toLocaleString('es-CO')}</div>
              <div>Utilidad: $${(currentMonthData?.profit ?? 0).toLocaleString('es-CO')}</div>
              ${momGrowthHtml}
            </div>
          `;
        },
      },

    },
  };

  return (
    <div className="month-graph bg-white rounded-lg shadow p-4">
      <div className="flex items-center gap-4 mb-4">
        <Title level={4} style={{ margin: 0 }}>
          Ventas mensuales por año
        </Title>
        {yoyGrowth !== null && (
          <Text
            className={`text-lg ${
              yoyGrowth >= 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {yoyGrowth >= 0 ? '▲' : '▼'} {yoyGrowth.toFixed(1)}% YoY
          </Text>
        )}

      </div>
      <Chart options={chartOptions} series={series} type="area" height={350} />
    </div>
  );
};

export default CompareSellsGraphClient;
