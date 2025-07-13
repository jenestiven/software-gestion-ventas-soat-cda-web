import { Suspense } from "react";
import SellsCardSection from "../components/app/admin/dashboard/SellsCardSection";
import CompareSellsGraph from "../components/app/admin/dashboard/CompareSellsGraph";
import BetterSellerTable from "../components/app/admin/dashboard/BetterSellerTable";
import SalesByPlaceTable from "../components/app/admin/dashboard/SalesByPlaceTable";
import SalesByPayMehod from "../components/app/admin/dashboard/SalesByPayMethod";
import "./page.css";

type Props = {};

export default async function AdminHomePage({}: Props) {
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
        <SalesByPayMehod />
      </Suspense>
    </div>
  );
}
