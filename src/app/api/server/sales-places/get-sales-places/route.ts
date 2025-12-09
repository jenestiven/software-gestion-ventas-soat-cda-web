export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { getSalesPlaces } from "@/services/sales-places";

export async function GET(request: Request) {
  const salesPlaces = await getSalesPlaces();
  return NextResponse.json(salesPlaces);
}