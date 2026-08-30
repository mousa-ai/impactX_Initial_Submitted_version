"use client";

import { useLocale } from "@frontend/hooks/use-locale";
import { cn } from "@frontend/utils/cn";

export function LanguageSwitch({ light = false }: { light?: boolean }) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border p-0.5 text-xs font-semibold tracking-wide",
        light ? "border-gold/30 bg-white/5 text-silver" : "border-line bg-surface text-ink-muted",
      )}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          locale === "en" && (light ? "bg-gold-gradient text-navy" : "bg-gold-soft text-navy"),
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("ar")}
        className={cn(
          "rounded-full px-2.5 py-1 font-arabic transition-colors",
          locale === "ar" && (light ? "bg-gold-gradient text-navy" : "bg-gold-soft text-navy"),
        )}
      >
        ع
      </button>
    </div>
  );
}
