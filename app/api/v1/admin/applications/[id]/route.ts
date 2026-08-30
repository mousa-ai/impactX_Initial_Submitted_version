import { errorResponse, json } from "@backend/api/http";
import { requireUser } from "@backend/auth/session";
import { store } from "@backend/db/store";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireUser(["reviewer", "manager"]);
    const { id } = await params;
    const detail = await store.getApplication(id);
    if (!detail) return json({ error: "Application not found. · الطلب غير موجود." }, 404);
    return json({
      ...detail,
      recommendation: await store.recommendationFor(id),
    });
  } catch (error) {
    return errorResponse(error);
  }
}
