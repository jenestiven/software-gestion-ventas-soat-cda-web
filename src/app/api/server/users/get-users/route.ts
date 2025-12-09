export const dynamic = 'force-dynamic';

import { getUsers } from "@/services/users";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getUsers();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener los usuarios" }, { status: 500 });
  }
}
