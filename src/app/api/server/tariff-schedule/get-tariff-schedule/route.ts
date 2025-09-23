import { getTariffSchedule } from "@/services/tariff";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tariff = await getTariffSchedule();

    console.log({ message: "GET Tariff Schedule: Success", tariff });
    return NextResponse.json(tariff);
  } catch (error) {
    console.error({ message: "GET Tariff Schedule: Error", error });
    return NextResponse.json(
      { error: "Failed to fetch tariff data" },
      { status: 500 }
    );
  }
}
