import type {
  ActivityEvent,
  AiRecommendation,
  AnswerValue,
  Application,
  ApplicationAnswer,
  ApplicationStatus,
  ApplicationStatusEvent,
  ApplicationType,
  DocumentRecord,
  DocumentType,
  Flag,
  Question,
  Review,
  ReviewDecision,
  User,
  UserRole,
  ValidationIssue,
  ValidationStatus,
} from "./database";

export type PublicUser = Omit<User, "password_hash">;

export interface SessionPayload {
  user: PublicUser;
  session: {
    access_token: string;
    expires_at: string;
  };
}

export interface ApplicationDetail {
  application: Application;
  type: ApplicationType;
  applicant: PublicUser;
  status: ApplicationStatus;
  statuses: ApplicationStatus[];
  events: ApplicationStatusEvent[];
  answers: Array<ApplicationAnswer & { question: Question }>;
  documents: Array<DocumentRecord & { document_type: DocumentType }>;
  flags: Flag[];
  reviews: Review[];
  checklist: ChecklistItem[];
}

export interface ChecklistItem {
  document_type: DocumentType;
  required: boolean;
  document: DocumentRecord | null;
}

export interface DashboardStats {
  total_applications: number;
  by_status: Array<{ status: ApplicationStatus; count: number }>;
  open_flags: number;
  avg_review_hours: number | null;
  activity: ActivityEvent[];
}

export interface PerformancePoint {
  date: string;
  submitted: number;
  approved: number;
  rejected: number;
  flagged: number;
}

export interface PerformanceMetrics {
  series: PerformancePoint[];
  approval_rate: number;
  median_review_hours: number | null;
  flag_rate: number;
  volume: number;
}

export interface AdminApplicationRow {
  application: Application;
  type: ApplicationType;
  applicant: PublicUser;
  status: ApplicationStatus;
  document_count: number;
  validated_count: number;
  flag_count: number;
  recommendation: AiRecommendation | null;
}

export interface ValidateDocumentResponse {
  document: DocumentRecord;
  status: ValidationStatus;
  issues: ValidationIssue[];
}

export interface SubmitReviewInput {
  decision: ReviewDecision;
  rationale: string;
}

export interface UpsertAnswerInput {
  question_id: string;
  value: AnswerValue;
}

export interface SignupInput {
  email: string;
  password: string;
  full_name: string;
  role?: UserRole;
}

export interface LoginInput {
  email: string;
  password: string;
}
