import { getFirebasePublicConfig } from "./config";

async function identityRequest(path: string, body: Record<string, unknown>) {
  const config = getFirebasePublicConfig();
  if (!config) throw new Error("Firebase is not configured.");
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/${path}?key=${config.apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = await response.json();
  if (!response.ok) {
    throw Object.assign(new Error(payload.error?.message ?? "Firebase auth failed"), { status: 401 });
  }
  return payload;
}

export function signInWithPassword(email: string, password: string) {
  return identityRequest("accounts:signInWithPassword", {
    email,
    password,
    returnSecureToken: true,
  });
}

export function signUpWithPassword(email: string, password: string, displayName: string) {
  return identityRequest("accounts:signUp", {
    email,
    password,
    displayName,
    returnSecureToken: true,
  });
}
