import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ONE from "@/images/addi.png";
import THREE from "@/images/sistecredito.png";
import FOUR from "@/images/brilla.png";
import FIVE from "@/images/VISA-Logo.png";
import SIX from "@/images/mastercard.jpg";
import SEVEN from "@/images/efectivo.jpg";

import Image from "next/image";

export default function PaymentMethods() {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  const methods = [
    ONE.src,
    THREE.src,
    FOUR.src,
    FIVE.src,
    SIX.src,
    SEVEN.src,
  ];

  return (
    <section
      className={`w-full md:py-12 lg:py-32 transition-all duration-500`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center md:text-4xl/tight">
          Métodos de Pago
        </h2>

        <h4 className="text-xl tracking-tighter text-center md:text-2xl/tight">
          Aceptamos múltiples métodos de pago para tu comodidad y seguridad.
        </h4>

        {/* Slider */}
        <div
          ref={ref}
          className="relative overflow-hidden"
          aria-label="Carrusel de métodos de pago"
          role="region"
        >
          {/* contenido del carrusel */}
          <div
            className="flex items-center"
            style={{
              // usa la animación definida más abajo; pausa si no está visible
              animation: isVisible ? "scroll 20s linear infinite" : "none",
            }}
          >
            {
              // duplicamos los elementos para que el carrusel sea continuo
              [...methods, ...methods].map((src, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-4 py-6 w-40 md:w-48 lg:w-56"
          >
            <div className="p-4 flex items-center justify-center">
              <Image
                src={src}
                alt={`Método de pago ${(index % methods.length) + 1}`}
                width={300}
                height={200}
                className="object-contain"
              />
            </div>
          </div>
              ))
            }
          </div>

          {/* overlays difuminados a izquierda y derecha para ilusión de opacidad */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-24 z-20"
          >
            <div className="h-full w-full bg-gradient-to-r from-white to-transparent" />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-24 z-20"
          >
            <div className="h-full w-full bg-gradient-to-l from-white to-transparent" />
          </div>
        </div>
      </div>

      {/* Animación del slider (se desplaza de izquierda a derecha continuamente) */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        /* Ajuste opcional: suaviza la animación en dispositivos pequeños */
        @media (max-width: 640px) {
          div[role="region"] > div {
            animation-duration: 24s;
          }
        }
      `}</style>
    </section>
  );
}
