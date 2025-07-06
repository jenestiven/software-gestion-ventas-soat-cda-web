import { headers } from "next/headers";
import CompareSellsGraphClient from "./CompareSellsGraphClient";

const CompareSellsGraph = async () => {
  const host = headers().get("host");
  const protocol = headers().get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/local/sales-for-months`, {
    cache: "no-store",
  });
  const salesData = await res.json();

  return <CompareSellsGraphClient salesData={salesData} />;
};

export default CompareSellsGraph;
