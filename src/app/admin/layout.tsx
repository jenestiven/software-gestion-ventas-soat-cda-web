"use client";

import React, { useEffect } from "react";
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

  useEffect(() => {
    initializeUser();
  }, []);

  useSessionValidator();

  return (
    <div className="admin-layout-container">
      <div className="admin-layout">
        <Header />
        <NavBar />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
