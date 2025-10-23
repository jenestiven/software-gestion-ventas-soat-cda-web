import React from "react";
import Link from "next/link";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from "@ant-design/icons";

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-gray-800 text-white">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-4">
        <div className="flex space-x-4">
          <Link href="#" className="text-gray-400 hover:text-white">
            <FacebookOutlined className="text-2xl" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white">
            <TwitterOutlined className="text-2xl" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white">
            <InstagramOutlined className="text-2xl" />
          </Link>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          <Link href="#" className="text-gray-400 hover:text-white">
            Inicio
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white">
            Nosotros
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white">
            Servicios
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white">
            Contáctanos
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white">
            Política de Privacidad
          </Link>
        </nav>
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} CDA Moto GP. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
