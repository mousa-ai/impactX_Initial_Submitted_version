import type { AnswerMap } from "./conditions";
import { evaluateTree } from "./conditions";
import type { Question, QuestionVisibilityRule } from "@backend/types";

export function visibleQuestions(
  questions: Question[],
  rules: QuestionVisibilityRule[],
  answers: AnswerMap,
) {
  return questions
    .filter((question) => {
      const rule = rules.find((item) => item.question_id === question.id);
      if (!rule) return true;
      return evaluateTree(rule.conditions, answers);
    })
    .sort((a, b) => a.sort_order - b.sort_order);
}
