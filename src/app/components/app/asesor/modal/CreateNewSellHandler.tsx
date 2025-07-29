"use client";

import React, { useEffect, useState } from "react";
import { Button, Modal, Radio, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PAYMENTS_METHODS from "@/app/api/local/payments-types/payments-types.json";
import { PaymentMethod } from "@/types/types";
import SellFormLauncher from "./SellFormLauncher";
import { getTariffScheduleApi } from "@/lib/api/asesor";

const { Title } = Typography;

export default function CreateNewSellHandler() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [tariffSchedule, setTariffSchedule] = useState([]);

  const onCloseModal = () => {
    setOpenFormModal(false);
    setSelectedPaymentMethod(null);
  };

  const handleChoosePaymentMethod = () => {
    setOpenModal(false);
    setOpenFormModal(true);
  };

  useEffect(() => {
    const getTariff = async () => {
      try {
        const tariffSchedule = await getTariffScheduleApi();
        setTariffSchedule(tariffSchedule);
      } catch (error) {
        console.error("Error fetching tariff:", error);
      }
    };

    getTariff();
  }, []);

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
              const selectedMethod = PAYMENTS_METHODS.find(
                (method: PaymentMethod) => method.id === id
              );
              setSelectedPaymentMethod(selectedMethod || null);
            }}
            value={selectedPaymentMethod?.id}
          >
            <ul className="grid grid-cols-2 gap-2 text-left">
              {PAYMENTS_METHODS.map((method: PaymentMethod) => (
                <li className="border rounded-md p-3" key={method.id}>
                  <Radio value={method.id}>{method.name}</Radio>
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
