"use client";

import React, { useEffect, useState } from "react";
import NavBar from "@/app/components/app/layout/NavBar";
import Header from "@/app/components/app/layout/Header";
import "@/app/app-layout.css";
import { useSessionValidator } from "@/hooks/useSesionValidator";
import useStore from "@/store";
import { useRouter, usePathname } from "next/navigation";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { initializeUser, user } = useStore();
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    initializeUser();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useSessionValidator();

  useEffect(() => {
    if (user === null) {
      return;
    }

    if (user.role === "admin") {
      router.push("/admin");
    } else if (user.role !== "asesor") {
      router.push("/auth");
    }
  }, [user, router]);

  if (user === null || user.role !== "asesor") {
    return null; // Prevent rendering if user data is not loaded or role is incorrect
  }

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
