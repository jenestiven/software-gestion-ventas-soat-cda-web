
import { NextResponse } from "next/server";
import { firestore } from "@/firebase/firebaseAdmin";

export async function POST(request: Request) {
  try {
    const { saleIds } = await request.json();

    if (!saleIds || !Array.isArray(saleIds)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const batch = firestore.batch();

    saleIds.forEach((id) => {
      const saleRef = firestore.collection("sales").doc(id);
      batch.update(saleRef, { conciliation_status: "conciliated" });
    });

    await batch.commit();

    return NextResponse.json({ message: "Sales updated successfully" });
  } catch (error) {
    console.error("Error updating sales:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
