import React from "react";
import SalesByPlaceTableClient from "./SalesByPlaceTableClient";
import { headers } from "next/headers";

async function getSalesByPlace() {
  const host = headers().get("host");
  const protocol = headers().get("x-forwarded-proto") || "http";
  const cookie = headers().get("cookie");
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(`${baseUrl}/api/local/sales-by-place`, {
    cache: "no-store",
    headers: {
      cookie: cookie || "",
    },
  });
  const data = await res.json();
  return data;
}

type Props = {};

export default async function SalesByPlaceTable({}: Props) {
  const salesByPlace = await getSalesByPlace();

  return <SalesByPlaceTableClient dataSource={salesByPlace} />;
}
