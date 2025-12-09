import { NextResponse } from "next/server";
import { createUser } from "@/services/users";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const data = await request.json();

  const user = await createUser(data);
  revalidatePath("/admin/users");
  return NextResponse.json(user);
}
