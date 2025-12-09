"use client";

import { useState, useRef, useEffect } from "react";
import "dayjs/locale/es";
import Image from "next/image";

const SoatQuoter = () => {
  return (
    <div
      id="quote"
      className="relative h-[500px] w-full max-w-[450px] md:h-[600px] md:w-[900px] md:max-w-none rounded-3xl shadow-xl overflow-hidden"
    >
      <Image
        src="/images/GP__20.webp"
        alt="SOAT"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      {/* Overlay for text content */}
      <div className="absolute bottom-0 left-0 w-full md:w-2/3 lg:w-1/2 bg-white p-6 md:p-8 rounded-tr-3xl z-20">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-left">
          Cotiza tu SOAT
        </h3>
        <p className="text-gray-700 mb-6 text-left">
          Obtén el precio de tu SOAT en segundos y cómpralo en línea de forma
          fácil y segura.
        </p>
        <button
          onClick={() => {
            const phoneNumber = "573228318136";
            const message = "Hola, me gustaría cotizar el SOAT para mi vehículo.";
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
              message
            )}`;
            window.open(whatsappUrl, "_blank");
          }}
          className="bg-primary text-white font-bold py-3 px-8 rounded-xl text-lg hover:bg-[#8a0b0f] transition-colors duration-300"
        >
          Cotizar ahora
        </button>
      </div>
    </div>
  );
};

const AppointmentScheduler = () => {
  return (
    <div className="relative h-[500px] w-full max-w-[450px] md:h-[600px] md:w-[900px] md:max-w-none rounded-3xl shadow-xl overflow-hidden">
      <Image
        src="/images/GP__6.webp"
        alt="Agenda tu cita"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      {/* Overlay for text content */}
      <div className="absolute bottom-0 left-0 w-full md:w-2/3 lg:w-1/2 bg-white p-6 md:p-8 rounded-tr-3xl z-20">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-left">
          Agenda tu Cita
        </h3>
        <p className="text-gray-700 mb-6 text-left">
          Agenda una cita para visitarnos en nuestras oficinas y realiza la
          revisión técnico mecánica de tu vehículo.
        </p>
        <button
          onClick={() => {
            const phoneNumber = "573171902517";
            const message =
              "Hola, me gustaría agendar una cita para la revisión técnico mecánica de mi vehículo.";
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
              message
            )}`;
            window.open(whatsappUrl, "_blank");
          }}
          className="bg-primary text-white font-bold py-3 px-8 rounded-xl text-lg hover:bg-[#8a0b0f] transition-colors duration-300"
        >
          Agendar cita
        </button>
      </div>
    </div>
  );
};

const QuoterAndScheduler = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const { top, height } = sectionRef.current.getBoundingClientRect();
      const screenHeight = window.innerHeight;
      const scrollArea = height - screenHeight;
      const scrolled = -top;

      let newProgress = 0;
      if (scrolled > 0 && scrolled < scrollArea) {
        newProgress = scrolled / scrollArea;
      } else if (scrolled >= scrollArea) {
        newProgress = 1;
      }

      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

  if (!isDesktop) {
    // Mobile and Tablet View: Simple Vertical Layout
    return (
      <section id="quote" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Tu cotización en segundos
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 mb-12">
            En esta sección puedes cotizar tu SOAT en simples pasos. O si lo
            prefieres, agenda una cita para visitarnos en nuestras oficinas.
          </p>
        </div>
        <div className="container mx-auto px-4 flex flex-col items-center gap-12">
          <SoatQuoter />
          <AppointmentScheduler />
        </div>
      </section>
    );
  }

  // Desktop View: Original Scrolling Animation
  const cardWidth = 800;
  const travelDistance = cardWidth * 1.2;
  const card1TranslateX = -progress * travelDistance;
  const card2TranslateX = travelDistance - progress * travelDistance;

  return (
    <section ref={sectionRef} className="relative" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative h-full w-full">
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-full px-4 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Tu cotización en segundos
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              En esta sección puedes cotizar tu SOAT en simples pasos. O si lo
              prefieres, agenda una cita para visitarnos en nuestras oficinas.
            </p>
          </div>

          <div
            className="absolute top-[60%] left-1/2"
            style={{
              transform: `translate(-50%, -50%) translateX(${card1TranslateX}px)`,
            }}
          >
            <SoatQuoter />
          </div>
          <div
            className="absolute top-[60%] left-1/2"
            style={{
              transform: `translate(-50%, -50%) translateX(${card2TranslateX}px)`,
            }}
          >
            <AppointmentScheduler />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoterAndScheduler;
