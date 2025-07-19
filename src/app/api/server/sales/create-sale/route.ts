import { createSale } from "@/services/sales/sales";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const saleData = await req.json();

    const sale = await createSale(saleData);
    return NextResponse.json(
      { message: "Venta guardada con éxito", data: sale },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en el endpoint de creación de venta:", error);
    return NextResponse.json(
      { message: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
