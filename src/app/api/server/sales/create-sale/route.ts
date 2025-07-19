import { createSale } from "@/services/sales/sales";
import { transformSaleCreationToSale } from "@/lib/api/sales-transformer";
import { SaleCreation } from "@/types/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const saleCreationData: SaleCreation = await req.json();
    console.log("Datos de creación de venta recibidos:", saleCreationData);
    
    const saleData = transformSaleCreationToSale(saleCreationData);
    
    console.log("Datos de venta transformados:");

    //const sale = await createSale(saleData);
    return NextResponse.json(
      { message: "Venta guardada con éxito", data: {} },
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
