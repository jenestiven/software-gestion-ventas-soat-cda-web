import React from "react";
import SalesByPayMethodClient from "./SalesByPayMethodClient";
import { getSalesByPayMethod } from "@/services/sales/sales";

type Props = {};

export default async function SalesByPayMethod({}: Props) {
  const salesByPayMethod = await getSalesByPayMethod();
  return <SalesByPayMethodClient dataSource={salesByPayMethod} />;
}