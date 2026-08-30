import type { AnswerMap } from "./conditions";
import { evaluateTree } from "./conditions";
import type { ApplicationType, ChecklistItem, DocumentRecord, DocumentType, RequirementRule } from "@backend/types";

export function resolveRequiredDocuments(input: {
  applicationType: ApplicationType;
  rules: RequirementRule[];
  documentTypes: DocumentType[];
  answers: AnswerMap;
  documents: DocumentRecord[];
}): ChecklistItem[] {
  const matched = input.rules.filter((rule) => {
    const typeOk = !rule.application_type_id || rule.application_type_id === input.applicationType.id;
    return typeOk && evaluateTree(rule.conditions, input.answers);
  });

  const byType = new Map<string, ChecklistItem>();

  for (const rule of matched) {
    const documentType = input.documentTypes.find((item) => item.id === rule.document_type_id);
    if (!documentType) continue;

    const existing = byType.get(documentType.id);
    const document =
      input.documents
        .filter((row) => row.document_type_id === documentType.id)
        .sort((a, b) => b.uploaded_at.localeCompare(a.uploaded_at))[0] ?? null;

    if (!existing) {
      byType.set(documentType.id, {
        document_type: documentType,
        required: rule.required,
        document,
      });
      continue;
    }

    existing.required = existing.required || rule.required;
    existing.document = existing.document ?? document;
  }

  return Array.from(byType.values()).sort((a, b) =>
    a.document_type.name.localeCompare(b.document_type.name),
  );
}
