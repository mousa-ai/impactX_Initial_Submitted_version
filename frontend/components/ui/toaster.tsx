"use client";

import { Bi } from "@frontend/components/ui/bilingual";
import { overlay } from "@backend/i18n/catalog";
import { useUiStore } from "@frontend/store/ui";
import { cn } from "@frontend/utils/cn";
import { useEffect } from "react";

export function Toaster() {
  const { toasts, dismissToast } = useUiStore();

  useEffect(() => {
    const timers = toasts.map((toast) => setTimeout(() => dismissToast(toast.id), 4200));
    return () => timers.forEach(clearTimeout);
  }, [toasts, dismissToast]);

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "pointer-events-auto rounded-card border bg-white px-4 py-3 shadow-lift",
            toast.tone === "success" && "border-forest/20",
            toast.tone === "danger" && "border-terracotta/20",
            toast.tone === "neutral" && "border-line",
          )}
        >
          <p className="text-sm font-medium">
            <Bi pair={overlay(toast.title)} compact />
          </p>
          {toast.message ? (
            <p className="mt-1 text-xs text-ink-muted">
              <Bi pair={overlay(toast.message)} compact />
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
