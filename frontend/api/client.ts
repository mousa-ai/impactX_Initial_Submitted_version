import type {
  AdminApplicationRow,
  ApplicationDetail,
  ApplicationStatus,
  ApplicationType,
  DashboardStats,
  DocumentRecord,
  LoginInput,
  PerformanceMetrics,
  Question,
  SessionPayload,
  SignupInput,
  SubmitReviewInput,
  UpsertAnswerInput,
  ValidateDocumentResponse,
} from "@backend/types";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      ...(init?.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...init?.headers,
    },
    cache: "no-store",
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "Request failed · فشل الطلب");
  }
  return payload as T;
}

export const api = {
  session: () => request<SessionPayload | { user: null }>("/api/v1/auth/session"),
  login: (input: LoginInput) =>
    request<SessionPayload>("/api/v1/auth/login", { method: "POST", body: JSON.stringify(input) }),
  signup: (input: SignupInput) =>
    request<SessionPayload>("/api/v1/auth/signup", { method: "POST", body: JSON.stringify(input) }),
  logout: () => request<{ ok: true }>("/api/v1/auth/logout", { method: "POST" }),

  applicationTypes: () => request<ApplicationType[]>("/api/v1/application-types"),
  statuses: () => request<ApplicationStatus[]>("/api/v1/statuses"),
  questions: (applicationTypeId?: string, answers?: Record<string, unknown>) => {
    const params = new URLSearchParams();
    if (applicationTypeId) params.set("applicationTypeId", applicationTypeId);
    if (answers) params.set("answers", JSON.stringify(answers));
    return request<Question[]>(`/api/v1/questions?${params.toString()}`);
  },

  myApplications: () => request<ApplicationDetail[]>("/api/v1/applications"),
  createApplication: (typeId: string) =>
    request<ApplicationDetail>("/api/v1/applications", {
      method: "POST",
      body: JSON.stringify({ typeId }),
    }),
  getApplication: (id: string) => request<ApplicationDetail>(`/api/v1/applications/${id}`),
  saveAnswers: (id: string, answers: UpsertAnswerInput[]) =>
    request<ApplicationDetail>(`/api/v1/applications/${id}/answers`, {
      method: "PATCH",
      body: JSON.stringify({ answers }),
    }),
  checklist: (id: string) => request<ApplicationDetail["checklist"]>(`/api/v1/applications/${id}/checklist`),
  submitApplication: (id: string) =>
    request<ApplicationDetail>(`/api/v1/applications/${id}/submit`, { method: "POST" }),

  uploadDocument: async (applicationId: string, documentTypeId: string, file: File) => {
    const body = new FormData();
    body.append("documentTypeId", documentTypeId);
    body.append("file", file);
    return request<DocumentRecord>(`/api/v1/applications/${applicationId}/documents`, {
      method: "POST",
      body,
    });
  },
  validateDocument: (documentId: string) =>
    request<ValidateDocumentResponse>(`/api/v1/documents/${documentId}/validate`, { method: "POST" }),

  adminDashboard: () => request<DashboardStats>("/api/v1/admin/dashboard"),
  adminApplications: (params?: { statusKey?: string; typeId?: string; query?: string }) => {
    const search = new URLSearchParams();
    if (params?.statusKey) search.set("statusKey", params.statusKey);
    if (params?.typeId) search.set("typeId", params.typeId);
    if (params?.query) search.set("query", params.query);
    return request<AdminApplicationRow[]>(`/api/v1/admin/applications?${search.toString()}`);
  },
  adminApplication: (id: string) =>
    request<ApplicationDetail & { recommendation: ApplicationDetail["reviews"][number]["ai_recommendation"] }>(
      `/api/v1/admin/applications/${id}`,
    ),
  submitReview: (id: string, input: SubmitReviewInput) =>
    request<ApplicationDetail>(`/api/v1/admin/applications/${id}/reviews`, {
      method: "POST",
      body: JSON.stringify(input),
    }),
  performance: () => request<PerformanceMetrics>("/api/v1/admin/performance"),
  flags: () => request<unknown[]>("/api/v1/admin/flags"),
};
