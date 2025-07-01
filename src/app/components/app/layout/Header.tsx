"use client";
import React from "react";
import "./header.css";
import { Avatar, Typography } from "antd";
import useStore from "@/store";

type Props = {};

export default function Header({}: Props) {
  const user = useStore((state) => state.user);
  
  const { Title, Text } = Typography;

  return (
    <header className="layout-header">
      <div>
        <Title level={2} className="header-title">
          Modulo de ventas SOAT
        </Title>
        <Text type="secondary">Sede - Punto vial</Text>
      </div>
      <div className="header-user">
        <Title level={5} className="header-title">
          {user?.name ?? "Usuario desconocido"}
        </Title>
        <Avatar
          size="large"
          className="header-avatar"
          src="https://api.dicebear.com/7.x/miniavs/svg?seed=6"
        />
      </div>
    </header>
  );
}
