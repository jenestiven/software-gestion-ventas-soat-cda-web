import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";
import useStore from "@/store";
import { useRouter } from "next/navigation";

export function useLogin() {
  const { setUser } = useStore();
  const router = useRouter();

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
      ...firebaseUser,
      role,
      profilePicture: firebaseUser.photoURL || null,
    });

    // Redirección por rol
    if (role === "admin" || role === "superadmin") {
      router.push("/app");
    } else if (role === "asesor") {
      router.push("/asesor/dashboard");
    } else {
      throw new Error("Rol no autorizado.");
    }
  };

  return { login };
}
