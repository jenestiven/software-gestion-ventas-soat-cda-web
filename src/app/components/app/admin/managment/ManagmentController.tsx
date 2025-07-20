import React from "react";
import ManagmentTableClient from "./ManagmentTableClient";
import { getAllSales } from "@/services/sales/sales";
import { getSalesPlaces } from "@/services/sales-places";

type Props = {};

export default async function ManagmentController({}: Props) {
  const data = await getAllSales();
  const places = await getSalesPlaces();

  return <ManagmentTableClient initialData={data} places={places} />;
}
