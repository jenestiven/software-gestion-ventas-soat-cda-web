import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseClient";
import useStore from "@/store";
import { useState } from "react";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const { setUser } = useStore();

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const firebaseUser = userCredential.user;
    const userDocRef = doc(db, "users", firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      console.error("❌ No se encontró el documento del usuario.");
      throw new Error("Perfil de usuario no encontrado.");
    }

    const userData = userDoc.data();
    const { role } = userData;

    setUser({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      name: userData.name,
      thumbnail: userData.thumbnail,
      role: role,
      sales_place: userData.sales_place ?? "moto gp",
    });

    return role;
  };

  return { login, setLoading, loading };
}
