"use client";

import React from "react";
import {
  UserOutlined,
  HomeOutlined,
  CheckCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Card, Statistic, Typography } from "antd";
import UsersTableClient from "@/app/components/app/admin/users/UsersTableClient";
import PlacesTableClient from "@/app/components/app/admin/users/PlacesTableClient";
import "@/app/admin/page.css";

const { Title, Text } = Typography;

export default function UsersPage() {
  return (
    <div className="grid grid-cols-4 gap-5 px-2 py-5 h-full overflow-y-auto scroll-bar">
      <article className="admin-stat-card">
        <span className="flex items-center justify-between w-full">
          <UserOutlined className="icon utility" />
          <Title level={2}>10</Title>
        </span>
        <span className="flex items-center justify-between w-full">
          <Text type="secondary">Usuarios administradores</Text>
        </span>
      </article>

      <article className="admin-stat-card">
        <span className="flex items-center justify-between w-full">
          <TeamOutlined className="icon sell" />
          <Title level={2}>50</Title>
        </span>
        <span className="flex items-center justify-between w-full">
          <Text type="secondary">Usuarios asesores</Text>
        </span>
      </article>

      <article className="admin-stat-card">
        <span className="flex items-center justify-between w-full">
          <HomeOutlined className="icon comision" />
          <Title level={2}>5</Title>
        </span>
        <span className="flex items-center justify-between w-full">
          <Text type="secondary">No. de sedes</Text>
        </span>
      </article>

      <article className="admin-stat-card">
        <span className="flex items-center justify-between w-full">
          <CheckCircleOutlined className="icon earning" />
          <Title level={2}>60</Title>
        </span>
        <span className="flex items-center justify-between w-full">
          <Text type="secondary">Usuarios activos</Text>
        </span>
      </article>

      <div style={{ gridColumn: "span 4" }}>
        <UsersTableClient />
      </div>
      <div style={{ gridColumn: "span 4" }}>
        <PlacesTableClient />
      </div>
    </div>
  );
}
