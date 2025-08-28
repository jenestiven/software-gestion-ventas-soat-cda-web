import { Suspense } from "react";
import SellsCardSection from "../components/app/admin/dashboard/SellsCardSection";
import CompareSellsGraph from "../components/app/admin/dashboard/CompareSellsGraph";
import BetterSellerTable from "../components/app/admin/dashboard/BetterSellerTable";
import SalesByPlaceTable from "../components/app/admin/dashboard/SalesByPlaceTable";
import SalesByPayMethod from "../components/app/admin/dashboard/SalesByPayMethod";
import "./page.css";

export const dynamic = 'force-dynamic';

type Props = {};

export const Skeleton = () => (
  <div className="w-full h-72 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
    <div className="w-3/4 h-2/3 bg-gray-200 rounded" />
  </div>
);

const HeaderSkeleton = () => (
  <div className="w-full h-16 bg-gray-100 animate-pulse rounded-lg grid grid-cols-4 gap-4">
    <div
      className="col-span-2 flex items-center justify-center"
      style={{ width: "70%" }}
    >
      <div className="w-full h-3 bg-gray-200 rounded" />
    </div>
    <div
      className="col-span-2 flex items-center justify-center"
      style={{ width: "30%" }}
    >
      <div className="w-full h-3 bg-gray-200 rounded" />
    </div>
  </div>
);

export default async function AdminHomePage({}: Props) {
  return (
    <div className="admin-home-page">
      <Suspense fallback={<HeaderSkeleton />}>
        <SellsCardSection />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <CompareSellsGraph />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <BetterSellerTable />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <SalesByPlaceTable />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <SalesByPayMethod />
      </Suspense>
    </div>
  );
}
