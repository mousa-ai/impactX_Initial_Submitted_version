import { errorResponse, json } from "@backend/api/http";
import { requireUser } from "@backend/auth/session";
import { store } from "@backend/db/store";

export async function GET() {
  try {
    await requireUser(["reviewer", "manager"]);
    return json(await store.dashboard());
  } catch (error) {
    return errorResponse(error);
  }
}
