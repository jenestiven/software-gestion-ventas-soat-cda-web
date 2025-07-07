import { Suspense } from "react";
import SellsCardSection from "../components/app/admin/dashboard/SellsCardSection";
import CompareSellsGraph from "../components/app/admin/dashboard/CompareSellsGraph";
import BetterSellerTable from "../components/app/admin/dashboard/BetterSellerTable";
import "./page.css";

export default async function AdminHomePage() {
  return (
    <div className="admin-home-page">
      <SellsCardSection />
      <Suspense fallback={<div>Cargando ...</div>}>
        <CompareSellsGraph />
      </Suspense>
      <Suspense fallback={<div>Cargando ...</div>}>
        <BetterSellerTable />
      </Suspense>
      <div className="by-place">b</div>
      <div className="by-pay-method">c</div>
    </div>
  );
}
