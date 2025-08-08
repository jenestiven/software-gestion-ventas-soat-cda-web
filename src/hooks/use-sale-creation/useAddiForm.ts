
"use client";

import { saveSaleApi } from "@/lib/api/sales";
import useStore from "@/store";
import {
  Form,
  message,
  UploadFile,
  GetProp,
  UploadProps,
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBase64 } from "@/app/components/app/admin/users/AntdUpload";
import { PaymentMethod } from "@/types/types";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type Props = {
  onCloseModal: (open: boolean) => void;
  method: PaymentMethod | null;
}

export default function useAddiForm(props: Props) {
  const [form] = Form.useForm();
  const user = useStore((state) => state.user);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const router = useRouter();
  
  const [addiCommission, setAddiCommission] = useState(0);
  const [partnersCommission, setPartnersCommission] = useState(
    user?.sale_data?.asesor_sale_commission || 0
  );
  const [totalToPay, setTotalToPay] = useState(0);
  const [valueToDeposit, setValueToDeposit] = useState(0);
  const [fixedCommission, setFixedCommission] = useState(0);
  const [profit, setProfit] = useState(0);
  const [grossProfit, setGrossProfit] = useState(0);

  const vehicleType = Form.useWatch("vehicle_type", form);
  const financedAmount = Form.useWatch("financed_amount", form);
  const soatValue = Form.useWatch("soat_value", form);

  useEffect(() => {
    const profitValue = financedAmount - addiCommission - totalToPay;
    setProfit(Number(profitValue.toFixed(1)));

    const grossProfitValue =
      partnersCommission === profit ? profit : profit - partnersCommission;
    setGrossProfit(Number(grossProfitValue.toFixed(1)));
  }, [totalToPay, addiCommission, financedAmount, partnersCommission, profit]);

  useEffect(() => {
    if (!vehicleType) return;
    const type = vehicleType.toLowerCase();

    const value = type === "motorcycle" ? 15000 : 0;
    setFixedCommission(value);
  }, [vehicleType]);

  useEffect(() => {
    if (!financedAmount) return;
    // Calcula el 6.5% de financedAmount y luego suma el 19% de ese resultado
    const addiCommissionValue =
      financedAmount * 0.065 + financedAmount * 0.065 * 0.19;
    setAddiCommission(Number(addiCommissionValue.toFixed(1)));
  }, [financedAmount]);

  useEffect(() => {
    if (!financedAmount || !addiCommission) return;
    // Calcula el valor a consignar restando la comisión de Addi y el SOAT del valor financiado
    const value = financedAmount - addiCommission;
    setValueToDeposit(Number(value.toFixed(1)));
  }, [financedAmount, addiCommission]);

  useEffect(() => {
    const value = (soatValue || 0) + fixedCommission;
    setTotalToPay(Number(value.toFixed(1)));
  }, [soatValue, fixedCommission]);

  const handleSubmit = async (values: any) => {
    try {
      message.loading("Registrando venta...", 0);

        let file = null;
        if (fileList?.length > 0 && fileList[0]?.originFileObj) {
          file = await getBase64(fileList[0]?.originFileObj as FileType);
        }
  
      const saleData = {
        ...values,
        invoice_file: file,
        seller: user,
        payment_method_id: props.method?.id,
        payment_method_name: props.method?.name,
        sale_summary: {
          fixed_commission: fixedCommission,
          addi_commission: addiCommission,
          partners_commission: partnersCommission,
          profit: profit,
          gross_profit: grossProfit,
          value_to_deposit: valueToDeposit,
          total_to_pay: totalToPay,
        },
      };
      
      await saveSaleApi(saleData);
      message.success("Venta registrada exitosamente", 2);
      form.resetFields();
      setFileList([]);
      props.onCloseModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      router.refresh();
      message.destroy();
    }
  };

  return {
    form,
    fileList,
    setFileList,
    handleSubmit,
    fixedCommission,
    addiCommission,
    partnersCommission,
    profit,
    grossProfit,
    valueToDeposit,
    totalToPay,
  }
}
