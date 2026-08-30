"use client";

import { Badge, statusTone } from "@frontend/components/ui/badge";
import { BiInline } from "@frontend/components/ui/bilingual";
import { Card, CardBody, CardHeader, CardTitle } from "@frontend/components/ui/card";
import { useLocale } from "@frontend/hooks/use-locale";
import { lookup, statuses, types } from "@backend/i18n/catalog";
import { formatCurrency } from "@frontend/utils/format";
import type { ApplicationDetail } from "@backend/types";

export function SummaryCard({ detail }: { detail: ApplicationDetail }) {
  const amount = detail.answers.find((row) => row.question.key === "loan_amount")?.value;
  const flags = detail.flags.filter((flag) => !flag.resolved_at);
  const docsOk = detail.documents.filter((doc) => doc.validation_status === "success").length;
  const { t, tp } = useLocale();

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle>{detail.applicant.full_name}</CardTitle>
          <p className="mt-1 text-sm text-ink-muted">{detail.applicant.email}</p>
        </div>
        <Badge tone={statusTone(detail.status.key)}>
          <BiInline pair={lookup(statuses, detail.status.key, detail.status.name)} />
        </Badge>
      </CardHeader>
      <CardBody className="grid gap-4 sm:grid-cols-3">
        <Metric label={t("Product", "المنتج")} value={tp(lookup(types, detail.type.key, detail.type.name))} />
        <Metric
          label={t("Requested", "المطلوب")}
          value={typeof amount === "number" ? formatCurrency(amount) : "—"}
        />
        <Metric label={t("Documents", "المستندات")} value={`${docsOk}/${detail.checklist.length}`} />
        <Metric label={t("Open flags", "إشارات مفتوحة")} value={String(flags.length)} />
        <Metric label={t("Phone", "الهاتف")} value={detail.applicant.phone ?? "—"} />
        <Metric label={t("File ID", "رقم الملف")} value={detail.application.id.slice(0, 8)} />
      </CardBody>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-control bg-canvas px-4 py-3">
      <p className="text-xs uppercase tracking-[0.14em] text-ink-faint">{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
