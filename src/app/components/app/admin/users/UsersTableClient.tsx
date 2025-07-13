"use client";

import React, { useState } from "react";
import { MoreOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Table, Button, Dropdown, Menu, Input, Avatar } from "antd";
import UserCreationModal from "./UserCreationModal";
import type { TableProps } from "antd";
import { UserDataType } from "@/types/types";

type Props = {};

const dataSource: UserDataType[] = [
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
  const [openUserCreationModal, setOpenUserCreationModal] = useState(false);

  const filteredDataSource = dataSource.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: TableProps<UserDataType>["columns"] = [
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
      onFilter: (value, record) => record.active === value,
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Administrador", value: "Admin" },
        { text: "Asesor", value: "Asesor" },
      ],
      onFilter: (value, record: any) => record.role.includes(value),
    },
    {
      title: "Acciones",
      key: "action",
      render: () => {
        const menu = [
          {
            key: "1",
            label: <a onClick={() => {}}>Editar</a>,
          },
          {
            key: "2",
            label: <a onClick={() => {}}>Eliminar</a>,
          },
        ];
        return (
          <Dropdown menu={{ items: menu }} trigger={["click"]}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <>
      <div className="p-5 bg-white rounded-lg shadow">
        <div className="mb-4 flex justify-end items-center gap-4">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Buscar usuario"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="h-8 rounded-md w-1/4"
          />
          <Button
            onClick={() => setOpenUserCreationModal(true)}
            type="primary"
            icon={<PlusOutlined />}
          >
            Crear nuevo usuario
          </Button>
        </div>
        <Table
          dataSource={filteredDataSource}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      </div>
      <UserCreationModal
        open={openUserCreationModal}
        onClose={() => setOpenUserCreationModal(false)}
      />
    </>
  );
}
