import { json } from "@backend/api/http";
import { store } from "@backend/db/store";
import type { AnswerValue } from "@backend/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const applicationTypeId = searchParams.get("applicationTypeId") ?? undefined;
  const rawAnswers = searchParams.get("answers");
  const answers = rawAnswers ? (JSON.parse(rawAnswers) as Record<string, AnswerValue>) : {};
  return json(await store.getVisibleQuestions(applicationTypeId, answers));
}
