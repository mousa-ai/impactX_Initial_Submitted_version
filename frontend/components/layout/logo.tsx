"use client";

import { useLocale } from "@frontend/hooks/use-locale";
import { cn } from "@frontend/utils/cn";
import Image from "next/image";

export function Logo({
  className,
  light = false,
  size = "md",
}: {
  className?: string;
  light?: boolean;
  size?: "sm" | "md" | "lg" | "lockup";
}) {
  const { isAr } = useLocale();

  if (size === "lg" || size === "lockup") {
    return (
      <span className={cn("inline-flex", className)}>
        <Image
          src="/brand/logo-lockup.png"
          alt={isAr ? "إليفيشن — منصة إقراض ذكية" : "Elevation — AI-Driven Loan Platform"}
          width={310}
          height={242}
          priority
          className={cn(
            "h-auto object-contain",
            size === "lg" ? "w-[240px] sm:w-[280px]" : "w-[168px]",
          )}
        />
      </span>
    );
  }

  const px = size === "sm" ? 36 : 48;

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/brand/logo-mark.png"
        alt="Elevation"
        width={px}
        height={Math.round(px * 0.7)}
        priority
        className={cn("h-auto object-contain", light && "rounded-md bg-cream p-0.5")}
        style={{ width: px }}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[17px] font-bold uppercase tracking-[0.16em]",
            isAr && "font-display-ar tracking-normal",
            light ? "text-cream" : "text-navy",
          )}
          dir={isAr ? "rtl" : "ltr"}
          lang={isAr ? "ar" : "en"}
        >
          {isAr ? "إليفيشن" : "Elevation"}
        </span>
        <span
          className={cn(
            "mt-1 text-[8px] font-medium uppercase tracking-[0.14em]",
            light ? "text-silver" : "text-ink-faint",
          )}
        >
          {isAr ? "منصة إقراض ذكية" : "AI-Driven Loan Platform"}
        </span>
      </span>
    </span>
  );
}
