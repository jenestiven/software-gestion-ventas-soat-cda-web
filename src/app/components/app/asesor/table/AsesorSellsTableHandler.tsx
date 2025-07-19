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
  console.log("AsesorSellsTableHandler: Raw Cookie Header:", cookieHeader);
  const sessionCookie = cookieHeader?.split(';').find(c => c.trim().startsWith('__session='))?.split('=')[1];
  console.log("Session Cookie:", sessionCookie);
  
  let data: Sell[] = [];

  if (!sessionCookie) {
    console.error("No session cookie found.");
    return <AsesorSellsTable data={[]} />;
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const asesorId = decodedClaims.uid;
    data = await getSalesByAsesor(asesorId);
    console.log("Fetched sales data:", data);
    
  } catch (error) {
    console.error("Error verifying session cookie or fetching sales:", error);
    // Optionally, redirect to login or return an empty state
    return <AsesorSellsTable data={[]} />;
  }

  return <AsesorSellsTable data={data} />;
}