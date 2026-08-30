"use client";

import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { Button } from "@frontend/components/ui/button";
import { ErrorState } from "@frontend/components/ui/error-state";
import { PageTransition } from "@frontend/components/ui/page-transition";
import { CardSkeleton } from "@frontend/components/ui/skeleton";
import { ApplicationTracker } from "@frontend/features/applications/application-tracker";
import { RejectionFeedback } from "@frontend/features/applications/rejection-feedback";
import { DocumentChecklist } from "@frontend/features/checklist/document-checklist";
import { DocumentUploader } from "@frontend/features/documents/document-uploader";
import { useApplication, useSubmitApplication } from "@frontend/hooks/use-applications";
import { lookup, types } from "@backend/i18n/catalog";
import { useUiStore } from "@frontend/store/ui";
import { Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";

function ApplicationDetailInner() {
  const params = useParams<{ id: string }>();
  const search = useSearchParams();
  const query = useApplication(params.id);
  const submit = useSubmitApplication(params.id);
  const pushToast = useUiStore((s) => s.pushToast);
  const showUpload =
    search.get("reupload") === "1" ||
    query.data?.status.key === "draft" ||
    query.data?.status.key === "needs_resubmission";

  if (query.isLoading) return <CardSkeleton rows={6} />;
  if (query.isError || !query.data) {
    return <ErrorState message={query.error?.message ?? "Not found"} onRetry={() => query.refetch()} />;
  }

  const detail = query.data;

  return (
    <PageTransition>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-ink-muted">
            <BiInline pair={lookup(types, detail.type.key, detail.type.name)} />
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            <Bi en="Application" ar="الطلب" compact />
          </h1>
        </div>
        {detail.status.key === "draft" || detail.status.key === "needs_resubmission" ? (
          <Button
            onClick={async () => {
              try {
                await submit.mutateAsync();
                pushToast({ title: "Submitted for review · قُدّم للمراجعة", tone: "success" });
              } catch (error) {
                pushToast({
                  title: "Cannot submit · لا يمكن التقديم",
                  message: error instanceof Error ? error.message : "Complete the checklist first",
                  tone: "danger",
                });
              }
            }}
            disabled={submit.isPending}
          >
            <BiInline en="Submit" ar="تقديم" />
          </Button>
        ) : null}
      </div>
      <div className="mt-8 grid gap-5">
        <ApplicationTracker detail={detail} />
        <RejectionFeedback detail={detail} />
        <section className="rounded-card border border-line bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold">
            <Bi en="Required documents" ar="المستندات المطلوبة" compact />
          </h2>
          <div className="mt-4">
            <DocumentChecklist items={detail.checklist} />
          </div>
        </section>
        {showUpload ? <DocumentUploader applicationId={detail.application.id} /> : null}
      </div>
    </PageTransition>
  );
}

export default function ApplicationDetailPage() {
  return (
    <Suspense fallback={<CardSkeleton rows={6} />}>
      <ApplicationDetailInner />
    </Suspense>
  );
}
