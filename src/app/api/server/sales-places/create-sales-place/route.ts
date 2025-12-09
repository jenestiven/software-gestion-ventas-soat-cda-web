import { NextResponse } from "next/server";
import { createSalesPlace } from "@/services/sales-places";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const data = await request.json();

  const salesPlace = await createSalesPlace(data);
  revalidatePath("/admin/managment");
  return NextResponse.json(salesPlace);
}
