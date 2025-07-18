import { db } from "@/firebase/firebaseAdmin";
import { PlacesDataType, PlacesDataTypeFromDb } from "@/types/types";
import { NextResponse } from "next/server";

const SALES_PLACES_COLLECTION = "places";

export async function createSalesPlace(data: PlacesDataType) {
  try {
    const salesPlaceCollection = db.collection(SALES_PLACES_COLLECTION);
    const newPlaceRef = await salesPlaceCollection.add({
      place_name: data.place_name,
      place_address: data.place_address,
      asesor_sale_commission: data.asesor_sale_commission,
      can_add_profit: data.can_add_profit,
      created_at: new Date().toISOString(),
    });
    return NextResponse.json(
      { message: "Sales place created successfully", id: newPlaceRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating sales place:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const getSalesPlaces = async () => {
  try {
    const salesPlaceCollection = db.collection(SALES_PLACES_COLLECTION);
    const salesPlacesSnapshot = await salesPlaceCollection.get();
    const salesPlaces: PlacesDataType[] = [];
    salesPlacesSnapshot.forEach((doc) => {
      const data = doc.data() as PlacesDataTypeFromDb;
      salesPlaces.push({
        id: doc.id,
        ...data,
      });
    });
    
    return salesPlaces;
  } catch (error) {
    console.error("Error getting sales places:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
