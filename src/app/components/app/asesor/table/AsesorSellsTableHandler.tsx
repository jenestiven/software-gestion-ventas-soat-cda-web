import React from "react";
import "@/app/components/app/asesor/table/asesor-table.css";
import { Sell } from "@/types/types";
import { headers } from "next/headers";
import AsesorSellsTable from "./AsesorSellsTable";
import { auth } from "@/firebase/firebaseAdmin";
import { getSalesByAsesor } from "@/services/sales/sales";

interface Props {}

export default async function AsesorSellsTablehandler({}: Props) {
  const cookieHeader = headers().get("cookie");
  const sessionCookie = cookieHeader?.split(';').find(c => c.trim().startsWith('__session='))?.split('=')[1];
  
  let data: Sell[] = [];

  if (!sessionCookie) {
    console.error("No session cookie found.");
    return <AsesorSellsTable data={[]} />;
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const asesorId = decodedClaims.uid;
    data = await getSalesByAsesor(asesorId);
    
  } catch (error) {
    console.error("Error verifying session cookie or fetching sales:", error);
    return <AsesorSellsTable data={[]} />;
  }

  return <AsesorSellsTable data={data} />;
}