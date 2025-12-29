"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Typography } from "antd";
import "@/app/admin/page.css";
import { SalesForMonthsResponse } from "@/types/types";
import useStore from "@/store";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const { Title, Text } = Typography;
interface CompareSellsGraphClientProps {
  salesData: SalesForMonthsResponse;
}

const CompareSellsGraphClient: React.FC<CompareSellsGraphClientProps> = ({
  salesData,
}) => {
  const { setDataForDashboard } = useStore();
  const [chartOptions, setChartOptions] = useState<ApexCharts.ApexOptions>({});
  const [chartSeries, setChartSeries] = useState<ApexAxisChartSeries>([]);
  
  // Recupera la cantidad y el monto de ventas del mes actual
  const currentMonthData =
    salesData.monthsData[salesData.monthsData.length - 1];
    
  const salesCurrentMonth = currentMonthData
    ? currentMonthData.sales_quantity
    : 0;
  const amountCurrentMonth = currentMonthData
    ? currentMonthData.sales_amount
    : 0;

  useEffect(() => {
    if (salesCurrentMonth && amountCurrentMonth) {
      setDataForDashboard({
        totalSalesCount: salesCurrentMonth,
        totalSalesAmount: amountCurrentMonth,
        amountGrowth: salesData.growth,
      });
    }
  }, [salesCurrentMonth, amountCurrentMonth]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (salesData.monthsData.length === 0) return;

    const months = salesData.monthsData.map((sale) => sale.month);
    const sales = salesData.monthsData.map((sale) => sale["sales_quantity"]);

    setChartOptions({
      chart: {
        id: "sales-comparison-chart",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: months,
      },
      stroke: {
        curve: "smooth",
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        x: {
          format: "MMM",
        },
        y: {
          formatter: (value, { seriesIndex, dataPointIndex }) => {
            const sale = salesData.monthsData[dataPointIndex];
            return `<div style="align-items: center; display: flex; gap: 8px;">
                  <div>Cantidad: ${sale["sales_quantity"]},</div>
                  <div>Monto: $${sale["sales_amount"].toLocaleString()}</div>
                </div>`;
          },
        },
      },
    });

    setChartSeries([
      {
        name: "Ventas Mensuales",
        data: sales,
      },
    ]);
  }, [salesData]);

  return (
    <div className="month-graph bg-white rounded-lg shadow p-4">
      <Title level={4}>Ventas mensuales</Title>
      <Title level={1} style={{ margin: 0 }}>
        {salesData.growth.toFixed(0) ?? 0}%
      </Title>
      <Text type="secondary">
        Este mes{" "}
        <span className={salesData.growth > 0 ? "text-green-500" : "text-red-500"}>
          {salesData.growth.toFixed(0) ?? 0}%
        </span>
      </Text>
      {chartSeries.length > 0 && chartOptions.xaxis && (
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="area"
          height={350}
        />
      )}
    </div>
  );
};

export default CompareSellsGraphClient;
