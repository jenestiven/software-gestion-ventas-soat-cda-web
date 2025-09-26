"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/app/components/page/PageHeader";
import AboutUs from "./components/page/AboutUs";
import PageCarouselClient from "./components/page/PageCarouselClient";
import Loading from "./loading";

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
    <main className="flex flex-col items-center justify-start min-h-screen">
      <PageHeader />
      <PageCarouselClient />
      <PageCarouselClient />
      <PageCarouselClient />
      <PageCarouselClient />
      <PageCarouselClient />
      <PageCarouselClient />
      <PageCarouselClient />
      <AboutUs />
    </main>
  );
}
