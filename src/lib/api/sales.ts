export const saveSaleApi = async (saleData: any) => {
  try {
    const response = await fetch("/api/server/sales/create-sale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saleData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al guardar la venta");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en saveSaleApi:", error);
    throw error;
  }
};