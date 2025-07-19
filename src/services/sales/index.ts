'''import { RawSaleData, Sale } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

export function buildSaleObject(rawData: RawSaleData): Sale {
  const commonData = {
    id: uuidv4(),
    seller_id: rawData.seller_id,
    client_name: rawData.client_name,
    client_id: rawData.client_id,
    plate: rawData.plate,
    vehicle_type: rawData.vehicle_type,
    soat_value: rawData.soat_value,
    soat_state: rawData.soat_state,
    soat_payed: rawData.soat_payed,
    date: rawData.date,
    remarks: rawData.remarks,
  };

  if (rawData.sale_summary?.addi_commission !== undefined) {
    return {
      ...commonData,
      payment_method: "addi",
      payment_details: {
        financed_amount: rawData.financed_amount!,
        invoice_number: rawData.invoice_number!,
        invoice_image: rawData.invoice_image,
        sale_summary: rawData.sale_summary,
      },
    };
  } else if (rawData.sale_summary?.sistecredito_commission !== undefined) {
    return {
      ...commonData,
      payment_method: "sistecredito",
      payment_details: {
        financed_amount: rawData.financed_amount!,
        pagare_number: rawData.pagare_number!,
        pagare_image: rawData.pagare_image,
        sis_status: rawData.sis_status!,
        sale_summary: rawData.sale_summary,
      },
    };
  } else if (rawData.brilla_contract_number !== undefined) {
    return {
      ...commonData,
      payment_method: "brilla",
      payment_details: {
        financed_amount: rawData.financed_amount!,
        brilla_contract_number: rawData.brilla_contract_number!,
        contract_image: rawData.contract_image,
        proceedings: rawData.proceedings,
        brilla_payed: rawData.brilla_payed!,
        sale_summary: rawData.sale_summary,
      },
    };
  } else if (rawData.sale_summary?.datafono_commission !== undefined) {
    return {
      ...commonData,
      payment_method: "credit_card",
      payment_details: {
        cash_value_payed: rawData.cash_value_payed!,
        credit_type: rawData.credit_type!,
        sale_summary: rawData.sale_summary,
      },
    };
  } else {
    return {
      ...commonData,
      payment_method: "cash",
      payment_details: {
        cash_value_payed: rawData.cash_value_payed!,
      },
    };
  }
}
'''