import React from "react";
import ManagmentTableClient from "@/app/components/app/admin/managment/ManagmentTableClient";
import { headers } from "next/headers";

async function getData() {
  const host = headers().get("host");
  const protocol = headers().get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(`${baseUrl}/api/local/all-sells`, {
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
