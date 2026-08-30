import { z } from "zod";
import { errorResponse, json, readJson } from "@backend/api/http";
import { setSessionCookie } from "@backend/auth/session";
import { store } from "@backend/db/store";
import { signInWithPassword } from "@backend/firebase/auth-rest";
import { isFirebaseClientConfigured } from "@backend/firebase/config";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await readJson(request));

    if (isFirebaseClientConfigured()) {
      await signInWithPassword(body.email, body.password);
    }

    const user = await store.findUserByEmail(body.email);
    if (!user) {
      return json({ error: "Invalid email or password. · البريد أو كلمة المرور غير صحيحة." }, 401);
    }
    if (!isFirebaseClientConfigured() && user.password_hash !== body.password) {
      return json({ error: "Invalid email or password. · البريد أو كلمة المرور غير صحيحة." }, 401);
    }

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
