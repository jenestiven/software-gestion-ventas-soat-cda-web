"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/app/components/page/PageHeader";
import AboutUs from "./components/page/AboutUs";
import Loading from "./loading";
import OurServices from "./components/page/OurServices";
import PaymentMethods from "./components/page/PaymentMethods";
import ContactUs from "./components/page/ContactUs";
import Partners from "./components/page/Partners";
import FAQ from "./components/page/FAQ";
import Footer from "./components/page/Footer";
import NativePageCarousel from "./components/page/NativePageCarousel";
import PictureGallery from "./components/page/PictureGallery";
import WhatsAppButton from "./components/common/WhatsAppButton";

export default function WebHomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      const firstElement = document.querySelector(
        'a[href="#inicio"]'
      ) as HTMLElement | null;
      if (firstElement) {
        firstElement.click();
      }
    }, 1000); // 1 segundo

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-[#fefefe]">
      <PageHeader />
      <NativePageCarousel />
      <AboutUs />
      <OurServices />
      <PaymentMethods />
      <PictureGallery />
      <ContactUs />
      <FAQ />
      <Partners />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
