import React from "react";
import SalesByPlaceTableClient from "./SalesByPlaceTableClient";

async function getSalesByPlace() {
  const res = await fetch("http://localhost:3000/api/local/sales-by-place", { cache: 'no-store' });
  const data = await res.json();
  return data;
}

export default async function SalesByPlaceTable() {
  const salesByPlace = await getSalesByPlace();

  return <SalesByPlaceTableClient dataSource={salesByPlace} />;
}
