"use client";
import React from "react";
import { Tooltip, Typography } from "antd";
import Link from "next/link";
import useStore from "@/store";
import { adminNavRoutes, asesorNavRoutes } from "@/utils/nav-routes";
import Image from "next/image";
import LOGO from "@/images/logo.png";
import "./nav.css";

type Props = {};

//const keyPathName = "selectedPath";

export default function NavBar({}: Props) {
  // Use a selector for zustand store
  const { Text } = Typography;
  const user = useStore((state) => state.user);
  const appRoutes =
    user && user.role === "admin" ? adminNavRoutes : asesorNavRoutes;

  return (
    <nav className="layout-nav">
      <Link href="/" className="nav-logo">
        <Image
          width={30}
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
          // // Determine if this route is selected
          // const isSelected =
          //   typeof window !== "undefined" &&
          //   localStorage.getItem(keyPathName) === path
          //     ? " selected"
          //     : "";

          return (
            <li key={index}>
              <Tooltip title={title ?? ""} placement="right">
                <Link
                  href={`/${path}`}
                  className={`nav-list-item selected`}
                  // onClick={() => {
                  //   localStorage.setItem(keyPathName, path);
                  // }}
                >
                  {NavIcon && <NavIcon className="item-icon" />}
                  <Text className="item-title">{title}</Text>
                </Link>
              </Tooltip>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
