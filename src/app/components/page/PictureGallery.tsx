import React from "react";
import ONE from "@/images/GP__1.webp";
import THREE from "@/images/GP__15.webp";
import FOUR from "@/images/GP__27.webp";
import FIVE from "@/images/GP__9.webp";
import SIX from "@/images/GP__5.webp";
import SEVEN from "@/images/GP__23.webp";
import EIGHT from "@/images/GP__24.webp";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";

const images = [ONE, THREE, FIVE, SIX, EIGHT, FOUR, SEVEN];

const galleryItems = [
  { src: images[0], class: "md:col-span-2 md:row-span-2" },
  { src: images[1], class: "" },
  { src: images[2], class: "" },
  { src: images[3], class: "md:col-span-2" },
  { src: images[4], class: "" },
  { src: images[5], class: "" },
  { src: images[6], class: "md:col-span-2" },
];

export default function PictureGallery() {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-accent-contrast mb-3">
          Nuestras Instalaciones
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Visita nuestras modernas instalaciones, las cuales fueron realizadas pensando en tu bienestar y comodidad durante tu tiempo de permanencia, contamos con cafetería, maquinas para tu entretenimiento, sillas cómodas y además puedes venir con tu mascota.
        </p>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4"
        >
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className={`overflow-hidden rounded-2xl group shadow-lg
                transition-all duration-500 ease-in-out ${item.class} ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Image
                src={item.src}
                alt={`Instalaciones CDA Moto Gp ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                width={600}
                height={600}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
