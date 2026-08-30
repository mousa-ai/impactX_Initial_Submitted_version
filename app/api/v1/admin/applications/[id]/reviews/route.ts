import { z } from "zod";
import { errorResponse, json, readJson } from "@backend/api/http";
import { requireUser } from "@backend/auth/session";
import { store } from "@backend/db/store";

const schema = z.object({
  decision: z.enum(["approve", "review", "reject", "request_resubmission"]),
  rationale: z.string().min(8),
});

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser(["reviewer", "manager"]);
    const { id } = await params;
    const body = schema.parse(await readJson(request));
    const result = await store.createReview({
      applicationId: id,
      reviewerId: user.id,
      decision: body.decision,
      rationale: body.rationale,
    });
    return json(result.detail, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
