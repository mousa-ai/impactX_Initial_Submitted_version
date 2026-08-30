import { json } from "@backend/api/http";
import { store } from "@backend/db/store";

export async function GET() {
  return json(await store.listStatuses());
}
