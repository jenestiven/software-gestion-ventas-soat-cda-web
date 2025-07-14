"use client";
import React, { useEffect, useState } from "react";
import { Tooltip, Typography } from "antd";
import Link from "next/link";
import useStore from "@/store";
import { adminNavRoutes, asesorNavRoutes } from "@/utils/nav-routes";
import Image from "next/image";
import LOGO from "@/images/logo.png";
import "./nav.css";

type Props = {};

const keyPathName = "selectedPath";

export default function NavBar({}: Props) {
  const { Text } = Typography;
  const user = useStore((state) => state.user);
  const { setTitle } = useStore();

  const appRoutes =
    user && user.role === "admin" ? adminNavRoutes : asesorNavRoutes;

  useEffect(() => {
    if (user && user.role === "admin") {
      setTitle("Tablero de control");
      setSelectedPath("admin");
    } else {
      setTitle("Modulo de ventas SOAT");
      setSelectedPath("asesor");
    }
  }, [user]); //eslint-disable-line react-hooks/exhaustive-deps

  const [selectedPath, setSelectedPath] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSelectedPath(localStorage.getItem(keyPathName) || "");
    }
  }, []);

  const handleSelect = (path: string) => {
    setSelectedPath(path);
  };

  return (
    <nav className="layout-nav">
      <Link href="/" className="nav-logo">
        <Image
          width={40}
          src={LOGO}
          alt="CDA Moto GP Logo"
          className="nav-logo-image"
        />
        <Text strong>CDA Moto GP</Text>
      </Link>
      <ul className="nav-list">
        {appRoutes?.map((route, index) => {
          const { path, handle } = route;

          if (!handle) {
            return null;
          }

          const { title, navIcon: NavIcon } = handle;
          const isSelected = selectedPath === path;

          return (
            <li key={index}>
              <Tooltip title={title ?? ""} placement="right">
                <Link
                  href={`/${path}`}
                  className={`nav-list-item ${
                    isSelected ? "selected" : ""
                  } transition-colors`}
                  onClick={() => {
                    handleSelect(path);
                    setTitle(title || "Ventas SOAT");
                  }}
                >
                  {NavIcon && <NavIcon className="item-icon" />}
                  <p className="font-light text-sm">{title}</p>
                </Link>
              </Tooltip>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
