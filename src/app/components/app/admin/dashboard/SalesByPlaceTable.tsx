import React from "react";
import SalesByPlaceTableClient from "./SalesByPlaceTableClient";
import salesByPlace from "@/app/api/local/sales-by-place/sales-by-place.json";

type Props = {};

export default function SalesByPlaceTable({}: Props) {
  return <SalesByPlaceTableClient dataSource={salesByPlace} />;
}