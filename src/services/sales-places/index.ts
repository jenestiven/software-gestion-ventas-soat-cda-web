import { db } from "@/firebase/firebaseAdmin";
import { PlacesDataType, PlacesDataTypeFromDb } from "@/types/types";
import { NextResponse } from "next/server";

export const SALES_PLACES_COLLECTION = "places";
export const USERS_COLLECTION = "users";

export async function createSalesPlace(data: PlacesDataType) {
  try {
    const salesPlaceCollection = db.collection(SALES_PLACES_COLLECTION);
    const newPlaceRef = await salesPlaceCollection.add({
      place_name: data.place_name,
      place_address: data.place_address,
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

export const getSalesPlaceById = async (id: string) => {
  try {
    const salesPlaceRef = db.collection(SALES_PLACES_COLLECTION).doc(id);
    const salesPlaceSnapshot = await salesPlaceRef.get();
    if (!salesPlaceSnapshot.exists) {
      return null;
    }
    return { id: salesPlaceSnapshot.id, ...salesPlaceSnapshot.data() };
  } catch (error) {
    console.error("Error getting sales place by ID:", error);
    return null;
    
  }
}

export const getSalesPlaces = async () => {
  try {
    const usersCollection = db.collection(USERS_COLLECTION);
    const salesPlaceCollection = db.collection(SALES_PLACES_COLLECTION);
    const usersSnapshot = await usersCollection.get();
    const users = usersSnapshot.docs.map((doc) => doc.data());

    let assesorsCountByPlace: Record<string, number> = {};
    users.forEach((user) => {
      const placeId = user.sales_place;
      if (placeId) {
        assesorsCountByPlace[placeId] =
          (assesorsCountByPlace[placeId] || 0) + 1;
      }
    });
    const salesPlacesSnapshot = await salesPlaceCollection.get();
    const salesPlaces: PlacesDataType[] = [];
    salesPlacesSnapshot.forEach((doc) => {
      const data = doc.data() as PlacesDataTypeFromDb;
      salesPlaces.push({
        id: doc.id,
        asesors_number: assesorsCountByPlace[doc.id] || 0,
        ...data,
      });
    });

    return salesPlaces;
  } catch (error) {
    console.error("Error getting sales places:", error);
    return [] as PlacesDataType[];
  }
};

export async function updateSalesPlace(
  id: string,
  data: Partial<PlacesDataType>
) {
  try {
    const salesPlaceRef = db.collection(SALES_PLACES_COLLECTION).doc(id);
    await salesPlaceRef.update(data);
    return NextResponse.json({ message: "Sales place updated successfully" });
  } catch (error) {
    console.error("Error updating sales place:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function deleteSalesPlace(id: string) {
  try {
    const salesPlaceRef = db.collection(SALES_PLACES_COLLECTION).doc(id);
    await salesPlaceRef.delete();
    return NextResponse.json({ message: "Sales place deleted successfully" });
  } catch (error) {
    console.error("Error deleting sales place:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
