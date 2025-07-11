"use client";

import { Table } from "antd";
import React from "react";

type Props = {};

const dataSource = [
  {
    key: "1",
    placeName: "Plaza Central",
    placeAddress: "Calle Falsa 123",
    asesorsNumber: 5,
    active: true,
  },
  {
    key: "2",
    placeName: "Centro Mayor",
    placeAddress: "Avenida Siempre Viva 742",
    asesorsNumber: 8,
    active: false,
  },
];

export default function PlacesTableClient({}: Props) {

  const columns = [
    {
      title: "Place Name",
      dataIndex: "placeName",
      key: "placeName",
    },
    {
      title: "Place Address",
      dataIndex: "placeAddress",
      key: "placeAddress",
    },
    {
      title: "Asesors Number",
      dataIndex: "asesorsNumber",
      key: "asesorsNumber",
    },
    {
      title: "Active Status",
      dataIndex: "active",
      key: "active",
      render: (active) => (active ? "Active" : "Inactive"),
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
}
