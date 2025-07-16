import { getUsers } from "@/services/users";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getUsers();
  return NextResponse.json(data);
}
