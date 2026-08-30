import { Badge, statusTone } from "@frontend/components/ui/badge";
import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { EmptyState } from "@frontend/components/ui/empty-state";
import { Card, CardBody, CardHeader, CardTitle } from "@frontend/components/ui/card";
import { flagCodes, lookup, overlay, severities } from "@backend/i18n/catalog";
import type { Flag } from "@backend/types";

export function FlagsList({ flags }: { flags: Flag[] }) {
  const open = flags.filter((flag) => !flag.resolved_at);
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Bi en="Fraud and quality flags" ar="إشارات الاحتيال والجودة" compact />
        </CardTitle>
      </CardHeader>
      <CardBody>
        {open.length === 0 ? (
          <EmptyState
            title={<Bi en="No open flags" ar="لا إشارات مفتوحة" compact />}
            description={
              <Bi
                en="Automated checks have not raised residual risk on this file."
                ar="الفحوصات الآلية لم تسجّل مخاطر متبقية على هذا الملف."
                compact
              />
            }
            className="border-none bg-canvas py-10 shadow-none"
          />
        ) : (
          <ul className="space-y-3">
            {open.map((flag) => (
              <li key={flag.id} className="rounded-control border border-line px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium">
                    <BiInline pair={lookup(flagCodes, flag.code, flag.code.replaceAll("_", " "))} />
                  </p>
                  <Badge tone={statusTone(flag.severity)}>
                    <BiInline pair={lookup(severities, flag.severity, flag.severity)} />
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-ink-muted">
                  <Bi pair={overlay(flag.message)} compact />
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
