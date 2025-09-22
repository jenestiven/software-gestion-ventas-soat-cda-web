"use client";

import { saveSaleApi } from "@/lib/api/sales";
import useStore from "@/store";
import { Form, message, UploadFile, GetProp, UploadProps } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBase64 } from "@/app/components/app/admin/users/AntdUpload";
import { PaymentMethod, Tariff } from "@/types/types";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type Props = {
  onCloseModal: (open: boolean) => void;
  method: PaymentMethod | null;
  tariffSchedule: Tariff;
};

export default function useBrillaForm(props: Props) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const router = useRouter();

  const user = useStore((state) => state.user);

  const [fixedCommission, setFixedCommission] = useState(0);
  const [partnersCommission, setPartnersCommission] = useState(0);
  const [totalToPay, setTotalToPay] = useState(0);
  const [profit, setProfit] = useState(0);
  const [grossProfit, setGrossProfit] = useState(0);
  const [isSoatValueDisabled, setIsSoatValueDisabled] = useState(true);
  const [financedAmount, setFinancedAmount] = useState(0);

  const vehicleTypePath = Form.useWatch("vehicle_type", form);
  const soatValue = Form.useWatch("soat_value", form);
  const placeProfit = Form.useWatch("place_profit", form);

  const place_total_gains = placeProfit
    ? placeProfit + props.method?.fixedCost?.place_profit
    : props.method?.fixedCost?.place_profit || 0;

  useEffect(() => {
    const partners = props.method?.fixedCost?.place_profit + (placeProfit || 0);
    setPartnersCommission(Number(partners.toFixed(0)));
  }, [props.method?.fixedCost?.place_profit, placeProfit]);

  useEffect(() => {
    const profitValue = (financedAmount || 0) - totalToPay;
    setProfit(Number(profitValue.toFixed(1)));

    const grossProfitValue =
      partnersCommission === profit ? profit : profit - partnersCommission;
    setGrossProfit(Number(grossProfitValue.toFixed(1)));
  }, [totalToPay, financedAmount, partnersCommission, profit]);

  useEffect(() => {
    const baseValue =
      props.method?.fixedCost?.base_value_type === "fixed"
        ? props.method.fixedCost?.base_value
        : soatValue > 1000000
        ? props.method?.fixedCost?.base_value_gt_1m
        : props.method?.fixedCost?.base_value_lt_1m;

    const financedAmount = soatValue + (placeProfit || 0) + baseValue;
    setFinancedAmount(financedAmount);
  }, [soatValue, placeProfit, props?.method?.fixedCost]);

  useEffect(() => {
    if (
      !vehicleTypePath ||
      vehicleTypePath.length < 2 ||
      !isSoatValueDisabled
    ) {
      return;
    }

    const vehicleClassId = vehicleTypePath[0];
    const vehicleTypeCode = vehicleTypePath[1];

    const selectedVehicleClass = props.tariffSchedule.find(
      (vClass) => vClass.id === vehicleClassId
    );
    const selectedCategory = selectedVehicleClass?.categories.find(
      (c) => c.code === vehicleTypeCode
    );

    if (selectedCategory && selectedVehicleClass) {
      form.setFieldsValue({ soat_value: selectedCategory.total_to_pay });
      const commission = selectedVehicleClass.fixed_payment_commission || 0;
      setFixedCommission(commission);
    } else {
      form.setFieldsValue({ soat_value: undefined });
      setFixedCommission(0);
    }
  }, [vehicleTypePath, props.tariffSchedule, form, isSoatValueDisabled]);

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
        financed_amount: financedAmount,
        sale_summary: {
          fixed_commission: fixedCommission,
          partners_commission: partnersCommission,
          profit: profit,
          gross_profit: grossProfit,
          total: financedAmount,
          place_total_gains: place_total_gains,
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

  const cascaderOptions = props.tariffSchedule.map((vehicleClass) => ({
    label: vehicleClass.vehicle_class,
    value: vehicleClass.id,
    children: vehicleClass.categories.map((category) => ({
      label: category.type,
      value: category.code,
    })),
  }));

  return {
    form,
    fileList,
    setFileList,
    onFinish,
    fixedCommission,
    partnersCommission,
    profit,
    grossProfit,
    financedAmount,
    isSoatValueDisabled,
    setIsSoatValueDisabled,
    place_total_gains,
    user,
    cascaderOptions,
  };
}
