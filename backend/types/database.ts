export type UserRole = "customer" | "reviewer" | "manager";

export type QuestionType = "text" | "number" | "select" | "multiselect" | "boolean";

export type RuleOperator = "eq" | "neq" | "in" | "gte" | "lte" | "gt" | "lt";

export type RuleCombinator = "and" | "or";

export type ValidationStatus = "idle" | "pending" | "success" | "error";

export type ReviewDecision = "approve" | "review" | "reject" | "request_resubmission";

export type FlagSeverity = "low" | "medium" | "high" | "critical";

export type AnswerValue = string | number | boolean | string[] | null;

export interface RuleCondition {
  questionKey: string;
  operator: RuleOperator;
  value: AnswerValue;
}

export interface ConditionTree {
  combinator: RuleCombinator;
  conditions: Array<RuleCondition | ConditionTree>;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  phone: string | null;
  created_at: string;
  password_hash: string;
}

export interface ApplicationType {
  id: string;
  key: string;
  name: string;
  description: string;
  sort_order: number;
}

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  key: string;
  application_type_id: string | null;
  label: string;
  helper_text: string | null;
  type: QuestionType;
  options: QuestionOption[] | null;
  required: boolean;
  sort_order: number;
  placeholder: string | null;
}

export interface QuestionVisibilityRule {
  id: string;
  question_id: string;
  conditions: ConditionTree;
}

export interface DocumentType {
  id: string;
  key: string;
  name: string;
  description: string;
  accepted_mime_types: string[];
  max_size_bytes: number;
  validation_hints: string[];
}

export interface RequirementRule {
  id: string;
  document_type_id: string;
  application_type_id: string | null;
  conditions: ConditionTree | null;
  required: boolean;
}

export interface ApplicationStatus {
  id: string;
  key: string;
  name: string;
  description: string;
  sort_order: number;
  pipeline_visible: boolean;
  is_terminal: boolean;
}

export interface Application {
  id: string;
  user_id: string;
  type_id: string;
  current_status_id: string;
  created_at: string;
  updated_at: string;
  submitted_at: string | null;
}

export interface ApplicationAnswer {
  id: string;
  application_id: string;
  question_id: string;
  value: AnswerValue;
  updated_at: string;
}

export interface ApplicationStatusEvent {
  id: string;
  application_id: string;
  status_id: string;
  actor_id: string | null;
  note: string | null;
  created_at: string;
}

export interface DocumentRecord {
  id: string;
  application_id: string;
  document_type_id: string;
  file_name: string;
  file_path: string;
  mime_type: string;
  size_bytes: number;
  validation_status: ValidationStatus;
  validation_issues: ValidationIssue[];
  uploaded_at: string;
  validated_at: string | null;
}

export interface ValidationIssue {
  code: string;
  message: string;
  field?: string;
}

export interface Review {
  id: string;
  application_id: string;
  reviewer_id: string;
  decision: ReviewDecision;
  rationale: string;
  ai_recommendation: AiRecommendation | null;
  created_at: string;
}

export interface AiRecommendation {
  action: "approve" | "review" | "reject";
  confidence: number;
  rationale: string;
  risk_score: number;
  factors: AiFactor[];
}

export interface AiFactor {
  code: string;
  label: string;
  weight: number;
  direction: "positive" | "negative" | "neutral";
}

export interface Flag {
  id: string;
  application_id: string;
  document_id: string | null;
  severity: FlagSeverity;
  code: string;
  message: string;
  created_at: string;
  resolved_at: string | null;
}

export interface ActivityEvent {
  id: string;
  actor_id: string | null;
  application_id: string | null;
  type: string;
  message: string;
  created_at: string;
}

export interface DatabaseTables {
  users: User[];
  application_types: ApplicationType[];
  questions: Question[];
  question_visibility_rules: QuestionVisibilityRule[];
  document_types: DocumentType[];
  requirement_rules: RequirementRule[];
  application_status: ApplicationStatus[];
  applications: Application[];
  application_answers: ApplicationAnswer[];
  application_status_events: ApplicationStatusEvent[];
  documents: DocumentRecord[];
  reviews: Review[];
  flags: Flag[];
  activity_events: ActivityEvent[];
}
