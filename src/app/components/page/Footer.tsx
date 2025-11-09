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

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.003.137.003.275.003.413 0 4.234-3.235 9.109-9.109 9.109-1.809 0-3.49-.53-4.913-1.442.25.03.506.045.764.045 1.5 0 2.886-.51 3.98-1.37-.011-.003-.022-.007-.033-.01-1.4-.025-2.58-1.2-3.003-2.8.195.038.396.058.603.058.29 0 .57-.04.83-.11-1.46-.295-2.55-1.58-2.55-3.16v-.04c.41.226.88.363 1.37.38-.86-.58-1.42-1.57-1.42-2.71 0-.59.16-1.14.43-1.62 1.58 1.94 3.94 3.21 6.58 3.34-.05-.23-.08-.46-.08-.7 0-1.69 1.37-3.06 3.06-3.06.88 0 1.67.37 2.23.97.7-.14 1.36-.39 1.94-.74-.23.71-.71 1.31-1.34 1.69.62-.07 1.21-.24 1.75-.48-.41.62-.93 1.17-1.54 1.63z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 7c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm0-2c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm6 2h-1.5c-.276 0-.5.224-.5.5v1.5c0 .276.224.5.5.5h1.5c.276 0 .5-.224.5-.5v-1.5c0-.276-.224-.5-.5-.5z" />
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
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="#"
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
              href="#"
              className="text-gray-500 hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <TwitterIcon />
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
