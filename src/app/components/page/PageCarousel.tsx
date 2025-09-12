import React from "react";
import { Carousel } from "antd";
import Image, { StaticImageData } from "next/image";
import HERO_TWO from "@/images/GP__45.webp";
import HERO_THREE from "@/images/GP__2.webp";
import HERO_FOUR from "@/images/GP__8.webp";
import HERO_FIVE from "@/images/GP__7.webp";

interface SlideData {
  image: StaticImageData;
  alt: string;
  priority?: boolean;
  title: React.ReactNode;
  subtitle: React.ReactNode;
}

const slidesData: SlideData[] = [
  {
    image: HERO_TWO,
    alt: "CDA Moto Gp Team",
    priority: true,
    title: (
      <>
        Confianza y seguridad <br />
        para tu vehículo
      </>
    ),
    subtitle: (
      <>
        Atención rápida y amable desde <br /> el primer momento
      </>
    ),
  },
  {
    image: HERO_THREE,
    alt: "CDA Moto Gp Team",
    title: "Revisión técnico-mecánica",
    subtitle: (
      <>
        Equipos de última tecnología y personal capacitado <br /> para
        garantizar la seguridad de tu vehículo
      </>
    ),
  },
  {
    image: HERO_FOUR,
    alt: "CDA Moto Gp Team",
    title: "Inspección precisa y responsable",
    subtitle: (
      <>
        Garantizamos que tu vehículo cumpla con los estándares <br /> de
        seguridad y emisiones establecidos por la ley.
      </>
    ),
  },
  {
    image: HERO_FIVE,
    alt: "CDA Moto Gp Team",
    title: "Revisión a fondo",
    subtitle: "Queremos tu seguridad en carretera",
  },
];

const CarouselSlide: React.FC<{ slide: SlideData }> = ({ slide }) => (
  <div className="h-96 md:h-[75vh] relative">
    <div className="z-10 text-2xl absolute w-full text-white p-4 h-full shadow-md bg-black bg-opacity-50 text-center flex flex-col justify-center items-center">
      <h2 className="text-4xl lg:text-6xl font-bold mt-12 lg:mt-0">
        {slide.title}
      </h2>
      <h4 className="text-wrap text-lg lg:text-2xl mt-4">{slide.subtitle}</h4>
      <button className="bg-primary mt-4 hover:bg-color_mix_primary text-white font-bold py-2 px-4 rounded-lg">
        Cotizar ahora
      </button>
    </div>
    <Image
      src={slide.image}
      alt={slide.alt}
      fill
      className="object-cover"
      priority={slide.priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  </div>
);

export default function PageCarousel() {
  return (
    <section className="w-full mx-auto relative">
      <Carousel arrows autoplay autoplaySpeed={4000}>
        {slidesData.map((slide, index) => (
          <CarouselSlide key={index} slide={slide} />
        ))}
      </Carousel>
    </section>
  );
}
