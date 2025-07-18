import { NextResponse } from "next/server";
import { createSalesPlace } from "@/services/sales-places";

export async function POST(request: Request) {
  const data = await request.json();

  const salesPlace = await createSalesPlace(data);
  return NextResponse.json(salesPlace);
}
