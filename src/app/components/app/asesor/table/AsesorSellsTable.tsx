"use client";

import { Table, Tag } from "antd";
import React from "react";
import "@/app/components/app/asesor/table/asesor-table.css";
import { Sell } from "@/types/types";

interface Props {
  data: Sell[];
}

export default function AsesorSellsTable({ data }: Props) {
  return (
    <Table dataSource={data} rowKey="id">
      <Table.Column title="Fecha" dataIndex="date" key="date" />
      <Table.Column title="Cliente" dataIndex="client" key="client" />
      <Table.Column
        title="Placa"
        dataIndex="vehicle_license_plate"
        key="vehicle_license_plate"
      />
      <Table.Column
        title="Vehículo"
        dataIndex="vehicle_type"
        key="vehicle_type"
      />
      <Table.Column
        title="Valor SOAT"
        dataIndex="soat_value"
        key="soat_value"
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
          <Tag color={item === "Pendiente" ? "volcano" : "green"}>{item}</Tag>
        )}
      />
      <Table.Column title="Acciones" dataIndex="actions" key="actions" />
    </Table>
  );
}
