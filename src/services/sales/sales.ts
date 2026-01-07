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
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export async function createSale(saleData: Omit<Sale, "id" | "receipts">) {
  try {
    const saleRef = db.collection("sales").doc();
    const saleId = saleRef.id;

    let fileUrl: string | null = null;
    let receiptType: "brilla-contract" | "pagare" | "invoice" | "transfer-proof" | null = null;
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
    } else if (
      saleData.payment_method_id === "cash" && saleData.transfer_proof
    ) {
      file = saleData.transfer_proof;
      const matches = file.match(/^data:(.+);base64,/);
      mimeType = matches ? matches[1] : "aplication/ocret-stream";
      if (!matches) {
        console.warn("could not determine mime type from base64 stirng. Defaulting to application/octet-stream")
      }
      receiptType ="transfer-proof"
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
    delete finalSaleData.transfer_proof;

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
        place_profit: saleData.sale_sumary.place_total_gains,
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

    const totalUtilityCurrentMonth = salesCurrentMonth.reduce(
      (acc, sale) => acc + (sale?.place_profit ?? 0),
      0
    );
    const totalUtilityLastMonth = salesLastMonth.reduce(
      (acc, sale) => acc + (sale?.place_profit ?? 0),
      0
    );

    const netEarningsCurrentMonth = totalUtilityCurrentMonth;
    const netEarningsLastMonth = totalUtilityLastMonth;

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
      netEarnings: Math.round(netEarningsCurrentMonth),
      salesGrowth,
      salesQuantity: salesCurrentMonth.length,
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

export async function getSalesByPayMethod(
  startYear?: number,
  startMonth?: number,
  endYear?: number,
  endMonth?: number
): Promise<SalesByPayMethodData[]> {
  try {
    const sales = await getAllSales();

    const hasDateRange =
      startYear && startMonth && endYear && endMonth;

    const startDate = hasDateRange
      ? dayjs(`${startYear}-${startMonth}-01`).startOf('month')
      : dayjs().startOf('month');
    const endDate = hasDateRange
      ? dayjs(`${endYear}-${endMonth}-01`).endOf('month')
      : dayjs().endOf('month');

    const salesByMethod: Record<
      string,
      { sales_quantity: number; sales_amount: number; profit: number }
    > = {};

    sales.forEach((sale) => {
      const saleDate = dayjs(sale.created_at);
      const payMethodId = sale.payment_method_id;
      const totalPayed = sale.sale_sumary.total_payed;
      const profit = sale.sale_sumary.profit || 0;

      if (saleDate.isAfter(startDate) && saleDate.isBefore(endDate)) {
        if (!salesByMethod[payMethodId]) {
          salesByMethod[payMethodId] = {
            sales_quantity: 0,
            sales_amount: 0,
            profit: 0,
          };
        }
        salesByMethod[payMethodId].sales_quantity += 1;
        salesByMethod[payMethodId].sales_amount += totalPayed;
        salesByMethod[payMethodId].profit += profit;
      }
    });

    const result: SalesByPayMethodData[] = [];

    for (const payMethodId in salesByMethod) {
      const currentSales = salesByMethod[payMethodId];

      const payMethodName =
        sales.find((s) => s.payment_method_id === payMethodId)
          ?.payment_method_name || payMethodId;

      result.push({
        id: payMethodId,
        pay_method: payMethodName,
        sales_quantity: currentSales.sales_quantity,
        sales_amount: Math.round(currentSales.sales_amount),
        profit: Math.round(currentSales.profit),
      });
    }

    return result;
  } catch (error) {
    console.error('Error getting sales by pay method:', error);
    throw new Error('Unable to get sales by pay method');
  }
}

export async function getBetterSellers(
  startYear?: number,
  startMonth?: number,
  endYear?: number,
  endMonth?: number
): Promise<BetterSeller[]> {
  try {
    const sales = await getAllSales();

    const hasDateRange =
      startYear && startMonth && endYear && endMonth;

    const startDate = hasDateRange
      ? dayjs(`${startYear}-${startMonth}-01`).startOf('month')
      : dayjs().startOf('month');
    const endDate = hasDateRange
      ? dayjs(`${endYear}-${endMonth}-01`).endOf('month')
      : dayjs().endOf('month');

    const asesorSales: Record<
      string,
      {
        name: string;
        photo: string;
        place: string;
        currentMonth: { sells: number; amount: number; profit: number };
        lastMonth: { sells: number; amount: number }; // This can be simplified
      }
    > = {};

    sales.forEach((sale) => {
      const saleDate = dayjs(sale.created_at);
      const asesorId = sale.asesor_data.uid;
      const asesorName = sale.asesor_data.name;
      const asesorPhoto = sale.asesor_data.thumnail;
      const salesPlace = sale.sale_place.place_name;
      const totalPayed = sale.sale_sumary.total_payed;
      const profit = sale.sale_sumary.profit || 0;

      if (!asesorSales[asesorId]) {
        asesorSales[asesorId] = {
          name: asesorName,
          photo: asesorPhoto,
          place: salesPlace,
          currentMonth: { sells: 0, amount: 0, profit: 0 },
          lastMonth: { sells: 0, amount: 0 }, // Simplified for now
        };
      }

      if (saleDate.isAfter(startDate) && saleDate.isBefore(endDate)) {
        asesorSales[asesorId].currentMonth.sells += 1;
        asesorSales[asesorId].currentMonth.amount += totalPayed;
        asesorSales[asesorId].currentMonth.profit += profit;
      }
    });

    const betterSellers: BetterSeller[] = Object.entries(asesorSales)
      .map(([id, data]) => {
        return {
          id,
          name: data.name,
          photo: data.photo,
          sells: data.currentMonth.sells,
          amount: Math.round(data.currentMonth.amount),
          profit: Math.round(data.currentMonth.profit),
          place: data.place,
        };
      })
      .filter((seller) => seller.sells > 0) // Only include sellers with sales in the period
      .sort((a, b) => b.amount - a.amount) // Sort by sales amount (descending)
      .slice(0, 5); // Get top 5

    return betterSellers;
  } catch (error) {
    console.error('Error getting better sellers:', error);
    throw new Error('Unable to get better sellers');
  }
}

export async function getSalesByPlace(
  startYear?: number,
  startMonth?: number,
  endYear?: number,
  endMonth?: number
): Promise<SalesByPlaceData[]> {
  try {
    const allSalesPlaces = await getSalesPlaces();
    const sales = await getAllSales();

    const hasDateRange =
      startYear && startMonth && endYear && endMonth;

    const startDate = hasDateRange
      ? dayjs(`${startYear}-${startMonth}-01`).startOf('month')
      : dayjs().startOf('month');
    const endDate = hasDateRange
      ? dayjs(`${endYear}-${endMonth}-01`).endOf('month')
      : dayjs().endOf('month');

    const placeSales: Record<
      string,
      {
        place_name: string;
        currentMonth: {
          sales_quantity: number;
          sales_amount: number;
          sales_profit: number;
          cash_profit: number;
          credit_profit: number;
        };
        lastMonth: {
          sales_quantity: number;
          sales_amount: number;
          sales_profit: number;
          cash_profit: number;
          credit_profit: number;
        };
      }
    > = {};

    // Initialize all sales places with zero sales
    allSalesPlaces.forEach((place) => {
      placeSales[place.id] = {
        place_name: place.place_name,
        currentMonth: {
          sales_quantity: 0,
          sales_amount: 0,
          sales_profit: 0,
          cash_profit: 0,
          credit_profit: 0,
        },
        lastMonth: {
          sales_quantity: 0,
          sales_amount: 0,
          sales_profit: 0,
          cash_profit: 0,
          credit_profit: 0,
        },
      };
    });

    sales.forEach((sale) => {
      const saleDate = dayjs(sale.created_at);
      const placeId = sale.sale_place.place_id;
      const totalPayed = sale.sale_sumary.total_payed;
      const profit = sale.sale_sumary.profit || 0;

      if (placeSales[placeId]) {
        if (saleDate.isAfter(startDate) && saleDate.isBefore(endDate)) {
          placeSales[placeId].currentMonth.sales_quantity += 1;
          placeSales[placeId].currentMonth.sales_amount += totalPayed;
          placeSales[placeId].currentMonth.sales_profit += profit;

          if (
            sale.payment_method_id === 'cash' ||
            sale.payment_method_id === 'dataphone'
          ) {
            placeSales[placeId].currentMonth.cash_profit += profit;
          } else if (
            ['sistecredito', 'addi', 'brilla'].includes(
              sale.payment_method_id
            )
          ) {
            placeSales[placeId].currentMonth.credit_profit += profit;
          }
        }
      }
    });

    const salesByPlace: SalesByPlaceData[] = Object.entries(placeSales)
      .map(([id, data]) => {
        return {
          id,
          place_name: data.place_name,
          sales_quantity: data.currentMonth.sales_quantity,
          sales_profit: Math.round(data.currentMonth.sales_profit),
          sales_amount: Math.round(data.currentMonth.sales_amount),
          cash_profit: Math.round(data.currentMonth.cash_profit),
          credit_profit: Math.round(data.currentMonth.credit_profit),
        };
      })
      .filter((place) => place.sales_quantity > 0)
      .sort((a, b) => b.sales_amount - a.sales_amount);

    return salesByPlace;
  } catch (error) {
    console.error('Error getting sales by place:', error);
    throw new Error('Unable to get sales by place');
  }
}

export async function getSalesForMonths(
  year?: number,
  month?: number
): Promise<SalesForMonthsResponse> {
  try {
    const sales = await getAllSales();
    const salesByMonth: Record<
      string,
      { sales_quantity: number; sales_amount: number }
    > = {};

    const targetDate =
      year && month ? dayjs(`${year}-${month}-01`) : dayjs();

    const currentMonthKey = targetDate.format('YYYY-MM');
    const previousMonthKey = targetDate.subtract(1, 'month').format('YYYY-MM');

    for (let i = 0; i < 6; i++) {
      const month = targetDate.subtract(i, 'month');
      const monthKey = month.format('YYYY-MM');
      salesByMonth[monthKey] = { sales_quantity: 0, sales_amount: 0 };
    }

    sales.forEach((sale) => {
      const saleMonthKey = dayjs(sale.created_at).format('YYYY-MM');
      if (salesByMonth.hasOwnProperty(saleMonthKey)) {
        salesByMonth[saleMonthKey].sales_quantity += 1;
        salesByMonth[saleMonthKey].sales_amount +=
          sale.sale_sumary.total_payed;
      }
    });

    const monthsData: SalesForMonthsData[] = Object.keys(salesByMonth)
      .sort()
      .map((monthKey) => ({
        month: dayjs(monthKey).format('MMM YY'),
        sales_quantity: salesByMonth[monthKey].sales_quantity,
        sales_amount: Math.round(salesByMonth[monthKey].sales_amount),
      }));

    const currentMonthSalesAmount =
      salesByMonth[currentMonthKey]?.sales_amount || 0;
    const previousMonthSalesAmount =
      salesByMonth[previousMonthKey]?.sales_amount || 0;

    let growth = 0;
    if (previousMonthSalesAmount > 0) {
      growth =
        ((currentMonthSalesAmount - previousMonthSalesAmount) /
          previousMonthSalesAmount) *
        100;
    } else if (currentMonthSalesAmount > 0) {
      growth = 100; // Infinite growth from zero
    }

    return {
      monthsData,
      growth: parseFloat(growth.toFixed(2)),
    };
  } catch (error) {
    console.error('Error getting sales for months:', error);
    throw new Error('Unable to get sales for months');
  }
}

export async function addReceiptToSale(
  saleId: string,
  file: string,
  receiptType: "brilla-contract" | "pagare" | "invoice" | "receipt"
) {
  try {
    const saleRef = db.collection("sales").doc(saleId);
    const saleDoc = await saleRef.get();

    if (!saleDoc.exists) {
      throw new Error("Sale not found");
    }

    const saleData = saleDoc.data() as Sale;

    const matches = file.match(/^data:(.+);base64,/);
    const mimeType = matches ? matches[1] : "application/octet-stream";
    if (!matches) {
      console.warn(
        "Could not determine mime type from base64 string. Defaulting to application/octet-stream."
      );
    }

    const fileUrl = await uploadBase64FileAndGetUrl(
      file,
      mimeType,
      `${receiptType}_${saleId}.${mimeType?.split("/")[1]}`,
      `sales/${saleId}`
    );

    const newReceipt = {
      id: `${receiptType}_${saleId}_${new Date().getTime()}`,
      uploaded_at: new Date().toISOString(),
      receipt_url: fileUrl,
      receipt_type: receiptType,
    };

    const updatedReceipts = saleData.receipts
      ? [...saleData.receipts, newReceipt]
      : [newReceipt];

    await saleRef.update({ receipts: updatedReceipts, receipt_status: "delivered" });

        return newReceipt;

      } catch (error) {

        console.error("Error adding receipt to sale:", error);

        throw new Error("Unable to add receipt to sale");

      }

    }

    

    export async function getSalesByYear(): Promise<Record<string, SalesForMonthsData[]>> {

    

      try {

    

        const sales = await getAllSales();

    

        const salesByYear: Record<string, Record<string, { sales_quantity: number; sales_amount: number; profit: number }>> = {};

    

    

    

        sales.forEach((sale) => {

    

          const saleDate = dayjs(sale.created_at);

    

          const year = saleDate.format('YYYY');

    

          const month = saleDate.format('MMM');

    

    

    

          if (!salesByYear[year]) {

    

            salesByYear[year] = {};

    

            for (let i = 0; i < 12; i++) {

    

              const monthName = dayjs().month(i).format('MMM');

    

              salesByYear[year][monthName] = { sales_quantity: 0, sales_amount: 0, profit: 0 };

    

            }

    

          }

    

          

    

          salesByYear[year][month].sales_quantity += 1;

    

          salesByYear[year][month].sales_amount += sale.sale_sumary.total_payed;

    

          salesByYear[year][month].profit += sale.sale_sumary.profit || 0;

    

        });

    

    

    

        const result: Record<string, SalesForMonthsData[]> = {};

    

        for (const year in salesByYear) {

    

          result[year] = Object.keys(salesByYear[year])

    

            .map((month) => ({

    

              month,

    

              sales_quantity: salesByYear[year][month].sales_quantity,

    

              sales_amount: Math.round(salesByYear[year][month].sales_amount),

    

              profit: Math.round(salesByYear[year][month].profit),

    

            }))

    

            .sort((a, b) => dayjs(a.month, 'MMM').month() - dayjs(b.month, 'MMM').month());

    

        }

    

    

    

        return result;

    

      } catch (error) {

    

        console.error('Error getting sales by year:', error);

    

        throw new Error('Unable to get sales by year');

    

      }

    

    }
