"use client";

import React, { useState } from "react";
import { Button, Modal, Radio, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PAYMENTS_METHODS from "@/app/api/local/payments-types/payments-types.json";
//aqui no necesito hacer un fetch porque es un archivo local, apesar que estar en db, voy a usar el json directamente

const { Title } = Typography;

export default function CreateNewSellHandler() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        type="primary"
        icon={<PlusOutlined />}
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
          <Radio.Group>
            <ul className="grid grid-cols-2 gap-2 text-left">
              {PAYMENTS_METHODS.map((method) => (
                <li className="border rounded-md p-3" key={method.id}>
                  <Radio className="" value={method.id}>
                    {method.name}
                  </Radio>
                </li>
              ))}
            </ul>
          </Radio.Group>
          <Button
            className="w-24"
            type="primary"
            onClick={() => setOpenModal(false)}
          >
            Confirmar
          </Button>
        </div>
      </Modal>
    </>
  );
}
