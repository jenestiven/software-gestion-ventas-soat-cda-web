import { db } from "@/firebase/firebaseAdmin";
import {
  Sell,
  Sale,
  SalesByPayMethodData,
  BetterSeller,
  SalesByPlaceData,
  SalesForMonthsData,
  SalesForMonthsResponse,
} from "@/types/types";
import { uploadBase64FileAndGetUrl } from "../storage";
import { getSalesPlaces } from "../sales-places";
import dayjs from "dayjs";

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
        //aqui debo poner la data de la ganancia
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

export async function getAllSales(): Promise<Sale[]> {
  try {
    const salesCollection = db.collection("sales");
    const salesSnapshot = await salesCollection.get();
    const sales: Sale[] = salesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Sale[];
    return sales;
  } catch (error) {
    console.error("Error getting all sales:", error);
    throw new Error("Unable to get all sales");
  }
}

export async function getSalesByPayMethod(): Promise<SalesByPayMethodData[]> {
  try {
    const sales = await getAllSales();

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentMonthSales: Record<
      string,
      { sales_quantity: number; sales_amount: number }
    > = {};
    const lastMonthSales: Record<
      string,
      { sales_quantity: number; sales_amount: number }
    > = {};

    sales.forEach((sale) => {
      const saleDate = new Date(sale.created_at);
      const payMethodId = sale.payment_method_id;
      const totalPayed = sale.sale_sumary.total_payed;

      if (
        saleDate.getMonth() === currentMonth &&
        saleDate.getFullYear() === currentYear
      ) {
        if (!currentMonthSales[payMethodId]) {
          currentMonthSales[payMethodId] = {
            sales_quantity: 0,
            sales_amount: 0,
          };
        }
        currentMonthSales[payMethodId].sales_quantity += 1;
        currentMonthSales[payMethodId].sales_amount += totalPayed;
      } else if (
        saleDate.getMonth() === lastMonth &&
        saleDate.getFullYear() === lastMonthYear
      ) {
        if (!lastMonthSales[payMethodId]) {
          lastMonthSales[payMethodId] = { sales_quantity: 0, sales_amount: 0 };
        }
        lastMonthSales[payMethodId].sales_quantity += 1;
        lastMonthSales[payMethodId].sales_amount += totalPayed;
      }
    });

    const salesByPayMethod: SalesByPayMethodData[] = [];

    for (const payMethodId in currentMonthSales) {
      const currentSales = currentMonthSales[payMethodId];
      const lastSales = lastMonthSales[payMethodId] || {
        sales_quantity: 0,
        sales_amount: 0,
      };

      let growth = 0;
      if (lastSales.sales_amount > 0) {
        growth =
          ((currentSales.sales_amount - lastSales.sales_amount) /
            lastSales.sales_amount) *
          100;
      } else if (currentSales.sales_amount > 0) {
        growth = 100; // Infinite growth from zero
      }

      // Find the payment method name from any sale that uses this payMethodId
      const payMethodName =
        sales.find((s) => s.payment_method_id === payMethodId)
          ?.payment_method_name || payMethodId;

      salesByPayMethod.push({
        id: payMethodId,
        pay_method: payMethodName,
        sales_quantity: currentSales.sales_quantity,
        sales_amount: currentSales.sales_amount,
        growth: parseFloat(growth.toFixed(2)),
      });
    }

    return salesByPayMethod;
  } catch (error) {
    console.error("Error getting sales by pay method:", error);
    throw new Error("Unable to get sales by pay method");
  }
}

export async function getBetterSellers(): Promise<BetterSeller[]> {
  try {
    const sales = await getAllSales();

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const asesorSales: Record<
      string,
      {
        name: string;
        photo: string;
        place: string;
        currentMonth: { sells: number; amount: number };
        lastMonth: { sells: number; amount: number };
      }
    > = {};

    sales.forEach((sale) => {
      const saleDate = new Date(sale.created_at);
      const asesorId = sale.asesor_data.uid;
      const asesorName = sale.asesor_data.name;
      const asesorPhoto = sale.asesor_data.thumnail;
      const salesPlace = sale.sale_place.place_name;
      const totalPayed = sale.sale_sumary.total_payed;

      if (!asesorSales[asesorId]) {
        asesorSales[asesorId] = {
          name: asesorName,
          photo: asesorPhoto,
          place: salesPlace,
          currentMonth: { sells: 0, amount: 0 },
          lastMonth: { sells: 0, amount: 0 },
        };
      }

      if (
        saleDate.getMonth() === currentMonth &&
        saleDate.getFullYear() === currentYear
      ) {
        asesorSales[asesorId].currentMonth.sells += 1;
        asesorSales[asesorId].currentMonth.amount += totalPayed;
      } else if (
        saleDate.getMonth() === lastMonth &&
        saleDate.getFullYear() === lastMonthYear
      ) {
        asesorSales[asesorId].lastMonth.sells += 1;
        asesorSales[asesorId].lastMonth.amount += totalPayed;
      }
    });

    const betterSellers: BetterSeller[] = Object.entries(asesorSales)
      .map(([id, data]) => {
        let growth = 0;
        if (data.lastMonth.amount > 0) {
          growth =
            ((data.currentMonth.amount - data.lastMonth.amount) /
              data.lastMonth.amount) *
            100;
        } else if (data.currentMonth.amount > 0) {
          growth = 100; // Infinite growth from zero
        }

        return {
          id,
          name: data.name,
          photo: data.photo,
          sells: data.currentMonth.sells,
          amount: data.currentMonth.amount,
          growth: parseFloat(growth.toFixed(2)),
          place: data.place,
        };
      })
      .sort((a, b) => b.amount - a.amount) // Sort by current month's sales amount (descending)
      .slice(0, 5); // Get top 5

    return betterSellers;
  } catch (error) {
    console.error("Error getting better sellers:", error);
    throw new Error("Unable to get better sellers");
  }
}

export async function getSalesByPlace(): Promise<SalesByPlaceData[]> {
  try {
    const allSalesPlaces = await getSalesPlaces();
    const sales = await getAllSales();

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const placeSales: Record<
      string,
      {
        place_name: string;
        currentMonth: { sales_quantity: number; sales_amount: number };
        lastMonth: { sales_quantity: number; sales_amount: number };
      }
    > = {};

    // Initialize all sales places with zero sales
    allSalesPlaces.forEach((place) => {
      placeSales[place.id] = {
        place_name: place.place_name,
        currentMonth: { sales_quantity: 0, sales_amount: 0 },
        lastMonth: { sales_quantity: 0, sales_amount: 0 },
      };
    });

    sales.forEach((sale) => {
      const saleDate = new Date(sale.created_at);
      const placeId = sale.sale_place.place_id;
      const totalPayed = sale.sale_sumary.total_payed;

      // Ensure the place exists in our aggregated data (it should, due to initialization)
      if (placeSales[placeId]) {
        if (
          saleDate.getMonth() === currentMonth &&
          saleDate.getFullYear() === currentYear
        ) {
          placeSales[placeId].currentMonth.sales_quantity += 1;
          placeSales[placeId].currentMonth.sales_amount += totalPayed;
        } else if (
          saleDate.getMonth() === lastMonth &&
          saleDate.getFullYear() === lastMonthYear
        ) {
          placeSales[placeId].lastMonth.sales_quantity += 1;
          placeSales[placeId].lastMonth.sales_amount += totalPayed;
        }
      }
    });

    const salesByPlace: SalesByPlaceData[] = Object.entries(placeSales)
      .map(([id, data]) => {
        let growth = 0;
        if (data.lastMonth.sales_amount > 0) {
          growth =
            ((data.currentMonth.sales_amount - data.lastMonth.sales_amount) /
              data.lastMonth.sales_amount) *
            100;
        } else if (data.currentMonth.sales_amount > 0) {
          growth = 100; // Infinite growth from zero
        }

        return {
          id,
          place_name: data.place_name,
          sales_quantity: data.currentMonth.sales_quantity,
          sales_amount: data.currentMonth.sales_amount,
          growth: parseFloat(growth.toFixed(2)),
        };
      })
      .sort((a, b) => b.sales_amount - a.sales_amount); // Sort by current month's sales amount (descending)

    return salesByPlace;
  } catch (error) {
    console.error("Error getting sales by place:", error);
    throw new Error("Unable to get sales by place");
  }
}

export async function getSalesForMonths(): Promise<SalesForMonthsResponse> {
  try {
    const sales = await getAllSales();
    const salesByMonth: Record<string, { sales_quantity: number; sales_amount: number }> = {};

    const now = dayjs();
    const currentMonthKey = now.format("YYYY-MM");
    const previousMonthKey = now.subtract(1, "month").format("YYYY-MM");

    for (let i = 0; i < 6; i++) {
      const month = dayjs().subtract(i, "month");
      const monthKey = month.format("YYYY-MM");
      salesByMonth[monthKey] = { sales_quantity: 0, sales_amount: 0 };
    }

    sales.forEach((sale) => {
      const saleMonthKey = dayjs(sale.created_at).format("YYYY-MM");
      if (salesByMonth.hasOwnProperty(saleMonthKey)) {
        salesByMonth[saleMonthKey].sales_quantity += 1;
        salesByMonth[saleMonthKey].sales_amount += sale.sale_sumary.total_payed;
      }
    });

    const monthsData: SalesForMonthsData[] = Object.keys(salesByMonth)
      .sort()
      .map((monthKey) => ({
        month: dayjs(monthKey).format("MMM YY"),
        sales_quantity: salesByMonth[monthKey].sales_quantity,
        sales_amount: parseFloat(salesByMonth[monthKey].sales_amount.toFixed(2)),
      }));

    const currentMonthSalesAmount = salesByMonth[currentMonthKey]?.sales_amount || 0;
    const previousMonthSalesAmount = salesByMonth[previousMonthKey]?.sales_amount || 0;

    let growth = 0;
    if (previousMonthSalesAmount > 0) {
      growth = ((currentMonthSalesAmount - previousMonthSalesAmount) / previousMonthSalesAmount) * 100;
    } else if (currentMonthSalesAmount > 0) {
      growth = 100; // Infinite growth from zero
    }

    return {
      monthsData,
      growth: parseFloat(growth.toFixed(2)),
    };
  } catch (error) {
    console.error("Error getting sales for months:", error);
    throw new Error("Unable to get sales for months");
  }
}
