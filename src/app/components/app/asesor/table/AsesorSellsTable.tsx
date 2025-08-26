"use client";

import { Button, Input, Space, Table, Tag, DatePicker } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Sell, VehicleClass } from "@/types/types";
import {
  CloudUploadOutlined,
  EditOutlined,
  FilePdfOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { getTariffScheduleApi } from "@/lib/api/asesor";
import type { InputRef } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

interface Props {
  data: Sell[];
}

export default function AsesorSellsTable({ data }: Props) {
  const [tariff, setTariff] = useState<VehicleClass[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    const fetchTariffSchedule = async () => {
      const tariffSchedule = await getTariffScheduleApi();
      setTariff(tariffSchedule);
    };
    fetchTariffSchedule();
  }, []);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: keyof Sell
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: keyof Sell): ColumnType<Sell> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          className="h-8 rounded-md"
          ref={searchInput}
          placeholder="Buscar"
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Resetear
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Cerrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      (record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase())) ?? false,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <span>{text?.toString().toUpperCase()}</span>
      ) : (
        <span>{text?.toString().toUpperCase()}</span>
      ),
  });

  const columns: ColumnsType<Sell> = [
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      render: (date: string) =>
        new Date(date).toLocaleDateString("es-CO", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
      filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <DatePicker.RangePicker
            placeholder={["Fecha inicio", "Fecha fin"]}
            maxDate={dayjs().endOf("day")}
            minDate={dayjs().startOf("month")}
            onChange={(dates) => {
              if (dates) {
          setSelectedKeys([
            `${dates[0]!.toISOString()}|${dates[1]!.toISOString()}`,
          ]);
              } else {
          setSelectedKeys([]);
              }
            }}
          />
          <br />
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: 90, marginRight: 8, marginTop: 8 }}
          >
            Filtrar
          </Button>
          <Button
            onClick={() => {
              if (clearFilters) {
          clearFilters();
          confirm();
              }
            }}
            size="small"
            style={{ width: 90 }}
          >
            Resetear
          </Button>
        </div>
      ),
      onFilter: (value, record) => {
        if (typeof value === "string") {
          const [start, end] = value.split("|");
          const recordDate = dayjs(record.date);
          return recordDate.isBetween(dayjs(start), dayjs(end));
        }
        return true;
      },
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      defaultFilteredValue: [
        `${dayjs().startOf("month").toISOString()}|${dayjs()
          .endOf("month")
          .toISOString()}`,
      ],
    },
    {
      title: "Cliente",
      dataIndex: "client",
      key: "client",
      ...getColumnSearchProps("client"),
    },
    {
      title: "Placa",
      dataIndex: "vehicle_license_plate",
      key: "vehicle_license_plate",
      ...getColumnSearchProps("vehicle_license_plate"),
    },
    {
      title: "Vehículo",
      dataIndex: "vehicle_type",
      key: "vehicle_type",
      render: (item: string) => {
        let text = "Desconocido";
        if (item && Array.isArray(item) && item.length >= 2) {
          const vehicle = tariff.find((v) => v.id === item[0]);
          const type = vehicle?.categories.find((c) => c.code === item[1]);
          const vehicleClass = vehicle?.vehicle_class || "Desconocido";
          const typeName = type?.type || "Desconocido";
          text = `${vehicleClass}/${typeName}`;
        }
        return <span>{text}</span>;
      },
    },
    {
      title: "Valor SOAT",
      dataIndex: "soat_value",
      key: "soat_value",
      render: (item: number) => <span>${item.toLocaleString()}</span>,
    },
    {
      title: "Valor de venta",
      dataIndex: "total_value",
      key: "total_value",
      render: (item: number) => <span>${item.toLocaleString()}</span>,
    },
    {
      title: "Método de pago",
      dataIndex: "payment_method",
      key: "payment_method",
      filters: Array.from(new Set(data.map((item) => item.payment_method))).map(
        (method) => ({ text: method, value: method })
      ),
      onFilter: (value, record) => record.payment_method === value,
    },
    {
      title: "Comprobante",
      dataIndex: "doc_state",
      key: "doc_state",
      render: (item: string) => (
        <Tag color={item === "pending" ? "volcano" : "green"}>
          {item === "pending" ? "Pendiente" : "Completado"}
        </Tag>
      ),
      filters: [
        { text: "Pendiente", value: "pending" },
        { text: "Completado", value: "completed" },
      ],
      onFilter: (value, record) => record.doc_state === value,
    },
    {
      title: "Acciones",
      key: "actions",
      render: () => (
        <span className="flex gap-2">
          <Button icon={<EditOutlined />} />
          <Button icon={<FilePdfOutlined />} />
          <Button icon={<CloudUploadOutlined />} />
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={[...data].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )}
      rowKey="id"
      pagination={{ pageSize: 7 }}
    />
  );
}
