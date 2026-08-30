import { NextResponse } from "next/server";

export function json<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(error: unknown, fallback = 500) {
  const status =
    typeof error === "object" && error && "status" in error
      ? Number((error as { status: number }).status)
      : fallback;
  const message = error instanceof Error ? error.message : "Unexpected error · خطأ غير متوقع";
  return json({ error: message }, status || fallback);
}

export async function readJson<T>(request: Request): Promise<T> {
  return (await request.json()) as T;
}
