"use client";

import React, { useEffect, useState } from "react";
import { Button, Modal, Radio, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PAYMENTS_METHODS from "@/app/api/local/payments-types/payments-types.json";
import { PaymentMethod, PlacesDataType } from "@/types/types";
import SellFormLauncher from "./SellFormLauncher";
import { getTariffScheduleApi } from "@/lib/api/asesor";
import { getSalesPlaceByIdApi } from "@/lib/api/salesPlaces";
import useStore from "@/store";

const { Title } = Typography;

export default function CreateNewSellHandler() {
  const user = useStore((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [tariffSchedule, setTariffSchedule] = useState([]);
  const [salesPlace, setSalesPlace] = useState<PlacesDataType | null>(null);

  const onCloseModal = () => {
    setOpenFormModal(false);
    setSelectedPaymentMethod(null);
  };

  const handleChoosePaymentMethod = () => {
    setOpenModal(false);
    setOpenFormModal(true);
  };

  useEffect(() => {
    const getInitialData = async () => {
      if (user?.sales_place_id) {
        try {
          const tariffSchedule = await getTariffScheduleApi();
          const placeData = await getSalesPlaceByIdApi(user.sales_place_id);
          setTariffSchedule(tariffSchedule);
          setSalesPlace(placeData);
        } catch (error) {
          console.error("Error fetching initial data:", error);
        }
      }
    };

    getInitialData();
  }, [user]);

  const paymentsMethods = PAYMENTS_METHODS.map((method: PaymentMethod) => {
    const fixedCost = salesPlace?.fixed_costs?.[method.id];
    return {
      ...method,
      isActive: fixedCost?.is_active ? true : false,
    };
  });

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        type="primary"
        icon={<PlusOutlined />}
        className="w-44"
      >
        Nueva venta
      </Button>
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        centered
        footer={null}
      >
        <div className="flex flex-col gap-6 items-center justify-center text-center">
          <Title level={4}>Selecciona el tipo de pago</Title>
          <Radio.Group
            onChange={(e) => {
              const id = e.target.value;
              const selectedMethod = paymentsMethods.find(
                (method: PaymentMethod) => method.id === id
              );
              setSelectedPaymentMethod(selectedMethod || null);
            }}
            value={selectedPaymentMethod?.id}
          >
            <ul className="grid grid-cols-2 gap-2 text-left">
              {paymentsMethods.map((method: PaymentMethod) => (
                <li className="border rounded-md p-3" key={method.id}>
                  <Radio disabled={!method.isActive} value={method.id}>
                    {method.name}
                  </Radio>
                </li>
              ))}
            </ul>
          </Radio.Group>
          <Button
            className="w-24"
            type="primary"
            disabled={!selectedPaymentMethod}
            onClick={() => {
              if (selectedPaymentMethod) {
                handleChoosePaymentMethod();
              }
            }}
          >
            Confirmar
          </Button>
        </div>
      </Modal>
      <SellFormLauncher
        method={selectedPaymentMethod}
        openFormModal={openFormModal}
        onCloseModal={onCloseModal}
        tariffSchedule={tariffSchedule}
      />
    </>
  );
}
