"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/images/logo.png";
import { useRouter } from "next/navigation";
import useScrollEvent from "@/hooks/useScrollEvent";

// Icons
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const NAV_LINKS = [
  { href: "#start", label: "Inicio" },
  { href: "#us", label: "Nosotros" },
  { href: "#services", label: "Servicios" },
  { href: "#team", label: "Equipo" },
  { href: "#contact", label: "Contáctanos" },
];

const NavLinks = ({
  className,
  onClick,
}: {
  className: string;
  onClick?: () => void;
}) => (
  <>
    {NAV_LINKS.map(({ href, label }) => (
      <li key={href}>
        <Link href={href} onClick={onClick} className={className}>
          {label}
        </Link>
      </li>
    ))}
  </>
);

export default function PageHeader() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScrollEvent();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const isScrolled = scrollY > 10;

  const handleLogin = () => {
    router.push("/auth");
  };

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? "bg-white/80 shadow-md backdrop-blur-sm": "bg-transparent"
  }`;

  const navLinkClasses = `font-medium transition-colors duration-300 ${
    isScrolled
      ? "text-accent-contrast hover:text-primary"
      : "text-white hover:text-gray-200"
  }`;

  // For mobile, links are always dark
  const mobileNavLinkClasses =
    "text-2xl font-semibold text-accent-contrast hover:text-primary transition-colors duration-300";

  return (
    <>
      <header className={headerClasses}>
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="CDA Moto GP Logo"
              width={45}
              height={45}
              priority
            />
            <h1
              className={`text-2xl font-bold tracking-wide transition-colors duration-300 ${
                isScrolled ? "text-accent-contrast" : "text-white"
              }`}
            >
              CDA Moto <span className="text-primary">GP</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              <NavLinks className={navLinkClasses} />
            </ul>
            <div className="flex items-center gap-4">
              <Link
                href="#quote"
                className="bg-primary text-white font-bold px-6 py-2 rounded-xl shadow-md hover:bg-primary_transparent transition-all duration-300"
              >
                Cotizar ahora
              </Link>
              <button
                onClick={handleLogin}
                className="bg-accent text-accent_contrast font-bold px-6 py-2 rounded-xl shadow-md hover:bg-gray-200 transition-all duration-300"
              >
                Ingresar
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={isScrolled ? "text-accent-contrast" : "text-white"}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <div
        className={`w-full fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-primary">Menú</h2>
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        <nav className="p-8">
          <ul className="flex flex-col items-center gap-8">
            <NavLinks
              className={mobileNavLinkClasses}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <li className="w-full pt-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push("#quote");
                }}
                className="w-full bg-primary text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all duration-300"
              >
                Cotizar ahora
              </button>
            </li>
            <li className="w-full">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogin();
                }}
                className="w-full bg-accent text-accent_contrast font-bold px-6 py-3 rounded-xl shadow-md transition-all duration-300"
              >
                Ingresar
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
