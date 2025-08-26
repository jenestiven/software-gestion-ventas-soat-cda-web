
import { addReceiptToSale } from "@/services/sales/sales";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { saleId, file } = await req.json();

    if (!saleId || !file) {
      return NextResponse.json(
        { message: "saleId and file are required" },
        { status: 400 }
      );
    }

    const newReceipt = await addReceiptToSale(saleId, file, "receipt");

    return NextResponse.json(newReceipt, { status: 200 });
  } catch (error) {
    console.error("Error adding receipt to sale:", error);
    return NextResponse.json(
      { message: "Unable to add receipt to sale" },
      { status: 500 }
    );
  }
}
