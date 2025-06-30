import Image from "next/image";
import React from "react";
import loadingImage from "@/images/logo.png";
import "./loading-page.css";

type Props = {};

export default function LoadingScreen({}: Props) {
  return (
    <div className="loading-screen">
      <Image
        className="loader"
        width={100}
        height={100}
        src={loadingImage.src}
        alt="loading-logo"
      />
    </div>
  );
}
