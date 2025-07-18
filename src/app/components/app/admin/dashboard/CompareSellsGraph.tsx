import CompareSellsGraphClient from "./CompareSellsGraphClient";
import salesData from "@/app/api/local/sales-for-months/sales-for-months.json";

type Props = {};

const CompareSellsGraph = ({}: Props) => {
  return <CompareSellsGraphClient salesData={salesData} />;
};

export default CompareSellsGraph;