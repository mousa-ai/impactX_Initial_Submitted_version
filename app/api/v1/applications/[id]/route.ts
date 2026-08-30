import { errorResponse, json } from "@backend/api/http";
import { requireUser } from "@backend/auth/session";
import { store } from "@backend/db/store";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const detail = await store.getApplication(id);
    if (!detail) return json({ error: "Application not found. · الطلب غير موجود." }, 404);
    if (user.role === "customer" && detail.application.user_id !== user.id) {
      return json({ error: "Forbidden · غير مسموح" }, 403);
    }
    return json(detail);
  } catch (error) {
    return errorResponse(error);
  }
}
