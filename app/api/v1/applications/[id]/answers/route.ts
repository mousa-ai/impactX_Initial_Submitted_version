import { z } from "zod";
import { errorResponse, json, readJson } from "@backend/api/http";
import { requireUser } from "@backend/auth/session";
import { store } from "@backend/db/store";

const schema = z.object({
  answers: z.array(
    z.object({
      question_id: z.string(),
      value: z.union([z.string(), z.number(), z.boolean(), z.array(z.string()), z.null()]),
    }),
  ),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser(["customer"]);
    const { id } = await params;
    const detail = await store.getApplication(id);
    if (!detail || detail.application.user_id !== user.id) {
      return json({ error: "Application not found. · الطلب غير موجود." }, 404);
    }
    const body = schema.parse(await readJson(request));
    return json(await store.upsertAnswers(id, body.answers));
  } catch (error) {
    return errorResponse(error);
  }
}
