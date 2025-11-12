"use client";

import { useState, useRef, useEffect } from "react";
import { FaCar, FaMotorcycle, FaTaxi } from "react-icons/fa";
import { DatePicker, ConfigProvider, Modal } from "antd";
import esES from "antd/lib/locale/es_ES";
import "dayjs/locale/es";
import Image from "next/image";

type Vehicle = "motorcycle" | "car" | "taxi" | null;

const SoatQuoterForm = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(null);
  const [cc, setCc] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [showQuote, setShowQuote] = useState(false);

  const handleShowQuote = () => {
    if (selectedVehicle && cc && paymentMethod) {
      setShowQuote(true);
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center p-6 text-center">
      <div className="w-full">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            1. Elige tu vehículo
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <VehicleButton
              icon={<FaMotorcycle />}
              label="Moto"
              isSelected={selectedVehicle === "motorcycle"}
              onClick={() => setSelectedVehicle("motorcycle")}
            />
            <VehicleButton
              icon={<FaTaxi />}
              label="Taxi"
              isSelected={selectedVehicle === "taxi"}
              onClick={() => setSelectedVehicle("taxi")}
            />
            <VehicleButton
              icon={<FaCar />}
              label="Liviano"
              isSelected={selectedVehicle === "car"}
              onClick={() => setSelectedVehicle("car")}
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            2. Ingresa el cilindraje
          </h3>
          <input
            type="number"
            value={cc}
            onChange={(e) => setCc(e.target.value)}
            placeholder="Ej: 199"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            3. Método de pago
          </h3>
          <div className="flex justify-center gap-4">
            <PaymentButton
              label="Efectivo"
              isSelected={paymentMethod === "cash"}
              onClick={() => setPaymentMethod("cash")}
            />
            <PaymentButton
              label="Tarjeta"
              isSelected={paymentMethod === "card"}
              onClick={() => setPaymentMethod("card")}
            />
          </div>
        </div>

        {!showQuote && (
          <button
            onClick={handleShowQuote}
            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Ver cotización
          </button>
        )}

        {showQuote && (
          <div className="mt-8 p-6 bg-gray-100 rounded-lg text-center animate-fade-in">
            <h4 className="text-xl font-semibold text-gray-800">
              Valor de tu SOAT
            </h4>
            <p className="text-7xl font-extrabold text-blue-600 my-4">
              $580.000
            </p>
            <button className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-600 transition-colors duration-300">
              Contactar CDA
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const SoatQuoter = ({ onQuoteClick }: { onQuoteClick: () => void }) => {
  return (
    <div id="quote" className="relative h-[600px] w-[900px] rounded-3xl shadow-xl overflow-hidden">
      <Image
        src="/images/GP__20.webp"
        alt="SOAT"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      {/* Overlay for text content */}
      <div className="absolute bottom-0 left-0 w-full md:w-2/3 lg:w-1/2 bg-white p-8 rounded-tr-3xl z-20">
        <h3 className="text-3xl font-bold text-gray-800 mb-4 text-left">
          Cotiza tu SOAT
        </h3>
        <p className="text-gray-700 mb-6 text-left">
          Obtén el precio de tu SOAT en segundos y cómpralo en línea de forma
          fácil y segura.
        </p>
        <button
          onClick={onQuoteClick}
          className="bg-primary text-white font-bold py-3 px-8 rounded-xl text-lg hover:bg-[#8a0b0f] transition-colors duration-300"
        >
          Cotizar ahora
        </button>
      </div>
    </div>
  );
};

const AppointmentSchedulerForm = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center p-6 bg-white rounded-3xl">
      <div className="w-full text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Agenda tu Cita
        </h3>
        <p className="text-gray-600 mb-6">
          Elige una fecha y completa tus datos para visitarnos.
        </p>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Nombre Completo"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="tel"
            placeholder="Número de Teléfono"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <ConfigProvider locale={esES}>
            <DatePicker
              className="w-full !py-3 !text-base"
              placeholder="Selecciona la fecha"
            />
          </ConfigProvider>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Agendar Cita
          </button>
        </form>
      </div>
    </div>
  );
};

const AppointmentScheduler = ({
  onAppointmentClick,
}: {
  onAppointmentClick: () => void;
}) => {
  return (
    <div className="relative h-[600px] w-[900px] rounded-3xl shadow-xl overflow-hidden">
      <Image
        src="/images/GP__6.webp"
        alt="Agenda tu cita"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      {/* Overlay for text content */}
      <div className="absolute bottom-0 left-0 w-full md:w-2/3 lg:w-1/2 bg-white p-8 rounded-tr-3xl z-20">
        <h3 className="text-3xl font-bold text-gray-800 mb-4 text-left">
          Agenda tu Cita
        </h3>
        <p className="text-gray-700 mb-6 text-left">
          Agenda una cita para visitarnos en nuestras oficinas y realiza la
          revisión técnico mecánica de tu vehículo.
        </p>
        <button
          onClick={onAppointmentClick}
          className="bg-primary text-white font-bold py-3 px-8 rounded-xl text-lg hover:bg-[#8a0b0f] transition-colors duration-300"
        >
          Agendar cita
        </button>
      </div>
    </div>
  );
};

const QuoterAndScheduler = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showAppointmentModal = () => {
    setIsAppointmentModalOpen(true);
  };

  const handleAppointmentCancel = () => {
    setIsAppointmentModalOpen(false);
  };

  useEffect(() => {
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
  }, []);

  const cardWidth = 800;
  const travelDistance = cardWidth * 1.2;

  const card1TranslateX = -progress * travelDistance;
  const card2TranslateX = travelDistance - progress * travelDistance;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "200vh" }}
    >
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
            <SoatQuoter onQuoteClick={showModal} />
          </div>
          <div
            className="absolute top-[60%] left-1/2"
            style={{
              transform: `translate(-50%, -50%) translateX(${card2TranslateX}px)`,
            }}
          >
            <AppointmentScheduler onAppointmentClick={showAppointmentModal} />
          </div>
        </div>
      </div>
      <Modal
        title="Cotiza tu SOAT"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <SoatQuoterForm />
      </Modal>
      <Modal
        title="Agenda tu Cita"
        open={isAppointmentModalOpen}
        onCancel={handleAppointmentCancel}
        footer={null}
        centered
      >
        <AppointmentSchedulerForm />
      </Modal>
    </section>
  );
};

// Helper components for styling
const VehicleButton = ({
  icon,
  label,
  isSelected,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all duration-200 ${
      isSelected
        ? "border-blue-600 bg-blue-50 scale-105"
        : "border-gray-300 bg-white hover:border-blue-400"
    }`}
  >
    <div className="text-3xl text-gray-600">{icon}</div>
    <span className="mt-2 font-semibold text-gray-800">{label}</span>
  </button>
);

const PaymentButton = ({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-8 py-3 font-semibold rounded-lg border-2 transition-colors duration-200 ${
      isSelected
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
    }`}
  >
    {label}
  </button>
);

export default QuoterAndScheduler;
