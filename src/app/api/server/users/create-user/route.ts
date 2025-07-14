import { NextResponse } from "next/server";
import { createUser } from "@/services/users";

export async function POST(request: Request) {
  const data = await request.json();

  const user = await createUser(data);
  return NextResponse.json(user);
}
