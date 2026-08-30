"use client";

import { Bi } from "@frontend/components/ui/bilingual";
import { PageTransition } from "@frontend/components/ui/page-transition";
import { ApplicationReview } from "@frontend/features/review/application-review";
import { useParams } from "next/navigation";

export default function AdminApplicationPage() {
  const params = useParams<{ id: string }>();
  return (
    <PageTransition>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">
        <Bi en="Review" ar="المراجعة" compact />
      </h1>
      <ApplicationReview id={params.id} />
    </PageTransition>
  );
}
