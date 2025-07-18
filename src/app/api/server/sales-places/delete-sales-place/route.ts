import { NextResponse } from "next/server";
import { deleteSalesPlace } from "@/services/sales-places";

export async function DELETE(request: Request) {
  const data = await request.json();

  const salesPlace = await deleteSalesPlace(data.id);
  return NextResponse.json(salesPlace);
}
