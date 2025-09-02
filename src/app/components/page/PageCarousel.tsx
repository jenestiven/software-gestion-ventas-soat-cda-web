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
    <section className="w-full mx-auto">
      <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={10000}>
        {items.map((item, index) => (
          <div key={index} className="h-72 md:h-[96vh]">
            <Image
              src={item.src}
              alt={item.alt}
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
}
