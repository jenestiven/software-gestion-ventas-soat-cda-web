import PageCarousel from "./components/PageCarousel";
import PageHeader from "./components/PageHeader";
import { db } from "@/firebase/firebaseConfig";

export default function WebHomePage() {
  //console.log("Database connection:", db);

  return (
    <main className="flex flex-col items-center justify-start min-h-screen">
      <PageHeader />
      <PageCarousel />
    </main>
  );
}
