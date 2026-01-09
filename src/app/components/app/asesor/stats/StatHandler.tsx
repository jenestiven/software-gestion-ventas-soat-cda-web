import React from "react";
import Stats from "./Stats";
import { headers } from "next/headers";
import { AsesorStats } from "@/types/types";
import { getStatsByAsesor } from "@/services/sales/sales";
import { auth } from "@/firebase/firebaseAdmin";

type Props = {};

export default async function StatHandler({}: Props) {
  const cookieHeader = headers().get("cookie");
  const sessionCookie = cookieHeader
    ?.split(";")
    .find((c) => c.trim().startsWith("__session="))
    ?.split("=")[1];

  let stats: AsesorStats = {
    totalSalesValue: 0,
    netEarnings: 0,
    salesGrowth: 0,
    salesQuantity: 0,
    earningsGrowth: 0,
    mainProfit: 0,
  };

  if (!sessionCookie) {
    console.error("No session cookie found.");
    return <Stats {...stats} />;
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const asesorId = decodedClaims.uid;
    stats = await getStatsByAsesor(asesorId);
  } catch (error) {
    console.error("Error verifying session cookie or fetching stats:", error);
    return <Stats {...stats} />;
  }

  return <Stats {...stats} />;
}
