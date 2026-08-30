import { isFirebaseStorageEnabled } from "./config";
import { getAdminStorage } from "./admin";
import { storageFolders } from "./collections";

export async function uploadApplicationFile(input: {
  applicationId: string;
  documentTypeId: string;
  fileName: string;
  mimeType: string;
  bytes: Buffer;
}) {
  if (!isFirebaseStorageEnabled()) return null;

  const storage = getAdminStorage();
  if (!storage) return null;

  try {
    const safeName = input.fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const objectPath = `${storageFolders.documents}/${input.applicationId}/${input.documentTypeId}/${Date.now()}-${safeName}`;
    const bucket = storage.bucket();
    const file = bucket.file(objectPath);

    await file.save(input.bytes, {
      contentType: input.mimeType,
      metadata: {
        cacheControl: "private, max-age=0",
      },
    });

    return objectPath;
  } catch {
    return null;
  }
}
