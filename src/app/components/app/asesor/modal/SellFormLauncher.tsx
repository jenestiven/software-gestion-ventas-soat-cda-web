import { PaymentMethod, Tariff } from "@/types/types";
import { Modal } from "antd";
import React, { lazy, Suspense } from "react";

type PaymentMethodId =
  | "addi"
  | "brilla"
  | "sistecredito"
  | "cash"
  | "credit_card";

const PAYMENTS_METHODS_FORMS: Record<
  PaymentMethodId,
  React.LazyExoticComponent<
    (props: {
      method: PaymentMethod;
      onCloseModal: (open: boolean) => void;
      tariffSchedule: Tariff;
    }) => JSX.Element
  >
> = {
  addi: lazy(() => import("./forms/AddiForm")),
  brilla: lazy(() => import("./forms/BrillaForm")),
  sistecredito: lazy(() => import("./forms/SistecreditoForm")),
  cash: lazy(() => import("./forms/CashForm")),
  credit_card: lazy(() => import("./forms/CreditCardForm")),
};

type Props = {
  method: PaymentMethod | null;
  openFormModal: boolean;
  onCloseModal: (open: boolean) => void;
  tariffSchedule: Tariff;
};

export default function SellFormLauncher({
  method,
  openFormModal,
  onCloseModal,
  tariffSchedule,
}: Props) {
  const Component =
    method?.id && method.id in PAYMENTS_METHODS_FORMS
      ? PAYMENTS_METHODS_FORMS[method.id as PaymentMethodId]
      : undefined;

  return (
    <Modal
      width={800}
      open={openFormModal}
      onCancel={() => onCloseModal(false)}
      footer={null}
      centered
    >
      <Suspense fallback={<h2>Cargando formulario...</h2>}>
        {Component && method ? (
          <Component method={method} onCloseModal={onCloseModal} tariffSchedule={tariffSchedule} />
        ) : (
          <h2>Seleccione un método de pago válido.</h2>
        )}
      </Suspense>
    </Modal>
  );
}
