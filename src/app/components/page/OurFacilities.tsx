import React from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Import images from public/images
import facility1 from "@/images/GP__2.webp";
import facility2 from "@/images/GP__45.webp";
import facility3 from "@/images/GP__7.webp";
import facility4 from "@/images/GP__8.webp";

const facilityImages = [
  { src: facility1, alt: "Instalación 1" },
  { src: facility2, alt: "Instalación 2" },
  { src: facility3, alt: "Instalación 3" },
  { src: facility4, alt: "Instalación 4" },
];

export default function OurFacilities() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`w-full py-12 md:py-24 lg:py-32 bg-white ${isVisible ? "animate-fade-in-up" : ""} transition-all duration-500`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 md:text-4xl/tight">
          Nuestras Instalaciones
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {facilityImages.map((img, index) => (
            <div key={index} className="relative w-full h-60 rounded-lg overflow-hidden shadow-md">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
