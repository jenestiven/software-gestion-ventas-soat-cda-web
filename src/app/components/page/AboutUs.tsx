import Image from "next/image";
import React from "react";
import HERO_ABOUT_US from "@/images/GP__40.webp";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Props = {};

export default function AboutUs({}: Props) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`w-full py-12 md:py-24 lg:py-32 bg-white ${isVisible ? "animate-fade-in-up" : ""} transition-all duration-500`}
    >
      <div className="container mx-auto grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Sobre Nosotros
          </h2>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Somos un equipo de profesionales apasionados por la seguridad vial.
            Nuestro centro de diagnóstico automotor (CDA) cuenta con la última
            tecnología para garantizar que tu vehículo cumpla con todas las
            normas de seguridad y emisiones.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src={HERO_ABOUT_US}
            alt={"CDA Moto Gp Team"}
            width="550"
            height="310"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          />
        </div>
      </div>
    </section>
  );
}
