import React from "react";
import { Carousel } from "antd";
import Image from "next/image";
import HERO_TWO from "@/images/GP__45.webp";
import HERO_THREE from "@/images/GP__2.webp";
import HERO_FOUR from "@/images/GP__8.webp";
import HERO_FIVE from "@/images/GP__7.webp";

export default function PageCarousel() {
  return (
    <section className="w-full mx-auto relative">
      <Carousel arrows autoplay={{ dotDuration: true }} autoplaySpeed={4000}>
        <div className="h-96 md:h-[75vh] relative flex justify-center items-center">
          <div className="z-10 text-2xl absolute w-full text-white p-4 h-full shadow-md bg-black bg-opacity-50 text-center">
            <h2 className="text-4xl lg:text-6xl font-bold mt-28 lg:mt-24">
              Confianza y seguridad <br />
              para tu vehículo
            </h2>
            <h4 className="text-wrap text-lg lg:text-2xl">
              Atención rápida y amable desde <br /> el primer momento
            </h4>
            <button className="bg-primary mt-4 hover:bg-color_mix_primary text-white font-bold py-2 px-4 rounded-lg">
              Cotizar ahora
            </button>
          </div>
          <Image
            src={HERO_TWO.src}
            alt="CDA Moto Gp Team"
            width={1920}
            height={1080}
            className="w-full h-full object-cover absolute"
            priority={true}
          />
        </div>
        <div className="h-96 md:h-[75vh] relative">
          <div className="z-10 text-2xl absolute w-full text-white p-4 h-full shadow-md bg-black bg-opacity-50 text-center">
            <h2 className="text-4xl lg:text-6xl font-bold mt-32 lg:mt-52">
              Revisión técnico-mecánica
            </h2>
            <h4 className="text-wrap text-lg lg:text-2xl">
              Equipos de última tecnología y personal capacitado <br /> para
              garantizar la seguridad de tu vehículo
            </h4>
            <button className="bg-primary mt-4 hover:bg-color_mix_primary text-white font-bold py-2 px-4 rounded-lg">
              Cotizar ahora
            </button>
          </div>
          <Image
            src={HERO_THREE.src}
            alt="CDA Moto Gp Team"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-96 md:h-[75vh] relative">
          <div className="z-10 text-2xl absolute w-full text-white p-4 h-full shadow-md bg-black bg-opacity-50 text-center">
            <h2 className="text-4xl lg:text-6xl font-bold mt-24 lg:mt-52">
              Inspección precisa y responsable
            </h2>
            <h4 className="text-wrap text-lg lg:text-2xl">
              Garantizamos que tu vehículo cumpla con los estándares <br /> de
              seguridad y emisiones establecidos por la ley.
            </h4>
            <button className="bg-primary mt-4 hover:bg-color_mix_primary text-white font-bold py-2 px-4 rounded-lg">
              Cotizar ahora
            </button>
          </div>
          <Image
            src={HERO_FOUR.src}
            alt="CDA Moto Gp Team"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-96 md:h-[75vh] relative">
          <div className="z-10 text-2xl absolute w-full text-white p-4 h-full shadow-md bg-black bg-opacity-50 text-center">
            <h2 className="text-4xl lg:text-6xl font-bold mt-32 lg:mt-52">
              Revisión a fondo
            </h2>
            <h4 className="text-wrap text-lg lg:text-2xl">
              Queremos tu seguridad en carretera
            </h4>
            <button className="bg-primary mt-4 hover:bg-color_mix_primary text-white font-bold py-2 px-4 rounded-lg">
              Cotizar ahora
            </button>
          </div>
          <Image
            src={HERO_FIVE.src}
            alt="CDA Moto Gp Team"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        </div>
      </Carousel>
    </section>
  );
}
