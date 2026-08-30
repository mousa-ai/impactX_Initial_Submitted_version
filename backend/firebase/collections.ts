export const collections = {
  users: "users",
  application_types: "application_types",
  questions: "questions",
  question_visibility_rules: "question_visibility_rules",
  document_types: "document_types",
  requirement_rules: "requirement_rules",
  application_status: "application_status",
  applications: "applications",
  application_answers: "application_answers",
  application_status_events: "application_status_events",
  documents: "documents",
  reviews: "reviews",
  flags: "flags",
  activity_events: "activity_events",
} as const;

export const collectionNames = Object.values(collections);

export const storageFolders = {
  documents: "documents",
};
