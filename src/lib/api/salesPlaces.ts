export async function createSalesPlaceApi(salesPlaceData: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sales-places/create-sales-place`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(salesPlaceData),
    }
  );
  if (!res.ok) throw new Error("Error creando lugar de venta");
  return await res.json();
}

export async function getSalesPlacesApi() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sales-places/get-sales-places`
  );
  if (!res.ok) throw new Error("Error obteniendo lugares de venta");
  return await res.json();
}

export async function getSalesPlaceByIdApi(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sales-places/${id}`
  );
  if (!res.ok) throw new Error("Error obteniendo lugar de venta");
  return await res.json();
}

export async function updateSalesPlaceApi(salesPlaceData: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sales-places/update-sales-place`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(salesPlaceData),
    }
  );
  if (!res.ok) throw new Error("Error actualizando lugar de venta");
  return await res.json();
}

export async function deleteSalesPlaceApi(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sales-places/delete-sales-place`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }
  );
  if (!res.ok) throw new Error("Error eliminando lugar de venta");
  return await res.json();
}
