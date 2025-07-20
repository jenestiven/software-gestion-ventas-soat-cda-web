import { db } from "@/firebase/firebaseAdmin";
import { Sell, Sale } from "@/types/types";
import { uploadBase64FileAndGetUrl } from "../storage";

export async function createSale(saleData: Omit<Sale, "id" | "receipts">) {
  try {
    const saleRef = db.collection("sales").doc();
    const saleId = saleRef.id;

    let fileUrl: string | null = null;
    let receiptType: "brilla-contract" | "pagare" | "invoice" | null = null;
    let file: string | undefined;
    let mimeType: string | undefined;

    if (saleData.payment_method_id === "addi" && saleData.invoice_file) {
      file = saleData.invoice_file;
      const matches = file.match(/^data:(.+);base64,/);
      mimeType = matches ? matches[1] : "application/octet-stream";
      if (!matches) {
        console.warn(
          "Could not determine mime type from base64 string. Defaulting to application/octet-stream."
        );
      }
      receiptType = "invoice";
    } else if (
      saleData.payment_method_id === "sistecredito" &&
      saleData.pagare_file
    ) {
      file = saleData.pagare_file;
      const matches = file.match(/^data:(.+);base64,/);
      mimeType = matches ? matches[1] : "application/octet-stream";
      if (!matches) {
        console.warn(
          "Could not determine mime type from base64 string. Defaulting to application/octet-stream."
        );
      }
      receiptType = "pagare";
    } else if (
      saleData.payment_method_id === "brilla" &&
      saleData.contract_file
    ) {
      file = saleData.contract_file;
      const matches = file.match(/^data:(.+);base64,/);
      mimeType = matches ? matches[1] : "application/octet-stream";
      if (!matches) {
        console.warn(
          "Could not determine mime type from base64 string. Defaulting to application/octet-stream."
        );
      }
      receiptType = "brilla-contract";
    }

    if (file && receiptType) {
      fileUrl = await uploadBase64FileAndGetUrl(
        file,
        mimeType || "image/jpeg",
        `${receiptType}_${saleId}.${mimeType?.split("/")[1]}`,
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

    delete finalSaleData.invoice_file;
    delete finalSaleData.pagare_file;
    delete finalSaleData.contract_file;

    await saleRef.set(finalSaleData);

    return finalSaleData;
  } catch (error) {
    console.error("Error creating sale:", error);
    throw new Error("Unable to create sale");
  }
}

export async function getSalesByAsesor(asesorId: string): Promise<Sell[]> {
  try {
    const salesRef = db.collection("sales");
    const snapshot = await salesRef
      .where("asesor_data.uid", "==", asesorId)
      .get();
    const sales: Sell[] = [];
    snapshot.forEach((doc) => {
      const saleData = doc.data() as Sale;
      sales.push({
        id: doc.id,
        date: saleData.created_at,
        client: saleData.client_data.client_name,
        vehicle_license_plate: saleData.vehicle_data.vehicle_plate,
        vehicle_type: saleData.vehicle_data.vehicle_type_id,
        soat_value: saleData.sale_sumary.soat_value,
        total_value: saleData.sale_sumary.total_payed,
        fixed_commission: saleData.sale_sumary.fixed_comission,
        profit: saleData.sale_sumary.profit,
        asesor_sale_commission: saleData.sale_sumary.asesor_sale_commission,
        payment_method: saleData.payment_method_name,
        doc_state: saleData.receipt_status || "pending", // Default to 'pending' if null
      });
    });
    return sales;
  } catch (error) {
    console.error("Error getting sales by asesor:", error);
    throw new Error("Unable to get sales by asesor");
  }
}

export async function getStatsByAsesor(asesorId: string) {
  try {
    const sales = await getSalesByAsesor(asesorId);

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const salesCurrentMonth = sales.filter((sale) => {
      const saleDate = new Date(sale.date);
      return (
        saleDate.getMonth() === currentMonth &&
        saleDate.getFullYear() === currentYear
      );
    });

    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const salesLastMonth = sales.filter((sale) => {
      const saleDate = new Date(sale.date);
      return (
        saleDate.getMonth() === lastMonth &&
        saleDate.getFullYear() === lastMonthYear
      );
    });

    const totalSalesCurrentMonth = salesCurrentMonth.reduce(
      (acc, sale) => acc + sale.total_value,
      0
    );
    const totalSalesLastMonth = salesLastMonth.reduce(
      (acc, sale) => acc + sale.total_value,
      0
    );

    const salesGrowth =
      totalSalesLastMonth > 0
        ? ((totalSalesCurrentMonth - totalSalesLastMonth) /
            totalSalesLastMonth) *
          100
        : totalSalesCurrentMonth > 0
        ? 100
        : 0;

    const totalCommissionCurrentMonth = salesCurrentMonth.reduce(
      (acc, sale) =>
        acc +
        (sale?.fixed_commission ?? 0) +
        (sale?.asesor_sale_commission ?? 0),
      0
    );
    const totalCommissionLastMonth = salesLastMonth.reduce(
      (acc, sale) =>
        acc +
        (sale?.fixed_commission ?? 0) +
        (sale?.asesor_sale_commission ?? 0),
      0
    );

    const commissionGrowth =
      totalCommissionLastMonth > 0
        ? ((totalCommissionCurrentMonth - totalCommissionLastMonth) /
            totalCommissionLastMonth) *
          100
        : totalCommissionCurrentMonth > 0
        ? 100
        : 0;

    const totalUtilityCurrentMonth = salesCurrentMonth.reduce(
      (acc, sale) => acc + (sale?.profit ?? 0),
      0
    );
    const totalUtilityLastMonth = salesLastMonth.reduce(
      (acc, sale) => acc + (sale?.profit ?? 0),
      0
    );

    const utilityGrowth =
      totalUtilityLastMonth > 0
        ? ((totalUtilityCurrentMonth - totalUtilityLastMonth) /
            totalUtilityLastMonth) *
          100
        : totalUtilityCurrentMonth > 0
        ? 100
        : 0;

    const netEarningsCurrentMonth =
      totalUtilityCurrentMonth + totalCommissionCurrentMonth;
    const netEarningsLastMonth =
      totalUtilityLastMonth + totalCommissionLastMonth;

    const netEarningsGrowth =
      netEarningsLastMonth > 0
        ? ((netEarningsCurrentMonth - netEarningsLastMonth) /
            netEarningsLastMonth) *
          100
        : netEarningsCurrentMonth > 0
        ? 100
        : 0;

    return {
      totalSalesValue: Math.round(totalSalesCurrentMonth),
      totalCommission: Math.round(totalCommissionCurrentMonth),
      totalUtility: Math.round(totalUtilityCurrentMonth),
      netEarnings: Math.round(netEarningsCurrentMonth),
      salesGrowth,
      commissionGrowth,
      utilityGrowth,
      earningsGrowth: netEarningsGrowth,
    };
  } catch (error) {
    console.error("Error getting stats by asesor:", error);
    throw new Error("Unable to get stats by asesor");
  }
}
