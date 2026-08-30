"use client";

import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { overlay } from "@backend/i18n/catalog";
import { Button } from "@frontend/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@frontend/components/ui/card";
import type { ApplicationDetail } from "@backend/types";
import Link from "next/link";

export function RejectionFeedback({ detail }: { detail: ApplicationDetail }) {
  const latest = detail.reviews[0];
  const openFlags = detail.flags.filter((flag) => !flag.resolved_at);
  const resubmit = detail.status.key === "needs_resubmission" || detail.status.key === "rejected";
  if (!resubmit || !latest) return null;

  return (
    <Card className="border-terracotta/20">
      <CardHeader>
        <CardTitle>
          <Bi en="What needs to change" ar="ما الذي يجب تغييره" compact />
        </CardTitle>
        <CardDescription>
          <Bi en="From the latest review, not a static template." ar="من آخر مراجعة، وليس قالباً ثابتاً." compact />
        </CardDescription>
      </CardHeader>
      <CardBody className="space-y-4">
        <p className="text-sm leading-6 text-ink">
          <Bi pair={overlay(latest.rationale)} compact />
        </p>
        {openFlags.length ? (
          <ul className="space-y-2">
            {openFlags.map((flag) => (
              <li key={flag.id} className="rounded-control bg-terracotta-soft px-3 py-2 text-sm text-terracotta">
                <Bi pair={overlay(flag.message)} compact />
              </li>
            ))}
          </ul>
        ) : null}
        <Link href={`/app/applications/${detail.application.id}?reupload=1`}>
          <Button variant="secondary">
            <BiInline en="Re-upload documents" ar="أعد رفع المستندات" />
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
}
