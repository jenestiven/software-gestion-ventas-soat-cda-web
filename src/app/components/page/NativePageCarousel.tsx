"use client";
import React, { useState, useEffect, useCallback } from "react";
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
        Atención rápida y amable desde <br /> el primer momento.
      </>
    ),
  },
  {
    image: HERO_THREE,
    alt: "CDA Moto Gp Team",
    title: "Revisión técnico-mecánica de primera",
    subtitle: (
      <>
        Equipos de última tecnología y personal capacitado para garantizar tu
        seguridad.
      </>
    ),
  },
  {
    image: HERO_FOUR,
    alt: "CDA Moto Gp Team",
    title: "Inspección precisa y responsable",
    subtitle: (
      <>
        Nos aseguramos que tu vehículo cumpla con todos los estándares de
        seguridad.
      </>
    ),
  },
  {
    image: HERO_FIVE,
    alt: "CDA Moto Gp Team",
    title: "Tu seguridad es nuestra prioridad",
    subtitle: "Conduce con la tranquilidad de estar en las mejores manos.",
  },
];

const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>
);


export default function NativePageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); // Increased interval for a better user experience
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <section id="inicio" className="w-full h-[90vh] md:h-screen relative overflow-hidden">
      {/* Slides */}
      {slidesData.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={slide.priority}
            quality={100}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 container mx-auto px-4 md:px-6 flex flex-col items-start justify-center text-white">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold !leading-tight">
                {slide.title}
              </h2>
              <p className="mt-4 text-lg md:text-xl text-gray-200">
                {slide.subtitle}
              </p>
              <button className="mt-8 bg-primary text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-primary_transparent transition-all duration-300">
                Cotizar ahora
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-2 rounded-full z-20 transition-all duration-300 hover:bg-white/20"
        aria-label="Previous Slide"
      >
        <ChevronLeftIcon className="w-8 h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-2 rounded-full z-20 transition-all duration-300 hover:bg-white/20"
        aria-label="Next Slide"
      >
        <ChevronRightIcon className="w-8 h-8" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
