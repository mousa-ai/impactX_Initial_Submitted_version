"use client";

import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { PageTransition } from "@frontend/components/ui/page-transition";
import { ErrorState } from "@frontend/components/ui/error-state";
import { CardSkeleton } from "@frontend/components/ui/skeleton";
import { KpiCards } from "@frontend/features/performance/kpi-cards";
import { useAdminDashboard } from "@frontend/hooks/use-admin";
import { useLocale } from "@frontend/hooks/use-locale";
import { lookup, overlay, statuses } from "@backend/i18n/catalog";
import { relativeTime } from "@frontend/utils/format";
import Link from "next/link";

export default function AdminDashboardPage() {
  const dashboard = useAdminDashboard();
  const { t } = useLocale();

  if (dashboard.isLoading) {
    return (
      <div className="grid gap-4">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (dashboard.isError || !dashboard.data) {
    return <ErrorState message={dashboard.error?.message ?? "Unable to load"} onRetry={() => dashboard.refetch()} />;
  }

  const data = dashboard.data;

  return (
    <PageTransition>
      <h1 className="text-3xl font-semibold tracking-tight">
        <Bi en="Review operations" ar="عمليات المراجعة" compact />
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        <Bi en="Live counts from the application store — nothing is hardcoded." ar="أعداد مباشرة من المخزن — لا شيء ثابت." compact />
      </p>
      <div className="mt-8">
        <KpiCards
          items={[
            { label: t("Total applications", "إجمالي الطلبات"), value: String(data.total_applications) },
            { label: t("Open flags", "إشارات مفتوحة"), value: String(data.open_flags) },
            {
              label: t("Avg. review time", "متوسط المراجعة"),
              value: data.avg_review_hours === null ? "—" : `${data.avg_review_hours}h`,
            },
            {
              label: t("In review", "قيد المراجعة"),
              value: String(data.by_status.find((row) => row.status.key === "under_review")?.count ?? 0),
            },
          ]}
        />
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <section className="rounded-card border border-line bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold">
            <Bi en="Pipeline" ar="المسار" compact />
          </h2>
          <ul className="mt-4 space-y-3">
            {data.by_status
              .filter((row) => row.status.pipeline_visible || row.count > 0)
              .map((row) => (
                <li key={row.status.id} className="flex items-center justify-between text-sm">
                  <span className="text-ink-muted">
                    <BiInline pair={lookup(statuses, row.status.key, row.status.name)} />
                  </span>
                  <span className="font-medium">{row.count}</span>
                </li>
              ))}
          </ul>
        </section>
        <section className="rounded-card border border-line bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold">
            <Bi en="Activity" ar="النشاط" compact />
          </h2>
          <ul className="mt-4 space-y-4">
            {data.activity.map((event) => (
              <li key={event.id}>
                <p className="text-sm">
                  <Bi pair={overlay(event.message)} compact />
                </p>
                <p className="mt-1 text-xs text-ink-faint">{relativeTime(event.created_at)}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="mt-6">
        <Link href="/admin/applications" className="text-sm text-ink-muted hover:text-ink">
          <BiInline en="Open the review queue →" ar="افتح طابور المراجعة ←" />
        </Link>
      </div>
    </PageTransition>
  );
}
