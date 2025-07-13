import React from "react";
import SalesByPayMethodClient from "./SalesByPayMethodClient";
import { headers } from "next/headers";

type Props = {};

async function getSalesByPayMethod() {
  const host = headers().get("host");
  const protocol = headers().get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(`${baseUrl}/api/local/sales-by-pay-method`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export default async function SalesByPayMethod({}: Props) {
  const salesByPayMethod = await getSalesByPayMethod();

  return <SalesByPayMethodClient dataSource={salesByPayMethod} />;
}
