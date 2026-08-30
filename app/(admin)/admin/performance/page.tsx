"use client";

import { Bi } from "@frontend/components/ui/bilingual";
import { useLocale } from "@frontend/hooks/use-locale";
import { PageTransition } from "@frontend/components/ui/page-transition";
import { ErrorState } from "@frontend/components/ui/error-state";
import { CardSkeleton } from "@frontend/components/ui/skeleton";
import { KpiCards } from "@frontend/features/performance/kpi-cards";
import { PerformanceCharts } from "@frontend/features/performance/performance-charts";
import { usePerformance } from "@frontend/hooks/use-admin";
import { useSession } from "@frontend/hooks/use-auth";

export default function PerformancePage() {
  const session = useSession();
  const performance = usePerformance();
  const { t } = useLocale();
  const role = session.data && "user" in session.data ? session.data.user?.role : null;

  if (role && role !== "manager") {
    return (
      <ErrorState
        title={<Bi en="Manager access only" ar="للمديرين فقط" compact />}
        message={<Bi en="Performance analytics are limited to managers." ar="تحليلات الأداء مقتصرة على المديرين." compact />}
      />
    );
  }

  if (performance.isLoading) return <CardSkeleton rows={6} />;
  if (performance.isError || !performance.data) {
    return <ErrorState message={performance.error?.message ?? "Unable to load"} onRetry={() => performance.refetch()} />;
  }

  const data = performance.data;

  return (
    <PageTransition>
      <h1 className="text-3xl font-semibold tracking-tight">
        <Bi en="Performance" ar="الأداء" compact />
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        <Bi en="Computed from status events, reviews, and flags." ar="محسوب من أحداث الحالة والمراجعات والإشارات." compact />
      </p>
      <div className="mt-8">
        <KpiCards
          items={[
            { label: t("Volume", "الحجم"), value: String(data.volume) },
            { label: t("Approval rate", "نسبة القبول"), value: `${Math.round(data.approval_rate * 100)}%` },
            {
              label: t("Median review", "وسيط المراجعة"),
              value: data.median_review_hours === null ? "—" : `${data.median_review_hours}h`,
            },
            { label: t("Flag rate", "معدل الإشارات"), value: `${Math.round(data.flag_rate * 100)}%` },
          ]}
        />
      </div>
      <div className="mt-6">
        <PerformanceCharts data={data} />
      </div>
    </PageTransition>
  );
}
