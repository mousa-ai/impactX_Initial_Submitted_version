"use client";

import { Bi } from "@frontend/components/ui/bilingual";
import { lookup, statuses as statusCopy } from "@backend/i18n/catalog";
import { cn } from "@frontend/utils/cn";
import type { ApplicationStatus } from "@backend/types";

export function StatusPipeline({
  statuses,
  currentKey,
}: {
  statuses: ApplicationStatus[];
  currentKey: string;
}) {
  const visible = statuses.filter((status) => status.pipeline_visible);
  const current = statuses.find((status) => status.key === currentKey);
  const currentOrder = current?.sort_order ?? 0;

  return (
    <div className="overflow-x-auto">
      <ol className="flex min-w-[520px] items-center gap-0">
        {visible.map((status, index) => {
          const reached = currentOrder >= status.sort_order && currentKey !== "needs_resubmission"
            ? true
            : currentKey === status.key || (currentKey === "needs_resubmission" && status.sort_order <= 3);
          const isCurrent = status.key === currentKey || (currentKey === "needs_resubmission" && status.key === "needs_resubmission");
          const failed = currentKey === "rejected" && status.key === "rejected";
          return (
            <li key={status.id} className="flex flex-1 items-center">
              <div className="flex min-w-0 flex-col items-center text-center">
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full",
                    isCurrent && failed && "bg-terracotta",
                    isCurrent && currentKey === "approved" && "bg-forest",
                    isCurrent && !failed && currentKey !== "approved" && "bg-accent",
                    reached && !isCurrent && "bg-accent/50",
                    !reached && "bg-line",
                  )}
                />
                <span className={cn("mt-2 text-xs", isCurrent ? "font-medium text-ink" : "text-ink-muted")}>
                  <Bi pair={lookup(statusCopy, status.key, status.name)} compact />
                </span>
              </div>
              {index < visible.length - 1 ? (
                <div className={cn("mx-2 mb-5 h-px flex-1", reached ? "bg-accent/30" : "bg-line")} />
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
