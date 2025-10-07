"use client";

import { saveSaleApi } from "@/lib/api/sales";
import useStore from "@/store";
import { Form, GetProp, message, UploadFile, UploadProps } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PaymentMethod, Tariff } from "@/types/types";
import { getBase64 } from "@/app/components/app/admin/users/AntdUpload";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type Props = {
  onCloseModal: (open: boolean) => void;
  method: PaymentMethod;
  tariffSchedule: Tariff;
};

export default function useCashForm(props: Props) {
  const [form] = Form.useForm();
  const user = useStore((state) => state.user);
  const router = useRouter();
  const { tariffSchedule } = props;

  const cascaderOptions = tariffSchedule.map((vehicleClass) => ({
    label: vehicleClass.vehicle_class,
    value: vehicleClass.id,
    children: vehicleClass.categories.map((category) => ({
      label: category.type,
      value: category.code,
    })),
  }));

  const [fixedCommission, setFixedCommission] = useState(0);
  const [profit, setProfit] = useState(0);
  const [totalToPay, setTotalToPay] = useState(0);
  const [isSoatValueDisabled, setIsSoatValueDisabled] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const vehicleTypePath = Form.useWatch("vehicle_type", form);
  const soatValue = Form.useWatch("soat_value", form);
  const placeProfit = Form.useWatch("place_profit", form);
  const transferMethod = Form.useWatch("transfer_method", form) || false;  
  const coop = Form.useWatch("cooperative", form) || false;
  const custom_base_value = Form.useWatch("custom_base_value", form) || 0;
  const custom_place_profit = Form.useWatch("custom_place_profit", form) || 0;

  const place_total_gains = placeProfit
    ? placeProfit + props.method?.fixedCost?.place_profit
    : custom_place_profit ? custom_place_profit : props.method?.fixedCost?.place_profit || 0;

  useEffect(() => {
    if (!vehicleTypePath || vehicleTypePath.length < 2) {
      form.setFieldsValue({ soat_value: undefined });
      setFixedCommission(0);
      return;
    }

    const vehicleClassId = vehicleTypePath[0];
    const vehicleTypeCode = vehicleTypePath[1];

    const selectedVehicleClass = tariffSchedule.find(
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
  }, [vehicleTypePath, tariffSchedule, form]);

  useEffect(() => {
    const baseValue = custom_base_value ? custom_base_value :
      props.method?.fixedCost?.base_value_type === "fixed"
        ? props.method.fixedCost?.base_value
        : soatValue > 1000000
        ? props.method?.fixedCost?.base_value_gt_1m
        : props.method?.fixedCost?.base_value_lt_1m;

    const total = soatValue + (place_total_gains || 0) + baseValue;
    setTotalValue(total);
  }, [soatValue, place_total_gains, props?.method?.fixedCost, custom_base_value]);

  useEffect(() => {
    const profitValue = totalValue - totalToPay;
    const profitBeforeTasksValue = profitValue - place_total_gains;
    
    const taxRate = transferMethod
      ? 0
      : (totalToPay * 4) / 1000;

    const realProfit = profitBeforeTasksValue - taxRate;
    setProfit(Number(realProfit.toFixed(1)));
  }, [
    totalToPay,
    totalValue,
    place_total_gains,
    transferMethod,
    soatValue,
    props.method.fixedCost,
  ]);

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
        transfer_proof: file,
        vehicle_type: values.vehicle_type,
        seller: user,
        payment_method_id: props.method?.id,
        payment_method_name: props.method?.name,
        sale_summary: {
          fixed_commission: fixedCommission,
          profit: profit,
          place_total_gains: place_total_gains,
          total: totalValue,
        },
      };

      await saveSaleApi(saleData);
      message.success("Venta registrada exitosamente");
      form.resetFields();
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
    onFinish,
    cascaderOptions,
    totalToPay: totalValue,
    isSoatValueDisabled,
    setIsSoatValueDisabled,
    payByTransfer: transferMethod,
    fileList,
    setFileList,
    coop,
  };
}
