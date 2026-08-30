import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import { errorResponse, json } from "@backend/api/http";
import { requireUser } from "@backend/auth/session";
import { store } from "@backend/db/store";
import { uploadApplicationFile } from "@backend/firebase/storage";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser(["customer"]);
    const { id } = await params;
    const detail = await store.getApplication(id);
    if (!detail || detail.application.user_id !== user.id) {
      return json({ error: "Application not found. · الطلب غير موجود." }, 404);
    }

    const form = await request.formData();
    const documentTypeId = String(form.get("documentTypeId") ?? "");
    const file = form.get("file");
    if (!documentTypeId || !(file instanceof File)) {
      return json({ error: "documentTypeId and file are required. · نوع المستند والملف مطلوبان." }, 400);
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const remotePath = await uploadApplicationFile({
      applicationId: id,
      documentTypeId,
      fileName: file.name,
      mimeType: file.type || "application/octet-stream",
      bytes,
    });

    let filePath = remotePath;
    if (!filePath) {
      const destDir = path.join(process.cwd(), ".data", "uploads", id);
      mkdirSync(destDir, { recursive: true });
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      filePath = path.join(destDir, `${Date.now()}-${safeName}`);
      writeFileSync(filePath, bytes);
      filePath = filePath.replace(process.cwd(), "").replace(/\\/g, "/");
    }

    const document = await store.addDocument({
      applicationId: id,
      documentTypeId,
      fileName: file.name,
      mimeType: file.type || "application/octet-stream",
      sizeBytes: file.size,
      filePath,
    });

    return json(document, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
