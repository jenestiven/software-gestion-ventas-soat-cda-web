import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Custom SVG Icons
const SoatIcon = () => (
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
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const CheckIcon = () => (
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
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const WrenchIcon = () => (
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
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const services = [
  {
    icon: <CheckIcon />,
    title: "Revisión Técnico Mecánica",
    description:
      "Certifica tu vehículo con personal calificado y con equipos modernos que garantizan tu seguridad en la vía.",
  },
  {
    icon: <SoatIcon />,
    title: "Seguro Obligatorio de accidente de Tránsito – SOAT",
    description:
      "Protege tu vehículo comprando tu SOAT de forma rápida y segura. Puedes comprarlo en efectivo o con nuestros métodos de financiamiento como: Brilla, Sistecredito o Addi.",
  },
  {
    icon: <WrenchIcon />,
    title: "Revisión técnico mecánica Preventiva",
    description:
      "verifica el estado mecánico y de seguridad de tu vehículo.",
  },
];

export default function OurServices() {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="services" className="w-full py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wider">
            NUESTROS SERVICIOS
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tighter text-accent-contrast">
            Todo lo que necesitas para tu vehículo
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Desde la compra de tu SOAT hasta el mantenimiento preventivo, te
            ofrecemos soluciones integrales.
          </p>
        </div>

        <div
          ref={ref}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white p-8 rounded-2xl shadow-lg border border-transparent hover:border-primary/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-primary/10 text-primary rounded-xl p-4 w-max mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-accent-contrast">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
