import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getStorage, Storage } from "firebase-admin/storage";
import { ServiceAccount } from "firebase-admin";

// 1. OBTÉN LA VARIABLE DE ENTORNO
const serviceAccountKey = process.env.F_SERVICE_ACCOUNT_KEY_BASE64;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

// 2. AÑADE UNA VALIDACIÓN (GUARD CLAUSE)
if (!serviceAccountKey) {
  throw new Error(
    "La variable de entorno F_SERVICE_ACCOUNT_KEY_BASE64 no está definida."
  );
}

// Decodifica la clave (ahora `serviceAccountKey` es garantizado un string)
const decodedServiceAccount = Buffer.from(serviceAccountKey, "base64").toString(
  "utf-8"
);
const serviceAccount = JSON.parse(decodedServiceAccount) as ServiceAccount;

let app: App;
let auth: Auth;
let db: Firestore;
let storage: Storage;

// El resto de tu código funciona igual
if (!getApps().length) {
  app = initializeApp({
    credential: cert(serviceAccount),
    storageBucket: storageBucket, // Usa la variable definida arriba
  });
} else {
  app = getApps()[0];
}

auth = getAuth(app);
db = getFirestore(app);
storage = getStorage(app);

export { auth, db, storage };
