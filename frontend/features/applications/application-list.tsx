"use client";

import { Badge, statusTone } from "@frontend/components/ui/badge";
import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { Button } from "@frontend/components/ui/button";
import { EmptyState } from "@frontend/components/ui/empty-state";
import { ErrorState } from "@frontend/components/ui/error-state";
import { CardSkeleton } from "@frontend/components/ui/skeleton";
import { useMyApplications } from "@frontend/hooks/use-applications";
import { lookup, statuses, types } from "@backend/i18n/catalog";
import { formatDate } from "@frontend/utils/format";
import Link from "next/link";

export function ApplicationList() {
  const applications = useMyApplications();

  if (applications.isLoading) {
    return (
      <div className="grid gap-4">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (applications.isError) {
    return <ErrorState message={applications.error.message} onRetry={() => applications.refetch()} />;
  }

  if (!applications.data?.length) {
    return (
      <EmptyState
        title={<Bi en="No applications yet" ar="لا طلبات بعد" compact />}
        description={
          <Bi
            en="Start a file and Elevation will generate the exact document checklist from your answers."
            ar="ابدأ ملفاً وسيتولى إليفيشن توليد قائمة المستندات من إجاباتك."
            compact
          />
        }
        action={
          <Link href="/app/apply">
            <Button>
              <BiInline en="Start application" ar="ابدأ طلباً" />
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-4">
      {applications.data.map((detail) => (
        <Link
          key={detail.application.id}
          href={`/app/applications/${detail.application.id}`}
          className="rounded-card border border-line bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold">
                <Bi pair={lookup(types, detail.type.key, detail.type.name)} compact />
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                <BiInline
                  en={`Updated ${formatDate(detail.application.updated_at)}`}
                  ar={`آخر تحديث ${formatDate(detail.application.updated_at)}`}
                />
              </p>
            </div>
            <Badge tone={statusTone(detail.status.key)}>
              <BiInline pair={lookup(statuses, detail.status.key, detail.status.name)} />
            </Badge>
          </div>
          <p className="mt-4 text-sm text-ink-muted">
            {detail.checklist.filter((item) => item.document).length} / {detail.checklist.length}{" "}
            <BiInline en="documents on file" ar="مستندات في الملف" />
          </p>
        </Link>
      ))}
    </div>
  );
}
