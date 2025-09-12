"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/images/logo.png";
import { useRouter } from "next/navigation";
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";
import { Button, Drawer } from "antd";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contactanos", label: "Contactanos" },
];

const anchor =
  "text-lg font-medium text-black hover:text-primary hover:font-bold transition-colors duration-200";
const anchorMobile =
  "text-lg font-medium text-secondary transition-colors duration-200";

type Props = {};

function NavLinks({
  className,
  onClick,
}: {
  className: string;
  onClick?: () => void;
}) {
  return (
    <>
      {NAV_LINKS.map(({ href, label }) => (
        <Link key={href} className={className} href={href} onClick={onClick}>
          {label}
        </Link>
      ))}
    </>
  );
}

export default function PageHeader({}: Props) {
  const router = useRouter();
  const [openMobileMenu, setOpenMobileMenu] = React.useState(false);

  const handleLogin = () => {
    router.push("/auth");
  };

  return (
    <header className="flex items-center justify-between px-12 py-2 shadow-xl rounded-b-lg bg-gradient-to-b from-white to-gray-100 absolute top-0 z-50 w-full max-w-[1920px]">
      <div className="flex items-center">
        <Image src={logo} alt="Astro Logo" width={45} height={45} priority />
        <h1 className="hidden md:block text-3xl font-bold text-black tracking-wide ml-4">
          CDA Moto <span className="inline text-primary font-extrabold">GP</span>
        </h1>
      </div>
      <Button
        onClick={() => setOpenMobileMenu(true)}
        icon={<MenuOutlined />}
        className="bg-primary px-2 py-1 rounded-md text-white lg:hidden"
      />
      <div className="hidden lg:flex items-center gap-12">
        <nav>
          <ul className="flex gap-8">
            <NavLinks className={anchor} />
          </ul>
        </nav>
      </div>
      <div className="hidden lg:flex items-center gap-4">
      <button
        onClick={() => {}}
        className="hidden lg:block bg-primary text-white font-bold px-6 py-2 rounded-xl shadow transition-colors duration-200 cursor-pointer"
      >
        Cotizar ahora
      </button>
      <button
        onClick={handleLogin}
        className="hidden lg:block bg-accent text-accent_contrast font-bold px-6 py-2 rounded-xl shadow transition-colors duration-200 cursor-pointer"
      >
        Ingresar
      </button>  
      </div>
      <Drawer
        onClose={() => setOpenMobileMenu(false)}
        open={openMobileMenu}
        placement="top"
      >
        <div className="flex flex-col items-start gap-6 p-4">
          <nav>
            <ul className="flex flex-col gap-4 text-black w-full">
              <NavLinks
                className={anchorMobile}
                onClick={() => setOpenMobileMenu(false)}
              />
            </ul>
          </nav>
          <button
            onClick={() => {
              setOpenMobileMenu(false);
              handleLogin();
            }}
            className="bg-accent text-accent_contrast font-bold px-6 py-2 rounded-lg shadow transition-colors duration-200 cursor-pointer w-full"
          >
            Ingresar
          </button>
        </div>
      </Drawer>
    </header>
  );
}
