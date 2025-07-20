import { auth, db } from "@/firebase/firebaseAdmin";
import { DbUser, UserForCreate, UserForUpdate } from "@/types/types";
import { uploadBase64FileAndGetUrl } from "../storage";
import { NextResponse } from "next/server";
import { getSalesPlaces } from "../sales-places";

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

export async function getUsers() {
  try {
    const userCollection = db.collection("users");
    const snapshot = await userCollection.get();
    const users: DbUser[] = [];
    snapshot.forEach((doc) => {
      const userData = doc.data();
      const user: DbUser = {
        uid: doc.id,
        email: userData.email,
        name: userData.name,
        tel: userData.tel,
        role: userData.role,
        active: userData.active,
        sales_place: userData.sales_place || null,
        thumbnail: userData.thumbnail,
      };
      users.push(user);
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [] as DbUser[];
  }
}

export async function updateUser(data: UserForUpdate) {
  try {
    const { uid, name, tel, role, sales_place, file } = data;

    // Actualizar la foto de perfil si se proporcionó una nueva
    const thumbnailUrl = file
      ? await uploadBase64FileAndGetUrl(
          file,
          "image/jpeg",
          `thumbnail_${uid}.jpg`,
          uid
        )
      : null;

    // Actualizar en Firebase Auth
    await auth.updateUser(uid, {
      displayName: name,
      photoURL: thumbnailUrl || undefined,
    });

    // Actualizar en Firestore
    const userRef = db.collection("users").doc(uid);
    const updatedData: any = {
      name,
      tel,
      role,
      sales_place: sales_place || null,
    };

    if (thumbnailUrl) {
      updatedData.thumbnail = thumbnailUrl;
    }

    await userRef.update(updatedData);

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function deleteUser(uid: string) {
  try {
    // Eliminar de Firebase Authentication
    await auth.deleteUser(uid);

    // Eliminar de Firestore
    await db.collection("users").doc(uid).delete();

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting user:", error);
    if (error.code === "auth/user-not-found") {
      throw new Error("User not found");
    }
    throw new Error("Failed to delete user");
  }
}

export async function getUsersStats() {
  try {
    const users = await getUsers();
    const places = await getSalesPlaces();

    let adminUsers = 0;
    let asesorUsers = 0;
    let activeUsers = 0;
    let salesPlacesCount = 0;

    if (Array.isArray(users)) {
      adminUsers = users.filter((user: DbUser) => user.role === "admin").length;
      asesorUsers = users.filter(
        (user: DbUser) => user.role === "asesor"
      ).length;
      activeUsers = users.filter((user: DbUser) => user.active).length;
    }

    if (Array.isArray(places)) {
      salesPlacesCount = places.length;
    }

    return {
      activeUsers,
      adminUsers,
      asesorUsers,
      salesPlacesCount,
    };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return {
      activeUsers: 0,
      adminUsers: 0,
      asesorUsers: 0,
      salesPlacesCount: 0,
    };
  }
}
