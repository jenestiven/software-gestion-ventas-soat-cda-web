import React from "react";
import "@/app/components/app/asesor/table/asesor-table.css";
import { Sell } from "@/types/types";
import { headers } from "next/headers";
import AsesorSellsTable from "./AsesorSellsTable";

interface Props {}

export default async function AsesorSellsTablehandler({}: Props) {
  const host = headers().get("host");
  const protocol = headers().get("x-forwarded-proto") || "http";
  const cookie = headers().get("cookie");
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/local/asesor-sells`, {
    cache: "no-store",
    headers: {
      cookie: cookie || "",
    },
  });
  const data: Sell[] = await res.json();

  return <AsesorSellsTable data={data} />;
}
