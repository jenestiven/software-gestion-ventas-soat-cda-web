import Image from "next/image";
import loadingImage from "@/images/logo.png";
import "./loading.css";

// This is the UI that will be displayed as a fallback while the page is loading
export default function Loading() {
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
