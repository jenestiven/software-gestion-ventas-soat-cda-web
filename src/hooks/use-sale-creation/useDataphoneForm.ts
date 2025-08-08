
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
  method: PaymentMethod;
  onCloseModal: (open: boolean) => void;
  tariffSchedule: Tariff;
};

export default function useDataphoneForm(props: Props) {
  const [form] = Form.useForm();
  const user = useStore((state) => state.user);
  const router = useRouter();

  const { tariffSchedule, method } = props;

  const [isSoatValueDisabled, setIsSoatValueDisabled] = useState(true);
  const [datafonoCommission, setDatafonoCommission] = useState(0);
  const [clientCommission, setClientCommission] = useState(0);
  const [fixedCommission, setFixedCommission] = useState(0);
  const [reteica, setReteica] = useState(0);
  const [profit, setProfit] = useState(0);
  const [totalToPaySoatPlatform, setTotalToPaySoatPlatform] = useState(0);
  const [boldDepositValue, setBoldDepositValue] = useState(0);
  const [totalCostTransfer, setTotalCostTransfer] = useState(0);
  const [effectiveValue, setEffectiveValue] = useState(0);

  const creditType = Form.useWatch("credit_type", form);
  const soatValue = Form.useWatch("soat_value", form);
  const vehicleTypePath = Form.useWatch("vehicle_type", form);
  const place_profit = Form.useWatch("place_profit", form);

  const cobroDatafono = effectiveValue + clientCommission;
  const place_total_gains = place_profit
    ? place_profit + method.fixedCost?.place_profit
    : method.fixedCost?.place_profit;

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
  }, [vehicleTypePath, tariffSchedule, form, isSoatValueDisabled]);

  useEffect(() => {
    if (!cobroDatafono) return;
    const reteicaValue = cobroDatafono * 0.007;
    setReteica(reteicaValue);
  }, [cobroDatafono]);

  const cascaderOptions = tariffSchedule.map((vehicleClass) => ({
    label: vehicleClass.vehicle_class,
    value: vehicleClass.id,
    children: vehicleClass.categories.map((category) => ({
      label: category.type,
      value: category.code,
    })),
  }));

  useEffect(() => {
    let commission = 0;

    if (creditType && cobroDatafono) {
      switch (creditType) {
        case "debit":
          commission = cobroDatafono * 0.0219 + 300;
          break;
        case "credit":
          commission = cobroDatafono * 0.0269 + 300;
          break;
        case "alkosto":
        case "olimpica":
        case "exito":
        case "american_express":
          commission = cobroDatafono * 0.0299 + 300;
          break;
        default:
          commission = 0;
      }
    }
    setDatafonoCommission(commission);
  }, [creditType, cobroDatafono]);

  useEffect(() => {
    let commission = 0;
    if (creditType && effectiveValue) {
      const value = Number(effectiveValue);
      switch (creditType) {
        case "credit":
          commission = 0.015 * value;
          break;
        case "debit":
          commission = 0.012 * value;
          break;
        case "alkosto":
        case "olimpica":
        case "exito":
        case "american_express":
          commission = 0.015 * value;
          break;
        default:
          commission = 0;
      }
    }
    setClientCommission(commission);
  }, [creditType, effectiveValue]);

  useEffect(() => {
    const totalToPayValueSoatPlatform = (soatValue || 0) + fixedCommission;
    setTotalToPaySoatPlatform(totalToPayValueSoatPlatform);
  }, [soatValue, fixedCommission]);

  useEffect(() => {
    const baseValue =
      method.fixedCost?.base_value_type === "fixed"
        ? method.fixedCost?.base_value
        : soatValue > 1000000
        ? method.fixedCost?.base_value_gt_1m
        : method.fixedCost?.base_value_lt_1m;

    const effectiveValue = soatValue + (place_profit || 0) + baseValue;
    setEffectiveValue(effectiveValue);
  }, [soatValue, place_profit, method.fixedCost]);

  useEffect(() => {
    const boldDepositValueValue = cobroDatafono - datafonoCommission - reteica;
    setBoldDepositValue(boldDepositValueValue);
  }, [cobroDatafono, datafonoCommission, reteica]);

  useEffect(() => {
    const profitValue = boldDepositValue - totalToPaySoatPlatform;
    setProfit(profitValue);
  }, [boldDepositValue, totalToPaySoatPlatform]);

  useEffect(() => {
    const totalCostTransferValue = boldDepositValue - profit;
    setTotalCostTransfer(totalCostTransferValue);
  }, [boldDepositValue, profit]);

  const onFinish = async (values: any) => {
    try {
      message.loading("Registrando venta...", 0);
      const saleData = {
        ...values,
        seller: user,
        payment_method_id: props.method?.id,
        payment_method_name: props.method?.name,
        vehicle_type: values.vehicle_type,
        sale_summary: {
          datafono_commission: datafonoCommission,
          client_commission: clientCommission,
          fixed_commission: fixedCommission,
          reteica: reteica,
          profit: profit,
          place_profit: place_profit || 0,
          total_to_pay: cobroDatafono,
          bold_deposit_value: boldDepositValue,
          total_cost_transfer: totalCostTransfer,
          place_total_gains: place_total_gains,
        },
      };

      await saveSaleApi(saleData);
      message.success("Venta registrada con éxito", 2);
      form.resetFields();
      props.onCloseModal(false);
    } catch (error) {
      message.error("Error al registrar la venta", 2);
    } finally {
      setTimeout(() => {
        router.refresh();
        message.destroy();
      }, 2000);
    }
  };

  return {
    form,
    onFinish,
    cascaderOptions,
    isSoatValueDisabled,
    setIsSoatValueDisabled,
    datafonoCommission,
    fixedCommission,
    reteica,
    clientCommission,
    cobroDatafono,
    boldDepositValue,
    profit,
    totalCostTransfer,
    place_total_gains,
    user,
  };
}
