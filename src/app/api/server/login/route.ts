import { auth } from "@/firebase/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  try {
    const { idToken } = await request.json();

    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });
    const response = NextResponse.json({ success: true });
    response.cookies.set("__session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    console.log({ message: "API Login: Session cookie created and set." });
    return response;
  } catch (error) {
    console.error({ message: "API Login: Entering catch block. Error:", error });
    return NextResponse.json(
      { message: "Failed to create session cookie", error },
      { status: 500 }
    );
  }
}
