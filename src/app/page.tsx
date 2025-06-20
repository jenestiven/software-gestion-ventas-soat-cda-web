import PageCarousel from "@/app/components/page/PageCarousel";
import PageHeader from "@/app/components/page/PageHeader";

export default function WebHomePage() {

  return (
    <main className="flex flex-col items-center justify-start min-h-screen">
      <PageHeader />
      <PageCarousel />
    </main>
  );
}
