import React from "react";
import { CreditCardOutlined, BankOutlined, QrcodeOutlined, MobileOutlined, WalletOutlined } from "@ant-design/icons";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type PaymentMethodCardProps = {
  icon: React.ReactNode;
  name: string;
};

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({ icon, name }) => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`flex flex-col items-center text-center p-4 bg-gray-100 rounded-lg shadow-md ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
      <div className="text-primary text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold">{name}</h3>
    </div>
  );
};

export default function PaymentMethods() {
  return (
    <section
      className={`w-full py-12 md:py-24 lg:py-32 bg-gray-50 transition-all duration-500`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 md:text-4xl/tight">
          Métodos de Pago
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <PaymentMethodCard icon={<CreditCardOutlined />} name="Tarjetas de Crédito/Débito" />
          <PaymentMethodCard icon={<BankOutlined />} name="Transferencia Bancaria" />
          <PaymentMethodCard icon={<QrcodeOutlined />} name="Pagos QR" />
          <PaymentMethodCard icon={<MobileOutlined />} name="Billeteras Digitales" />
          <PaymentMethodCard icon={<WalletOutlined />} name="Efectivo" />
        </div>
      </div>
    </section>
  );
}
