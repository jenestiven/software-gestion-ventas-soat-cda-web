import data from "./asesor-sells.json";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(data);
}
