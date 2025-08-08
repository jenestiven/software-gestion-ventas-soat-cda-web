
"use client";

import { saveSaleApi } from "@/lib/api/sales";
import useStore from "@/store";
import {
  Form,
  message,
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PaymentMethod, Tariff } from "@/types/types";

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

  const vehicleTypePath = Form.useWatch("vehicle_type", form);
  const inCashValue = Form.useWatch("cash_value_payed", form);
  const soatValue = Form.useWatch("soat_value", form);

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
      const commission = selectedVehicleClass.vehicle_class
        .toLowerCase()
        .includes("moto")
        ? 15000
        : 0;
      setFixedCommission(commission);
    } else {
      form.setFieldsValue({ soat_value: undefined });
      setFixedCommission(0);
    }
  }, [vehicleTypePath, tariffSchedule, form]);

  useEffect(() => {
    const profitValue = (inCashValue || 0) - totalToPay;
    setProfit(Number(profitValue.toFixed(1)));
  }, [totalToPay, inCashValue]);

  useEffect(() => {
    const value = (soatValue || 0) + fixedCommission;
    setTotalToPay(Number(value.toFixed(1)));
  }, [soatValue, fixedCommission]);

  const onFinish = async (values: any) => {
    try {
      message.loading("Registrando venta...", 0);
      const saleData = {
        ...values,
        vehicle_type: values.vehicle_type,
        seller: user,
        payment_method_id: props.method?.id,
        payment_method_name: props.method?.name,
        sale_summary: {
          fixed_commission: fixedCommission,
          profit: profit,
          total_to_pay: totalToPay,
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
    totalToPay,
  };
}
