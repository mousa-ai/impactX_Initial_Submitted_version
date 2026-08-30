"use client";

import { useLocale } from "@frontend/hooks/use-locale";
import { cn } from "@frontend/utils/cn";
import type { Pair } from "@backend/i18n/catalog";

export function Bi({
  en,
  ar,
  pair,
  className,
}: {
  en?: string;
  ar?: string;
  pair?: Pair;
  className?: string;
  arClassName?: string;
  compact?: boolean;
}) {
  const { locale, isAr } = useLocale();
  const english = pair?.en ?? en ?? "";
  const arabic = pair?.ar ?? ar ?? "";
  const text = locale === "ar" ? arabic : english;
  return (
    <span className={cn("block", isAr && "font-arabic", className)} dir={isAr ? "rtl" : "ltr"} lang={locale}>
      {text}
    </span>
  );
}

export function BiInline({
  en,
  ar,
  pair,
  className,
}: {
  en?: string;
  ar?: string;
  pair?: Pair;
  className?: string;
}) {
  const { locale, isAr } = useLocale();
  const english = pair?.en ?? en ?? "";
  const arabic = pair?.ar ?? ar ?? "";
  const text = locale === "ar" ? arabic : english;
  return (
    <span className={cn("inline", isAr && "font-arabic", className)} dir={isAr ? "rtl" : "ltr"} lang={locale}>
      {text}
    </span>
  );
}
