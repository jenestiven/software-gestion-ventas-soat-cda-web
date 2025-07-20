import React from "react";
import SalesByPlaceTableClient from "./SalesByPlaceTableClient";
import { getSalesByPlace } from "@/services/sales/sales";

type Props = {};

export default async function SalesByPlaceTable({}: Props) {
  const salesByPlace = await getSalesByPlace();
  return <SalesByPlaceTableClient dataSource={salesByPlace} />;
}
