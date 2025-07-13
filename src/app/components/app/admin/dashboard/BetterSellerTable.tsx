import React from "react";
import BetterSellerTableClient from "./BetterSellerTableClient";

async function getBetterSellers() {
  const res = await fetch("http://localhost:3000/api/local/better-sellers", { cache: 'no-store' });
  const data = await res.json();
  return data;
}

export default async function BetterSellerTable() {
  const betterSellers = await getBetterSellers();

  return <BetterSellerTableClient dataSource={betterSellers} />;
}