"use client";

import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@frontend/components/ui/card";
import { Dropzone } from "@frontend/components/ui/dropzone";
import { ErrorState } from "@frontend/components/ui/error-state";
import { CardSkeleton } from "@frontend/components/ui/skeleton";
import { ValidationStatusBadge } from "@frontend/features/documents/validation-status";
import { useApplication } from "@frontend/hooks/use-applications";
import { useUploadDocument, useValidateDocument } from "@frontend/hooks/use-documents";
import { documentDescriptions, documentHints, documents, lookup, overlay } from "@backend/i18n/catalog";
import { useUiStore } from "@frontend/store/ui";
import { formatBytes } from "@frontend/utils/format";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

export function DocumentUploader({ applicationId }: { applicationId: string }) {
  const application = useApplication(applicationId);
  const upload = useUploadDocument(applicationId);
  const validate = useValidateDocument(applicationId);
  const pushToast = useUiStore((s) => s.pushToast);

  if (application.isLoading) return <CardSkeleton rows={5} />;
  if (application.isError) {
    return <ErrorState message={application.error.message} onRetry={() => application.refetch()} />;
  }

  const checklist = application.data?.checklist ?? [];

  return (
    <div className="space-y-4">
      {checklist.map((item) => {
        const current = item.document;
        return (
          <Card key={item.document_type.id}>
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle className="text-base">
                  <BiInline pair={lookup(documents, item.document_type.key, item.document_type.name)} />
                </CardTitle>
                <CardDescription>
                  <Bi
                    pair={lookup(documentDescriptions, item.document_type.key, item.document_type.description)}
                    compact
                  />
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {item.required ? (
                  <span className="text-xs text-ink-muted">
                    <BiInline en="Required" ar="مطلوب" />
                  </span>
                ) : (
                  <span className="text-xs text-ink-faint">
                    <BiInline en="Optional" ar="اختياري" />
                  </span>
                )}
                {current ? <ValidationStatusBadge status={current.validation_status} /> : null}
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <ul className="flex flex-wrap gap-2">
                {item.document_type.validation_hints.map((hint) => (
                  <li key={hint} className="rounded-full bg-canvas px-3 py-1 text-xs text-ink-muted">
                    <BiInline pair={lookup(documentHints, hint, hint)} />
                  </li>
                ))}
              </ul>

              {current ? (
                <div className="flex items-start gap-3 rounded-control bg-canvas px-4 py-3">
                  {current.validation_status === "pending" ? (
                    <Loader2 className="mt-0.5 h-4 w-4 animate-spin text-ink-muted" />
                  ) : current.validation_status === "success" ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-forest" />
                  ) : current.validation_status === "error" ? (
                    <AlertCircle className="mt-0.5 h-4 w-4 text-terracotta" />
                  ) : null}
                  <div>
                    <p className="text-sm font-medium">{current.file_name}</p>
                    <p className="text-xs text-ink-muted">{formatBytes(current.size_bytes)}</p>
                    {current.validation_issues.map((issue) => (
                      <p key={issue.code} className="mt-2 text-sm text-terracotta">
                        <Bi pair={overlay(issue.message)} compact />
                      </p>
                    ))}
                  </div>
                </div>
              ) : null}

              <Dropzone
                accept={item.document_type.accepted_mime_types}
                maxSize={item.document_type.max_size_bytes}
                disabled={upload.isPending || validate.isPending}
                onFile={async (file) => {
                  try {
                    const document = await upload.mutateAsync({
                      documentTypeId: item.document_type.id,
                      file,
                    });
                    await validate.mutateAsync(document.id);
                  } catch (error) {
                    pushToast({
                      title: "Upload failed · فشل الرفع",
                      message: error instanceof Error ? error.message : "Try another file",
                      tone: "danger",
                    });
                  }
                }}
              />
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
