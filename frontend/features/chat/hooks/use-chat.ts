"use client";

import { useCallback, useState } from "react";
import { useLocale } from "@frontend/hooks/use-locale";
import type { ChatMessage } from "@frontend/features/chat/types";

export function useChat() {
  const { locale, t } = useLocale();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (rawContent: string) => {
      const content = rawContent.trim();
      if (!content || isLoading) return;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        role: "user",
        content,
        timestamp: Date.now(),
      };

      // Limit history sent to the server to last 20 messages (including new user message)
      const currentHistory = [...messages, userMsg].slice(-20);
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);
      setError(null);

      try {
        const payloadMessages = currentHistory.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch("/api/v1/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: payloadMessages,
            locale,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data?.error ||
              t(
                "Unable to connect to AI assistant. Please try again.",
                "تعذر الاتصال بالمساعد الذكي. يرجى المحاولة مرة أخرى.",
              ),
          );
        }

        const assistantMsg: ChatMessage = {
          id: `bot-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          role: "assistant",
          content: data.reply || "",
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err: unknown) {
        const errMsg =
          err instanceof Error
            ? err.message
            : t(
                "Something went wrong. Please try again.",
                "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
              );
        setError(errMsg);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, locale, t],
  );

  const retryLastMessage = useCallback(async () => {
    if (messages.length === 0 || isLoading) return;
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUserMsg) return;

    setError(null);
    setIsLoading(true);

    try {
      const historyToSend = messages.slice(-20).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/v1/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: historyToSend,
          locale,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.error ||
            t(
              "Unable to connect to AI assistant. Please try again.",
              "تعذر الاتصال بالمساعد الذكي. يرجى المحاولة مرة أخرى.",
            ),
        );
      }

      const assistantMsg: ChatMessage = {
        id: `bot-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        role: "assistant",
        content: data.reply || "",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const errMsg =
        err instanceof Error
          ? err.message
          : t(
              "Something went wrong. Please try again.",
              "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
            );
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, locale, t]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    retryLastMessage,
    clearMessages,
  };
}
