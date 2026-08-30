import { json } from "@backend/api/http";
import { getSession } from "@backend/auth/session";

export async function GET() {
  const session = await getSession();
  return json(session ?? { user: null, session: null });
}
