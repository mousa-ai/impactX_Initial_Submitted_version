import { errorResponse, json } from "@backend/api/http";
import { requireUser } from "@backend/auth/session";
import { store } from "@backend/db/store";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser(["customer"]);
    const { id } = await params;
    const detail = await store.getApplication(id);
    if (!detail || detail.application.user_id !== user.id) {
      return json({ error: "Application not found. · الطلب غير موجود." }, 404);
    }
    const missing = detail.checklist.filter((item) => item.required && !item.document);
    if (missing.length) {
      return json({ error: "Upload every required document before submitting. · ارفع كل المستندات المطلوبة قبل التقديم." }, 400);
    }
    return json(await store.submitApplication(id, user.id));
  } catch (error) {
    return errorResponse(error);
  }
}
