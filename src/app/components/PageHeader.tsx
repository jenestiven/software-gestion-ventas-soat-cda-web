"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/images/logo.png";
import { useRouter } from "next/navigation";

const anchor =
  "text-lg font-medium text-accent hover:text-secondary transition-colors duration-200";

type Props = {};

export default function PageHeader({}: Props) {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/app");
  };

  return (
    <header className="flex items-center justify-between px-12 py-2 shadow-lg bg-primary_transparent absolute top-0 z-50 w-full">
      <div className="flex items-center">
        <Image src={logo} alt="Astro Logo" width={45} height={45} priority />
        <h1 className="text-3xl font-bold text-accent tracking-wide ml-4">
          CDA Moto GP
        </h1>
      </div>
      <div className="hidden lg:flex items-center gap-12">
        <nav>
          <ul className="flex gap-8">
            <Link className={anchor} href="/">
              Inicio
            </Link>
            <Link className={anchor} href="/nosotros">
              Nosotros
            </Link>
            <Link className={anchor} href="/servicios">
              Servicios
            </Link>
            <Link className={anchor} href="/contactanos">
              Contactanos
            </Link>
          </ul>
        </nav>
        <button
          onClick={() => handleLogin()}
          className="bg-accent text-accent_contrast font-bold px-6 py-2 rounded-lg shadow transition-colors duration-200 cursor-pointer"
        >
          Ingresar
        </button>
      </div>
    </header>
  );
}
