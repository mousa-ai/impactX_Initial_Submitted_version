import { errorResponse, json } from "@backend/api/http";
import { requireUser } from "@backend/auth/session";
import { store } from "@backend/db/store";

export async function GET() {
  try {
    await requireUser(["manager"]);
    return json(await store.performance());
  } catch (error) {
    return errorResponse(error);
  }
}
