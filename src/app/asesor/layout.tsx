"use client";

import React, { useEffect, useState } from "react";
import NavBar from "@/app/components/app/layout/NavBar";
import Header from "@/app/components/app/layout/Header";
import "@/app/app-layout.css";
import { useSessionValidator } from "@/hooks/useSesionValidator";
import useStore from "@/store";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { initializeUser } = useStore();
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  useEffect(() => {
    initializeUser();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useSessionValidator();

  const toggleMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  return (
    <div className="admin-layout-container">
      <div className={`admin-layout ${isMenuCollapsed ? "collapsed" : ""}`}>
        <Header isMenuCollapsed={isMenuCollapsed} toggleMenu={toggleMenu} />
        <NavBar isMenuCollapsed={isMenuCollapsed} />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
