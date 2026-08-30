import type { AnswerMap } from "./conditions";
import { aiFactors, aiRationales, bilingual, pairText } from "@backend/i18n/catalog";
import type { AiFactor, AiRecommendation, ChecklistItem, Flag } from "@backend/types";

function numberAnswer(answers: AnswerMap, key: string) {
  const value = answers[key];
  return typeof value === "number" ? value : Number(value ?? NaN);
}

export function recommendDecision(input: {
  answers: AnswerMap;
  checklist: ChecklistItem[];
  flags: Flag[];
}): AiRecommendation {
  const factors: AiFactor[] = [];
  let risk = 18;

  const amount = numberAnswer(input.answers, "loan_amount");
  const income = numberAnswer(input.answers, "annual_income");
  const dti = income > 0 && amount > 0 ? amount / income : null;

  if (dti !== null) {
    if (dti <= 0.35) {
      factors.push({
        code: "affordability",
        label: pairText(aiFactors.affordability_low),
        weight: 0.22,
        direction: "positive",
      });
      risk -= 8;
    } else if (dti > 0.7) {
      factors.push({
        code: "affordability",
        label: pairText(aiFactors.affordability_high),
        weight: 0.28,
        direction: "negative",
      });
      risk += 24;
    } else {
      factors.push({
        code: "affordability",
        label: pairText(aiFactors.affordability_mid),
        weight: 0.12,
        direction: "neutral",
      });
      risk += 6;
    }
  }

  const missing = input.checklist.filter((item) => item.required && !item.document);
  if (missing.length) {
    factors.push({
      code: "missing_docs",
      label: bilingual(
        `${missing.length} required document${missing.length === 1 ? "" : "s"} not uploaded`,
        missing.length === 1 ? "مستند مطلوب واحد لم يُرفع" : `${missing.length} مستندات مطلوبة لم تُرفع`,
      ),
      weight: 0.3,
      direction: "negative",
    });
    risk += missing.length * 10;
  }

  const failed = input.checklist.filter((item) => item.document?.validation_status === "error");
  if (failed.length) {
    factors.push({
      code: "validation_errors",
      label: bilingual(
        `${failed.length} document${failed.length === 1 ? "" : "s"} failed automated validation`,
        failed.length === 1 ? "مستند واحد فشل في التحقق الآلي" : `${failed.length} مستندات فشلت في التحقق الآلي`,
      ),
      weight: 0.26,
      direction: "negative",
    });
    risk += failed.length * 12;
  }

  const passed = input.checklist.filter((item) => item.document?.validation_status === "success");
  if (passed.length && !failed.length && !missing.length) {
    factors.push({
      code: "complete_packet",
      label: pairText(aiFactors.complete_packet),
      weight: 0.24,
      direction: "positive",
    });
    risk -= 10;
  }

  const openFlags = input.flags.filter((flag) => !flag.resolved_at);
  if (openFlags.length) {
    const critical = openFlags.some((flag) => flag.severity === "critical" || flag.severity === "high");
    factors.push({
      code: "open_flags",
      label: bilingual(
        `${openFlags.length} open risk flag${openFlags.length === 1 ? "" : "s"}`,
        openFlags.length === 1 ? "إشارة مخاطر مفتوحة واحدة" : `${openFlags.length} إشارات مخاطر مفتوحة`,
      ),
      weight: critical ? 0.32 : 0.18,
      direction: "negative",
    });
    risk += critical ? 28 : 12;
  }

  if (input.answers.employment_status === "unemployed") {
    factors.push({
      code: "employment",
      label: pairText(aiFactors.employment),
      weight: 0.2,
      direction: "negative",
    });
    risk += 16;
  }

  if (input.answers.residency_status === "visa") {
    factors.push({
      code: "residency",
      label: pairText(aiFactors.residency),
      weight: 0.14,
      direction: "neutral",
    });
    risk += 8;
  }

  risk = Math.max(4, Math.min(96, risk));

  let action: AiRecommendation["action"] = "review";
  if (risk < 28 && missing.length === 0 && failed.length === 0 && openFlags.length === 0) {
    action = "approve";
  } else if (risk >= 62 || failed.length >= 2 || openFlags.some((f) => f.severity === "critical")) {
    action = "reject";
  }

  const confidence = Number((1 - Math.abs(risk - 50) / 140).toFixed(2));

  const rationale = pairText(aiRationales[action] ?? aiRationales.review);

  return {
    action,
    confidence,
    rationale,
    risk_score: risk,
    factors,
  };
}
