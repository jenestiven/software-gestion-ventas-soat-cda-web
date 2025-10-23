"use client"; // Mark as client component because Ant Design components might need client-side rendering

import React from "react";
import { Collapse } from "antd";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const { Panel } = Collapse;

const faqItems = [
  {
    key: "1",
    question: "¿Qué es el SOAT?",
    answer: "El SOAT (Seguro Obligatorio de Accidentes de Tránsito) es un seguro obligatorio en Colombia que cubre los daños corporales causados a personas en accidentes de tránsito, ya sean peatones, pasajeros o conductores.",
  },
  {
    key: "2",
    question: "¿Cada cuánto debo realizar la revisión técnico-mecánica?",
    answer: "La revisión técnico-mecánica debe realizarse anualmente para vehículos particulares a partir del sexto año de su matrícula, y anualmente para vehículos de servicio público a partir del segundo año.",
  },
  {
    key: "3",
    question: "¿Qué documentos necesito para vender mi SOAT?",
    answer: "Generalmente, necesitarás la tarjeta de propiedad del vehículo, tu cédula de ciudadanía y el SOAT anterior (si aplica).",
  },
  {
    key: "4",
    question: "¿Ofrecen servicios de mantenimiento para todo tipo de vehículos?",
    answer: "Sí, ofrecemos servicios de mantenimiento preventivo y correctivo para una amplia gama de vehículos, incluyendo motos, carros particulares y vehículos de servicio público.",
  },
];

export default function FAQ() {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      className={`w-full py-12 md:py-24 lg:py-32 bg-gray-100 transition-all duration-500`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 md:text-4xl/tight">
          Preguntas Frecuentes
        </h2>
        <div
          ref={ref}
          className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <Collapse accordion>
            {faqItems.map((item) => (
              <Panel header={item.question} key={item.key}>
                <p>{item.answer}</p>
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
    </section>
  );
}
