import { z } from "zod";
import { errorResponse, json, readJson } from "@backend/api/http";
import { setSessionCookie } from "@backend/auth/session";
import { store } from "@backend/db/store";
import { signUpWithPassword } from "@backend/firebase/auth-rest";
import { isFirebaseClientConfigured } from "@backend/firebase/config";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  full_name: z.string().min(2),
  role: z.enum(["customer", "reviewer", "manager"]).optional(),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await readJson(request));
    let firebaseId: string | undefined;

    if (isFirebaseClientConfigured()) {
      const created = await signUpWithPassword(body.email, body.password, body.full_name);
      firebaseId = created.localId;
    }

    const user = await store.createUser({
      id: firebaseId,
      email: body.email,
      password: body.password,
      full_name: body.full_name,
      role: body.role ?? "customer",
    });
    await setSessionCookie(user.id);
    return json({
      user: store.publicUser(user),
      session: {
        access_token: user.id,
        expires_at: new Date(Date.now() + 7 * 86400000).toISOString(),
      },
    });
  } catch (error) {
    return errorResponse(error, 400);
  }
}
