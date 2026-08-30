import { cn } from "@frontend/utils/cn";
import type { ButtonHTMLAttributes } from "react";

const variants = {
  primary:
    "bg-gold-gradient text-navy shadow-gold hover:-translate-y-0.5 hover:shadow-lift disabled:bg-none disabled:bg-silver disabled:text-ink-faint disabled:shadow-none",
  secondary:
    "bg-surface text-navy border border-silver/80 hover:border-gold/50 hover:bg-gold-soft",
  outline:
    "bg-transparent text-gold border border-gold/70 hover:bg-gold/10 hover:-translate-y-0.5",
  ghost: "bg-transparent text-ink hover:bg-gold-soft",
  danger: "bg-terracotta text-white hover:opacity-90",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-[15px]",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-control font-semibold tracking-wide transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
