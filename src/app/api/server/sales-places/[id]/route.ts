import { NextResponse } from "next/server";
import { getSalesPlaceById } from "@/services/sales-places";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const salesPlace = await getSalesPlaceById(id);
  return NextResponse.json(salesPlace);
}
