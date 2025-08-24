"use client";

import { Button, Table, Tag } from "antd";
import React, { useEffect } from "react";
import { Sell, VehicleClass } from "@/types/types";
import {
  CloudUploadOutlined,
  EditOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { getTariffScheduleApi } from "@/lib/api/asesor";
interface Props {
  data: Sell[];
}

export default function AsesorSellsTable({ data }: Props) {
  const [tariff, setTariff] = React.useState<VehicleClass[]>([]);

  useEffect(() => {
    const fetchTariffSchedule = async () => {
      const tariffSchedule = await getTariffScheduleApi();
      setTariff(tariffSchedule);
    };
    fetchTariffSchedule();
  }, []);

  return (
    <Table
      dataSource={[...data].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )}
      rowKey="id"
      pagination={{ pageSize: 7 }}
    >
      <Table.Column
        title="Fecha"
        dataIndex="date"
        key="date"
        render={(date: string) =>
          new Date(date).toLocaleDateString("es-CO", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        }
      />
      <Table.Column
        title="Cliente"
        dataIndex="client"
        key="client"
        render={(client: string) => <span>{client.toUpperCase()}</span>}
      />
      <Table.Column
        title="Placa"
        dataIndex="vehicle_license_plate"
        key="vehicle_license_plate"
        render={(plate: string) => <span>{plate.toUpperCase()}</span>}
      />
      <Table.Column
        title="Vehículo"
        dataIndex="vehicle_type"
        key="vehicle_type"
        render={(item: string) => {
          let text = "Desconocido";
          if (item && Array.isArray(item) && item.length >= 2) {
            const vehicle = tariff.find((v) => v.id === item[0]);
            const type = vehicle?.categories.find((c) => c.code === item[1]);
            const vehicleClass = vehicle?.vehicle_class || "Desconocido";
            const typeName = type?.type || "Desconocido";
            text = `${vehicleClass}/${typeName}`;
          }
          return <span>{text}</span>;
        }}
      />
      <Table.Column
        title="Valor SOAT"
        dataIndex="soat_value"
        key="soat_value"
        render={(item: number) => <span>${item.toLocaleString()}</span>}
      />
      <Table.Column
        title="Valor de venta"
        dataIndex="total_value"
        key="total_value"
        render={(item: number) => <span>${item.toLocaleString()}</span>}
      />
      <Table.Column
        title="Método de pago"
        dataIndex="payment_method"
        key="payment_method"
      />
      <Table.Column
        title="Comprobante"
        dataIndex="doc_state"
        key="doc_state"
        render={(item: string) => (
          <Tag color={item === "pending" ? "volcano" : "green"}>
            {item === "pending" ? "Pendiente" : "Completado"}
          </Tag>
        )}
      />
      <Table.Column
        title="Acciones"
        key="actions"
        render={() => (
          <span className="flex gap-2">
            <Button icon={<EditOutlined />} />
            <Button icon={<FilePdfOutlined />} />
            <Button icon={<CloudUploadOutlined />} />
          </span>
        )}
      />
    </Table>
  );
}
