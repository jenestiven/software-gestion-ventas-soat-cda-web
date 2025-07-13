"use client";

import { MoreOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Menu, Table } from "antd";
import type { TableProps } from "antd";
import React, { useState } from "react";
import PlaceCreationModal from "./PlaceCreationModal";
import { PlacesDataType } from "@/types/types";

type Props = {};

const dataSource: PlacesDataType[] = [
  {
    key: "1",
    place_name: "Plaza Central",
    place_address: "Calle Falsa 123",
    asesors_number: 5,
    active: true,
  },
  {
    key: "2",
    place_name: "Centro Mayor",
    place_address: "Avenida Siempre Viva 742",
    asesors_number: 8,
    active: false,
  },
];

export default function PlacesTableClient({}: Props) {
  const [searchText, setSearchText] = useState("");
  const [openPlaceCreationModal, setOpenCreationModal] = useState(false);

  const filteredDataSource = dataSource.filter((place) =>
    place.place_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: TableProps<PlacesDataType>["columns"] = [
    {
      title: "Nombre de la sede",
      dataIndex: "place_name",
      key: "placeName",
    },
    {
      title: "Dirección",
      dataIndex: "place_address",
      key: "placeAddress",
    },
    {
      title: "No. de asesores",
      dataIndex: "asesors_number",
      key: "asesorsNumber",
    },
    {
      title: "Estado",
      dataIndex: "active",
      key: "active",
      render: (active) => (active ? "Active" : "Inactive"),
      filters: [
        { text: "Activo", value: true },
        { text: "Inactivo", value: false },
      ],
      onFilter: (value, record) => record.active === value,
    },
    {
      title: "Acciones",
      key: "action",
      render: () => (
        <Dropdown menu={{items: menu}} trigger={["click"]}>
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const menu = {
    items: [
      {
        key: "1",
        label: "Editar",
      },
      {
        key: "2",
        label: "Eliminar",
      },
    ],
  };

  return (
    <>
      <div className="p-5 bg-white rounded-lg shadow">
        <div className="mb-4 flex justify-end items-center gap-4">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Buscar sede"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="h-8 rounded-md w-1/4"
          />
          <Button
            onClick={() => setOpenCreationModal(true)}
            type="primary"
            icon={<PlusOutlined />}
          >
            Crear nueva sede
          </Button>
        </div>
        <Table
          dataSource={filteredDataSource}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      </div>
      <PlaceCreationModal
        open={openPlaceCreationModal}
        onClose={() => setOpenCreationModal(false)}
      />
    </>
  );
}
