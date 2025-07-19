import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const saleData = await req.json();

    // Aquí puedes añadir la lógica para guardar en Firestore
    console.log("Datos de la venta recibidos en el servidor:", saleData);

    return NextResponse.json(
      { message: "Venta guardada con éxito", data: saleData },
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