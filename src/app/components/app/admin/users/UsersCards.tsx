"use client";

import React from "react";
import {
  UserOutlined,
  HomeOutlined,
  CheckCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import "@/app/admin/page.css";

const { Title, Text } = Typography;

interface UserStats {
  activeUsers: number;
  adminUsers: number;
  asesorUsers: number;
  salesPlacesCount: number;
}

type Props = {
  stats: UserStats;
};

export default function UsersCards({ stats }: Props) {
  return (
    <>
      <article className="admin-stat-card">
        <span className="flex items-center justify-between w-full">
          <UserOutlined className="icon utility" />
          <Title level={2}>{stats.adminUsers}</Title>
        </span>
        <span className="flex items-center justify-between w-full">
          <Text type="secondary">Usuarios administradores</Text>
        </span>
      </article>

      <article className="admin-stat-card">
        <span className="flex items-center justify-between w-full">
          <TeamOutlined className="icon sell" />
          <Title level={2}>{stats.asesorUsers}</Title>
        </span>
        <span className="flex items-center justify-between w-full">
          <Text type="secondary">Usuarios asesores</Text>
        </span>
      </article>

      <article className="admin-stat-card">
        <span className="flex items-center justify-between w-full">
          <HomeOutlined className="icon comision" />
          <Title level={2}>{stats.salesPlacesCount}</Title>
        </span>
        <span className="flex items-center justify-between w-full">
          <Text type="secondary">No. de sedes</Text>
        </span>
      </article>

      <article className="admin-stat-card">
        <span className="flex items-center justify-between w-full">
          <CheckCircleOutlined className="icon earning" />
          <Title level={2}>{stats.activeUsers}</Title>
        </span>
        <span className="flex items-center justify-between w-full">
          <Text type="secondary">Usuarios activos</Text>
        </span>
      </article>
    </>
  );
}
