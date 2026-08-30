"use client";

import { Badge, statusTone } from "@frontend/components/ui/badge";
import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { EmptyState } from "@frontend/components/ui/empty-state";
import { ErrorState } from "@frontend/components/ui/error-state";
import { PageTransition } from "@frontend/components/ui/page-transition";
import { CardSkeleton } from "@frontend/components/ui/skeleton";
import { useFlags } from "@frontend/hooks/use-admin";
import { flagCodes, lookup, overlay, severities } from "@backend/i18n/catalog";
import { formatDateTime } from "@frontend/utils/format";
import Link from "next/link";

interface FlagRow {
  id: string;
  application_id: string;
  severity: string;
  code: string;
  message: string;
  created_at: string;
  applicant?: { full_name: string };
}

export default function FlagsPage() {
  const flags = useFlags();

  return (
    <PageTransition>
      <h1 className="text-3xl font-semibold tracking-tight">
        <Bi en="Risk flags" ar="إشارات المخاطر" compact />
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        <Bi en="Open items from automated validation and policy checks." ar="عناصر مفتوحة من التحقق الآلي وفحوصات السياسة." compact />
      </p>
      <div className="mt-8">
        {flags.isLoading ? <CardSkeleton rows={5} /> : null}
        {flags.isError ? <ErrorState message={flags.error.message} onRetry={() => flags.refetch()} /> : null}
        {flags.data && (flags.data as FlagRow[]).length === 0 ? (
          <EmptyState
            title={<Bi en="Queue is clear" ar="الطابور فارغ" compact />}
            description={<Bi en="No unresolved flags across the book." ar="لا إشارات معلّقة في المحفظة." compact />}
          />
        ) : null}
        <div className="grid gap-3">
          {(flags.data as FlagRow[] | undefined)?.map((flag) => (
            <Link
              key={flag.id}
              href={`/admin/applications/${flag.application_id}`}
              className="rounded-card border border-line bg-white p-5 shadow-soft hover:shadow-lift"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{flag.applicant?.full_name ?? <BiInline pair={lookup(flagCodes, flag.code, flag.code)} />}</p>
                  <p className="mt-1 text-sm text-ink-muted">
                    <Bi pair={overlay(flag.message)} compact />
                  </p>
                  <p className="mt-2 text-xs text-ink-faint">{formatDateTime(flag.created_at)}</p>
                </div>
                <Badge tone={statusTone(flag.severity)}>
                  <BiInline pair={lookup(severities, flag.severity, flag.severity)} />
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
