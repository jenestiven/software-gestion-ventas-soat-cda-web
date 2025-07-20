import { getSalesForMonths } from "@/services/sales/sales";
import CompareSellsGraphClient from "./CompareSellsGraphClient";

type Props = {};

const CompareSellsGraph = async ({}: Props) => {
  const salesData = await getSalesForMonths();
  return <CompareSellsGraphClient salesData={salesData} />;
};

export default CompareSellsGraph;