import { auth, db } from "@/firebase/firebaseAdmin";
import { UserForCreate } from "@/types/types";
import { uploadBase64FileAndGetUrl } from "../storage";
import { NextResponse } from "next/server";

export async function createUser(data: UserForCreate) {
  try {
    const { email, name, tel, sales_place, rol, file, cc } = data;
    const userRecord = await auth.createUser({
      email,
      password: cc,
      displayName: name,
      providerToLink: {
        email: email,
      },
    });

    const thumbnailUrl = file
      ? await uploadBase64FileAndGetUrl(
          file,
          "image/jpeg",
          `thumbnail_${userRecord.uid}.jpg`,
          userRecord.uid
        )
      : null;

    const userCollection = db.collection("users");
    await userCollection.doc(userRecord.uid).set({
      email: userRecord.email,
      name: userRecord.displayName,
      tel,
      role: rol,
      active: true,
      sales_place: sales_place || null,
      thumbnail: file ? thumbnailUrl : null,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "User created successfully", uid: userRecord.uid },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating user:", error);

    if (error.code === "auth/email-already-exists") {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 }
      );
    } else if (error.code === "auth/invalid-password") {
      return NextResponse.json(
        { message: "Password should be at least 6 characters" },
        { status: 400 }
      );
    } else if (error.code === "auth/invalid-email") {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
