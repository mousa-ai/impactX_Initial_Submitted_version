import { Badge, statusTone } from "@frontend/components/ui/badge";
import { BiInline } from "@frontend/components/ui/bilingual";
import { lookup, validation } from "@backend/i18n/catalog";
import type { ValidationStatus } from "@backend/types";

export function ValidationStatusBadge({ status }: { status: ValidationStatus }) {
  return (
    <Badge tone={statusTone(status)}>
      <BiInline pair={lookup(validation, status)} />
    </Badge>
  );
}
