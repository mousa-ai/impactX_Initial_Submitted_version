"use client";

import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { overlay } from "@backend/i18n/catalog";
import { Button } from "./button";
import type { ReactNode } from "react";

export function ErrorState({
  title,
  message,
  onRetry,
}: {
  title?: ReactNode;
  message: ReactNode;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-card border border-terracotta/20 bg-terracotta-soft/50 px-6 py-10 text-center">
      <h3 className="text-base font-semibold text-terracotta">
        {title ?? <BiInline en="Something went wrong" ar="حدث خطأ ما" />}
      </h3>
      <div className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
        {typeof message === "string" ? <Bi pair={overlay(message)} compact /> : message}
      </div>
      {onRetry ? (
        <Button className="mt-5" variant="secondary" onClick={onRetry}>
          <BiInline en="Try again" ar="حاول مرة أخرى" />
        </Button>
      ) : null}
    </div>
  );
}
