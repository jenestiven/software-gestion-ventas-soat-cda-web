import data from "./payments-types.json";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(data);
}
