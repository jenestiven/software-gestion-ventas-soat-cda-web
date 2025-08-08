import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseClient";
import useStore from "@/store";
import { useState } from "react";
import { loginServerApi } from "@/lib/api/login";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const { setUser } = useStore();

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const idToken = await userCredential.user.getIdToken();

    // Send the ID token to your backend to create a session cookie 
    const response = await loginServerApi(idToken);
    
    const firebaseUser = userCredential.user;
    const userDocRef = doc(db, "users", firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      console.error("❌ No se encontró el documento del usuario en Firestore.");
      throw new Error("Perfil de usuario no encontrado.");
    }

    const userData = userDoc.data();
    const { role, sales_place } = userData;

    if (!sales_place) {
      console.error("❌ El usuario no tiene un lugar de venta asignado en Firestore.");
      throw new Error("El usuario no tiene un lugar de venta asignado.");
    }

    const salesPlaceId = sales_place;
    const placeDocRef = doc(db, "places", salesPlaceId);

    try {
      const placeDoc = await getDoc(placeDocRef);
      if (!placeDoc.exists()) {
        console.error("❌ No se encontró el documento del lugar de venta en Firestore.");
        throw new Error("Lugar de venta no encontrado.");
      }

      const salesPlaceData = placeDoc.data();

      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: userData.name,
        thumbnail: userData.thumbnail,
        role: role,
        sales_place: salesPlaceData.place_name,
        sales_place_id: salesPlaceId,
        main_place: salesPlaceData.main_place || false,
      });
    } catch (error) {
      console.error(
        "❌ Error al obtener el documento del lugar de venta:",
        error
      );
      throw new Error("No se pudo obtener la información del lugar de venta.");
    }

    return role;
  };

  return { login, setLoading, loading };
}
