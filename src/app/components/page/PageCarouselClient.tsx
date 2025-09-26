"use client";
import dynamic from "next/dynamic";

const PageCarousel = dynamic(() => import("./PageCarousel"), {
  ssr: false,
});

export default PageCarousel;
