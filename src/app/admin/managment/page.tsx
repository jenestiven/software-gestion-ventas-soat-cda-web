import React from "react";
import ManagmentTableClient from "@/app/components/app/admin/managment/ManagmentTableClient";
import { Button } from "antd";

async function getData() {
  const res = await fetch("http://localhost:3000/api/local/all-sells", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch sales data");
  }
  return res.json();
}

export default async function ManagmentPage() {
  const data = await getData();

  return (
    <div className="overflow-auto h-full py-5 px-2 scroll-bar">
      <ManagmentTableClient initialData={data} />
    </div>
  );
}
