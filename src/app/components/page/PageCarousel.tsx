import React from "react";
import { Carousel } from "antd";
import Image from "next/image";

type CarouselItem = {
  src: string;
  alt: string;
};

type Props = {
  items: CarouselItem[];
};

export default function PageCarousel({ items }: Props) {
  return (
    <section className="w-full mx-auto relative">
      <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={8000}>
        {items.map((item, index) => (
          <div key={index} className="h-72 md:h-[96vh] relative">
            <Image
              src={item.src}
              alt={item.alt}
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              priority={index === 0}
            />
            <div className="z-10 text-2xl text-white absolute bottom-24 left-48 p-4 w-auto h-auto rounded-md shadow-md bg-black bg-opacity-50">
              <h2 className="text-6xl font-bold">CDA Moto GP</h2>
              <h4 className="text-wrap">Obtén tu SOAT de forma rápida y segura. <br /> Cotiza ahora y viaja con tranquilidad.</h4>
              <button className="bg-primary mt-4 hover:bg-color_mix_primary text-white font-bold py-2 px-4 rounded">Cotizar SOAT</button>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}