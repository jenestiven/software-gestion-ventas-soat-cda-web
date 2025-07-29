import { getTariffSchedule } from "@/services/tariff";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tariff = await getTariffSchedule();
    return NextResponse.json(tariff);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tariff data" },
      { status: 500 }
    );
  }
}
