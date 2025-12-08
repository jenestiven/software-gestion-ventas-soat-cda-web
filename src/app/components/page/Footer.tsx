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

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-accent-contrast">
      <div className="container mx-auto py-16 px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Column 1: Sobre Nosotros */}
          <div className="text-left">
            <h4 className="font-bold text-lg mb-4 tracking-wider">
              Sobre nosotros
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Personas */}
          <div className="text-left">
            <h4 className="font-bold text-lg mb-4 tracking-wider">Personas</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#team"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Nuestro equipo de trabajo
                </Link>
              </li>
              <li>
                <a
                  href="mailto:rrhhmotogp@gmail.com"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Trabaja con nosotros
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contacto & Social */}
          <div>
            <h4 className="font-bold text-lg mb-4 tracking-wider text-left">
              Contacto
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm text-left">
              <li>Nit: 901.153.550</li>
              <li>Cra. 6 #26-3, Cali, Valle del Cauca</li>
              <li>+57 301 7719589</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-start mb-4">
              <Link href="/" className="flex items-center gap-2">
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
            </div>
            <div className="flex space-x-4 mt-6 justify-start">
              <Link
                href="https://www.facebook.com/p/CDA-GP-61552677675662/"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </Link>
              <Link
                href="https://www.instagram.com/"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} CDA Moto GP. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
