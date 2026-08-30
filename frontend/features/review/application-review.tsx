"use client";

import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { ErrorState } from "@frontend/components/ui/error-state";
import { CardSkeleton } from "@frontend/components/ui/skeleton";
import { ValidationStatusBadge } from "@frontend/features/documents/validation-status";
import { FlagsList } from "@frontend/features/flags/flags-list";
import { AiRecommendationBox } from "@frontend/features/review/ai-recommendation";
import { ReviewActions } from "@frontend/features/review/review-actions";
import { SummaryCard } from "@frontend/features/review/summary-card";
import { useAdminApplication } from "@frontend/hooks/use-admin";
import { documents, lookup } from "@backend/i18n/catalog";
import { formatBytes } from "@frontend/utils/format";

export function ApplicationReview({ id }: { id: string }) {
  const query = useAdminApplication(id);

  if (query.isLoading) {
    return (
      <div className="grid gap-4">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (query.isError || !query.data) {
    return <ErrorState message={query.error?.message ?? "File not found"} onRetry={() => query.refetch()} />;
  }

  const detail = query.data;

  return (
    <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-5">
        <SummaryCard detail={detail} />
        <AiRecommendationBox recommendation={detail.recommendation} />
        <div className="rounded-card border border-line bg-white p-6 shadow-soft">
          <h3 className="text-lg font-semibold">
            <Bi en="Documents" ar="المستندات" compact />
          </h3>
          <ul className="mt-4 space-y-3">
            {detail.documents.map((doc) => (
              <li key={doc.id} className="flex items-center justify-between gap-3 rounded-control bg-canvas px-3 py-3">
                <div>
                  <p className="text-sm font-medium">
                    <BiInline pair={lookup(documents, doc.document_type.key, doc.document_type.name)} />
                  </p>
                  <p className="text-xs text-ink-muted">
                    {doc.file_name} · {formatBytes(doc.size_bytes)}
                  </p>
                </div>
                <ValidationStatusBadge status={doc.validation_status} />
              </li>
            ))}
          </ul>
        </div>
        <FlagsList flags={detail.flags} />
      </div>
      <ReviewActions applicationId={id} />
    </div>
  );
}
