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
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      name: userData.name,
      thumbnail: userData.thumbnail,
      role: role,
    });

    if (role === "admin") {
      router.push("/admin");
    } else if (role === "asesor") {
      router.push("/asesor");
    } else {
      console.error("❌ Rol no autorizado para ingresar a la plataforma.");
      throw new Error("No tienes permisos para acceder a la plataforma.");
    }
  };

  return { login };
}
