import React from 'react';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Placeholder images
import img1 from '@/images/GP__30.webp';
import img2 from '@/images/GP__35.webp';
import img3 from '@/images/GP__37.webp';
import img4 from '@/images/GP__42.webp';

const teamMembers = [
  {
    src: img1,
    name: 'Nuestros Asesores',
    role: 'Listos para guiarte en cada paso.',
  },
  {
    src: img2,
    name: 'Personal de Servicios',
    role: 'Manteniendo todo impecable para ti.',
  },
  {
    src: img3,
    name: 'Equipo de Mecánicos',
    role: 'Expertos que cuidan de tu vehículo.',
  },
  {
    src: img4,
    name: 'Familia CDA Moto GP',
    role: 'Todos juntos con un cliente satisfecho.',
  },
];

export default function OurTeam() {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="equipo" className="w-full py-20 md:py-32 bg-gray-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wider">NUESTRO EQUIPO</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tighter text-accent-contrast">
            El Corazón de CDA Moto GP
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Personas apasionadas y comprometidas que hacen posible nuestro servicio de calidad.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden text-center
                transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-80">
                <Image
                  src={member.src}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-accent-contrast">{member.name}</h3>
                <p className="text-gray-500 mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
