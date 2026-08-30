import { bilingual, overlay, pairText } from "@backend/i18n/catalog";
import type { DocumentRecord, DocumentType, ValidationIssue } from "@backend/types";

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function validateDocument(document: DocumentRecord, documentType: DocumentType) {
  const issues: ValidationIssue[] = [];
  const name = document.file_name.toLowerCase();

  if (!documentType.accepted_mime_types.includes(document.mime_type)) {
    issues.push({
      code: "mime_not_allowed",
      message: bilingual(
        `${documentType.name} must be one of: ${documentType.accepted_mime_types.join(", ")}.`,
        `${documentType.name} يجب أن يكون أحد الأنواع: ${documentType.accepted_mime_types.join(", ")}.`,
      ),
      field: "mime_type",
    });
  }

  if (document.size_bytes > documentType.max_size_bytes) {
    issues.push({
      code: "file_too_large",
      message: bilingual(
        `${documentType.name} exceeds the ${Math.round(documentType.max_size_bytes / (1024 * 1024))}MB limit.`,
        `${documentType.name} يتجاوز حد ${Math.round(documentType.max_size_bytes / (1024 * 1024))} م.ب.`,
      ),
      field: "size_bytes",
    });
  }

  if (document.size_bytes < 12_000) {
    issues.push({
      code: "file_too_thin",
      message: pairText(overlay("File appears incomplete or too low-resolution for automated review.")),
      field: "size_bytes",
    });
  }

  const failTokens = ["blur", "invalid", "corrupt", "sample", "screenshot"];
  if (failTokens.some((token) => name.includes(token))) {
    issues.push({
      code: "quality_failed",
      message: pairText(overlay("Automated quality checks could not read required fields on this file.")),
    });
  }

  const entropy = hashString(`${document.file_name}:${document.size_bytes}:${documentType.key}`);
  if (entropy % 17 === 0 && issues.length === 0) {
    issues.push({
      code: "inconsistent_metadata",
      message: pairText(overlay("Extracted metadata does not match the expected document template.")),
    });
  }

  return {
    status: issues.length ? ("error" as const) : ("success" as const),
    issues,
  };
}
