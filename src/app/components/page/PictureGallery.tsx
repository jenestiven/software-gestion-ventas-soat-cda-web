import React from "react";
import ONE from "@/images/GP__1.webp"
import THREE from "@/images/GP__15.webp"
import FOUR from "@/images/GP__27.webp"
import FIVE from "@/images/GP__9.webp"
import SIX from "@/images/GP__5.webp"
import SEVEN from "@/images/GP__23.webp"
import EIGHT from "@/images/GP__24.webp"
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";

interface PictureGalleryProps {
  title?: string;
  subtitle?: string;
}

const PictureGallery: React.FC<PictureGalleryProps> = ({
  title = "Nuestras Instalaciones",
  subtitle = "Visita nuestras modernas instalaciones. Contamos con equipos certificados y personal calificado para ofrecerte un servicio seguro, confiable y orientado a la satisfacción del cliente.",
}) => {
  const [ref, isVisible] = useScrollAnimation<HTMLImageElement>();
  
  const images = [
    ONE.src,
    THREE.src,
    FIVE.src,
    SIX.src,
    EIGHT.src,
    FOUR.src,
    SEVEN.src,
  ];

  return (
    <section className="py-32 bg-accent w-11/12 my-20 rounded-3xl">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">{subtitle}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((src, index) => (
            <div
              key={index}
              className={`overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition duration-300 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            >
              <Image
                ref={ref}
                src={src}
                width={300}
                height={200}
                alt={`Instalaciones CDA Moto Gp ${index + 1}`}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PictureGallery;
