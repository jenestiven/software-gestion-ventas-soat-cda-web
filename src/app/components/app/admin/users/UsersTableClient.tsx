"use client";

import React from "react";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { Table, Button, Dropdown, Menu, Input, Space, Avatar } from "antd";

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
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters()}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text: string) => (
        <Avatar
          src={text}
          alt="thumbnail"
          style={{ width: 40, height: 40, borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Tel",
      dataIndex: "tel",
      key: "tel",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Active Status",
      dataIndex: "active",
      key: "active",
      render: (active) => (active ? "Active" : "Inactive"),
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value, record) => record.active === value,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Admin", value: "Admin" },
        { text: "Asesor", value: "Asesor" },
      ],
      onFilter: (value, record) => record.role.includes(value),
    },
    {
      title: "Action",
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
      <Menu.Item key="1">Edit</Menu.Item>
      <Menu.Item key="2">Delete</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button type="primary" icon={<PlusOutlined />}>
          Create New User
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}
