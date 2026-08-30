import { z } from "zod";
import { errorResponse, json, readJson } from "@backend/api/http";
import { requireUser } from "@backend/auth/session";
import { store } from "@backend/db/store";

const schema = z.object({ typeId: z.string().min(1) });

export async function GET() {
  try {
    const user = await requireUser();
    if (user.role !== "customer") {
      return json(await store.listAllApplications());
    }
    return json(await store.listApplicationsForUser(user.id));
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser(["customer"]);
    const body = schema.parse(await readJson(request));
    return json(await store.createApplication(user.id, body.typeId), 201);
  } catch (error) {
    return errorResponse(error);
  }
}
