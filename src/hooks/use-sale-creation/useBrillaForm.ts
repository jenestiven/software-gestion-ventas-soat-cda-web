
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
};

export default function useBrillaForm(props: Props) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const router = useRouter();

  const user = useStore((state) => state.user);

  const [fixedCommission, setFixedCommission] = useState(0);
  const [partnersCommission, setPartnersCommission] = useState(
    user?.sale_data?.asesor_sale_commission || 0
  );
  const [totalToPay, setTotalToPay] = useState(0);
  const [profit, setProfit] = useState(0);
  const [grossProfit, setGrossProfit] = useState(0);

  const vehicleType = Form.useWatch("vehicle_type", form);
  const financedAmount = Form.useWatch("financed_amount", form);
  const soatValue = Form.useWatch("soat_value", form);

  useEffect(() => {
    const profitValue = (financedAmount || 0) - totalToPay;
    setProfit(Number(profitValue.toFixed(1)));

    const grossProfitValue =
      partnersCommission === profit ? profit : profit - partnersCommission;
    setGrossProfit(Number(grossProfitValue.toFixed(1)));
  }, [totalToPay, financedAmount, partnersCommission, profit]);

  useEffect(() => {
    if (!vehicleType) return;
    const type = vehicleType.toLowerCase();

    const value = type === "motorcycle" ? 15000 : 0;
    setFixedCommission(value);
  }, [vehicleType]);

  useEffect(() => {
    const value = (soatValue || 0) + fixedCommission;
    setTotalToPay(Number(value.toFixed(1)));
  }, [soatValue, fixedCommission]);

  const onFinish = async (values: any) => {
    try {
      message.loading("Registrando venta...", 0);
      let file = null;
      if (fileList?.length > 0 && fileList[0]?.originFileObj) {
        file = await getBase64(fileList[0]?.originFileObj as FileType);
      }

      const saleData = {
        ...values,
        contract_file: file,
        seller: user,
        payment_method_id: props.method?.id,
        payment_method_name: props.method?.name,
        sale_summary: {
          fixed_commission: fixedCommission,
          partners_commission: partnersCommission,
          profit: profit,
          gross_profit: grossProfit,
          total_to_pay: totalToPay,
        },
      };

      await saveSaleApi(saleData);
      message.success("Venta registrada exitosamente");
      props.onCloseModal(false);
      form.resetFields();
      setFileList([]);
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
    onFinish,
    fixedCommission,
    partnersCommission,
    profit,
    grossProfit,
    totalToPay,
  };
}
