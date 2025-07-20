import React from "react";
import BetterSellerTableClient from "./BetterSellerTableClient";
import { getBetterSellers } from "@/services/sales/sales";

type Props = {};

export default async function BetterSellerTable({}: Props) {
  const sells = await getBetterSellers();
  return <BetterSellerTableClient dataSource={sells} />;
}