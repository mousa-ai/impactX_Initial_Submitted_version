"use client";

import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { Input } from "@frontend/components/ui/input";
import { Select } from "@frontend/components/ui/select";
import { useLocale } from "@frontend/hooks/use-locale";
import { lookup, options, questionHelpers, questions } from "@backend/i18n/catalog";
import type { AnswerValue, Question } from "@backend/types";

export function QuestionField({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: AnswerValue;
  onChange: (value: AnswerValue) => void;
}) {
  const { t, tp } = useLocale();
  const label = lookup(questions, question.key, question.label);
  const helper = question.helper_text
    ? tp(lookup(questionHelpers, question.key, question.helper_text))
    : undefined;

  if (question.type === "select" && question.options) {
    return (
      <Select
        label={<Bi pair={label} compact />}
        hint={helper}
        options={question.options.map((option) => {
          const translated = lookup(options, option.value, option.label);
          return { value: option.value, label: tp(translated) };
        })}
        placeholder={t("Select an option", "اختر خياراً")}
        value={typeof value === "string" ? value : ""}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  if (question.type === "boolean") {
    return (
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">
          <Bi pair={label} compact />
        </legend>
        <div className="flex gap-2">
          {[
            { en: "Yes", ar: "نعم", val: true },
            { en: "No", ar: "لا", val: false },
          ].map((option) => (
            <button
              key={option.en}
              type="button"
              onClick={() => onChange(option.val)}
              className={`h-11 flex-1 rounded-control border text-sm ${
                value === option.val ? "border-gold bg-gold-soft text-navy" : "border-line bg-surface"
              }`}
            >
              <BiInline en={option.en} ar={option.ar} />
            </button>
          ))}
        </div>
      </fieldset>
    );
  }

  return (
    <Input
      label={<Bi pair={label} compact />}
      hint={helper}
      placeholder={question.placeholder ?? undefined}
      type={question.type === "number" ? "number" : "text"}
      value={value === null || value === undefined ? "" : String(value)}
      onChange={(event) =>
        onChange(question.type === "number" ? Number(event.target.value) : event.target.value)
      }
    />
  );
}
