import React from "react";
import BetterSellerTableClient from "./BetterSellerTableClient";
import { headers } from "next/headers";

async function getBetterSellers() {
  const host = headers().get("host");
  const protocol = headers().get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(`${baseUrl}/api/local/better-sellers`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

type Props = {};

export default async function BetterSellerTable({}: Props) {
  const betterSellers = await getBetterSellers();

  return <BetterSellerTableClient dataSource={betterSellers} />;
}
