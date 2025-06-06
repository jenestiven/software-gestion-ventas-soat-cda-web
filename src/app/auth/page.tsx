"use client";

import { useState, useEffect } from "react";
// import {
//   signInWithEmailAndPassword,
//   User as FirebaseUser,
// } from "firebase/auth";
//import { auth, db } from "../../../firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useStore from "@/store";
import Image from "next/image";
//import { doc, getDoc, setDoc } from "firebase/firestore";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const setUser = useStore((state) => state.setUser);
  // const initializeUser = useStore((state) => state.initializeUser);
  const [error, setError] = useState<string | null>(null);
  // const router = useRouter();

  // useEffect(() => {
  //   initializeUser();
  // }, [initializeUser]);

  // const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     // const userCredential = await signInWithEmailAndPassword(
  //     //   auth,
  //     //   email,
  //     //   password
  //     // );
  //     const user = userCredential.user;

  //     // Fetch additional user details from Firestore if available
  //     const userDocRef = doc(db, "users", user.uid); // Create a reference to the user document
  //     const userDoc = await getDoc(userDocRef);
  //     if (userDoc.exists()) {
  //       const userData = userDoc.data();
  //       setUser({
  //         ...user,
  //         profilePicture: userData?.profilePicture || null,
  //       });
  //     } else {
  //       // Create user document if it doesn't exist
  //       await setDoc(userDocRef, {
  //         email: user.email,
  //         displayName: user.displayName,
  //         profilePicture: null,
  //       });
  //       setUser(user);
  //     }

  //     setError(null);
  //     router.push("/profile");
  //   } catch (error) {
  //     setError("🤔 hmmm did you forget your password?");
  //     if (error instanceof Error) {
  //       console.error("Error signing in:", error.message);
  //     } else {
  //       console.error("Error signing in:", error);
  //     }
  //   }
  // };

  return (
    <>
      <header className="flex min-w-full border-b-2 py-2 px-4 text-accent_contrast items-center justify-start gap-4">
        <Image
          width={32}
          height={32}
          className="h-8 w-auto"
          src="/images/logo.png"
          alt="cda logo"
        />
        <h4 className="text-md font-semibold">CDA Moto GP</h4>
      </header>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            width={80}
            height={80}
            className="mx-auto h-20 w-auto"
            src="/images/logo.png"
            alt="cda logo"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-accent_contrast">
            Inicia sesión en tu cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={() => {}}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Correo electrónico
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Ingrese su correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contraseña
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingrese su contraseña"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm leading-6">
                  <Link
                    href="/auth/forgotpassword"
                    className="font-semibold text-accent_contrast hover:text-gray-900"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>
              |
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-color_mix_primary border-2 border-color_mix_primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Iniciar sesión
                </button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
