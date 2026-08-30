import { cn } from "@frontend/utils/cn";
import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  suffix?: ReactNode;
}

export function Input({ className, label, hint, error, suffix, id, ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <label className="block space-y-2" htmlFor={inputId}>
      {label ? <span className="block text-sm font-medium text-ink">{label}</span> : null}
      <div className="relative">
        <input
          id={inputId}
          className={cn(
            "h-11 w-full rounded-control border border-line bg-surface px-3 text-sm outline-none transition-all placeholder:text-ink-faint focus:border-gold/50 focus:ring-4 focus:ring-gold/15",
            error && "border-terracotta focus:border-terracotta focus:ring-terracotta/10",
            suffix && "pr-10",
            className,
          )}
          {...props}
        />
        {suffix ? <div className="absolute inset-y-0 right-3 flex items-center">{suffix}</div> : null}
      </div>
      {error ? <p className="text-xs text-terracotta">{error}</p> : hint ? <p className="text-xs text-ink-muted">{hint}</p> : null}
    </label>
  );
}
