"use client";

import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { Button } from "@frontend/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@frontend/components/ui/card";
import { ErrorState } from "@frontend/components/ui/error-state";
import { CardSkeleton } from "@frontend/components/ui/skeleton";
import { Stepper } from "@frontend/components/ui/stepper";
import { DocumentUploader } from "@frontend/features/documents/document-uploader";
import {
  useApplication,
  useApplicationTypes,
  useCreateApplication,
  useQuestions,
  useSaveAnswers,
  useSubmitApplication,
} from "@frontend/hooks/use-applications";
import { useLocale } from "@frontend/hooks/use-locale";
import { lookup, typeDescriptions, types as typeCopy } from "@backend/i18n/catalog";
import { useUiStore } from "@frontend/store/ui";
import type { AnswerValue } from "@backend/types";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { QuestionField } from "./question-field";

export function ApplyWizard() {
  const { t } = useLocale();
  const steps = [
    { id: "type", label: t("Type", "النوع") },
    { id: "questions", label: t("Details", "التفاصيل") },
    { id: "documents", label: t("Documents", "المستندات") },
  ];
  const router = useRouter();
  const types = useApplicationTypes();
  const create = useCreateApplication();
  const pushToast = useUiStore((s) => s.pushToast);
  const [step, setStep] = useState(0);
  const [applicationId, setApplicationId] = useState<string>();
  const [typeId, setTypeId] = useState<string>();
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});

  const application = useApplication(applicationId);
  const questions = useQuestions(typeId, answers);
  const saveAnswers = useSaveAnswers(applicationId ?? "");
  const submit = useSubmitApplication(applicationId ?? "");

  const answerMap = useMemo(() => {
    const fromApp =
      application.data?.answers.reduce<Record<string, AnswerValue>>((acc, row) => {
        acc[row.question.key] = row.value;
        return acc;
      }, {}) ?? {};
    return { ...fromApp, ...answers };
  }, [application.data, answers]);

  if (types.isLoading) return <CardSkeleton rows={4} />;
  if (types.isError) return <ErrorState message={types.error.message} onRetry={() => types.refetch()} />;

  return (
    <div className="space-y-6">
      <Stepper steps={steps} current={step} />

      {step === 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {types.data?.map((type) => (
            <button
              key={type.id}
              onClick={async () => {
                setTypeId(type.id);
                const created = await create.mutateAsync(type.id);
                setApplicationId(created.application.id);
                setStep(1);
              }}
              className="rounded-card border border-line bg-white p-6 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <p className="text-base font-semibold">
                <Bi pair={lookup(typeCopy, type.key, type.name)} compact />
              </p>
              <p className="mt-2 text-sm text-ink-muted">
                <Bi pair={lookup(typeDescriptions, type.key, type.description)} compact />
              </p>
            </button>
          ))}
        </div>
      ) : null}

      {step === 1 && applicationId ? (
        <Card>
          <CardHeader>
            <CardTitle>
              <Bi en="Tell us about this file" ar="أخبرنا عن هذا الملف" compact />
            </CardTitle>
            <CardDescription>
              <Bi
                en="Answers drive the document checklist. Nothing is hardcoded in the UI."
                ar="الإجابات تولّد قائمة المستندات. لا شيء ثابت في الواجهة."
                compact
              />
            </CardDescription>
          </CardHeader>
          <CardBody className="space-y-4">
            {questions.isLoading ? <CardSkeleton rows={4} /> : null}
            {questions.data?.map((question) => (
              <QuestionField
                key={question.id}
                question={question}
                value={answerMap[question.key] ?? null}
                onChange={(value) => setAnswers((current) => ({ ...current, [question.key]: value }))}
              />
            ))}
            <div className="flex justify-end gap-3 pt-2">
              <Button
                onClick={async () => {
                  const payload =
                    questions.data?.map((question) => ({
                      question_id: question.id,
                      value: answerMap[question.key] ?? null,
                    })) ?? [];
                  await saveAnswers.mutateAsync(payload);
                  setStep(2);
                }}
                disabled={saveAnswers.isPending}
              >
                <BiInline en="Continue to documents" ar="متابعة إلى المستندات" />
              </Button>
            </div>
          </CardBody>
        </Card>
      ) : null}

      {step === 2 && applicationId ? (
        <div className="space-y-5">
          <DocumentUploader applicationId={applicationId} />
          <div className="flex justify-end">
            <Button
              onClick={async () => {
                try {
                  await submit.mutateAsync();
                  pushToast({ title: "Application submitted · تم تقديم الطلب", tone: "success" });
                  router.push(`/app/applications/${applicationId}`);
                } catch (error) {
                  pushToast({
                    title: "Cannot submit yet · لا يمكن التقديم بعد",
                    message: error instanceof Error ? error.message : "Try again",
                    tone: "danger",
                  });
                }
              }}
              disabled={submit.isPending}
            >
              {submit.isPending ? (
                <BiInline en="Submitting…" ar="جارٍ التقديم…" />
              ) : (
                <BiInline en="Submit application" ar="تقديم الطلب" />
              )}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
