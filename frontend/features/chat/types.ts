export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface ChatResponsePayload {
  reply?: string;
  error?: string;
}

export interface QuickSuggestion {
  id: string;
  en: string;
  ar: string;
}
