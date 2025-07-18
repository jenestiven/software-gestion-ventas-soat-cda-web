import { updateUser } from "@/services/users";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    return await updateUser(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request" },
      { status: 400 }
    );
  }
}
