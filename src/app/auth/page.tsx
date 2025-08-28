"use client";

import { useState } from "react";
// import Link from "next/link";
import Image from "next/image";
import { useLogin } from "@/hooks/useLogin";
import LoadingScreen from "./loading/page";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { login, setLoading, loading } = useLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const role = await login(email, password);
      console.log("Login successful, user role:", role);

      if (role === "admin") {
        router.push("/admin");
      } else if (role === "asesor") {
        router.push("/asesor");
      } else {
        console.error("❌ Rol no autorizado para ingresar a la plataforma.");
        throw new Error("No tienes permisos para acceder a la plataforma.");
      }

    } catch (err: any) {
      console.log("Login failed:", err.message);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <main>
      <header className="bg-white flex min-w-full border-b-2 py-2 px-4 text-accent_contrast items-center justify-start gap-4">
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
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[460px] bg-white rounded-md">
          <div className="px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={(e) => handleLogin(e)}>
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
              {/* <div className="flex items-center justify-between">
                <div className="text-sm leading-6">
                  <Link
                    href="/auth/forgotpassword"
                    className="font-semibold text-accent_contrast hover:text-gray-900"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div> */}
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
    </main>
  );
}
