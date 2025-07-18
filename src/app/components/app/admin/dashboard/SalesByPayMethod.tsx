import React from "react";
import SalesByPayMethodClient from "./SalesByPayMethodClient";
import salesByPayMethod from "@/app/api/local/sales-by-pay-method/sales-by-pay-method.json";

type Props = {};

export default function SalesByPayMethod({}: Props) {
  return <SalesByPayMethodClient dataSource={salesByPayMethod} />;
}