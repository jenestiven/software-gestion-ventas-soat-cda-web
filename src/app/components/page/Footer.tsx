import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/images/logo.png";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-accent-contrast text-white">
      <div className="container mx-auto py-16 px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Column 1: Logo & About */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src={logo}
                alt="CDA Moto GP Logo"
                width={40}
                height={40}
                priority
              />
              <span className="text-xl text-black font-bold">
                CDA Moto <span className="text-primary">GP</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-xs">
              Garantizando tu seguridad en cada kilómetro con tecnología de
              punta y un servicio excepcional.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-bold text-lg mb-4 tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#start"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="#us"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="#team"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Equipo
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Contáctanos
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="font-bold text-lg mb-4 tracking-wider">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Términos de Servicio
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4 tracking-wider">Contacto</h4>
            <ul className="space-y-3 text-gray-400">
              <li>Cra. 6 #26-3, Cali, Valle del Cauca</li>
              <li>+57 301 7719589</li>
              <li>info@cdamotogp.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CDA Moto GP. Todos los derechos
            reservados.
          </p>
          <div className="flex space-x-5">
            <Link
              href="https://www.facebook.com/p/CDA-GP-61552677675662/"
              className="text-gray-500 hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
