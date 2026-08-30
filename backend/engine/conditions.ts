import type { AnswerValue, ConditionTree, RuleCondition } from "@backend/types";

export type AnswerMap = Record<string, AnswerValue>;

function isTree(node: RuleCondition | ConditionTree): node is ConditionTree {
  return "combinator" in node && "conditions" in node;
}

function compare(left: AnswerValue, operator: RuleCondition["operator"], right: AnswerValue) {
  if (left === null || left === undefined || left === "") return false;

  if (operator === "in") {
    const haystack = Array.isArray(right) ? right : [right];
    if (Array.isArray(left)) return left.some((item) => haystack.includes(item));
    return haystack.includes(left);
  }

  if (operator === "eq") return left === right;
  if (operator === "neq") return left !== right;

  const ln = typeof left === "number" ? left : Number(left);
  const rn = typeof right === "number" ? right : Number(right);
  if (Number.isNaN(ln) || Number.isNaN(rn)) return false;

  if (operator === "gt") return ln > rn;
  if (operator === "gte") return ln >= rn;
  if (operator === "lt") return ln < rn;
  if (operator === "lte") return ln <= rn;

  return false;
}

export function evaluateCondition(condition: RuleCondition, answers: AnswerMap) {
  return compare(answers[condition.questionKey] ?? null, condition.operator, condition.value);
}

export function evaluateTree(tree: ConditionTree | null | undefined, answers: AnswerMap): boolean {
  if (!tree) return true;
  const results = tree.conditions.map((node) =>
    isTree(node) ? evaluateTree(node, answers) : evaluateCondition(node, answers),
  );
  return tree.combinator === "and" ? results.every(Boolean) : results.some(Boolean);
}

export function answersToMap(
  rows: Array<{ question_key: string; value: AnswerValue }>,
): AnswerMap {
  return rows.reduce<AnswerMap>((acc, row) => {
    acc[row.question_key] = row.value;
    return acc;
  }, {});
}
