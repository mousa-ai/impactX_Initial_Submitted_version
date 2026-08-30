import { clearSessionCookie } from "@backend/auth/session";
import { json } from "@backend/api/http";

export async function POST() {
  await clearSessionCookie();
  return json({ ok: true });
}
