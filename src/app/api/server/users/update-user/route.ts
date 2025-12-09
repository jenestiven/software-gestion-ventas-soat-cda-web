import { updateUser } from "@/services/users";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const updatedUser = await updateUser(data);
    revalidatePath("/admin/users");
    return updatedUser;
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request" },
      { status: 400 }
    );
  }
}
