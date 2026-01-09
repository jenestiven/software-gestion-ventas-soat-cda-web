import { SaleCreation, Sale } from "@/types/types";

export const transformSaleCreationToSale = (saleCreation: SaleCreation) => {
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
      uid: saleCreation.seller.uid,
    },
    paid_in_cash_value: 0, // Default value
    sale_sumary: {
      total_payed: 0,
      fixed_comission: 0,
      profit: 0,
      soat_value: saleCreation.soat_value,
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
    sale.sale_sumary.fixed_comission =
      saleCreation.sale_summary.fixed_commission;
    sale.transfer_proof = saleCreation.transfer_proof;
    sale.receipt_status = saleCreation.transfer_proof ? "delivered" : "pending";
    sale.receipt_required = !!saleCreation.transfer_proof;
    sale.sale_sumary.profit = saleCreation.sale_summary.profit;
    sale.sale_sumary.place_total_gains = saleCreation.sale_summary.place_total_gains;
    sale.sale_sumary.total_payed = saleCreation.sale_summary.total;
  } else if (saleCreation.payment_method_id === "dataphone") {
    sale.credit_card_type = saleCreation.credit_type;
    sale.sale_sumary.datafono_commission =
      saleCreation.sale_summary.datafono_commission;
    sale.sale_sumary.client_commission =
      saleCreation.sale_summary.client_commission;
    sale.sale_sumary.fixed_comission =
      saleCreation.sale_summary.fixed_commission;
    sale.sale_sumary.reteica = saleCreation.sale_summary.reteica;
    sale.sale_sumary.profit = saleCreation.sale_summary.profit;
    sale.sale_sumary.total_payed = saleCreation.sale_summary.total_to_pay;
    sale.sale_sumary.bold_to_be_deposited_value =
      saleCreation.sale_summary.bold_deposit_value;
    sale.sale_sumary.total_to_tranfer_costs =
      saleCreation.sale_summary.total_cost_transfer;
    sale.sale_sumary.place_profit = saleCreation.sale_summary.place_profit;
    sale.sale_sumary.place_total_gains =
      saleCreation.sale_summary.place_total_gains;
  } else if (saleCreation.payment_method_id === "addi") {
    sale.receipt_required = true;
    sale.receipt_status = saleCreation.invoice_file ? "delivered" : "pending";
    sale.invoice_number = saleCreation.invoice_number;
    sale.invoice_file = saleCreation.invoice_file;
    sale.financed_amount = saleCreation.financed_amount;
    sale.sale_sumary.fixed_comission =
      saleCreation.sale_summary.fixed_commission;
    sale.sale_sumary.addi_commission =
      saleCreation.sale_summary.addi_commission;
    sale.sale_sumary.partners_commission =
      saleCreation.sale_summary.partners_commission;
    sale.sale_sumary.profit = saleCreation.sale_summary.profit;
    sale.sale_sumary.gross_profit = saleCreation.sale_summary.gross_profit;
    sale.sale_sumary.value_to_be_deposited =
      saleCreation.sale_summary.value_to_deposit;
    sale.sale_sumary.total_payed = saleCreation.sale_summary.total;
    sale.sale_sumary.place_total_gains =
      saleCreation.sale_summary.place_total_gains;
  } else if (saleCreation.payment_method_id === "sistecredito") {
    sale.receipt_required = true;
    sale.receipt_status = saleCreation.pagare_file ? "delivered" : "pending";

    sale.pagare_file = saleCreation.pagare_file;
    sale.pagare_number = saleCreation.pagare_number;

    sale.sale_sumary.fixed_comission =
      saleCreation.sale_summary.fixed_commission;

    sale.sale_sumary.sistecredito_commission =
      saleCreation.sale_summary.sistecredito_commission;
    sale.financed_amount = saleCreation.financed_amount;

    sale.sale_sumary.profit = saleCreation.sale_summary.profit;
    sale.sale_sumary.gross_profit = saleCreation.sale_summary.gross_profit;

    sale.sale_sumary.fixed_comission =
      saleCreation.sale_summary.fixed_commission;
    sale.sale_sumary.sistecredito_commission =
      saleCreation.sale_summary.partners_commission;
    sale.sale_sumary.profit = saleCreation.sale_summary.profit;
    sale.sale_sumary.gross_profit = saleCreation.sale_summary.gross_profit;
    sale.sale_sumary.total_payed = saleCreation.sale_summary.total;
    sale.sale_sumary.place_total_gains =
      saleCreation.sale_summary.place_total_gains;
  } else if (saleCreation.payment_method_id === "brilla") {
    sale.receipt_required = true;
    sale.receipt_status = saleCreation.contract_file ? "delivered" : "pending";
    sale.financed_amount = saleCreation.financed_amount;
    sale.contract_file = saleCreation.contract_file;
    sale.brilla_contract_number = saleCreation.brilla_contract_number;
    sale.sale_sumary.fixed_comission =
      saleCreation.sale_summary.fixed_commission;
    sale.sale_sumary.partners_commission =
      saleCreation.sale_summary.partners_commission;
    sale.sale_sumary.profit = saleCreation.sale_summary.profit;
    sale.sale_sumary.gross_profit = saleCreation.sale_summary.gross_profit;
    sale.sale_sumary.total_payed = saleCreation.sale_summary.total;
    sale.sale_sumary.place_total_gains =
      saleCreation.sale_summary.place_total_gains;
  }

  return sale;
};
