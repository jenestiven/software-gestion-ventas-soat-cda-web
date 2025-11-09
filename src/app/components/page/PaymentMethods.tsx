import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ONE from "@/images/payment-methods/addi.png";
import THREE from "@/images/payment-methods/sistecredito.png";
import FOUR from "@/images/payment-methods/brilla.png";
import FIVE from "@/images/payment-methods/visa.png";
import SIX from "@/images/payment-methods/mastercard.png";
import SEVEN from "@/images/payment-methods/efectivo.png";

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
      className={`w-full md:py-12 transition-all duration-500`}
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
          className="py-6 w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
        >
          <ul
            className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
            style={{ animationPlayState: isVisible ? "running" : "paused" }}
          >
            {methods.map((src, index) => (
              <li key={index}>
                <Image
                  src={src}
                  alt={`Método de pago ${index + 1}`}
                  width={150}
                  height={100}
                  className="object-contain h-32 w-auto"
                />
              </li>
            ))}
          </ul>
          <ul
            className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
            aria-hidden="true"
            style={{ animationPlayState: isVisible ? "running" : "paused" }}
          >
            {methods.map((src, index) => (
              <li key={index}>
                <Image
                  src={src}
                  alt={`Método de pago ${index + 1}`}
                  width={150}
                  height={100}
                  className="object-contain h-32 w-auto"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
