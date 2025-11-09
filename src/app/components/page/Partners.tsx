import React from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Placeholder images for partners
import partner1 from "@/images/law/Onac.png"; // Using existing images as placeholders
import partner2 from "@/images/law/mintransporte-logo.jpg";
import partner3 from "@/images/law/runt-logo-1.jpg";
import partner4 from "@/images/law/simit-logo-1.jpg";
import partner5 from "@/images/law/supertransporte.png";

const partners = [
  { src: partner1, alt: "Aliado 1" },
  { src: partner2, alt: "Aliado 2" },
  { src: partner3, alt: "Aliado 3" },
  { src: partner4, alt: "Aliado 4" },
  { src: partner5, alt: "Aliado 5" },
];

export default function Partners() {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      className={`w-full py-12 md:py-24 lg:py-6 transition-all duration-500`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={ref}
          className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
        >
          <ul
            className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
            style={{ animationPlayState: isVisible ? "running" : "paused" }}
          >
            {partners.map((partner, index) => (
              <li key={index}>
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={150}
                  height={80}
                  className="object-contain h-20 w-auto"
                />
              </li>
            ))}
          </ul>
          <ul
            className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
            aria-hidden="true"
            style={{ animationPlayState: isVisible ? "running" : "paused" }}
          >
            {partners.map((partner, index) => (
              <li key={index}>
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={150}
                  height={80}
                  className="object-contain h-20 w-auto"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
