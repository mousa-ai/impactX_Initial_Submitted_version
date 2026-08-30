import { cn } from "@frontend/utils/cn";

export function Stepper({
  steps,
  current,
}: {
  steps: Array<{ id: string; label: string }>;
  current: number;
}) {
  return (
    <ol className="flex flex-wrap items-center gap-3">
      {steps.map((step, index) => {
        const active = index === current;
        const done = index < current;
        return (
          <li key={step.id} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium",
                  done && "bg-gold-gradient text-navy",
                  active && "bg-gold-soft text-navy",
                  !done && !active && "bg-canvas text-ink-faint",
                )}
              >
                {index + 1}
              </span>
              <span className={cn("text-sm", active ? "font-medium text-ink" : "text-ink-muted")}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 ? <span className="hidden h-px w-8 bg-line sm:block" /> : null}
          </li>
        );
      })}
    </ol>
  );
}
