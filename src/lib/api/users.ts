export async function createUserApi(userData: any) {
  const res = await fetch("/api/server/users/create-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Error creando usuario");
  return await res.json();
}

