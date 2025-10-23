import React from "react";
import { CarOutlined, FileTextOutlined, ToolOutlined } from "@ant-design/icons"; // Example icons, assuming Ant Design is available
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="text-primary text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function OurServices() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`w-full py-12 md:py-24 lg:py-32 bg-white ${isVisible ? "animate-fade-in-up" : ""} transition-all duration-500`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 md:text-4xl/tight">
          Nuestros Servicios
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            icon={<FileTextOutlined />}
            title="Venta de SOATs"
            description="Protege tu vehículo y a terceros con nuestro servicio de venta de SOATs. Rápido, fácil y seguro."
          />
          <ServiceCard
            icon={<CarOutlined />}
            title="Revisión Técnico-Mecánica"
            description="Asegura el buen funcionamiento de tu vehículo con nuestra revisión técnico-mecánica exhaustiva y certificada."
          />
          <ServiceCard
            icon={<ToolOutlined />}
            title="Asesorías y Mantenimiento"
            description="Ofrecemos asesoría experta y servicios de mantenimiento para prolongar la vida útil de tu vehículo."
          />
        </div>
      </div>
    </section>
  );
}
