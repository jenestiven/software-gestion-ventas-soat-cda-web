import { storage } from "@/firebase/firebaseAdmin";

export async function uploadBase64FileAndGetUrl(
    base64: string,
    mimeType: string,
    fileName: string,
    uid: string
): Promise<string> {
    const bucket = storage.bucket();
    const filePath = `users/${uid}/${fileName}`;
    const fileUpload = bucket.file(filePath);

    // Elimina el prefijo si existe (ejemplo: "data:image/png;base64,")
    const base64Data = base64.includes(",") ? base64.split(",")[1] : base64;
    const buffer = Buffer.from(base64Data, "base64");

    await fileUpload.save(buffer, {
        contentType: mimeType,
        public: true,
    });

    await fileUpload.makePublic();
    return fileUpload.publicUrl();
}
