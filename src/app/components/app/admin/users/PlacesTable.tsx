import React from "react";
import PlacesTableClient from "./PlacesTableClient";
import { getSalesPlaces } from "@/services/sales-places";

type Props = {};

export default async function PlacesTable({}: Props) {
  const data = await getSalesPlaces();
  return <PlacesTableClient dataSource={data} />;
}
