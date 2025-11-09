"use client";
import React from "react";
import Link from "next/link";

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="45"
    height="45"
    viewBox="0 0 24 24"
  >
    <g
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    >
      <circle cx="9" cy="9" r="1" />
      <circle cx="15" cy="15" r="1" />
      <path d="M8 9a7 7 0 0 0 7 7m-9 5.2A11 11 0 1 0 2.8 18L2 22Z" />
    </g>
  </svg>
);

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "573017719589"; // Extracted from ContactUs.tsx
  const message = encodeURIComponent(
    "¡Hola! Estoy interesado en los servicios de CDA Moto GP."
  );
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
      aria-label="Contact us on WhatsApp"
    >
      <WhatsAppIcon />
    </Link>
  );
};

export default WhatsAppButton;
