"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Typography } from "antd";
import "@/app/admin/page.css";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const { Title, Text } = Typography;

interface Sale {
  id: number;
  month: string;
  "sells-quantity": number;
  "sells-amount": number;
}

interface CompareSellsGraphClientProps {
  salesData: Sale[];
}

const CompareSellsGraphClient: React.FC<CompareSellsGraphClientProps> = ({
  salesData,
}) => {
  const [chartOptions, setChartOptions] = useState<ApexCharts.ApexOptions>({});
  const [chartSeries, setChartSeries] = useState<ApexAxisChartSeries>([]);

  useEffect(() => {
    if (salesData.length === 0) return;

    const months = salesData.map((sale) => sale.month);
    const sales = salesData.map((sale) => sale["sells-quantity"]);

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
            const sale = salesData[dataPointIndex];
            return `<div style="align-items: center; display: flex; gap: 8px;">
                  <div>Cantidad: ${sale["sells-quantity"]},</div>
                  <div>Monto: $${sale["sells-amount"].toLocaleString()}</div>
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
        +15%
      </Title>
      <Text type="secondary">
        Este mes <span className="text-green-500">+15%</span>
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
