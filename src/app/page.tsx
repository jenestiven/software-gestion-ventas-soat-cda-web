import PageCarousel from "./components/PageCarousel";
import PageHeader from "./components/PageHeader";

export default function WebHomePage() {

  return (
    <main className="flex flex-col items-center justify-start min-h-screen">
      <PageHeader />
      <PageCarousel />
    </main>
  );
}
