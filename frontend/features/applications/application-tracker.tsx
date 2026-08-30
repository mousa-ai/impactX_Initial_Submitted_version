"use client";

import { Badge, statusTone } from "@frontend/components/ui/badge";
import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@frontend/components/ui/card";
import { StatusPipeline } from "@frontend/components/ui/status-pipeline";
import { lookup, overlay, statuses, types } from "@backend/i18n/catalog";
import { formatDateTime } from "@frontend/utils/format";
import type { ApplicationDetail } from "@backend/types";

export function ApplicationTracker({ detail }: { detail: ApplicationDetail }) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle>
            <Bi pair={lookup(types, detail.type.key, detail.type.name)} compact />
          </CardTitle>
          <CardDescription>
            <Bi en="Live status from the application_status catalog." ar="حالة مباشرة من كتالوج الحالات." compact />
          </CardDescription>
        </div>
        <Badge tone={statusTone(detail.status.key)}>
          <BiInline pair={lookup(statuses, detail.status.key, detail.status.name)} />
        </Badge>
      </CardHeader>
      <CardBody className="space-y-6">
        <StatusPipeline statuses={detail.statuses} currentKey={detail.status.key} />
        <ol className="space-y-4">
          {detail.events.map((event) => {
            const status = detail.statuses.find((item) => item.id === event.status_id);
            return (
              <li key={event.id} className="grid gap-1 border-l border-line pl-4">
                <p className="text-sm font-medium">
                  {status ? (
                    <BiInline pair={lookup(statuses, status.key, status.name)} />
                  ) : (
                    <BiInline en="Update" ar="تحديث" />
                  )}
                </p>
                {event.note ? (
                  <p className="text-sm text-ink-muted">
                    <Bi pair={overlay(event.note)} compact />
                  </p>
                ) : null}
                <p className="text-xs text-ink-faint">{formatDateTime(event.created_at)}</p>
              </li>
            );
          })}
        </ol>
      </CardBody>
    </Card>
  );
}
