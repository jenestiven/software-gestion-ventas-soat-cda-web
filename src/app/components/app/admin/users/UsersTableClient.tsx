"use client";

import React, { useState } from "react";
import { MoreOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Table, Button, Dropdown, Menu, Input, Avatar } from "antd";

type Props = {};

const dataSource = [
  {
    key: "1",
    name: "John Brown",
    thumbnail: "https://i.pravatar.cc/150?img=1",
    tel: "123-456-7890",
    email: "john.brown@example.com",
    active: true,
    role: "Admin",
  },
  {
    key: "2",
    name: "Jim Green",
    thumbnail: "https://i.pravatar.cc/150?img=2",
    tel: "098-765-4321",
    email: "jim.green@example.com",
    active: false,
    role: "Asesor",
  },
];

export default function UsersTableClient({}: Props) {
  const [searchText, setSearchText] = useState("");

  const filteredDataSource = dataSource.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Usuario",
      dataIndex: "",
      key: "name",
      render: (item: { name: string; thumbnail: string }) => (
        <span className="flex items-center gap-2">
          <Avatar
            src={item.thumbnail}
            alt="thumbnail"
            className="rouded-full w-10 h-10"
          />
          {item.name}
        </span>
      ),
    },
    {
      title: "Telefono",
      dataIndex: "tel",
      key: "tel",
    },
    {
      title: "Correo electrónico",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Estado",
      dataIndex: "active",
      key: "active",
      render: (active: "Active" | "Inactive") =>
        active ? "Active" : "Inactive",
      filters: [
        { text: "Activo", value: true },
        { text: "Inactivo", value: false },
      ],
      onFilter: (value: string, record: any) => record.active === value,
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Administrador", value: "Admin" },
        { text: "Asesor", value: "Asesor" },
      ],
      onFilter: (value: string, record: any) => record.role.includes(value),
    },
    {
      title: "Acciones",
      key: "action",
      render: () => (
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item key="1">Editar</Menu.Item>
      <Menu.Item key="2">Eliminar</Menu.Item>
    </Menu>
  );

  return (
    <div className="p-5 bg-white rounded-lg shadow">
      <div className="mb-4 flex justify-end items-center gap-4">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Buscar usuario"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="h-8 rounded-md w-1/4"
        />
        <Button type="primary" icon={<PlusOutlined />}>
          Crear nuevo usuario
        </Button>
      </div>
      <Table
        dataSource={filteredDataSource}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
