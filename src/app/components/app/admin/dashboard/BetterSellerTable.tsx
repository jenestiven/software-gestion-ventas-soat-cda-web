import React from "react";
import BetterSellerTableClient from "./BetterSellerTableClient";
import sells from "@/app/api/local/better-sellers/better-sellers.json";

type Props = {};

export default function BetterSellerTable({}: Props) {
  return <BetterSellerTableClient dataSource={sells} />;
}