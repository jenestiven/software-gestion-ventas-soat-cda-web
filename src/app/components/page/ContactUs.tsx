import React from "react";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ContactUs() {
  const [leftColRef, isLeftColVisible] = useScrollAnimation<HTMLDivElement>();
  const [rightColRef, isRightColVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      className={`w-full py-12 md:py-24 lg:py-32 bg-gray-50 transition-all duration-500`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 md:text-4xl/tight">
          Contáctanos
        </h2>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div
            ref={leftColRef}
            className={`flex flex-col space-y-6 ${isLeftColVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="flex items-center space-x-4">
              <EnvironmentOutlined className="text-primary text-3xl" />
              <div>
                <h3 className="text-xl font-semibold">Dirección</h3>
                <p className="text-gray-600">Calle Falsa 123, Ciudad, País</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <PhoneOutlined className="text-primary text-3xl" />
              <div>
                <h3 className="text-xl font-semibold">Teléfono</h3>
                <p className="text-gray-600">+123 456 7890</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MailOutlined className="text-primary text-3xl" />
              <div>
                <h3 className="text-xl font-semibold">Correo Electrónico</h3>
                <p className="text-gray-600">info@cda-motogp.com</p>
              </div>
            </div>
            {/* Map */}
            <div className="w-full h-80 rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.6000000000002!2d-74.072092!3d4.658383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b9d0a0a0a01%3A0x123456789abcdef0!2sBogot%C3%A1%2C%20Colombia!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de CDA Moto GP"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div
            ref={rightColRef}
            className={`bg-white p-8 rounded-lg shadow-md ${isRightColVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-color_mix_primary transition-colors duration-300"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
