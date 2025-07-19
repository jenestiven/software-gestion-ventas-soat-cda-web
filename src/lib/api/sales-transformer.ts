
import { SaleCreation, Sale } from "@/types/types";

export const transformSaleCreationToSale = (saleCreation: SaleCreation): Omit<Sale, "id" | "receipts"> => {

  const sale: Omit<Sale, "id" | "receipts"> = {
    created_at: saleCreation.date,
    payment_method_id: saleCreation.payment_method_id,
    payment_method_name: saleCreation.payment_method_name,
    client_data: {
      client_name: saleCreation.client_name,
      client_id: saleCreation.client_id,
    },
    vehicle_data: {
      vehicle_type_id: saleCreation.vehicle_type,
      vehicle_plate: saleCreation.plate,
    },
    sale_place: {
      place_name: saleCreation.seller.sales_place,
      place_id: saleCreation.seller.sales_place_id,
    },
    asesor_data: {
      name: saleCreation.seller.name,
      thumnail: saleCreation.seller.thumbnail,
    },
    paid_in_cash_value: 0, // Default value
    sale_sumary: {
      total_payed: 0,
      fixed_comission: 0,
      profit: 0,
      soat_value: saleCreation.soat_value,
      asesor_sale_commission: saleCreation.seller.sale_data.asesor_sale_commission,
      bold_to_be_deposited_value: 0,
      datafono_commission: 0,
      datafono_value: 0,
      reteica: 0,
      total_to_tranfer_costs: 0,
      gross_profit: 0,
      value_to_be_deposited: 0,
    },
    receipt_required: false,
    receipt_status: null,
    remarks: saleCreation.remarks || "",
  };

  if (saleCreation.payment_method_id === "cash") {
    console.log("entro a cash");
    sale.paid_in_cash_value = saleCreation.payment_details?.cash_value_payed;
    console.log("paid_in_cash_value:", sale.paid_in_cash_value);
    
    sale.sale_sumary.total_payed = saleCreation.payment_details.sale_summary.total_to_pay;
    sale.sale_sumary.fixed_comission = saleCreation.payment_details.sale_summary.fixed_commission;
    sale.sale_sumary.profit = saleCreation.payment_details.sale_summary.profit;
  } else if (saleCreation.payment_method_id === "credit_card") {
    console.log("payment_details:", saleCreation.payment_details);
    
    
    sale.sale_sumary.datafono_commission = saleCreation.payment_details.sale_summary.datafono_commission;
    console.log("datafono_commission:", sale.sale_sumary.datafono_commission);
    
    sale.sale_sumary.client_commission = saleCreation.payment_details.sale_summary.client_commission;
    console.log("client_commission:", sale.sale_sumary.client_commission);
    
    sale.sale_sumary.fixed_comission = saleCreation.payment_details.sale_summary.fixed_commission;
    sale.sale_sumary.reteica = saleCreation.payment_details.sale_summary.reteica;
    sale.sale_sumary.bold_to_be_deposited_value = saleCreation.payment_details.sale_summary.bold_deposit_value;
    sale.sale_sumary.total_to_tranfer_costs = saleCreation.payment_details.sale_summary.total_cost_transfer;
    sale.sale_sumary.profit = saleCreation.payment_details.sale_summary.profit;
    sale.sale_sumary.total_payed = saleCreation.payment_details.sale_summary.total_to_pay;
    console.log("total_payed:", sale.sale_sumary.total_payed);
    
  } else if (saleCreation.payment_method_id === "addi") {
    sale.receipt_required = true;
    sale.receipt_status = "pending";
    sale.sale_sumary.fixed_comission = saleCreation.payment_details.sale_summary.fixed_commission;
    sale.sale_sumary.profit = saleCreation.payment_details.sale_summary.profit;
    sale.sale_sumary.gross_profit = saleCreation.payment_details.sale_summary.gross_profit;
    sale.sale_sumary.value_to_be_deposited = saleCreation.payment_details.sale_summary.value_to_deposit;
  } else if (saleCreation.payment_method_id === "sistecredito") {
    sale.receipt_required = true;
    sale.receipt_status = "pending";
    sale.sale_sumary.fixed_comission = saleCreation.payment_details.sale_summary.fixed_commission;
    sale.sale_sumary.profit = saleCreation.payment_details.sale_summary.profit;
    sale.sale_sumary.gross_profit = saleCreation.payment_details.sale_summary.gross_profit;
    sale.sale_sumary.value_to_be_deposited = saleCreation.payment_details.sale_summary.value_to_deposit;
  } else if (saleCreation.payment_method_id === "brilla") {
    sale.receipt_required = true;
    sale.receipt_status = "pending";
    sale.sale_sumary.fixed_comission = saleCreation.payment_details.sale_summary.fixed_commission;
    sale.sale_sumary.profit = saleCreation.payment_details.sale_summary.profit;
    sale.sale_sumary.gross_profit = saleCreation.payment_details.sale_summary.gross_profit;
  }

  return sale;
};
