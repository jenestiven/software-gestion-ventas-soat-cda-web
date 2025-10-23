import React from "react";
import Image, { StaticImageData } from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Placeholder images for partners
import partner1 from "@/images/GP__2.webp"; // Using existing images as placeholders
import partner2 from "@/images/GP__45.webp";
import partner3 from "@/images/GP__7.webp";
import partner4 from "@/images/GP__8.webp";

const partners = [
  { src: partner1, alt: "Aliado 1" },
  { src: partner2, alt: "Aliado 2" },
  { src: partner3, alt: "Aliado 3" },
  { src: partner4, alt: "Aliado 4" },
];

const PartnerLogo: React.FC<{ src: StaticImageData; alt: string }> = ({ src, alt }) => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`flex justify-center items-center p-4 bg-gray-100 rounded-lg shadow-md ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
      <Image
        src={src}
        alt={alt}
        width={150}
        height={80}
        objectFit="contain"
      />
    </div>
  );
};

export default function Partners() {
  return (
    <section
      className={`w-full py-12 md:py-24 lg:py-32 bg-white transition-all duration-500`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 md:text-4xl/tight">
          Nuestros Aliados
        </h2>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-center justify-center">
          {partners.map((partner, index) => (
            <PartnerLogo key={index} src={partner.src} alt={partner.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}
