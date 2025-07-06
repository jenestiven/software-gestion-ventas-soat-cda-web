import { Suspense } from "react";
import SellsCardSection from "../components/app/admin/dashboard/SellsCardSection";
import CompareSellsGraph from "../components/app/admin/dashboard/CompareSellsGraph";
import "./page.css";

export default async function AdminHomePage() {
  return (
    <div className="admin-home-page">
      <SellsCardSection />
      <Suspense fallback={<div>Cargando ...</div>}>
        <CompareSellsGraph />
      </Suspense>
    </div>
  );
}
