import { db } from "@/firebase/firebaseAdmin";
import { Sale } from "@/types/types";
import { uploadBase64FileAndGetUrl } from "../storage";

export async function createSale(saleData: Omit<Sale, "id" | "receipts">) {
  try {
    const saleRef = db.collection("sales").doc();
    const saleId = saleRef.id;

    let fileUrl: string | null = null;
    let receiptType: "brilla-contract" | "pagare" | "invoice" | null = null;
    let file: string | undefined;

    if (saleData.payment_method_id === "addi" && saleData.invoice_file) {
      file = saleData.invoice_file;
      receiptType = "invoice";
    } else if (
      saleData.payment_method_id === "sistecredito" &&
      saleData.pagare_file
    ) {
      file = saleData.pagare_file;
      receiptType = "pagare";
    } else if (
      saleData.payment_method_id === "brilla" &&
      saleData.contract_file
    ) {
      file = saleData.contract_file;
      receiptType = "brilla-contract";
    }

    if (file && receiptType) {
      fileUrl = await uploadBase64FileAndGetUrl(
        file,
        "image/jpeg",
        `${receiptType}_${saleId}.jpg`,
        `sales/${saleId}`
      );
    }

    const receipts =
      fileUrl && receiptType
        ? [
            {
              id: `${receiptType}_${saleId}`,
              uploaded_at: new Date().toISOString(),
              receipt_url: fileUrl,
              receipt_type: receiptType,
            },
          ]
        : [];

    const finalSaleData = {
      ...saleData,
      id: saleId,
      receipts: receipts,
    };

    await saleRef.set(finalSaleData);

    return finalSaleData;
  } catch (error) {
    console.error("Error creating sale:", error);
    throw new Error("Unable to create sale");
  }
}
