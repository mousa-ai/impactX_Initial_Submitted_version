import { errorResponse, json } from "@backend/api/http";
import { requireUser } from "@backend/auth/session";
import { store } from "@backend/db/store";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireUser();
    const { id } = await params;
    await store.markDocumentPending(id);
    await wait(900);
    const result = await store.finalizeValidation(id);
    return json({
      document: result.document,
      status: result.document.validation_status,
      issues: result.issues,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
