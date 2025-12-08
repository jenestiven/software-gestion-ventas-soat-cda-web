"use client";

import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

export default function ContactUs() {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  const handleWhatsAppClick = () => {
    const phoneNumber = "573017719589";
    const message = "Hola, me gustaría ponerme en contacto con ustedes.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="contact" ref={ref} className="w-full py-20 md:py-32 bg-gray-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wider">
            CONTACTO
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tighter text-accent-contrast">
            Ponte en contacto con nosotros
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            ¿Tienes preguntas o necesitas ayuda? Encuéntranos en nuestra sede o contáctanos directamente.
          </p>
        </div>

        <div
          className={`max-w-5xl mx-auto transition-all duration-500 ease-in-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d995.6401842481662!2d-76.51946563043535!3d3.4563915997823913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a711ecc02335%3A0x28f191fcdb66bab5!2sCDA%20MOTO%20GP%20S.A.S!5e0!3m2!1ses!2sco!4v1762672194499!5m2!1ses!2sco"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de CDA Moto GP"
            ></iframe>
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 text-lg"
            >
              Contactar por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}