"use client";

import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { Button } from "@frontend/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@frontend/components/ui/card";
import { useSubmitReview } from "@frontend/hooks/use-admin";
import { useLocale } from "@frontend/hooks/use-locale";
import { decisions as decisionCopy, lookup } from "@backend/i18n/catalog";
import { useUiStore } from "@frontend/store/ui";
import type { ReviewDecision } from "@backend/types";
import { useState } from "react";

const decisions: Array<{ value: ReviewDecision; label: string }> = [
  { value: "approve", label: "Approve" },
  { value: "review", label: "Keep in review" },
  { value: "request_resubmission", label: "Request resubmission" },
  { value: "reject", label: "Reject" },
];

export function ReviewActions({ applicationId }: { applicationId: string }) {
  const review = useSubmitReview(applicationId);
  const pushToast = useUiStore((s) => s.pushToast);
  const [decision, setDecision] = useState<ReviewDecision>("review");
  const [rationale, setRationale] = useState("");
  const { t } = useLocale();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Bi en="Decision" ar="القرار" compact />
        </CardTitle>
      </CardHeader>
      <CardBody className="space-y-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {decisions.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setDecision(item.value)}
              className={`rounded-control border px-3 py-2 text-sm ${
                decision === item.value ? "border-gold bg-gold-soft text-navy" : "border-line bg-surface"
              }`}
            >
              <BiInline pair={lookup(decisionCopy, item.value, item.label)} />
            </button>
          ))}
        </div>
        <textarea
          value={rationale}
          onChange={(event) => setRationale(event.target.value)}
          placeholder={t(
            "Explain the decision. This is shown to the applicant if they need to re-upload.",
            "اشرح القرار. يظهر للمتقدم إن لزم إعادة الرفع.",
          )}
          className="min-h-32 w-full rounded-control border border-line px-3 py-2 text-sm outline-none focus:border-accent/40 focus:ring-4 focus:ring-accent/10"
        />
        <Button
          disabled={review.isPending || rationale.trim().length < 8}
          onClick={async () => {
            try {
              await review.mutateAsync({ decision, rationale });
              pushToast({ title: "Decision recorded · تم تسجيل القرار", tone: "success" });
            } catch (error) {
              pushToast({
                title: "Could not save decision · تعذر حفظ القرار",
                message: error instanceof Error ? error.message : "Try again",
                tone: "danger",
              });
            }
          }}
        >
          {review.isPending ? (
            <BiInline en="Saving…" ar="جارٍ الحفظ…" />
          ) : (
            <BiInline en="Post decision" ar="نشر القرار" />
          )}
        </Button>
      </CardBody>
    </Card>
  );
}
