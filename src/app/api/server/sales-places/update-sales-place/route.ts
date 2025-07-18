import { NextResponse } from "next/server";
import { updateSalesPlace } from "@/services/sales-places";

export async function PUT(request: Request) {
  const data = await request.json();

  const salesPlace = await updateSalesPlace(data.id, data);
  return NextResponse.json(salesPlace);
}
