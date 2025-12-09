export async function createUserApi(userData: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/create-user`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }
  );
  if (!res.ok) throw new Error("Error creando usuario");
  return await res.json();
}

export async function getUsersApi() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/get-users`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Error obteniendo usuarios");
  return await res.json();
}

export async function updateUserApi(userData: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/update-user`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }
  );
  if (!res.ok) throw new Error("Error actualizando usuario");
  return await res.json();
}

export async function deleteUserApi(uid: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/delete-user`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid }),
    }
  );
  if (!res.ok) throw new Error("Error eliminando usuario");
  return await res.json();
}
