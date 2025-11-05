import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Sale ID is required" }, { status: 400 });
    }

    await db.collection("sales").doc(id).delete();

    return NextResponse.json({ message: "Sale deleted successfully" });
  } catch (error) {
    console.error("Error deleting sale:", error);
    return NextResponse.json({ message: "Error deleting sale" }, { status: 500 });
  }
}
