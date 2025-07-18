"use client";

import React from "react";
import {
  UserOutlined,
  HomeOutlined,
  CheckCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";

const { Title, Text } = Typography;
type Props = {};

export default function UsersCards({}: Props) {
  return (
    <>
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
    </>
  );
}
