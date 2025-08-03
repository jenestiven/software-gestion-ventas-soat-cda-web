
import { NextResponse } from "next/server";
import { processConciliationFile } from "@/services/invoices/invoices";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const paymentMethod = formData.get("paymentMethod") as string | null;

    if (!file || !paymentMethod) {
      return NextResponse.json({ error: "Archivo o método de pago no proporcionado." }, { status: 400 });
    }

    const ids = await processConciliationFile(file, paymentMethod);

    return NextResponse.json({ ids });

  } catch (error) {
    console.error("Error processing excel file:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: "Error interno del servidor.", details: errorMessage }, { status: 500 });
  }
}
