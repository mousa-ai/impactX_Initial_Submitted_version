import type { Pair } from "@backend/i18n/catalog";
import { useUiStore } from "@frontend/store/ui";

export function useLocale() {
  const locale = useUiStore((state) => state.locale);
  const setLocale = useUiStore((state) => state.setLocale);
  const t = (en: string, ar: string) => (locale === "ar" ? ar : en);
  const tp = (pair: Pair) => pair[locale];

  return {
    locale,
    setLocale,
    t,
    tp,
    isAr: locale === "ar",
  };
}
