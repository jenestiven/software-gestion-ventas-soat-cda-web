"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase/firebaseClient";
import { doc, getDoc } from "firebase/firestore";
import useStore from "@/store";

export function useSessionValidator() {
  const { setUser, clearUser } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Opcional: cargar de Firestore para roles actualizados
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const salesPlaceId = userData.sales_place;

            if (!salesPlaceId) {
              console.error(
                "❌ El usuario no tiene un lugar de venta asignado."
              );
              clearUser();
              return;
            }

            const placeDocRef = doc(db, "places", salesPlaceId);
            const placeDoc = await getDoc(placeDocRef);
            if (placeDoc.exists()) {
              const salesPlaceData = placeDoc.data();
              
              setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                name: userData.name,
                thumbnail: userData.thumbnail,
                role: userData.role,
                sales_place: salesPlaceData.place_name,
                sales_place_id: salesPlaceId,
                main_place: salesPlaceData.main_place || false,
              });
            }
          } else {
            console.error(
              "❌ No se encontró el documento del usuario en Firestore"
            );
            clearUser();
          }
        } catch (err) {
          console.error("❌ Error recuperando el usuario:", err);
          clearUser();
        }
      } else {
        clearUser();
      }
    });

    return () => unsubscribe();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
}
