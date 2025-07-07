import { Suspense } from "react";
import SellsCardSection from "../components/app/admin/dashboard/SellsCardSection";
import CompareSellsGraph from "../components/app/admin/dashboard/CompareSellsGraph";
import BetterSellerTable from "../components/app/admin/dashboard/BetterSellerTable";
import SalesByPlaceTable from "../components/app/admin/dashboard/SalesByPlaceTable";
import "./page.css";
import SalesByPayMethod from "../components/app/admin/dashboard/SalesByPayMethod";

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
      <Suspense fallback={<div>Cargando ...</div>}>
        <SalesByPlaceTable />
      </Suspense>
      <Suspense fallback={<div>Cargando ...</div>}>
        <SalesByPayMethod />
      </Suspense>
    </div>
  );
}
