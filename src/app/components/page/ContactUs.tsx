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

  return (
    <section id="contactanos" ref={ref} className="w-full py-20 md:py-32 bg-gray-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wider">
            CONTACTO
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tighter text-accent-contrast">
            Ponte en contacto con nosotros
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            ¿Tienes preguntas o necesitas ayuda? Completa el formulario o
            visítanos.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">
          {/* Left Column: Form and Info */}
          <div
            className={`bg-white p-8 md:p-12 rounded-2xl shadow-2xl transition-all duration-500 ease-in-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h3 className="text-2xl font-bold mb-6 text-accent-contrast">
              Envíanos un mensaje
            </h3>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full border-gray-200 rounded-lg shadow-sm p-3 bg-gray-50 focus:ring-primary focus:border-primary transition"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full border-gray-200 rounded-lg shadow-sm p-3 bg-gray-50 focus:ring-primary focus:border-primary transition"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full border-gray-200 rounded-lg shadow-sm p-3 bg-gray-50 focus:ring-primary focus:border-primary transition"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-primary_transparent transition-all duration-300"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>

          {/* Right Column: Map and Info */}
          <div
            className={`space-y-8 transition-all duration-500 ease-in-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
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
            <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary rounded-xl p-3">
                        <LocationIcon />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-accent-contrast">Dirección</h3>
                        <p className="text-gray-600">Cra. 6 #26-3, COMUNA 4, Cali, Valle del Cauca</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary rounded-xl p-3">
                        <PhoneIcon />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-accent-contrast">Teléfono</h3>
                        <p className="text-gray-600">+57 301 7719589</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
