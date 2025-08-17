
import { NextResponse } from "next/server";
import { db } from "@/firebase/firebaseAdmin";

export async function POST(request: Request) {
  try {
    const { saleIds } = await request.json();

    if (!saleIds || !Array.isArray(saleIds)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const batch = db.batch();

    saleIds.forEach((id) => {
      const saleRef = db.collection("sales").doc(id);
      batch.update(saleRef, { conciliation_status: "conciliated" });
    });

    await batch.commit();

    return NextResponse.json({ message: "Sales updated successfully" });
  } catch (error) {
    console.error("Error updating sales:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
