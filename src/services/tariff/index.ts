import { db } from "@/firebase/firebaseAdmin";
import { VehicleClass } from "@/types/types";

export async function getTariffSchedule(): Promise<VehicleClass[]> {
  try {
    const tariffCollection = db.collection("tariff_schedule");
    const snapshot = await tariffCollection.get();
    const tariffs: VehicleClass[] = [];
    snapshot.forEach((doc) => {
      const tariffData = doc.data();
      // Combine the document ID with the rest of the data
      const vehicleClass: VehicleClass = {
        id: doc.id,
        vehicle_class: tariffData.vehicle_class,
        categories: tariffData.categories,
      };
      tariffs.push(vehicleClass);
    });
    return tariffs;
  } catch (error) {
    console.error("Error fetching tariffs:", error);
    return [];
  }
}