import { BiInline } from "@frontend/components/ui/bilingual";
import { ValidationStatusBadge } from "@frontend/features/documents/validation-status";
import { documents, lookup } from "@backend/i18n/catalog";
import type { ChecklistItem } from "@backend/types";

export function DocumentChecklist({ items }: { items: ChecklistItem[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item.document_type.id}
          className="flex items-center justify-between gap-3 rounded-control border border-line bg-white px-4 py-3"
        >
          <div>
            <p className="text-sm font-medium">
              <BiInline pair={lookup(documents, item.document_type.key, item.document_type.name)} />
            </p>
            <p className="text-xs text-ink-muted">
              {item.required ? (
                <BiInline en="Required" ar="مطلوب" />
              ) : (
                <BiInline en="Optional" ar="اختياري" />
              )}
            </p>
          </div>
          {item.document ? (
            <ValidationStatusBadge status={item.document.validation_status} />
          ) : (
            <span className="text-xs text-ink-faint">
              <BiInline en="Missing" ar="ناقص" />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
