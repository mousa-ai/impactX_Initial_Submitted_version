import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@backend/auth/constants";
import { store } from "@backend/db/store";
import type { PublicUser, SessionPayload, UserRole } from "@backend/types";

export { SESSION_COOKIE };

export async function getSession(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const userId = jar.get(SESSION_COOKIE)?.value;
  if (!userId) return null;
  const user = await store.findUserById(userId);
  if (!user) return null;
  return {
    user: store.publicUser(user),
    session: {
      access_token: userId,
      expires_at: new Date(Date.now() + 7 * 86400000).toISOString(),
    },
  };
}

export async function requireUser(roles?: UserRole[]): Promise<PublicUser> {
  const session = await getSession();
  if (!session) {
    throw Object.assign(new Error("Unauthorized"), { status: 401 });
  }
  if (roles && !roles.includes(session.user.role)) {
    throw Object.assign(new Error("Forbidden"), { status: 403 });
  }
  return session.user;
}

export async function setSessionCookie(userId: string) {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}
