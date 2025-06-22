import React from "react";
import { Button, Modal, Radio, Typography } from "antd";
import PAYMENTS_METHODS from "@/app/api/local/payments-types/payments-types.json"; 
//aqui no necesito hacer un fetch porque es un archivo local, apesar que estar en db, voy a usar el json directamente

type Props = {
  openModal: boolean;
  onCancel: () => void;
};

export default function PaymentTypesChosser({ openModal, onCancel }: Props) {
  const { Title } = Typography;

  return (
    <Modal open={openModal} onCancel={onCancel} centered footer={null}>
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
        <Button className="w-24" type="primary" onClick={onCancel}>
          Confirmar
        </Button>
      </div>
    </Modal>
  );
}
