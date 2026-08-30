"use client";

import { Badge, statusTone } from "@frontend/components/ui/badge";
import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { EmptyState } from "@frontend/components/ui/empty-state";
import { ErrorState } from "@frontend/components/ui/error-state";
import { Input } from "@frontend/components/ui/input";
import { PageTransition } from "@frontend/components/ui/page-transition";
import { CardSkeleton } from "@frontend/components/ui/skeleton";
import { useAdminApplications } from "@frontend/hooks/use-admin";
import { useApplicationTypes, useStatuses } from "@frontend/hooks/use-applications";
import { useLocale } from "@frontend/hooks/use-locale";
import { aiActions, lookup, statuses as statusCopy, types as typeCopy } from "@backend/i18n/catalog";
import { formatDate } from "@frontend/utils/format";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function AdminApplicationsPage() {
  const types = useApplicationTypes();
  const statuses = useStatuses();
  const [query, setQuery] = useState("");
  const [statusKey, setStatusKey] = useState("");
  const [typeId, setTypeId] = useState("");
  const filters = useMemo(
    () => ({
      query: query || undefined,
      statusKey: statusKey || undefined,
      typeId: typeId || undefined,
    }),
    [query, statusKey, typeId],
  );
  const list = useAdminApplications(filters);
  const { t, tp } = useLocale();

  return (
    <PageTransition>
      <h1 className="text-3xl font-semibold tracking-tight">
        <Bi en="Applications" ar="الطلبات" compact />
      </h1>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <Input
          label={<BiInline en="Search" ar="بحث" />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("Name, email, file", "اسم، بريد، ملف")}
        />
        <label className="block space-y-2">
          <span className="text-sm font-medium">
            <BiInline en="Status" ar="الحالة" />
          </span>
          <select
            className="h-11 w-full rounded-control border border-line bg-white px-3 text-sm"
            value={statusKey}
            onChange={(e) => setStatusKey(e.target.value)}
          >
            <option value="">{t("All statuses", "كل الحالات")}</option>
            {statuses.data?.map((status) => (
              <option key={status.id} value={status.key}>
                {tp(lookup(statusCopy, status.key, status.name))}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">
            <BiInline en="Product" ar="المنتج" />
          </span>
          <select
            className="h-11 w-full rounded-control border border-line bg-white px-3 text-sm"
            value={typeId}
            onChange={(e) => setTypeId(e.target.value)}
          >
            <option value="">{t("All products", "كل المنتجات")}</option>
            {types.data?.map((type) => (
              <option key={type.id} value={type.id}>
                {tp(lookup(typeCopy, type.key, type.name))}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6">
        {list.isLoading ? <CardSkeleton rows={6} /> : null}
        {list.isError ? <ErrorState message={list.error.message} onRetry={() => list.refetch()} /> : null}
        {list.data && list.data.length === 0 ? (
          <EmptyState
            title={<Bi en="No matching files" ar="لا ملفات مطابقة" compact />}
            description={<Bi en="Adjust filters or wait for the next submission." ar="عدّل الفلاتر أو انتظر التقديم التالي." compact />}
          />
        ) : null}
        <div className="grid gap-3">
          {list.data?.map((row) => (
            <Link
              key={row.application.id}
              href={`/admin/applications/${row.application.id}`}
              className="rounded-card border border-line bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{row.applicant.full_name}</p>
                  <p className="mt-1 text-sm text-ink-muted">
                    <BiInline pair={lookup(typeCopy, row.type.key, row.type.name)} /> · {formatDate(row.application.updated_at)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {row.recommendation ? (
                    <Badge tone={statusTone(row.recommendation.action)}>
                      <BiInline pair={lookup(aiActions, row.recommendation.action)} />
                    </Badge>
                  ) : null}
                  <Badge tone={statusTone(row.status.key)}>
                    <BiInline pair={lookup(statusCopy, row.status.key, row.status.name)} />
                  </Badge>
                </div>
              </div>
              <p className="mt-3 text-sm text-ink-muted">
                {row.validated_count}/{row.document_count} <BiInline en="validated" ar="تم التحقق" /> · {row.flag_count}{" "}
                <BiInline en="open flags" ar="إشارات مفتوحة" />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
