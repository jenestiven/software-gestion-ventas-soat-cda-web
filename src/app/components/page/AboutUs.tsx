import Image from "next/image";
import React from "react";
import HERO_ABOUT_US from "@/images/GP__40.webp";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function AboutUs() {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className={`w-full py-20 md:py-32 bg-gray-50/50 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto grid items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-20">
        {/* Image Column */}
        <div
          className={`relative transition-transform duration-700 ease-in-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/10 rounded-full filter blur-2xl" />
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary/10 rounded-full filter blur-2xl" />
          <Image
            src={HERO_ABOUT_US}
            alt={"CDA Moto Gp Team"}
            width="550"
            height="310"
            className="mx-auto aspect-video overflow-hidden rounded-2xl object-cover object-center sm:w-full shadow-2xl"
          />
        </div>
        {/* Text Column */}
        <div
          className={`space-y-4 transition-transform duration-700 ease-in-out delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="text-primary font-semibold tracking-wider">
            SOBRE NOSOTROS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-accent-contrast">
            Más de 10 años garantizando tu seguridad en la vía
          </h2>
          <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed">
            Somos un equipo de profesionales apasionados por la seguridad vial.
            Nuestro centro de diagnóstico automotor (CDA) cuenta con la última
            tecnología para garantizar que tu vehículo cumpla con todas las
            normas de seguridad y emisiones.
          </p>
          {/* Stats */}
          <div className="flex gap-8 pt-6">
            <div>
              <p className="text-4xl font-bold text-primary">10+</p>
              <p className="text-gray-500">Años de experiencia</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">50k+</p>
              <p className="text-gray-500">Clientes satisfechos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
