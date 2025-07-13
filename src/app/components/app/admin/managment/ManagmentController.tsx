import React from "react";
import ManagmentTableClient from "./ManagmentTableClient";
import { headers } from "next/headers";

type Props = {};

async function getData() {
  const host = headers().get("host");
  const protocol = headers().get("x-forwarded-proto") || "http";
  const cookie = headers().get("cookie");
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(`${baseUrl}/api/local/all-sales`, {
    cache: "no-store",
    headers: {
      cookie: cookie || "",
    },
  });
  const data = await res.json();
  return data;
}

export default async function ManagmentController({}: Props) {
  const data = await getData();

  return <ManagmentTableClient initialData={data} />;
}
