import { z } from "zod";
import { errorResponse, json, readJson } from "@backend/api/http";
import { askGemini } from "@backend/ai/gemini";

const userMessageSchema = z.object({
  role: z.literal("user"),
  content: z
    .string()
    .trim()
    .min(1, "Message content cannot be empty")
    .max(1000, "Message length exceeds maximum limit of 1000 characters"),
});

const assistantMessageSchema = z.object({
  role: z.literal("assistant"),
  content: z
    .string()
    .trim()
    .min(1, "Assistant message cannot be empty")
    .max(10000, "Assistant response exceeds maximum limit of 10000 characters"),
});

const messageSchema = z.discriminatedUnion("role", [
  userMessageSchema,
  assistantMessageSchema,
]);

const chatRequestSchema = z.object({
  messages: z
    .array(messageSchema)
    .min(1, "At least one message is required")
    .max(20, "Conversation history limit exceeded (max 20 messages)"),
  locale: z.enum(["en", "ar"]).optional(),
});

export async function POST(request: Request) {
  try {
    const rawBody = await readJson<unknown>(request);
    const parsed = chatRequestSchema.safeParse(rawBody);

    if (!parsed.success) {
      const issue = parsed.error.issues[0]?.message || "Invalid request payload";
      return json({ error: issue }, 400);
    }

    const { messages } = parsed.data;

    // Ensure the last message is from the user
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== "user") {
      return json({ error: "Last message must be from user" }, 400);
    }

    const reply = await askGemini(messages);

    return json({ reply }, 200);
  } catch (error: unknown) {
    const configuredModel = process.env.GEMINI_MODEL?.trim() || "gemini-2.5-flash";
    const status =
      typeof error === "object" && error && "status" in error
        ? (error as { status: unknown }).status
        : typeof error === "object" && error && "statusCode" in error
          ? (error as { statusCode: unknown }).statusCode
          : "N/A";
    const code =
      typeof error === "object" && error && "code" in error
        ? (error as { code: unknown }).code
        : error instanceof Error
          ? error.name
          : "UNKNOWN";
    const rawMessage = error instanceof Error ? error.message : "Unknown error";
    // Sanitize any potential sensitive tokens from error message
    const sanitizedMessage = rawMessage
      .replace(/AIza[0-9A-Za-z-_]{35}/g, "[REDACTED_API_KEY]")
      .replace(/key=[^&\s]+/gi, "key=[REDACTED]");

    console.error("[Chat API Diagnostic]", {
      status,
      code,
      model: configuredModel,
      message: sanitizedMessage,
    });

    if (rawMessage.includes("GEMINI_API_KEY")) {
      return json(
        {
          error:
            "AI Assistant is not configured on the server. Please set GEMINI_API_KEY in environment variables. · خدمة المساعد الذكي غير مهيأة على الخادم.",
        },
        503,
      );
    }

    return errorResponse(
      new Error(
        "Unable to process your request at this moment. Please try again later. · تعذر معالجة طلبك في الوقت الحالي. يرجى المحاولة لاحقاً.",
      ),
      500,
    );
  }
}
