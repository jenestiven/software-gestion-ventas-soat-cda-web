import React from "react";
import { Carousel } from "antd";
import Image from "next/image";
import headerSectionOne from "@/images/hero-image-1.jpg";

type Props = {};

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "96dvh",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export default function PageCarousel({}: Props) {
  return (
    <section className="w-full mx-auto">
      <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={10000}>
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[96dvh] flex items-center justify-center">
          <Image
            src={headerSectionOne}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </section>
  );
}
