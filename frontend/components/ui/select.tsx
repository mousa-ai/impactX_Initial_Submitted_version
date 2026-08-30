import { cn } from "@frontend/utils/cn";
import type { ReactNode, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  hint?: ReactNode;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export function Select({ className, label, hint, options, placeholder, id, ...props }: SelectProps) {
  const selectId = id ?? props.name;
  return (
    <label className="block space-y-2" htmlFor={selectId}>
      {label ? <span className="text-sm font-medium text-ink">{label}</span> : null}
      <select
        id={selectId}
        className={cn(
          "h-11 w-full appearance-none rounded-control border border-line bg-surface px-3 text-sm outline-none transition-all focus:border-gold/50 focus:ring-4 focus:ring-gold/15",
          className,
        )}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint ? <p className="text-xs text-ink-muted">{hint}</p> : null}
    </label>
  );
}
