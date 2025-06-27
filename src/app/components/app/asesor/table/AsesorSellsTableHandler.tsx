import React from "react";
import "@/app/components/app/asesor/table/asesor-table.css";
import { Sell } from "@/types/types";
import { headers } from "next/headers";
import AsesorSellsTable from "./AsesorSellsTable";

export default async function AsesorSellsTablehandler() {
  const host = headers().get("host");
  const protocol = headers().get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/local/asesor-sells`, {
    cache: "no-store",
  });
  const data: Sell[] = await res.json();

  return <AsesorSellsTable data={data} />;
}
