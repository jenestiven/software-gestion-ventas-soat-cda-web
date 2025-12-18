import { NextResponse } from "next/server";
import { deleteSalesPlace } from "@/services/sales-places";
import { revalidatePath } from "next/cache";

export async function DELETE(request: Request) {
  const data = await request.json();

  const salesPlace = await deleteSalesPlace(data.id);
  revalidatePath("/admin/users");
  return NextResponse.json(salesPlace);
}
