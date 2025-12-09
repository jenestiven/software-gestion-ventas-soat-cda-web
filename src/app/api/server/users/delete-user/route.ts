import { deleteUser } from "@/services/users";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function DELETE(req: NextRequest) {
  try {
    const uid = req.body ? (await req.json()).uid : null;
    if (!uid) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }
    await deleteUser(uid);
    revalidatePath("/admin/users");
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}
