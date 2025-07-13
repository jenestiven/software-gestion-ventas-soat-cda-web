import { Sale } from "@/types/types";
import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider } from "antd";
import React from "react";

export default function SaleDetail({ sale }: { sale: Sale | null }) {
  const date = sale?.created_at
    ? new Date(sale.created_at).toLocaleString("es-CO", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Avatar src={sale?.asesor_data.thumnail}>
            {!sale?.asesor_data.thumnail &&
              `${sale?.asesor_data.name.charAt(0).toLowerCase()}`}
          </Avatar>
          <span>
            <p className="font-light">Asesor</p>
            <h2>{sale?.asesor_data.name}</h2>
          </span>
        </div>
        <div className="w-2/4">
          <span>
            <p className="font-light">
              <CopyOutlined
                className="active:scale-95 transition-transform"
                onClick={() => {
                  if (sale?.id) {
                    navigator.clipboard.writeText(`#${sale.id.toString()}`);
                  }
                }}
                style={{ cursor: "pointer" }}
              />{" "}
              id: #{sale?.id}
            </p>
            <h2>Metodo de pago: {sale?.payment_method_name}</h2>
            <h2>Fecha: {date}</h2>
          </span>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 w-2/5">
          <span>
            <p className="font-light">Datos del cliente</p>
            <h2>{sale?.client_data.client_name}</h2>
            <h2>Cc. {sale?.client_data.client_id}</h2>
          </span>
          <span>
            <p className="font-light">Vehiculo</p>
            <h2>{sale?.vehicle_data.vehicle_type_name}</h2>
            <h2>Placa: {sale?.vehicle_data.vehicle_plate}</h2>
          </span>
          <span>
            <p className="font-light">Sede</p>
            <h2>{sale?.sale_place.place_name}</h2>
          </span>
          <span>
            <p className="font-light">Observaciones</p>
            <p>{sale?.remarks}</p>
          </span>
        </div>
        <div className="w-2/4">
          <span>
            {sale?.paid_in_cash_value !== undefined &&
              sale?.paid_in_cash_value > 0 && (
                <p>
                  Pagado en efectivo: $
                  {sale?.paid_in_cash_value.toLocaleString()}
                </p>
              )}
          </span>
          <span>
            <p className="font-light">Valor total</p>
            <h1 className="font-medium text-3xl">
              ${sale?.sale_sumary.total_payed.toLocaleString()}
            </h1>
          </span>
          <Divider />
          <div>
            {sale?.sale_sumary?.asesor_sale_commission !== undefined && (
              <p className="font-light flex gap-2 justify-between w-full">
                Comisión aliados:
                <h2>
                  ${sale?.sale_sumary.asesor_sale_commission.toLocaleString()}
                </h2>
              </p>
            )}
            {sale?.sale_sumary?.fixed_comission !== undefined && (
              <p className="font-light flex justify-between w-full">
                Comisión fija:
                <h2>${sale?.sale_sumary.fixed_comission.toLocaleString()}</h2>
              </p>
            )}
            {sale?.sale_sumary?.profit && (
              <p className="font-light flex gap-2 justify-between w-full">
                Utilidad:
                <h2>${sale?.sale_sumary.profit.toLocaleString()}</h2>
              </p>
            )}
            {sale?.sale_sumary?.gross_profit !== undefined && (
              <p className="font-light flex gap-2 justify-between w-full">
                Utilidad bruta:
                <h2>${sale.sale_sumary.gross_profit.toLocaleString()}</h2>
              </p>
            )}
            {sale?.sale_sumary?.bold_to_be_deposited_value !== undefined && (
              <p className="font-light flex gap-2 justify-between w-full">
                Valor a consignar (Bold):
                <h2>
                  $
                  {sale.sale_sumary.bold_to_be_deposited_value.toLocaleString()}
                </h2>
              </p>
            )}
            {sale?.sale_sumary?.datafono_commission !== undefined && (
              <p className="font-light flex gap-2 justify-between w-full">
                Comisión datáfono:
                <h2>
                  ${sale.sale_sumary.datafono_commission.toLocaleString()}
                </h2>
              </p>
            )}
            {sale?.sale_sumary?.datafono_value !== undefined && (
              <p className="font-light flex gap-2 justify-between w-full">
                Valor datáfono:
                <h2>${sale.sale_sumary.datafono_value.toLocaleString()}</h2>
              </p>
            )}
            {sale?.sale_sumary?.reteica !== undefined && (
              <p className="font-light flex gap-2 justify-between w-full">
                ReteICA:
                <h2>${sale.sale_sumary.reteica.toLocaleString()}</h2>
              </p>
            )}
            {sale?.sale_sumary?.total_to_tranfer_costs !== undefined && (
              <p className="font-light flex gap-2 justify-between w-full">
                Total a transferir (costos):
                <h2>
                  ${sale.sale_sumary.total_to_tranfer_costs.toLocaleString()}
                </h2>
              </p>
            )}

            {sale?.sale_sumary?.value_to_be_deposited !== undefined && (
              <p className="font-light flex gap-2 justify-between w-full">
                Valor a consignar:
                <h2>
                  ${sale.sale_sumary.value_to_be_deposited.toLocaleString()}
                </h2>
              </p>
            )}
            {sale?.sale_sumary?.soat_value !== undefined && (
              <p className="font-light flex gap-2 justify-between w-full">
                Valor SOAT:
                <h2>${sale.sale_sumary.soat_value.toLocaleString()}</h2>
              </p>
            )}
          </div>
        </div>
      </div>
      <Divider />
      {sale?.receipts?.length !== undefined && sale?.receipts?.length > 0 && (
        <div className="flex justify-end items-center">
          <div className="w-2/4">
            <p className="flex gap-2 mb-2">
              {`${
                sale?.receipts.at(0)?.receipt_type === "brilla-contract"
                  ? "Contrato: "
                  : sale?.receipts.at(0)?.receipt_type === "invoice"
                  ? "Factura: "
                  : "Pagare: "
              }`}{" "}
              {sale?.receipts.at(0)?.id}
            </p>
            <Button type="primary" icon={<DownloadOutlined />}>
              Descargar{" "}
              {`${
                sale?.receipts.at(0)?.receipt_type === "brilla-contract"
                  ? "Contrato: "
                  : sale?.receipts.at(0)?.receipt_type === "invoice"
                  ? "Factura: "
                  : "Pagare: "
              }`}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
