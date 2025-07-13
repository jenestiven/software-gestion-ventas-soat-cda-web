import React from "react";
import SalesByPayMethodClient from "./SalesByPayMethodClient";

async function getSalesByPayMethod() {
  const res = await fetch("http://localhost:3000/api/local/sales-by-pay-method", { cache: 'no-store' });
  const data = await res.json();
  return data;
}

export default async function SalesByPayMethod() {
  const salesByPayMethod = await getSalesByPayMethod();

  return <SalesByPayMethodClient dataSource={salesByPayMethod} />;
}
