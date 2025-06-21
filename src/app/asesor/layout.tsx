import React from "react";
import NavBar from "@/app/components/app/layout/NavBar";
import Header from "@/app/components/app/layout/Header";
import "@/app/app-layout.css";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
