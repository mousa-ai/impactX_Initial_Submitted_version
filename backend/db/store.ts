import { bilingual, lookup, overlay, pairText, statuses as statusCopy, types as typeCopy } from "@backend/i18n/catalog";
import { answersToMap } from "@backend/engine/conditions";
import { recommendDecision } from "@backend/engine/recommendation";
import { resolveRequiredDocuments } from "@backend/engine/requirements";
import { validateDocument } from "@backend/engine/validation";
import { visibleQuestions } from "@backend/engine/visibility";
import { createId, nowIso } from "@backend/utils/id";
import { loadDatabase, saveDatabase } from "./persist";
import type {
  ActivityEvent,
  AnswerValue,
  Application,
  ApplicationDetail,
  ApplicationStatus,
  ChecklistItem,
  DatabaseTables,
  DocumentRecord,
  Flag,
  PublicUser,
  Review,
  ReviewDecision,
  User,
  UserRole,
  ValidationIssue,
} from "@backend/types";

let cache: DatabaseTables | null = null;

function toPublicUser(user: User): PublicUser {
  const { password_hash, ...rest } = user;
  void password_hash;
  return rest;
}

async function ensureLoaded(): Promise<DatabaseTables> {
  if (cache) return cache;
  cache = await loadDatabase();
  return cache;
}

async function persist() {
  if (!cache) return;
  await saveDatabase(cache);
}

async function mutate<T>(fn: (db: DatabaseTables) => T): Promise<T> {
  const db = await ensureLoaded();
  const result = fn(db);
  await persist();
  return result;
}

function addActivity(
  db: DatabaseTables,
  input: Omit<ActivityEvent, "id" | "created_at"> & { created_at?: string },
) {
  db.activity_events.unshift({
    id: createId(),
    created_at: input.created_at ?? nowIso(),
    actor_id: input.actor_id,
    application_id: input.application_id,
    type: input.type,
    message: input.message,
  });
}

function statusByKey(db: DatabaseTables, key: string) {
  const status = db.application_status.find((row) => row.key === key);
  if (!status) throw new Error(`Missing status catalog row: ${key}`);
  return status;
}

function answerMapFor(db: DatabaseTables, applicationId: string) {
  return answersToMap(
    db.application_answers
      .filter((row) => row.application_id === applicationId)
      .map((row) => {
        const question = db.questions.find((item) => item.id === row.question_id);
        return { question_key: question?.key ?? row.question_id, value: row.value };
      }),
  );
}

function checklistFor(db: DatabaseTables, application: Application): ChecklistItem[] {
  const type = db.application_types.find((row) => row.id === application.type_id);
  if (!type) return [];
  return resolveRequiredDocuments({
    applicationType: type,
    rules: db.requirement_rules,
    documentTypes: db.document_types,
    answers: answerMapFor(db, application.id),
    documents: db.documents.filter((row) => row.application_id === application.id),
  });
}

function buildDetail(db: DatabaseTables, application: Application): ApplicationDetail {
  const type = db.application_types.find((row) => row.id === application.type_id)!;
  const applicant = db.users.find((row) => row.id === application.user_id)!;
  const status = db.application_status.find((row) => row.id === application.current_status_id)!;
  const answers = db.application_answers
    .filter((row) => row.application_id === application.id)
    .map((row) => ({
      ...row,
      question: db.questions.find((item) => item.id === row.question_id)!,
    }))
    .filter((row) => row.question);
  const documents = db.documents
    .filter((row) => row.application_id === application.id)
    .map((row) => ({
      ...row,
      document_type: db.document_types.find((item) => item.id === row.document_type_id)!,
    }))
    .filter((row) => row.document_type);

  return {
    application,
    type,
    applicant: toPublicUser(applicant),
    status,
    statuses: [...db.application_status].sort((a, b) => a.sort_order - b.sort_order),
    events: db.application_status_events
      .filter((row) => row.application_id === application.id)
      .sort((a, b) => a.created_at.localeCompare(b.created_at)),
    answers,
    documents,
    flags: db.flags.filter((row) => row.application_id === application.id),
    reviews: db.reviews
      .filter((row) => row.application_id === application.id)
      .sort((a, b) => b.created_at.localeCompare(a.created_at)),
    checklist: checklistFor(db, application),
  };
}

export const store = {
  getDb: ensureLoaded,

  async listApplicationTypes() {
    return [...(await ensureLoaded()).application_types].sort((a, b) => a.sort_order - b.sort_order);
  },

  async listStatuses() {
    return [...(await ensureLoaded()).application_status].sort((a, b) => a.sort_order - b.sort_order);
  },

  async getQuestions(applicationTypeId?: string) {
    const db = await ensureLoaded();
    return db.questions
      .filter((row) => row.application_type_id === null || row.application_type_id === applicationTypeId)
      .sort((a, b) => a.sort_order - b.sort_order);
  },

  async getVisibleQuestions(applicationTypeId: string | undefined, answers: Record<string, AnswerValue>) {
    const db = await ensureLoaded();
    const questions = await this.getQuestions(applicationTypeId);
    return visibleQuestions(questions, db.question_visibility_rules, answers);
  },

  async findUserByEmail(email: string) {
    return (await ensureLoaded()).users.find((row) => row.email.toLowerCase() === email.toLowerCase()) ?? null;
  },

  async findUserById(id: string) {
    return (await ensureLoaded()).users.find((row) => row.id === id) ?? null;
  },

  publicUser(user: User) {
    return toPublicUser(user);
  },

  createUser(input: { email: string; full_name: string; password: string; role?: UserRole; id?: string }) {
    return mutate((db) => {
      if (db.users.some((row) => row.email.toLowerCase() === input.email.toLowerCase())) {
        throw new Error(pairText(overlay("An account with this email already exists.")));
      }
      const user: User = {
        id: input.id ?? createId(),
        email: input.email.toLowerCase(),
        full_name: input.full_name,
        role: input.role ?? "customer",
        phone: null,
        created_at: nowIso(),
        password_hash: input.password,
      };
      db.users.push(user);
      return user;
    });
  },

  async listApplicationsForUser(userId: string) {
    const db = await ensureLoaded();
    return db.applications
      .filter((row) => row.user_id === userId)
      .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
      .map((application) => buildDetail(db, application));
  },

  async listAllApplications(filters?: { statusKey?: string; typeId?: string; query?: string }) {
    const db = await ensureLoaded();
    return db.applications
      .map((application) => buildDetail(db, application))
      .filter((detail) => {
        if (filters?.statusKey && detail.status.key !== filters.statusKey) return false;
        if (filters?.typeId && detail.type.id !== filters.typeId) return false;
        if (filters?.query) {
          const q = filters.query.toLowerCase();
          const hay = `${detail.applicant.full_name} ${detail.applicant.email} ${detail.type.name} ${detail.application.id}`;
          if (!hay.toLowerCase().includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => b.application.updated_at.localeCompare(a.application.updated_at));
  },

  async getApplication(id: string) {
    const db = await ensureLoaded();
    const application = db.applications.find((row) => row.id === id);
    return application ? buildDetail(db, application) : null;
  },

  createApplication(userId: string, typeId: string) {
    return mutate((db) => {
      const type = db.application_types.find((row) => row.id === typeId);
      if (!type) throw new Error(pairText(overlay("Unknown application type.")));
      const draft = statusByKey(db, "draft");
      const application: Application = {
        id: createId(),
        user_id: userId,
        type_id: typeId,
        current_status_id: draft.id,
        created_at: nowIso(),
        updated_at: nowIso(),
        submitted_at: null,
      };
      db.applications.push(application);
      db.application_status_events.push({
        id: createId(),
        application_id: application.id,
        status_id: draft.id,
        actor_id: userId,
        note: pairText(overlay("Application created")),
        created_at: nowIso(),
      });
      addActivity(db, {
        actor_id: userId,
        application_id: application.id,
        type: "application.created",
        message: bilingual(
          `${db.users.find((u) => u.id === userId)?.full_name ?? "Applicant"} started a ${type.name}.`,
          `${db.users.find((u) => u.id === userId)?.full_name ?? "المتقدم"} بدأ ${lookup(typeCopy, type.key, type.name).ar}.`,
        ),
      });
      return buildDetail(db, application);
    });
  },

  upsertAnswers(applicationId: string, items: Array<{ question_id: string; value: AnswerValue }>) {
    return mutate((db) => {
      const application = db.applications.find((row) => row.id === applicationId);
      if (!application) throw new Error(pairText(overlay("Application not found.")));
      for (const item of items) {
        const existing = db.application_answers.find(
          (row) => row.application_id === applicationId && row.question_id === item.question_id,
        );
        if (existing) {
          existing.value = item.value;
          existing.updated_at = nowIso();
        } else {
          db.application_answers.push({
            id: createId(),
            application_id: applicationId,
            question_id: item.question_id,
            value: item.value,
            updated_at: nowIso(),
          });
        }
      }
      application.updated_at = nowIso();
      return buildDetail(db, application);
    });
  },

  async getChecklist(applicationId: string) {
    const detail = await this.getApplication(applicationId);
    if (!detail) throw new Error(pairText(overlay("Application not found.")));
    return detail.checklist;
  },

  addDocument(input: {
    applicationId: string;
    documentTypeId: string;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    filePath: string;
  }) {
    return mutate((db) => {
      const application = db.applications.find((row) => row.id === input.applicationId);
      if (!application) throw new Error(pairText(overlay("Application not found.")));
      const record: DocumentRecord = {
        id: createId(),
        application_id: input.applicationId,
        document_type_id: input.documentTypeId,
        file_name: input.fileName,
        file_path: input.filePath,
        mime_type: input.mimeType,
        size_bytes: input.sizeBytes,
        validation_status: "idle",
        validation_issues: [],
        uploaded_at: nowIso(),
        validated_at: null,
      };
      db.documents.push(record);
      application.updated_at = nowIso();
      addActivity(db, {
        actor_id: application.user_id,
        application_id: application.id,
        type: "document.uploaded",
        message: bilingual(`${input.fileName} uploaded.`, `تم رفع ${input.fileName}.`),
      });
      return record;
    });
  },

  markDocumentPending(documentId: string) {
    return mutate((db) => {
      const document = db.documents.find((row) => row.id === documentId);
      if (!document) throw new Error(pairText(overlay("Document not found.")));
      document.validation_status = "pending";
      document.validation_issues = [];
      document.validated_at = null;
      return document;
    });
  },

  finalizeValidation(documentId: string) {
    return mutate((db) => {
      const document = db.documents.find((row) => row.id === documentId);
      if (!document) throw new Error(pairText(overlay("Document not found.")));
      const type = db.document_types.find((row) => row.id === document.document_type_id);
      if (!type) throw new Error(pairText(overlay("Document type not found.")));
      const result = validateDocument(document, type);
      document.validation_status = result.status;
      document.validation_issues = result.issues;
      document.validated_at = nowIso();

      if (result.status === "error") {
        db.flags.push({
          id: createId(),
          application_id: document.application_id,
          document_id: document.id,
          severity: result.issues.some((issue) => issue.code === "quality_failed") ? "high" : "medium",
          code: result.issues[0]?.code ?? "validation_failed",
          message: result.issues[0]?.message ?? pairText(overlay("Document failed automated validation.")),
          created_at: nowIso(),
          resolved_at: null,
        });
      } else {
        db.flags
          .filter((flag) => flag.document_id === document.id && !flag.resolved_at)
          .forEach((flag) => {
            flag.resolved_at = nowIso();
          });
      }
      return { document, issues: result.issues as ValidationIssue[] };
    });
  },

  submitApplication(applicationId: string, actorId: string) {
    return mutate((db) => {
      const application = db.applications.find((row) => row.id === applicationId);
      if (!application) throw new Error(pairText(overlay("Application not found.")));
      const submitted = statusByKey(db, "submitted");
      application.current_status_id = submitted.id;
      application.submitted_at = nowIso();
      application.updated_at = nowIso();
      db.application_status_events.push({
        id: createId(),
        application_id: application.id,
        status_id: submitted.id,
        actor_id: actorId,
        note: pairText(overlay("Application submitted")),
        created_at: nowIso(),
      });
      const user = db.users.find((row) => row.id === actorId);
      const type = db.application_types.find((row) => row.id === application.type_id);
      addActivity(db, {
        actor_id: actorId,
        application_id: application.id,
        type: "application.submitted",
        message: bilingual(
          `${user?.full_name ?? "Applicant"} submitted a ${type?.name ?? "application"}.`,
          `${user?.full_name ?? "المتقدم"} قدّم ${type ? lookup(typeCopy, type.key, type.name).ar : "طلباً"}.`,
        ),
      });
      return buildDetail(db, application);
    });
  },

  setStatus(applicationId: string, statusKey: string, actorId: string, note: string) {
    return mutate((db) => {
      const application = db.applications.find((row) => row.id === applicationId);
      if (!application) throw new Error(pairText(overlay("Application not found.")));
      const status = statusByKey(db, statusKey);
      application.current_status_id = status.id;
      application.updated_at = nowIso();
      db.application_status_events.push({
        id: createId(),
        application_id: application.id,
        status_id: status.id,
        actor_id: actorId,
        note,
        created_at: nowIso(),
      });
      return buildDetail(db, application);
    });
  },

  async recommendationFor(applicationId: string) {
    const db = await ensureLoaded();
    const application = db.applications.find((row) => row.id === applicationId);
    if (!application) throw new Error(pairText(overlay("Application not found.")));
    return recommendDecision({
      answers: answerMapFor(db, application.id),
      checklist: checklistFor(db, application),
      flags: db.flags.filter((row) => row.application_id === application.id && !row.resolved_at),
    });
  },

  createReview(input: {
    applicationId: string;
    reviewerId: string;
    decision: ReviewDecision;
    rationale: string;
  }) {
    return mutate((db) => {
      const application = db.applications.find((row) => row.id === input.applicationId);
      if (!application) throw new Error(pairText(overlay("Application not found.")));
      const recommendation = recommendDecision({
        answers: answerMapFor(db, application.id),
        checklist: checklistFor(db, application),
        flags: db.flags.filter((row) => row.application_id === application.id && !row.resolved_at),
      });
      const review: Review = {
        id: createId(),
        application_id: input.applicationId,
        reviewer_id: input.reviewerId,
        decision: input.decision,
        rationale: input.rationale,
        ai_recommendation: recommendation,
        created_at: nowIso(),
      };
      db.reviews.unshift(review);

      const nextKey =
        input.decision === "approve"
          ? "approved"
          : input.decision === "reject"
            ? "rejected"
            : input.decision === "request_resubmission"
              ? "needs_resubmission"
              : "under_review";
      const next = statusByKey(db, nextKey);
      application.current_status_id = next.id;
      application.updated_at = nowIso();
      db.application_status_events.push({
        id: createId(),
        application_id: application.id,
        status_id: next.id,
        actor_id: input.reviewerId,
        note: input.rationale,
        created_at: nowIso(),
      });
      const reviewer = db.users.find((row) => row.id === input.reviewerId);
      addActivity(db, {
        actor_id: input.reviewerId,
        application_id: application.id,
        type: `application.${nextKey}`,
        message: bilingual(
          `${reviewer?.full_name ?? "Reviewer"} marked the file as ${next.name}.`,
          `${reviewer?.full_name ?? "المراجع"} حدّد الملف كـ ${lookup(statusCopy, next.key, next.name).ar}.`,
        ),
      });
      return { review, detail: buildDetail(db, application) };
    });
  },

  async dashboard() {
    const db = await ensureLoaded();
    const byStatus = db.application_status.map((status: ApplicationStatus) => ({
      status,
      count: db.applications.filter((row) => row.current_status_id === status.id).length,
    }));
    const reviewEvents = db.application_status_events.filter((event) => {
      const status = db.application_status.find((row) => row.id === event.status_id);
      return status?.is_terminal;
    });
    const hours = reviewEvents
      .map((event) => {
        const submitted = db.applications.find((row) => row.id === event.application_id)?.submitted_at;
        if (!submitted) return null;
        return (new Date(event.created_at).getTime() - new Date(submitted).getTime()) / 3600000;
      })
      .filter((value): value is number => value !== null);

    return {
      total_applications: db.applications.length,
      by_status: byStatus,
      open_flags: db.flags.filter((flag: Flag) => !flag.resolved_at).length,
      avg_review_hours: hours.length ? Number((hours.reduce((a, b) => a + b, 0) / hours.length).toFixed(1)) : null,
      activity: [...db.activity_events]
        .sort((a, b) => b.created_at.localeCompare(a.created_at))
        .slice(0, 12),
    };
  },

  async performance() {
    const db = await ensureLoaded();
    const days = 14;
    const series = Array.from({ length: days }, (_, index) => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - (days - 1 - index));
      const key = date.toISOString().slice(0, 10);
      const next = new Date(date);
      next.setDate(next.getDate() + 1);
      const inDay = (iso: string) => {
        const t = new Date(iso).getTime();
        return t >= date.getTime() && t < next.getTime();
      };
      const submitted = db.applications.filter((row) => row.submitted_at && inDay(row.submitted_at)).length;
      const approvedId = statusByKey(db, "approved").id;
      const rejectedId = statusByKey(db, "rejected").id;
      const approved = db.application_status_events.filter(
        (row) => row.status_id === approvedId && inDay(row.created_at),
      ).length;
      const rejected = db.application_status_events.filter(
        (row) => row.status_id === rejectedId && inDay(row.created_at),
      ).length;
      const flagged = db.flags.filter((row) => inDay(row.created_at)).length;
      return { date: key, submitted, approved, rejected, flagged };
    });

    const decided = db.applications.filter((row) => {
      const status = db.application_status.find((item) => item.id === row.current_status_id);
      return status?.is_terminal;
    });
    const approved = decided.filter(
      (row) => row.current_status_id === statusByKey(db, "approved").id,
    ).length;
    const reviewHours = decided
      .map((row) => {
        const event = db.application_status_events
          .filter((item) => item.application_id === row.id)
          .sort((a, b) => b.created_at.localeCompare(a.created_at))[0];
        if (!row.submitted_at || !event) return null;
        return (new Date(event.created_at).getTime() - new Date(row.submitted_at).getTime()) / 3600000;
      })
      .filter((value): value is number => value !== null)
      .sort((a, b) => a - b);

    return {
      series,
      approval_rate: decided.length ? Number((approved / decided.length).toFixed(2)) : 0,
      median_review_hours: reviewHours.length
        ? Number(reviewHours[Math.floor(reviewHours.length / 2)].toFixed(1))
        : null,
      flag_rate: db.applications.length
        ? Number((db.flags.filter((f) => !f.resolved_at).length / db.applications.length).toFixed(2))
        : 0,
      volume: db.applications.length,
    };
  },

  async listFlags(resolved?: boolean) {
    const db = await ensureLoaded();
    return db.flags
      .filter((flag) => (resolved === undefined ? true : resolved ? Boolean(flag.resolved_at) : !flag.resolved_at))
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .map((flag) => ({
        ...flag,
        application: db.applications.find((row) => row.id === flag.application_id) ?? null,
        applicant: toPublicUser(
          db.users.find(
            (user) => user.id === db.applications.find((row) => row.id === flag.application_id)?.user_id,
          ) ?? db.users[0],
        ),
      }));
  },
};
