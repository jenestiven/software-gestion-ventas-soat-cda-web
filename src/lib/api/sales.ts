import { SaleCreation } from "@/types/types";

export const saveSaleApi = async (saleData: SaleCreation) => {
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

export const uploadComprobanteApi = async (saleId: string, file: string) => {
  try {
    const response = await fetch("/api/server/sales/upload-comprobante", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ saleId, file }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al subir el comprobante");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en uploadComprobanteApi:", error);
    throw error;
  }
};

export const deleteSaleApi = async (id: string) => {
  try {
    const response = await fetch("/api/server/sales/delete-sale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al eliminar la venta");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en deleteSaleApi:", error);
    throw error;
  }
};

