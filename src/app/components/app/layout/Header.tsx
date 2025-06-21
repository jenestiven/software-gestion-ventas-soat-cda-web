"use client";
import React from "react";
import "./header.css";
import { Avatar, Typography } from "antd";
import useStore from "@/store";

type Props = {};

export default function Header({}: Props) {
  const user = useStore((state) => state.user);
  const { Title } = Typography;

  return (
    <header className="layout-header">
      <Title level={5} className="header-title">
        {/* {user?.place ?? "Punto desconocido"} */}
        Punto vial
      </Title>
      <div className="header-user">
        <Title level={5} className="header-title">
          {user?.name ?? "Usuario desconocido"}
        </Title>
        <Avatar
          className="header-avatar"
          src="https://api.dicebear.com/7.x/miniavs/svg?seed=6"
        />
      </div>
    </header>
  );
}
