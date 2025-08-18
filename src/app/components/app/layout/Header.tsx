"use client";

import React from "react";
import { Avatar, Button, Dropdown, Typography } from "antd";
import useStore from "@/store";
import type { MenuProps } from "antd";
import { logout } from "@/firebase/firebaseClient";
import "./header.css";
import ToggleButton from "./ToggleButton";

type Props = {
  isMenuCollapsed: boolean;
  toggleMenu: () => void;
};

export default function Header({ isMenuCollapsed, toggleMenu }: Props) {
  const user = useStore((state) => state.user);
  const { Title, Text } = Typography;

  const headerTitle = useStore((state) => state.headerTitle);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <span>
          <p>{user?.name?.toUpperCase()}</p>
          <p>{user?.email}</p>
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <Button
          className="w-full"
          type="primary"
          onClick={() => {
            logout();
            window.location.reload();
          }}
        >
          Cerrar sesión
        </Button>
      ),
    },
  ];

  return (
    <header className="layout-header">
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <ToggleButton collapsed={isMenuCollapsed} onClick={toggleMenu} />
        <div>
          <Title level={2} className="header-title">
            {headerTitle}
          </Title>
          <Text type="secondary">
            Sede -{" "}
            {user?.sales_place?.replace(/\b\w/g, (char) => char.toUpperCase()) ??
              "Moto Gp"}
          </Text>
        </div>
      </div>
      <div className="header-user">
        <Title level={5} className="header-title">
          {user?.name ?? "Usuario desconocido"}
        </Title>
        <Dropdown menu={{ items }} trigger={["click"]}>
          {user?.thumbnail ? (
            <Avatar
              size="large"
              className="header-avatar cursor-pointer"
              src={user?.thumbnail}
            />
          ) : (
            <div
              style={{
                backgroundColor: "#fefefe",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {user?.name?.charAt(0).toUpperCase() ?? "U"}
            </div>
          )}
        </Dropdown>
      </div>
    </header>
  );
}
