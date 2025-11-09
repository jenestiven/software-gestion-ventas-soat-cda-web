"use client";
import React, { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const faqItems = [
  {
    key: "1",
    question: "¿Qué es el SOAT?",
    answer:
      "El SOAT (Seguro Obligatorio de Accidentes de Tránsito) es un seguro obligatorio en Colombia que cubre los daños corporales causados a personas en accidentes de tránsito, ya sean peatones, pasajeros o conductores.",
  },
  {
    key: "2",
    question: "¿Cada cuánto debo realizar la revisión técnico-mecánica?",
    answer:
      "La revisión técnico-mecánica debe realizarse anualmente para vehículos particulares a partir del sexto año de su matrícula, y anualmente para vehículos de servicio público a partir del segundo año.",
  },
  {
    key: "3",
    question: "¿Qué documentos necesito para comprar mi SOAT?",
    answer:
      "Generalmente, necesitarás la tarjeta de propiedad del vehículo, tu cédula de ciudadanía y el SOAT anterior (si aplica).",
  },
  {
    key: "4",
    question: "Ofrecen servicios de mantenimiento para todo tipo de vehículos?",
    answer:
      "Sí, ofrecemos servicios de mantenimiento preventivo y correctivo para una amplia gama de vehículos, incluyendo motos, carros particulares y vehículos de servicio público.",
  },
];

const AccordionItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full flex justify-between items-center text-left py-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-accent-contrast">
          {question}
        </span>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v12m-6-6h12"
            />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="pb-6 text-gray-600">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default function FAQ() {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      className={`w-full py-12 md:py-24 lg:py-32 transition-all duration-500`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-accent-contrast">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            ¿TIENES DUDAS? Aquí te respondemos las preguntas más comunes sobre
            nuestros servicios.
          </p>
        </div>
        <div
          ref={ref}
          className={`max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-4 md:p-8 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {faqItems.map((item) => (
            <AccordionItem
              key={item.key}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
