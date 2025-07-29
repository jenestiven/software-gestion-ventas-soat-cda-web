const admin = require("firebase-admin"); // Importa todo el módulo de admin

// 1. Importa el ARCHIVO DE CREDENCIALES para la autenticación
const serviceAccount = require("../../serviceAccountKey.json");

// 2. Importa el ARCHIVO DE DATOS que quieres subir
const tariffData = require("./tariff.json"); // Asegúrate que la ruta sea correcta

// 3. Inicializa la app con las credenciales correctas y el tipo adecuado
// El tipo correcto es admin.ServiceAccount
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Llama a firestore() desde el objeto admin
const collectionName = "tariff_schedule";

async function uploadData() {
  // 4. Asegúrate de que los datos importados de tariffData sean un array
  if (tariffData && Array.isArray(tariffData)) {
    const schedule = tariffData;

    for (const item of schedule) {
      try {
        await db.collection(collectionName).add(item);
        console.log(`✅ Documento añadido para: ${item.vehicle_class}`);
      } catch (error) {
        console.error(
          `❌ Error añadiendo documento: ${item.vehicle_class}`,
          error
        );
      }
    }
    console.log("🚀 Carga de datos completada.");
  } else {
    console.error("El archivo de datos no es un array válido.");
  }
}

uploadData();
