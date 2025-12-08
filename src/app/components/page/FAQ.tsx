"use client";
import React, { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const faqItems = [
  {
    key: "1",
    question: "¿Cómo puedo descargar el certificado de mi revisión técnico mecánica?",
    answer: (
      <>
        Los puedes realizar por medio del siguiente enlace{" "}
        <a
          href="https://portalpublico.runt.gov.co/#/consulta-vehiculo/consulta/consulta-ciudadana"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline hover:opacity-80"
        >
          https://portalpublico.runt.gov.co/#/consulta-vehiculo/consulta/consulta-ciudadana
        </a>
        . Debes tener a disposición la placa del vehículo y el número de documento
        del propietario del vehículo.
      </>
    ),
  },
  {
    key: "2",
    question: "¿Cuándo debo de realizar la primera revisión técnico mecánica de mi vehículo?",
    answer: (
      <>
        Los vehículos nuevos de servicio particular y similares, deberán realizar la primera revisión técnico mecánica a partir del quinto (5°) año contado a partir de la fecha de su matrícula en el registro nacional automotor. <br /> Los vehículos nuevos de servicio público, así como las motocicletas y similares, deberá realizar la primera revisión técnico mecánica al cumplir dos (2) años contados a partir de su fecha de matrícula.
      </>
    ),
  },
  {
    key: "3",
    question: "¿Es obligatorio tener el SOAT vigente para poder realizar la revisión técnico mecánica?",
    answer:
      "No, ya no es obligatorio tener el SOAT vigente para realizar la revisión técnico mecánica, según la normativa vigente desde agosto de 2020. Sin embargo, el SOAT sí es obligatorio para poder circular, y ambos deben estar al día para estar en cumplimiento con la ley y evitar sanciones. ",
  },
  {
    key: "4",
    question: "¿Cuáles son los medios de pago?",
    answer: (
      <>
        Nuestros medios de pago son:
        <ul className="list-disc list-inside mt-2">
          <li>Efectivo</li>
          <li>Tarjeta debido / Crédito (Visa, Mastercard, Amarican Express)</li>
          <li>Nequi</li>
          <li>Brilla, Sistecredito o Addi</li>
        </ul>   
      </>
    )
  },
  {
    key: "5",
    question: "¿Cuáles son los medios de financiación que manejan?",
    answer: (
      <>
       Manejamos tres métodos de financiamiento para que puedas financiar tu SOAT y revisión técnico mecánica:
        <ul className="list-disc list-inside mt-2">
          <li>Brilla</li>
          <li>Sistecredito</li>
          <li>Addi</li>
        </ul>
      </>
    )
  },
   {
    key: "6",
    question: "¿Puedo financiar solo el SOAT?",
    answer: "Sí, puedes financiar solo tu SOAT por cualquiera de los métodos de financiamiento que tenemos, los cuales son: Brilla, Sistecredito y Addi"
  },
  {
    key: "7",
    question: "¿Qué le revisan al vehículo durante la revisión técnico mecánica?",
    answer: (
      <>
        Carros: Durante la revisión técnico mecánica se verifican componentes mecánicos como frenos, suspensión y dirección; el estado de la carrocería, llantas y vidrios; y el sistema eléctrico y de iluminación. También se evalúan los niveles de emisiones de gases y se comprueba el correcto funcionamiento de señales y elementos de seguridad como cinturones.
          <br />
        Motocicletas: Durante la revisión técnico mecánica de una moto, se revisan aspectos clave de seguridad (luces, frenos, suspensión), medio ambiente (emisión de gases) y estructura (llantas, chasis, sistema eléctrico), para asegurar que el vehículo cumpla con las normas. 
      </>
    ),
  },
];

const AccordionItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string | JSX.Element;
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
      id="faq"
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
